import { useRouter } from "next/router";
import React from "react";
import { Card, Col, Image as BsImage, Row } from "react-bootstrap";
import { apibasePath } from "../../../../config";
import { useSelector } from "react-redux";
import Image from "next/image";

const ExamLongCard = ({ item }, props) => {
  const {
    showSearchList,
    setShowSearchList,
    ShowList,
    setShowList,
    setCardLevelShow,
  } = props;

  const router = useRouter();

  const examSearchlist = useSelector(
    (state) => state?.examList?.examSearchList
  );

  const handleMainStreamExamName = (item) => {
    dispatch(
      filterExamByStreamCourse({
        mainStreamId: item?.mainStreamId,
        entranceExamId: item?.entranceExamId,
      })
    );

    if (item?.mainStreamName === "") {
      setShowList(false);
      setCardLevelShow(false);
    } else {
      setShowList(true);
      setCardLevelShow(false);
    }
  };

  let x = item?.examName.split("(")

  let shortName = x[0]
  let longName = x[1].split(")")[0]


  return (
    <Card
      key={props?.key ? props.key : item.id}
      className="p_c_card mobile_card_padding"
    >
      <div className="d-flex">
        <Image
          height={60}
          width={60}
          className="profile-pic img-fluid hide_img"
          // src="/images/cover-bg.jpg"
          src={
            item?.examLogo
              ? `${apibasePath}documents/exam/${item?.examLogo}`
              : "images/no-profile.png"
          }
        />
        <Card.Body className="pt-0 pb-0">
          <Row>
            <Col md={5} xs={12} className="exam_card_m_p">
              <h4
                className="p_c_card_master_heading mobile_blue_text mobile_font_18"
                onClick={() => handleMainStreamExamName(item)}
              >
                {shortName}
              </h4>
              <h6 className="long_card_sub_heading mobile_font_12">
                {longName}
              </h6>
              <h6 className="long_card_sub_heading blue_font mobile_font_12">
                {item?.CollegeCount} Colleges Accepting this Exam
              </h6>
              <div className="long_card_arrow_links">
                <p
                  className="arrow_links_name mobile_font_13 mobile_right_border mobile_blue_text"
                  onClick={() => router.push(`/exams/overview/${item?.id}/?active=about`)}
                >
                  Overview
                  <BsImage
                    className="ms-1 hide_box"
                    src="/images/right-arrow-svg.svg"
                  />
                </p>
                <p
                  className="arrow_links_name mobile_font_13 mobile_right_border mobile_blue_text text-center"
                  onClick={() => router.push(`/exams/overview/${item?.id}/?active=syllabus`)}
                >
                  Syllabus
                  <BsImage
                    className="ms-1 hide_box"
                    src="/images/right-arrow-svg.svg"
                  />
                </p>
                <p
                  className="arrow_links_name mobile_font_13 mobile_blue_text text-end"
                  onClick={() => router.push(`/exams/overview/${item?.id}/?active=exampattern`)}
                >
                  Exam Pattern
                  <BsImage
                    className="ms-1 hide_box"
                    src="/images/right-arrow-svg.svg"
                  />
                </p>
              </div>
            </Col>
            <Col md={7} className="exam_card_m_p">
              <div className="long_card_date_row">
                <div className="mobile_right_border date_center">
                  <h4 className="date_row_name me-4 mobile_font_13">
                    <div className="card-shape">
                      <i className="color-box-green"></i>
                    </div>
                    Application Date
                  </h4>
                  <p className="card_date_value">
                    {item.examApplicationDate}
                    {/* 10 May 22-17 May 22 */}
                  </p>
                </div>
                <div className="mobile_right_border date_center">
                  <h4 className="date_row_name me-4 mobile_font_13">
                    <div className="card-shape">
                      <i className="color-box-green"></i>
                    </div>
                    Exam Date
                  </h4>
                  <p className="card_date_value">
                    {item.examDate}
                    {/* 23 Jan 22 */}
                  </p>
                </div>
                <div className="date_center">
                  <h4 className="date_row_name me-4 mobile_font_13">
                    <div className="card-shape">
                      <i className="color-box-green"></i>
                    </div>
                    Result Date
                  </h4>
                  <p className="card_date_value">
                    {item?.resultAnnouncementDate}
                  </p>
                </div>
              </div>

              <div className="long_card_btn">
                <button className="update_btn" type="button">
                  Get Updates
                </button>
                <button className="update_btn apply_btn" type="button">
                  How to Apply
                </button>
              </div>
            </Col>
          </Row>
          {/* <Row>
            <Col md={12}>
              <div className="long_card_btn">
                <button className="update_btn" type="button">
                  Get Updates
                </button>
                <button className="update_btn apply_btn" type="button">
                  How to Apply
                </button>
              </div>
            </Col>
          </Row> */}
        </Card.Body>
      </div>
    </Card>
  );
};

export default ExamLongCard;
