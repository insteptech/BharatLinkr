import { concat } from "final-form-arrays";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Image as BootImage, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { apibasePath } from "../../../config";
import Image from "next/image";
import CollegeShareModal from "../../modals/collegesharemodal";
import { CollegeLikes, CollegeLikesList, getColleges } from "../../../redux/actions/college/college";
import { getTokenDecode } from "../../utils";

import { toast } from "react-toastify";

export const cardData = [
  {
    id: 1,
    collegeImg: "/images/cover-bg.jpg",
    collegelogo: "/images/",
    collegeName:
      "Ram devi university institute of science, arts, paramedical...",
    location: "Coimbatore,Tamil Nadu",
    ugcName: "ugc",
    course: "B.ed",
    fees: "63000",
    exams: "AKNUCET",
    ranked: "0 by",
    like: "640",
    adduser: "12",
    share: "125",
    post: "56",
  },
  {
    id: 2,
    collegeName:
      "Ram devi university institute of science, arts, paramedical...",
    location: "Coimbatore,Tamil Nadu",
    ugcName: "ugc",
    course: "B.ed",
    fees: "63000",
    exams: "AKNUCET",
    ranked: "0 by",
    like: "640",
    adduser: "12",
    share: "125",
    post: "56",
  },
  {
    id: 3,
    collegeImg: "/images/cover-bg.jpg",
    collegeName:
      "Ram devi university institute of science, arts, paramedical...",
    location: "Coimbatore,Tamil Nadu",
    ugcName: "ugc",
    course: "B.ed",
    fees: "63000",
    exams: "AKNUCET",
    ranked: "0 by",
    like: "640",
    adduser: "12",
    share: "125",
    post: "56",
  },
  {
    id: 4,
    collegeImg: "/images/cover-bg.jpg",
    collegeName:
      "Ram devi university institute of science, arts, paramedical...",
    location: "Coimbatore,Tamil Nadu",
    ugcName: "ugc",
    course: "B.ed",
    fees: "63000",
    exams: "AKNUCET",
    ranked: "0 by",
    like: "640",
    adduser: "12",
    share: "125",
    post: "56",
  },
  {
    id: 5,
    collegeImg: "/images/cover-bg.jpg",
    collegeName:
      "Ram devi university institute of science, arts, paramedical...",
    location: "Coimbatore,Tamil Nadu",
    ugcName: "ugc",
    course: "B.ed",
    fees: "63000",
    exams: "AKNUCET",
    ranked: "0 by",
    like: "640",
    adduser: "12",
    share: "125",
    post: "56",
  },
];

const CollegeCard = ({ item, index }, props) => {

  const router = useRouter();
  const [modalShow, setModalShow] = useState(false);
  const [update, setUpdate] = useState(false);
  const [pagination, setPagination] = useState({
    pageNo: 1,
    pageSize: 10,
  });
  const dispatch = useDispatch();
  const likesList = useSelector(state => state?.collegelist?.collegeListLikes?.rows)


  const handleHide = () => {
    setModalShow(false);
  };

  const handleLikes = (itemId, values) => {
    if (getTokenDecode()) {
      dispatch(CollegeLikes({
        collegeId: itemId,
        update: values,
        userId: getTokenDecode()?.userId
      })).then((res) => {
        if (res?.payload?.status === 200 && res.payload.data?.success === true) {
          dispatch(CollegeLikesList(getTokenDecode()?.userId))
          dispatch(getColleges(pagination))
        }
      })
    } else {
      setModalShow(true);
    }
  };

  const isliked = likesList?.filter((i) => {
    if (item.id === i.categoryId) {
      return true
    }
  })

  return (
    <>
      <Card className="user_college_card" key={index}>
        <div className="image_box">
          <Image
            height={92}
            width={264}
            className="college_card_img img-fluid"
            alt=""
            onClick={() => router.push(`/college/collegeDetails/${item?.id}`)}
            src={`${apibasePath}documents/college/${item?.collegeLogo}`}
          // src="images/blue-book.png"
          />
        </div>

        <Card.Body className="college_card_body">
          <div
            onClick={() => router.push(`/college/collegeDetails/${item?.id}`)}
            className="college_name_container"
          >
            <h6 className="college_name hover_link">
              {item.collegeName
                ? item.collegeName
                : "Ram devi university institute of science, arts, paramedical"}
            </h6>
          </div>
          <div className="college_card_detail_box">
            <div className="card_location">
              <Row>
                <Col xs={8}>
                  <div className="card_location_name">
                    <BootImage
                      className="me-1"
                      src="/images/blue-location.png"
                    />
                    {item?.Cities?.name}, {item?.States?.state}
                  </div>
                </Col>
                <Col xs={4} className="text-end">
                  <p className="card_location_name">
                    <BootImage className="me-1" src="/images/blue-book.png" />
                    {item.Approval.name}
                  </p>
                </Col>
              </Row>
            </div>
            <div className="course_detail">
              <Row>
                <Col xs={3} className="text-center  p-2 pe-0">
                  <h6 className="course_detail_name right_border">Course</h6>
                </Col>
                <Col xs={3} className="text-center p-2 pe-0">
                  <h6 className="course_detail_name right_border">Fees</h6>
                </Col>
                <Col xs={3} className="text-center p-2 pe-0">
                  <h6 className="course_detail_name right_border">Exam</h6>
                </Col>
                <Col xs={3} className="text-center p-2">
                  <h6 className="course_detail_name">Ranked</h6>
                </Col>
              </Row>
              <Row>
                <Col xs={3} className="text-center  p-2 pe-0 pt-0">
                  <p className="course_detail_value">
                    {
                      item?.AssociateCourse[0]?.CourseAssociateStream[0]
                        ?.MainStream?.mainStreamName
                    }
                  </p>
                </Col>
                <Col xs={3} className="text-center p-2 pe-0 pt-0">
                  <p className="course_detail_value">
                    ₹{" "}
                    {
                      item?.AssociateCourse[0]?.CourseAssociateStream[0]
                        ?.courseFee
                    }
                  </p>
                </Col>
                <Col xs={3} className="text-center p-2 pe-0 pt-0">
                  <p className="course_detail_value">{item.exams}</p>
                </Col>
                <Col xs={3} className="text-center p-2 pt-0">
                  <p className="course_detail_value">
                    # {item?.collegeNaacGrade}
                  </p>
                </Col>
              </Row>
            </div>
            <div className="">
              <Row>
                <Col xs={3} className="text-center  p-2 pe-0">
                  <div
                    className="media_icon_num_pair right_border"
                    onClick={() => {
                      if (isliked?.length > 0) {
                        handleLikes(item?.id, "dislikes")
                      } else {
                        handleLikes(item?.id, "likes")
                      }
                    }}
                  >
                    <Image
                      width={20}
                      height={20}
                      className="media_icons"
                      src={isliked?.length > 0 ? "/images/blue-like.png" : "/images/border-like.svg"}
                    />

                    <h6 className="course_detail_name ">
                      {item.CountLikesShare
                        ? item.CountLikesShare[0]?.likes
                        : "00"}
                    </h6>
                  </div>
                </Col>
                <Col xs={3} className="text-center p-2 ">
                  <div className="media_icon_num_pair right_border">
                    <Image
                      width={20}
                      height={20}
                      className="media_icons"
                      src="/images/border-add-user.svg"
                    />
                    <h6 className="course_detail_name ">
                      {item.adduser ? item.adduser : "00"}
                    </h6>
                  </div>
                </Col>
                <Col xs={3} className="text-center p-2 ">
                  <div className="media_icon_num_pair right_border">
                    <Image
                      width={20}
                      height={20}
                      className="media_icons"
                      src="/images/border-share.svg"
                      onClick={() => setModalShow(true)}
                    />
                    <h6 className="course_detail_name ">
                      {item.CountLikesShare
                        ? item.CountLikesShare[0]?.share

                        : "00"}
                    </h6>
                  </div>
                </Col>
                <Col xs={3} className="text-center p-2">
                  <div className="media_icon_num_pair">
                    <Image
                      width={17}
                      height={20}
                      className="media_icons"
                      src="/images/border-post.svg"
                    />
                    <h6 className="course_detail_name ">
                      {item.post ? item.post : "00"}
                    </h6>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          <Row className="bottom_card_btn_footer">
            <Col xs={6} className="pe-0">
              <Button className="bottom_card_btn">Courses & Fees</Button>
            </Col>
            <Col xs={6} className="ps-0">
              <Button className="bottom_card_btn no_border">Apply Now</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <CollegeShareModal show={modalShow} onHide={() => handleHide()} />
    </>
  );
};

export default CollegeCard;
