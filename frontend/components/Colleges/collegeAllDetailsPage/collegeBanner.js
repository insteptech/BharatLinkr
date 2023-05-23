import React, { memo } from "react";
import { Col, Container, Image as Bootimg, Row } from "react-bootstrap";
import { apibasePath } from "../../../config";
import Image from "next/image";

function CollegeBanner(props) {
  return (
    <Container>
      <Row>
        <Col lg={12}>
          {props?.collegeDetails?.map((item, index) => {
            console.log(item, "Sdfsdfsdfsd");
            return (
              <div className="about_college_hero_banner_base" key={index}>
                <Image
                  height={237}
                  width={1185}
                  className="about_college_hero_banner"
                  src={`${apibasePath}documents/college/${item?.collegeLogo}`}
                />
                <Row className="college_hero_banner_text_div">
                  <Col xs={2} className="text-end">
                    <Bootimg
                      className="about_college_hero_logo"
                      src="/images/cover-bg.jpg"
                    />
                  </Col>
                  <Col xs={10}>
                    <div className="college_hero_banner_right_col">
                      <h4 className="detail_page_college_name">
                        {item?.collegeName}
                      </h4>
                      <div className="college_detail_banner_links_row">
                        <p className="college_detail_banner_links">
                          <Bootimg
                            className="college_detail_banner_links_icon"
                            src="/images/light-location.svg"
                          />
                          {item?.Cities?.name} , {item?.States?.state}
                        </p>
                        <p className="college_detail_banner_links">
                          <Bootimg
                            className="college_detail_banner_links_icon"
                            src="/images/light-book.svg"
                          />{" "}
                          {item?.Approval?.name}
                        </p>
                        <p className="college_detail_banner_links">
                          <Bootimg
                            className="college_detail_banner_links_icon"
                            src="/images/light-message.svg"
                          />
                          25 Reviews
                        </p>
                        <p className="college_detail_banner_links">
                          <Bootimg
                          width={16}
                            className="college_detail_banner_links_icon"
                            src="/images/college-icon.svg"
                          />
                          {item.collegeEstablishedDate}
                        </p>
                        <p className="college_detail_banner_links">
                          <Bootimg
                            className="college_detail_banner_links_icon"
                            src="/images/light-star.svg"
                          />
                          Ranked 0 by
                        </p>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            );
          })}
        </Col>
      </Row>
      <div className="marquee_row d-flex">
        <h6 className="announcement_title mobile_font_14">Announcement</h6>
        <marquee
          className="college_banner_marquee_text mobile_font_14"
          width="97%"
          direction="left"
        >
          Announcement will show here announcement will show here | Announcement
          Will Show Here Announcement
        </marquee>
      </div>
    </Container>
  );
}

export default memo(CollegeBanner);
