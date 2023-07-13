import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DOMPurify from "dompurify";
import { getCoursebyId } from "../../../../../redux/actions/course/addcourse";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import LoaderPage from "../../../../common-components/loader";

const AboutBarch = ({ props }) => {
  const dispatch = useDispatch();
  const { dataValue, setDataValue } = props;
  const [courseData, setCourseData] = useState();

  const courseDetails = useSelector(
    (state) => state?.courseList?.courseData?.data?.data?.rows
  );

  const loadingFilterlist = useSelector(
    (state) => state?.courseList?.isLoading
  );

  useEffect(() => {
    courseDetails?.map((course) => setCourseData(course));
  }, [courseDetails]);

  const router = useRouter();
  const Id = router.query.pageNo;
  const query = router.query

  useEffect(() => {
    if (Id) {
      dispatch(
        getCoursebyId({
          id: Number(Id),
        })
      );
    }
  }, [Id]);

  useEffect(() => {
    if (query.active) {
      setDataValue(4)
    }
  }, [])

  const coursetabs = [
    {
      tabsName: `About ${courseData?.courseName}`,
    },
    {
      tabsName: "Specialization",
    },
    {
      tabsName: "Eligibility",
    },
    {
      tabsName: `Course after ${courseData?.courseName}`,
    },
    {
      tabsName: `Career after ${courseData?.courseName}`,
    },
    {
      tabsName: "Average fee",
    },
    {
      tabsName: "Salary Trends",
    },
  ];

  return (
    <>
     {loadingFilterlist ? <LoaderPage/> :  (<>   
      <div className="admin_home_tabs_row top_padding_none big_screen_none">
        <Row>
          <Col lg={12} className="p-0">
         <ScrollingCarousel show={5.5} slide={4} swiping={true} >
              <ul className="nav ">
                {coursetabs &&
                  coursetabs?.map((steps, stepsIndex) => (
                    <li className="nav-item " key={stepsIndex}>
                      <a
                        className={`nav-link admin_tabs_name ${dataValue === stepsIndex && "head-active"}`}
                        active={true}
                        onClick={() => setDataValue(stepsIndex)}
                      >
                        {steps.tabsName}
                      </a>
                    </li>
                  ))}
              </ul>
            </ScrollingCarousel>
          </Col>
        </Row>
      </div>
      <div>
        {dataValue === 0 &&
          courseDetails &&
          courseDetails?.map((item, index) => {
            return (
              <div key={index}>
                <h3>About {item?.courseName}</h3>
              </div>
            );
          })}
      </div>

      <div>
        {dataValue === 0 &&
          courseDetails &&
          courseDetails[0]?.CMS?.map((item, index) => {
            return (
              <>
                <div
                  key={index}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(item?.about),
                  }}
                />
              </>
            );
          })}
      </div>

      <div>
        {dataValue === 1 &&
          courseDetails &&
          courseDetails[0]?.CMS?.map((item, index) => {
            return (
              <>
                <div
                  key={index}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(item?.specialization),
                  }}
                />
              </>
            );
          })}
      </div>

      <div>
        {dataValue === 2 &&
          courseDetails &&
          courseDetails[0]?.CMS?.map((item, index) => {
            return (
              <>
                <div
                  key={index}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(item?.eligibility),
                  }}
                />
              </>
            );
          })}
      </div>

      <div>
        {dataValue === 3 &&
          courseDetails &&
          courseDetails[0]?.CMS?.map((item, index) => {
            return (
              <>
                <div
                  key={index}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(item?.courseAfterDetails),
                  }}
                />
              </>
            );
          })}
      </div>

      <div>
        {dataValue === 4 &&
          courseDetails &&
          courseDetails[0]?.CMS?.map((item, index) => {
            return (
              <>
                <div
                  key={index}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(item?.career),
                  }}
                />
              </>
            );
          })}
      </div>

      <div>
        {dataValue === 5 &&
          courseDetails &&
          courseDetails[0]?.CMS?.map((item, index) => {
            return (
              <>
                <div
                  key={index}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(item?.avgFees),
                  }}
                />
              </>
            );
          })}
      </div>

      <div>
        {dataValue === 6 &&
          courseDetails &&
          courseDetails[0]?.CMS?.map((item, index) => {
            return (
              <>
                <div
                  key={index}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(item?.salaryTrends),
                  }}
                />
              </>
            );
          })}
      </div>
      </>)}  
    </>
  );
};

export default AboutBarch;
