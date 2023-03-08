import { createSlice } from "@reduxjs/toolkit";

export const surveySlice = createSlice({
  name: "survey",
  initialState: {},
  reducers: {
    AddSurvey: (state, action) => {
      const { surveyId } = action.payload;

      // Present survey identifier
      state.surveyId = surveyId;
    },
  },
});

export const { AddSurvey } = surveySlice.actions;

export default surveySlice.reducer;
