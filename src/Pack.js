import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import {
  forceSimulation,
  forceManyBody,
  forceCenter,
  forceCollide
} from "d3-force";
import { scaleSqrt, scaleLinear } from "d3-scale";
import { csv } from "d3-fetch";
import ReactTooltip from "react-tooltip";
import dataDensity from './density.csv';

const width = 200;
const height = 200;
const radius = 100;
const hyp2 = Math.pow(radius, 2);

const pythag = (r, b, coord) => {
  // force use of b coord that exists in circle to avoid sqrt(x<0)
  b = Math.min(width - r - 0, Math.max(r + 0, b));

  var b2 = Math.pow((b - radius), 2),
      a = Math.sqrt(hyp2 - b2);

  // radius - sqrt(hyp^2 - b^2) < coord < sqrt(hyp^2 - b^2) + radius
  coord = Math.max(radius - a + r + 0,
              Math.min(a + radius - r - 0, coord));
  
  return coord;
}

const rScale = scaleLinear()
.domain([0, 1000])
.range([15, 0])

class PackViz extends Component {
  state = {
    nodes: [],
    activeState: null,
  };

  simulation = null;

  componentDidMount() {

    csv(dataDensity).then(density => {
      this.setState({ dd: density})

      const densityNumber = parseInt(density[20].density_dots);
      const dataPlain = [...Array(densityNumber).keys()];
      const dataObject = dataPlain.map((d) => {return {name: 'name', d: 1}})
    
      this.setUpForceLayout(
        dataObject,
          width,
          height
      );
    });
  }

  componentWillUnmount() {
    this.setState({ nodes: [] });
    if (this.simulation) {
      this.simulation.stop();
    }
  }

  setUpForceLayout = (res, width, height) => {
    console.log(res)
    //const [min, max] = extent(res, d => d.d);

    const simulationNodes = res
      .map(r => {
        r.radius = 1;
        return r;
      });

    this.simulation = forceSimulation(simulationNodes)
      .force("charge", forceManyBody().strength(8))
      .force("center", forceCenter(width / 2, height / 2))
      .force(
        "collision",
        forceCollide()
          .radius(n => n.radius + rScale(n.d))
          .strength(1)
          .iterations(2)
      )
      .on("tick", a => {
        simulationNodes.forEach(function(d) {
          d.x = pythag(1, d.y, d.x);
          d.y = pythag(1, d.x, d.y);
        });
        this.setState({ nodes: simulationNodes });
      })
      .on("end", a => {
        //this.setState({ nodes: simulationNodes });
      });

    this.simulation.restart();
  };

  render() {
    const { nodes, activeIndex } = this.state;
    const { selectChemical, selected } = this.props;
    return (
      <svg width={width} height={height}>
        <circle cx={width / 2} cy={height / 2} r={width / 2} stroke="black" strokeWidth={1} fill='none' />
        {nodes
          .filter(d => d.d > 0)
          .map((node, index) => {
            return (
              <g key={index}>
                <circle
                  ref={node.name}
                  cx={node.x}
                  cy={node.y}
                  className={`circle`}
                  stroke="black"
                  fill='black'
                  strokeWidth={1}
                  r={1}
                  onClick={() => selectChemical("chemical", node.name)}
                  style={{ cursor: "pointer" }}
                />
              </g>
            );
          })}
      </svg>
    );
  }
}

export default PackViz;