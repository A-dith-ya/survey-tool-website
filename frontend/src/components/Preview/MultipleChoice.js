import { useState, useEffect } from "react";
import { AddResponse } from "../../features/response/responseSlice";
import { useDispatch } from "react-redux";

const MultipleChoice = ({ type, question, options }) => {
  const dispatch = useDispatch();

  const [selectedOptions, setSelectedOptions] = useState([]);

  // Handle multiple choice responses
  const handleMultipleChange = (event, optionId) => {
    dispatch(AddResponse({ optionId, text: event.target.value, options }));
  };

  // Handle checkbox choice responses
  const handleCheckboxChange = (event, optionId) => {
    if (event.target.checked) {
      setSelectedOptions([...selectedOptions, optionId]);
    } else {
      setSelectedOptions(selectedOptions.filter((id) => id !== optionId));
    }
  };

  // Dispatch when checkbox options change
  useEffect(() => {
    // Remove all checkbox options
    dispatch(AddResponse({ options }));
    // Add checkbox options
    selectedOptions.forEach((id) =>
      dispatch(AddResponse({ optionId: id, text: "on" }))
    );
  }, [selectedOptions]);

  return (
    <div style={styles.container}>
      <label style={styles.question}>{question}</label>
      {options.map((option) => (
        <div style={styles.option}>
          <input
            type={type}
            name="choice"
            style={styles.checkbox}
            key={option.id}
            onChange={(event) =>
              type === "MULTIPLE"
                ? handleMultipleChange(event, option.id)
                : handleCheckboxChange(event, option.id)
            }
          />
          <label style={styles.label}>{option.value}</label>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    marginBottom: "1.5rem",
  },
  question: {
    fontSize: "1.5rem",
  },
  option: {
    display: "flex",
    alignItems: "center",
  },
  checkbox: {
    width: "2rem",
    height: "1.25rem",
  },
  label: {
    fontSize: "1.25rem",
  },
};

export default MultipleChoice;
