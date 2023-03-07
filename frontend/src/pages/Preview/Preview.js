import React, { useEffect, useState, useContext } from "react";
import MultipleChoice from "../../components/Preview/MultipleChoice";
import TextQuestion from "../../components/Preview/TextQuestion";
import Boolean from "../../components/Preview/Boolean";
import Dropdown from "../../components/Preview/Dropdown";
import styles from "./Preview.module.css";
import { FaBackspace } from "react-icons/fa";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const PreviewPage = () => {
  const { surveyId } = useParams();
  const navigation = useNavigate();
  const location = useLocation();

  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [questions, setQuestions] = useState([]);

  const navigateDesign = () => {
    navigation("/survey", {
      state: {
        surveyId: location.state.surveyId,
        questions: location.state.questions,
      },
    });
  };

  useEffect(() => {
    const { title, description, questions } = location.state.questions;
    setTitle(title);
    setDesc(description);

    if (questions) {
      const newOptions = questions.map((question) => {
        const convertedQuestion = {
          question: question.question,
          type: question.type,
          options: question.options.map((option) => {
            return { value: option };
          }),
        };

        return convertedQuestion;
      });

      setQuestions(newOptions);
    }
  }, [surveyId, location.state.questions]);

  return (
    <div className={styles.container}>
      {!surveyId && (
        <FaBackspace
          className={styles.backspace}
          onClick={navigateDesign}
          data-cy="navSurvey"
        />
      )}
      <h1 className={styles.h1}>{title}</h1>
      <h2 className={styles.h2}>{description}</h2>
      {questions.map((question, index) => {
        switch (question.type) {
          case "TEXT":
            return <TextQuestion question={question.question} />;
          case "MULTIPLE":
            return (
              <MultipleChoice
                type="radio"
                question={question.question}
                options={question.options}
              />
            );
          case "CHECKBOX":
            return (
              <MultipleChoice
                type="checkbox"
                question={question.question}
                options={question.options}
              />
            );
          case "DROPDOWN":
            return (
              <Dropdown
                question={question.question}
                options={question.options}
              />
            );
          case "BOOLEAN":
            return <Boolean label={question.question} value={true} />;
          default:
            return <div></div>;
        }
      })}
      <button type="submit" className={styles.submit}>
        Submit
      </button>
    </div>
  );
};

export default PreviewPage;
