import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";


const CoursesDetailsLeft = (props) => {

 const router = useRouter()

 const { query} = router.query

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
      tabsName: `Career after ${courseData?.courseName}`,
    },

    {
      tabsName: "Average fee",
    },
    {
      tabsName: "Salary Trends",
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
                    className={`nav-link admin_tabs_name no_wrap side_tabs w-100 ${dataValue === stepsIndex && "active_bar"
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
