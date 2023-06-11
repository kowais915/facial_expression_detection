import { configureStore } from '@reduxjs/toolkit'
import formReducer from './formRed'

const store = configureStore({
  reducer: {
    form: formReducer,
    devTools: true,
  },
})

export default store;