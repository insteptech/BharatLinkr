import React from "react";
import { useSelector } from "react-redux";
import DOMPurify from "isomorphic-dompurify";

const ExamPreparationTipsRight = (props) => {
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
                props?.data?.PreparationTips[0]?.bestTime
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
                props?.data?.PreparationTips[0]?.sectionWisePreparationTips
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
                props?.data?.PreparationTips[0]?.subject1Books
              ),
            }}
          />
        </>
      )}
      {props.dataValue === 3 && (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                props?.data?.PreparationTips[0]?.subject2Books
              ),
            }}
          />
        </>
      )}

      {props.dataValue === 4 && (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                props?.data?.PreparationTips[0]?.subject3Books
              ),
            }}
          />
        </>
      )}
      {props.dataValue === 5 && (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                props?.data?.PreparationTips[0]?.subject4Books
              ),
            }}
          />
        </>
      )}

      {props.dataValue === 6 && (
        <>
          <div>Created at:{props?.data?.PreparationTips[0]?.createdAt}</div>
        </>
      )}
      {props.dataValue === 7 && (
        <>
          <div>Updated at:{props?.data?.PreparationTips[0]?.updatedAt}</div>
        </>
      )}
    </>
  );
};

export default ExamPreparationTipsRight;
