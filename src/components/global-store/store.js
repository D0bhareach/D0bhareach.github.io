import { configureStore } from '@reduxjs/toolkit'
import navigationReducer from './navigation-store-slice';

const store = configureStore({
  reducer: {
    navigation: navigationReducer,
  },
});

export default  store;
