import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getMockTestbyid } from "../../../redux/actions/corporate/addmocktestcorporate";
import { getUserDetailsByToken } from "../../../redux/actions/user/userActions";

function Instructions(props) {
  const { setIsTestStarted } = props
  const mocktestdata = useSelector((data) => data?.corporateMocktest?.mocktest?.rows);

  return (
    <div className="">
      <Container fluid className="container_padding">
        {mocktestdata &&
          mocktestdata?.length > 0 &&
          mocktestdata?.map((item, index) => (
            <div key={index}>
              <div className="test_name_row_bg">
                <Row>
                  <Col>
                    <div className="test_name_row start_test_page">
                      <h1 className="test_name mobile_font_22">{item?.feildName}</h1>
                      <h3 className="test_sub_name mobile_font_14">
                        /{item?.SubCategory?.subCategory}/{item?.topicName}
                      </h3>
                    </div>
                  </Col>
                </Row>
              </div>
              <Container>
                <Row>
                  <Col className="mt-5 start_test_page">
                    <h4 className="intro_heading">Instructions</h4>
                    <p>
                      1- The test consistes of {item?.totalQuestions} questions.
                      Each question carry equal marks
                    </p>
                    <p>
                      2- Total duration for the test is {item?.totalTime}{" "}
                      minutes.
                    </p>
                    <p>
                      3- Each questions have four options. Only one option is
                      correct.
                    </p>
                    <p>
                      4- No marks will be deducted for unanswered questions.
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="test_btn_div start_test_page">
                      <Button
                        className="location_search_btn start_test_btn"
                        onClick={() =>
                          setIsTestStarted(true)
                        }
                      >
                        {`Start Test >`}
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          ))}
      </Container>
    </div>
  );
}

export default Instructions;
