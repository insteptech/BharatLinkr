import React, { memo, useState } from "react";
import { Col, Row } from "react-bootstrap";
import CourseFeeLeft from "./courseFeeLeft";
import CourseFeeRight from "./courseFeeRight/courseFeeRight";

function CollegeCourseFee() {
  const [dataValue, setDataValue] = useState(0);

  return (
    <>
      <Row>
        <Col lg={3} className="search_left_page_bg hide_box">
          <CourseFeeLeft dataValue={dataValue} setDataValue={setDataValue} />
        </Col>
        <Col lg={9} className="search_right_page_bg">
          <CourseFeeRight dataValue={dataValue} setDataValue={setDataValue} />
        </Col>
      </Row>
    </>
  );
}

export default memo(CollegeCourseFee);
