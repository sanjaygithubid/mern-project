import { useReducer, useState } from "react"

export default function Reducer(){
 const initialvalues={
  count:0
 }
function Reducer(state,action){
  switch(action.type){
    case "incr":
      return {count: state.count + 1}
      case "dscr":
      return {count: state.count - 1}
      case "by5":
      return {count: state.count + 5}  
      default:
      return state  
  }
}

  const [state,setState]=useReducer(Reducer,initialvalues)
  return(
    <>
    <button onClick={()=>setState({type:"incr"})}>increase</button>
    <button onClick={()=>setState({type:"dscr"})}>dearease</button>
    <button onClick={()=>setState({type:"by5"})}>incr by 5</button>
    <h3>Count: {state.count}</h3>
    </>
  )
}
