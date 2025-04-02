import { asyncThunkCreator, createSlice } from '@reduxjs/toolkit'
let getUserData = asyncThunkCreator("abcd",()=>{

    fetch();
    return DataTransfer;
})


export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
      count: 0,
    },
    reducers: {
      increment: (state) => {

        console.log("ddddddd:",state)
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes.
        // Also, no return statement is required from these functions.
        state.count += 1
      },
      decrement: (state) => {
        state.count -= 1
      },
      
    },
    extraReducers:(builder)=>{
         
    }
  })
  
  // Action creators are generated for each case reducer function
  export const { increment, decrement, incrementByAmount } = counterSlice.actions
  
  export default counterSlice.reducer