import React, { memo, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ExamAboutLeft from "./examAboutLeft";
import ExamAboutRight from "./examAboutRight";

function ExamAbout(props) {
  const [dataValue, setDataValue] = useState(0);

  return (
    <>
      <Row>
        <Col className="search_left_page_bg hide_box" lg={3}>
          <ExamAboutLeft dataValue={dataValue} setDataValue={setDataValue} />
        </Col>
        <Col className="search_right_page_bg" lg={9}>
          <ExamAboutRight dataValue={dataValue} setDataValue={setDataValue} data={props?.data} />
        </Col>
      </Row>

      {/* <div className="user_dashboard_bg ">
        <Container fluid>
          <Row>
            <Col lg={1} className="p-0  "></Col>
            <Col lg={10} className="p-0">
              <Row>
                <Col lg={12} className="p-0">
                  <CollegeBanner />
                </Col>
              </Row>
              <Row>
                <Col lg={12} className="p-0">
                  <CollegeDetailTabs />
                </Col>
              </Row>
            </Col>
            <Col lg={1} className="p-0 white_bg "></Col>
          </Row>
        </Container>
      </div> */}
    </>
  );
}

export default memo(ExamAbout);
