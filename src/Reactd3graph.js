import { Graph } from "react-d3-graph";

function Reactd3graph() {
  const data = {
    nodes: [
      { id: "1", size: 500, color: "lightblue", x: 100, y: 100 }, // Initial x and y
      { id: "2", size: 300, color: "orange", x: 200, y: 200 }, // Initial x and y
      { id: "3", size: 300, color: "green", x: 300, y: 300 }, // Initial x and y
    ],
    links: [
      { source: "1", target: "2", label: "Link 1-2" },
      { source: "2", target: "3", label: "Link 2-3" },
    ],
  };

  // the graph configuration, just override the ones you need
  const config = {
    directed: true,
    panAndZoom: true,
    zoom: {
      zoomSpeed: 0.1,
      minZoom: 0.1,
      maxZoom: 2.0,
    },
    node: {
      size: 300,
      color: "lightblue",
    },
    link: {
      renderLabel: true,
      highlightColor: "blue",
    },
  };

  const onClickNode = function (nodeId) {
    window.alert(`Clicked node ${nodeId}`);
  };

  const onClickLink = function (source, target) {
    window.alert(`Clicked link between ${source} and ${target}`);
  };
  return (
    <div>
      <div>
        <Graph
          id="graph-id" // id is mandatory
          data={data}
          config={config}
          onClickNode={onClickNode}
          onClickLink={onClickLink}
        />
      </div>
    </div>
  );
}

export default Reactd3graph;
