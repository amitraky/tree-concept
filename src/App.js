// import logo from "./logo.svg";
// import "./App.css";
// import Reactd3graph from "./Reactd3graph";
// import ReactGraphVis from "./ReactGraphVis";
// import ForceGraph from "./ForceGraph";
// import Addition from "./pages/Addition"
import OrderList from "./pages/OrderList"
import Loading from "./pages/Loading"

function App() {


  

  // const increement = ()=>{
  //   setCounter(counter+1)
  // }
  // const decreement = ()=>{
  //   setCounter(counter-1)
  // }

  return (
    <div>

    
       {/* <Addition/> */}
      <h1>Task 1</h1>
      <Loading/>
     <hr></hr>
     <h1>Task 2</h1>
      <OrderList/>
      {/* <Reactd3graph /> */}
      {/* <ReactGraphVis /> */}
      {/* <ForceGraph /> */}
    </div>
  );
}

export default App;
