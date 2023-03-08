import React, { useEffect, useState } from "react";
import styles from "./Survey.module.css";
import { useParams } from "react-router-dom";
import { getSurveyResponse } from "../../apis/surveys";
import MultipleChoice from "../../components/Preview/MultipleChoice";
import TextQuestion from "../../components/Preview/TextQuestion";
import Boolean from "../../components/Preview/Boolean";
import Dropdown from "../../components/Preview/Dropdown";
import { useSelector } from "react-redux";
import { submitSurvey } from "../../apis/response";

const PublishPage = () => {
  const { surveyId } = useParams();
  const [notFound, setNotFound] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [questions, setQuestions] = useState([]);

  // User selected responses from options
  const surveyResponses = useSelector((state) => state.response.responses);

  // Survey completion status
  const [complete, setComplete] = useState(false);

  // Submits survey response
  const handleSubmit = async () => {
    try {
      await submitSurvey(surveyResponses);
      setComplete(true);
    } catch (error) {
      console.log(error);
    }
  };

  // Gets survey data
  const getOptions = async () => {
    try {
      const response = await getSurveyResponse(surveyId);

      setTitle(response.title);
      setDesc(response.description);
      setQuestions(response.questions);
    } catch (error) {
      console.log(error);
      // User alreday complete survey
      if (error.message === "Failed to fetch survey") {
        setComplete(true);
      } else setNotFound(true);
    }
  };
  useEffect(() => {
    getOptions();
  }, []);

  if (notFound) {
    return (
      <div className={styles.previewContainer}>
        <h1>404 Survey Not Found</h1>
        <p>The survey you requested could not be found.</p>
      </div>
    );
  }

  if (complete) {
    return (
      <div className={styles.previewContainer}>
        <h1>Comepleted Survey!!!</h1>
      </div>
    );
  }

  return (
    <div className={styles.previewContainer}>
      <h1 className={styles.h1}>{title}</h1>
      <h2 className={styles.h2}>{description}</h2>
      {questions.map((question) => {
        switch (question.type) {
          case "TEXT":
            return (
              <TextQuestion
                key={question.id}
                question={question.question}
                options={question.options}
              />
            );
          case "MULTIPLE":
            return (
              <MultipleChoice
                key={question.id}
                type="radio"
                question={question.question}
                options={question.options}
              />
            );
          case "CHECKBOX":
            return (
              <MultipleChoice
                key={question.id}
                type="checkbox"
                question={question.question}
                options={question.options}
              />
            );
          case "DROPDOWN":
            return (
              <Dropdown
                key={question.id}
                question={question.question}
                options={question.options}
              />
            );
          case "BOOLEAN":
            return (
              <Boolean
                key={question.id}
                label={question.question}
                value={true}
                options={question.options}
              />
            );
          default:
            return <div></div>;
        }
      })}
      <button type="submit" className={styles.submit} onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default PublishPage;
