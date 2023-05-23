import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getExamById } from "../../../redux/actions/exams/createExam";
import ExamOverView from "../examOverView";

const ExamOverViewPage = () => {
  const data = useSelector((data) => data?.exambyid?.exam?.data?.data?.rows[0]);
  // const examAboutCMS = data?.ExamAbout[0]?.examAboutDefination
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (router.query.Id) {
      dispatch(getExamById(Number(router.query.Id)));
    }
  }, [router.query.Id]);
  return (
    <>
      <div className="user_dashboard_bg mobile_white_bg">
        <Container fluid>
          <Row>
            <Col lg={1} className="p-0  hide_box"></Col>
            <Col lg={10} className="desk_screen_padding">
              <Row>
                <Col lg={12} className="desk_screen_padding">
                  <ExamOverView data={data} />
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

export default ExamOverViewPage;
