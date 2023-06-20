import React from "react";
import {
  Accordion,
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  Image,
  Row,
} from "react-bootstrap";
// import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
// import { Navigation } from "swiper";

// Import Swiper styles

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Carousel, ScrollingCarousel } from "@trendyol-js/react-carousel";
import { useRouter } from "next/router";
import { useState } from "react";
import StoryCard from "./storyCard";
import PostBaar from "./postBaar";
import SuggestCards from "./suggestCards";
import PostedCards from "../postedCards";
import MobileMenus from "./mobileMenus";
import CollegePost from "../postedCards/collegePost";
// Import Swiper styles

const postImg = [
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
];

const CenterPage = () => {
  const router = useRouter();
  // const swiper = useSwiper();

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
      <div className="user_center_page_bg">
        <div className="col">
          <div className="social_sec_main">
            <div className="top_input">
              <form>
                <input type="search" placeholder="Search..." />
                <button className="type_submit" type="submit">Search</button>
              </form>
              {/* ---------post-card-start-------------- */}
              <StoryCard />
              {/* ---------post-card-end-------------- */}

              {/* -----------post-bar-start-------------- */}
              {/* <div className="dropdown_row mobile_post_filters">
                <img className="p_filter_btn" src="/images/p-filter.svg" />
                <ScrollingCarousel show={5.5} slide={4} swiping={true}>
                  <Button className="view_and_apply_btn post_card_icons_btn hide_filter font_12">
                    <Image
                      className="post_card_icons"
                      src="/images/script-icon.png"
                    />
                    Script
                  </Button>
                  <Button className="view_and_apply_btn post_card_icons_btn hide_filter font_12">
                    <Image
                      className="post_card_icons"
                      src="/images/announcement-icon.png"
                    />
                    Announcement
                  </Button>
                  <Button className="view_and_apply_btn post_card_icons_btn hide_filter font_12">
                    <Image
                      className="post_card_icons"
                      src="/images/job-icon.png"
                    />
                    Job
                  </Button>
                  <Button className="view_and_apply_btn post_card_icons_btn hide_filter font_12">
                    <Image
                      className="post_card_icons"
                      src="/images/intern.png"
                    />
                    Intern
                  </Button>
                  <Button className="view_and_apply_btn post_card_icons_btn hide_filter font_12">
                    <Image
                      className="post_card_icons"
                      src="/images/more-icon.png"
                    />
                    More..
                  </Button>
                  <Button className="view_and_apply_btn post_card_icons_btn hide_filter font_12">
                    <Image
                      className="post_card_icons"
                      src="/images/job-icon.png"
                    />
                    Job
                  </Button>
                  <Button className="view_and_apply_btn post_card_icons_btn hide_filter font_12">
                    <Image
                      className="post_card_icons"
                      src="/images/more-icon.png"
                    />
                    More..
                  </Button>
                </ScrollingCarousel>
              </div> */}
              <PostBaar />
              {/* -----------post-bar-end-------------- */}

              {/* -----------Suggested Links start-------------- */}

              <SuggestCards />

              {/* -----------Suggested Links end-------------- */}
              <PostedCards />
              <CollegePost />
            </div>
          </div>
          {/* <MobileMenus /> */}
        </div>
      </div>
      
    </>
  );
};

export default CenterPage;
