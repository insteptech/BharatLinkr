import React, { memo, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";

const reviewcardData = [
  {
    id: 1,
    profileImg: "/images/cover-bg.jpg",
    cardName: "Noor Fatima",
    enrolment: "Enrolled 2021",
    course: "BS",
    date: "July 29,2022",
    rating: 3.4,
    title: " Review title for the review",
    paira:
      " Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diamnonumy eirmod tempor invidunt ut labore et dolore magna aliquyamerat, sed diam voluptua. At vero eos et accusam et justo duodolores lorem ipsum",
  },
  {
    id: 1,
    // profileImg: "/images/cover-bg.jpg",
    cardName: "Noor Fatima",
    enrolment: "Enrolled 2021",
    course: "Bachelor of Science",
    date: "July 29,2022",
    rating: 3.4,
    title: " Review title for the review",
    paira:
      " Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diamnonumy eirmod tempor invidunt ut labore et dolore magna aliquyamerat, sed diam voluptua. At vero eos et accusam et justo duodolores lorem ipsum",
  },
  {
    id: 1,
    profileImg: "/images/cover-bg.jpg",
    cardName: "Noor Fatima",
    enrolment: "Enrolled 2021",
    course: "Bachelor of Science",
    date: "July 29,2022",
    rating: 3.4,
    title: " Review title for the review",
    paira:
      " Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diamnonumy eirmod tempor invidunt ut labore et dolore magna aliquyamerat, sed diam voluptua. At vero eos et accusam et justo duodolores lorem ipsum",
  },
];

function ReviewsTab() {
  // --------read-more-start----------------
  const [num, setNum] = useState(120);

  const [title, setTitle] = useState("...Read More");

  const handleSeeMore = (item) => {
    if (title === "...Read More") {
      setNum(item.paira.length);
      setTitle("...Read Less");
    } else {
      setNum(120);
      setTitle("...Read More");
    }
  };
  // --------read-more-end----------------
  return (
    <>
      <Container className=" review_container_padding">
        <Row className="review_top_row">
          <Col md={6} xs={6} className="text-start">
            <h4 className="review_heading mobile_font_14">Company Rating</h4>
          </Col>
          <Col md={6} xs={6} className="text-end">
            <h4 className="review_number mobile_font_14">3.4/4</h4>
          </Col>
        </Row>
        <Row className="review_top_row">
          <Col md={6} xs={6}>
            <p className="review_found mobile_font_12">03 Reviews Found</p>
          </Col>
          <Col md={6} xs={6} className="text-end">
            <div className="">
              <Image className="rating_icon" src="/images/rating-icon1.png" />
              <Image className="rating_icon" src="/images/rating-icon2.svg" />
              <Image className="rating_icon" src="/images/rating-icon3.svg" />
              <Image className="rating_icon" src="/images/rating-icon4.svg" />
            </div>
          </Col>
        </Row>
        {/* ---------------------------------review-card-start------------------------------ */}

        {reviewcardData &&
          reviewcardData?.map((item) => {
            return (
              <>
                <div key={item.id} className=" review_card_padding">
                  <Row>
                    {/* <Col xs={1}>
                      <div className="me-2 mt-1">
                        <img
                          className="suggested_card_profile card_pro_img"
                          src={
                            item.profileImg
                              ? item.profileImg
                              : "/images/no-profile.png"
                          }
                        />
                      </div>
                    </Col> */}
                    <Col lg={12}>
                      <div className="d-flex">
                        <div className="me-2 mt-1">
                          <img
                            className="suggested_card_profile card_pro_img"
                            src={
                              item.profileImg
                                ? item.profileImg
                                : "/images/no-profile.png"
                            }
                          />
                        </div>
                        <div className="w-100">
                          <div className="review_card_name_div">
                            <h5 className="review_card_name mobile_font_14">
                              {item.cardName}
                            </h5>
                            <h5 className="review_number mobile_font_14">
                              <Image
                                className="me-2 mb-1"
                                src="/images/yellow-star.svg"
                              />
                              {item.rating}/4
                            </h5>
                          </div>
                          <div className="d-flex">
                            <p className="card_gray_text mobile_font_10">
                              {item.enrolment}
                            </p>
                            <p className="card_gray_text mobile_font_10">
                              <Image
                                className="me-2 mb-1"
                                src="/images/convo-hat.svg"
                              />
                              {item.course}
                            </p>
                            <p className="card_gray_text mobile_font_10">
                              <Image
                                className="me-1 mb-1"
                                src="/images/ios-time.png"
                              />
                              {item.date}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Col>
                    {/* <Col lg={4} className="text-end">
                      <h5 className="review_number">
                        <Image
                          className="me-2 mb-1"
                          src="/images/yellow-star.svg"
                        />
                        {item.rating}/4
                      </h5>
                    </Col> */}
                  </Row>

                  <div className="card-body text-dark">
                    <h5 className="review_card_text_title mobile_font_14">{item.title}</h5>
                    {/* <p className="review_card_text_paira">{item.paira}</p> */}
                    <div className="">
                      <p className="review_card_text_paira mobile_font_12">
                        {item.paira.slice(0, num)}
                        <span onClick={() => handleSeeMore(item)}>{title}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </>
            );
          })}

        {/* ---------------------------------review-card-end------------------------------ */}
      </Container>
    </>
  );
}

export default memo(ReviewsTab);
