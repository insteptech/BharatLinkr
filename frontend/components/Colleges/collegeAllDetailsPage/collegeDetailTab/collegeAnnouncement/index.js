import React, { memo, useState } from "react";
import { Col, Row } from "react-bootstrap";
import AnnouncementLeft from "./announcementLeft";
import AnnouncementRight from "./announcementRight";

function CollegeAnnouncement() {
  const [dataValue, setDataValue] = useState(0);

  return (
    <>
      <Row>
        <Col lg={3} className="search_left_page_bg hide_box">
          <AnnouncementLeft dataValue={dataValue} setDataValue={setDataValue} />
        </Col>
        <Col lg={9} className="search_right_page_bg">
          <AnnouncementRight dataValue={dataValue} setDataValue={setDataValue} />
        </Col>
      </Row>
    </>
  );
}

export default memo(CollegeAnnouncement);
