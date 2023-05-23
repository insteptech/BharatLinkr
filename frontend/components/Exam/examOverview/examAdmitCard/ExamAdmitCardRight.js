import React from "react";
import { useSelector } from "react-redux";
import DOMPurify from "isomorphic-dompurify";
import { Col, Row } from "react-bootstrap";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";

const AdmitCardBars = [
  "correction",
  "examAdmitCardHighlights",
  "forgotLoginDetails",
  "howToDownload",
  "releaseDate",
  "createdAt",
  "updatedAt",
];

const ExamAdmitCardRight = (props) => {
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
                {AdmitCardBars &&
                  AdmitCardBars?.map((steps, stepsIndex) => (
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
              __html: DOMPurify.sanitize(props?.data?.AdmitCard[0]?.correction),
            }}
          />
        </>
      )}

      {props.dataValue === 1 && (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                props?.data?.AdmitCard[0]?.examAdmitCardHighlights
              ),
            }}
          />
        </>
      )}
      {props.dataValue === 2 && (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                props?.data?.AdmitCard[0]?.forgotLoginDetails
              ),
            }}
          />
        </>
      )}
      {props.dataValue === 3 && (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                props?.data?.AdmitCard[0]?.howToDownload
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
                props?.data?.AdmitCard[0]?.releaseDate
              ),
            }}
          />
        </>
      )}

      {props.dataValue === 5 && (
        <>
          <div>Created at:{props?.data?.AdmitCard[0]?.createdAt}</div>
        </>
      )}
      {props.dataValue === 6 && (
        <>
          <div>Updated at:{props?.data?.AdmitCard[0]?.updatedAt}</div>
        </>
      )}
    </>
  );
};

export default ExamAdmitCardRight;
