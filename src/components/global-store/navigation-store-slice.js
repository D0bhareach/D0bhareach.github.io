import { createSlice } from '@reduxjs/toolkit'

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState: {
    showNavigation: false,
  },
  reducers: {
    showNavigation: (state) => {
      state.showNavigation = true;
    },
      
    hideNavigation: (state) => {
      state.showNavigation = false;
    },

  },
});

// Action creators are generated for each case reducer function
export const { showNavigation, hideNavigation } = navigationSlice.actions

export default navigationSlice.reducer
