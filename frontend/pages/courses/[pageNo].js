import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CoursesDetailsLeft from "../../components/course/coursesCardDetails/coursesDetailLeftPage";
import CoursesDetailsRight from "../../components/course/coursesCardDetails/coursesDetailRightPage";

const pageNo = () => {
  const [dataValue, setDataValue] = useState(0);

  return (
    <>
      <div className="user_dashboard_bg ">
        <Container fluid>
          <Row>
            <Col lg={1} className="p-0  "></Col>
            <Col lg={10} className="">
              <Row>
                <Col lg={3} className="search_left_page_bg hide_box">
                  <CoursesDetailsLeft
                    dataValue={dataValue}
                    setDataValue={setDataValue}
                  />
                </Col>
                <Col lg={9} className="search_right_page_bg">
                  <CoursesDetailsRight
                    dataValue={dataValue}
                    setDataValue={setDataValue}
                  />
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

export default pageNo;
