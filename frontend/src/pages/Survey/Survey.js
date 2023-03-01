import { useState } from "react";
import styles from "./Survey.module.css";
import Sidebar from "../../components/SurveyQuestion/Sidebar";
import UserHeader from "../../components/Header/UserHeader";
import QuestionForm from "../../components/SurveyQuestion/QuestionForm";
import data from "../../data/surveyQuestions.json";

const SurveyPage = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [questions, setQuestions] = useState(data);

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

  return (
    <div>
      <UserHeader />
      <div className={styles.container}>
        <Sidebar
          onQuestionAdd={addQuestion}
          questions={{ title, desc, questions }}
        />
        <div className={styles.surveyContainer}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Survey Name..."
            className={styles.title}
          />
          <input
            type="text"
            value={desc}
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
