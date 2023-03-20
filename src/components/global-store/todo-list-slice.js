import { createSlice } from '@reduxjs/toolkit'

const defaultState = {
      search: "",
      searchType: "text",
      section: "All",
      searchOption: "Text",
      notes: [],
};

export const todoSlice = createSlice({
  name: 'todo-list',
  initialState: defaultState,
  reducers: {
    showNavigation: (state) => {
      state.showNavigation = true;
    },
      
    hideNavigation: (state) => {
      state.showNavigation = false;
    },
    reset: (state) => state = defaultState,

  },
});

// Action creators are generated for each case reducer function
export const { showNavigation, hideNavigation } = navigationSlice.actions

export default navigationSlice.reducer

