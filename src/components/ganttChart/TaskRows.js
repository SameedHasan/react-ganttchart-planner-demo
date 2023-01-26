import React, { useContext, useState } from "react";
import {
  createFormattedDateFromDate,
  createFormattedDateFromStr,
  dayDiff,
} from "./helpers/dateFunctions";
import CellRow from "./CellRow";
import { DataContext, StyleContext } from "./GanttChart";

const TaskRows = () => {
  const { tasks, taskDurations, setTaskDurations, curYear, curMonth, numDays } =
    useContext(DataContext);
  const { columnValue, lockHeight } = useContext(StyleContext);

  const ganttTimePeriod = {
    display: "grid",
    gridAutoFlow: "column",
    gridAutoColumns: `minmax(${columnValue}px, 1fr)`,
    outline: "0.5px solid #e9eaeb",
    textAlign: "center",
    height: `${lockHeight ? 75 : Math.floor(columnValue / 1.33)}px`,
    minHeight: "40px",
  };

  const [taskDurationElDraggedId, setTaskDurationElDraggedId] = useState(null);
  // const numMonths = monthDiff(startMonth, endMonth) + 1;
  let taskRows = [];
  let taskRow = [];
  // create task rows
  if (tasks) {
    tasks.forEach((task) => {
      for (let j = 1; j <= numDays; j++) {
        const formattedDate = createFormattedDateFromStr(curYear, curMonth, j);

        // creating row cells for each task
        taskRow.push(
          <div
            id={`${task.id}-${j}`}
            key={`${task.id}-${j}`}
            style={{
              ...ganttTimePeriodCell,
              backgroundColor:
                formattedDate === createFormattedDateFromDate(new Date())
                  ? "rgb(197 196 196)"
                  : "#fff",

              padding: "5px",
            }}
            data-task={task?.id}
            data-date={formattedDate}
            onDrop={onTaskDurationDrop}
          >
            <CellRow color="" />
            <CellRow color="" />
            <CellRow color="" />
            {taskDurations.map((el, i) => {
              if (el?.task === task?.id && el?.start === formattedDate) {
                let nd = new Array(dayDiff(el?.start, el?.end)).fill(0);

                return (
                  <div
                    key={`${i}-${el?.id}`}
                    tabIndex="0"
                    draggable="true"
                    onDragStart={() => handleDragStart(el?.id)}
                    style={{
                      ...taskDuration,
                      width: `calc(${dayDiff(
                        el?.start,
                        el?.end
                      )} * 100% - 2px )`,
                      // bottom: `${(100 / columnValue) * 2}px`,
                      bottom: "2px",
                      left: "1px",
                      display: "grid",
                      gridAutoFlow: "column",
                      gridAutoColumns: `minmax(${columnValue}px, 1fr)`,
                      height: `${
                        lockHeight ? 70 : Math.round(columnValue / 1.43) + 1
                      }px`,
                      outline: "2px solid black",
                    }}
                  >
                    {nd.map((d, i) => (
                      <div
                        id={`${task.id}-${j}-${i}`}
                        key={`${task.id}-${j}-${i}`}
                        style={{
                          ...ganttTimePeriodCell,
                          padding: "3px",
                          outline: "none",
                        }}
                        data-task={task?.id}
                        data-date={formattedDate}
                        // false because we dont want one task on another
                        draggable={false}
                      >
                        {el.resources.map((r) => (
                          <CellRow key={r.id} color={r.color} />
                        ))}
                      </div>
                    ))}
                  </div>
                );
              }
            })}
          </div>
        );
      }

      taskRows.push(
        <div key={`${1}-${task?.id}`} style={ganttTimePeriod} id="taskrows">
          {taskRow}
        </div>
      );
      taskRow = [];
    });
  }

  function handleDragStart(taskDurationId) {
    setTaskDurationElDraggedId(taskDurationId);
  }

  function onTaskDurationDrop(e) {
    // console.log("first", e.target);
    let targetCell = e.target.parentElement.parentElement.parentElement;
    if (
      e.target.parentElement.parentElement.parentElement.hasAttribute(
        "data-task"
      )
    ) {
      targetCell = e.target.parentElement.parentElement.parentElement;
    } else if (e.target.hasAttribute("data-task")) {
      targetCell = e.target;
    } else if (e.target.parentElement.hasAttribute("data-task")) {
      targetCell = e.target.parentElement;
    } else if (e.target.parentElement.parentElement.hasAttribute("data-task")) {
      targetCell = e.target.parentElement.parentElement;
    } else {
      targetCell = e.target.parentElement.parentElement.parentElement;
      console.log("object", targetCell);
    }

    // new logic
    // const targetCell = e.target.parentElement.parentElement;
    //original logic
    // const targetCell = e.target;
    // console.log("targetcell", targetCell);

    // prevent adding on another taskDuration
    if (!targetCell.hasAttribute("draggable")) {
      // find task
      const taskDuration = taskDurations.filter(
        (taskDuration) => taskDuration.id === taskDurationElDraggedId
      )[0];

      const dataTask = targetCell.getAttribute("data-task");
      const dataDate = targetCell.getAttribute("data-date");

      const daysDuration = dayDiff(taskDuration.start, taskDuration.end);

      // get new task values
      // get start, calc end using daysDuration - make Date objects - change taskDurations
      const newTask = parseInt(dataTask);
      const newStartDate = new Date(dataDate);
      let newEndDate = new Date(dataDate);
      newEndDate.setDate(newEndDate.getDate() + daysDuration - 1);

      // update taskDurations
      taskDuration.task = newTask;
      taskDuration.start = createFormattedDateFromDate(newStartDate);
      taskDuration.end = createFormattedDateFromDate(newEndDate);

      const newTaskDurations = taskDurations.filter(
        (taskDuration) => taskDuration.id !== taskDurationElDraggedId
      );
      newTaskDurations.push(taskDuration);

      // update state (if data on backend - make API request to update data)
      setTaskDurations(newTaskDurations);
    }
    setTaskDurationElDraggedId(null);
  }
  return (
    <div
      id="gantt-time-period-cell-container"
      style={{
        gridColumn: "1/-1",
        display: "grid",
        // gridTemplateColumns: `repeat(${numMonths}, 1fr)`,
        paddingLeft: "0.5px",
        zIndex: "-1",
      }}
      onDragOver={(e) => e.preventDefault()}
    >
      {taskRows}
    </div>
  );
};

export default TaskRows;

// styling
const ganttTimePeriodCell = {
  position: "relative",
  outline: "0.5px solid darkgrey",
  marginTop: "0.5px",
};

const taskDuration = {
  position: "absolute",
  height: "calc(65px - 5px)",
  zIndex: "1",
  boxShadow: "3px 3px 3px rgba(0, 0, 0, 0.05)",
  cursor: "move",
};
