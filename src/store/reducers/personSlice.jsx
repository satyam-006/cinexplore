import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null,
};

export const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    loadPersonDetail: (state, action) => {
      state.info = action.payload;
    },
    removePerosnDetail: (state, action) => {
      state.info = null;
    },
  },
});

export const { loadPersonDetail, removePerosnDetail } = personSlice.actions;

export default personSlice.reducer;
