import React, { useState, useEffect } from "react";
import styles from "./Survey.module.css";
import Sidebar from "../../components/SurveyQuestion/Sidebar";
import UserHeader from "../../components/Header/UserHeader";
import QuestionForm from "../../components/SurveyQuestion/QuestionForm";
import { useLocation } from "react-router-dom";
import { getSurvey } from "../../apis/surveys";
import MultipleChoice from "../../components/Preview/MultipleChoice";
import TextQuestion from "../../components/Preview/TextQuestion";
import Boolean from "../../components/Preview/Boolean";
import Dropdown from "../../components/Preview/Dropdown";
import { FaBackspace } from "react-icons/fa";

const SurveyPage = () => {
  const location = useLocation();

  const [status, setStatus] = useState("DRAFT");
  const [surveyId, setSurveyId] = useState();
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [questions, setQuestions] = useState([]);

  const [preview, setPreview] = useState(true);

  // Add a new question to the survey
  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].question = event.target.value;
    setQuestions(newQuestions);
  };

  // Add a new option to the question
  const handleOptionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].options = value;
    setQuestions(newQuestions);
  };

  // Change the question type
  const handleQuestionTypeChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].type = event.target.value;
    setQuestions(newQuestions);
  };

  // Add a question to the survey
  const addQuestion = (type) => {
    const newQuestions = [...questions];
    newQuestions.push({
      question: "",
      options: ["", ""],
      type,
    });
    setQuestions(newQuestions);
  };

  // Remove a question from the survey
  const removeQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  // Get survey data
  const onInit = async (surveyId) => {
    try {
      const res = await getSurvey(surveyId);

      if (res.title) setTitle(res.title);
      if (res.description) setDesc(res.description);
      if (res.questions) setQuestions(res.questions);
      if (res.status) setStatus(res.status);
    } catch (error) {
      console.log(error);
    }
  };

  const navigateDesign = () => {
    setPreview(!preview);
  };

  // Iniatialize the survey
  useEffect(() => {
    if (location.state) {
      setSurveyId(location.state.surveyId);
    }
    if (surveyId) {
      onInit(surveyId);
    }
  }, [surveyId]);

  if (preview)
    return (
      <div>
        <UserHeader />
        <div className={styles.container}>
          <Sidebar
            onQuestionAdd={addQuestion}
            questions={{ surveyId, status, title, description, questions }}
            surveyId={surveyId}
            setSurveyId={setSurveyId}
            setStatus={setStatus}
            preview={preview}
            setPreview={setPreview}
          />
          <div className={styles.surveyContainer}>
            {status === "OPEN" && (
              <h3>Survey open at this link: http://API_URL/open/{surveyId}</h3>
            )}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Survey Name..."
              className={styles.title}
            />
            <input
              type="text"
              value={description}
              placeholder="Survey Descrption..."
              onChange={(e) => setDesc(e.target.value)}
              className={styles.desc}
            />
            {questions.map((question, index) => (
              <QuestionForm
                number={index}
                type={question.type}
                question={question.question}
                options={question.options}
                onQuestionChange={(value) => handleQuestionChange(index, value)}
                onOptionChange={(index, optionIndex, value) =>
                  handleOptionChange(index, optionIndex, value)
                }
                onQuestionTypeChange={(value) =>
                  handleQuestionTypeChange(index, value)
                }
                onRemove={() => removeQuestion(index)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  else
    return (
      <div className={styles.previewContainer}>
        <FaBackspace
          className={styles.backspace}
          onClick={navigateDesign}
          data-cy="navSurvey"
        />
        <h1 className={styles.h1}>{title}</h1>
        <h2 className={styles.h2}>{description}</h2>
        {questions.map((question) => {
          switch (question.type) {
            case "TEXT":
              return <TextQuestion question={question.question} />;
            case "MULTIPLE":
              console.log(question);
              return (
                <MultipleChoice
                  type="radio"
                  question={question.question}
                  options={question.options.map((option) => {
                    return { value: option };
                  })}
                />
              );
            case "CHECKBOX":
              return (
                <MultipleChoice
                  type="checkbox"
                  question={question.question}
                  options={question.options.map((option) => {
                    return { value: option };
                  })}
                />
              );
            case "DROPDOWN":
              return (
                <Dropdown
                  question={question.question}
                  options={question.options.map((option) => {
                    return { value: option };
                  })}
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

export default SurveyPage;
