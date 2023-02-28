import { FaCheck, FaTimes } from "react-icons/fa";

const Boolean = ({ label, value, onChange }) => {
  let answer = !false;
  return (
    <div style={styles.container}>
      <label style={styles.label}>{label}</label>
      <div style={styles.toggle}>
        <input
          style={styles.checkbox}
          type="checkbox"
          checked={value}
          onChange={(event) => onChange(event.target.checked)}
        />
        <span style={answer ? styles.sliderRight : styles.sliderLeft}>
          {answer ? (
            <FaCheck style={styles.sliderIcon} />
          ) : (
            <FaTimes style={styles.sliderIcon} />
          )}
        </span>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "50%",
    display: "flex",
    alignItems: "center",
    marginBottom: "1.5rem",
  },
  label: {
    fontSize: "1.5rem",
    marginRight: "1rem",
  },
  toggle: {
    position: "relative",
    width: "48px",
    height: "24px",
    borderRadius: "12px",
    backgroundColor: "#ccc",
    cursor: "pointer",
  },
  checkbox: {
    opacity: 0,
    width: 0,
    height: 0,
  },
  sliderRight: {
    position: "absolute",
    top: "2px",
    left: "2px",
    right: "2px",
    bottom: "2px",
    borderRadius: "10px",
    backgroundColor: "#08f26e",
    transition: "0.2s",
    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.3)",
    width: "24px",
    backgroundColor: "#08f26e",
    transform: "translateX(20px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  sliderLeft: {
    position: "absolute",
    top: "2px",
    left: "2px",
    right: "2px",
    bottom: "2px",
    borderRadius: "10px",
    backgroundColor: "#08f26e",
    transition: "0.2s",
    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.3)",
    width: "24px",
    backgroundColor: "#ff0000",
    transform: "translateX(0px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  sliderIcon: {
    color: "#000",
    top: "2px",
    left: "2px",
  },
  checkboxChecked: {
    backgroundColor: "#2196f3",
  },
  sliderChecked: {
    transform: "translateX(24px)",
  },
};

export default Boolean;
