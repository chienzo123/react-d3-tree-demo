import React, { Component } from 'react';
import clone from 'clone';
import Tree from 'react-d3-tree';
import MixedNodeElement from './components/MixedNodeElement';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from "react-dnd";
import './App.css';

// Data examples
import orgChartJson from './examples/org-chart.json';
const customNodeFnMapping = {
  mixed: {
    description: 'MixedNodeElement - SVG `circle` + `foreignObject` label',
    fn: ({ nodeDatum, toggleNode }, appState) => (
      <MixedNodeElement
        nodeData={nodeDatum}
        triggerNodeToggle={toggleNode}
        foreignObjectProps={{
          width: 200,
          height: 200,
          x: -100,
          y: -62,
        }}
      />
    ),
  },
};

const App = () => {
    const [state, setState ]= React.useState({
      data: orgChartJson,
      renderCustomNodeElement: customNodeFnMapping.mixed.fn,
      styles: {
        nodes: {
          node: {
            circle: {
              fill: '#52e2c5',
            },
            attributes: {
              stroke: '#000',
            },
          },
          leafNode: {
            circle: {
              fill: 'transparent',
            },
            attributes: {
              stroke: '#000',
            },
          },
        },
      },
    });

    return (
      <div className="App">
        <div className="demo-container">
          <div className="column-right">
            <div className="tree-container">
            <DndProvider backend={HTML5Backend}>
              <Tree
                hasInteractiveNodes
                data={state.data}
                renderCustomNodeElement={
                  state.renderCustomNodeElement
                    ? rd3tProps => state.renderCustomNodeElement(rd3tProps, state)
                    : undefined
                }
                orientation='vertical'
                enableLegacyTransitions
                transitionDuration={500}
                separation= {{ siblings: 2, nonSiblings: 2 }}
                translate={{ x: 200, y: 300 }}
                styles={state.styles}
              />
            </DndProvider>
            </div>
          </div>
        </div>
      </div>
    );
}

export default App;
