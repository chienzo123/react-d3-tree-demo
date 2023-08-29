import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const MixedNodeElement = ({ nodeData = {}, triggerNodeToggle, foreignObjectProps = {} }) => {
  const nodeRef = React.useRef(null);
  const [{ isDragging }, drag] = useDrag({
    type: 'node',
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (a, monitor) => {
      const dropResult = monitor.getDropResult();
      if(dropResult)
      alert(`You moved ${nodeData.name} to ${dropResult.name}`);
    }
    
  });

  const [{ isOver }, drop] = useDrop({
    accept: 'node',
    drop: () => (
      { name: nodeData.name }
    ),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });
  return (
    <React.Fragment>
      <foreignObject {...foreignObjectProps}>
        <div ref={drop}>
        <div ref={drag}>
        <div
        ref={nodeRef}
        onClick={triggerNodeToggle}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '1px solid black',
            backgroundColor: 'rgb(248, 248, 255)', // ghostwhite
          }}
        >
          <h3>{nodeData.name}</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {nodeData.attributes &&
              Object.keys(nodeData.attributes).map((labelKey, i) => (
                <li key={`${labelKey}-${i}`}>
                  {labelKey}: {nodeData.attributes[labelKey]}
                </li>
              ))}
          </ul>
        </div>
        </div>
        </div>
      </foreignObject>
    </React.Fragment>
  );
};

export default MixedNodeElement;
