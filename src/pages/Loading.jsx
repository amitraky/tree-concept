import { useEffect, useState } from "react";

function Loader({ num ,setdd,dd}) {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    let interval = setInterval(function () {
      setCounter(counter + 1);
      if(!dd.includes(num)){
          let d = [...dd];
          d.push(num)
          setdd(d)
      }

    }, 50);
    if (counter == 100) {
      clearInterval(interval);
      let d = [...dd];
      let dt = d.filter((v)=> num != v)
      setdd(dt)
    }

    return () => clearInterval(interval);
  }, [counter]);

  return (
    <div>
      <h5>Loader Number :{num}</h5>
      <div className="brd loading">
        <div className="filler" style={{ width: `${counter}%` }}></div>
      </div>
    </div>
  );
}

function Loading() {
  const [list, addList] = useState([1]);
  const [dd, setdd] = useState([0]);
  const [queue,setQueue] = useState([])
 
 useEffect(()=>{
    
    if(dd.length <= 3){
    
     

    if(queue.length){
      let pp =  [...queue];
      let np = pp.shift()
      setQueue(pp)
      addList([...list,np])
    }
  }

  console.log("queue:",queue)

 },[dd])

  function add(){

     if(dd.length >= 3){
        console.log("Queue is Full")
        let qu = [...queue,queue.length+list.length+1]
        setQueue(qu)
        return;
     }
     let rows = [...list]
     rows.push(rows.length+1)
     addList(rows)
  }

 

  return (
    <div>
      <button onClick={add}> Add Load </button>
      {list.map((row, index) => {
        return <Loader width="20%" num={index + 1} setdd={setdd} dd={dd}/>;
      })}
    </div>
  );
}

export default Loading;
