import React from "react";
import { Accordion, Col, Dropdown, Image, Row } from "react-bootstrap";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useRouter } from "next/router";
import { useState } from "react";

const userPostData = [
  {
    id: 1,
    profileImg: "/images/story-2.JPG",
    subImg: "/images/user-graduate.png",
    timeImg: "/images/ios-time.png",
    tagImg: "/images/metro-tag.png",
    userName: "Noor Fatima",
    userTitle: "Announcement",
    subTitle: "Student | Lyallpur college of Technology",
    postTime: "2Hrs",
    postTag: "Monika & 4 Others",
    postHeading: "Graphic designer required!",
    likeIcon: "/images/liker.png",
    comIcon: "/images/com_ent.png",
    shareIcon: "/images/sender.png",
    likeNum: "125",
    comNum: "105",
    shareNum: "25",
    viewOption: "View Opinions",
    sendcomIcon: "/images/send_btn.png",
    text: "  What a perfect time to share!",
    postPaira:
      " Lorem ipsum dolor sit amet, consetetur sadipscing  Lorem ipsum dolor sit amet, consetetur sadipscing  Lorem ipsum dolor sit amet, consetetur sadipscing",
  },
  {
    id: 2,
    profileImg: "/images/mdi_pro.png",
    subImg: "/images/user-graduate.png",
    timeImg: "/images/ios-time.png",
    tagImg: "/images/metro-tag.png",
    text: "  What a perfect time to share!",

    userName: "Noor Fatima",
    userTitle: "Hiring",
    subTitle: "Student | Lyallpur college of Technology",
    postTime: "2Hrs",
    postTag: "Monika & 4 Others",
    postHeading: "Graphic designer required!",
    likeIcon: "/images/liker.png",
    comIcon: "/images/com_ent.png",
    shareIcon: "/images/sender.png",
    likeNum: "125",
    comNum: "105",
    shareNum: "25",
    viewOption: "View Opinions",
    sendcomIcon: "/images/send_btn.png",
    postPaira:
      " Lorem ipsum dolor sit amet, consetetur sadipscing  Lorem ipsum dolor sit amet, consetetur sadipscing  Lorem ipsum dolor sit amet, consetetur sadipscing",
    postImg: [
      {
        id: 1,
        Img: "/images/company.jpg",
      },
      {
        id: 2,
        Img: "/images/company-2.jpg",
      },
      {
        id: 3,
        Img: "/images/company-4.jpg",
      },
    ],
  },
];

const PostedCards = () => {
  const router = useRouter();
  const swiper = useSwiper();

  // --------read-more-start----------------
  const [num, setNum] = useState(140);

  const [title, setTitle] = useState("...Read More");

  const handleSeeMore = (item) => {
    if (title === "...Read More") {
      setNum(item.postPaira.length);
      setTitle("...Read Less");
    } else {
      setNum(140);
      setTitle("...Read More");
    }
  };
  // --------read-more-end----------------
  return (
    <>
      {userPostData &&
        userPostData?.map((item) => (
          <>
            <div key={item.id} className="profile_sec_c">
              <Row>
                <Col md={12}>
                  <div className="">
                    <div className="mid_comment_profile">
                      <div className="post_card_header_detail">
                      <div
                        // sm={1}
                        // xs={2}
                        onClick={() => router.push("/editprofile")}
                        className="mid_comment_left"
                      >
                        <img
                          className="suggested_card_profile post_card_profile"
                          src={item.profileImg}
                        />
                      </div>

                      <div  className="mid_comment_mid m-0">
                        <h1>
                          {item.userName}
                          <span className="orange_text">{item.userTitle}</span>
                        </h1>
                        <div>
                          <img className="post_card_icon" src={item.subImg} />
                          <span>{item.subTitle}</span>
                        </div>
                      </div>

                      <div className="mid_comment_end pt-1 m-0">
                        <span>
                          <img className="post_card_icon" src={item.timeImg} />
                          {item.postTime}
                        </span>
                        <span>
                          <img className="post_card_icon" src={item.tagImg} />
                          {item.postTag}
                        </span>
                      </div>
                      </div>
                      <div
                        
                        className="text-end post_card_three_dot m-0"
                      >
                        <Dropdown className="edit_delete_drop">
                          <Dropdown.Toggle
                            className="three_dot_btn m-0"
                            variant="success"
                            id="dropdown-basic"
                          >
                            <Image src="/images/blue-three-dot.svg" />
                          </Dropdown.Toggle>

                          <Dropdown.Menu className="">
                            <Dropdown.Item href="#/action-1">
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-2">
                              Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>

                    <div className="req post_heading_apply">
                      <p>{item.postHeading}</p>
                      <h6 className="apply_link">
                        Apply
                        <Image
                          width={12}
                          className="green_right_arrow"
                          src="/images/green-right-arrow.svg"
                        />
                      </h6>
                    </div>

                    <div className="req_p">
                      <p className="mb-0">
                        {item.postPaira.slice(0, num)}
                        <span onClick={() => handleSeeMore(item)}>{title}</span>
                      </p>
                    </div>
                    {/* ---------slider-image-start-------------- */}
                    <div className={item.postImg ? "show_div" : "hide_div"}>
                      <Swiper
                        className=""
                        navigation
                        modules={[Navigation]}
                        spaceBetween={15}
                        slidesPerView={1}
                        autoplay={true}
                        onSlideChange={() => console.log("slide change")}
                        onSwiper={(swiper) => console.log(swiper)}
                      >
                        {item.postImg &&
                          item.postImg?.map((item) => {
                            return (
                              <>
                                <SwiperSlide key={item.id}>
                                  <Image
                                    className="post_card_slide_img"
                                    src={item.Img}
                                  />
                                </SwiperSlide>
                              </>
                            );
                          })}
                      </Swiper>
                    </div>
                    {/* ---------------slider-image-end------------- */}

                    {/* -------------like-comment-row-start----------------- */}
                    <Accordion className="like_comment_acc_bar post_bar">
                      <Accordion.Item className="w-100" eventKey="1">
                        <Accordion.Header>
                          <div className="bottom_comment_profile">
                            <div className="bottom_comment_left">
                              <span>
                                <img src={item.likeIcon} />
                                {item.likeNum}
                              </span>
                              <span>
                                <img src={item.comIcon} />
                                {item.comNum}
                              </span>
                              <span>
                                <img src={item.shareIcon} />
                                {item.shareNum}
                              </span>
                            </div>

                            <div className="bottom_comment_right">
                              <p>{item.viewOption}</p>
                            </div>
                          </div>
                        </Accordion.Header>
                        <Accordion.Body className="post_bar_accordion_body">
                          <div className="max_height_overflow">
                            <div className="mid_comment_profile like_comment_detail_row">
                              <div
                                onClick={() => router.push("/editprofile")}
                                className="mid_comment_left"
                              >
                                <img
                                  className="suggested_card_profile"
                                  src={item.profileImg}
                                />
                              </div>

                              <div className="mid_comment_mid">
                                <h1 className="font_11">{item.userName}</h1>
                                <div className="img_student_line">
                                  <span className="font_11">{item?.text}</span>
                                </div>
                              </div>

                              <div className="like_comment_icon_row">
                                <img
                                  className="like_icon"
                                  src={item.likeIcon}
                                />
                                <img className="like_icon" src={item.comIcon} />
                              </div>
                            </div>
                            <div className="mid_comment_profile like_comment_detail_row">
                              <div
                                onClick={() => router.push("/editprofile")}
                                className="mid_comment_left"
                              >
                                <img
                                  className="suggested_card_profile"
                                  src={item.profileImg}
                                />
                              </div>

                              <div className="mid_comment_mid">
                                <h1 className="font_11">{item.userName}</h1>
                                <div className="img_student_line">
                                  <span className="font_11">
                                    What a perfect time to share!
                                  </span>
                                </div>
                              </div>

                              <div className="like_comment_icon_row">
                                <img
                                  className="like_icon"
                                  src={item.likeIcon}
                                />
                                <img className="like_icon" src={item.comIcon} />
                              </div>
                            </div>
                            <div className="mid_comment_profile like_comment_detail_row">
                              <div
                                onClick={() => router.push("/editprofile")}
                                className="mid_comment_left"
                              >
                                <img
                                  className="suggested_card_profile"
                                  src={item.profileImg}
                                />
                              </div>

                              <div className="mid_comment_mid">
                                <h1 className="font_11">{item.userName}</h1>
                                <div className="img_student_line">
                                  <span className="font_11">
                                    What a perfect time to share!
                                  </span>
                                </div>
                              </div>

                              <div className="like_comment_icon_row">
                                <img
                                  className="like_icon"
                                  src={item.likeIcon}
                                />
                                <img className="like_icon" src={item.comIcon} />
                              </div>
                            </div>
                            <div className="mid_comment_profile like_comment_detail_row">
                              <div
                                onClick={() => router.push("/editprofile")}
                                className="mid_comment_left"
                              >
                                <img
                                  className="suggested_card_profile "
                                  src={item.profileImg}
                                />
                              </div>

                              <div className="mid_comment_mid">
                                <h1 className="font_11">{item.userName}</h1>
                                <div className="img_student_line">
                                  <span className="font_11">
                                    What a perfect time to share!
                                  </span>
                                </div>
                              </div>

                              <div className="like_comment_icon_row">
                                <img
                                  className="like_icon"
                                  src={item.likeIcon}
                                />
                                <img className="like_icon" src={item.comIcon} />
                              </div>
                            </div>
                            <div className="mid_comment_profile like_comment_detail_row">
                              <div
                                onClick={() => router.push("/editprofile")}
                                className="mid_comment_left"
                              >
                                <img
                                  className="suggested_card_profile "
                                  src={item.profileImg}
                                />
                              </div>

                              <div className="mid_comment_mid">
                                <h1 className="font_11">{item.userName}</h1>
                                <div className="img_student_line">
                                  <span className="font_11">
                                    What a perfect time to share!
                                  </span>
                                </div>
                              </div>

                              <div className="like_comment_icon_row">
                                <img
                                  className="like_icon"
                                  src={item.likeIcon}
                                />
                                <img className="like_icon" src={item.comIcon} />
                              </div>
                            </div>
                            <div className="mid_comment_profile like_comment_detail_row">
                              <div
                                onClick={() => router.push("/editprofile")}
                                className="mid_comment_left"
                              >
                                <img
                                  className="suggested_card_profile "
                                  src={item.profileImg}
                                />
                              </div>

                              <div className="mid_comment_mid">
                                <h1 className="font_11">{item.userName}</h1>
                                <div className="img_student_line">
                                  <span className="font_11">
                                    What a perfect time to share!
                                  </span>
                                </div>
                              </div>

                              <div className="like_comment_icon_row">
                                <img
                                  className="like_icon"
                                  src={item.likeIcon}
                                />
                                <img className="like_icon" src={item.comIcon} />
                              </div>
                            </div>
                            <div>
                              <p className="green_links load_more_link">
                                Load More Opinions
                              </p>
                            </div>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>

                    {/* -------------like-comment-row-end----------------- */}

                    <div className="chat-footer">
                      <div className="input-group">
                        <div className="input-group-append">
                          <span className=" attach_btn">
                            <img
                              className="suggested_card_profile post_card_profile"
                              src={item.profileImg}
                            />
                          </span>
                        </div>
                        <textarea
                          name=""
                          className="form-control type_msg"
                          placeholder="write an opinion..."
                        ></textarea>
                        <div className="input-group-append">
                          <span className=" attach_btn">
                            <img src={item.sendcomIcon} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </>
        ))}
    </>
  );
};

export default PostedCards;
