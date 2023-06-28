import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Card, Col, Image, Offcanvas, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CourseLeftPage from "..";
import { getCourse } from "../../../../redux/actions/course/addcourse";
import { getAllMasterFilter } from "../../../../redux/actions/masterfilter/createmasterfilter";
import LevelCard from "./levelCard";
import PopularCourseCard from "./popularcourseCard";
import LoaderPage from "../../../common-components/loader";

const streamData = [
  {
    itemName: "Hello",
    itemCount: 12,
    courseItem: "B.ed",
  },
  {
    itemName: "notification",
    itemCount: 125,
    courseItem: "B.tech",
  },
  {
    itemName: "extra",
    itemCount: 124,
    courseItem: "B.ed",
  },
  {
    itemName: "technology",
    itemCount: 123,
    courseItem: "Bba",
  },
  {
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

const CourseRightPage = (props) => {
  const { show, filteredId } = props;
  const [showList, setShowList] = useState(null);
  const [cardLevelShow, setCardLevelShow] = useState(null);
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const dispatch = useDispatch();

  const router = useRouter();

  const searchCourseList = useSelector(
    (state) => state?.courseList?.searchCourseList?.data?.data?.rows
  );

  useEffect(() => {
    dispatch(getAllMasterFilter("courselevel"));
    dispatch(getCourse());
  }, []);

  const filterMainStreamDetails = useSelector(
    (state) => state?.courseList?.filterMainstreamlist?.data?.data?.rows
  );

  const loadingFilterlist = useSelector(
    (state) => state?.courseList?.isLoading
  );

  return (
    <>
      {show === null && (
        <div className="">
          <Row>
            <Col md={12} className="text-center">
              <h2 className="edit_profile_h2 mobile_margin_bottom">
                Choose by your level
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
                    onChange={(e) => {
                      props?.searchCourse(e);
                    }}
                    className="form-control chat_box_weite_bar"
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
          <div className="mobile_margin_bottom">
            <LevelCard
              showList={showList}
              setShowList={setShowList}
              cardLevelShow={cardLevelShow}
              setCardLevelShow={setCardLevelShow}
            />
          </div>
          <Row>
            <Col md={12} className="text-center ">
              <h2 className="edit_profile_h2">
                list of popular courses in india
              </h2>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <PopularCourseCard
                show={show}
                showList={showList}
                setShowList={setShowList}
                cardLevelShow={cardLevelShow}
                setCardLevelShow={setCardLevelShow}
              />
            </Col>
          </Row>
        </div>
      )}

      {/* ----------------------search filter----------------------- */}
      {show && (
        <div className="">
          {searchCourseList &&
            searchCourseList?.map((item, index) => {
              return (
                <div key={index}>
                  <Card key={item.id} className="p_c_card">
                    <Row>
                      <Col md={6}>
                        <h6 className="p_c_card_master_heading align_center">
                          {item?.courseName}
                        </h6>
                        <div className="experience_row align_center">
                          <p className="time_experience">
                            <Image src="/images/green-squre.svg" />{" "}
                            {item?.courseDuration}
                          </p>
                          <p className="time_experience">
                            <Image src="/images/green-squre.svg" />{" "}
                            {item.experienceType || "hardcoded data"}
                          </p>
                        </div>
                        <div className="mt-3">
                          <Row>
                            <Col md={4} sm={4} className="align_center">
                              <p
                                className="p_c_card_three_link"
                                onClick={() =>
                                  router.push(`/courses/${item.id}`)
                                }
                              >
                                Overview
                                <Image
                                  className="ms-1"
                                  src="/images/right-arrow-svg.svg"
                                />
                              </p>
                            </Col>
                            <Col md={4} sm={4} className="align_center">
                              <p
                                className="p_c_card_three_link"
                                onClick={() => router.push("/exams")}
                              >
                                Entrance Exam
                                <Image
                                  className="ms-1"
                                  src="/images/right-arrow-svg.svg"
                                />
                              </p>
                            </Col>
                            <Col md={4} sm={4} className="align_center">
                              <a className="p_c_card_three_link">
                                Carrer Options
                                <Image
                                  className="ms-1"
                                  src="/images/right-arrow-svg.svg"
                                />
                              </a>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                      <Col md={6}>
                        <Row>
                          <Col md={6} sm={6}>
                            <h6 className="p_c_card_fees_heading">
                              <Image src="/images/green-squre.svg" /> Average
                              Fees
                            </h6>
                            <p className="p_c_card_fees_value">
                              ₹ {item?.averageFees}
                            </p>
                          </Col>
                          <Col md={6} sm={6}>
                            <h6 className="p_c_card_fees_heading">
                              <Image src="/images/orange-squre.svg" /> Average
                              Salary
                            </h6>
                            <p className="p_c_card_fees_value">
                              ₹ {item?.averageSalary}
                            </p>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={12}>
                            <div className="offer_heading_col">
                              <h6 className="offer_heading">
                                {item.offer || "hardcoded data"}
                              </h6>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Card>
                </div>
              );
            })}
        </div>
      )}

      {/* ----------------------choose by dream----------------------- */}
      <div>
        {show && loadingFilterlist ? (
          <LoaderPage />
        ) : (
          filterMainStreamDetails &&
          filterMainStreamDetails?.map((item, index) => {
            return (
              <>
                <div key={index}>
                  <Card key={item.id} className="p_c_card">
                    <Row>
                      <Col md={6}>
                        <h6 className="p_c_card_master_heading align_center">
                          {item &&
                          item?.MainStream?.mainStreamName === undefined ? (
                            <p>No data-found</p>
                          ) : (
                            item?.courseName
                          )}
                        </h6>
                        <div className="experience_row align_center">
                          <p className="time_experience">
                            <Image src="" />
                            {item?.courseDuration || "hardcoded data"}
                          </p>
                          <p className="time_experience">
                            {item.experienceType || "hardcoded data"}
                          </p>
                        </div>
                        <div className="mt-3">
                          <Row>
                            <Col md={4} sm={4} className="align_center">
                              <p
                                className="p_c_card_three_link"
                                onClick={() =>
                                  router.push(`/courses/${item.id}`)
                                }
                              >
                                Overview
                                <Image className="ms-1" src="" />
                              </p>
                            </Col>
                            <Col md={4} sm={4} className="align_center">
                              <p
                                className="p_c_card_three_link"
                                onClick={() => router.push("/exams")}
                              >
                                Entrance Exam
                                <Image className="ms-1" src="" />
                              </p>
                            </Col>
                            <Col md={4} sm={4} className="align_center">
                              <p className="p_c_card_three_link">
                                Carrer Options
                                <Image
                                  className="ms-1"
                                  src="/images/right-arrow-svg.svg"
                                />
                              </p>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                      <Col md={6}>
                        <Row>
                          <Col md={6} sm={6}>
                            <h6 className="p_c_card_fees_heading">
                              <Image src="" />
                              Average Fees
                            </h6>
                            <p className="p_c_card_fees_value">
                              ₹ {item?.averageFees || 1000}
                            </p>
                          </Col>
                          <Col md={6} sm={6}>
                            <h6 className="p_c_card_fees_heading">
                              <Image src="" />
                              Average Salary
                            </h6>
                            <p className="p_c_card_fees_value">
                              ₹ {item?.averageSalary || 1000}
                            </p>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={12}>
                            <div className="offer_heading_col">
                              <h6 className="offer_heading">
                                {item.offer || "hardcoded data"}
                              </h6>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Card>
                </div>
              </>
            );
          })
        )}
      </div>
      <div className="">
        {/* <button
          className="mobile_footer_btn"
          variant="primary"
          onClick={handleShow1}
        >
          <img src="/images/study_goals.png" />
          Courses Found
        </button> */}

        <Offcanvas
          placement={"bottom"}
          show={show1}
          onHide={handleClose1}
          className="offcanvas_container gray_bg"
        >
          <Offcanvas.Header className="pb-1">
            <Offcanvas.Title>
              <form>
                <div className="profile_search_bar_col ">
                  <div className="search_profile_search_bar mb-0">
                    <input
                      type="text"
                      placeholder="Search by name..."
                      // onChange={(e) => {
                      //   props?.searchCourse(e);
                      // }}
                      className="form-control chat_box_weite_bar"
                    />
                    <button type="submit">
                      <img src="/images/search.png" />
                    </button>
                  </div>
                </div>
              </form>
            </Offcanvas.Title>
            <button className="chat_box_close_btn" onClick={handleClose1}>
              <img src="/images/cross-icon.svg" />
            </button>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <CourseLeftPage />
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  );
};

export default CourseRightPage;
