import DOMPurify from "dompurify";
import React, { useEffect, useMemo } from "react";
import { Button, Card, Offcanvas, ProgressBar } from "react-bootstrap";
import { Field, Form } from "react-final-form";
import { useSelector } from "react-redux";
import { FieldArray } from "react-final-form-arrays";
import { useTimer } from "react-timer-hook";
import { useRouter } from "next/router";
import { useState } from "react";
import QuestionsPallete from "../questionPallete";

function TestScreen({
  quesno,
  setQuesno,
  attemptData,
  setAttempData,
  setQuestionpalletedata,
  questionpalletedata,
  Id,
  userId,
  values,
  form,
  expiryTimestamp,
  questionslist1,
  // expiryTimestamp,
  handleSubmit,
}) {
  const questionslist = useSelector((data) => {
    if (data?.corporateMocktest?.mocktest?.rows?.length > 0) {
      return data?.corporateMocktest?.mocktest?.rows[0].Questions;
    }
  });

  const handleClear = (name, form) => {
    console.log(name);
    form.change(name, "");
  };

  const handleSave = (index) => {
    let x = questionpalletedata;
    x.splice(index, 1, {
      answered: true,
      notanswered: false,
      notattempted: false,
      markedforreview: false,
    });
    setQuestionpalletedata(x);
  };
  const handleNext = (index) => {
    setQuesno(quesno + 1);
    let x = questionpalletedata;
    x.splice(index, 1, {
      answered: true,
      notanswered: false,
      notattempted: false,
      markedforreview: false,
    });
    setQuestionpalletedata(x);
  };

  const handleReview = (index, next) => {
    if (next === "next") {
      setQuesno(quesno + 1);
    }
    let x = questionpalletedata;
    x.splice(index, 1, {
      answered: false,
      notanswered: false,
      notattempted: false,
      markedforreview: true,
    });
    setQuestionpalletedata(x);
  };

  const handleSkip = (index) => {
    setQuesno(quesno + 1);
    let x = questionpalletedata;
    x.splice(index, 1, {
      answered: false,
      notanswered: true,
      notattempted: false,
      markedforreview: false,
    });
    setQuestionpalletedata(x);
  };

  // {
  //     "mockTestId":3,
  //     "questionId":4,
  //     "userId":17,
  //     "answer":"B"
  // }

  useEffect(() => {
    setAttempData({
      ...attemptData,
      notattempted: questionslist?.length,
    });
  }, []);

  const now = 70;
  const router = useRouter();

  //   ---------------time------------
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

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  return (
    <>
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
      {questionslist &&
        questionslist.map((item, index) => {
          return (
            <div key={index}>
              {quesno === index && (
                <>
                  <FieldArray name="AnswerData">
                    {({ fields }) => (
                      <>
                        {fields.map((name, i) => (
                          <div key={i}>
                            {quesno === i && (
                              <>
                                <div className="q_count_row">
                                  <div className="d-flex">
                                    <h3 className="question_h3">
                                      Question - {quesno + 1}
                                    </h3>
                                    <p className="question_p">Marks+1</p>
                                    <p className="question_p">
                                      {quesno + 1}/{questionslist?.length}
                                    </p>
                                  </div>
                                  <div className="big_screen_none">
                                    <p
                                      onClick={handleShow1}
                                      className="question_act_p"
                                    >
                                      Activities
                                    </p>
                                  </div>
                                </div>
                                <hr />
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(item?.question),
                                  }}
                                />
                                <img
                                  className="question_img"
                                  src="/images/company-1.png"
                                />
                                <div className="d-flex flex-column">
                                  <Field
                                    name={`${name}.answer`}
                                    type="radio"
                                    value="optionA"
                                  >
                                    {({ input, meta }) => (
                                      <div>
                                        <input
                                          {...input}
                                          className="me-2"
                                          value="optionA"
                                        />
                                        {item?.optionA}
                                      </div>
                                    )}
                                  </Field>
                                  <Field
                                    name={`${name}.answer`}
                                    type="radio"
                                    value="optionB"
                                  >
                                    {({ input, meta }) => (
                                      <div>
                                        <input
                                          {...input}
                                          className="me-2"
                                          value="optionB"
                                        />
                                        {item?.optionB}
                                      </div>
                                    )}
                                  </Field>
                                  <Field
                                    name={`${name}.answer`}
                                    type="radio"
                                    value="optionC"
                                  >
                                    {({ input, meta }) => (
                                      <div>
                                        <input
                                          {...input}
                                          className="me-2"
                                          value="optionC"
                                        />
                                        {item?.optionC}
                                      </div>
                                    )}
                                  </Field>
                                  <Field
                                    name={`${name}.answer`}
                                    type="radio"
                                    value="optionD"
                                  >
                                    {({ input, meta }) => (
                                      <div>
                                        <input
                                          {...input}
                                          className="me-2"
                                          value="optionD"
                                        />
                                        {item?.optionD}
                                      </div>
                                    )}
                                  </Field>
                                </div>
                                <hr />
                                <div className="d-flex w-100">
                                  {questionslist?.length !== quesno + 1 ? (
                                    <div className="btn_align_div w-100">
                                      {values.AnswerData[index].answer ===
                                      "" ? (
                                        <Button
                                          className=" corporate_card_btn"
                                          onClick={() => handleSkip(index)}
                                        >
                                          Skip
                                        </Button>
                                      ) : (
                                        <Button
                                          className=" corporate_card_btn"
                                          onClick={() =>
                                            handleClear(`${name}.answer`, form)
                                          }
                                        >
                                          Clear Response
                                        </Button>
                                      )}
                                      <Button
                                        className=" corporate_card_btn"
                                        onClick={() =>
                                          handleReview(index, "next")
                                        }
                                      >
                                        Mark For Review
                                      </Button>
                                      {values.AnswerData[index].answer !==
                                        "" && (
                                        <Button
                                          className="update_btn apply_btn corporate_card_btn"
                                          onClick={() => handleNext(index)}
                                        >
                                          Save & Next
                                        </Button>
                                      )}
                                    </div>
                                  ) : (
                                    <>
                                      {values.AnswerData[index].answer !==
                                        "" && (
                                        <>
                                          <Button
                                            className="corporate_card_btn"
                                            onClick={() =>
                                              handleClear(
                                                `${name}.answer`,
                                                form
                                              )
                                            }
                                          >
                                            Clear Response
                                          </Button>
                                        </>
                                      )}
                                      <Button
                                        className="corporate_card_btn"
                                        onClick={() => handleReview(index)}
                                      >
                                        Mark For Review
                                      </Button>
                                      {values.AnswerData[index].answer !==
                                        "" && (
                                        <>
                                          <Button
                                            className="update_btn apply_btn corporate_card_btn"
                                            onClick={() => handleSave(index)}
                                          >
                                            Save
                                          </Button>
                                        </>
                                      )}
                                    </>
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                        ))}
                      </>
                    )}
                  </FieldArray>
                </>
              )}
            </div>
          );
        })}
      <div className="">
        <Offcanvas
          placement={"bottom"}
          show={show1}
          onHide={handleClose1}
          className="time_left_offcanvas_container "
        >
          <Offcanvas.Header className="pb-1">
            <Offcanvas.Title></Offcanvas.Title>
            <button className="chat_box_close_btn" onClick={handleClose1}>
              <img src="/images/cross-icon.svg" />
            </button>
          </Offcanvas.Header>
          <Offcanvas.Body className="">
            <QuestionsPallete
              setShow1={setShow1}
              show1={show1}
              attemptData={attemptData}
              quesno={quesno}
              setQuesno={setQuesno}
              values={values}
              questionpalletedata={questionpalletedata}
              handleSubmit={handleSubmit}
              expiryTimestamp={expiryTimestamp}
              questionslist={questionslist1}
            />
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  );
}

export default TestScreen;
