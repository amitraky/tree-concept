import React,{useState,useRef} from "react";
import Graph from "react-graph-vis";
const initialGraph = {
  nodes: [
    { id: 1, label: "0 Nodes\nlama-2",   },
    { id: 2, label: "1 Node\napi-gateway-tier" },
    { id: 3, label: "0 Nodes\nzoom-sa-tier",   },
    { id: 4, label: "400 HTTP backends", },
    { id: 5, label: "401 HTTP backends", },
    { id: 6, label: "402 HTTP backends", },
    { id: 7, label: "4006 HTTP backends" },
  ],
  edges: [
    { id:12,
      from: 1,
      to: 2,
      label: "0 calls /min, NaN\nHTTP",
      //arrows: { to: { enabled: true, scaleFactor: 1.2 } },
      fixed:true,
      font: { align: "top" },
      color: "blue",
    },
    {
      id:21,
      from: 2,
      to: 1,
      label: "9 calls /min\n1.7s +4 errors/min",
      //arrows: { to: { enabled: true, scaleFactor: 1.2 } },
      font: { align: "bottom" },
      
    },
    {
      id:14,
      from: 1,
      to: 4,
      label: "5 calls /min, NaN\nHTTP",
      //arrows: { to: { enabled: true, scaleFactor: 1.2 } },
      font: { align: "middle" },
     
    },
    {
      id:42,
      from: 4,
      to: 2,
      label: "4 HTTP backends",
      //arrows: { to: { enabled: true, scaleFactor: 1.2 } },
      font: { align: "middle" },
     
    },
    {
      id:23,
      from: 2,
      to: 3,
      label: "1 calls /min, NaN\nHTTP",
      //arrows: { to: { enabled: true, scaleFactor: 1.2 } },
      font: { align: "middle" },     
    },
    {
      id:56,
      from: 5,
      to: 6,
      label: "1 calls /min, NaN\nHTTP",
      //arrows: { to: { enabled: true, scaleFactor: 1.2 } },
      font: { align: "middle" },     
    },
    {
      id:57,
      from: 2,
      to: 7,
      label: "1 calls /min, NaN\nHTTP",
      //arrows: { to: { enabled: true, scaleFactor: 1.2 } },
      font: { align: "middle" },     
    },
    {
      id:67,
      from: 6,
      to: 7,
      label: "1 calls /min, NaN\nHTTP",
      //arrows: { to: { enabled: true, scaleFactor: 1.2 } },
      font: { align: "middle" },  
      title:"hello amit " ,
      color:"red"    
    },
    {
      id:77,
      from: 7,
      to: 7,
      label: "1 calls /min, NaN\nHTTP",
      //arrows: { to: { enabled: true, scaleFactor: 1.2 } },
      font: { align: "middle" },   
     
    },
  ],
};
const App = () => {
  const graphRef = useRef({});

  const options = {
    layout: {
      hierarchical: true, // Free layout
    },
    edges: {
      smooth: false, // Ensure straight lines
      color: "#000000",
      
      length:300,
      font: {
        size: 10, // Decrease edge label font size
        align: "horizontal", // Align text horizontally for clarity
      },
    },
    nodes: {
      font: {
        size: 16,
        align: "center",
      },
      //shape: "dot",
      size: 25,
      borderWidth: 5,
      borderWidthSelected:5,
      color: {
        border: '#00d180',
        background: 'white',
        highlight: {
          border: '#2B7CE9',
          //background: '#D2E5FF'
        },
        hover: {
          border: '#2B7CE9',
          background: '#D2E5FF'
        }
      },
      shape:"diamond"
    },
    physics: {
      enabled: true,
      solver: "forceAtlas2Based", // Use a physics engine that spaces nodes better
      forceAtlas2Based: {
        gravitationalConstant: -50, // Increase repulsion
        centralGravity: 0.01,
        springLength: 100, // Space out nodes
        springConstant: 0.08,
      },
      stabilization: false
      //maxVelocity: 50,
      //stabilization: { iterations: 150 }, // Stabilize graph after layout
    }
  };

  const [graphs, setGraph] = useState({...initialGraph});
  
  const events = {
    // select: function (event) {
    //   const { nodes, edges } = event;
    //   console.log("Selected nodes:", nodes);
    //   console.log("Selected edges:", edges);
    // },
    dragEnd: (event) => {
      const { nodes } = event;
      if (nodes.length > 0) {
        const nodeId = nodes[0];
        // Update the graph state to make the node fixed
        setGraph((prevGraph) => ({
          ...prevGraph,
          nodes: prevGraph.nodes.map((node) =>node.id === nodeId ? { ...node, fixed: true } : node
          ),
        }));
      }
    },
   
  };
  const resetGraph = () => {
    setGraph(initialGraph);
    
    // If you want to reset the zoom or pan as well:
    // if (graphRef.current) {
    //   // graphRef.current.setOptions({
    //   //   physics: { enabled: true },
    //   //   layout: { hierarchical: false },
    //   //   interaction: {
    //   //     zoomView: true,
    //   //     dragView: true,
    //   //   },
    //   //   edges: { color: '#000000' },
    //   //   nodes: { color: '#ffcc00' },
    //   // });

    //   // Reset zoom and pan manually (if needed)
    //   graphRef.current.setView({ scale: 1, offset: { x: 0, y: 0 } });
    // }
  };

  return (
    <div style={{ height: "800px",background:"#f3f3f3" }}>
     <button onClick={()=>{console.log(initialGraph)}}>Reset</button>
     <button onClick={resetGraph}>Reset Graph</button>
      <Graph
        ref={graphRef}
        graph={graphs}
        options={options}
        events={events}
        style={{ height: "100%" }}
        navigationButtons
      />


      
    </div>
  );
};

export default App;
