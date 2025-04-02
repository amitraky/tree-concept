import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import sumReducer from "./sumSlice"

export default configureStore({
  reducer: {
    counter: counterReducer,
    sum:sumReducer
  },
})

