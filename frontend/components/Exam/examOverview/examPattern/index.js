import React from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import ExamPatternLeft from "./ExamPatternLeft";
import ExamPatternRight from "./ExamPatternRight";

const ExamPattern = (props) => {
  const [dataValue, setDataValue] = useState(0);

  return (
    <>
      <Row>
        <Col className="" lg={3}>
          <ExamPatternLeft
            dataValue={dataValue}
            setDataValue={setDataValue}
          />
        </Col>
        <Col className="bg-light" lg={9}>
          <ExamPatternRight dataValue={dataValue} data={props.data} />
        </Col>
      </Row>
    </>
  );
};

export default ExamPattern;
