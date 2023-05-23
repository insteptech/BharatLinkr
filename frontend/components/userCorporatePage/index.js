import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CorporateLeftPage from "./corporateLeftPage";
import CorporateRightPage from "./corporateRightPage";

const UserCorporate = () => {
  const [filtertitle, setFiltertitle] = useState({})
  return (
    <>
      <div className="user_dashboard_bg">
        <Container fluid>
          <Row>
            <Col xs={1} className="p-0 hide_box "></Col>
            <Col lg={10} className="">
              <Row>
                <Col lg={3} className="search_left_page_bg hide_box">
                  <div>
                    <CorporateLeftPage setFiltertitle={setFiltertitle} />
                  </div>
                </Col>
                <Col lg={9} className="search_right_page_bg">
                  <div>
                    <CorporateRightPage filtertitle={filtertitle} />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xs={1} className="p-0 white_bg hide_box"></Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default UserCorporate;
