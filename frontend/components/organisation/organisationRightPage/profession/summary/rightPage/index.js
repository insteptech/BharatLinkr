import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import React from "react";
import { Accordion, Col, Form, Row } from "react-bootstrap";
import DOMPurify from "dompurify";


const summaryTabs = [
  "At a Glance",
  "Types",
  "Tasks",
  "Education",
  "tExperience",
  "Knowledge",
  "Technical Skills",
  "Job Prospects",
  "Future Prospects",
];

const summaryData = [
  {
    id: 1,
    headings: "Cartographers and Photogrammetrists",
    code: "17.1021.00",
    category:
      "Data capture Specialist, Data Entery Clerk, Data Entery Operator, Data Transcriber",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut rhoncus neque felis, non pulvinar nisi rhoncus efficitur. Nam venenatis non Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut rhoncus neque felis, non pulvinar nisi rhoncus efficitur. Nam venenatis non",
  },
];

const accoData = [
  {
    title: "Lift Truck operator, other",
    item1: "hello",
    item2: "wertyu",
    item3: "jhgfds",
    item4: "vcdertyhj",
    item5: "qwertyuioplokjhgv",
    eventKey: "0",
  },
  {
    title: "Lift Truck operator, other",
    item1: "hello",
    item2: "wertyu",
    item3: "jhgfds",
    item4: "vcdertyhj",
    item5: "qwertyuioplokjhgv",
    eventKey: "1",
  },
  {
    title: "Lift Truck operator, other",
    item1: "hello",
    item2: "wertyu",
    item3: "jhgfds",
    item4: "vcdertyhj",
    item5: "qwertyuioplokjhgv",
    eventKey: "2",
  },
  {
    title: "Lift Truck operator, other",
    item1: "hello",
    item2: "wertyu",
    item3: "jhgfds",
    item4: "vcdertyhj",
    item5: "qwertyuioplokjhgv",
    eventKey: "3",
  },
];

const SummaryRight = ({ professionDetails, dataValue, professiontypes }) => {

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {professionDetails && professionDetails?.length > 0 &&
        (
          <>
            {/* <div className="admin_home_tabs_row top_padding_none big_screen_none">
        <Row>
          <Col lg={12} className="p-0">
            <ScrollingCarousel show={5.5} slide={4} swiping={true}>
              <ul className="nav ">
                {summaryTabs &&
                  summaryTabs?.map((steps, stepsIndex) => (
                    <li className="nav-item " key={stepsIndex}>
                      <a
                        className={`nav-link admin_tabs_name ${dataValue === stepsIndex && "head-active"
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
      </div> */}
            <div className="">
              {dataValue === 0 && (
                <>
                  <div>
                    <h2 className="intro_heading mb-0">
                      {professionDetails[0]?.ProfessionCode ? professionDetails[0]?.ProfessionCode?.professionName : professionDetails[0]?.FamilyCode?.familyName}
                    </h2>
                    <h6 className="mb-3 blue_font">{professionDetails[0]?.ProfessionCode ? `${professionDetails[0]?.ProfessionCode?.FamilyCode?.familyCode}.${professionDetails[0]?.ProfessionCode?.professionCode}` : `${professionDetails[0]?.FamilyCode?.familyCode}.0000`}</h6>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(professionDetails[0]?.CMS[0]?.glance),
                      }}
                    />
                    <h6>
                      Also Called:{" "}
                      <span className="review_card_text_paira">
                        {professionDetails[0]?.alsoCalled}
                      </span>
                    </h6>
                  </div>
                </>
              )}
              {dataValue === 1 && !professionDetails[0]?.ProfessionCode && (
                <>
                  <div>
                    <h2 className="intro_heading mb-3">
                      Types of {professionDetails[0]?.FamilyCode?.familyName}
                    </h2>
                    <Form.Select aria-label="Default select example" className="mb-3">
                      <option>Status</option>
                      <option value="1">Active</option>
                      <option value="2">Expired</option>
                    </Form.Select>
                    <Accordion defaultActiveKey="0">
                      {professiontypes?.rows?.length > 0 &&
                        professiontypes?.rows?.map((item, index) => (
                          <>
                            {item?.ProfessionCode &&
                              <Accordion.Item key={index} eventKey={index}>
                                <Accordion.Header className="">
                                  <h6 className="m-0">
                                    <img
                                      className="me-2 mb-1"
                                      width={14}
                                      src="/images/plus-circle.svg"
                                    />
                                    {item?.ProfessionCode?.professionName}
                                  </h6>
                                </Accordion.Header>
                                <Accordion.Body className="py-0">
                                  info
                                </Accordion.Body>
                              </Accordion.Item>
                            }
                          </>
                        ))}
                    </Accordion>
                  </div>
                </>
              )}
              {dataValue === 2 && (
                <>
                  <div>
                    <h2 className="intro_heading mb-3">Tasks</h2>
                    <Form.Select aria-label="Default select example" className="mb-3">
                      <option>Status</option>
                      <option value="1">Active</option>
                      <option value="2">Expired</option>
                    </Form.Select>
                    <h6 className="d-flex">
                      {/* <div className="dark_blue_dot color_dot mt-1"></div> */}
                      <div
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(professionDetails[0]?.CMS[0]?.tasks),
                        }}
                      />
                    </h6>
                  </div>
                </>
              )}
              {dataValue === 3 && (
                <>
                  <div>
                    <h2 className="intro_heading mb-3">Education</h2>
                    <Form.Select aria-label="Default select example" className="mb-3">
                      <option>Status</option>
                      <option value="1">Active</option>
                      <option value="2">Expired</option>
                    </Form.Select>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(professionDetails[0]?.CMS[0]?.education),
                      }}
                    />
                    {/* <h6>
                      <img
                        className="me-2 mb-1"
                        width={14}
                        src="/images/plus-circle.svg"
                      />
                      Diploma
                    </h6>
                    <h6>
                      <img
                        className="me-2 mb-1"
                        width={14}
                        src="/images/plus-circle.svg"
                      />{" "}
                      Cirtifications
                    </h6>
                    <h6>
                      <img
                        className="me-2 mb-1"
                        width={14}
                        src="/images/plus-circle.svg"
                      />{" "}
                      Diploma
                    </h6>
                    <h6>
                      <img
                        className="me-2 mb-1"
                        width={14}
                        src="/images/plus-circle.svg"
                      />{" "}
                      Bachelor Degree
                    </h6>
                    <h6>
                      <img
                        className="me-2 mb-1"
                        width={14}
                        src="/images/plus-circle.svg"
                      />{" "}
                      Master Degree
                    </h6>
                    <h6 className="d-flex mt-3">
                      <div className="dark_blue_dot color_dot mt-1"></div>
                      Prepare Detailed reports on audit findings
                    </h6>
                    <h6 className="d-flex">
                      <div className="dark_blue_dot color_dot mt-1"></div>
                      Lift Truck operator, other
                    </h6> */}
                  </div>
                </>
              )}
              {dataValue === 4 && (
                <>
                  <h2 className="intro_heading mb-3">Experience</h2>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(professionDetails[0]?.CMS[0]?.experience),
                    }}
                  />
                </>
              )}
              {dataValue === 5 && (
                <>
                <h2 className="intro_heading mb-3">Knowledge</h2>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(professionDetails[0]?.CMS[0]?.knowledge),
                    }}
                  />
                </>
              )}
              {dataValue === 6 && (
                <>
                <h2 className="intro_heading mb-3">Technical Skills</h2>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(professionDetails[0]?.CMS[0]?.technicalSkills),
                    }}
                  />
                </>
              )}
              {dataValue === 7 && (
                <>
                <h2 className="intro_heading mb-3">Future Prospects</h2>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(professionDetails[0]?.CMS[0]?.futureProspects),
                    }}
                  />
                </>
              )}
              {dataValue === 8 && (
                <>
                <h2 className="intro_heading mb-3">Certificates</h2>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(professionDetails[0]?.CMS[0]?.certificates),
                    }}
                  />
                </>
              )}

            </div>
          </>
        )
      }
    </>
  )
};


export default SummaryRight;
