import React from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import ExamReservationLeft from "./ExamReservationLeft";
import ExamReservationRight from "./ExamReservationRight";

const ExamReservation = (props) => {
  const [dataValue, setDataValue] = useState(0);

  return (
    <>
      <Row>
        <Col className="" lg={3}>
          <ExamReservationLeft
            dataValue={dataValue}
            setDataValue={setDataValue}
          />
        </Col>
        <Col className="bg-light" lg={9}>
          <ExamReservationRight dataValue={dataValue} data={props.data} />
        </Col>
      </Row>
    </>
  );
};

export default ExamReservation;
