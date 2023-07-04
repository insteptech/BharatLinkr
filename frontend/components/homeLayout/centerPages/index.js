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
import { useSelector } from "react-redux";
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
  const loginStatus = useSelector((state) => state.userSlice.loginStatus);

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
              <StoryCard />
              <PostBaar />
              {loginStatus && <SuggestCards />}
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
