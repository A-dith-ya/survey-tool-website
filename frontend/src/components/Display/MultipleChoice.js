const MultipleChoice = ({ question }) => {
  return (
    <div style={styles.container}>
      <label style={styles.question}>{question}</label>
      <div style={styles.option}>
        <input type="radio" name="choice" style={styles.checkbox} />
        <label style={styles.label}>Option 1</label>
      </div>
      <div style={styles.option}>
        <input type="radio" name="choice" style={styles.checkbox} />
        <label style={styles.label}>Option 2</label>
      </div>
      <div style={styles.option}>
        <input type="radio" name="choice" style={styles.checkbox} />
        <label style={styles.label}>Option 3</label>
      </div>
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
