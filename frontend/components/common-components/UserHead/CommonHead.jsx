import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Offcanvas,
  OverlayTrigger,
  Row,
  Tooltip,
  Form,
  NavItem,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  isUserLogined,
  getTokenDecode,
  logout,
  LikedContent,
  setCookies,
} from "../../utils";
import CounslingForm from "../../Forms/counslingForm";
import CommonModal from "../../Forms/commonModal";
import SubmitForm from "../../Forms/submitResume";
import ClientForm from "../../Forms/clientForm";
import AdmisstionForm from "../../Forms/admisstionForm";
import MobileMenus from "../../homeLayout/centerPages/mobileMenus";
import { getUserDetails, login } from "../../../redux/actions/auth";
import { apibasePath } from "../../../config";
import {
  getContentUserLiked,
  getUserDetailsById,
  isLoggedIn,
} from "../../../redux/actions/user/userActions";
import {
  setActiveNav,
  setLoginStatus,
} from "../../../redux/reducers/User/userSlice";
import Image from "next/image";

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
  const navMenu = require("./UserHeadData.json");
  const router = useRouter();
  const dispatch = useDispatch();
  const { pathname } = router;

  const [modalShow, setModalShow] = useState();
  const [slectedValue, setSlectedValue] = useState(null);
  const [mobileScreen, setMobileScreen] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleMobileClose = () => setMobileScreen(false);
  const handleMobileShow = () => setMobileScreen(true);

  const currentUserDetails = useSelector((item) => item?.userSlice.currentUser);
  const loginStatus = useSelector((state) => state.userSlice.loginStatus);
  const activeNavItem = useSelector((state) => state.userSlice.activeNavItem);

  useEffect(() => {
    if (isUserLogined()) {
      let userId = getTokenDecode().userId;
      dispatch(getUserDetailsById(userId));
      dispatch(setLoginStatus(true));
    }
  }, []);

  useEffect(() => {
    checkRoute();
    if (isUserLogined()) {
      let userId = getTokenDecode().userId;
      if (pathname && LikedContent[pathname.split("/")[1]]) {
        const userLikeBody = {
          userId: userId,
          categoryTypes: LikedContent[pathname.split("/")[1]],
        };
        dispatch(getContentUserLiked(userLikeBody));
      }
    }
  }, [router.pathname]);

  function checkRoute() {
    navMenu.forEach((NavItem) => {
      NavItem.other.map((ele) => {
        if (pathname.includes(ele)) {
          dispatch(setActiveNav(NavItem.name));
        }
      });
    });
  }
  const handleActive = (id, path) => {
    router.push(`${path}`);
  };

  const handleLogout = () => {
    localStorage.clear();
    setCookies(-1);
    toast.success("Successfully Logged Out");
    router.push("/login");
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
  };

  const HandleHome = () => {
    router.push("/");
  };
  return (
    <>
      <div className="user_header_bg mobile_header_padding">
        <Container>
          <div className="user_header">
            <Image
              width={140}
              height={40}
              className="hcceco_logo"
              src="/images/bharat-logo.svg"
              onClick={HandleHome}
            />
            <div className="user_header_btn_div">
              {navMenu?.map((items, index) => (
                <div
                  key={`header${index}`}
                  onClick={() => handleActive(index, items.path)}
                  className={
                    activeNavItem === items.name
                      ? "user_header_btn user_header_active"
                      : "user_header_btn"
                  }
                >
                  <img
                    className="user_header_btn_icon"
                    src={
                      activeNavItem === items.name ? items.bluelogo : items.logo
                    }
                  />
                  <h6
                    className={
                      activeNavItem === items.name
                        ? "user_header_btn_name blue_font"
                        : "user_header_btn_name"
                    }
                  >
                    {items.name}
                  </h6>
                </div>
              ))}
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

              {loginStatus && (
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

              {!loginStatus && (
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

              {loginStatus && (
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
                        currentUserDetails?.profilePhoto
                          ? `${apibasePath}documents/userProfile/${currentUserDetails?.profilePhoto}`
                          : "/images/dammy.svg"
                      }
                      alt="profile pic"
                    />
                  </OverlayTrigger>
                  <DropdownButton
                    className="user_header_pro_dropdown"
                    id="dropdown-basic-button"
                    title={currentUserDetails?.name}
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
                    <Image width={110} height={20} src="/images/bharat-logo.svg"/>
                  </Offcanvas.Title>
                  <button
                    className="chat_box_close_btn"
                    onClick={handleMobileClose}
                  >
                    <img src="/images/cross-icon.svg" />
                  </button>
                </Offcanvas.Header>
                <Offcanvas.Body className="ui_left_menu_body">
                  <div>
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
                  </div>
                  {!loginStatus ? (
                    <Button
                      onClick={() => router.push("/login")}
                      className="border_btn w-100  user_header_login_btn mobile_login_btn"
                    >
                      Log In
                    </Button>
                  ) : null}
                  {loginStatus ? (
                    <div className="user_header_profile_set">
                      <OverlayTrigger
                        placement="bottom"
                        overlay={<Tooltip>Edit Profile</Tooltip>}
                      >
                        <Image
                          width={25}
                          height={25}
                          onClick={() => router.push("/editprofile")}
                          className="header_profile  ms-0"
                          // src="/images/profile1.png"
                          src={
                            currentUserDetails?.profilePhoto
                              ? `${apibasePath}documents/userProfile/${currentUserDetails?.profilePhoto}`
                              : "/images/dammy.svg"
                          }
                          alt="profile pic"
                        />
                      </OverlayTrigger>
                      <DropdownButton
                        className="user_header_pro_dropdown"
                        id="dropdown-basic-button"
                        title={currentUserDetails?.name}
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
