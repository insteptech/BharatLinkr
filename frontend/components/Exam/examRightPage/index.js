import React, { useState } from "react";
import { Card, Col, Form, Image, Offcanvas, Row } from "react-bootstrap";
// import CollegeCard from "../collegeCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import ExamLongCard from "./examLongCard/index.js";
import { useDispatch, useSelector } from "react-redux";
import { deleteExam, getAllExams } from "../../../redux/actions/exams/createExam.js";
import { useEffect } from "react";
import { getAllMasterFilter } from "../../../redux/actions/masterfilter/createmasterfilter.js";
import { getMainStream } from "../../../redux/actions/streams/addMainStreams.js";
import { getCourse } from "../../../redux/actions/course/addcourse.js";
import ExamLeftPage from "../examLeftPage/index.js";
import LoaderPage from "../../common-components/loader/index.js";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";


const ExamRightPage = (props) => {
  const { showSearchList, setShowSearchList } = props;

  const [mainStream, setMainStream] = useState("")
  const [course, setCourse] = useState("")

  const dispatch = useDispatch();

  const streams = useSelector((data) => data?.mainStreamList?.mainStreamValue?.data?.data?.rows);
  const coursesData = useSelector((data) => data?.courseList?.courselist?.data?.rows);
  const loadingexamcard = useSelector((state) => state?.courseList?.isLoading);

  useEffect(() => {
    dispatch(getMainStream());
    dispatch(getCourse());
  }, []);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  return (
    <>
      <div className="">
        <Row>
          <Col md={12} className="text-center ">
            <h2 className="edit_profile_h2 mobile_margin_bottom">
              Top Entrance Exams In India
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
                  className="form-control chat_box_weite_bar"
                  onChange={(e) => {
                    props?.searchExam(e);
                  }}
                />
                <button type="submit">
                  <img src="/images/search.png" />
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
                {streams &&
                  streams?.map((item, index) => (
                    <option
                      className="mobile_font_12"
                      key={index}
                      value={item?.value}
                    >
                      {item?.mainStreamName}
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
                {coursesData && coursesData?.map((item, index) => (
                    <option
                      className="mobile_font_12"
                      key={index}
                      value={item?.value}
                    >
                      {item.courseName}
                    </option>
                  ))}
              </Form.Select>
            </Col>
          </Row>
        </div>

        <div className="select_stream_row hide_box">
          <Row>
            <Col xs={3} sm={2} className="heading_col">
              <h6 className="select_row_heading mobile_font_12">
                select stream
              </h6>
            </Col>
            <Col xs={9} sm={10} className="select_item_col">
              <ScrollingCarousel show={5.5} slide={4} swiping={true}>
                {streams &&
                  streams?.map((item, index) => (
                    <div key={index}>
                      <p
                        className={`select_items mobile_font_10 ${mainStream === item?.id && "select_items_active"}`}
                        name="mainStreamId"
                        onClick={() => {
                          if (mainStream === item?.id) {
                            let x = props.clear
                            props?.handleFilterSelect("mainStreamId", item?.id)
                            delete x.mainStreamId
                            props.setclear({ ...x })
                            setMainStream("")
                            dispatch(getAllExams(x))
                          } else {
                            props?.handleFilterSelect("mainStreamId", item?.id)
                            setMainStream(item?.id)
                            props.setclear({
                              ...props.clear,
                              mainStreamId: item?.id
                            })
                            dispatch(getAllExams({
                              ...props.clear,
                              mainStreamId: item?.id
                            }))
                          }
                        }}
                      >
                        {item?.mainStreamName}
                      </p>
                    </div>
                  ))}
              </ScrollingCarousel>
            </Col>
          </Row>
        </div>
        <div className="select_stream_row hide_box">
          <Row>
            <Col xs={3} sm={2} className="heading_col">
              <h6 className="select_row_heading mobile_font_12">
                Select Course
              </h6>
            </Col>
            <Col xs={9} sm={10} className="select_item_col">
              <ScrollingCarousel show={5.5} slide={4} swiping={true}>
                {coursesData &&
                  coursesData?.map((item, index) => (
                    <div key={item.id} className="">
                      <p className={`select_items mobile_font_10 ${course === item?.id && "select_items_active"}`}
                        name="course"
                        onClick={(e) => {
                          if (course === item?.id) {
                            props?.handleFilterSelect("course", item?.id)
                            setCourse("")
                          } else {
                            props?.handleFilterSelect("course", item?.id)
                            setCourse(item?.id)
                          }
                        }}
                      >
                        {item.courseName}
                      </p>
                    </div>
                  ))}
              </ScrollingCarousel>
            </Col>
          </Row>
          {/* <Row>
            <Col xs={3} sm={2} className="heading_col">
              <h6 className="select_row_heading mobile_font_12">
                Select Course
              </h6>
            </Col>
            <Col xs={9} sm={10} className="select_item_col">
              <Swiper
                className="swiper_main_row"
                navigation
                modules={[Navigation]}
                spaceBetween={8}
                autoplay={true}
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
                breakpoints={{
                  140: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 4,
                  },
                  1244: {
                    slidesPerView: 6,
                  },
                }}
              >
                {coursesData &&
                  coursesData?.map((item, index) => (
                    <SwiperSlide key={item.id} className="swiper_sub_div">
                      <p className="select_items mobile_font_10">
                        {item.courseName}
                      </p>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </Col>
          </Row> */}
        </div>
        <div>
          <div>
            {props?.examData?.length === 0 ? (
              <>
                <h4>NO EXAMS FOUND</h4>
              </>
            ) : showSearchList === null && loadingexamcard ? (
              <LoaderPage />
            ) : (
              props?.examData?.rows?.map((item, index) => {
                return (
                  <ExamLongCard
                    key={index}
                    item={item}
                    setShowSearchList={setShowSearchList}
                    showSearchList={showSearchList}
                  />
                );
              })
            )}
          </div>
        </div>
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
                      className="form-control chat_box_weite_bar"
                      onChange={(e) => {
                        console.log("ff");
                        props?.searchExam(e);
                      }}
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
            <Offcanvas.Body>
              <ExamLeftPage  />
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      </div>
    </>
  );
};

export default ExamRightPage;
