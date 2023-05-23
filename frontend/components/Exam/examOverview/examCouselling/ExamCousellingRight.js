import React from "react";
import DOMPurify from "isomorphic-dompurify";
import { useSelector } from "react-redux";

const ExamCousellingRight = (props) => {
  const data = useSelector((data) => data?.exambyid?.exam?.data?.data?.rows[0]);

  //console.log(props?.data?.ExamAbout[0]?.examAboutHighlights, "ssssssssss");
  return (
    <>
      {props?.dataValue === 0 && (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                props?.data?.Counselling[0]?.stepByStepProcess
              ),
            }}
          />
        </>
      )}

      {props.dataValue === 1 && (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                props?.data?.Counselling[0]?.scheduleForExams
              ),
            }}
          />
        </>
      )}
      {props.dataValue === 2 && (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                props?.data?.Counselling[0]?.otherRelatedExamsCounselling
              ),
            }}
          />
        </>
      )}

      {props.dataValue === 3 && (
        <>
          <div>Created at:{props?.data?.Counselling[0]?.createdAt}</div>
        </>
      )}
      {props.dataValue === 4 && (
        <>
          <div>Updated at:{props?.data?.Counselling[0]?.updatedAt}</div>
        </>
      )}
    </>
  );
};

export default ExamCousellingRight;
