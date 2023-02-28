import { useNavigate } from "react-router-dom";
import {
  FaQuestion,
  FaListOl,
  FaCheckSquare,
  FaListAlt,
  FaEye,
  FaSave,
  FaPaperPlane,
} from "react-icons/fa";
import styles from "./Siderbar.module.css";

const Sidebar = ({ questions, onQuestionAdd }) => {
  const navigation = useNavigate();

  const publishSurvey = () => {
    navigation("/publish");
  };

  const previewSurvey = () => {
    navigation("/preview", { state: { ...questions } });
  };

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Add Question</h3>
        <ul className={styles.sectionContainer}>
          <li
            className={styles.questionContainer}
            onClick={() => onQuestionAdd("text")}
          >
            <FaQuestion className={styles.sectionContainerIcon} />
            <span className={styles.sectionContainerText}>Text Question</span>
          </li>
          <li
            className={styles.questionContainer}
            onClick={() => onQuestionAdd("multiple")}
          >
            <FaListOl className={styles.sectionContainerIcon} />
            <span className={styles.sectionContainerText}>Multiple Choice</span>
          </li>
          <li
            className={styles.questionContainer}
            onClick={() => onQuestionAdd("checkbox")}
          >
            <FaCheckSquare className={styles.sectionContainerIcon} />
            <span className={styles.sectionContainerText}>Checkbox</span>
          </li>
          <li
            className={styles.questionContainer}
            onClick={() => onQuestionAdd("dropdown")}
          >
            <FaListAlt className={styles.sectionContainerIcon} />
            <span cclassName={styles.sectionContainerText}>Dropdown</span>
          </li>
          <li
            className={styles.questionContainer}
            onClick={() => onQuestionAdd("boolean")}
          >
            <FaPaperPlane className={styles.sectionContainerIcon} />
            <span className={styles.sectionContainerText}>True/False</span>
          </li>
        </ul>
      </div>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Actions</h3>
        <ul className={styles.sectionContainer}>
          <li className={styles.questionContainer}>
            <FaEye className={styles.sectionContainerIcon} />
            <span
              onClick={previewSurvey}
              className={styles.sectionContainerText}
            >
              Preview
            </span>
          </li>
          <li className={styles.questionContainer}>
            <FaSave className={styles.sectionContainerIcon} />
            <span
              onClick={publishSurvey}
              className={styles.sectionContainerText}
            >
              Save
            </span>
          </li>
          <li className={styles.questionContainer}>
            <FaPaperPlane className={styles.sectionContainerIcon} />
            <span className={styles.sectionContainerText}>Publish</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
