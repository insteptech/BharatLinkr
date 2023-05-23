import React from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import ExamCousellingLeft from "./ExamCousellingLeft";
import ExamCousellingRight from "./ExamCousellingRight";

const ExamCouselling = (props) => {
  const [dataValue, setDataValue] = useState(0);

  return (
    <>
      <Row>
        <Col className="" lg={3}>
          <ExamCousellingLeft
            dataValue={dataValue}
            setDataValue={setDataValue}
          />
        </Col>
        <Col className="bg-light" lg={9}>
          <ExamCousellingRight dataValue={dataValue} data={props.data} />
        </Col>
      </Row>
    </>
  );
};

export default ExamCouselling;
