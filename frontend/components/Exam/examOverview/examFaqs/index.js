import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import ExamFaqsLeft from "./ExamFaqsLeft";
import ExamFaqsRight from "./ExamFaqsRight";

const ExamFaqs = (props) => {
  const [dataValue, setDataValue] = useState(0);

  return (
    <>
      <Row>
        <Col className="" lg={3}>
          <ExamFaqsLeft
            dataValue={dataValue}
            setDataValue={setDataValue}
          />
        </Col>
        <Col className="bg-light" lg={9}>
          <ExamFaqsRight dataValue={dataValue} data={props.data} />
        </Col>
      </Row>
    </>
  );
};

export default ExamFaqs;
