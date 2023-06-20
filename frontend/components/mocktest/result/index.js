import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { mocktestScoreCount } from "../../../redux/actions/corporate/addmocktestcorporate";
import LoaderPage from "../../common-components/loader";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

function Result() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { query } = router;
  const result = useSelector((state) => state.corporateMocktest.testResult)
  const userAnswersList = useSelector((state) => state.corporateMocktest.userAnswersList)
  const correctQuestionCount = useSelector(state => state.corporateMocktest.correctQuestionCount)
  const wrongQuestionCount = useSelector(state => state.corporateMocktest.wrongQuestionCount)
  const mocktestLoading = useSelector(state => state?.corporateMocktest?.isMockTestLoading)

  useEffect(() => {
    if (query.ids) {
      let [id, mockTestId, userId] = query.ids.split("-");
      dispatch(mocktestScoreCount({
        attemptId: id,
        mockTestId: mockTestId,
        userId: userId,
      }));
    }
  }, [query]);
  const SkippedQuestion = () => {
    if (userAnswersList && userAnswersList.length > 0) return userAnswersList.reduce((count, item) => item.answer === null ? count + 1 : count, 0);
  }
  const accuracy = () => {
    let attemptedQuestions = 0
    let correctQuestions = 0
    userAnswersList && userAnswersList.length > 0 && userAnswersList.map((answerItem, answerIndex) => {
      if (answerItem.answer) {
        attemptedQuestions += 1
        if (answerItem.correct) {
          correctQuestions += 1
        }
      }
    })
    let accuracy = correctQuestions / attemptedQuestions
    return accuracy ? accuracy * 100 : 0
  }
  ChartJS.register(ArcElement, Tooltip, Legend);



  const data = {
    labels: ["Skip", "Wrong", "Correct"],
    datasets: [
      {
        label: "Questions",
        data: [SkippedQuestion(), wrongQuestionCount ? wrongQuestionCount - SkippedQuestion() : 0, correctQuestionCount ? correctQuestionCount : 0],
        backgroundColor: ["#c8c1df", "#f7684a", "#1ba643"],
        width: 10,
        borderWidth: 5,
      }
    ]
  };
  return (
    <div className=" ">
      {mocktestLoading ? <LoaderPage /> :
        <Container className="result_container_padding">
          <h1 className="text-center edit_profile_h2 mobile_font_18 margin_top_mob">
            Congratulations! You've completed the test
          </h1>
          <Row >
            <Col lg={5} md={12}>
              <div className="graph_bg">
                <Doughnut data={data} />
              </div>
            </Col>
            <Col md={12} lg={7} >
              <div className="center_card">
                <Card className="result_card">
                  <h1 className="total_score_h1 mobile_font_18">
                    Total Score: {result?.marksObtained}/{result?.totalMarks}
                  </h1>
                  <Row>
                    <Col xs={5}>
                      <p className="total_score_p mobile_font_14 text-break">Percentile:</p>
                      <p className="total_score_p mobile_font_14">Accuracy:</p>
                      <p className="total_score_p mobile_font_14">Time Taken:</p>
                    </Col>
                    <Col xs={7}>
                      <p className="total_score_p mobile_font_14 text-truncate"><span className="">{result?.marksPercentage}%</span></p>
                      <p className="total_score_p mobile_font_14 text-truncate"><span className="">{accuracy()}%</span></p>
                      <p className="total_score_p mobile_font_14 text-truncate"><span className="">{result?.MockTest?.totalTime} Mins</span></p>
                    </Col>
                  </Row>
                </Card>
                <Card className="result_card">
                  <div className="green_p">
                    <img className="me-3" src="/images/green-check.svg" /> {correctQuestionCount ? correctQuestionCount : 0} Correct Questions
                  </div>
                  <div className="red_p green_p">
                    <img className="me-3" src="/images/red-cross.svg" /> {wrongQuestionCount ? wrongQuestionCount - SkippedQuestion() : 0} Wrong Questions
                  </div>
                  <div className="light_p green_p">
                    <img className="me-3" src="/images/light-minus.svg" />{SkippedQuestion()} Skipped Questions
                  </div>
                </Card>
                <div
                  className="re_attempt mobile_font_14 mb-2"
                  onClick={() =>
                    router.push(`/corporate/mocktest/${result?.mockTestId}`)
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
        </Container>
      }
    </div>

  );
}

export default Result;
