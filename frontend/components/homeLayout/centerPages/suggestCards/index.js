import React from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation } from "swiper";
import { Card, Col, Image, Row } from "react-bootstrap";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const SuggestedCardData = [
  {
    id: 1,
    cardImg: "/images/mdi_pro.png",
    cardName: "Bharat",
    text: "Student | Lyallpur college of Technology",
  },
  {
    id: 2,
    cardImg: "/images/cover-bg.jpg",
    cardName: "India",
    text: "Student | Lyallpur college of Technology",
  },
  {
    id: 2,
    cardImg: "/images/mdi_pro.png",
    cardName: "India",
    text: "Student | Lyallpur college of Technology",
  },
  {
    id: 2,
    cardImg: "/images/mdi_pro.png",
    cardName: "India",
    text: "Student | Lyallpur college of Technology",
  },
];



const SuggestCards = () => {
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
        {SuggestedCardData &&
          SuggestedCardData?.map((item, index) => {
            return (
              <>
                <SwiperSlide className="">
                  <div key={index} className="suggested_card">
                    <Row>
                      <Col xs={2}>
                        <div className="mid_comment_left">
                          <img
                            className="suggested_card_profile card_pro_img"
                            src={item.cardImg}
                          />
                        </div>
                      </Col>
                      <Col xs={10}>
                        <div className="text-start ps-2">
                          <h6 className="suggested_card_heading">
                            {item.cardName}
                          </h6>
                          <Image
                            className="close_btn"
                            src="/images/close-card-icon.svg"
                          />
                          <p className="suggested_card_text">{item.text}</p>
                          <button
                            className=" suggested_card_btn suggested_card_link_btn"
                            type="button"
                          >
                            Link
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
