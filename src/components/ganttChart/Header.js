import { Col, Row } from "antd";
import React from "react";
import AddTask from "./AddTask";
import Modal from "./Modal";
import MonthRow from "./MonthRow";
const Header = () => {
  return (
    <Row>
      <Col
        span={24}
        style={{
          outline: " 0.5px solid rgb(233 234 235)",
          boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.2)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0px 25px",
          }}
        >
          <div>
            <h1>Planner</h1>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <MonthRow />
            <Modal btnName="Add task">
              <AddTask />
            </Modal>
          </div>
        </div>
      </Col>
      {/* <Col
        span={20}
        style={{
          outline: " 0.5px solid rgb(233 234 235)",
          boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.2)",
        }}
      >
        <MonthRow />
      </Col> */}
    </Row>
  );
};

export default Header;
