import React from "react";
import MultipleChoice from "../../components/Preview/MultipleChoice";
import TextQuestion from "../../components/Preview/TextQuestion";
import Boolean from "../../components/Preview/Boolean";
import Dropdown from "../../components/Preview/Dropdown";
import styles from "./Preview.module.css";
import { FaBackspace } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const PreviewPage = () => {
  const navigation = useNavigate();
  const location = useLocation();

  const { title, desc, questions } = location.state;

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const value = "option2";

  const handleChange = (event) => {
    const selectedValue = event.target.value;
  };

  const navigateDesign = () => {
    navigation("/survey");
  };

  return (
    <div className={styles.container}>
      <FaBackspace className={styles.backspace} onClick={navigateDesign} />
      <h1 className={styles.h1}>{title}</h1>
      <h2 className={styles.h2}>{desc}</h2>
      {questions.map((question, index) => {
        switch (question.type) {
          case "text":
            return <TextQuestion question={question.question} />;
          case "multiple":
            return (
              <MultipleChoice
                type="radio"
                question={question.question}
                options={question.options}
              />
            );
          case "checkbox":
            return (
              <MultipleChoice
                type="checkbox"
                question={question.question}
                options={question.options}
              />
            );
          case "dropdown":
            return (
              <Dropdown
                question={question.question}
                options={question.options}
              />
            );
          case "boolean":
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
