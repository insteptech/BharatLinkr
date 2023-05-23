import React from "react";
import BusinessDevPage from "./businessDevPage";
import { Col, Row } from "react-bootstrap";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";

const jobsDetail = [
  "Business Development Manager [BDM]",
  "Business Development Manager [BDM]",
  "Business Development Manager [BDM]",
  "Business Development Manager [BDM]",
  "Business Development Manager [BDM]",
];

function JobsRight(props) {
  const { dataValue, setDataValue } = props;
  return (
    <>
      <div className="big_screen_none">
      <div className="profile_search_bar_col mb-2">
        <div className="search_profile_search_bar">
          <input
            type="text"
            placeholder="Search Job Role..."
            name=""
            className="form-control chat_box_weite_bar"
          />
          <img src="/images/search-icon.svg" />
        </div>
      </div>
      </div>
      <div className="admin_home_tabs_row top_padding_none big_screen_none">
        <Row>
          <Col lg={12} className="p-0">
            <ScrollingCarousel show={5.5} slide={4} swiping={true}>
              <ul className="nav ">
                {jobsDetail &&
                  jobsDetail?.map((steps, stepsIndex) => (
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
        {props.dataValue === 0 && <BusinessDevPage />}
        {props.dataValue === 1 && <h3>hIGHLIGHTS1</h3>}
        {props.dataValue === 2 && <h3>Ranking & Awards1</h3>}
        {props.dataValue === 3 && <h3>COURSES1</h3>}
        {props.dataValue === 4 && <h3>SCHOLARSHIP PLACEMENTS1</h3>}
        {props.dataValue === 5 && <h3>FACILITIES1</h3>}
      </div>
    </>
  );
}

export default JobsRight;
