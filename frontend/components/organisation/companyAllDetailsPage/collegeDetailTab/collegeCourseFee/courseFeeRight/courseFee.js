import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import React, { memo } from "react";
import { Container, Row, Col } from "react-bootstrap";

const CourseFeeRightBars = [
  "All",
  "Lateral",
  "Honours",
  "Part Time",
  "Full Time",
];

function CourseFee() {
  const [dataValue, setDataValue] = React.useState(0);

  return (
    <>
      <div className="admin_home_tabs_row top_padding_none">
      <Row>
          <Col lg={12} className="p-0">
            <ScrollingCarousel show={5.5} slide={4} swiping={true}>
              <ul className="nav ">
                {CourseFeeRightBars &&
                  CourseFeeRightBars?.map((steps, stepsIndex) => (
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
      <Row>
        <Col md={12}>
          {dataValue === 0 && "qqqqqqqqq"}
          {dataValue === 1 && "wwwwwwwww"}

          {dataValue === 2 && "eeeeeeeeeee"}
          {dataValue === 3 && "fffffffffff"}
          {dataValue === 4 && "sssssssss"}
          {dataValue === 5 && "tttttttttt"}
        </Col>
      </Row>
    </>
  );
}

export default memo(CourseFee);
