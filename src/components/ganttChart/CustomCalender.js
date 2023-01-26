import React from "react";
import MonthRow from "./MonthRow";
import WeekRow from "./WeekRow";
import TaskRows from "./TaskRows";

const CustomCalender = ({ secondDivRef, handleScrollSecond }) => {
  return (
    <div
      id="gantt-grid-container__time"
      style={{ overflowY: "scroll" }}
      onScroll={handleScrollSecond}
      ref={secondDivRef}
    >
      {/* <MonthRow /> */}
      <WeekRow />
      <TaskRows />
    </div>
  );
};

export default CustomCalender;
