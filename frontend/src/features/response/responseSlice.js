import { createSlice } from "@reduxjs/toolkit";

export const responseSlice = createSlice({
  name: "response",
  initialState: {
    responses: [], // array of responses
  },
  reducers: {
    AddResponse: (state, action) => {
      const { optionId, text, options } = action.payload;

      if (state.responses) {
        // Remove existing responses for the selected options
        if (options)
          options.forEach((option) => {
            state.responses = state.responses.filter(
              (response) => response.optionId !== option.id
            );
          });
      } else {
        state.responses = [];
      }

      // Add new selected option(s)
      if (optionId) state.responses.push({ optionId, text });
    },
  },
});

export const { AddResponse } = responseSlice.actions;

export default responseSlice.reducer;
