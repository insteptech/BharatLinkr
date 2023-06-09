import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  Button,
  Card,
  Col,
  Image as BootImage,
  Form,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { apibasePath } from "../../../../config";
import {
  companyLike,
  companyLikeslist,
  getOrganisationlist,
} from "../../../../redux/actions/organisation/addorganisation";
import { getTokenDecode, isUserLogined } from "../../../utils";

function CompanyCard({ setModalShow }) {
  const [likesHandler, setLikesHandler] = useState([])

  const isloggedin = isUserLogined();
  const dispatch = useDispatch();
  const router = useRouter();

  const orgList = useSelector((state) => state?.sectorData?.organisationList);
  const orgLikedList = useSelector((state) => state?.sectorData?.orglikedlist);

  const handleLikes = (id, value) => {
    if (isloggedin) {
      dispatch(
        companyLike({
          userId: getTokenDecode().userId,
          organisationId: id,
          update: value,
        })
      ).then((res) => {
        if (res?.payload?.data?.success) {
          // dispatch(companyLikeslist(getTokenDecode().userId));
          // dispatch(getOrganisationlist());
        }
      });
      let index
      likesHandler.map((item, i) => {
        if (item?.id === id) {
          index = i
        }
      })
      let x = likesHandler.filter((item) => item.id === id)
      if (index !== undefined) {
        let y = [...likesHandler]
        if (x[0].state == value) {
          y[index] = { id: x[0].id, state: value }
        } else {
          y.splice(index, 1)
        }
        setLikesHandler(y)
      } else {
        setLikesHandler(
          [...likesHandler,
          {
            id: id,
            state: value
          }
          ]
        )
      }
    } else {
      setModalShow(true);
    }
  };

  
  useEffect(() => {
    if (isloggedin) {
      dispatch(companyLikeslist(getTokenDecode().userId));
    }
    dispatch(getOrganisationlist());
  }, []);

  return (
    <>
      {/* <div className="dropdown_row">
              <ScrollingCarousel show={5.5} slide={4} swiping={true}>
                <Form.Select aria-label="Default select example">
                  <option>Status</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
                <Form.Select aria-label="Default select example">
                  <option>Type</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
                <Form.Select aria-label="Default select example">
                  <option>Ellgibillty</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
                <Form.Select aria-label="Default select example">
                  <option>Status</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
                <Form.Select aria-label="Default select example">
                  <option>Location</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
                <Form.Select aria-label="Default select example">
                  <option>value</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
                <Form.Select aria-label="Default select example">
                  <option>Status</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </ScrollingCarousel>
            </div> */}
      <>
        {orgList?.rows?.map((item, index) => {
          let isliked = orgLikedList.find((i) => {
            if (item.id === i.categoryId) {
              return true;
            }
          });
          let stateLike = likesHandler.filter((ele) => ele.id === item.id)
          return (
            <Card key={index} className="p_c_card mt-5 purpal_border white_bg">
              <Row>
                <Col xl={7}>
                  <div className="org_card_top_row">
                    <div
                      onClick={() =>
                        router.push("/organisation/companyDetails")
                      }
                      className="me-3 mb-2"
                    >
                      <Image
                        height={75}
                        width={75}
                        className="hide_img"
                        alt=""
                        src={`${apibasePath}documents/organisation/${item?.companyLogo}`}
                      />
                    </div>
                    <div className="w-100">
                      <h5 className="p_c_card_master_heading  mobile_blue_text mobile_font_18">
                        {item?.OrganisationCompany?.companyName}
                      </h5>
                      <div className="d-flex">
                        <div className="like_comment_row">
                          <div className="media_icon_num_pair right_border ps-0">
                            <div>
                              <Image
                                width={20}
                                height={20}
                                className="media_icons"
                                onClick={() => {
                                  if (stateLike.length > 0) {
                                    if (stateLike[0].state === 'likes') {
                                      handleLikes(item?.id, "dislikes");
                                    } else {
                                      handleLikes(item?.id, "likes");
                                    }
                                  } else {
                                    if (isliked) {
                                      handleLikes(item?.id, "dislikes");
                                    } else {
                                      handleLikes(item?.id, "likes");
                                    }
                                  }
                                }}
                                src={stateLike.length > 0 ?
                                  stateLike[0].state === 'likes'
                                    ? "/images/blue-like.png"
                                    : "/images/border-like.svg"
                                  :
                                  isliked
                                    ? "/images/blue-like.png"
                                    : "/images/border-like.svg"
                                }
                              />
                            </div>

                            <h6 className="course_detail_name font_12">
                              {stateLike.length > 0
                                ? stateLike[0].state === 'likes'
                                && item?.LikesCount[0]?.likes + 1 ||
                                stateLike[0].state === "dislikes"
                                && item?.LikesCount[0]?.likes - 1
                                : (item?.LikesCount[0]?.likes ? item?.LikesCount[0]?.likes :0) }
                            </h6>
                          </div>
                          <div className="media_icon_num_pair right_border">
                            <Image
                              width={20}
                              height={20}
                              className="media_icons"
                              src="/images/border-add-user.svg"
                            />
                            <h6 className="course_detail_name font_12">
                              {item?.addUser ? item?.addUser : "00"}
                            </h6>
                          </div>
                          <div className="media_icon_num_pair right_border ">
                            <Image
                              width={20}
                              height={20}
                              className="media_icons"
                              src="/images/border-share.svg"
                            />
                            <h6 className="course_detail_name font_12 ">
                              {item?.share ? item?.share : "00"}
                            </h6>
                          </div>

                          <div className="media_icon_num_pair">
                            <Image
                              width={17}
                              height={20}
                              className="media_icons"
                              src="/images/border-post.svg"
                            />
                            <h6 className="course_detail_name font_12">
                              {item?.post ? item?.post : "00"}
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xl={5} className="text-end">
                  <div className="mt-2">
                    <Row>
                      <Col className="p-0 p_c_card_fees_heading text-center">
                        <h6 className="p_c_card_fees_heading">
                          {item?.employes ? item?.employes : "_ _"}L
                        </h6>
                      </Col>
                      <Col className="p-0 p_c_card_fees_heading text-center">
                        <h6 className="p_c_card_fees_heading">
                          {item?.internship ? item?.internship : "_ _"}L
                        </h6>
                      </Col>
                      <Col className="p-0 p_c_card_fees_heading text-center">
                        <h6 className="p_c_card_fees_heading">
                          {item?.jobs ? item?.jobs : "_ _ _"}
                        </h6>
                      </Col>
                    </Row>
                    <Row className="d-flex">
                      <Col className="p-0 text-center">
                        <p className="p_c_card_fees_value">Employes</p>
                      </Col>
                      <Col className="p-0 text-center">
                        <p className="p_c_card_fees_value">Internship</p>
                      </Col>
                      <Col className="p-0 text-center">
                        <p
                          className="p_c_card_fees_value job_link hover_link"
                          onClick={() => router.push("/")}
                        >
                          Jobs
                        </p>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
              <div className="mt-2">
                <Row className="job_title_row">
                  {/* <Col xl={9} className="job_title_col">
                    <Row>
                      <Col className="p-0 text-center">
                        <h6 className="p_c_card_fees_heading mobile_font_12">
                          Job Title
                        </h6>
                      </Col>
                      <Col className="p-0 text-center">
                        <h6 className="p_c_card_fees_heading mobile_font_12">
                          Job location
                        </h6>
                      </Col>
                      <Col className="p-0 text-center">
                        <h6 className="p_c_card_fees_heading mobile_font_12">
                          Eligibility
                        </h6>
                      </Col>
                      <Col className="p-0 text-center">
                        <h6 className="p_c_card_fees_heading mobile_font_12">
                          Experience
                        </h6>
                      </Col>
                    </Row>
                    <Row className="d-flex m_m_bottom">
                      <Col className="p-0 text-center">
                        <p className="p_c_card_fees_value mb_0">
                          {item?.jobTitle ? item?.jobTitle : "  _"}
                        </p>
                      </Col>
                      <Col className="p-0 text-center">
                        <p className="p_c_card_fees_value mb_0">
                          {item?.jobLocation ? item?.jobLocation : "  _"}
                        </p>
                      </Col>
                      <Col className="p-0 text-center">
                        <p className="p_c_card_fees_value mb_0">
                          {item?.eligibility ? item?.eligibility : "  _"}
                        </p>
                      </Col>
                      <Col className="p-0 text-center">
                        <p className="p_c_card_fees_value mb_0">
                          {item?.experience ? item?.experience : "_ "}+ Year
                        </p>
                      </Col>
                    </Row>
                  </Col> */}
                  <Col xl={3} className="text-end">
                    <div className="view_btn_div">
                      <Button
                        className="view_and_apply_btn view_and_apply_btn_mobile"
                        onClick={() =>
                          router.push(
                            `/organisation/companyDetails/${item?.id}`
                          )
                        }
                      >
                        View & Apply
                        <Image
                          width={16}
                          height={16}
                          className="blue_right_arrow green_right_arrow"
                          src="/images/yellow-arrow.svg"
                        />
                      </Button>
                    </div>
                  </Col>
                </Row>
              </div>
            </Card>
          );
        })}
      </>
    </>
  );
}

export default CompanyCard;
