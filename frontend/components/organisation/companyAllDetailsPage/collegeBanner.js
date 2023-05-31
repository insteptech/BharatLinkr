import Image from "next/image";
import React, { memo } from "react";
import { Col, Container, Image as BootImage, Row } from "react-bootstrap";
import { apibasePath } from "../../../config";

function CollegeBanner({ orgdata }) {
  return (
    <Container>
      <Row>
        <Col lg={12}>
          <div className="about_college_hero_banner_base">
            {/* <Image
              className="about_college_hero_banner"
              src="/images/company-4.jpg"
            /> */}
            <Image
              height={400}
              width={100}
              alt=""
              className="about_college_hero_banner"
              src={`${apibasePath}documents/organisation/${orgdata?.companyCover}`}
            />
            <Row className="college_hero_banner_text_div">
              <Col xs={2} className="text-end">
                <Image
                  height={75}
                  width={75}
                  alt="College logo here"
                  className="about_college_hero_logo"
                  src={`${apibasePath}documents/organisation/${orgdata?.companyLogo}`}
                />
              </Col>
              <Col xs={10}>
                <div className="college_hero_banner_right_col">
                  <h4 className="detail_page_college_name ">
                    {orgdata?.companyName}
                  </h4>
                  <div className="college_detail_banner_links_row">
                    <div className="college_detail_banner_links mobile_font_12">
                      <Image
                        width={15}
                        height={15}
                        className="college_detail_banner_links_icon"
                        src="/images/light-location.svg"
                      />
                      {orgdata?.headOffice === true
                        ? `H.O ${orgdata?.States?.state}`
                        : `B.O ${orgdata?.States?.state}`}
                    </div>
                    <div className="college_detail_banner_links mobile_font_12">
                      <Image
                        width={15}
                        height={15}
                        className="college_detail_banner_links_icon"
                        src="/images/light-book.svg"
                      />{" "}
                      {orgdata?.typeOfCompany}
                    </div>
                    <div className="college_detail_banner_links">
                      <Image
                        width={15}
                        height={15}
                        className="college_detail_banner_links_icon"
                        src="/images/light-message.svg"
                      />
                      25 Reviews
                    </div>
                    <div className="college_detail_banner_links">
                      <Image
                        width={15}
                        height={15}
                        className="college_detail_banner_links_icon"
                        src="/images/college-icon.svg"
                      />
                      ESTD {orgdata?.establishedYear}
                    </div>
                    <div className="college_detail_banner_links">
                      <Image
                        width={15}
                        height={15}
                        className="college_detail_banner_links_icon"
                        src="/images/light-star.svg"
                      />
                      {orgdata?.Industry?.name}
                    </div>
                    <div className="college_detail_banner_links">
                      <Image
                        width={15}
                        height={15}
                        className="college_detail_banner_links_icon"
                        src="/images/company-level.svg"
                      />
                      {orgdata?.companyLevel}
                    </div>
                    <div className="college_detail_banner_links">
                      <Image
                        width={15}
                        height={15}
                        className="college_detail_banner_links_icon"
                        src="/images/light-star.svg"
                      />
                      {orgdata?.natureOfBuisness}
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <div className="marquee_row d-flex">
        {/* <Row> */}
        {/* <Col className="pe-0"> */}
        <h6 className="announcement_title mobile_font_14">Announcement</h6>
        {/* </Col> */}
        {/* <Col xs={10} className="ps-0"> */}
        <marquee
          className="college_banner_marquee_text mobile_font_12"
          width="100%"
          direction="left"
        >
          Announcement will show here announcement will show here | Announcement
          Will Show Here Announcement
        </marquee>
        {/* </Col> */}
        {/* </Row> */}
      </div>
    </Container>
  );
}

export default memo(CollegeBanner);
