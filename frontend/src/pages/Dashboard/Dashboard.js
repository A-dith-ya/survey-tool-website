import React from "react";
import styles from "./Dashboard.module.css";
import SurveyList from "../../components/SurveyList/SurveyList";
import UserHeader from "../../components/Header/UserHeader";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigation = useNavigate();

  return (
    <div className={styles.container}>
      <UserHeader />
      <h1>Survey List</h1>
      <button
        className={styles.createButton}
        onClick={() => navigation("/survey")}
      >
        Create Survey
      </button>
      <SurveyList />
    </div>
  );
};

export default DashboardPage;
