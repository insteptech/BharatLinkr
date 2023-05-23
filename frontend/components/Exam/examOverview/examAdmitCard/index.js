import React from "react";
import DOMPurify from "isomorphic-dompurify";
import { useState } from "react";
import ExamAdmitCardRight from "./ExamAdmitCardRight";
import ExamAdmitCardLeft from "./ExamAdmitCardLeft";
import { Col, Row } from "react-bootstrap";
const ExamAdmitCard = (props) => {
  const [dataValue, setDataValue] = useState(0);

  return (
    <>
      <Row>
        <Col className="search_left_page_bg hide_box" lg={3}>
          <ExamAdmitCardLeft
            dataValue={dataValue}
            setDataValue={setDataValue}
          />
        </Col>
        <Col className="search_right_page_bg" lg={9}>
          <ExamAdmitCardRight
            dataValue={dataValue}
            setDataValue={setDataValue}
            data={props?.data}
          />
        </Col>
      </Row>
    </>
  );
};

export default ExamAdmitCard;
