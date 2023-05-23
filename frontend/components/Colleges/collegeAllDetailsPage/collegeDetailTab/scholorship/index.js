import React, { memo } from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import ScholarshipLeft from "./scholarshipLeft";
import ScholarshipRight from "./scholarshipRight";

function ScholorshipTab() {
  const [dataValue, setDataValue] = useState(0);

  return (
    <>
      <Row>
        <Col lg={3} className="search_left_page_bg hide_box">
          <ScholarshipLeft dataValue={dataValue} setDataValue={setDataValue} />
        </Col>
        <Col lg={9} className="search_right_page_bg">
          <ScholarshipRight dataValue={dataValue} setDataValue={setDataValue} />
        </Col>
      </Row>
    </>
  );
}

export default memo(ScholorshipTab);
