import React from "react";
import { useSelector } from "react-redux";
import DOMPurify from "isomorphic-dompurify";

const ExamImportantDatesRight = (props) => {
  const data = useSelector((data) => data?.exambyid?.exam?.data?.data?.rows[0]);
  console.log(props, "sdfsdfsdfsd");

  //console.log(props?.data?.ExamAbout[0]?.examAboutHighlights, "ssssssssss");
  return (
    <>
      {props?.dataValue === 0 && (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                props?.data?.ImportantDates[0]?.examImportantDatesIntro
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
                props?.data?.ImportantDates[0]?.examSchedule
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
                props?.data?.ImportantDates[0]?.scheduleForOtherSession
              ),
            }}
          />
        </>
      )}

      {props.dataValue === 3 && (
        <>
          <div>Created at:{props?.data?.ImportantDates[0]?.createdAt}</div>
        </>
      )}
      {props.dataValue === 4 && (
        <>
          <div>Updated at:{props?.data?.ImportantDates[0]?.updatedAt}</div>
        </>
      )}
    </>
  );
};

export default ExamImportantDatesRight;
