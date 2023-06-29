import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import DOMPurify from "dompurify";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";

const AboutBars = [
  "INTRODUCTION",
  "hIGHLIGHTS",
  "RANKING & AWARDS",
  "COURSES",
  "SCHOLARSHIP PLACEMENTS",
  "fACILITIES",
];

const CollegeAboutRight = (props) => {
  const { dataValue, setDataValue } = props;

  return (
    <div className="search_right_page_bg ">
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
      {props.collegeAbout.map((item, index) => {
        console.log(item);
        return (
          <div className="" key={index}>
            {props.dataValue === 0 && (
              <>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(item?.aboutIntro),
                  }}
                />
              </>
            )}
            {props.dataValue === 1 && (
              <>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(item?.aboutHighLights),
                  }}
                />
              </>
            )}
            {props.dataValue === 2 && (
              <>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(item?.aboutRankingAndAwards),
                  }}
                />
              </>
            )}
            {props.dataValue === 3 && (
              <>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(item?.aboutCourses),
                  }}
                />
              </>
            )}
            {props.dataValue === 4 && (
              <>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      item?.aboutScholarShipPlacements
                    ),
                  }}
                />
              </>
            )}
            {props.dataValue === 5 && (
              <>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(item?.aboutFacilities),
                  }}
                />
              </>
            )}
          </div>
        );
      })}
    </div>    
  );
};

export default CollegeAboutRight;
