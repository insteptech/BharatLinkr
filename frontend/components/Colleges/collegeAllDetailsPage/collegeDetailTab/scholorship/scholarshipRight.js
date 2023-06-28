import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const ScholarshipBars = [
  "INTRODUCTION",
  "BASED ON UNI EXAMS",
  "BASED ON ADMISSION TEST",
  "Based on +2, Diploma Grad scores",
  "ON BASIS OF SPORTS QUOTA",
];

const ScholarshipRight = (props) => {
  const { dataValue, setDataValue } = props;

  const collegeDetails = useSelector(
    (data) => data?.collegelist?.college?.rows
  );

  return (
    <>
      <div className="admin_home_tabs_row top_padding_none big_screen_none">
        <Row>
          <Col lg={12} className="p-0">
            <ScrollingCarousel show={5.5} slide={4} swiping={true}>
              <ul className="nav ">
                {ScholarshipBars &&
                  ScholarshipBars?.map((steps, stepsIndex) => (
                    <li className="nav-item " key={stepsIndex}>
                      <a
                        className={`nav-link admin_tabs_name ${dataValue === stepsIndex && "head-active"
                          }`}
                        active={true}
                        onClick={() => setDataValue(stepsIndex)}
                      >
                        {steps}
                      </a>
                    </li>
                  ))}
              </ul>
            </ScrollingCarousel>
          </Col>
        </Row>
      </div>
      {collegeDetails && collegeDetails.map((scholarshipData, index) => (
        <div className="" key={index}>
          {props.dataValue === 0 && (
            <>
              <p>{scholarshipData?.scholarShipIntro}</p>
            </>
          )}
          {props.dataValue === 1 && (
            <>
              <p>{scholarshipData?.basedOnUniExams}</p>
            </>
          )}
          {props.dataValue === 2 && (
            <>
              <p>{scholarshipData?.basedOnAdmissionTest}</p>
            </>
          )}
          {props.dataValue === 3 && (
            <>
              <p>{scholarshipData?.basedOnDiplomaGraduates}</p>
            </>
          )}
          {props.dataValue === 4 && (
            <>
              <p>{scholarshipData?.basedOnSportsQuota}</p>
            </>
          )}
        </div>
      ))}
    </>
  );
};

export default ScholarshipRight;
