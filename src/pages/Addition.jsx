import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../redux/counterSlice'
import {sum} from "../redux/sumSlice";



function Addition() {
    const dispatch = useDispatch()
   const sumValue = useSelector((v)=>v.sum)
    
  return (
    <div>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>

      <h1>{sumValue.name}</h1>
      <button type="button" onClick={()=>dispatch(sum("rohit"))}>click my</button>
    </div>
  );
}

export default Addition;
