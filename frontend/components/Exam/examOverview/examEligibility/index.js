import React from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import ExamEligibilityLeft from "./examEligibilityLeft";
import ExamEligibilityRight from "./examEligibilityRight";

const ExamEligibility = (props) => {
  const [dataValue, setDataValue] = useState(0);

  return (
    <>
      <Row>
        <Col className="" lg={3}>
          <ExamEligibilityLeft
            dataValue={dataValue}
            setDataValue={setDataValue}
          />
        </Col>
        <Col className="bg-light" lg={9}>
          <ExamEligibilityRight dataValue={dataValue} data={props.data} />
        </Col>
      </Row>
    </>
  );
};

export default ExamEligibility;
