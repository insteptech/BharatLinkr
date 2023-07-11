import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import LoaderPage from "../../../../common-components/loader";

const PopularCourseCard = (props) => {
  const { showList, show, setShowList, cardLevelShow } = props;

  const dispatch = useDispatch();

  const router = useRouter();

  const courseData = useSelector(
    (state) => state?.courseList?.courselist?.data?.rows
  );

  const courselevelData = useSelector(
    (state) => state?.courseList?.courseLevelList?.data?.data?.rows
  );

  const loading = useSelector((state) => state?.allMasterFilterList?.isLoading);

  return (
    <>
      {/* {courseData && courseData.length === 0 ? ( */}
      {loading ? (
        <LoaderPage />
      ) : (
        courseData &&
        courseData?.map((item, index) => {
          return (
            <div key={index}>
              <Card key={item.id} className="p_c_card mobile_card_padding">
                <Row>
                  <Col md={6}>
                    <h6
                      onClick={() => router.push(`/courses/${item.id}`)}
                      className="p_c_card_master_heading align_center mobile_blue_text mobile_font_18"
                    >
                      {item?.courseName}
                    </h6>
                    <div className="experience_row align_center">
                      <p className="time_experience px-0">
                        <Image className="me-1" src="/images/green-squre.svg" />
                        {item?.courseDuration}
                      </p>
                      <p className="time_experience">
                        <Image className="me-1" src="/images/green-squre.svg" />
                        {item?.CourseType?.name}
                      </p>
                    </div>
                    <div className="three_link_row">
                      <p
                        className="p_c_card_three_link"
                        onClick={() => router.push(`/courses/${item.id}`)}
                      >
                        Overview
                        <Image
                          className="ms-1 hide_box"
                          src="/images/right-arrow-svg.svg"
                        />
                      </p>

                      <p
                        className="p_c_card_three_link"
                        onClick={() => router.push("/exams")}
                      >
                        Entrance Exam
                        <Image
                          className="ms-1 hide_box"
                          src="/images/right-arrow-svg.svg"
                        />
                      </p>

                      <p className="p_c_card_three_link">
                        Carrer Options
                        <Image
                          className="ms-1 hide_box"
                          src="/images/right-arrow-svg.svg"
                        />
                      </p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <Row className="long_card_date_row">
                      <Col md={6} xs={6} className="mobile_right_border">
                        <h6 className="p_c_card_fees_heading mobile_font_13">
                          <Image
                            className="me-1 green_red_squre"
                            src="/images/green-squre.svg"
                          />{" "}
                          Average Fees
                        </h6>
                        <p className="p_c_card_fees_value margin_bottom_0">
                          ₹ {item?.averageFees}
                        </p>
                      </Col>
                      <Col md={6} xs={6}>
                        <h6 className="p_c_card_fees_heading mobile_font_13">
                          <Image
                            className="me-1 green_red_squre"
                            src="/images/orange-squre.svg"
                          />{" "}
                          Average Salary
                        </h6>
                        <p className="p_c_card_fees_value margin_bottom_0">
                          ₹ {item?.averageSalary}
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <div
                          onClick={() => router.push("/college")}
                          className="offer_heading_col"
                        >
                          <h6 className="offer_heading hover_link mobile_font_12">
                            {item.offer || "12 Colleges Offering This Course"}
                          </h6>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card>
            </div>
          );
        })
      )}

      {/* ----------------------image card filtered----------------------- */}
      <div>
        {cardLevelShow &&
          courselevelData &&
          courselevelData?.map((item, index) => {
            return (
              <>
                <div key={index}>
                  <Card key={item.id} className="p_c_card">
                    <Row>
                      <Col md={6}>
                        <h6 className="p_c_card_master_heading align_center">
                          {item &&
                          item?.MainStream?.mainStreamName === undefined ? (
                            <p>No data found</p>
                          ) : (
                            item?.courseName
                          )}
                        </h6>
                        <div className="experience_row align_center">
                          <p className="time_experience">
                            <Image src="" />
                            {item?.courseDuration}
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
                              <a className="">
                                Carrer Options
                                <Image className="ms-1" src="" />
                              </a>
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
                              ₹ {item?.averageFees}
                            </p>
                          </Col>
                          <Col md={6} sm={6}>
                            <h6 className="p_c_card_fees_heading">
                              <Image src="" />
                              Average Salary
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
              </>
            );
          })}
      </div>
    </>
  );
};

export default PopularCourseCard;
