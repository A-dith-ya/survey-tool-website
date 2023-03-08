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
  const QuestionType = {
    TEXT: "TEXT",
    MULTIPLE: "MULTIPLE",
    BOOLEAN: "BOOLEAN",
    DROPDOWN: "DROPDOWN",
    CHECKBOX: "CHECKBOX",
  };

  // Add a new option via button click
  const addOption = () => {
    onOptionChange(number, [...options, ""]);
  };

  // Remove an option via icon click
  const removeOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    onOptionChange(number, newOptions);
  };

  // Change the option value via input change
  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    onOptionChange(number, newOptions);
  };

  return (
    <div className={styles.container} data-cy="questionContainer">
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
      {(type === QuestionType.MULTIPLE ||
        type === QuestionType.CHECKBOX ||
        type === QuestionType.DROPDOWN) && (
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
              {(type === QuestionType.MULTIPLE ||
                type === QuestionType.DROPDOWN) && (
                <FaTimesCircle
                  className={styles.optionIcon}
                  onClick={() => removeOption(index)}
                />
              )}
              {type === QuestionType.CHECKBOX && (
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
        <option value={QuestionType.TEXT}>Text Input</option>
        <option value={QuestionType.MULTIPLE}>Multiple Choice</option>
        <option value={QuestionType.CHECKBOX}>Checkbox</option>
        <option value={QuestionType.DROPDOWN}>Dropdown</option>
        <option value={QuestionType.BOOLEAN}>True/False</option>
      </select>
      <button onClick={() => onRemove(number)} className={styles.submit}>
        Delete
      </button>
    </div>
  );
};

export default QuestionForm;
