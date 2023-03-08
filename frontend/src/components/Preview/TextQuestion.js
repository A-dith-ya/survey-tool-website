import { AddResponse } from "../../features/response/responseSlice";
import { useDispatch } from "react-redux";

const TextQuestion = ({ question, options }) => {
  const dispatch = useDispatch();

  const handleAnswerChange = (event) => {
    dispatch(
      AddResponse({
        optionId: options[0].id,
        text: event.target.value,
        options,
      })
    );
  };

  return (
    <div style={styles.container}>
      <label style={styles.question}>{question}</label>
      <textarea
        rows="1"
        style={styles.input}
        onChange={handleAnswerChange}
      ></textarea>
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
  input: {
    padding: "0.5rem",
    width: "37rem",
    border: "1px solid #ccc",
    borderRadius: "3px",
    fontSize: "1rem",
  },
};

export default TextQuestion;
