import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";

const AboutBars = [
  "Business Development Manager [BDM]",
  "Business Development Manager [BDM]",
  "Business Development Manager [BDM]",
  "Business Development Manager [BDM]",
  "Business Development Manager [BDM]",
];

const CollegeAboutRight = (props) => {
  // const [dataValue, setDataValue] = useState();
  const { dataValue, setDataValue } = props;

  return (
    <>
      <div className="admin_home_tabs_row top_padding_none big_screen_none">
        <Row>
          <Col lg={12} className="p-0">
            <ScrollingCarousel show={5.5} slide={4} swiping={true}>
              <ul className="nav ">
                {AboutBars &&
                  AboutBars?.map((steps, stepsIndex) => (
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
        {props.dataValue === 0 && <h3>INTRODUCTION</h3>}
        {props.dataValue === 1 && <h3>hIGHLIGHTS</h3>}
        {props.dataValue === 2 && <h3>Ranking & Awards</h3>}
        {props.dataValue === 3 && <h3>COURSES</h3>}
        {props.dataValue === 4 && <h3>SCHOLARSHIP PLACEMENTS</h3>}
        {props.dataValue === 5 && <h3>FACILITIES</h3>}
      </div>
    </>
  );
};

export default CollegeAboutRight;
