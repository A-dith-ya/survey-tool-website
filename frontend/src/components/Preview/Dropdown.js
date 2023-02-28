import React from "react";

const Dropdown = ({ question, options, value, onChange }) => {
  return (
    <div style={styles.container}>
      <label style={styles.question}>{question}</label>
      <div style={styles.dropdown}>
        <select style={styles.select} value={value} onChange={onChange}>
          {options.map((option) => (
            <option value={option}>{option}</option>
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
