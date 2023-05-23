import React, { memo, useState } from "react";
import { Col, Row } from "react-bootstrap";
import JobsLeft from "./jobsLeft";
import JobsRight from "./jobsRight";

function JobsPage() {
  const [dataValue, setDataValue] = useState(0);

  return (
    <>
      <Row>
        <Col lg={3} className="search_left_page_bg hide_box">
          <JobsLeft dataValue={dataValue} setDataValue={setDataValue} />
        </Col>
        <Col lg={9} className="search_right_page_bg">
          <JobsRight dataValue={dataValue} setDataValue={setDataValue} />
        </Col>
      </Row>
    </>
  );
}

export default memo(JobsPage);
