import React, { useContext } from "react";
import { Badge, Col, Row } from "antd";
import ResourceRow from "./ResourceRow";
import { DataContext, StyleContext } from "./GanttChart";
const BottomBar = ({ handleScrollThird, thirdDivRef }) => {
  const { resources } = useContext(DataContext);
  const { columnValue, lockHeight } = useContext(StyleContext);

  return (
    <div>
      <Row style={{ height: "100%" }}>
        <Col span={4} style={{ outline: " 0.5px solid rgb(233 234 235)" }}>
          <Row>
            <h3 style={{ marginBottom: "0.5px" }}>Cranes</h3>
          </Row>
          <div>
            {resources.map((r) => (
              <div key={r.id} className="heading-row">
                <h4 className="h1-resource">
                  {r.title} <Badge color={r.color}></Badge>
                </h4>
              </div>
            ))}
          </div>
        </Col>
        <Col
          span={20}
          style={{
            outline: " 0.5px solid rgb(233 234 235)",
            width: "100%",
            overflow: "scroll",
          }}
          onScroll={handleScrollThird}
          ref={thirdDivRef}
        >
          <Row style={{ visibility: "hidden" }}>
            <h3>Cranes</h3>
          </Row>
          {resources.map((r) => (
            <ResourceRow key={r.id} color={r.color} r={r} />
          ))}
        </Col>
      </Row>
      <style>{`
         

          .heading-row {
            display: flex;
            align-items: center;
            outline: 0.5px solid rgb(233 234 235);
            height:  ${lockHeight ? 30 : columnValue / 5 + 10}px;
            padding:0 15px;
          }

          .h1-resource {
            width: 100%;
            border: none;
            outline: none;
            text-align: end;
            background: none;
          }
        `}</style>
    </div>
  );
};

export default BottomBar;
