const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
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

const mockData = {
  question: "What is your favorite color?",
  responses: ["Blue", "Green", "Red", "Yellow"],
};

export const TextResponse = () => {
  return (
    <div style={styles.container}>
      <div style={styles.question}>{mockData.question}</div>
      {mockData.responses.map((response, index) => (
        <div key={index} style={styles.response}>
          {response}
        </div>
      ))}
    </div>
  );
};
