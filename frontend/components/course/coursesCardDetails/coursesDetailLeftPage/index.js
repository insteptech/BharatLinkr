import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

// const coursetabs = [
//   {
//     tabsName: "ABOUT B.ARCH",
//   },
//   {
//     tabsName: "Specialization",
//   },
//   {
//     tabsName: "Eligibility",
//   },
//   {
//     tabsName: "Course after B.Arch",
//   },
//   {
//     tabsName: "Carrer after B.Arch",
//   },
//   {
//     tabsName: "IMPORTANT EXAM BOOKS",
//   },
//   {
//     tabsName: "Average fee",
//   },
//   {
//     tabsName: "Salary Trends",
//   },
//   {
//     tabsName: "Top recruiters",
//   },
// ];

const CoursesDetailsLeft = (props) => {
  const courseDetails = useSelector(
    (state) => state?.courseList?.courseData?.data?.data?.rows
  );

  const [courseData, setCourseData] = useState();

  useEffect(() => {
    courseDetails?.map((course) => setCourseData(course));
  }, [courseDetails]);

  const coursetabs = [
    {
      tabsName: `About ${courseData?.courseName}`,
    },
    {
      tabsName: "Specialization",
    },
    {
      tabsName: "Eligibility",
    },
    {
      tabsName: `Course after ${courseData?.courseName}`,
    },
    {
      tabsName: `Carrer after ${courseData?.courseName}`,
    },
    {
      tabsName: "IMPORTANT EXAM BOOKS",
    },
    {
      tabsName: "Average fee",
    },
    {
      tabsName: "Salary Trends",
    },
    {
      tabsName: "Top recruiters",
    },
  ];
  const { dataValue, setDataValue } = props;

  return (
    <>
      <div className="card_sec">
        <div className="card_mid search_left_card">
          <ul className="nav search_page_left_tabs_box">
            {coursetabs &&
              coursetabs?.map((item, stepsIndex) => (
                <li
                  className="nav-item search_page_side_tabs w-100"
                  key={stepsIndex}
                >
                  <a
                    className={`nav-link admin_tabs_name no_wrap side_tabs w-100 ${
                      dataValue === stepsIndex && "active_bar"
                    }`}
                    active={true}
                    onClick={() => setDataValue(stepsIndex)}
                  >
                    {item.tabsName}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default CoursesDetailsLeft;
