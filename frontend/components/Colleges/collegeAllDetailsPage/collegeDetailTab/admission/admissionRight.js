import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const AdmissionBars = [
  "Introduction",
  "About Test",
  "Important Dates",
  "Admission Highlights",
  "Application Process",
  "PHD Admission Process",
  // "Documents Required",
];

function AdmissionRight(props) {
  const { dataValue, setDataValue } = props;

  const collegeDetails = useSelector((data) => data?.collegelist?.college?.rows);
  return (
    <>
      <div className="">
        <div className="admin_home_tabs_row top_padding_none big_screen_none">
          <Row>
            <Col lg={12} className="p-0">
              <ScrollingCarousel show={5.5} slide={4} swiping={true}>
                <ul className="nav ">
                  {AdmissionBars &&
                    AdmissionBars?.map((steps, stepsIndex) => (
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
        {collegeDetails && collegeDetails?.map((admissionlist, index) => (
          <div key={index}>
            {props.dataValue === 0 && (
              <>
                <h4>Introduction</h4>
                <p>{admissionlist?.admissionIntro}
                </p>
              </>
            )}
            {props.dataValue === 1 && (
              <>
                <h4>ABOUT TEST</h4>
                <p>{admissionlist?.admissionAboutTest}
                </p>
              </>
            )}
            {props.dataValue === 2 && (
              <>
                <h4>IMPORTANT DATES</h4>
                <p>{admissionlist?.admissionImportantDates}
                </p>
              </>
            )}
            {props.dataValue === 3 && (
              <>
                <h4>ADMISSION HIGHLIGHTS</h4>
                <p>{admissionlist?.admissionHighLights}
                </p>
              </>
            )}
            {props.dataValue === 4 && (
              <>
                <h4>APPLICATION PROCESS</h4>
                <p>{admissionlist?.applicationProcess}
                </p>
              </>
            )}
            {props.dataValue === 5 && (
              <>
                <h4>PHD ADMISSION PROCESS</h4>
                <p>{admissionlist?.PHDadmissionProcess}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default AdmissionRight;
