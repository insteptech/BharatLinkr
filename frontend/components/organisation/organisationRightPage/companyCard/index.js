import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import {
  Button,
  Card,
  Col,
  Image as BootImage,
  Form,
  Row,
} from "react-bootstrap";
import { apibasePath } from "../../../../config";

const companyCardData = [
  {
    id: 1,
    companyImg: "/images/company-1.png",
    companyName: "Tata Consultancy Services",
    likes: 480,
    addUser: 56,
    share: 234,
    post: 65,
    employes: 1.2,
    internship: 1.2,
    jobs: 765,
    jobTitle: "39 office location",
    jobLocation: "Dera Bassi, Punjab",
    eligibility: "B.tech",
    experience: 4,
  },
  {
    id: 2,
    // companyImg: "/images/company.jpg",
    companyName: "Tata Consultancy Services",
    likes: 480,
    addUser: 56,
    share: 234,
    post: 65,
    // employes: 1.2,
    internship: 1.2,
    // jobs: 765,
    jobTitle: "39 office location",
    jobLocation: "Dera Bassi, Punjab",
    // eligibility: "B.tech",
    experience: 4,
  },
  {
    id: 3,
    companyImg: "/images/company-2.jpg",
    companyName: "Tata Consultancy Services",
    likes: 480,
    addUser: 56,
    share: 234,
    post: 65,
    employes: 1.2,
    internship: 1.2,
    jobs: 765,
    jobTitle: "39 office location",
    jobLocation: "Dera Bassi, Punjab",
    eligibility: "B.tech",
    experience: 4,
  },
  {
    id: 4,
    companyImg: "/images/company.jpg",
    companyName: "Tata Consultancy Services",
    likes: 480,
    addUser: 56,
    share: 234,
    post: 65,
    employes: 1.2,
    internship: 1.2,
    jobs: 765,
    jobTitle: "39 office location",
    jobLocation: "Dera Bassi, Punjab",
    eligibility: "B.tech",
    experience: 4,
  },
];

function CompanyCard({ data, dataValue }) {
  const router = useRouter();
  const [changePassword, setChangePassword] = useState(true);
  const changeIcon = changePassword === true ? false : true;

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
        <Card key={data?.id} className="p_c_card mt-5 purpal_border white_bg">
          <Row>
            <Col xl={7}>
              <div className="org_card_top_row">
                <div
                  onClick={() => router.push("/organisation/companyDetails")}
                  className="me-3 mb-2 "
                >
                  <Image
                    height={75}
                    width={75}
                    className="hide_img"
                    alt=""
                    src={`${apibasePath}documents/organisation/${data?.companyLogo}`}
                  />
                </div>
                <div className="w-100">
                  <h5 className="p_c_card_master_heading  mobile_blue_text mobile_font_18">
                    {data?.companyName
                      ? data?.companyName
                      : "Tata Consultancy Services"}
                  </h5>
                  <div className="d-flex">
                    <div className="like_comment_row">
                      <div className="media_icon_num_pair right_border ps-0">
                        <div
                          onClick={() => {
                            setChangePassword(changeIcon);
                          }}
                        >
                          {changeIcon ? (
                            <Image
                              width={20}
                              height={20}
                              className="media_icons"
                              src="/images/blue-like.png"
                            />
                          ) : (
                            <Image
                              width={20}
                              height={20}
                              className="media_icons"
                              src="/images/border-like.svg"
                            />
                          )}
                        </div>

                        <h6 className="course_detail_name font_12">
                          {data?.likes ? data?.likes : "00"}
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
                          {data?.addUser ? data?.addUser : "00"}
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
                          {data?.share ? data?.share : "00"}
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
                          {data?.post ? data?.post : "00"}
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
                      {data?.employes ? data?.employes : "_ _"}L
                    </h6>
                  </Col>
                  <Col className="p-0 p_c_card_fees_heading text-center">
                    <h6 className="p_c_card_fees_heading">
                      {data?.internship ? data?.internship : "_ _"}L
                    </h6>
                  </Col>
                  <Col className="p-0 p_c_card_fees_heading text-center">
                    <h6 className="p_c_card_fees_heading">
                      {data?.jobs ? data?.jobs : "_ _ _"}
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
          <Row className="job_title_row">
            {dataValue == 3 ? (
              ""
            ) : (
              <Col xl={9} className="job_title_col">
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
                      {data?.jobTitle ? data?.jobTitle : "_ _ _"}
                    </p>
                  </Col>
                  <Col className="p-0 text-center">
                    <p className="p_c_card_fees_value mb_0">
                      {data?.jobLocation ? data?.jobLocation : "_ _ _"}
                    </p>
                  </Col>
                  <Col className="p-0 text-center">
                    <p className="p_c_card_fees_value mb_0">
                      {data?.eligibility ? data?.eligibility : "_ _ _"}
                    </p>
                  </Col>
                  <Col className="p-0 text-center">
                    <p className="p_c_card_fees_value mb_0">
                      {data?.experience ? data?.experience : "_ "}+ Year
                    </p>
                  </Col>
                </Row>
              </Col>
            )}

            <Col xl={3} className="text-end">
              <div className="view_btn_div">
                <Button
                  className="view_and_apply_btn view_and_apply_btn_mobile"
                  onClick={() =>
                    router.push(`/organisation/companyDetails/${data?.id}`)
                  }
                >
                  View & Apply
                  <BootImage
                    className="blue_right_arrow green_right_arrow"
                    src="/images/right-blue-arrow.svg"
                  />
                </Button>
              </div>
            </Col>
          </Row>
        </Card>
      </>
    </>
  );
}

export default CompanyCard;
