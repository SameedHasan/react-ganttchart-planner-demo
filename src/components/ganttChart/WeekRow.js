import React, { useContext } from "react";
import {
  createFormattedDateFromDate,
  createFormattedDateFromStr,
  getDayOfWeek,
} from "./helpers/dateFunctions";
import { DataContext, StyleContext } from "./GanttChart";

const WeekRow = () => {
  const { startMonth, curYear, curMonth, numDays } = useContext(DataContext);
  const { columnValue, lockHeight } = useContext(StyleContext);
  const ganttTimePeriod = {
    display: "grid",
    gridAutoFlow: "column",
    gridAutoColumns: `minmax(${columnValue}px, 1fr)`,
    outline: "0.5px solid #e9eaeb",
    textAlign: "center",
    height: "75px",
  };

  let weekRow = [];
  for (let j = 1; j <= numDays; j++) {
    const formattedDate = createFormattedDateFromStr(curYear, curMonth, j);

    weekRow.push(
      <div
        key={j}
        style={{
          ...ganttTimePeriod,
          outline: "none",
          border: "1px solid darkgrey",
          height: "50px",
          backgroundColor:
            formattedDate === createFormattedDateFromDate(new Date())
              ? "rgb(197 196 196)"
              : "#fff",
        }}
      >
        <span style={{ margin: "auto", color: "#3E455B" }}>
          {getDayOfWeek(curYear, curMonth - 1, j - 1)}
          <br />
          {startMonth.getMonth() + 1} / {j}
        </span>
      </div>
    );
  }

  return (
    <div
      style={{
        ...ganttTimePeriod,
        outline: "none",
        height: "51px",
      }}
    >
      {weekRow}
    </div>
  );
};

export default WeekRow;
