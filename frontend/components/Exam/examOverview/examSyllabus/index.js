import React from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import ExamSyllabusLeft from "./ExamSyllabusLeft";
import ExamSyllabusRight from "./ExamSyllabusRight";

const ExamSyllabus = (props) => {
  const [dataValue, setDataValue] = useState(0);

  return (
    <>
      <Row>
        <Col className="" lg={3}>
          <ExamSyllabusLeft dataValue={dataValue} setDataValue={setDataValue} />
        </Col>
        <Col className="bg-light" lg={9}>
          <ExamSyllabusRight dataValue={dataValue} data={props.data} />
        </Col>
      </Row>
    </>
  );
};
export default ExamSyllabus;
