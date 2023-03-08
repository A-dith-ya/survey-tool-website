import React, { useState, useEffect } from "react";
import styles from "./SurveyList.module.css";
import { FaEdit, FaChartBar, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getSurveys, deleteSurvey } from "../../apis/surveys";
import { AddSurvey } from "../../features/survey/surveySlice";
import { useDispatch } from "react-redux";

const SurveyList = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const [list, setList] = useState();

  // Delete user survey
  const onDelete = async (surveyId) => {
    try {
      await deleteSurvey(surveyId);
      const updatedList = list.filter((item) => item.id !== surveyId);
      setList(updatedList);
    } catch (error) {
      console.log(error);
    }
  };

  // Edit user survey
  const onEdit = (surveyId, status) => {
    navigation("/survey", { state: { surveyId, status } });
  };

  // View user survey results
  const onResponse = (surveyId) => {
    dispatch(AddSurvey({ surveyId }));
    navigation("/response", { state: { surveyId } });
  };

  // Get list of created surveys
  const getList = async () => {
    try {
      setList(await getSurveys());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  if (list)
    return (
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            <th className={styles.th}>Title</th>
            <th className={styles.th}>Date Created</th>
            <th className={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((survey) => (
            <tr className={styles.tr} key={survey.id}>
              <td className={styles.td}>{survey.title}</td>
              <td className={styles.td}>{survey.createdDate.substr(0, 10)}</td>
              <td className={styles.td}>
                <FaEdit
                  className={styles.edit}
                  onClick={() => onEdit(survey.id, survey.status)}
                  data-cy="editSurvey"
                />
                <FaChartBar
                  className={styles.analytics}
                  onClick={() => onResponse(survey.id)}
                  data-cy="analyzeSurvey"
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
    );
};

export default SurveyList;
