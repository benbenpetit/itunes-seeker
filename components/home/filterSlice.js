import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: 'TITLE',
  reducers: {
    setListFilter: (state, action) => {
      switch (action.payload.sorting) {
        case 'TITLE':
          return 'TITLE'
        case 'ARTIST':
          return 'ARTIST'
        case 'DATE':
          return 'DATE'
        default:
          return 'TITLE'
      }
    }
  },
});

export const { setListFilter } = filterSlice.actions;
export const filterSelector = (state) => state.filter;
export default filterSlice.reducer;
