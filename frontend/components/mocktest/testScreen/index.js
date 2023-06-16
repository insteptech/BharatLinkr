import DOMPurify from "dompurify";
import React, { useEffect, useMemo } from "react";
import { Button, Card, Offcanvas, ProgressBar, } from "react-bootstrap";
import { Field, Form } from "react-final-form";
import { useSelector } from "react-redux";
import { FieldArray } from "react-final-form-arrays";
import { useTimer } from "react-timer-hook";
import { useRouter } from "next/router";
import { useState } from "react";
import QuestionsPallete from "../questionPallete";
import { mocktestQuestionStatus } from "../../utils";
import { apibasePath } from "../../../config";
import Image from "next/image";

function TestScreen(props) {
  const { activeQuestion, setActiveQuestion, setQuestionpalletedata, questionpalletedata, values, form, expiryTimestamp, questionslist1, handleSubmit, setConfirmModal } = props

  const questionslist = useSelector(state => state.corporateMocktest.questionList);
  const now = 70;

  const { seconds, minutes, hours } = useTimer({ expiryTimestamp, onExpire: () => handleSubmit(values) });

  const [timePalleteShow, setTimePalleteShow] = useState(false);
  const handleCloseTimePallete = () => setTimePalleteShow(false);
  const handleShowTimePallete = () => setTimePalleteShow(true);

  const activeQuestionDetail = questionslist.find((item, index) => index === activeQuestion)

  const handleQuestionStatus = (index, status, nextStep) => {
    if (index < questionpalletedata.length - 1 && !nextStep) setActiveQuestion(index + 1)
    let tempQuestionData = [...questionpalletedata]
    tempQuestionData[index].status = status
    setQuestionpalletedata(tempQuestionData)
  }
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
        {/* this Is For Mobile Screen*/}
        <ProgressBar now={now} label={`${now}%`} />;
      </div>

      <FieldArray name="AnswerData">
        {({ fields }) =>
          fields.map((questionItem, questionIndex) =>
            activeQuestion === questionIndex && (
              <div key={`Question_${questionIndex}`}>
                <div className="q_count_row">
                  <div className="d-flex">
                    <h3 className="question_h3">
                      Question - {activeQuestion + 1}
                    </h3>
                    <p className="question_p">Marks + 1</p>
                    <p className="question_p">
                      {activeQuestion + 1}/{questionslist?.length}
                    </p>
                  </div>
                  <div className="big_screen_none">
                    <p
                      onClick={handleShowTimePallete}
                      className="question_act_p"
                    >
                      Activities
                    </p>
                  </div>
                </div>
                <hr />
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(activeQuestionDetail?.question),
                  }}
                />
                <Image
                  height={92}
                  width={264}
                  className="question_img"
                  alt=""
                  src={activeQuestionDetail?.questionImage ? `${apibasePath}documents/corporate/${activeQuestionDetail?.questionImage}` : "/images/company-1.png"}
                />
                <div className="d-flex flex-column">
                  <Field
                    name={`${questionItem}.answer`}
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
                        <Image
                          height={15}
                          width={15}
                          // className="question_img"
                          alt="icon"
                          src={activeQuestionDetail?.optionAImage?`${apibasePath}documents/corporate/${activeQuestionDetail?.optionAImage}`:"/images/A..svg"}
                        />
                        {activeQuestionDetail?.optionA}
                      </div>
                    )}
                  </Field>
                  <Field
                    name={`${questionItem}.answer`}
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
                        <Image
                          height={13}
                          width={13}
                          // className="question_img"
                          alt=""
                          src={activeQuestionDetail?.optionBImage?`${apibasePath}documents/corporate/${activeQuestionDetail?.optionBImage}`:"/images/B..svg"}
                        />
                        {activeQuestionDetail?.optionB}
                      </div>
                    )}
                  </Field>
                  <Field
                    name={`${questionItem}.answer`}
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
                        <Image
                          height={15}
                          width={15}
                          // className="question_img"
                          alt=""
                          src={activeQuestionDetail?.optionBImage?`${apibasePath}documents/corporate/${activeQuestionDetail?.optionBImage}`:"/images/C..svg"}
                        />
                        {activeQuestionDetail?.optionC}
                      </div>
                    )}
                  </Field>
                  <Field
                    name={`${questionItem}.answer`}
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
                        <Image
                          height={13}
                          width={13}
                          // className="question_img"
                          alt=""
                          src={activeQuestionDetail?.optionBImage?`${apibasePath}documents/corporate/${activeQuestionDetail?.optionBImage}`:"/images/D..svg"}
                        />
                        {activeQuestionDetail?.optionD}
                      </div>
                    )}
                  </Field>
                </div>
                <hr />
                <div className="d-flex w-100">
                  <div className="btn_align_div w-100">
                    {values.AnswerData[questionIndex].answer ?
                      <>
                        <Button
                          className=" corporate_card_btn"
                          onClick={() => {
                            form.change(`${questionItem}.answer`, null)
                            handleQuestionStatus(questionIndex, mocktestQuestionStatus.notAnswered, true)
                          }}
                        >
                          Clear Response
                        </Button>
                        {questionpalletedata[questionIndex].status !== mocktestQuestionStatus.forReview &&
                          <Button
                            className=" corporate_card_btn"
                            onClick={() => handleQuestionStatus(questionIndex, mocktestQuestionStatus.forReview)}
                          >
                            Mark For Review
                          </Button>
                        }
                      </>
                      :
                      <Button
                        className=" corporate_card_btn"
                        onClick={() => handleQuestionStatus(questionIndex, mocktestQuestionStatus.notAnswered)}
                      >
                        Skip
                      </Button>}
                    {values.AnswerData[questionIndex].answer && (
                      <Button
                        className="update_btn apply_btn corporate_card_btn"
                        onClick={() => handleQuestionStatus(questionIndex, mocktestQuestionStatus.answered)}
                      >{activeQuestion + 1 === questionslist.length ? "Save " : "Save & Next"}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
      </FieldArray >

      <div className="">
        <Offcanvas
          placement={"bottom"}
          show={timePalleteShow}
          onHide={handleCloseTimePallete}
          className="time_left_offcanvas_container "
        >
          <Offcanvas.Header className="pb-1">
            <Offcanvas.Title></Offcanvas.Title>
            <button className="chat_box_close_btn" onClick={handleCloseTimePallete}>
              <img src="/images/cross-icon.svg" />
            </button>
          </Offcanvas.Header>
          <Offcanvas.Body className="">
            <QuestionsPallete
              setTimePalleteShow={setTimePalleteShow}
              timePalleteShow={timePalleteShow}
              activeQuestion={activeQuestion}
              setActiveQuestion={setActiveQuestion}
              values={values}
              questionpalletedata={questionpalletedata}
              handleSubmit={handleSubmit}
              expiryTimestamp={expiryTimestamp}
              setConfirmModal={setConfirmModal}
            />
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  );
}

export default TestScreen;
