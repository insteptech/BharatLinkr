import React, { useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation } from "swiper";
import { Card, Col, Image, Row, Spinner } from "react-bootstrap";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addFriend } from "../../../../redux/actions/user/userActions";
import { toast } from "react-toastify";

const SuggestCards = () => {
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.userSlice.loginStatus);
  const allUserList = useSelector((state) => state.userSlice.allUserList);
  const myFriendsList = useSelector((state) => state.userSlice.myFriendsList);
  const currentUser = useSelector((state) => state.userSlice.currentUser);
  const gettingAllList = useSelector((state) => state.userSlice.gettingAllList);

  const handleRequest = (userObject) => {
    let data = {
      Friends: [
        {
          recieverId: userObject.id,
          senderId: currentUser?.id,
        },
      ],
    };
    if (loginStatus) {
      dispatch(addFriend(data)).then((res) => {
        if (!res?.payload?.data[0]?.status) {
          toast.success("Friend Request sent");
        } else {
          let statuss = res?.payload?.data[0]?.status;
          toast.info(statuss);
        }
      });
    }
    if (!loginStatus) toast.info("Login First");
  };

  const isFriend = (id) => {
    if (id) {
      let friendStatus = myFriendsList?.find((item) => item.senderId === id);
      if (friendStatus?.status === true) {
        return "Link"
      } else {
        return "Sent"
      }
    }
  };
  const [suggestedUser, setSuggestedUser] = useState(allUserList)

  const handleCancelSuggestedLink = (index) => {
    let updatedSuggestedlist = [...suggestedUser]
    updatedSuggestedlist.splice(index, 1)
    setSuggestedUser(updatedSuggestedlist)
  }

  return (
    <>
      {" "}
      <Row>
        <Col xs={12}>
          <h6 className="suggested_page_heading">Suggested Links</h6>
        </Col>
      </Row>
      <Swiper
        className="suggested_card_row"
        navigation
        modules={[Navigation]}
        spaceBetween={15}
        autoplay={true}
        breakpoints={{
          560: {
            slidesPerView: 2,
          },
        }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {gettingAllList ? (
          <div className="item_center">
            <Spinner
              className="blue_color"
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <span className="time_experience m-0">Loading...</span>
          </div>
        ) : (
          allUserList &&
          allUserList?.map((userObject, userIndex) => {
            if (currentUser?.id !== userObject.id)
              return (
                <>
                  {(isFriend(userObject.id) === "Link" || isFriend(userObject.id) === "Sent") && (
                    <SwiperSlide className="">
                      <div key={userIndex} className="suggested_card">
                        <Row>
                          <Col xs={2}>
                            <div className="mid_comment_left">
                              <img
                                className="suggested_card_profile card_pro_img"
                                src={
                                  userObject.cardImg
                                    ? userObject.cardImg
                                    : "/images/dammy.svg"
                                }
                              />
                            </div>
                          </Col>
                          <Col xs={10}>
                            <div className="text-start ps-2">
                              <h6 className="suggested_card_heading">
                                {userObject.name}
                              </h6>
                              <Image
                                className="close_btn"
                                src="/images/close-card-icon.svg"
                                onClick={() => handleCancelSuggestedLink(userIndex)}
                              />
                              <p className="suggested_card_text">
                                {userObject.designation} |{" "}
                                {userObject.areaOfExpertise}{" "}
                              </p>
                              <button
                                className=" suggested_card_btn suggested_card_link_btn"
                                type="button"
                                onClick={() => handleRequest(userObject, true)}
                                disabled={(isFriend(userObject.id) === "Sent")}
                              >
                                {isFriend(userObject.id)}
                              </button>
                              <button
                                className=" suggested_card_btn"
                                type="button"
                              >
                                Post
                              </button>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </SwiperSlide>
                  )}
                </>
              );
          })
        )}
      </Swiper>
    </>
  );
};

export default SuggestCards;
