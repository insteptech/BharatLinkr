import { concat } from "final-form-arrays";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Card, CardGroup, Col, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  cardlevelIdDetails,
  courseByMainStream,
  getCourse,
  getMasterFilterCourse,
  mainstreamCourseCount,
} from "../../../../../redux/actions/course/addcourse";
import { getAllMasterFilter } from "../../../../../redux/actions/masterfilter/createmasterfilter";
import { getMainStream } from "../../../../../redux/actions/streams/addMainStreams";
import LoaderPage from "../../../../common-components/loader";

const cardData = [
  {
    collegeImg: "/images/course-bg1.png",
    courseName: "Maths",
    coursecount: 12,
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

const LevelCard = (props) => {
  const { showList, setShowList, setCardLevelShow } = props;

  const dispatch = useDispatch();
  const router = useRouter();

  const coursetypelist = useSelector(
    (data) =>
      data?.allMasterFilterList?.masterfilterlist?.data?.data?.courselevel
  );
  const courseList = useSelector(
    (data) => data?.courseList?.courselist?.data?.rows
  );

  const loading = useSelector((state) => state?.allMasterFilterList?.isLoading);

  const getCourseLevelList = useSelector(
    (state) => state?.courseList?.getCourseLevelData
  );
  useEffect(() => {
    dispatch(getMainStream());
    dispatch(getAllMasterFilter("courselevel"));
    dispatch(getCourse());
  }, []);

  const handleMainStreamName = (item) => {
    dispatch(
      courseByMainStream({
        mainStreamId: item?.MainStreamsss?.id,
        courseLevelId: item?.courselevelType?.id,
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

  useEffect(() => {
    dispatch(mainstreamCourseCount());
  }, []);

  useEffect(() => {
    dispatch(getMasterFilterCourse());
  }, []);

  const handleImage = (item) => {
    dispatch(cardlevelIdDetails({ courseLevelId: item?.id }));
    if (item?.mainStreamCourseId === "") {
      setShowList(false);
      setCardLevelShow(null);
    } else {
      setCardLevelShow(true);
      setShowList(false);
    }
  };

  return (
    <>
      <Row xs={1} md={3} className="g-4">
        {loading ? (
          <LoaderPage />
        ) : coursetypelist && coursetypelist.length > 0 ? (
          coursetypelist?.map((listItem, listIndex) => {
            let courseLevelList = getCourseLevelList.filter((item, index) => {
              return item?.courselevelType?.id === listItem?.id;
            });

            return (
              <Col key={listIndex}>
                <Card
                  key={`MainStream_${listIndex}`}
                  className="user_college_card"
                >
                  {cardData &&
                    cardData?.map((el, index) => (
                      <div key={index}>
                        <div className="image_cover_content_base ">
                          <Card.Img
                            className="course_card_img "
                            variant="top"
                            src={el.collegeImg}
                          />
                        </div>
                        <div
                          className="image_cover_content"
                          onClick={() => handleImage(listItem)}
                        >
                          <h6 className="image_cover_content_text">
                            {listItem?.name}
                          </h6>
                        </div>
                      </div>
                    ))}

                  <Card.Body>
                    <>
                      <div className="selected_filters_subbox ">
                        {courseLevelList.length > 0 ? (
                          courseLevelList.map((elem, index) => {
                            return (
                              <>
                                <div
                                  className="course_name_count_div"
                                  key={index}
                                >
                                  <span className="course_name_items">
                                    {elem?.CourseCount}
                                  </span>
                                  <h6
                                    className="course_name_items"
                                    onClick={() => handleMainStreamName(elem)}
                                  >
                                    {elem?.MainStreamsss?.mainStreamName}
                                  </h6>
                                </div>
                              </>
                            );
                          })
                        ) : (
                          <div className="no_course_available">
                            <h6 className="no_course_available_title">
                              No courses available
                            </h6>
                          </div>
                        )}
                      </div>
                    </>
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        ) : (
          "No Data found"
        )}
      </Row>
    </>
  );
};

export default LevelCard;
