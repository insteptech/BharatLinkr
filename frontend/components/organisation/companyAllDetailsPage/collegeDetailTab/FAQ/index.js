import React, { memo } from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import FaqLeft from "./faqLeft";
import FaqRight from "./faqRight";

function FaqTab() {
  const [dataValue, setDataValue] = useState(0);

  return (
    <>
      <Row>
        <Col lg={3} className="search_left_page_bg">
          <FaqLeft dataValue={dataValue} setDataValue={setDataValue} />
        </Col>
        <Col lg={9} className="search_right_page_bg">
          <FaqRight dataValue={dataValue} />
        </Col>
      </Row>
    </>
  );
}

export default memo(FaqTab);
