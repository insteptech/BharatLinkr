import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getMockTestbyid,
  submitmocktest,
} from "../../redux/actions/corporate/addmocktestcorporate";
import { getToken } from "../utils";
import QuestionsPallete from "./questionPallete";
import TestScreen from "./testScreen";
import arrayMutators from "final-form-arrays";

function Mocktest() {
  const [userId, setUserId] = useState(null);
  const questionslist = useSelector((data) => {
    if (data?.corporateMocktest?.mocktest?.rows?.length > 0) {
      return data?.corporateMocktest?.mocktest?.rows[0].Questions;
    }
  });

  const totalTime = useSelector((data) => {
    if (data?.corporateMocktest?.mocktest?.rows?.length > 0) {
      return data?.corporateMocktest?.mocktest?.rows[0]?.totalTime;
    }
  });
  const time = new Date();
  time.setSeconds(time.getSeconds() + totalTime * 60);

  const [attemptData, setAttempData] = useState({
    answered: 0,
    notanswered: 0,
    notattempted: 0,
    markedforreview: 0,
  });
  const [quesno, setQuesno] = useState(0);
  const dispatch = useDispatch();
  const router = useRouter();
  const getTokenid = () => {
    let token = getToken();
    setUserId(jwtDecode(token).userId);
  };
  const { Id } = router.query;
  const [questionpalletedata, setQuestionpalletedata] = useState(null);

  useEffect(() => {
    getTokenid();
    if (Id) {
      dispatch(getMockTestbyid(Id)).then((res) => {
        if (res?.payload?.data?.success === true) {
          setQuestionpalletedata(
            res?.payload?.data?.data?.rows[0]?.Questions?.map((item) => {
              return {
                answered: false,
                notanswered: false,
                notattempted: true,
                markedforreview: false,
                active: true,
              };
            })
          );
        }
      });
    }
  }, [Id, dispatch]);

  const handleSubmit = (values) => {
    console.log(values);
    let userId = values.AnswerData[0].userId;
    dispatch(submitmocktest(values)).then((res) => {
      if (res?.payload?.data?.success) {
        let resultId = res?.payload?.data?.data?.MockTest[1][0]?.id;
        router.push(
          `/corporate/mocktest/result?ids=${resultId}-${Id}-${userId}`
        );
      }
    });
  };

  const init = (event) => {
    if (event && Object.keys(event).length > 0) {
      return event;
    } else {
      let initialvalues = { AnswerData: [] };
      questionslist?.map((item, index) => {
        initialvalues.AnswerData.push({
          questionId: item?.id,
          answer: "",
          mockTestId: Number(Id),
          userId: userId,
        });
      });
      return initialvalues;
    }
  };


  // const mocktestData = useSelector((data) => data?.corporateMocktest?.mocktest?.rows)

  return (
    <>
      <div className="user_dashboard_bg ">
        <Container fluid className="container_padding">
          <div className="test_name_row_bg">
            <Row>
              <Col>
                <div className="test_name_row start_test_page">
                  <h1 className="test_name mobile_font_22">TEST-1</h1>
                  <h3 className="test_sub_name mobile_font_14">
                    /Reasoning/Topic Name
                  </h3>
                </div>
              </Col>
            </Row>
          </div>
          <Row>
            <Col lg={1} className="p-0 white_bg  hide_box"></Col>
            <Col lg={10} className="">
              <Form
                onSubmit={handleSubmit}
                mutators={{
                  ...arrayMutators,
                }}
                keepDirtyOnReinitialize
                initialValues={useMemo((e) => init(e))}
                render={({ handleSubmit, values, form }) => (
                  <form onSubmit={handleSubmit}>
                    <Row>
                      <Col lg={9} className="search_right_page_bg">
                        <TestScreen
                          attemptData={attemptData}
                          setAttempData={setAttempData}
                          quesno={quesno}
                          setQuesno={setQuesno}
                          questionpalletedata={questionpalletedata}
                          setQuestionpalletedata={setQuestionpalletedata}
                          Id={Id}
                          userId={userId}
                          values={values}
                          form={form}
                          handleSubmit={handleSubmit}
                          expiryTimestamp={time}
                          questionslist1={questionslist}
                        />
                      </Col>
                      <Col lg={3} className="search_left_page_bg hide_box ps-4">
                        <QuestionsPallete
                          attemptData={attemptData}
                          quesno={quesno}
                          setQuesno={setQuesno}
                          values={values}
                          questionpalletedata={questionpalletedata}
                          handleSubmit={handleSubmit}
                          expiryTimestamp={time}
                          questionslist={questionslist}
                        />
                      </Col>
                    </Row>
                  </form>
                )}
              />
            </Col>
            <Col lg={1} className="p-0  hide_box"></Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Mocktest;
