import React from "react";
import "./App.css";
import GanttChart from "./components/ganttChart/GanttChart";
import {
  tasksArray,
  durationsArray,
  resourcesArray,
} from "./components/ganttChart/helpers/data";
const App = () => {
  return (
    <GanttChart
      shifts={5}
      tasksArray={tasksArray}
      durationsArray={durationsArray}
      resourcesArray={resourcesArray}
    />
  );
};

export default App;
