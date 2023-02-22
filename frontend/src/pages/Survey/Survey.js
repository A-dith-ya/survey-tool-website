import { useState } from "react";
import styles from "./Survey.module.css";
import Sidebar from "./Sidebar";
import UserHeader from "../../components/UserHeader/UserHearder";
import QuestionForm from "./QuestionForm";
import SurveyTitle from "../../components/Questions/SurveyTitle";

const SurveyPage = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      <UserHeader />
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.surveyContainer}>
          <SurveyTitle title="Survey#1" />
          <QuestionForm />
          <QuestionForm />
        </div>
        {showForm && <QuestionForm />}
      </div>
    </div>
  );
};

export default SurveyPage;
