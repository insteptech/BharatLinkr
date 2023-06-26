import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Examleftpage from "./examleftpage";
import ExamrightPage from "./examrightpage";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";

function ExamOverView(props) {
  const [tab, setTab] = useState("");

  const router = useRouter();
  const { Id } = router.query;
  const { active } = router.query;

  const [activeInnertab, setActiveInnertab] = useState("");
  const [activeTab, setActiveTab] = useState("");

  const lefttab = {
    about: [
      { value: "Defination", key: "examAboutDefination" },
      { value: "Highlights", key: "examAboutHighlights" },
      { value: "Important Dates", key: "examAboutImportantDates" },
      { value: "Pattern", key: "examAboutPattern" },
      { value: "Syllabus", key: "examAboutSyllabus" },
      { value: "Important Books", key: "examAboutImportantBooks" },
      { value: "Helpline", key: "examAboutHelpLine" },
      { value: "Previous Papers", key: "examAboutPreviousPapers" },
    ],
    registration: [
      { value: "Highlights", key: "examRegistrationHighlights" },
      { value: "application Date", key: "applicationDate" },
      { value: "Application Fees", key: "applicationFees" },
      { value: "Eligibility", key: "eligibility" },
      { value: "Documents Required", key: "documentsRequired" },
      { value: "Guide", key: "guide" },
      {
        value: "Application Form Correction",
        key: "applicationFormCorrection",
      },
    ],
    admitcard: [
      { value: "Highlights", key: "examAdmitCardHighlights" },
      { value: "Release Date", key: "releaseDate" },
      { value: "How to download", key: "howToDownload" },
      { value: "Sample", key: "sample" },
      { value: "forgot Login details", key: "forgotLoginDetails" },
      { value: "Correction", key: "correction" },
    ],
    importantdates: [
      { value: "Intro", key: "examImportantDatesIntro" },
      { value: "Exam Schedule", key: "examSchedule" },
      { value: "Schedule for other Sessions", key: "scheduleForOtherSession" },
    ],
    reservation: [
      { value: "Intro", key: "examReservationIntro" },
      { value: "Highlights", key: "examReservationHighlights" },
      { value: "Criteria", key: "criteria" },
      { value: "Category Wise", key: "categoryWise" },
      { value: "For women", key: "forWomen" },
      { value: "For PWD women", key: "forPWDWomen" },
      { value: "EWS Quota", key: "underEWSQuota" },
    ],
    examcenters: [
      { value: "Intro", key: "examCentreIntro" },
      { value: "List of Exam Centers", key: "listOfExamCentres" },
    ],
    eligibility: [
      { value: "Intro", key: "examEligibilityIntro" },
      { value: "Highlights", key: "examEligibilityHighlights" },
      { value: "Detailed Criteria", key: "detailedCriteria" },
      {
        value: "Marks Required for Qualifying",
        key: "marksRequiredForQualifying",
      },
    ],
    exampattern: [
      { value: "Highlights", key: "examPatternHighlights" },
      { value: "Paper 1 Pattern", key: "examPatternPaper1Pattern" },
      { value: "Paper 2 Pattern", key: "examPatternPaper2Pattern" },
      { value: "Paper 3 Pattern", key: "examPatternPaper3Pattern" },
      { value: "Paper 4 Pattern", key: "examPatternPaper4Pattern" },
      { value: "Paper 5 Pattern", key: "examPatternPaper5Pattern" },
      { value: "Paper 6 Pattern", key: "examPatternPaper6Pattern" },
      { value: "Weightage", key: "weightage" },
    ],
    syllabus: [
      { value: "Highlights", key: "examSyllabusHighlights" },
      { value: "Paper 1 Pattern", key: "examSyllabusPaper1Pattern" },
      { value: "Paper 2 Pattern", key: "examSyllabusPaper2Pattern" },
      { value: "Paper 3 Pattern", key: "examSyllabusPaper3Pattern" },
      { value: "Paper 4 Pattern", key: "examSyllabusPaper4Pattern" },
      { value: "Paper 5 Pattern", key: "examSyllabusPaper5Pattern" },
      { value: "Paper 6 Pattern", key: "examSyllabusPaper6Pattern" },
      { value: "Best Books", key: "bestBooks" },
    ],
    preparationtips: [
      { value: "Best Time", key: "bestTime" },
      {
        value: "Section Wise Preparation Tips",
        key: "sectionWisePreparationTips",
      },
      { value: "Subject 1 Books", key: "subject1Books" },
      { value: "Subject 2 Books", key: "subject2Books" },
      { value: "Subject 3 Books", key: "subject3Books" },
      { value: "Subject 4 Books", key: "subject4Books" },
    ],
    counselling: [
      { value: "Step By Step Process", key: "stepByStepProcess" },
      { value: "Schedule For Exams", key: "scheduleForExams" },
      {
        value: "Other Related Exams Counselling",
        key: "otherRelatedExamsCounselling",
      },
    ],
    faq: [{ value: "General" }],
    participatingcolleges: [
      {
        value: "List of Top Colleges Accepting JEE",
        key: "listOfTopCollegesAcceptingJEE",
      },
    ],
  };

  useEffect(() => {
    if (active) {
      setTab(active)
    }
    if (tab) {
      router.push(`/exams/overview/${Id}?active=${tab}`);
    } else {
      router.push(`/exams/overview/${Id}?active=${active}`);
    }
  }, [tab]);

  const FormSteps = [
    {
      value: "About",
      key: "about",
    },
    {
      value: "Registration",
      key: "registration",
    },
    {
      value: "Admit Card",
      key: "admitcard",
    },
    {
      value: "Important Dates",
      key: "importantdates",
    },
    {
      value: "Reservation",
      key: "reservation",
    },
    {
      value: "Exam Centers",
      key: "examcenters",
    },
    {
      value: "Eligibility",
      key: "eligibility",
    },
    {
      value: "Exam Pattern",
      key: "exampattern",
    },
    {
      value: "Syllabus",
      key: "syllabus",
    },
    {
      value: "Preparation Tips",
      key: "preparationtips",
    },
    {
      value: "Counselling",
      key: "counselling",
    },
    {
      value: "FAQ",
      key: "faq",
    },
    {
      value: "Participating Colleges",
      key: "participatingcolleges",
    },
  ];

  return (
    <>
      <div>
        <Container>
          <Row>
            <Col lg={12} md={12} className="">
              <div className="blue_row_tabs mt-0">
                <ScrollingCarousel show={5.5} slide={4} swiping={true}>
                  {/* <Swiper
                  className="swiper_main_blue_row"
                  navigation
                  modules={[Navigation]}
                  spaceBetween={8}
                  autoplay={true}
                  slidesPerView={8}
                > */}
                  <ul className="nav tabs_scroll line_height" style={{ display: "flex" }}>
                    {FormSteps &&
                      FormSteps?.map((steps, stepsIndex) => (
                        // <SwiperSlide className="swiper_sub_div">
                        <li className="nav-item " key={stepsIndex}>
                          <a
                            className={`nav-link admin_tabs_name blue_row_tabs ${active === steps?.key &&
                              "head-active blue_tabs_active"
                              }`}
                            active={true}
                            onClick={() => router.push(`/exams/overview/${Id}?active=${steps?.key}`)}
                          >
                            {steps.value}
                          </a>
                        </li>
                        // </SwiperSlide>
                      ))}
                  </ul>
                  {/* </Swiper> */}
                </ScrollingCarousel>
              </div>
            </Col>
            <Col>
              <Row>
                <Col className="search_left_page_bg hide_box" lg={3}>
                  <Examleftpage
                    setActiveInnertab={setActiveInnertab}
                    lefttab={lefttab}
                    setActiveTab={setActiveTab}
                    activeTab={activeTab}
                  />
                </Col>
                <Col className="search_right_page_bg" lg={9}>
                  <ExamrightPage
                    activeInnertab={activeInnertab}
                    setActiveInnertab={setActiveInnertab}
                    lefttab={lefttab}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default ExamOverView;
