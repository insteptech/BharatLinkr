import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";

const EducationBars = ["General", "COURSES & FEES", "SCHOLARSHIPS", "PLACEMENTS"];

const faqData = [
  {
    id: 1,
    question: "What is eligibility criteria for scholarship?",
    answer:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, seddiam nonumy eirmod tempor invidunt ut labore et dolore magnaaliquyam erat, sed diam voluptua. At vero eos et accusam etjusto duo dolores et ea rebum. Stet clita kasd gubergren, no",
  },
  {
    id: 2,
    question: "What is eligibility ?",
    answer:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, erat, sed diam voluptua. At vero eos et accusam etjusto duo dolores et ea rebum. Stet clita kasd gubergren, no",
  },
];

const DistanceeducationRight = (props) => {
  const { dataValue, setDataValue } = props;

  const [show, toggleShow] = useState(false);
  const handleShow = () => {
    toggleShow(true);
  };
  const handleHide = () => {
    toggleShow(false);
  };


  return (
    <>
 <div className="admin_home_tabs_row top_padding_none big_screen_none">
        <Row>
          <Col lg={12} className="p-0">
            <ScrollingCarousel show={5.5} slide={4} swiping={true}>
              <ul className="nav ">
                {EducationBars &&
                  EducationBars?.map((steps, stepsIndex) => (
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
            <h4 className="heading_20 mobile_font_18">General</h4>
            {faqData &&
              faqData?.map((item) => {
                return (
                  <>
                    <div>
                      <div
                      key={item.id}
                        className="plus_minus_acc_row mb-1"
                        onClick={handleShow}
                      >
                        <img
                          className="plus_minus_icon"
                          src="/images/plus-border.svg"
                        />
                        <h6 className="plus_minus_acc_h6 mobile_font_14">
                         {item.question}
                        </h6>
                      </div>
                      {show && (
                        <div className="open">
                          <div
                            className="plus_minus_acc_row"
                            onClick={handleHide}
                          >
                            <img
                              className="plus_minus_icon"
                              src="/images/minus-border.svg"
                            />
                            <h6 className="plus_minus_acc_h6 blue_color mobile_font_14">
                              {item.question}
                            </h6>
                          </div>
                          <p className="plus_minus_acc_h6 font_400 ps-4 mobile_font_14">
                           {item.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  </>
                );
              })}
          </>
        )}
        {props.dataValue === 1 && <h3>Courses & fees</h3>}
        {props.dataValue === 2 && <h3>SCHOLARSHIP</h3>}
        {props.dataValue === 3 && <h3>PLACEMENTS</h3>}
        {/* {props.dataValue === 4 && <h3>SCHOLARSHIP PLACEMENTS</h3>} */}
        {/* {props.dataValue === 5 && <h3>FACILITIES</h3>} */}
      </div>
    </>
  );
};

export default DistanceeducationRight;
