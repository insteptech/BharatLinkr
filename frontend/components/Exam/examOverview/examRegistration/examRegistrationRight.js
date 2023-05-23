import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const RegistrationBars = [
  "applicationDate",
  "examRegistrationHighlights",
  "applicationFees",
  "eligibility",
  "documentsRequired",
  "guide",
  "applicationFormCorrection",
  "createdAt",
  "updatedAt",
];

const ExamRegistrationRight = (props) => {
  const { dataValue, setDataValue } = props;
  const data = useSelector((data) => data?.exambyid?.exam?.data?.data?.rows[0]);
  console.log(props, "sdfsdfsdfsd");

  //console.log(props?.data?.ExamAbout[0]?.examAboutHighlights, "ssssssssss");
  return (
    <>
      <div className="admin_home_tabs_row top_padding_none big_screen_none">
        <Row>
          <Col lg={12} className="p-0">
            <ScrollingCarousel show={5.5} slide={4} swiping={true}>
              <ul className="nav ">
                {RegistrationBars &&
                  RegistrationBars?.map((steps, stepsIndex) => (
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
                props?.data?.Registration[0]?.applicationDate
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
                props?.data?.Registration[0]?.examRegistrationHighlights
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
                props?.data?.Registration[0]?.applicationFees
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
                props?.data?.Registration[0]?.eligibility
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
                props?.data?.Registration[0]?.documentsRequired
              ),
            }}
          />
        </>
      )}
      {props.dataValue === 5 && (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(props?.data?.Registration[0]?.guide),
            }}
          />
        </>
      )}
      {props.dataValue === 6 && (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                props?.data?.Registration[0]?.applicationFormCorrection
              ),
            }}
          />
        </>
      )}

      {props.dataValue === 7 && (
        <>
          <div>Created at:{props?.data?.Registration[0]?.createdAt}</div>
        </>
      )}
      {props.dataValue === 8 && (
        <>
          <div>Updated at:{props?.data?.Registration[0]?.updatedAt}</div>
        </>
      )}
    </>
  );
};

export default ExamRegistrationRight;
