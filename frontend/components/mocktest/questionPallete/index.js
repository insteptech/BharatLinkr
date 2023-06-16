import React, { useEffect, useState } from "react";
import { Button, Card, Col, ProgressBar, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useTimer } from "react-timer-hook";
import { mocktestQuestionStatus } from "../../utils";

function QuestionsPallete(props) {
  const { activeQuestion, setActiveQuestion, questionpalletedata, expiryTimestamp, values, handleSubmit, setConfirmModal } = props

  const { seconds, minutes, hours } = useTimer({ expiryTimestamp, onExpire: () => handleSubmit(values) });
  const questionslist = useSelector(state => state.corporateMocktest.questionList);

  const buttonColorBasedOnStatus = {
    notAttempted: 'white',
    answered: 'green',
    notAnswered: '#ff5501',
    forReview: 'blue'
  }

  const renderButtons = (index) => {
    if (questionpalletedata) {
      return (
        <>
          <button
            className="mt-2 mx-1"
            style={{
              backgroundColor: activeQuestion === index ? "#C8C1DF" : buttonColorBasedOnStatus[questionpalletedata[index].status],
              color: activeQuestion === index ? "white" : questionpalletedata[index].status === mocktestQuestionStatus.notAttempted ? "#939198" : "white",
              borderRadius: "5px",
              border: "1px solid #C8C1DF",
              boxShadow: "0px 6px 6.5px rgba(0, 0, 0, 0.0588235)",
              width: "30px",
            }}
            onClick={(e) => {
              e.preventDefault()
              setActiveQuestion(index)
            }}
          >
            {index + 1}
          </button>
        </>
      );
    }
  };
  const getCount = (status) => {
    return questionpalletedata.reduce((count, item) => item.status === status ? count + 1 : count, 0);
  };

  return (
    <div className="d-flex flex-column">
      <Card className="time_left_card">
        <div>
          <p className="time_left">Time left</p>
        </div>
        <div className="d-flex justify-content-between">
          <div className="h_m_s_text me-3">
            <span>{hours}</span>
            <p>Hours</p>
          </div>
          <div className="h_m_s_text me-3">
            <span>{minutes}</span>
            <p>Minutes</p>
          </div>
          <div className="h_m_s_text">
            <span>{seconds}</span>
            <p>seconds</p>
          </div>
        </div>
      </Card>
      <div className="four_dot_text_div">
          <div className="ans_four_p_div mt-3 mx-2">
            <div className="ans_four_p me-4">
              <div className="green_dot color_dot"></div>
              Answered-{getCount(mocktestQuestionStatus.answered)}
            </div>

            
            <p className="ans_four_p">
            <div className="light_dot color_dot"></div>
              Not Answered-{getCount(mocktestQuestionStatus.notAnswered)}
            </p>
          </div>
          <div className="ans_four_p_div mt-3 mx-2">
            
            <p className="ans_four_p me-4">
            <div className="orange_dot color_dot"></div>
              Not attempted-{getCount(mocktestQuestionStatus.notAttempted)}
            </p>

            
            <p className="ans_four_p">
            <div className="dark_blue_dot color_dot"></div>
              Marked for review-{getCount(mocktestQuestionStatus.forReview)}
            </p>
          </div>
        </div>
      <Row>
        <Col className="item_center">
          <div className="question_grid_btn_box">
            <h6 className="q_pallete">Question Pallete</h6>
            <div className="btn_group">
              {questionslist?.map((item, index) => {
                return (
                  <div className="" key={index}>
                    {renderButtons(index)}
                  </div>
                );
              })}
            </div>
          </div>
          <Button className="location_search_btn mx-0 mt-4 w-50" type="submit" onClick={(e) => {
            e.preventDefault()
            setConfirmModal(true)
          }}>
            Submit
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default QuestionsPallete;
