// import DOMPurify from 'dompurify'
import React, { useState } from "react";
import { useSelector } from "react-redux";
import DOMPurify from "isomorphic-dompurify";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import { Col, Row } from "react-bootstrap";

const AboutBars = [
  "DEFINITION",
  "EXAM HIGHLIGHTS",
  "IMPORTANT DATES",
  "EXAM PATTERN",
  "EXAM SYLLABUS",
  "IMPORTANT EXAM BOOKS",
  "EXAM HELPLINE",
  "EXAM PREVIOUS YEAR CUTOFF",
  "PREVIOUS YEAR PAPERS",
];

const ExamAboutRight = (props) => {
  const { dataValue, setDataValue } = props;
  const data = useSelector((data) => data?.exambyid?.exam?.data?.data?.rows[0]);

  //console.log(props?.data?.ExamAbout[0]?.examAboutHighlights, "ssssssssss");
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
      {props?.dataValue === 0 && (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                props?.data?.ExamAbout[0]?.examAboutDefination
              ),
            }}
          />
        </>
      )}

      {props.dataValue === 1 && (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                props?.data?.ExamAbout[0]?.examAboutHighlights
              ),
            }}
          />
        </>
      )}
      {props.dataValue === 2 && (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(data?.ExamAbout[0]?.examAboutHelpLine),
            }}
          />
        </>
      )}
      {props.dataValue === 3 && (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                data?.ExamAbout[0]?.examAboutHighlights
              ),
            }}
          />
        </>
      )}
      {props.dataValue === 4 && (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                data?.ExamAbout[0]?.examAboutImportantBooks
              ),
            }}
          />
        </>
      )}
      {props.dataValue === 5 && (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                data?.ExamAbout[0]?.examAboutImportantDates
              ),
            }}
          />
        </>
      )}
      {props.dataValue === 6 && (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(data?.ExamAbout[0]?.examAboutPattern),
            }}
          />
        </>
      )}
      {props.dataValue === 7 && (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                data?.ExamAbout[0]?.examAboutPreviousPapers
              ),
            }}
          />
        </>
      )}
      {props.dataValue === 8 && (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(data?.ExamAbout[0]?.examAboutSyllabus),
            }}
          />
        </>
      )}
    </>
  );
};

export default ExamAboutRight;
