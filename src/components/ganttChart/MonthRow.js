import React, { useContext } from "react";
import { months } from "./helpers/constants";
import { Checkbox, Slider } from "antd";
import { DataContext, StyleContext } from "./GanttChart";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const MonthRow = () => {
  const { startMonth, handleMonth } = useContext(DataContext);
  const { setColumnValue, setLockHeight } = useContext(StyleContext);

  const formatter = (value) => `${value}%`;
  const onChange = (value) => {
    setColumnValue(value);
  };
  const onChangeCheckbox = (e) => {
    console.log(`checked = ${e.target.checked}`);
    setLockHeight(e.target.checked);
  };
  return (
    <div style={divCenter}>
      <div style={{ margin: "9px" }}>
        <Checkbox defaultChecked onChange={onChangeCheckbox}>
          Lock Height
        </Checkbox>
      </div>
      <div style={{ width: "100px", margin: "3px" }}>
        <Slider
          min={50}
          max={400}
          step={10}
          defaultValue={100}
          tooltip={{
            formatter,
          }}
          onChange={onChange}
        />
      </div>

      <div style={divCenter}>
        <button onClick={() => handleMonth("p")} style={buttonStyle}>
          <LeftOutlined />
        </button>
        <div style={ganttTimePeriodM}>
          <span style={ganttTimePeriodSpan}>
            {months[startMonth.getMonth()] + " " + startMonth.getFullYear()}
          </span>
        </div>
        <button onClick={() => handleMonth("n")} style={buttonStyle}>
          <RightOutlined />
        </button>
      </div>
    </div>
  );
};

export default MonthRow;

const buttonStyle = {
  padding: "5px",
  margin: "5px",
  cursor: "pointer",
};
const ganttTimePeriodM = {
  display: "grid",
  gridAutoFlow: "column",
  gridAutoColumns: "minmax(30px, 1fr)",
  textAlign: "center",
  height: "40px",
  outline: "none",
};
const ganttTimePeriodSpan = {
  margin: "auto",
};

const divCenter = {
  display: "flex",
  textAlign: "center",
};
