import React from "react";
import CourseFee from "./courseFee";
import { Col, Row } from "react-bootstrap";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";

const CourseBars = ["All", "Script", "Job", "Inernship"];

function CourseFeeRight(props) {
  const { dataValue, setDataValue } = props;
  return (
    <>
      <div className="acti_tab_search_row">
        <div className="big_screen_none mb-3 me-2">
          {/* <Row> */}
          {/* <Col lg={12} className="p-0"> */}
          <ScrollingCarousel show={5.5} slide={4} swiping={true}>
            <ul className="nav ">
              {CourseBars &&
                CourseBars?.map((steps, stepsIndex) => (
                  <li className="nav-item " key={stepsIndex}>
                    <a
                      className={`nav-link admin_tabs_name border_btn_tabs ${
                        dataValue === stepsIndex && "active_btn_tabs"
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
          {/* </Col> */}
          {/* </Row> */}
        </div>
        <div className=" big_screen_none ">
          <div className="active_search_bar">
            <input
              type="text"
              placeholder="Search by name..."
              name=""
              className="form-control chat_box_weite_bar hide_input"
            />
            <img className="s_icon" src="/images/blue-search.svg" />
          </div>
        </div>
      </div>
      <div className="">
        {props.dataValue === 0 && <CourseFee />}
        {props.dataValue === 1 && <h3>hIGHLIGHTS2--</h3>}
        {props.dataValue === 2 && <h3>Ranking & Awards2</h3>}
        {props.dataValue === 3 && <h3>COURSES2</h3>}
        {props.dataValue === 4 && <h3>SCHOLARSHIP PLACEMENTS2</h3>}
        {props.dataValue === 5 && <h3>FACILITIES2</h3>}
      </div>
    </>
  );
}

export default CourseFeeRight;
