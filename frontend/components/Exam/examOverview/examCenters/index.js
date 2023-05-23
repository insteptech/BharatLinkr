import React from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import ExamCentersLeft from "./ExamCentersLeft";
import ExamCentersRight from "./ExamCentersRight";

const ExamCenters = (props) => {
  const [dataValue, setDataValue] = useState(0);

  return (
    <>
      <Row>
        <Col className="" lg={3}>
          <ExamCentersLeft
            dataValue={dataValue}
            setDataValue={setDataValue}
          />
        </Col>
        <Col className="bg-light" lg={9}>
          <ExamCentersRight dataValue={dataValue} data={props.data} />
        </Col>
      </Row>
    </>
  );
};

export default ExamCenters;
