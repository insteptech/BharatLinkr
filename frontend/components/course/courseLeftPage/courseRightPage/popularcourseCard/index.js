import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import LoaderPage from "../../../../common-components/loader";

const PopularCourseCard = (props) => {
  const { showList, show, setShow, setShowList, cardLevelShow } = props;

  const router = useRouter();

  const courseData = useSelector(
    (state) => state?.courseList?.courselist?.data?.rows
  );

  const courselevelData = useSelector(
    (state) => state?.courseList?.courseLevelList?.data?.data?.rows
  );

  const loadingFilterlist = useSelector(
    (state) => state?.courseList?.isLoading
  );

  const loading = useSelector((state) => state?.allMasterFilterList?.isLoading);

  return (
    <>
      {showList === null ? (
        loading ? <LoaderPage /> : (
          courseData && courseData.map((item, index) => (
            (
              <div key={index}>
                <Card key={item.id} className="p_c_card mobile_card_padding">
                  <Row>
                    <Col md={6}>
                      <h6 className="p_c_card_master_heading align_center mobile_blue_text mobile_font_18">
                        {item?.courseName}
                      </h6>
                      <div className="experience_row align_center">
                        <p className="time_experience">
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

                        <p className="p_c_card_three_link" onClick={() => { router.push(`/courses/${item.id}/?active=4`) }}>
                          Career Options
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
                            <Image src="/images/green-squre.svg" /> Average Fees
                          </h6>
                          <p className="p_c_card_fees_value margin_bottom_0">
                            ₹ {item?.averageFees}
                          </p>
                        </Col>
                        <Col md={6} xs={6}>
                          <h6 className="p_c_card_fees_heading mobile_font_13">
                            <Image src="/images/orange-squre.svg" /> Average
                            Salary
                          </h6>
                          <p className="p_c_card_fees_value margin_bottom_0">
                            ₹ {item?.averageSalary}
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <div className="offer_heading_col">
                            <h6 className="offer_heading hover_link mobile_font_12">
                              {item.offer || "Colleges Offering This Course"}
                            </h6>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              </div>
            )
          ))
        )
      ) : (
        <>
          {loadingFilterlist ? <LoaderPage /> :
            !showList && courselevelData && courselevelData.map((item, index) => (
              (
                <div key={index}>
                  <Card key={item.id} className="p_c_card mobile_card_padding">
                    <Row>
                      <Col md={6}>
                        <h6 className="p_c_card_master_heading align_center mobile_blue_text mobile_font_18">
                          {item &&
                            item?.MainStream?.mainStreamName === undefined ? (
                            <p>No data found</p>
                          ) : (
                            item?.courseName
                          )}
                        </h6>
                        <div className="experience_row align_center">
                          <p className="time_experience">
                            <Image className="me-1" src="/images/green-squre.svg" />
                            {item?.courseDuration}
                          </p>
                          <p className="time_experience">
                            {item.experienceType || "hardcoded data"}
                          </p>
                        </div>
                        <div className="three_link_row">
                          <p
                            className="p_c_card_three_link"
                            onClick={() =>
                              router.push(`/courses/${item.id}`)
                            }
                          >
                            Overview
                            <Image  className="ms-1 hide_box"
                            src="/images/right-arrow-svg.svg" />
                          </p>
                          <p
                            className="p_c_card_three_link"
                            onClick={() => router.push("/exams")}
                          >
                            Entrance Exam
                            <Image className="ms-1 hide_box"
                            src="/images/right-arrow-svg.svg" />
                          </p>
                          <a className="p_c_card_three_link" onClick={() => { router.push(`/courses/${item.id}/?active=4`) }}>
                            Career Options
                            <Image  className="ms-1 hide_box"
                            src="/images/right-arrow-svg.svg" />
                          </a>

                        </div>
                      </Col>
                      <Col md={6}>
                        <Row className="long_card_date_row">
                          <Col md={6} sm={6}>
                            <h6 className="p_c_card_fees_heading">
                              <Image src="/images/green-squre.svg" />
                              Average Fees
                            </h6>
                            <p className="p_c_card_fees_value">
                              ₹ {item?.averageFees}
                            </p>
                          </Col>
                          <Col md={6} sm={6}>
                            <h6 className="p_c_card_fees_heading">
                              <Image src="/images/orange-squre.svg"  />
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
              )
            ))}
          {loadingFilterlist ? <LoaderPage /> :
            showList && courselevelData && courselevelData.map((item, index) => (
              (
                <div key={index}>
                  <Card key={item.id} className="p_c_card mobile_card_padding">
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
                            <Image className="me-1" src="/images/green-squre.svg" />
                            {item?.courseDuration}
                          </p>
                          <p className="time_experience">
                            {item.experienceType || "hardcoded data"}
                          </p>
                        </div>
                        <div className="three_link_row">
                          <p
                            className="p_c_card_three_link"
                            onClick={() =>
                              router.push(`/courses/${item.id}`)
                            }
                          >
                            Overview
                            <Image className="ms-1 hide_box"
                            src="/images/right-arrow-svg.svg" />
                          </p>
                          <p
                            className="p_c_card_three_link"
                            onClick={() => router.push("/exams")}
                          >
                            Entrance Exam
                            <Image className="ms-1 hide_box"
                            src="/images/right-arrow-svg.svg" />
                          </p>
                          <p className="p_c_card_three_link" onClick={() => { router.push(`/courses/${item.id}/?active=4`) }}>
                            Career Options
                            <Image className="ms-1 hide_box"
                            src="/images/right-arrow-svg.svg" />
                          </p>

                        </div>
                      </Col>
                      <Col md={6}>
                        <Row>
                          <Col md={6} sm={6}>
                            <h6 className="p_c_card_fees_heading">
                              <Image src="/images/green-squre.svg"/>
                              Average Fees
                            </h6>
                            <p className="p_c_card_fees_value">
                              ₹ {item?.averageFees}
                            </p>
                          </Col>
                          <Col md={6} sm={6}>
                            <h6 className="p_c_card_fees_heading">
                              <Image src="/images/orange-squre.svg"  />
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
              )
            ))}
        </>
      )}
    </>
  );
};

export default PopularCourseCard;
