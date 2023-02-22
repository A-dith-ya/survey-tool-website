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
    width: "25rem",
    border: "1px solid #ccc",
    borderRadius: "3px",
    fontSize: "1rem",
  },
};

const TextQuestion = ({ question }) => {
  return (
    <div style={styles.container}>
      <label style={styles.question}>{question}</label>
      <input type="text" style={styles.input} />
    </div>
  );
};

export default TextQuestion;
