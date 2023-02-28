const MultipleChoice = ({ type, question, options }) => {
  return (
    <div style={styles.container}>
      <label style={styles.question}>{question}</label>
      {options.map((option) => (
        <div style={styles.option}>
          <input type={type} name="choice" style={styles.checkbox} />
          <label style={styles.label}>{option}</label>
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
