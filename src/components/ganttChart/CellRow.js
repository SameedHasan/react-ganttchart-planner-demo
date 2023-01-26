import { Col, Row } from "antd";
import React, { useContext } from "react";
import Cell from "./Cell";
import { ShiftContext } from "./GanttChart";
const CellRow = ({ color, length, skip }) => {
  const shifts = useContext(ShiftContext);
  let cells = [];
  for (let j = 1; j <= shifts; j++) {
    if (skip >= j) {
      cells.push(<Cell color="" visible="hidden" key={j} />);
    } else {
      cells.push(<Cell color={color} key={j} />);
      // cells.push(
      //   <Col span={24 / shifts} key={j}>
      //     <Cell color={color} key={j} />
      //   </Col>
      // );
    }
  }

  return (
    <div
      style={{
        // display: "flex",
        // justifyContent: "space-evenly",
        display: "grid",
        gridTemplateColumns: `repeat(${shifts}, 1fr)`,
      }}
    >
      {cells}
    </div>
    // <Row>{cells}</Row>
  );
};

export default CellRow;

{
  /* <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
  <Col className="gutter-row" span={6}>
    <Cell color={color} key={j} />
  </Col>
  <Col className="gutter-row" span={6}>
    <Cell color={color} key={j} />
  </Col>
  <Col className="gutter-row" span={6}>
    <Cell color={color} key={j} />
  </Col>
  <Col className="gutter-row" span={6}>
    <Cell color={color} key={j} />
  </Col>
</Row>; */
}
