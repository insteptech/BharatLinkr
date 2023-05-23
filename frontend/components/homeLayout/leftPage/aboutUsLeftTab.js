import React from "react";
import { Col, Row } from "react-bootstrap";
import AboutUs from "../rightPage/searchRightPages";

const AboutTabsData = [
  {
    studyName: "Intro",
    icons: "/images/top_college.png",
    path: "/college",
  },
  {
    studyName: "Vision & Mission",
    icons: "/images/top_cour.png",
    path: "/courses",
  },
  {
    studyName: "Our Business Area",
    icons: "/images/top_ex.png",
    path: "/exams",
  },
  {
    studyName: "Our Care Values",
    icons: "/images/write_review.png",
    path: "/college",
  },
  {
    studyName: "How We Work",
    icons: "/images/top_college.png",
    path: "/college",
  },
  {
    studyName: "Why Should You Do partnership  with us",
    icons: "/images/top_cour.png",
    path: "/courses",
  },
  {
    studyName: "Our Prestigious clients",
    icons: "/images/top_ex.png",
    path: "/exams",
  },
  {
    studyName: "Key Facts & Figures",
    icons: "/images/write_review.png",
    path: "/college",
  },
  {
    studyName: "Our Team",
    icons: "/images/write_review.png",
    path: "/college",
  },
  {
    studyName: "Get In Touch",
    icons: "/images/write_review.png",
    path: "/college",
  },
];

const AboutLeftTabs = (props) => {
  const { dataValue, setDataValue } = props;

  return (
    <>
      <div className="card_sec">
        <div className="card_mid search_left_card">
          <Row>
            <Col md={12} className="p-0">
              <ul className="nav search_page_left_tabs_box">
                {AboutTabsData &&
                  AboutTabsData?.map((steps, stepsIndex) => (
                    <li className="nav-item " key={stepsIndex}>
                      <a
                        className={`nav-link admin_tabs_name ${
                          dataValue === stepsIndex && "head-active"
                        }`}
                        active="true"
                        onClick={() => setDataValue(stepsIndex)}
                      >
                        {/* <img src={steps.icons} /> */}
                        {steps.studyName}
                        {/* <span>({steps.count})</span> */}
                      </a>
                    </li>
                  ))}
              </ul>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default AboutLeftTabs;
