import React from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaTimesCircle, FaMinusSquare } from "react-icons/fa";
import styles from "./QuestionForm.module.css";

const QuestionForm = ({
  number,
  type,
  question,
  options,
  onQuestionChange,
  onOptionChange,
  onQuestionTypeChange,
  onRemove,
}) => {
  const addOption = () => {
    onOptionChange(number, [...options, ""]);
  };

  const removeOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    onOptionChange(number, newOptions);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    onOptionChange(number, newOptions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className={styles.container}>
      <div className={styles.questionContainer}>
        <div className={styles.questionNumber}>{number}.</div>
        <input
          type="text"
          value={question}
          onChange={onQuestionChange}
          placeholder="Enter your question here..."
          className={styles.questionInput}
        />
      </div>
      {(type === "multiple" || type === "checkbox" || type === "dropdown") && (
        <div className={styles.optionLabel}>
          <button
            type="button"
            onClick={addOption}
            className={styles.optionButton}
          >
            <IoMdAddCircleOutline className={styles.optionButtonIcon} /> Add
            Option
          </button>
          {options.map((option, index) => (
            <div className={styles.optionContainer} key={index}>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                className={styles.optionInput}
              />
              {(type === "multiple" || type === "dropdown") && (
                <FaTimesCircle
                  className={styles.optionIcon}
                  onClick={() => removeOption(index)}
                />
              )}
              {type === "checkbox" && (
                <FaMinusSquare
                  className={styles.optionIcon}
                  onClick={() => removeOption(index)}
                />
              )}
            </div>
          ))}
        </div>
      )}
      <select
        className={styles.dropdown}
        value={type}
        onChange={onQuestionTypeChange}
      >
        <option value="text">Text Input</option>
        <option value="multiple">Multiple Choice</option>
        <option value="checkbox">Checkbox</option>
        <option value="dropdown">Dropdown</option>
        <option value="boolean">True/False</option>
      </select>
      <button onClick={() => onRemove(number)} className={styles.submit}>
        Delete
      </button>
    </div>
  );
};

export default QuestionForm;
