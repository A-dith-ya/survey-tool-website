import { API_URL } from "../config";

const RESPONSE_API_URL = `${API_URL}/responses`;

// Submit a new response for the survey
export const submitSurvey = async (responses) => {
  const response = await fetch(RESPONSE_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ responses }),
  });

  if (!response.ok) {
    throw new Error("Failed to submit survey");
  }
};

// Get all response results for a survey
export const getSurveyResponses = async (surveyId) => {
  const res = await fetch(`${RESPONSE_API_URL}/${surveyId}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to get survey responses");
  }

  return await res.json();
};
