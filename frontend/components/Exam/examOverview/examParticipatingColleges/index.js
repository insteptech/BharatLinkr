import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import ExamParticipatingCollegesLeft from "./ExamParticipatingCollegesLeft";
import ExamParticipatingCollegesRight from "./ExamParticipatingCollegesRight";

const ExamParticipatingColleges = (props) => {
  const [dataValue, setDataValue] = useState(0);

  return (
    <>
      <Row>
        <Col className="" lg={3}>
          <ExamParticipatingCollegesLeft
            dataValue={dataValue}
            setDataValue={setDataValue}
          />
        </Col>
        <Col className="bg-light" lg={9}>
          <ExamParticipatingCollegesRight
            dataValue={dataValue}
            data={props.data}
          />
        </Col>
      </Row>
    </>
  );
};

export default ExamParticipatingColleges;
