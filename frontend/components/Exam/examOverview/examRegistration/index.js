import React from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import ExamRegistrationLeft from "./ExamRegistrationLeft";
import ExamRegistrationRight from "./ExamRegistrationRight";

const ExamRegistration = (props) => {
  const [dataValue, setDataValue] = useState(0);

  return (
    <>
      <Row>
        <Col className="search_left_page_bg hide_box" lg={3}>
          <ExamRegistrationLeft
            dataValue={dataValue}
            setDataValue={setDataValue}
          />
        </Col>
        <Col className="search_right_page_bg" lg={9}>
          <ExamRegistrationRight dataValue={dataValue}  setDataValue={setDataValue} data={props.data} />
        </Col>
      </Row>
    </>
  );
};
export default ExamRegistration;
