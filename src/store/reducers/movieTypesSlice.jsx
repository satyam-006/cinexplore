import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null,
};

export const movieTypeSlice = createSlice({
  name: "movieTypes",
  initialState,
  reducers: {
    loadMovieTypesDetail: (state, action) => {
      state.info = action.payload;
    },
    removeMovieTypesDetail: (state, action) => {
      state.info = null;
    },
  },
});

export const { loadMovieTypesDetail, removeMovieTypesDetail } = movieTypeSlice.actions;

export default movieTypeSlice.reducer;
