import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
// import CommonModal from "../../Forms/commonModal";
import {
  Button,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
  OverlayTrigger,
  Row,
  Tooltip,
  Form,
  Modal,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getToken, getTokenDecode, isUserLogined, logout } from "../../utils";
import CounslingForm from "../../Forms/counslingForm";
import CommonModal from "../../Forms/commonModal";
import SubmitForm from "../../Forms/submitResume";
import ClientForm from "../../Forms/clientForm";
import AdmisstionForm from "../../Forms/admisstionForm";
import MobileMenus from "../../homeLayout/centerPages/mobileMenus";
import Image from "next/image";
import { getUserDetails, login } from "../../../redux/actions/auth";
import { apibasePath } from "../../../config";

const notificationData = [
  {
    id: 1,
    title: "Argha Paul liked your post",
    date: "19 Sep 22",
  },
  {
    id: 2,
    title: "Argha Paul reposted Noor's post",
    date: "19 Sep 22",
  },
  {
    id: 3,
    title: "Argha paul liked your opinion",
    // date: "19 Sep 22",
  },
  {
    id: 4,
    title: "Argha Paul posted an event",
    date: "19 Sep 22",
  },
  {
    id: 5,
    title: "Argha Paul added an opinion on your post",
    date: "19 Sep 22",
  },
  {
    id: 6,
    title: "Argha paul liked a college",
    date: "19 Sep 22",
  },
  {
    id: 7,
    title: "A.G College Of Technology posted an Announcement",
    date: "19 Sep 22",
  },
];

export default function CommonHead() {
  const dummyData = require("./UserHeadData.json");
  const [activeIndex, setActiveIndex] = useState("");
  const [modalShow, setModalShow] = useState();
  const [slectedValue, setSlectedValue] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const router = useRouter();

  // notification---------------------------start----------------

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // notification---------------------------end------------------
  // mobile-sidbar---------------------------start------------------
  const [mobileScreen, setMobileScreen] = useState(false);

  const handleMobileClose = () => setMobileScreen(false);
  const handleMobileShow = () => setMobileScreen(true);
  // mobile-sidbar---------------------------end------------------
  const dispatch = useDispatch();

  const getuserDetails = () => {
    let { userId } = getTokenDecode();
    if (userId) {
      dispatch(getUserDetails(Number(userId)));
    }
  };

  const [isToken, setIstoken] = useState(null);

  useEffect(() => {
    const storedActiveIndex = localStorage.getItem("activeIndex");
    let tokkn = localStorage.getItem("token");
    setIstoken(tokkn ? true : false);
    if (storedActiveIndex !== null) {
      setActiveIndex(parseInt(storedActiveIndex));
    }
    getuserDetails();
  }, []);
  const handleActive = (id, path) => {
    localStorage.setItem("activeIndex", id.toString());
    setActiveIndex(id);
    router.push(`${path}`);
  };
  // let isLogedIn = isUserLogined();

  // console.log(tokkn, 'eeeeeeeeeeeeeeeeeeeeeeeeeee')
  // let isLogedIn = tokkn ? true : false

  const data = useSelector((item) => item?.loginUser?.userDetails);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
    toast.success("Log out done");
  };

  const getComponnet = () => {
    if (slectedValue == 1) {
      return <CounslingForm />;
    }
    if (slectedValue == 2) {
      return <SubmitForm />;
    }
    if (slectedValue == 3) {
      return <ClientForm />;
    }
    if (slectedValue == 4) {
      return <AdmisstionForm />;
    }
  };

  const handleShowModal = () => {
    setModalShow(true);
    // setShowScreen(data);
  };

  const handleHide = () => {
    setModalShow(false);
  };

  const HandleHome = () => {
    router.push("/");
  };

  return (
    <>
      <div className="user_header_bg mobile_header_padding">
        <Container>
          <div className="user_header">
            <img
              className="hcceco_logo"
              src="/images/bharat-logo.svg"
              onClick={HandleHome}
            />
            <div className="user_header_btn_div">
              {dummyData?.map((items, index) => {
                return (
                  <div
                    key={`header${index}`}
                    onClick={() => handleActive(index, items.path)}
                    className={
                      // router.pathname.includes(items.path)
                      activeIndex == index
                        ? "user_header_btn user_header_active"
                        : "user_header_btn"
                    }
                  >
                    <img
                      className="user_header_btn_icon"
                      src={activeIndex == index ? items.bluelogo : items.logo}
                    />
                    <h6
                      className={
                        activeIndex == index
                          ? "user_header_btn_name blue_font"
                          : "user_header_btn_name"
                      }
                    >
                      {items.name}
                    </h6>
                  </div>
                );
              })}
            </div>

            <div className="user_header_right_col">
              <div>
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip>Search Pages</Tooltip>}
                >
                  <img
                    onClick={() => router.push("/searchpage")}
                    className="user_header_search_img"
                    src="/images/search-icon.svg"
                  />
                </OverlayTrigger>
              </div>

              <div className="blue_dot_position" onClick={handleShow}>
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip>Notifications</Tooltip>}
                >
                  <img
                    className="user_header_search_img"
                    src="/images/notification-1.svg"
                  />
                </OverlayTrigger>
                <img className="blue_dot" src="/images/blue-dot.svg" />
              </div>

              <div>
                <Offcanvas
                  className="notification_page"
                  show={show}
                  onHide={handleClose}
                  placement={"end"}
                >
                  <Offcanvas.Header>
                    <Offcanvas.Title className="notification_heading">
                      Notifications
                    </Offcanvas.Title>
                    <button
                      className="chat_box_close_btn"
                      onClick={handleClose}
                    >
                      <img src="/images/cross-icon.png" />
                    </button>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <div className="notification_data">
                      {notificationData &&
                        notificationData?.map((item, index) => {
                          return (
                            <ul key={index}>
                              <li>
                                <Row>
                                  <Col xs={9}>
                                    <p className="notification_data_headings">
                                      {item.title}
                                    </p>
                                  </Col>
                                  <Col xs={3}>
                                    <p className="notification_date">
                                      {item.date ? item.date : "_ _ _"}
                                    </p>
                                  </Col>
                                </Row>
                              </li>
                            </ul>
                          );
                        })}
                    </div>
                  </Offcanvas.Body>
                </Offcanvas>
              </div>

              {isToken && (
                <Form.Select
                  className="form_select"
                  placeholder="Forms"
                  aria-label="Default select example"
                  onChange={(e) => {
                    setSlectedValue(e.target.value);
                    setModalShow(true);
                  }}
                >
                  <option className="form_select_inner" value="">
                    Forms
                  </option>
                  <option className="form_select_inner" value="5">
                    Counsling Form
                  </option>
                  <option className="form_select_inner" value="2">
                    Submit Form
                  </option>
                  <option className="form_select_inner" value="3">
                    Client Form
                  </option>
                  <option className="form_select_inner" value="4">
                    Admisstion Form
                  </option>
                  <option className="form_select_inner" value="5">
                    Resume Submit
                  </option>
                </Form.Select>
              )}

              {!isToken && (
                <Button
                  onClick={() => router.push("/login")}
                  className="border_btn user_header_login_btn"
                >
                  Log In
                </Button>
              )}

              <CommonModal
                components={getComponnet()}
                show={modalShow}
                onHide={() => setModalShow(false)}
              />

              {isToken && (
                <div className="user_header_profile_set">
                  <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip>Edit Profile</Tooltip>}
                  >
                    <Image
                      width={25}
                      height={25}
                      onClick={() => router.push("/editprofile")}
                      className="header_profile mobile_admin_menu_profile"
                      // src="/images/profile1.png"
                      src={
                        data?.profilePhoto
                          ? `${apibasePath}documents/userProfile/${data?.profilePhoto}`
                          : "/images/dammy.svg"
                      }
                      alt="profile pic"
                    />
                  </OverlayTrigger>
                  <DropdownButton
                    className="user_header_pro_dropdown"
                    id="dropdown-basic-button"
                    title={data?.name}
                  >
                    <Dropdown.Item onClick={() => router.push("/editprofile")}>
                      Edit Profile
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleShowModal()}>
                      Help Center
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </DropdownButton>
                </div>
              )}
            </div>

            <div className="notification_btn_row">
              <div className=" header_search_hide">
                <div className="user_search_icon">
                  <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip>Search Pages</Tooltip>}
                  >
                    <img
                      onClick={() => router.push("/searchpage")}
                      className=""
                      src="/images/search-icon.svg"
                    />
                  </OverlayTrigger>
                </div>
                {/* ---------------------------------notification-start---------------------------- */}
                <div className="blue_dot_position" onClick={handleShow}>
                  <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip>Notifications</Tooltip>}
                  >
                    <img
                      className="user_header_search_img mb-2"
                      src="/images/notification-1.svg"
                    />
                  </OverlayTrigger>
                  <img className="blue_dot" src="/images/blue-dot.svg" />
                </div>
                <div>
                  <Offcanvas
                    className="notification_page"
                    show={show}
                    onHide={handleClose}
                    placement={"end"}
                  >
                    <Offcanvas.Header>
                      <Offcanvas.Title className="notification_heading">
                        Notifications
                      </Offcanvas.Title>
                      <button
                        className="chat_box_close_btn"
                        onClick={handleClose}
                      >
                        <img src="/images/cross-icon.svg" />
                      </button>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                      <div className="notification_data">
                        {notificationData &&
                          notificationData?.map((item, index) => {
                            return (
                              <ul key={index}>
                                <li>
                                  <Row>
                                    <Col xs={9}>
                                      <p className="notification_data_headings hover_link">
                                        {item.title}
                                      </p>
                                    </Col>
                                    <Col xs={3}>
                                      <p className="notification_date">
                                        {item.date ? item.date : "_ _ _"}
                                      </p>
                                    </Col>
                                  </Row>
                                </li>
                              </ul>
                            );
                          })}
                      </div>
                    </Offcanvas.Body>
                  </Offcanvas>
                </div>
                {/* -----------------------------------notification-end---------------------------- */}
              </div>
              <button
                className="mobile_toggle"
                variant="primary"
                onClick={handleMobileShow}
              >
                <img
                  className="mobile_toggle_icon"
                  src="/images/menu-bar.svg"
                />
              </button>
              <Offcanvas show={mobileScreen} onHide={handleMobileClose}>
                <Offcanvas.Header className="filter_leftmenu_head">
                  <Offcanvas.Title>
                    <img
                      className="hcceco_logo"
                      src="/images/hcceco-logo.png"
                    />
                  </Offcanvas.Title>
                  <button
                    className="chat_box_close_btn"
                    onClick={handleMobileClose}
                  >
                    <img src="/images/cross-icon.svg" />
                  </button>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <MobileMenus />
                  <div className="mobile_sidebar_select">
                    <Form.Select
                      className="form_select"
                      placeholder="Forms"
                      aria-label="Default select example"
                      onChange={(e) => {
                        setSlectedValue(e.target.value);
                        setModalShow(true);
                      }}
                    >
                      <option className="form_select_inner" value="">
                        Forms
                      </option>
                      <option className="form_select_inner" value="5">
                        Counsling Form
                      </option>
                      <option className="form_select_inner" value="2">
                        Submit Form
                      </option>
                      <option className="form_select_inner" value="3">
                        Client Form
                      </option>
                      <option className="form_select_inner" value="4">
                        Admisstion Form
                      </option>
                      <option className="form_select_inner" value="5">
                        Submit Resume
                      </option>
                    </Form.Select>
                  </div>
                  {!isToken ? (
                    <Button
                      onClick={() => router.push("/login")}
                      className="border_btn w-100  user_header_login_btn mobile_login_btn"
                    >
                      Log In
                    </Button>
                  ) : null}
                  {isToken ? (
                    <div className="user_header_profile_set">
                      <OverlayTrigger
                        placement="bottom"
                        overlay={<Tooltip>Edit Profile</Tooltip>}
                      >
                        <img
                          onClick={() => router.push("/editprofile")}
                          className="header_profile mobile_admin_menu_profile ms-2"
                          // src="/images/profile1.png"
                          // src={data?.user?.profilePhoto}
                          alt="profile pic"
                        />
                      </OverlayTrigger>
                      <DropdownButton
                        className="user_header_pro_dropdown"
                        id="dropdown-basic-button"
                        title={data?.name}
                      >
                        <Dropdown.Item
                          onClick={() => router.push("/editprofile")}
                        >
                          Edit Profile
                        </Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout}>
                          Logout
                        </Dropdown.Item>
                      </DropdownButton>
                    </div>
                  ) : null}
                </Offcanvas.Body>
              </Offcanvas>
            </div>
            {/* ======================mobile-sidebar-end======================== */}
          </div>
        </Container>
      </div>
    </>
  );
}
