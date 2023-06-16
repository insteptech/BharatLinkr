import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { submitMockTest } from "../../redux/actions/corporate/addmocktestcorporate";
import QuestionsPallete from "./questionPallete";
import TestScreen from "./testScreen";
import arrayMutators from "final-form-arrays";
import ConfirmModal from "../modals/confirmModal";

function Mocktest(props) {
  const { questionpalletedata, setQuestionpalletedata } = props

  const dispatch = useDispatch();
  const router = useRouter();
  const { Id } = router.query;

  const currentUser = useSelector(state => state.userSlice.currentUser)
  const questionslist = useSelector(state => state.corporateMocktest.questionList);
  const totalTime = useSelector((state) => {
    if (state?.corporateMocktest?.mocktest?.rows?.length > 0) return state?.corporateMocktest?.mocktest?.rows[0]?.totalTime;
  });

  const time = new Date();
  time.setSeconds(time.getSeconds() + totalTime * 60);

  const [activeQuestion, setActiveQuestion] = useState(0);
  const [confirmModal, setConfirmModal] = useState(false)

  const handleSubmit = (values) => {
    let userId = currentUser.id
    dispatch(submitMockTest(values)).then((res) => {
      if (res?.payload?.success) {
        let resultId = res?.payload?.data?.MockTest[1][0]?.id;
        router.push(
          `/corporate/mocktest/result?ids=${resultId}-${Id}-${userId}`
        );
      }
    });
  };


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
                initialValues={{
                  AnswerData: questionslist?.map((item, index) => {
                    return {
                      questionId: item?.id,
                      answer: null,
                      mockTestId: Number(Id),
                      userId: Number(currentUser.id),
                    }
                  })
                }}
                render={({ handleSubmit, values, form }) => (
                  <form onSubmit={handleSubmit}>
                    <Row>
                      <Col lg={9} className="search_right_page_bg">
                        <TestScreen
                          activeQuestion={activeQuestion}
                          setActiveQuestion={setActiveQuestion}
                          questionpalletedata={questionpalletedata}
                          setQuestionpalletedata={setQuestionpalletedata}
                          values={values}
                          form={form}
                          handleSubmit={handleSubmit}
                          expiryTimestamp={time}
                          questionslist1={questionslist}
                          setConfirmModal={setConfirmModal}
                        />
                      </Col>
                      <Col lg={3} className="search_left_page_bg hide_box ps-4">
                        <QuestionsPallete
                          activeQuestion={activeQuestion}
                          setActiveQuestion={setActiveQuestion}
                          values={values}
                          questionpalletedata={questionpalletedata}
                          handleSubmit={handleSubmit}
                          expiryTimestamp={time}
                          questionslist={questionslist}
                          setConfirmModal={setConfirmModal}
                        />
                      </Col>
                    </Row>
                    {confirmModal &&
                      <ConfirmModal
                        confirmModal={confirmModal}
                        handleConfirmClose={() => setConfirmModal(false)}
                        questionpalletedata={questionpalletedata}
                        handleSubmit={handleSubmit}
                      />}
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
