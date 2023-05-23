import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useTimer } from "react-timer-hook";

function QuestionsPallete({
  quesno,
  setQuesno,
  attemptData,
  questionpalletedata,
  questionslist,
  expiryTimestamp,
  values,
  handleSubmit,
  setShow1,
}) {
  // const [start, setStart] = useState(true);
  const [timer, setTimer] = useState(null);

  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => handleSubmit(values) });

  const handleView = (index) => {
    if (questionpalletedata) {
      return (
        <>
          <button
            className="mt-2 mx-1"
            style={{
              backgroundColor:
                quesno === index
                  ? "#C8C1DF"
                  : questionpalletedata[index].answered === true
                  ? "green"
                  : questionpalletedata[index].notanswered === true
                  ? "red"
                  : questionpalletedata[index].notattempted
                  ? "white"
                  : "blue",
              color:
                quesno === index
                  ? "white"
                  : questionpalletedata[index].notattempted
                  ? "#939198"
                  : "white",
              borderRadius: "5px",
              border: "1px solid #C8C1DF",
              boxShadow: "0px 6px 6.5px rgba(0, 0, 0, 0.0588235)",
              width: "30px",
            }}
            onClick={() => setQuesno(index)}
          >
            {index + 1}
          </button>
        </>
      );
    }
  };

  return (
    <div className="d-flex flex-column">
      {/* {setShow1(true) ? (
        <div className="big_screen_none mb-3">
          <div className="time_left_mobile_row">
            <p className="time_left_mobile">Time left</p>
            <div className="d-flex ">
              <div className="h_m_s_text d-flex me-3">
                <span>{hours}</span>
                <p>Hrs</p>
              </div>
              <div className="h_m_s_text d-flex me-3">
                <span>{minutes}</span>
                <p>Mins</p>
              </div>
              <div className="h_m_s_text d-flex">
                <span>{seconds}</span>
                <p>Secs</p>
              </div>
            </div>
          </div>
          <ProgressBar now={now} label={`${now}%`} />
        </div>
      ) : (
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
      )} */}
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
      <div className="ans_four_p_div mt-4">
        <div className="green_dot color_dot"></div>
        <p className="ans_four_p me-4">Answered-{attemptData.answered}</p>

        <div className="light_dot color_dot"></div>
        <p className="ans_four_p">Not Answered-{attemptData.notanswered}</p>
      </div>
      <div className="ans_four_p_div">
        <div className="orange_dot color_dot"></div>
        <p className="ans_four_p me-4">
          Not attempted-{attemptData.notattempted}
        </p>

        <div className="dark_blue_dot color_dot"></div>
        <p className="ans_four_p">
          Marked for review-{attemptData.markedforreview}
        </p>
      </div>
      <Row>
        <Col className="item_center">
          <div className="question_grid_btn_box">
            <h6 className="q_pallete">Question Pallete</h6>
            <div className="btn_group">
              {questionslist?.map((item, index) => {
                return (
                  <div className="" key={index}>
                    {handleView(index)}
                  </div>
                );
              })}
            </div>
          </div>
          <Button className="location_search_btn mx-0 mt-4 w-50" type="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default QuestionsPallete;
