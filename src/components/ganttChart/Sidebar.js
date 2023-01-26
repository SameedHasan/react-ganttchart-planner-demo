import React, { useContext } from "react";

import AddTask from "./AddTask";
import Modal from "./Modal";
import { DataContext, StyleContext } from "./GanttChart";
const Sidebar = ({ firstDivRef, handleScrollFirst }) => {
  const { columnValue, lockHeight } = useContext(StyleContext);
  const { tasks } = useContext(DataContext);

  return (
    <div
      style={{
        outline: " 0.5px solid rgb(233 234 235)",
        overflowX: "scroll",
        overflowX: "hidden",
      }}
      onScroll={handleScrollFirst}
      ref={firstDivRef}
    >
      <div id="gantt-grid-container__tasks">
        {/* <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <h1 className="heading">Tasks</h1>
          <Modal btnName="Add task">
            <AddTask />
          </Modal>
        </div> */}

        <div
          className="gantt-task-row"
          style={{
            height: "50px",
          }}
        >
          <input value={"Job Id"} disabled />
          <input value={"Ship"} disabled />
        </div>

        {tasks &&
          tasks.map((tsk, i) => (
            <div key={`${i}-${tsk?.id}-${tsk.name}`} className="gantt-task-row">
              <input data-task-id={tsk?.id} value={tsk?.name} disabled />
              <input data-task-id={tsk?.id} value={tsk?.name} disabled />
            </div>
          ))}

        <style>{`
          #gantt-grid-container__tasks {
            outline: 0.5px solid rgb(233 234 235);
          }

          .heading{
             text-align: center;
              width: 100%;
              height: 42px;
              fontWeight: bold;
          }

          .gantt-task-row {
            display: flex;
            // justify-content: space-around;
            outline: 0.5px solid rgb(233 234 235);
            // text-align: center;
            height: ${lockHeight ? 75 : Math.floor(columnValue / 1.33)}px;
            border: none;
            // padding:5px;
          }

          input {
            width: 100%;
            border: none;
            outline: none;
            text-align: center;
            background: none;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Sidebar;
