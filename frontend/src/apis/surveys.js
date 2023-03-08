import { API_URL } from "../config";

const SURVEYS_API_URL = `${API_URL}/surveys`;

// List all surveys
const getSurveys = async () => {
  const res = await fetch(`${SURVEYS_API_URL}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error("Failed to fetch surveys");

  return await res.json();
};

// Get survey title, desc, questions, options
const getSurvey = async (surveyId) => {
  const res = await fetch(`${SURVEYS_API_URL}/${surveyId}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error("Failed to fetch survey");

  const result = await res.json();

  return await result;
};

// Get survey responses
const getSurveyResponse = async (surveyId) => {
  const res = await fetch(`${SURVEYS_API_URL}/open/${surveyId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error("Failed to fetch survey");

  const result = await res.json();

  return await result;
};

// Create/Update survey
const createSurvey = async (survey) => {
  const res = await fetch(SURVEYS_API_URL, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(survey),
  });

  if (!res.ok) throw new Error("Failed to create survey");

  const result = await res.json();
  return result.id;
};

// Delete a survey
const deleteSurvey = async (surveyId) => {
  const res = await fetch(`${SURVEYS_API_URL}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ surveyId }),
  });

  if (!res.ok) throw new Error("Failed to delete survey");
};

// Change survey status
const updateStatus = async (surveyId, status) => {
  const res = await fetch(`${SURVEYS_API_URL}/status`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ surveyId, status }),
  });

  if (!res.ok) throw new Error("Failed to update status");
};

export {
  getSurveys,
  getSurvey,
  getSurveyResponse,
  createSurvey,
  deleteSurvey,
  updateStatus,
};
