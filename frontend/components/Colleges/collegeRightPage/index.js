import React, { useEffect, useState } from "react";
import { Card, Col, Form, Image, Offcanvas, Row } from "react-bootstrap";
import CollegeCard from "../collegeCard";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import CollegeLeftPage from "../collegeLeftPage";
import { useDispatch, useSelector } from "react-redux";
import { getMainStream } from "../../../redux/actions/streams/addMainStreams";
import { CollegeLikesList, getColleges } from "../../../redux/actions/college/college";
import LoaderPage from "../../common-components/loader";
import Swiper from "swiper";
import { getTokenDecode } from "../../utils";

const streamData = [
  {
    value: "1",
    itemName: "Hello",
    itemCount: 12,
    courseItem: "B.ed",
  },
  {
    value: "2",
    itemName: "notification",
    itemCount: 125,
    courseItem: "B.tech",
  },
  {
    value: "3",
    itemName: "extra",
    itemCount: 124,
    courseItem: "B.ed",
  },
  {
    value: "4",
    itemName: "technology",
    itemCount: 123,
    courseItem: "Bba",
  },
  {
    value: "5",
    itemName: "Hello4",
    itemCount: 122,
    courseItem: "mbbs",
  },
  {
    itemName: "Hello5",
    itemCount: 121,
    courseItem: "b.sc",
  },
  {
    itemName: "Hello1",
    itemCount: 125,
    courseItem: "B.ed",
  },
  {
    itemName: "Hello2",
    itemCount: 124,
    courseItem: "B.ed",
  },
  {
    itemName: "Hello3",
    itemCount: 123,
    courseItem: "B.ed",
  },
  {
    itemName: "Hello4",
    itemCount: 122,
    courseItem: "B.ed",
  },
  {
    itemName: "Hello5",
    itemCount: 121,
    courseItem: "B.ed",
  },
];

const CollegeRightPage = (props) => {
  const dispatch = useDispatch();
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const mainData = useSelector(
    (data) => data?.mainStreamList?.mainStreamValue?.data?.data?.rows
  );

  const collegeList = useSelector(
    (data) => data?.collegelist?.collegelist?.rows
  );

  const loadercollegecard = useSelector((data) => data?.collegelist?.isLoading);

  useEffect(() => {
    dispatch(getMainStream());
    dispatch(getColleges());
    if (getTokenDecode()) {

      dispatch(CollegeLikesList(getTokenDecode()?.userId))
    }
  }, []);
  // useEffect(() => {

  // }, [])

  return (
    <>
      <div className="">
        <Row>
          <Col md={12} className="text-center">
            <h2 className="edit_profile_h2 mobile_margin_bottom">
              List of top colleges in india based on 2022 ranking
            </h2>
          </Col>
          <Col
            md={12}
            className=" big_screen_hide_box search_filter_row_padding "
          >
            <div className="search_filter_row">
              <div className="search_profile_search_bar ">
                <input
                  type="text"
                  placeholder="Search by name..."
                  name=""
                  onChange={(e) => props?.handleSearch(e)}
                  className="form-control chat_box_weite_bar"
                />
                <button type="submit">
                  <img src="/images/search-icon.svg" />
                </button>
              </div>
              <div className="pt-1" onClick={handleShow1}>
                <img className="filter_icon" src="/images/filter-icon.svg" />
              </div>
            </div>
          </Col>
        </Row>
        <div className="mobile_select_stream mb-3 big_screen_none">
          <Row>
            <Col xs={6}>
              <Form.Select
                className="stream_select mobile_font_14"
                aria-label="Default select example"
              >
                <option>Select stream</option>
                {mainData &&
                  mainData?.map((item, index) => (
                    <option
                      className="mobile_font_12"
                      key={index}
                      value={item?.value}
                    >
                      {item?.mainStreamName}
                      <span>({item?.itemCount})</span>
                    </option>
                  ))}
              </Form.Select>
            </Col>
            <Col xs={6}>
              <Form.Select
                className="stream_select mobile_font_14"
                aria-label="Default select example"
              >
                <option>Select Course</option>
                {streamData &&
                  streamData?.map((item, index) => (
                    <option
                      className="mobile_font_12"
                      key={index}
                      value={item?.value}
                    >
                      {item?.courseItem}
                    </option>
                  ))}
              </Form.Select>
            </Col>
          </Row>
        </div>
        {/* <div className="select_stream_row hide_box">
          <Row>
            <Col xs={3} sm={2} className="heading_col">
              <h6 className="select_row_heading mobile_font_12">
                select stream
              </h6>
            </Col>
            <Col xs={9} sm={10} className="select_item_col">
              <ScrollingCarousel show={5.5} slide={4} swiping={true}>
                {mainData &&
                  mainData?.map((item, index) => (
                    <p key={index} className="select_items mobile_font_10">
                      {item.mainStreamName}
                      <span>({item.itemCount})</span>
                    </p>
                  ))}
              </ScrollingCarousel>
            </Col>
          </Row>
        </div> */}
        {/* <div className="select_stream_row hide_box">
          <Row>
            <Col xs={3} sm={2} className="heading_col">
              <h6 className="select_row_heading mobile_font_12">
                Select Course
              </h6>
            </Col>
            <Col xs={9} sm={10} className="select_item_col">
              <ScrollingCarousel show={5.5} slide={4} swiping={true}>
                {collegeList &&
                  collegeList?.map((item, index) => {
                    return item?.AssociateCourse.map((course) => (
                      <div key={index} className="">
                        <p className="select_items mobile_font_10">
                          {course.courseName}
                        </p>
                      </div>
                    ));
                  })}
              </ScrollingCarousel>
            </Col>
          </Row>
        </div> */}
        <div className="select_stream_row gray_row_max_width">
          <Row>
            <Col xs={3} sm={2} className="heading_col">
              <h6 className="select_row_heading mobile_font_12">Sort By:</h6>
            </Col>
            <Col xs={9} className="select_item_col">
              <ScrollingCarousel show={5.5} slide={4} swiping={true}>
                <p className=" short_by_link mobile_font_10">
                  Popularity
                  <Image
                    className="down_arrow_icon"
                    src="/images/down-arrow.png"
                  />
                </p>
                <p className=" short_by_link mobile_font_10">
                  Rating
                  <Image
                    className="down_arrow_icon"
                    src="/images/down-arrow.png"
                  />
                </p>
                <p className=" short_by_link mobile_font_10">
                  Highest Fee
                  <Image
                    className="down_arrow_icon"
                    src="/images/down-arrow.png"
                  />
                </p>
                <p className=" short_by_link mobile_font_10">
                  Lowest Fee
                  <Image
                    className="down_arrow_icon"
                    src="/images/down-arrow.png"
                  />
                </p>
              </ScrollingCarousel>
            </Col>
          </Row>
        </div>
        <div>
          <Row xs={1} sm={2} md={3} lg={2} xl={3} className="g-3">
            {loadercollegecard === true ? (
              <LoaderPage />
            ) : (
              collegeList &&
              collegeList?.map((item, index) => {
                return (
                  <Col>
                    <CollegeCard item={item} index={index} />
                  </Col>
                );
              })
            )}
          </Row>
        </div>
      </div>
      {/* --------------------------mobile-screen------------------------- */}
      <div className="">
        <Offcanvas
          placement={"bottom"}
          show={show1}
          onHide={handleClose1}
          className="offcanvas_container gray_bg"
        >
          <Offcanvas.Header className="pb-1">
            <Offcanvas.Title>
              <div className="profile_search_bar_col ">
                <div className="search_profile_search_bar mb-0">
                  <input
                    type="text"
                    placeholder="Search by name..."
                    name=""
                    onChange={(e) => props?.handleSearch(e)}
                    className="form-control chat_box_weite_bar"
                  />
                  <button type="submit">
                    <img src="/images/search.png" />
                  </button>
                </div>
              </div>
            </Offcanvas.Title>
            <button className="chat_box_close_btn" onClick={handleClose1}>
              <img src="/images/cross-icon.svg" />
            </button>
          </Offcanvas.Header>
          <Offcanvas.Body className="">
            <CollegeLeftPage />
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  );
};

export default CollegeRightPage;
