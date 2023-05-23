import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import ExamImportantDatesLeft from "./ExamImportantDatesLeft";
import ExamImportantDatesRight from "./ExamImportantDatesRight";

const ExamImportantDates = (props) => {
  const [dataValue, setDataValue] = useState(0);

  return (
    <>
      <Row>
        <Col className="search_left_page_bg hide_box" lg={3}>
          <ExamImportantDatesLeft
            dataValue={dataValue}
            setDataValue={setDataValue}
          />
        </Col>
        <Col className="search_right_page_bg" lg={9}>
          <ExamImportantDatesRight
            dataValue={dataValue}
            setDataValue={setDataValue}
            data={props?.data}
          />
        </Col>
      </Row>
    </>
  );
};

export default ExamImportantDates;
