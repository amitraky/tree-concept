import React, { useEffect } from "react";
import Graph from "react-graph-vis";

function ReactGraphVis() {
  const graph = {
    nodes: [
      { id: 1, label: "Procedurefffff \nsadfadsf" },
      { id: 2, label: "Patient",  shape: "dot"},
      { id: 3, label: "Condition",  shape: "dot"},
      { id: 4, label: "Observation" , shape: "dot"},
      { id: 5, label: "Encounter", shape: "dot" },
    ],
    edges: [
      { id:21,
        from: 2,
        to: 1,
        label: "20 req/20min https",
        smooth: {enabled: true,roundness: 1.5},
        color: "green",
      },
      {
        from: 1,
        to: 2,
        label: "40 req/20min http",
        smooth: {
          enabled: true,
          roundness: 1.5
        },
        color: "red",
      },
      {
        from: 3,
        to: 2,
        label: "Subject",
        smooth: {
          enabled: true,
        },
        // color: "#EAC215",
      },
      {
        from: 4,
        to: 2,
        label: "Subject",
        smooth: {
          enabled: true,
        },
        // color: "#5e765c",
      },
      {
        from: 5,
        to: 2,
        label: "Subject",
        smooth: {
          enabled: true,
        },
        // color: "#254460",
      },
      {
        from: 3,
        to: 5,
        label: "Subject",
        smooth: {
          enabled: true,
        },
        // color: "#EAC215",
      },
    ],
  };

  const options = {
    
    nodes: {
      //size: 50,
      shadow: true,
      borderWidth: 10,
      borderColor: "red",
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
      // chosen: {
      //   borderColor: "EAC215"
      // }
    },
    layout: {
      hierarchical: false,
    },
    edges: {
      color: "#000000",
    },
    height: "1200px",
    physics: {
      enabled: true,
      barnesHut: {
        theta: 0.5,
        gravitationalConstant: -2000,
        centralGravity: 0.3,
        springLength: 95,
        springConstant: 0.04,
        damping: 0.09,
        avoidOverlap: 0,
      },
      forceAtlas2Based: {
        theta: 0.5,
        gravitationalConstant: -50,
        centralGravity: 0.01,
        springConstant: 0.08,
        springLength: 100,
        damping: 0.4,
        avoidOverlap: 0,
      },
      repulsion: {
        centralGravity: 0.2,
        springLength: 200,
        springConstant: 0.05,
        nodeDistance: 100,
        damping: 0.09,
      },
      hierarchicalRepulsion: {
        centralGravity: 0.0,
        springLength: 100,
        springConstant: 0.01,
        nodeDistance: 120,
        damping: 0.09,
        avoidOverlap: 0,
      },
      maxVelocity: 50,
      minVelocity: 0.1,
      solver: "barnesHut",
      stabilization: {
        enabled: true,
        iterations: 1000,
        updateInterval: 100,
        onlyDynamicEdges: false,
        fit: true,
      },
      timestep: 0.5,
      adaptiveTimestep: true,
      wind: { x: 0, y: 0 },
    },
  };

  const events = {
    select: function (event) {
      var { nodes, edges } = event;
    },
  };

  useEffect(() => {
    fetch("https://hapi.fhir.org/baseR4/Patient/1698462", {})
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((jsonData) => {
        console.log(jsonData);
        console.log(jsonData.birthDate);
      })
      .catch((err) => {
        console.log("錯誤:", err);
      });

    console.log("====test=====");
  }, []);
  return (
    <Graph
      graph={graph}
      options={options}
      events={events}
      getNetwork={(network) => {
        //  if you want access to vis.js network api you can set the state in a parent component using this property
      }}
    />
  );
}

export default ReactGraphVis