import React, { useEffect, useState } from "react";
import styles from "./Response.module.css";
import TextResponse from "../../components/Results/TextResponse";
import UserHeader from "../../components/Header/UserHeader";
import BarChartResponse from "../../components/Results/BarChartResponse";
import { getSurveyResponses } from "../../apis/response";

import { useSelector } from "react-redux";

const ResponsePage = () => {
  const surveyId = useSelector((state) => state.survey.surveyId);
  const [title, setTitle] = useState("");
  const [responses, setResponses] = useState([]);

  const getResponse = async () => {
    try {
      const res = await getSurveyResponses(surveyId);
      setTitle(res.title);
      setResponses(res.questions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getResponse();
  }, []);

  return (
    <div className={styles.container}>
      <UserHeader />
      <h1>{title}</h1>
      {responses.map((item) => {
        switch (item.type) {
          case "TEXT":
            return (
              <TextResponse question={item.question} answers={item.options} />
            );
          case "MULTIPLE":
          case "CHECKBOX":
          case "DROPDOWN":
            return (
              <BarChartResponse
                title={item.question}
                labels={item.options.map((option) => option.value)}
                data={item.options.map((option) => option.number)}
              />
            );
          case "BOOLEAN":
            return (
              <BarChartResponse
                title={item.question}
                labels={["True", "False"]}
                data={[item.trueNumber, item.falseNumber]}
              />
            );
        }
      })}
    </div>
  );
};

export default ResponsePage;
