import React from "react";
import { useSelector } from "react-redux";
import DOMPurify from "isomorphic-dompurify";
const ExamPatternRight = (props) => {
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
                props?.data?.Pattern[0]?.examPatternHighlights
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
                props?.data?.Pattern[0]?.examPatternPaper1Pattern
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
                props?.data?.Pattern[0]?.examPatternPaper2Pattern
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
                props?.data?.Pattern[0]?.examPatternPaper3Pattern
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
                props?.data?.Pattern[0]?.examPatternPaper4Pattern
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
                props?.data?.Pattern[0]?.examPatternPaper5Pattern
              ),
            }}
          />
        </>
      )}
      {props.dataValue === 6 && (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                props?.data?.Pattern[0]?.examPatternPaper6Pattern
              ),
            }}
          />
        </>
      )}
      {props.dataValue === 7 && (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(props?.data?.Pattern[0]?.weightage),
            }}
          />
        </>
      )}

      {props.dataValue === 8 && (
        <>
          <div>Created at:{props?.data?.Pattern[0]?.createdAt}</div>
        </>
      )}
      {props.dataValue === 9 && (
        <>
          <div>Updated at:{props?.data?.Pattern[0]?.updatedAt}</div>
        </>
      )}
    </>
  );
};

export default ExamPatternRight;
