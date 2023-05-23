import React from "react";
import { Accordion, Form } from "react-bootstrap";

const quickLinksData = [
  {
    quickTitle: "B.Tech",
    eventKey: "0",
    college: "B.Tech top colleges",
    exams: "b.Tech exams",
    collegeIcon: "/images/grey-college.png",
    examsIcon: "/images/grey-exams.png",
  },
  {
    quickTitle: "MBBS",
    eventKey: "1",
    college: "B.Tech top colleges",
    exams: "b.Tech exams",
    collegeIcon: "/images/grey-college.png",
    examsIcon: "/images/grey-exams.png",
  },
  {
    quickTitle: "MBA",
    eventKey: "2",
    college: "B.Tech top colleges",
    exams: "b.Tech exams",
    collegeIcon: "/images/grey-college.png",
    examsIcon: "/images/grey-exams.png",
  },
  {
    quickTitle: "Design",
    eventKey: "3",
    college: "B.Tech top colleges",
    exams: "b.Tech exams",
    collegeIcon: "/images/grey-college.png",
    examsIcon: "/images/grey-exams.png",
  },
  {
    quickTitle: "LAW",
    eventKey: "4",
    college: "B.Tech top colleges",
    exams: "b.Tech exams",
    collegeIcon: "/images/grey-college.png",
    examsIcon: "/images/grey-exams.png",
  },
  {
    quickTitle: "SCIENCE",
    eventKey: "5",
    college: "B.Tech top colleges",
    exams: "b.Tech exams",
    collegeIcon: "/images/grey-college.png",
    examsIcon: "/images/grey-exams.png",
  },
];

const QuickLinks = () => {
  return (
    <>
      <div className="card_sec hide_box">
        <div className="card_top">
          <h1>
            <img src="/images/link-svg.png" />
            QUICK LINKS
          </h1>
        </div>
        <div className="quick_link_acc_div card_mid">
          <Accordion defaultActiveKey="0">
            {quickLinksData &&
              quickLinksData?.map((item, index) => (
                <>
                  <Accordion.Item key={index} eventKey={item.eventKey}>
                    <Accordion.Header>
                      <span className="big_dot">.</span>
                      <span className="accordion_header_name">
                        {item.quickTitle}
                      </span>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="accordion_icon_name_div">
                        <img
                          className="accordion_icon"
                          src={item.collegeIcon}
                        />
                        <span className="accordion_body_name">
                          {item.college}
                        </span>
                      </div>
                      <div className="accordion_icon_name_div">
                        <img className="accordion_icon" src={item.examsIcon} />
                        <span className="accordion_body_name">
                          {item.exams}
                        </span>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </>
              ))}
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default QuickLinks;
