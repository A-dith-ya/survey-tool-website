import React from "react";
import { AddResponse } from "../../features/response/responseSlice";
import { useDispatch } from "react-redux";

const Dropdown = ({ question, options, value }) => {
  const dispatch = useDispatch();

  const handleAnswerChange = (event) => {
    // Set selected option id based on user input
    const selectedOptionId = options.find(
      (option) => option.value === event.target.value
    ).id;

    dispatch(
      AddResponse({
        optionId: selectedOptionId,
        text: event.target.value,
        options,
      })
    );
  };

  return (
    <div style={styles.container}>
      <label style={styles.question}>{question}</label>
      <div style={styles.dropdown}>
        <select
          style={styles.select}
          value={value}
          onChange={handleAnswerChange}
        >
          {options.map((option) => (
            <option key={option.id} value={option.value}>
              {option.value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    marginBottom: "1.5rem",
  },
  question: {
    marginBottom: "1rem",
    fontSize: "1.5rem",
  },
  dropdown: {
    width: "37%",
    border: "1px solid #ddd",
    borderRadius: "4px",
    padding: "8px",
  },
  select: {
    width: "100%",
    border: "none",
    outline: "none",
    background: "none",
    appearance: "none",
    fontSize: "1.25rem",
    color: "#555",
  },
};

export default Dropdown;
