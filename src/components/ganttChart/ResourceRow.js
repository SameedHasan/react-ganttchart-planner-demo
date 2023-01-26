import React, { useContext } from "react";
import { createFormattedDateFromStr } from "./helpers/dateFunctions";
import CellRow from "./CellRow";
import { DataContext, StyleContext } from "./GanttChart";

const ResourceRow = ({ color, r }) => {
  const { taskDurations, curYear, curMonth, numDays } = useContext(DataContext);
  const { columnValue, lockHeight } = useContext(StyleContext);
  const ganttTimePeriod = {
    display: "grid",
    gridAutoFlow: "column",
    gridAutoColumns: `minmax(${columnValue}px, 1fr)`,
    textAlign: "center",
    outline: "none",
    height: `${lockHeight ? 30 : columnValue / 5 + 10}px`,
  };

  let weekRow = [];
  let dates = [];
  for (let i = 1; i <= numDays; i++) {
    const formattedDate = createFormattedDateFromStr(curYear, curMonth, i);
    taskDurations.map((el) => {
      let obj = el.resources.find((o) => o.id === r.id);
      if (obj) {
        const start = Date.parse(el.start);
        const end = Date.parse(el.end);
        const d = Date.parse(formattedDate);
        if (d >= start && d <= end) {
          dates.push(i);
        }
      }
    });
  }

  for (let j = 1; j <= numDays; j++) {
    weekRow.push(
      <div key={j} style={ganttTimePeriodCell}>
        {dates.includes(j) ? <CellRow color={color} /> : <CellRow color="" />}
      </div>
    );
  }

  return <div style={ganttTimePeriod}>{weekRow}</div>;
};

export default ResourceRow;

// styling
const ganttTimePeriodCell = {
  position: "relative",
  outline: "0.5px solid darkgrey",
  marginTop: "0.5px",
  backgroundColor: "#fff",
  padding: "5px",
};
