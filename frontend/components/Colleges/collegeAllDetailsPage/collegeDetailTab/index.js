import React, { memo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Admission from "./admission";
import CollegeAbout from "./collegeAbout";
import CollegeAnnouncement from "./collegeAnnouncement";
import CollegeCourseFee from "./collegeCourseFee";
import DistanceEducation from "./distanceEducation";
import FAQ from "./FAQ";
import Placements from "./placements";
import Reviews from "./reviews";
import Scholorship from "./scholorship";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";

function CollegeDetailTabs(props) {
  const FormSteps = [
    "About",
    "Courses & Fees",
    "Activities",
    "Admission",
    "Reviews",
    "Distance Education",
    "Placements",
    "Scholarship",
    "FAQ",
  ];
  const [dataValue, setDataValue] = React.useState(0);

  return (
    <>
      <div>
        <Container>
          <Row>
            <Col lg={12} md={12} className="">
              <div className="blue_row_tabs px-3 mt-0">
                <ScrollingCarousel show={5.5} slide={4} swiping={true}>
                  <ul className="nav line_height">
                    {FormSteps &&
                      FormSteps?.map((steps, stepsIndex) => (
                        <>
                          <li className="nav-item " key={stepsIndex}>
                            <a
                              className={`nav-link admin_tabs_name blue_row_tabs ${
                                dataValue === stepsIndex &&
                                "head-active blue_tabs_active"
                              }`}
                              active={true}
                              onClick={() => setDataValue(stepsIndex)}
                            >
                              {steps}
                            </a>
                          </li>
                        </>
                      ))}
                  </ul>
                </ScrollingCarousel>
              </div>
            </Col>
            <Col>
              {props?.collegeDetails?.map((item, index) => (
                <>
                  {dataValue === 0 && (
                    <CollegeAbout collegeAbout={item?.CollegeAbout} />
                  )}
                  {dataValue === 1 && <CollegeCourseFee />}
                  {dataValue === 2 && <CollegeAnnouncement />}
                  {dataValue === 3 && (
                    <Admission collegeAdmission={item?.collegeAdmission} />
                  )}
                  {dataValue === 4 && <Reviews />}
                  {dataValue === 5 && <DistanceEducation />}
                  {dataValue === 6 && <Placements />}
                  {dataValue === 7 && <Scholorship />}
                  {dataValue === 8 && <FAQ />}
                </>
              ))}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default memo(CollegeDetailTabs);
