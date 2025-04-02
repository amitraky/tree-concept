import React, { Component } from "react";
import _ from "lodash";
import Graph from "react-graph-vis";

import "./styles.css";
//appDyanmaic
//green
//arrow color: #0040b7

class ForceGraph extends Component {
  constructor() {
    super();
    this.graphRef = React.createRef();
    this.state = {
      options: {
        clickToUse: false,
        layout: {
          hierarchical: {
            enabled: false,
            direction: "UD",
            sortMethod: "hubsize",
            shakeTowards: "roots",
            levelSeparation: 150,
            nodeSpacing: 150,
            treeSpacing: 200,
          },
        },
        interaction: {
          tooltipDelay: 10000,
          navigationButtons: true,
          keyboard: false,
          hover: true,
          multiselect: true,
          hoverConnectedEdges: false,
        },
        physics: {
          enabled: false,
          // forceAtlas2Based: {
          //   gravitationalConstant: -26,
          //   centralGravity: 0.005,
          //   springLength: 230,
          //   springConstant: 0.18,
          //   avoidOverlap: 1.5
          // },
          // maxVelocity: 146,
          // solver: "forceAtlas2Based",
          // timestep: 0.35
          // stabilization: {
          //   enabled: true,
          //   iterations: 1000,
          //   updateInterval: 25
          // }
        },
        nodes: {
          fixed: {
            x: false,
            y: false,
          },
          color: {
            hover: {
              border: "red",
              background: "rgba(255,255,255,1)",
            },
          },
          font: {
            size: 20,
          },
          shape: "dot",
          size: 30,
          scaling: {
            type: "incomingAndOutgoingConnections",
            min: 10,
            max: 60,
            label: {
              enabled: true,
              min: 20,
              max: 32,
            },
          },
        },
        edges: {
          // hoverWidth: 1.5,
          // physics: true,
          width: 1.5,
          arrows: {
            to: {
              enabled: false,
              scaleFactor: 1,
              type: "arrow",
            },
          },
          color: {
            color: "#000000",
            highlight: "#000000",
            hover: "#000000",
            strokeWidth: 6,
            // inherit: 'from',
            inherit: false,
          },
          font: {
            size: 20,
            color: "black",
            // color: 'white',
            strokeWidth: 6,
            strokeColor: "white",
            // strokeColor: 'black',
          },
          // smooth: true
        },
      },
      graph: {
        nodes: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
        edges: [
          { from: 1, to: 2, label: "A" },
          { from: 1, to: 5, label: "B", width: 3, arrows: "to" },
          { from: 2, to: 4, label: "C" },
          { from: 4, to: 4, label: "F" },
          { from: 5, to: 2, label: "D", width: 3, arrows: "to" },
          { from: 2, to: 3, label: "E", width: 3, arrows: "to" },
        ],
      },
      events: {
        hoverNode: (el) => {
          const node = el.node;
          const currentGraph = this.graphRef.current;
          const network = currentGraph.Network;
          const tree = document.getElementById("data-tree-container");
          if (tree) {
            const elements = document.getElementsByClassName(
              "dataTree_" + node
            );
            if (elements) {
              [...elements].forEach((elVal) => {
                elVal.style.fontWeight = 600;
              });
            }
            network.body.nodes[node].options.borderWidth = 6;
            const optionsContainer = document.getElementById(
              "graph-options-container"
            );
            if (optionsContainer) {
              optionsContainer.style.visibility = "hidden";
              optionsContainer.style.display = "none";
            }
            const contextMenuContainer = document.getElementById(
              "graph-contextmenu-container"
            );
            const contextMenuEdgeContainer = document.getElementById(
              "graph-contextmenu-edge-container"
            );
            if (contextMenuContainer) {
              contextMenuContainer.style.visibility = "hidden";
              contextMenuContainer.style.display = "none";
            }
            if (contextMenuEdgeContainer) {
              contextMenuEdgeContainer.style.visibility = "hidden";
              contextMenuEdgeContainer.style.display = "none";
            }
            network.unselectAll();
          }
        },
        blurNode: (el) => {
          const node = el.node;
          const currentGraph = this.graphRef.current;
          const network = currentGraph.Network;
          const tree = document.getElementById("data-tree-container");
          if (tree) {
            const elements = document.getElementsByClassName(
              "dataTree_" + node
            );
            if (elements) {
              [...elements].forEach((elValue) => {
                elValue.style.fontWeight = 100;
              });
            }
            network.body.nodes[node].options.borderWidth = 3;
          }
        },
        hoverEdge: (el) => {
          const tree = document.getElementById("data-tree-container");
          if (tree) {
            const currentGraph = this.graphRef.current;
            const network = currentGraph.Network;
            const nodeParent = network.body.edges[el.edge].fromId;
            Object.values(network.body.edges).forEach((edge) => {
              if (
                edge.fromId === nodeParent &&
                edge.options.label === network.body.edges[el.edge].options.label
              ) {
                const index = network.body.edgeIndices.findIndex(
                  (id) => id === edge.id
                );
                const obj = document.getElementById("dataTree_edge" + index);
                if (obj) {
                  obj.style.fontWeight = 600;
                }
              }
            });
          }
        },
        blurEdge: (el) => {
          const tree = document.getElementById("data-tree-container");
          if (tree) {
            const currentGraph = this.graphRef.current;
            const network = currentGraph.Network;
            const nodeParent = network.body.edges[el.edge].fromId;
            Object.values(network.body.edges).forEach((edge) => {
              if (
                edge.fromId === nodeParent &&
                edge.options.label === network.body.edges[el.edge].options.label
              ) {
                const index = network.body.edgeIndices.findIndex(
                  (id) => id === edge.id
                );
                const obj = document.getElementById("dataTree_edge" + index);
                if (obj) {
                  obj.style.fontWeight = 100;
                }
              }
            });
          }
        },
        click: (event) => {
          const { nodes, edges } = event;
          const contextMenuContainer = document.getElementById(
            "graph-contextmenu-container"
          );
          const contextMenuEdgeContainer = document.getElementById(
            "graph-contextmenu-edge-container"
          );
          if (contextMenuContainer) {
            contextMenuContainer.style.visibility = "hidden";
            contextMenuContainer.style.display = "none";
          }
          if (contextMenuEdgeContainer) {
            contextMenuEdgeContainer.style.visibility = "hidden";
            contextMenuEdgeContainer.style.display = "none";
          }
          return { nodes, edges };
        },
        afterDrawing: (ctx) => ctx,
        beforeDrawing: (ctx) => ctx,
        selectNode: (clickEvent) => {
          const { nodes } = clickEvent;
          const nodeId = nodes[0];
          const currentGraph = this.graphRef.current;
          currentGraph.lastClickedNode = nodeId;

          if (currentGraph) {
            const network = currentGraph.Network;
            // const graphOptionsRef = this.graphOptionsRef.current;
            if (network && nodeId) {
              if (network.body.nodes[nodeId]) {
                network.body.nodes[nodeId].options.borderWidth = 3;
              }
            }
            if (
              nodeId &&
              // nodeId.includes("cluster:") &&
              network.isCluster(nodeId)
            ) {
              network.openCluster(nodeId);
              network.setOptions({ physics: true });
              setTimeout(() => {
                network.setOptions({ physics: false });
              }, 300);
            } else if (nodeId) {
              // graphOptionsRef.setState({});
              // network.focus(nodeId, {
              //   scale: 1,
              //   animation: {
              //     duration: 120,scc
              //     easingFunction: 'easeInOutQuad',
              //   }
              // });
              // window.setTimeout(() => {
              //   const optionsContainer = document.getElementById(
              //     "graph-options-container"
              //   );
              //   optionsContainer.style.visibility = "visible";
              //   optionsContainer.style.display = "block";
              //   optionsContainer.style.right = "0px";
              //   optionsContainer.style.top = "43px";
              //   // neighbourhoodHighlight(clickEvent, graphOptionsRef.props.getNodes(), network);
              // }, 220);
            }
          }
        },
        deselectNode: (/* clickEvent */) => {
          const optionsContainer = document.getElementById(
            "graph-options-container"
          );
          if (optionsContainer) {
            optionsContainer.style.visibility = "hidden";
            optionsContainer.style.display = "none";
          }
          const contextMenuContainer = document.getElementById(
            "graph-contextmenu-container"
          );
          const contextMenuEdgeContainer = document.getElementById(
            "graph-contextmenu-edge-container"
          );
          if (contextMenuContainer) {
            contextMenuContainer.style.visibility = "hidden";
            contextMenuContainer.style.display = "none";
          }
          if (contextMenuEdgeContainer) {
            contextMenuEdgeContainer.style.visibility = "hidden";
            contextMenuEdgeContainer.style.display = "none";
          }
          // neighbourhoodHighlight(clickEvent, graphOptionsRef.props.getNodes(), network);
          this.graphRef.current.lastClickedNode = null;
        },
        doubleClick: (params) => {
          params.event.preventDefault();
          const currentGraph = this.graphRef.current;
          const network = currentGraph.Network;
          const firstDegreeConnections = [
            ...network.getConnectedNodes(params.nodes),
            ...params.nodes,
          ];
          const connectedNodes = [];
          firstDegreeConnections.forEach((node) => {
            const nodeConnections = network.getConnectedNodes(node);
            connectedNodes.push(node);
            nodeConnections.forEach((scndNode) => {
              if (!connectedNodes.includes(scndNode)) {
                connectedNodes.push(scndNode); // Will bring second degree node connections
              }
            });
          });
          const contextMenuContainer = document.getElementById(
            "graph-contextmenu-container"
          );
          const contextMenuEdgeContainer = document.getElementById(
            "graph-contextmenu-edge-container"
          );
          if (contextMenuContainer) {
            contextMenuContainer.style.visibility = "hidden";
            contextMenuContainer.style.display = "none";
          }
          if (contextMenuEdgeContainer) {
            contextMenuEdgeContainer.style.visibility = "hidden";
            contextMenuEdgeContainer.style.display = "none";
          }
          network.selectNodes(connectedNodes);
        },
        stabilizationProgress: (params) => {
          const maxWidth = 496;
          const minWidth = 20;
          const widthFactor = params.iterations / params.total;
          const width = Math.max(minWidth, maxWidth * widthFactor);
          // document.getElementById('graphLoadingBar').style.visibility = 'auto';
          document.getElementById("graphLoadingBar").style.display = "block";
          document.getElementById("bar").style.width = width + "px";
          document.getElementById("text").innerText =
            Math.round(widthFactor * 100) + "%";
        },
        stabilizationIterationsDone: () => {
          document.getElementById("graphLoadingBar").style.display = "none";
          const currentGraph = this.graphRef.current;
          if (currentGraph) {
            const network = currentGraph.Network;
            const nodePositions = network.getPositions();
            const graph = _.cloneDeep(this.state.graph);
            graph.nodes = graph.nodes.map((node) => ({
              ...node,
              ...nodePositions[node.id],
            }));
            // network.setData({ nodes: graph.nodes, edges: graph.edges });
            // network.setOptions({ physics: false });

            this.setState({
              graph: { nodes: graph.nodes, edges: graph.edges },
              options: { ...this.state.options, physics: false },
            });

            const lastClickedNode = currentGraph.lastClickedNode;
            if (lastClickedNode) {
              setTimeout(() => {
                network.selectNodes([lastClickedNode]);
                currentGraph.props.events.selectNode({
                  nodes: [lastClickedNode],
                });
              }, 0);
            }
          }
        },
      },
    };
  }

  addOne(nodes, edges) {
    const id = nodes.length + 1;
    nodes.push({ id, label: `bar#${id}` });
    edges.push({ from: id - 1, to: id });
  }

  addNew() {
    const nodesCopy = [...this.state.graph.nodes];
    const edgesCopy = [...this.state.graph.edges];

    this.addOne(nodesCopy, edgesCopy);
    this.setState({
      graph: {
        nodes: nodesCopy.slice(),
        edges: edgesCopy.slice(),
      },
    });
  }

  addFive() {
    const nodesCopy = [...this.state.graph.nodes];
    const edgesCopy = [...this.state.graph.edges];

    let i = 1;
    do {
      this.addOne(nodesCopy, edgesCopy);
    } while (i++ < 5);

    this.setState({
      graph: {
        nodes: nodesCopy.slice(),
        edges: edgesCopy.slice(),
      },
    });
  }

  removeLast() {
    let nodesCopy = [...this.state.graph.nodes];
    let edgesCopy = [...this.state.graph.edges];
    const id = nodesCopy.length;

    nodesCopy = nodesCopy.filter((n) => n.id !== id);
    edgesCopy = edgesCopy.filter((e) => e.to !== id);

    this.setState({
      graph: {
        nodes: nodesCopy.slice(),
        edges: edgesCopy.slice(),
      },
    });
  }

  render() {
    return (
      <div className="App">
        <div id="graphLoadingBar">
          <div>LOADING</div>
          <div id="loadingBar">
            <div className="outerBorder">
              <div id="text">0%</div>
              <div id="border" />
              <div id="bar" />
            </div>
          </div>
        </div>
        

        <div id="graph" style={{ height: "100vh" }}>
          <Graph
            ref={this.graphRef}
            graph={this.state.graph}
            options={this.state.options}
            events={this.state.events}
          />
        </div>
      </div>
    );
  }
}

export default ForceGraph;
