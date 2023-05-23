import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { mocktestResult } from "../../../redux/actions/corporate/addmocktestcorporate";
import Image from "next/image";

function Result() {
  const router = useRouter();
  const dispatch = useDispatch();
  console.log(router.query.ids);
  const { query } = router;
  const getResult = () => {
    let x = query.ids.split("-");
    let testdetails = {
      id: x[0],
      userId: x[2],
      mockTestId: x[1],
    };
    dispatch(mocktestResult(testdetails));
  };
  const result = useSelector(
    (data) => data?.corporateMocktest?.mocktestResult?.rows
  );
  useEffect(() => {
    getResult();
  }, [query]);
  return (
    <>
      <div className=" ">
        <Container className="result_container_padding">
          <h1 className="text-center edit_profile_h2 mobile_font_18 margin_top_mob">
            Congratulations! You've completed the test
          </h1>
          {result?.map((item, index) => {
            return (
              <>
                <Row key={index}>
                  <Col lg={5} md={12}>
                    <div className="graph_bg">
                      <Image
                        width={100}
                        height={100}
                        className="result_graph img-fluid"
                        src="/images/result-graph.svg"
                      />
                      <div className="result_score">
                        <h1 className="marks ">76%</h1>
                        <h6 className="score ">Score</h6>
                      </div>
                    </div>
                  </Col>
                  <Col md={12} lg={7} >
                    <div className="center_card">
                      <Card className="result_card">
                        <h1 className="total_score_h1 mobile_font_18">
                          Total Score: {item?.marksObtained}/{item?.totalMarks}
                        </h1>
                        <Row>
                          <Col xs={5}>
                            <p className="total_score_p mobile_font_14">
                              Percentile:
                            </p>
                            <p className="total_score_p mobile_font_14">
                              Accuracy:
                            </p>
                            <p className="total_score_p mobile_font_14">
                              Time Taken:
                            </p>
                          </Col>
                          <Col xs={7}>
                            <p className="total_score_p mobile_font_14">
                              <span className="">{item?.marksPercentage}</span>
                            </p>
                            <p className="total_score_p mobile_font_14">
                              <span className="">0%</span>
                            </p>
                            <p className="total_score_p mobile_font_14">
                              <span className="">01Hrs 22Mins 05Secs</span>
                            </p>
                          </Col>
                        </Row>
                      </Card>
                      <Card className="result_card">
                        <div className="green_p">
                          <img className="me-3" src="/images/green-check.svg" />
                          14 Correct Questions
                        </div>
                        <div className="red_p green_p">
                          <img className="me-3" src="/images/red-cross.svg" />
                          14 Wrong Questions
                        </div>
                        <div className="light_p green_p">
                          <img className="me-3" src="/images/light-minus.svg" />
                          22 Skipped Questions
                        </div>
                      </Card>
                      <div
                        className="re_attempt mobile_font_14 mb-2"
                        onClick={() =>
                          router.push(
                            `/corporate/mocktest/instructions/${item?.mockTestId}`
                          )
                        }
                      >
                        <img className="me-3" src="/images/refresh.svg" />
                        Want to Re-Attempt the Test?
                      </div>
                      <div
                        className="re_attempt mobile_font_14"
                        onClick={() => router.push("/corporate")}
                      >
                        <img className="me-3" src="/images/back-arrow.svg" />
                        Back to Reasoning Page
                      </div>
                    </div>
                  </Col>
                </Row>
              </>
            );
          })}
        </Container>
      </div>
    </>
  );
}

export default Result;
