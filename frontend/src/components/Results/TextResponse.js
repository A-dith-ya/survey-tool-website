const TextResponse = ({ question, answers }) => {
  return (
    <div style={styles.container}>
      <div style={styles.question}>{question}</div>
      {answers.map((response, index) => (
        <div key={index} style={styles.response}>
          {response}
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    width: "50%",
    backgroundColor: "#f2f2f2",
    borderRadius: "10px",
    marginBottom: "1rem",
  },
  question: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  response: {
    fontSize: "16px",
    marginBottom: "5px",
  },
};

export default TextResponse;
