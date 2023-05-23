import React from "react";
import General from "./general";
import CoursesAndFees from "./coursesAndFees";
import Scholarship from "./scholarship";
import Placement from "./placement";
import { Col, Row } from "react-bootstrap";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";

const FaqBars = ["GENERAL", "COURSES & FEES", "SCHOLARSHIPS", "PLACEMENTS"];

const FaqRight = (props) => {
  const { dataValue, setDataValue } = props;
  
  return (
    <>
    <div className="admin_home_tabs_row top_padding_none big_screen_none">
        <Row>
          <Col lg={12} className="p-0">
            <ScrollingCarousel show={5.5} slide={4} swiping={true}>
              <ul className="nav ">
                {FaqBars &&
                  FaqBars?.map((steps, stepsIndex) => (
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
        {props.dataValue === 0 && <General />}
        {props.dataValue === 1 && <CoursesAndFees />}
        {props.dataValue === 2 && <Scholarship />}
        {props.dataValue === 3 && <Placement />}
      </div>
    </>
  );
};

export default FaqRight;
