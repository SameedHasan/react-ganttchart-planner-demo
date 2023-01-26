import React, { useContext } from "react";
import { StyleContext } from "./GanttChart";

const Cell = ({ color, visible }) => {
  const { columnValue, lockHeight } = useContext(StyleContext);
  const ganttTimePeriodCell = {
    position: "relative",
    outline: "0.5px solid #e9eaeb",
    visibility: visible,
    backgroundColor: color,
    minHeight: `${lockHeight ? 20 : columnValue / 5}px`,
    minWidth: `${columnValue / 5}px`,
    maxHeight: `${lockHeight ? 20 : columnValue / 5}px`,
  };
  return <div style={ganttTimePeriodCell}></div>;
};

Cell.defaultProps = {
  visible: "",
};

export default Cell;
