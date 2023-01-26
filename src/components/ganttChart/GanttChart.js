import React, { useState, useRef, useContext, createContext } from "react";
import Split from "react-split";
import CustomCalender from "./CustomCalender";
import BottomBar from "./BottomBar";
import Sidebar from "./Sidebar";

import { getDaysInMonth } from "./helpers/dateFunctions";

import Header from "./Header";
import { styleCss } from "./helpers/style";

const ShiftContext = createContext();
const StyleContext = createContext();
const DataContext = createContext();

const GanttChart = ({ shifts, tasksArray, durationsArray, resourcesArray }) => {
  // const shifts = 4;
  const [columnValue, setColumnValue] = useState(100);
  const [lockHeight, setLockHeight] = useState(true);

  const [tasks, setTasks] = useState(tasksArray);
  const [taskDurations, setTaskDurations] = useState(durationsArray);
  const [resources, setResources] = useState(resourcesArray);
  const [startMonth, setStartMonth] = useState(new Date());
  const [endMonth, setEndMonth] = useState(new Date());

  const curYear = startMonth.getFullYear();
  const curMonth = startMonth.getMonth() + 1;
  const numDays = getDaysInMonth(curYear, curMonth);

  const handleMonth = (state) => {
    if (state === "p") {
      setStartMonth(new Date(startMonth.setMonth(startMonth.getMonth() - 1)));
      setEndMonth(new Date(startMonth.setMonth(startMonth.getMonth() - 1)));
    } else if (state === "n") {
      setStartMonth(new Date(startMonth.setMonth(startMonth.getMonth() + 1)));
    }
  };

  // refs to sync scrollbars
  const firstDivRef = useRef();
  const secondDivRef = useRef();
  const thirdDivRef = useRef();

  // functions to sync scrollbars
  const handleScrollFirst = (scroll) => {
    secondDivRef.current.scrollTop = scroll.target.scrollTop;
  };
  const handleScrollSecond = (scroll) => {
    firstDivRef.current.scrollTop = scroll.target.scrollTop;
    thirdDivRef.current.scrollLeft = scroll.target.scrollLeft;
  };
  const handleScrollThird = (scroll) => {
    secondDivRef.current.scrollLeft = scroll.target.scrollLeft;
  };

  return (
    <DataContext.Provider
      value={{
        tasks,
        setTasks,
        taskDurations,
        setTaskDurations,
        resources,
        setResources,
        startMonth,
        setStartMonth,
        endMonth,
        setEndMonth,
        handleMonth,
        curYear,
        curMonth,
        numDays,
      }}
    >
      <ShiftContext.Provider value={shifts > 4 ? 4 : shifts}>
        <StyleContext.Provider
          value={{ columnValue, setColumnValue, lockHeight, setLockHeight }}
        >
          <Header />
          <Split
            sizes={[75, 25]}
            direction="vertical"
            style={{ height: "100vh", width: "100vw" }}
            gutterSize={10}
            gutterAlign="center"
            cursor="col-resize"
          >
            <div>
              <Split
                sizes={[16.3, 83.7]}
                style={{ display: "flex", height: "100%", width: "100vw" }}
              >
                <Sidebar
                  handleScrollFirst={handleScrollFirst}
                  firstDivRef={firstDivRef}
                />

                <CustomCalender
                  tasks={tasks}
                  taskDurations={taskDurations}
                  setTaskDurations={setTaskDurations}
                  endMonth={endMonth}
                  startMonth={startMonth}
                  handleMonth={handleMonth}
                  handleScrollSecond={handleScrollSecond}
                  secondDivRef={secondDivRef}
                />
              </Split>
            </div>
            <BottomBar
              handleScrollThird={handleScrollThird}
              thirdDivRef={thirdDivRef}
            />
          </Split>
        </StyleContext.Provider>
      </ShiftContext.Provider>
      <style>{styleCss}</style>
    </DataContext.Provider>
  );
};

GanttChart.defaultProps = {
  shifts: 4,
  tasksArray: [],
  durationsArray: [],
  resourcesArray: [],
};

export default GanttChart;
export { DataContext, ShiftContext, StyleContext };
