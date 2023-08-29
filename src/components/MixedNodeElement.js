import React from "react";
import { useDrag, useDrop } from "react-dnd";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const card = name => {
  return (
    <React.Fragment>
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </React.Fragment>
  );
};

const MixedNodeElement = ({
  nodeData = {},
  triggerNodeToggle,
  foreignObjectProps = {}
}) => {
  const nodeRef = React.useRef(null);
  const [{ isDragging }, drag] = useDrag({
    type: "node",
    collect: monitor => ({
      isDragging: monitor.isDragging()
    }),
    end: (a, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult) alert(`You moved ${nodeData.name} to ${dropResult.name}`);
    }
  });

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "node",
    drop: () => ({ name: nodeData.name }),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });
  const isActive = canDrop && isOver;
  let backgroundColor = "white";
  if (isActive) {
    backgroundColor = "#ddffd2";
  } else if (canDrop) {
    backgroundColor = "#ffeedc";
  }
  const opacity = isDragging ? 0.4 : 1;
  return (
    <React.Fragment>
      <foreignObject {...foreignObjectProps}>
        <div ref={drop}>
          <div ref={drag}>
            <Box sx={{ minWidth: 200 }}>
              <Card
                ref={nodeRef}
                onClick={triggerNodeToggle}
                variant="outlined"
                style={{ cursor: "pointer", opacity, backgroundColor }}
              >
                {card(nodeData.name)}
              </Card>
            </Box>
          </div>
        </div>
      </foreignObject>
    </React.Fragment>
  );
};

export default MixedNodeElement;
