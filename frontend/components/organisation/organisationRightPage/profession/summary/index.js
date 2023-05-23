import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import SummaryLeft from "./leftPage";
import { useState } from "react";
import SummaryRight from "./rightPage";

const Summary = () => {
  const [dataValue, setDataValue] = useState(0);
  return (
    <>
      <div className="user_dashboard_bg ">
        <Container fluid className="container_padding">
          <div className="test_name_row_bg">
            <Container>
              <h1 className="test_name ps-4 mobile_font_18">Summary</h1>
            </Container>
          </div>
          <Row>
            <Col lg={1} className="p-0 hide_box"></Col>
            <Col lg={10} className="">
              <Row>
                <Col lg={3} className="search_left_page_bg hide_box ps-4">
                  <SummaryLeft
                    dataValue={dataValue}
                    setDataValue={setDataValue}
                  />
                </Col>
                <Col lg={9} className="search_right_page_bg">
                  <SummaryRight
                    dataValue={dataValue}
                    setDataValue={setDataValue}
                  />
                </Col>
              </Row>
            </Col>
            <Col lg={1} className="p-0 white_bg hide_box"></Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Summary;
