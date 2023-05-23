import React from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import ExamPreparationTipsLeft from "./ExamPreparationTipsLeft";
import ExamPreparationTipsRight from "./ExamPreparationTipsRight";

const ExamPreparationTips = (props) => {
  const [dataValue, setDataValue] = useState(0);

  return (
    <>
      <Row>
        <Col className="" lg={3}>
          <ExamPreparationTipsLeft
            dataValue={dataValue}
            setDataValue={setDataValue}
          />
        </Col>
        <Col className="bg-light" lg={9}>
          <ExamPreparationTipsRight dataValue={dataValue} data={props.data} />
        </Col>
      </Row>
    </>
  );
};

export default ExamPreparationTips;
