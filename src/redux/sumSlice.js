import {createSlice} from "@reduxjs/toolkit"

const slice = createSlice({
  name:"sum",
  initialState:{name:"amit"},
  reducers:{
     sum(state,action){   
        console.log("previoud state",state.name)     
        return {name:action.payload};
     }
  }
})

export const {sum} = slice.actions;
export default slice.reducer