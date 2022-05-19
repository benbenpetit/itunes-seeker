import { createSlice } from "@reduxjs/toolkit";

const songsSlice = createSlice({
  name: "songs",
  initialState: [], // {id: dezjdioez, title: apple, quantity: 1, price: 2.23}
  reducers: {
    addSongToList: (state, action) => {
      return [...state, action.payload];
    },

    removeSongFromList: (state, action) => {
      return state.filter(song => song.trackId != action.payload.id);
    }
  },
});

export const { addSongToList, removeSongFromList } = songsSlice.actions;
export const songsSelector = (state) => state.songs;
export default songsSlice.reducer;
