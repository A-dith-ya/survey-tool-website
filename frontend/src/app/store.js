import { configureStore } from "@reduxjs/toolkit";
import responseReducer from "../features/response/responseSlice";
import surveyReducer from "../features/survey/surveySlice";

export default configureStore({
  reducer: {
    response: responseReducer,
    survey: surveyReducer,
  },
});
