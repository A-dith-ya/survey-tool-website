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
import { createSurvey, updateStatus } from "../../apis/surveys";

const Sidebar = ({
  questions,
  onQuestionAdd,
  surveyId,
  setSurveyId,
  setStatus,
  setPreview,
  preview,
}) => {
  // Save present survey data
  const saveSurvey = async () => {
    try {
      if (questions.title)
        setSurveyId(await createSurvey({ surveyId, ...questions }));
    } catch (error) {
      console.log(error);
    }
  };

  // Change the status of the survey
  const publishSurvey = async () => {
    try {
      if (questions.status === "DRAFT") {
        await updateStatus(surveyId, "OPEN");
        setStatus("OPEN");
      } else {
        await updateStatus(surveyId, "DRAFT");
        setStatus("DRAFT");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const previewSurvey = () => {
    setPreview(!preview);
  };

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Add Question</h3>
        <ul className={styles.sectionContainer}>
          <li
            className={styles.questionContainer}
            onClick={() => onQuestionAdd("TEXT")}
          >
            <FaQuestion className={styles.sectionContainerIcon} />
            <span className={styles.sectionContainerText}>Text Question</span>
          </li>
          <li
            className={styles.questionContainer}
            onClick={() => onQuestionAdd("MULTIPLE")}
          >
            <FaListOl className={styles.sectionContainerIcon} />
            <span className={styles.sectionContainerText}>Multiple Choice</span>
          </li>
          <li
            className={styles.questionContainer}
            onClick={() => onQuestionAdd("CHECKBOX")}
          >
            <FaCheckSquare className={styles.sectionContainerIcon} />
            <span className={styles.sectionContainerText}>Checkbox</span>
          </li>
          <li
            className={styles.questionContainer}
            onClick={() => onQuestionAdd("DROPDOWN")}
          >
            <FaListAlt className={styles.sectionContainerIcon} />
            <span cclassName={styles.sectionContainerText}>Dropdown</span>
          </li>
          <li
            className={styles.questionContainer}
            onClick={() => onQuestionAdd("BOOLEAN")}
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
          {questions.status === "DRAFT" && (
            <li className={styles.questionContainer}>
              <FaSave className={styles.sectionContainerIcon} />
              <span
                onClick={saveSurvey}
                className={styles.sectionContainerText}
              >
                Save
              </span>
            </li>
          )}
          <li className={styles.questionContainer} onClick={publishSurvey}>
            <FaPaperPlane className={styles.sectionContainerIcon} />
            <span className={styles.sectionContainerText}>
              {questions.status === "DRAFT" ? "Publish" : "Unpublish"}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
