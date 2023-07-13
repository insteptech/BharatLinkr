import React, { useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation } from "swiper";
import {
  Button,
  Card,
  Carousel,
  Col,
  Image,
  Modal,
  Row,
} from "react-bootstrap";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import { useSelector } from "react-redux";

const postCard = [
  {
    icon: "/images/plus_icon.png",
    title: "Post an Event",
  },
  {
    id: 1,
    img: "/images/story-4.avif",
    Name: "Vibhu Saini",
    count: 12,
  },
  {
    id: 2,
    icon: "/images/plus_icon.png",
    title: "Post an Event",
    img: "/images/story-1.webp",
    Name: "Vineet Rajput",
    count: 4,
  },
  {
    id: 3,
    icon: "/images/plus_icon.png",
    title: "Post an Event",
    img: "/images/story-2.jpg",
    Name: "Guri",
    count: 29,
  },
  {
    id: 4,
    icon: "/images/plus_icon.png",
    title: "Post an Event",
    img: "/images/story-3.jpg",
    Name: "Mithesh",
    count: 8,
  },
  {
    id: 5,
    icon: "/images/plus_icon.png",
    title: "Post an Event",
    img: "/images/company.jpg",
    Name: "Ravi Kumar",
    count: 16,
  },
];

const StoryCard = () => {
  const [showStory, setShowStory] = useState(false);
  const [showScreen, setShowScreen] = useState();
  const handleCloseStory = () => setShowStory(false);
  const loginStatus = useSelector((state) => state.userSlice.loginStatus);

  const openStory = (data) => {
    setShowScreen(data);
    setShowStory(true);
  };

  return (
    <>
      {loginStatus ? (
        <div>
          <ScrollingCarousel show={5.5} slide={4} swiping={true}>
            {postCard &&
              postCard?.map((item, index) => (
                <Card key={index} className="user_post_card text-center">
                  <Card.Body className="user_post_card_body">
                    {item?.img ? (
                      <>
                        <div
                          onClick={() => openStory(item)}
                          className="image_cover_content_base blur_none "
                        >
                          <img
                            className="story_photo img-fluid"
                            src={item.img}
                          />
                        </div>
                        <div className="story_image_cover_content hide_box">
                          <h6 className="story_image_content_text ">
                            {item.Name}
                          </h6>
                          <h6 className="story_image_content_text b_r_100">
                            {item.count > 5 ? `+5` : `${item.count}`}
                          </h6>
                        </div>
                        <p className="story_bottom_name ">{item.Name}</p>
                      </>
                    ) : (
                      <>
                        <label
                          className="plus_btn_box  story_photo"
                          for="actual-btn"
                        >
                          <img
                            className="user_post_card_btn "
                            src={item.icon}
                          />
                          <h2 className="user_post_card_title hide_img">
                            {item.title}
                          </h2>
                        </label>
                        <input type="file" id="actual-btn" hidden />
                        <p className="story_bottom_name post_title">
                          {item.title}
                        </p>
                      </>
                    )}
                  </Card.Body>
                </Card>
              ))}
          </ScrollingCarousel>
        </div>
      ) : (
        <div style={{ filter: "blur(4px)", pointerEvents: "none" }}>
          <ScrollingCarousel show={5.5} slide={4} swiping={true}>
            {postCard &&
              postCard?.map((item, index) => (
                <Card key={index} className="user_post_card text-center">
                  <Card.Body className="user_post_card_body">
                    {item?.img ? (
                      <>
                        <div
                          onClick={() => openStory(item)}
                          className="image_cover_content_base blur_none "
                        >
                          <img
                            className="story_photo img-fluid"
                            src={item.img}
                          />
                        </div>
                        <div className="story_image_cover_content hide_box">
                          <h6 className="story_image_content_text ">
                            {item.Name}
                          </h6>
                          <h6 className="story_image_content_text b_r_100">
                            {item.count > 5 ? `+5` : `${item.count}`}
                          </h6>
                        </div>
                        <p className="story_bottom_name ">{item.Name}</p>
                      </>
                    ) : (
                      <>
                        <label
                          className="plus_btn_box  story_photo"
                          for="actual-btn"
                        >
                          <img
                            className="user_post_card_btn "
                            src={item.icon}
                          />
                          <h2 className="user_post_card_title hide_img">
                            {item.title}
                          </h2>
                        </label>
                        <input type="file" id="actual-btn" hidden />
                        <p className="story_bottom_name post_title">
                          {item.title}
                        </p>
                      </>
                    )}
                  </Card.Body>
                </Card>
              ))}
          </ScrollingCarousel>
        </div>
      )}
      <Modal show={showStory} onHide={handleCloseStory} centered size="lg">
        {/* <Modal.Header className="py-2" closeButton>
          <span className="story_name_heading">{showScreen?.Name}</span>
        </Modal.Header> */}
        {/* <Modal.Body> */}
        <Row>
          <Col>
            {/* <Image className="story_view_page" src={showScreen?.img} /> */}
            <div>
             <div className="item_end">
             <button className="chat_box_close_btn" onClick={handleCloseStory}>
                <img src="/images/cross-icon.svg" />
              </button>
             </div>
              <Carousel className="story_carousel">
                <Carousel.Item interval={1000}>
                  <img
                    className="story_carousel_img"
                    src="/images/story-3.jpg"
                    alt="First slide"
                  />
                  <Carousel.Caption>
                    <h3>{showScreen?.Name}</h3>
                    <p>
                      Nulla vitae elit libero, a pharetra augue mollis interdum.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={500}>
                  <img
                    className="story_carousel_img"
                    src="/images/story-1.webp"
                    alt="Second slide"
                  />
                  <Carousel.Caption>
                    <h3>Style for men</h3>
                    <p>get 18% off*</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="story_carousel_img"
                    src="/images/company.jpg"
                    alt="Third slide"
                  />
                  <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                      Praesent commodo cursus magna, vel scelerisque nisl
                      consectetur.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={1000}>
                  <img
                    className="story_carousel_img"
                    src="/images/story-2.jpg"
                    alt="First slide"
                  />
                  <Carousel.Caption>
                    <h3>{showScreen?.Name}</h3>
                    <p>
                      Nulla vitae elit libero, a pharetra augue mollis interdum.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={500}>
                  <img
                    className="story_carousel_img"
                    src="/images/story-1.webp"
                    alt="Second slide"
                  />
                  <Carousel.Caption>
                    <h3>Style for men</h3>
                    <p>get 18% off*</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="story_carousel_img"
                    src="/images/company.jpg"
                    alt="Third slide"
                  />
                  <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                      Praesent commodo cursus magna, vel scelerisque nisl
                      consectetur.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </div>
          </Col>
        </Row>
        {/* </Modal.Body> */}
      </Modal>

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
