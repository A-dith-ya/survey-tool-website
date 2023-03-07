import React, { useState, useEffect } from "react";
import styles from "./Survey.module.css";
import Sidebar from "../../components/SurveyQuestion/Sidebar";
import UserHeader from "../../components/Header/UserHeader";
import QuestionForm from "../../components/SurveyQuestion/QuestionForm";
import { useLocation } from "react-router-dom";
import { getSurvey } from "../../apis/surveys";

const SurveyPage = () => {
  const location = useLocation();

  const [status, setStatus] = useState("DRAFT");
  const [surveyId, setSurveyId] = useState();
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [questions, setQuestions] = useState([]);

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].question = event.target.value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].options = value;
    setQuestions(newQuestions);
  };

  const handleQuestionTypeChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].type = event.target.value;
    setQuestions(newQuestions);
  };

  const addQuestion = (type) => {
    const newQuestions = [...questions];
    newQuestions.push({
      question: "",
      options: ["", ""],
      type,
    });
    setQuestions(newQuestions);
  };

  const removeQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

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

  useEffect(() => {
    if (location.state) {
      setSurveyId(location.state.surveyId);
    }
    if (surveyId) {
      onInit(surveyId);
    }
    if (location.state && location.state.questions) {
      const { title, description, questions } = location.state.questions;
      setTitle(title);
      setDesc(description);
      setQuestions(questions);
    }
  }, [surveyId, location.state]);

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
        />
        <div className={styles.surveyContainer}>
          {status === "OPEN" && (
            <h2>Survey open at this link: http://API_URL/open/{surveyId}</h2>
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
};

export default SurveyPage;
