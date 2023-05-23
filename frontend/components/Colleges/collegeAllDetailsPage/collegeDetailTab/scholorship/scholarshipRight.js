import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import React from "react";
import { Col, Row } from "react-bootstrap";

const ScholarshipBars = [
  "INTRODUCTION",
  "BASED ON UNI EXAMS",
  "BASED ON ADMISSION TEST",
  "Based on +2, Diploma Grad scores",
  "ON BASIS OF SPORTS QUOTA",
];

const ScholarshipRight = (props) => {
  const { dataValue, setDataValue } = props;

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
                        className={`nav-link admin_tabs_name ${
                          dataValue === stepsIndex && "head-active"
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
      <div className="">
        {props.dataValue === 0 && (
          <>
            <h1>Basic Info</h1>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
              dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
              elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            </p>
          </>
        )}
        {props.dataValue === 1 && <h3>hIGHLIGHTS</h3>}
        {props.dataValue === 2 && <h3>Ranking & Awards</h3>}
        {props.dataValue === 3 && <h3>COURSES</h3>}
        {props.dataValue === 4 && <h3>SCHOLARSHIP PLACEMENTS</h3>}
        {props.dataValue === 5 && <h3>FACILITIES</h3>}
      </div>
    </>
  );
};

export default ScholarshipRight;
