import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null,
};

export const tvSlice = createSlice({
  name: "tv",
  initialState,
  reducers: {
    loadTVDetail: (state, action) => {
      state.info = action.payload;
    },
    removeTVDetail: (state, action) => {
      state.info = null;
    },
  },
});

export const { loadTVDetail, removeTVDetail } = tvSlice.actions;

export default tvSlice.reducer;
