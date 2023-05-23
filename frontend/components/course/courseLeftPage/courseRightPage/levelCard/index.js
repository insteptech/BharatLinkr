import { concat } from "final-form-arrays";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Card, CardGroup, Col, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  cardlevelIdDetails,
  courseByMainStream,
  getCourse,
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
  }
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

  useEffect(() => {
    dispatch(getMainStream());
    dispatch(getAllMasterFilter("courselevel"));
    dispatch(getCourse());
  }, []);

  const finalList =
    coursetypelist &&
    coursetypelist?.map((courseLevel) => {
      const filtered =
        courseList &&
        courseList?.filter(
          (courseItem) => courseItem?.courseLevelId === courseLevel?.id
        );
      return {
        courseLevelName: courseLevel.name,
        courseLevelId: courseLevel.id,
        count: filtered && filtered.length,
        mainStreamName:
          filtered && filtered[0] && filtered[0].MainStream.mainStreamName
            ? filtered[0].MainStream.mainStreamName
            : "",
        mainStreamId:
          filtered && filtered[0] && filtered[0].mainStreamId
            ? filtered[0].mainStreamId
            : "",
        mainStreamCourseId:
          filtered && filtered[0] && filtered[0]?.MainStream?.id
            ? filtered[0]?.MainStream?.id
            : "",
      };
    });

  const handleMainStreamName = (item) => {
    dispatch(
      courseByMainStream({
        mainStreamId: item?.mainStreamId,
        courseLevelId: item?.courseLevelId,
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

  const mainCourseCount = useSelector(
    (state) => state?.courseList?.courseCountData?.data
  );
  useEffect(() => {
    dispatch(mainstreamCourseCount());
  }, []);

  const handleImage = (item) => {
    dispatch(cardlevelIdDetails({ courseLevelId: item?.courseLevelId }));

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
        ) : finalList && finalList.length > 0 ? (
          finalList?.map((listItem, listIndex) => (
            <Col key={listIndex}>
              <div>
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
                            onClick={() => handleImage(listItem)}
                          />
                        </div>
                        <div className="image_cover_content">
                          <h6 className="image_cover_content_text">
                            {listItem.courseLevelName}
                          </h6>
                        </div>
                      </div>
                    ))}

                  <Card.Body>
                    <div className="selected_filters_subbox course_name_subbox">
                      {listItem.mainStreamName ? (
                        <div className="course_name_count_div">
                          {mainCourseCount?.mainStreamCountss?.map((elem, index) => {
                            if (
                              listItem?.mainStreamCourseId ===
                              elem?.mainStreamCounts?.id
                            ) {
                              return (
                                <span key={index} className="course_name_items">
                                  {elem?.mainStreamCount}
                                </span>
                              );
                            }
                          })}
                          <h6
                            className="course_name_items"
                            onClick={() => handleMainStreamName(listItem)}
                          >
                            {listItem.mainStreamName}{" "}
                          </h6>
                        </div>
                      ) : (
                        <div className="no_course_available">
                          <h6 className="no_course_available_title">
                            No courses available
                          </h6>
                        </div>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          ))
        ) : (
          "No Data found"
        )}
      </Row>
    </>
  );
};

export default LevelCard;
