import React from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation } from "swiper";
import { Card, Col, Image, Row } from "react-bootstrap";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addFriend } from "../../../../redux/actions/user/userActions";
import { toast } from "react-toastify";

const SuggestCards = () => {
  const dispatch = useDispatch()
  const loginStatus = useSelector((state) => state.userSlice.loginStatus);
  const allUserList = useSelector((state) => state.userSlice.allUserList);
  const myFriendsList = useSelector((state) => state.userSlice.myFriendsList);
  const currentUser = useSelector((state) => state.userSlice.currentUser);
  const handleRequest = (userObject) => {
    let data = {
      Friends: [{
        recieverId: userObject.id,
        senderId: currentUser?.id
      }]
    }
    if (loginStatus) dispatch(addFriend(data))
    if (!loginStatus) toast.info("Login First")
  }
  const isFriend = (id) => {
    if (id) {
      let friendStatus = myFriendsList.find(item => item.senderId === id)
      console.log(myFriendsList, 'freind', friendStatus)
      if (!friendStatus) {
        return "Link"
      } else if (friendStatus.status) {
        return "Accepted"
      } else if (!friendStatus.status) {
        return "Sent"
      }
    }
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
        {allUserList &&
          allUserList?.map((userObject, userIndex) => {
            if (currentUser?.id !== userObject.id)
              return (
                <>
                  <SwiperSlide className="">
                    <div key={userIndex} className="suggested_card">
                      <Row>
                        <Col xs={2}>
                          <div className="mid_comment_left">
                            <img
                              className="suggested_card_profile card_pro_img"
                              src={userObject.cardImg}
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
                            />
                            <p className="suggested_card_text">{userObject.designation} | {userObject.areaOfExpertise} </p>
                            <button
                              className=" suggested_card_btn suggested_card_link_btn"
                              type="button"
                              onClick={() => handleRequest(userObject, true)}
                            >
                              {isFriend(userObject.id)}
                            </button>
                            <button className=" suggested_card_btn" type="button">
                              Post
                            </button>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </SwiperSlide>
                </>
              );
          })}
      </Swiper>
    </>
  );
};

export default SuggestCards;
