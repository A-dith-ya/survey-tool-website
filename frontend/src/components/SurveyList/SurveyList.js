import React from "react";
import styles from "./SurveyList.module.css";
import { FaEdit, FaChartBar, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import data from "../../data/surveyList.json";

const SurveyList = ({ onDelete, onEdit }) => {
  const navigation = useNavigate();

  const onResponse = () => {
    navigation("/response");
  };

  return (
    <div>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            <th className={styles.th}>Title</th>
            <th className={styles.th}>Date Created</th>
            <th className={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((survey) => (
            <tr className={styles.tr} key={survey.id}>
              <td className={styles.td}>{survey.title}</td>
              <td className={styles.td}>{survey.dateCreated}</td>
              <td className={styles.td}>
                <FaEdit
                  className={styles.edit}
                  onClick={() => onEdit(survey.id)}
                />
                <FaChartBar
                  className={styles.analytics}
                  onClick={() => onResponse(survey.id)}
                />
                <FaTrashAlt
                  className={styles.delete}
                  onClick={() => onDelete(survey.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SurveyList;
