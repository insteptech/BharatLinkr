import React from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation } from "swiper";
import { Card } from "react-bootstrap";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";

const postCard = [
  {
    icon: "/images/plus_icon.png",
    title: "Post an Event",
  },
  {
    img: "/images/cover-bg.jpg",
    Name: "Vibhu Saini",
    count: 12,
  },
  {
    icon: "/images/plus_icon.png",
    title: "Post an Event",
    img: "/images/company.jpg",
    Name: "Vineet Kumar rajput",
    count: 4,
  },
  {
    icon: "/images/plus_icon.png",
    title: "Post an Event",
    img: "/images/company-1.png",
    Name: "Guri",
    count: 29,
  },
  {
    icon: "/images/plus_icon.png",
    title: "Post an Event",
    img: "/images/lady.png",
    Name: "Mithesh",
    count: 8,
  },
  {
    icon: "/images/plus_icon.png",
    title: "Post an Event",
    img: "/images/lady.png",
    Name: "Ravi Kumar",
    count: 16,
  },
];

const StoryCard = () => {
  return (
    <>
      <ScrollingCarousel show={5.5} slide={4} swiping={true}>
        {postCard &&
          postCard?.map((item, index) => (
            <Card key={index} className="user_post_card text-center">
              <Card.Body className="user_post_card_body">
                {item?.img ? (
                  <>
                    <div className="image_cover_content_base blur_none ">
                      <img className="story_photo img-fluid" src={item.img} />
                    </div>
                    <div className="story_image_cover_content hide_box">
                      <h6 className="story_image_content_text ">{item.Name}</h6>
                      <h6 className="story_image_content_text b_r_100">
                        {item.count > 5 ? `+5` : `${item.count}`}
                      </h6>
                    </div>
                  </>
                ) : (
                  <>
                    <label
                      className="plus_btn_box  story_photo"
                      for="actual-btn"
                    >
                      <img className="user_post_card_btn " src={item.icon} />
                      <h2 className="user_post_card_title hide_img">
                        {item.title}
                      </h2>
                    </label>
                    <input type="file" id="actual-btn" hidden />
                  </>
                )}
              </Card.Body>
            </Card>
          ))}
      </ScrollingCarousel>

      {/* <Swiper
        className="swiper_main_row"
        navigation
        modules={[Navigation]}
        spaceBetween={10}
        autoplay={true}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        breakpoints={{
          140: {
            slidesPerView: 4,
          },
          440: {
            slidesPerView: 3,
          },
          1244: {
            slidesPerView: 4,
          },
        }}
      >
        {postCard &&
          postCard?.map((item, index) => (
            <SwiperSlide className="swiper_sub_div">
              <Card key={index} className="user_post_card text-center">
                <Card.Body className="user_post_card_body">
                  {item?.img ? (
                    <>
                      <div className="image_cover_content_base blur_none ">
                        <img className="story_photo" src={item.img} />
                      </div>
                      <div className="story_image_cover_content hide_box">
                        <h6 className="story_image_content_text">
                          {item.Name}
                        </h6>
                        <h6 className="story_image_content_text b_r_100">
                          {item.count > 5 ? `+5` : `${item.count}`}
                        </h6>
                      </div>
                      
                    </>
                  ) : (
                    <>
                      <label
                        className="story_post_btn user_post_card_body"
                        for="actual-btn"
                      >
                        <img className="user_post_card_btn" src={item.icon} />
                        <h2 className="user_post_card_title">{item.title}</h2>
                      </label>
                      <input type="file" id="actual-btn" hidden />
                    </>
                  )}
                </Card.Body>
              </Card>
            </SwiperSlide>
          ))}
      </Swiper> */}
    </>
  );
};

export default StoryCard;
