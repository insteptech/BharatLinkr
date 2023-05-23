import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import React from "react";
import { Accordion, Col, Form, Row } from "react-bootstrap";

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

const SummaryRight = (props) => {
  const { dataValue, setDataValue } = props;

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="admin_home_tabs_row top_padding_none big_screen_none">
        <Row>
          <Col lg={12} className="p-0">
            <ScrollingCarousel show={5.5} slide={4} swiping={true}>
              <ul className="nav ">
                {summaryTabs &&
                  summaryTabs?.map((steps, stepsIndex) => (
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
            {summaryData &&
              summaryData?.map((item) => {
                return (
                  <>
                    <div key={item.id}>
                      <h2 className="intro_heading mb-0">
                        Cartographers and Photogrammetrists
                      </h2>
                      <h6 className="mb-3 blue_font">{item.code}</h6>
                      <p>{item.content}</p>
                      <h6>
                        Also Called:{" "}
                        <span className="review_card_text_paira">
                          {item.category}
                        </span>
                      </h6>
                    </div>
                  </>
                );
              })}
          </>
        )}
        {props.dataValue === 1 && (
          <>
            <div>
              <h2 className="intro_heading mb-3">
                Types of Cartogarphers & Photogrammetrists
              </h2>
              <Form.Select aria-label="Default select example" className="mb-3">
                <option>Status</option>
                <option value="1">Active</option>
                <option value="2">Expired</option>
              </Form.Select>
              <Accordion defaultActiveKey="0">
                {accoData &&
                  accoData?.map((item, index) => (
                    <>
                      <Accordion.Item key={index} eventKey={item.eventKey}>
                        <Accordion.Header className="">
                          <h6 className="m-0">
                            <img
                              className="me-2 mb-1"
                              width={14}
                              src="/images/plus-circle.svg"
                            />
                            {item.title}
                          </h6>
                        </Accordion.Header>
                        <Accordion.Body className="py-0">
                          <p>{item.item1}</p>
                          <p>{item.item2}</p>
                          <p>{item.item3}</p>
                          <p>{item.item4}</p>
                          <p>{item.item5}</p>
                        </Accordion.Body>
                      </Accordion.Item>
                    </>
                  ))}
              </Accordion>
            </div>
          </>
        )}
        {props.dataValue === 2 && (
          <>
            <div>
              <h2 className="intro_heading mb-3">Tasks</h2>
              <Form.Select aria-label="Default select example" className="mb-3">
                <option>Status</option>
                <option value="1">Active</option>
                <option value="2">Expired</option>
              </Form.Select>
              <h6 className="d-flex">
                <div className="dark_blue_dot color_dot mt-1"></div>
                Prepare Detailed reports on audit findings
              </h6>
              <h6 className="d-flex">
                <div className="dark_blue_dot color_dot mt-1"></div>
                Lift Truck operator, other
              </h6>
            </div>
          </>
        )}
        {props.dataValue === 3 && (
          <>
            <div>
              <h2 className="intro_heading mb-3">Education</h2>
              <Form.Select aria-label="Default select example" className="mb-3">
                <option>Status</option>
                <option value="1">Active</option>
                <option value="2">Expired</option>
              </Form.Select>
              <h6>
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
              </h6>
            </div>
          </>
        )}
        {props.dataValue === 4 && <h3>SCHOLARSHIP PLACEMENTS1</h3>}
        {props.dataValue === 5 && "kjfjdh"}
      </div>
    </>
  );
};

export default SummaryRight;
