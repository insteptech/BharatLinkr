import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const EducationBars = ["BASIC INFORMATION", "COURSE DETAILS", "HONORS"];

const DistanceeducationRight = (props) => {
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
                {EducationBars &&
                  EducationBars?.map((steps, stepsIndex) => (
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

      {collegeDetails && collegeDetails.map((distEducation, index) => (
        <div className="" key={index}>
          {props.dataValue === 0 && (
            <>
              <h1>Basic Info</h1>
              <p>{distEducation?.basicInfo}</p>
            </>
          )}
          {props.dataValue === 1 && (
            <>
              <h1>Course Details</h1>
              <p>{distEducation?.courseDetails}</p>
            </>
          )}
          {props.dataValue === 2 && (
            <>
              <h1>Honors</h1>
              <p>{distEducation?.honors}</p>
            </>
          )}
        </div>
      ))}
    </>
  );
};

export default DistanceeducationRight;
