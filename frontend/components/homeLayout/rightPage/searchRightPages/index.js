import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getColleges } from "../../../../redux/actions/college/college";
import { getCourse } from "../../../../redux/actions/course/addcourse";
import { getAllExams } from "../../../../redux/actions/exams/createExam";
import CollegeCard from "../../../Colleges/collegeCard";
import PopularCourseCard from "../../../course/courseLeftPage/courseRightPage/popularcourseCard";
import ExamLongCard from "../../../Exam/examRightPage/examLongCard";
import CommonTab from "./commonpage";
import ProfilesPage from "./profilePage";

const SearchRightPage = ({ searchdata1, dataValue, setDataValue }, props) => {
  const dispatch = useDispatch();

  const data = [
    {
      name: "Profiles",
      api: function (query) {
        dispatch(getCourse(query));
      },
      key: "profiles",
      renderdata: function () {
        return (
          <>
            <ProfilesPage />
          </>
        );
      },
      filterdata: [
        {
          name: "Status",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Department",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Sub Department",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
      ],
    },
    {
      name: "Scripts",
      api: function (query) {
        dispatch(getCourse(query));
      },
      key: "scripts",
      renderdata: function () {
        return (
          <>
            <h1>Hi</h1>
          </>
        );
      },
      filterdata: [
        {
          name: "Status",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
      ],
    },
    {
      name: "Jobs",
      api: function (query) {
        dispatch(getCourse(query));
      },
      key: "jobs",
      renderdata: function () {
        return (
          <>
            <h1>Hi</h1>
          </>
        );
      },
      filterdata: [
        {
          name: "Status",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Department",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Sub Department",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Location",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Eligibility",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Job Type",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Job Role",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Work mode",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Sort By",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
      ],
    },
    {
      name: "Internships",
      api: function (query) {
        dispatch(getCourse(query));
      },
      key: "internships",
      renderdata: function () {
        return (
          <>
            <h1>InternShip</h1>
          </>
        );
      },
      filterdata: [
        {
          name: "Status",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Department",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Sub Department",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Location",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Eligibility",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Job Type",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Job Role",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Work mode",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Sort By",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
      ],
    },
    {
      name: "Announcements",
      api: function (query) {
        dispatch(getCourse(query));
      },
      key: "announcements",
      renderdata: function () {
        return (
          <>
            <h1>Hi</h1>
          </>
        );
      },
      filterdata: [
        {
          name: "Stream",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Sub Stream",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Sort By",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
      ],
    },
    {
      name: "Question Bank",
      api: function (query) {
        dispatch(getCourse(query));
      },
      key: "questionbank",
      renderdata: function () {
        return (
          <>
            <h1>Hi</h1>
          </>
        );
      },
      filterdata: [
        {
          name: "Stream",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Sub Stream",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "College",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Course",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Exams",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Corporate",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Sort by",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
      ],
    },
    {
      name: "Offer Service",
      api: function (query) {
        dispatch(getCourse(query));
      },
      key: "offerservices",
      renderdata: function () {
        return (
          <>
            <h1>Hi</h1>
          </>
        );
      },
      filterdata: [
        {
          name: "Stream",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "mainStreamName",
        },
        {
          name: "Sub stream",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "subStreamName",
        },
        {
          name: "Sort By",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
      ],
    },
    {
      name: "Colleges",
      api: function (query) {
        dispatch(getColleges(query));
      },
      key: "colleges",
      renderdata: function () {
        const collegelist = useSelector(
          (data) => data?.collegelist?.collegelist
        );
        return (
          <>
            <Row xs={1} sm={2} md={3} className="g-3">
              {collegelist &&
                collegelist?.rows?.map((item, index) => {
                  return (
                    <Col>
                      <CollegeCard item={item} index={index} />
                    </Col>
                  );
                })}
            </Row>
          </>
        );
      },
      filterdata: [
        {
          name: "State",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "City",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Stream",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Course",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Program Type",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Affiliation",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Agency",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Course Type",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Type of College",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Exam Accepted",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
      ],
    },
    {
      name: "course",
      key: "courses",
      api: function (query) {
        dispatch(getCourse(query));
      },
      selectordata: function () {
        let list = useSelector(
          (data) => data?.courseList?.courselist?.data?.rows
        );
        return list;
      },
      renderdata: function () {
        let list = useSelector(
          (data) => data?.courseList?.courselist?.data?.rows
        );
        return (
          <>
            {/* {list.map((item, index) => { */}
              {/* // return (<div key={index}>{item.courseName}</div>) */}
              {/* return ( */}
                <>
                  <PopularCourseCard />
                </>
              {/* ); */}
            {/* })} */}
          </>
        );
        return (
          <>
            <PopularCourseCard />
          </>
        );
      },
      filterdata: [
        {
          name: "Stream",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Course Level",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
      ],
    },
    {
      name: "Exams",
      api: function (query) {
        dispatch(getAllExams(query));
      },
      key: "exams",
      renderdata: function () {
        let examData = useSelector(
          (data) => data?.examList?.examlist?.data?.data
        );
        return (
          <>
            <div>
              {examData?.length === 0 ? (
                <>
                  <h4>NO EXAMS FOUND</h4>
                </>
              ) : (
                examData?.rows?.map((item, index) => {
                  return <ExamLongCard key={index} item={item} />;
                })
              )}
            </div>
          </>
        );
      },
      filterdata: [
        {
          name: "Exam Type",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Application Mode",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Exam Mode",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
      ],
    },
    {
      name: "Corporate",
      api: function (query) {
        dispatch(getCourse(query));
      },
      key: "corporate",
      renderdata: function () {
        return (
          <>
            <h1>Hi</h1>
          </>
        );
      },
      filterdata: [
        {
          name: "Study Goals",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Worksheets",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Mock Tests",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Library",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
      ],
    },
    {
      name: "Organisation",
      api: function (query) {
        dispatch(getCourse(query));
      },
      key: "organisation",
      renderdata: function () {
        return (
          <>
            <h1>Hi</h1>
          </>
        );
      },
      filterdata: [
        {
          name: "State",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "City",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Company Level",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Industry",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Company Age",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Nature of Business",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Type of Company",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
      ],
    },
    {
      name: "Mentoring",
      api: function (query) {
        dispatch(getCourse(query));
      },
      key: "mentoring",
      renderdata: function () {
        return (
          <>
            <h1>Hi</h1>
          </>
        );
      },
      filterdata: [
        {
          name: "Streams",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Sub Streams",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Sort By",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
      ],
    },
    {
      name: "College Festives",
      api: function (query) {
        dispatch(getCourse(query));
      },
      key: "collegefestivals",
      renderdata: function () {
        return (
          <>
            <h1>Hi</h1>
          </>
        );
      },
      filterdata: [
        {
          name: "Status",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
      ],
    },
    {
      name: "Scholarship",
      api: function (query) {
        dispatch(getCourse(query));
      },
      key: "scholarship",
      renderdata: function () {
        return (
          <>
            <h1>Hi</h1>
          </>
        );
      },
      filterdata: [
        {
          name: "Status",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Streams",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Sub Streams",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Eligibility",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Sort By",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
      ],
    },
    {
      name: "Cultural Events",
      api: function (query) {
        dispatch(getCourse(query));
      },
      key: "culturalevents",
      renderdata: function () {
        return (
          <>
            <h1>Hi</h1>
          </>
        );
      },
      filterdata: [
        {
          name: "Status",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Streams",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Sub Streams",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Eligibility",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Sort By",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
      ],
    },
    {
      name: "Conferences",
      api: function (query) {
        dispatch(getCourse(query));
      },
      key: "conferences",
      renderdata: function () {
        return (
          <>
            <h1>Hi</h1>
          </>
        );
      },
      filterdata: [
        {
          name: "Status",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Streams",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Sub Streams",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Eligibility",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Sort By",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
      ],
    },
    {
      name: "Competitions",
      api: function (query) {
        dispatch(getCourse(query));
      },
      key: "competitions",
      renderdata: function () {
        return (
          <>
            <h1>Hi</h1>
          </>
        );
      },
      filterdata: [
        {
          name: "Status",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Streams",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Sub Streams",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Eligibility",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Sort By",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
      ],
    },
    {
      name: "Hackathon",
      api: function (query) {
        dispatch(getCourse(query));
      },
      key: "hackathon",
      renderdata: function () {
        return (
          <>
            <h1>Hi</h1>
          </>
        );
      },
      filterdata: [
        {
          name: "Status",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Streams",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Sub Streams",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Eligibility",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Sort By",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
      ],
    },
    {
      name: "Hiring Challenges",
      api: function (query) {
        dispatch(getCourse(query));
      },
      key: "hiringchallenges",
      renderdata: function () {
        return (
          <>
            <h1>Hi</h1>
          </>
        );
      },
      filterdata: [
        {
          name: "Status",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Streams",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Sub Streams",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Eligibility",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
        {
          name: "Sort By",
          data: [{ name: "Date" }, { name: "Popularity" }],
          key: "name",
        },
      ],
    },
    {
      name: "Campus Recruitment",
      api: function (query) {
        dispatch(getCourse(query));
      },
      key: "campusrecruitment",
    },
  ];

  return (
    <>
      <ScrollingCarousel show={5.5} slide={4} swiping={true}>
        <ul className="nav mb-3 big_screen_hide_row">
          {searchdata1 &&
            searchdata1?.map((steps, stepsIndex) => (
              <li className="nav-item" key={stepsIndex}>
                <a
                  className={`nav-link mobile_search_tab font_12 ${
                    dataValue === steps?.key && "btn_active"
                  }`}
                  active={true}
                  onClick={() => {
                    setDataValue(steps?.key);
                  }}
                >
                  <img
                    className="post_card_icons"
                    src={
                      dataValue === steps?.key ? steps.darkicons : steps.icons
                    }
                  />
                  {steps.studyName}
                  <span className="ms-2">({steps.count})</span>
                </a>
              </li>
            ))}
        </ul>
      </ScrollingCarousel>
      {data.map((item, index) => {
        if (item?.key === dataValue) {
          return (
            <div key={index}>
              <CommonTab data={item} />
              {item.renderdata()}
            </div>
          );
        }
      })}
    </>
  );
};

export default SearchRightPage;
