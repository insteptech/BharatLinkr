import React, { memo, useState } from "react";
import { Col, Row } from "react-bootstrap";
import CollegeAboutLeft from "./collegeAboutLeft";
import CollegeAboutRight from "./collegeAboutRight";

function CollegeAbout() {
  const [dataValue, setDataValue] = useState(0);

  return (
    <>
      <Row>
        <Col lg={3} className="search_left_page_bg hide_box">
          <CollegeAboutLeft dataValue={dataValue} setDataValue={setDataValue} />
        </Col>
        <Col lg={9} className="search_right_page_bg">
          <CollegeAboutRight dataValue={dataValue} setDataValue={setDataValue}/>
        </Col>
      </Row>
    </>
  );
}

export default memo(CollegeAbout);
