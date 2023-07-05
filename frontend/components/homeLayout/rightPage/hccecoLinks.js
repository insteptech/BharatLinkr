import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Accordion, Button, Col, Image, Row } from "react-bootstrap";
import LoaderPage from "../../common-components/loader";
import { useDispatch, useSelector } from "react-redux";
import { friendRequestStatus, getPendingFriendRequest } from "../../../redux/actions/user/userActions";
import { toast } from "react-toastify";
import NoDataPage from "../../common-components/NoDataPage/NoDataPage";
import { getToken } from "../../utils";

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

const HccecoLinks = () => {
  const [active, setActive] = useState("City");
  const [dataValue, setDataValue] = React.useState(0);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(json[0]);
  const friendList = useSelector((state) => state?.userSlice.friendList);
  const loginStatus = useSelector((state) => state?.userSlice.loginStatus);
  const currentUser = useSelector((state) => state?.userSlice.currentUser);
  const freindCount = useSelector((state) => state?.userSlice.freindCount);
  const isFriendListLoading = useSelector(
    (state) => state?.userSlice.isFriendListLoading
  );

  const dispatch = useDispatch()

  const handleTab = (key, index) => {
    setActive(key);
    setActiveTab(json.find((ele) => ele.key === active));
    setDataValue(index);
  };

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
  };
  let { name } = message;
  const handleSubmit = () => {
    setInputArr([...inputarr, { name }]);
    setMessage({ name: "" });
  };

  useEffect(() => {
    if (!getToken() && router.pathname.includes("editprofile")) {
      router.push("/"); // redirect to the home page when user not logged in
    }
    if (loginStatus && currentUser)
      dispatch(getPendingFriendRequest({ recieverId: currentUser.id }));
  }, [dispatch, currentUser]);

  const handleRequestStatus = (userObject, status) => {
    let requestData = {
      FriendRequest: [
        {
          recieverId: userObject.recieverId,
          senderId: userObject.senderId,
          status: status,
        },
      ],
    };
    if (loginStatus)
      dispatch(friendRequestStatus(requestData)).then((res) => {
        if (res.payload[0]) {
          toast.success(res.payload[0].status);
          dispatch(getPendingFriendRequest({ recieverId: currentUser.id }));
        }
      });
  };


  return (
    <div>
      <div className="card_sec hide_box">
        <div className="card_top">
          <h1>
            <img src="/images/h_links.png" />
            HCCECO LINKS
          </h1>
        </div>
        <div className="card_mid chat_box_position">
          <section id="tabs" className="project-tab">
            <ul className="nav ">
              {json &&
                json?.map((steps, stepsIndex) => (
                  <li className="nav-item chatbox_tabs" key={stepsIndex}>
                    <h6
                      className={`nav-link user_tabs_name ${dataValue === stepsIndex && "user_tabs_active"
                        }`}
                      active={true}
                      onClick={() => handleTab(steps.key, stepsIndex)}
                    >
                      {steps.DisplayName}
                    </h6>
                  </li>
                ))}
            </ul>
            {dataValue === 0 && (
              <div className="tab-content" id="nav-tabContent">
                <div
                  className="tab-pane fade show active blue_bg"
                  id="nav-home"
                  role="tabpanel"
                  aria-labelledby="nav-home-tab"
                >
                  <div className="contacts_card">
                    <div className="card-header">
                      <div className="input-group">
                        <input
                          type="text"
                          placeholder="Search connections....."
                          name=""
                          className="form-control search"
                        />
                      </div>
                    </div>
                    <div className="card-body contacts_body">
                      {hccecoLinksData &&
                        hccecoLinksData?.map((item) => {
                          return (
                            <>
                              <ul className="contacts">
                                <li key={item.id} className="active blue_bg">
                                  <div className="d-flex bd-highlight">
                                    <div className="img_cont">
                                      <img src={item.profileImg} />
                                    </div>
                                    <div
                                      onClick={() => openImage(item)}
                                      className="user_info"
                                    >
                                      <span>{item.userName}</span>
                                      <p>{item.userStatus}</p>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </>
                          );
                        })}
                    </div>
                  </div>
                </div>
                {/* -------------------------------chat-box-start---------------------------------- */}
                {visible && (
                  <div className="chat_box">
                    <div className=" chat_box_header">
                      <div className="header_profile_div">
                        <div className="img_cont">
                          <img src={showScreen.profileImg} />
                        </div>
                        <div className="header_user_info user_info">
                          <span>{showScreen.userName}</span>
                          <p>{showScreen.userStatus}</p>
                        </div>
                      </div>
                      <button
                        className="chat_box_close_btn"
                        onClick={() => setVisible(!visible)}
                      >
                        <img src="/images/white-cross.svg" />
                      </button>
                    </div>
                    <div className="center_chat_box">
                      <div className="message_text_start_div">
                        <h5 className="message_text message_text_start">
                          {showScreen?.userDetail}
                        </h5>
                      </div>
                      {inputarr.map((item, ind) => {
                        return (
                          <>
                            <div className="message_text_end_div">
                              <h5 key={ind} className="message_text message_text_end">
                                {item.name}
                              </h5>
                            </div>
                          </>
                        );
                      })}
                    </div>
                    <div className="chat_box_footer">
                      <button className="chat_box_footer_icon_btn">
                        <img src="/images/media-post-icon.png" />
                      </button>
                      <input
                        autocomplete="off"
                        name="name"
                        value={message.name}
                        type="text"
                        placeholder="Type a message..."
                        onChange={showMessage}
                        className="form-control chat_box_weite_bar"
                      />
                      <button
                        onClick={handleSubmit}
                        className="chat_box_footer_icon_btn"
                      >
                        <img src="/images/send_btn.png" />
                      </button>
                    </div>
                  </div>
                )}
                {/* -------------------------------chat-box-end---------------------------------- */}
              </div>
            )}
            {dataValue === 1 && (
              <>
                <input
                  type="text"
                  placeholder="Search Links..."
                  name=""
                  className="form-control link_request_search_bar"
                />
                <div>
                  {/* <p className="friend_request">
                    <span className="friend_request_count">
                      {freindCount ? freindCount : ""}
                    </span>
                    Pending Friend Request{" "}

                  </p> */}
                </div>
                {isFriendListLoading ? (
                  <LoaderPage />
                ) : friendList && friendList.length > 0 ? (
                  friendList?.map((listItem, listIndex) => {
                    return (
                      <>
                        <div
                          key={listIndex}
                          className="suggested_card mt-3 mx-auto"
                        >
                          <Row>
                            <Col xs={2}>
                              <div className="mid_comment_left">
                                <p className="s_no">{listIndex + 1}.</p>
                                <Image
                                  className="suggested_card_profile"
                                  src={
                                    listItem?.profilePhoto
                                      ? `${apibasePath}documents/userProfile/${listItem?.profilePhoto}`
                                      : "/images/dammy.svg"
                                  }
                                />
                              </div>
                            </Col>
                            <Col xs={10}>
                              <div className="text-start ps-2">
                                <h6 className="suggested_card_heading">
                                  {listItem.FriendsDetail.name}
                                </h6>
                                <p className="suggested_card_text">
                                  {listItem.FriendsDetail.userType.toUpperCase()}{" "}
                                  |{" "}
                                  {listItem.FriendsDetail.designation.toUpperCase()}
                                </p>
                                <div className="d-flex">
                                  <button
                                    className=" suggested_card_btn suggested_card_link_btn"
                                    type="button"
                                    onClick={() =>
                                      handleRequestStatus(listItem, true)
                                    }
                                  >
                                    Accept
                                  </button>
                                  <button
                                    className=" suggested_card_btn"
                                    onClick={() =>
                                      handleRequestStatus(listItem, false)
                                    }
                                    type="button"
                                  >
                                    Decline
                                  </button>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </>
                    )
                  }
                  )) : (
                  <NoDataPage name="Friends" />
                )}
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default HccecoLinks;
