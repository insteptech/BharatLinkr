import React from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import AboutUs from "../../components/aboutUs/AboutUs";
import AboutLeftTabs from "../../components/homeLayout/leftPage/aboutUsLeftTab";
// import AboutPage from "../../components/aboutUs/aboutPage";

const About = () => {
  const [dataValue, setDataValue] = useState(0);

  return (
    <>
      {/* <AboutUs /> */}
      <div className="user_dashboard_bg ">
        <Container fluid>
          <Row>
            <Col lg={1} className="p-0  "></Col>
            <Col lg={10} className="p-0">
              <Row>
                <Col md={3} lg={3}>
                  <div className="search_left_page_bg">
                    <AboutLeftTabs
                      dataValue={dataValue}
                      setDataValue={setDataValue}
                    />
                  </div>
                </Col>
                <Col md={9} lg={9}>
                  <div className="">
                    <AboutUs dataValue={dataValue} />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col lg={1} className="p-0 white_bg "></Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default About;
