import { useRouter } from "next/router";
import React, { useState } from "react";
import { Accordion, Col, Image, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

const studyGoals = [
  {
    studyName: "Top colleges",
    icons: "/images/top_college.png",
    path: "/college",
  },
  {
    studyName: "Top Courses",
    icons: "/images/top_cour.png",
    path: "/courses",
  },
  {
    studyName: "Top Exams",
    icons: "/images/top_ex.png",
    path: "/exams",
  },
  {
    studyName: "write a review",
    icons: "/images/write_review.png",
    path: "/college",
  },
];
const learningLinksData = [
  {
    learningName: "Learn English",
    icon: "/images/learning.png",
  },
  {
    learningName: "Learn IELTS",
    icon: "/images/learning.png",
  },
  {
    learningName: "Learn Quants",
    icon: "/images/learning.png",
  },
  {
    learningName: "Learn Reasoning",
    icon: "/images/learning.png",
  },
  {
    learningName: "Learn Verbal Ability",
    icon: "/images/learning.png",
  },
  {
    learningName: "Soft Skills",
    icon: "/images/learning.png",
  },
  {
    learningName: "Interview Preparation",
    icon: "/images/learning.png",
  },
  {
    learningName: "Practice Test",
    icon: "/images/learning.png",
  },
  {
    learningName: "Question Bank",
    icon: "/images/learning.png",
  },
];
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
const announcementData = [
  {
    title: "Apple reality pro May launch..",
    Name: "Manpreet Kaur",
    date: "19 Sep 22",
  },
  {
    title: "Apple reality pro May launch..",
    Name: "Manpreet Kaur",
    date: "19 Sep 22",
  },
  {
    title: "Apple reality pro May launch..",
    Name: "Manpreet Kaur",
    date: "19 Sep 22",
  },
  {
    title: "Apple reality pro May launch..",
    Name: "Manpreet Kaur",
    date: "19 Sep 22",
  },
];
const hiringData = [
  {
    heading: "Apple reality pro May launch..",
    names: "Manpreet Kaur",
    dates: "19 Sep 22",
  },
  {
    heading: "Apple reality pro May launch..",
    names: "Manpreet Kaur",
    dates: "19 Sep 22",
  },
  {
    heading: "Apple reality pro May launch..",
    names: "Manpreet Kaur",
    dates: "19 Sep 22",
  },
  {
    heading: "Apple reality pro May launch..",
    names: "Manpreet Kaur",
    dates: "19 Sep 22",
  },
];
const SuggestedCardData = [
  {
    id: 1,
    cardImg: "/images/mdi_pro.png",
    cardName: "Bharat",
    text: "Student | Lyallpur college of Technology",
  },
  {
    id: 2,
    cardImg: "/images/mdi_pro.png",
    cardName: "India",
    text: "Student | Lyallpur college of Technology",
  },
];
const hccecoLinksData = [
  {
    id: 1,
    profileImg: "/images/profile_img.png",
    userName: "Raju",
    userStatus: "Raju is online",
    userDetail: "hellojhgjsf jkfgfjk jhdfkjs trte",
  },
  {
    id: 2,
    profileImg: "/images/profile_img.png",
    userName: "Sam",
    userStatus: "sam left 7 mins ago",
    userDetail: "hellojhgjsf ",
  },
  {
    id: 3,
    profileImg: "/images/profile_img.png",
    userName: "Amit",
    userStatus: "Amit is online",
    userDetail: "hellojhgjsf  jhdfkjs trte",
  },
  {
    id: 4,
    profileImg: "/images/profile_img.png",
    userName: "Sagar",
    userStatus: "Raju is online",
    userDetail: "hellojhgjsf jkfgfjk jhdfkjs trte",
  },
  {
    id: 5,
    profileImg: "/images/profile_img.png",
    userName: "Aman",
    userStatus: "sam left 7 mins ago",
    userDetail: "hellojhgjsf ",
  },
  {
    id: 6,
    profileImg: "/images/profile_img.png",
    userName: "Jonson",
    userStatus: "Amit is online",
    userDetail: "hellojhgjsf  jhdfkjs trte",
  },
  {
    id: 7,
    profileImg: "/images/profile_img.png",
    userName: "Devid",
    userStatus: "Raju is online",
    userDetail: "hellojhgjsf jkfgfjk jhdfkjs trte",
  },
  {
    id: 8,
    profileImg: "/images/profile_img.png",
    userName: "Rock",
    userStatus: "sam left 7 mins ago",
    userDetail: "hellojhgjsf ",
  },
  {
    id: 9,
    profileImg: "/images/profile_img.png",
    userName: "Bista",
    userStatus: "Amit is online",
    userDetail: "hellojhgjsf  jhdfkjs trte",
  },
];
const json = [
  {
    DisplayName: "Messages",
    key: "Messages",
    data: "",
    className: "",
  },
  {
    DisplayName: "Link Requests",
    key: "Link Requests",
    data: "",
    className: "",
  },
];

function MobileMenus() {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [show5, setShow5] = useState(false);
  const [show6, setShow6] = useState(false);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);

  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);

  const handleClose5 = () => setShow5(false);
  const handleShow5 = () => setShow5(true);

  const handleClose6 = () => setShow6(false);
  const handleShow6 = () => setShow6(true);

  // ---------------chat-box-start-------------------
  const [visible, setVisible] = useState(false);
  const [showScreen, setShowScreen] = useState();
  const [inputarr, setInputArr] = useState([]);
  const [message, setMessage] = useState({ name: "" });

  const openImage = (data) => {
    setVisible(true);
    setShowScreen(data);
  };

  const showMessage = (e) => {
    setMessage({
      ...message,
      [e.target.name]: e.target.value,
    });
    console.log("massege", message);
  };
  let { name } = message;
  const handleSubmit = () => {
    setInputArr([...inputarr, { name }]);
    console.log("clicked", message);
    console.log("clicked", inputarr);
    setMessage({ name: "" });
  };

  // ---------------chat-box-end-------------------

  const [active, setActive] = useState("City");
  const [dataValue, setDataValue] = React.useState(0);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(json[0]);

  const handleTab = (key, index) => {
    console.log(activeTab, "key");
    setActive(key);
    setActiveTab(json.find((ele) => ele.key === active));
    setDataValue(index);
  };

  return (
    <>
      <div className="">
        {/* -------------------study-goal---------------- */}
        <Button
          className="mobile_footer_btn"
          variant="primary"
          onClick={handleShow1}
        >
          <img className="leftmenu_icons" src="/images/s-goal.svg" />
          Study Goals
        </Button>

        <Offcanvas
          placement={"bottom"}
          show={show1}
          onHide={handleClose1}
          className="offcanvas_container"
        >
          <Offcanvas.Header className="card_top sidebar_popup_head px-3 py-2">
            <Offcanvas.Title>
              <h1 className="m-0">
                <img src="/images/study_goals.png" />
                study_goals
              </h1>
            </Offcanvas.Title>
            <button className="chat_box_close_btn" onClick={handleClose1}>
              <img src="/images/white-cross.svg" />
            </button>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="card_sec">
              <div className="card_mid sidebar_popup">
                {studyGoals &&
                  studyGoals?.map((item, index) => {
                    return (
                      <>
                        <ul key={index}>
                          <li>
                            <img src={item.icons} />
                            <span onClick={() => router.push(item.path)}>
                              {item.studyName}
                            </span>
                          </li>
                        </ul>
                      </>
                    );
                  })}
              </div>
            </div>
          </Offcanvas.Body>
        </Offcanvas>

        {/* -------------------learning links---------------- */}
        <Button
          className="mobile_footer_btn"
          variant="primary"
          onClick={handleShow2}
        >
          <img className="leftmenu_icons" src="/images/l-links.svg" />
          learning links
        </Button>

        <Offcanvas
          placement={"bottom"}
          show={show2}
          onHide={handleClose2}
          className="offcanvas_container"
        >
          <Offcanvas.Header className="card_top sidebar_popup_head px-3">
            <Offcanvas.Title>
              <h1 className="m-0">
                <img src="/images/learning_link.png" />
                learning links
              </h1>
            </Offcanvas.Title>
            <button className="chat_box_close_btn" onClick={handleClose2}>
              <img src="/images/white-cross.svg" />
            </button>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="card_sec ">
              <div className="card_mid sidebar_popup">
                {learningLinksData &&
                  learningLinksData?.map((item, index) => {
                    return (
                      <>
                        <ul key={index}>
                          <li>
                            <img src={item.icon} />
                            <span>{item.learningName}</span>
                          </li>
                        </ul>
                      </>
                    );
                  })}
              </div>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
        {/* -------------------------quick-links-------------------- */}
        <Button
          className="mobile_footer_btn"
          variant="primary"
          onClick={handleShow3}
        >
          <img className="leftmenu_icons" src="/images/q-links.svg" />
          QUICK LINKS
        </Button>

        <Offcanvas
          placement={"bottom"}
          show={show3}
          onHide={handleClose3}
          className="offcanvas_container"
        >
          <Offcanvas.Header className="card_top sidebar_popup_head px-3">
            <Offcanvas.Title>
              <h1 className="m-0">
                <img src="/images/link-svg.png" />
                QUICK LINKS
              </h1>
            </Offcanvas.Title>
            <button className="chat_box_close_btn" onClick={handleClose3}>
              <img src="/images/white-cross.svg" />
            </button>
          </Offcanvas.Header>
          <Offcanvas.Body className="p-0">
            <div className="card_sec">
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
                            <img
                              className="accordion_icon"
                              src={item.examsIcon}
                            />
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
          </Offcanvas.Body>
        </Offcanvas>
        {/* -------------------------announcement----------------------- */}
        <Button
          className="mobile_footer_btn"
          variant="primary"
          onClick={handleShow4}
        >
          <img className="leftmenu_icons" src="/images/ann-icon.svg" />
          LATEST ANCMT
        </Button>

        <Offcanvas
          placement={"bottom"}
          show={show4}
          onHide={handleClose4}
          className="offcanvas_container"
        >
          <Offcanvas.Header className="card_top sidebar_popup_head px-3">
            <Offcanvas.Title>
              <h1 className="m-0">
                <img src="/images/latest.png" />
                LATEST ANNOUNCEMENT
              </h1>
            </Offcanvas.Title>
            <button className="chat_box_close_btn" onClick={handleClose4}>
              <img src="/images/white-cross.svg" />
            </button>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="card_sec ">
              <div className="card_mid sidebar_popup">
                {announcementData &&
                  announcementData?.map((item, index) => {
                    return (
                      <>
                        <ul key={index}>
                          <li>
                            <span className="mobile_font_13">{item.title}</span>
                            <div className="flex_it">
                              <p>{item.Name}</p>
                              <p>{item.date}</p>
                            </div>
                          </li>
                        </ul>
                      </>
                    );
                  })}
                <a href="#">Show more..</a>
              </div>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
        {/* ---------------------hiriring-------------------------- */}
        <Button
          className="mobile_footer_btn"
          variant="primary"
          onClick={handleShow5}
        >
          <img className="leftmenu_icons" src="/images/blue-hiring.svg" />
          LATEST HIRING
        </Button>

        <Offcanvas
          placement={"bottom"}
          show={show5}
          onHide={handleClose5}
          className="offcanvas_container"
        >
          <Offcanvas.Header className="card_top sidebar_popup_head px-3">
            <Offcanvas.Title>
              <h1 className="m-0">
                <img src="/images/learning_link.png" />
                LATEST HIRING
              </h1>
            </Offcanvas.Title>
            <button className="chat_box_close_btn" onClick={handleClose5}>
              <img src="/images/white-cross.svg" />
            </button>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="card_sec mid ">
              <div className="card_mid sidebar_popup">
                {hiringData &&
                  hiringData?.map((item, index) => {
                    return (
                      <ul key={index}>
                        <li>
                          <span>{item.heading}</span>
                          <div className="flex_it">
                            <p>{item.names}</p>
                            <p>{item.dates}</p>
                          </div>
                        </li>
                      </ul>
                    );
                  })}
                <a href="#">Show more..</a>
              </div>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
        {/* ------------------------hcceco-links------------------------ */}
        <Button
          className="mobile_footer_btn"
          variant="primary"
          onClick={handleShow6}
        >
          <img className="leftmenu_icons" src="/images/hcceco-links.svg" />
          HCCECO LINKS
        </Button>

        <Offcanvas
          placement={"bottom"}
          show={show6}
          onHide={handleClose6}
          className="offcanvas_container"
        >
          <Offcanvas.Header>
            <Offcanvas.Title></Offcanvas.Title>
            <button className="chat_box_close_btn" onClick={handleClose6}>
              <img src="/images/cross-icon.svg" />
            </button>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <p>Hello Instep</p>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  );
}

export default MobileMenus;
