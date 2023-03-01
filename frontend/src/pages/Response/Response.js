import React from "react";
import styles from "./Response.module.css";
import { TextResponse } from "../../components/Results/TextResponse";
import UserHeader from "../../components/Header/UserHeader";
import BarChartResponse from "../../components/Results/BarChartResponse";
const ResponsePage = () => {
  return (
    <div className={styles.container}>
      <UserHeader />
      <h1>Responses</h1>
      <TextResponse />
      <BarChartResponse />
    </div>
  );
};

export default ResponsePage;
