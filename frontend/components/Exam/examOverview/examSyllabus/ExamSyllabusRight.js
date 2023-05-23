import React from "react";
import { useSelector } from "react-redux";
import DOMPurify from "isomorphic-dompurify";

const ExamSyllabusRight = (props) => {
  const data = useSelector((data) => data?.exambyid?.exam?.data?.data?.rows[0]);
  console.log(props, "sdfsdfsdfsd");

  //console.log(props?.data?.ExamAbout[0]?.examAboutHighlights, "ssssssssss");
  return (
    <>
      {props?.dataValue === 0 && (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(props?.data?.Syllabus[0]?.examSyllabusHighlights),
            }}
          />
        </>
      )}

      {props.dataValue === 1 && (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                props?.data?.Syllabus[0]?.examSyllabusPaper1Pattern
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
                props?.data?.Syllabus[0]?.examSyllabusPaper2Pattern
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
                props?.data?.Syllabus[0]?.examSyllabusPaper3Pattern
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
                props?.data?.Syllabus[0]?.examSyllabusPaper4Pattern
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
                props?.data?.Syllabus[0]?.examSyllabusPaper5Pattern
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
                props?.data?.Syllabus[0]?.examSyllabusPaper6Pattern
              ),
            }}
          />
        </>
      )}
      {props.dataValue === 7 && (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                props?.data?.Syllabus[0]?.bestBooks
              ),
            }}
          />
        </>
      )}

      {props.dataValue === 8 && (
        <>
          <div>Created at:{props?.data?.Syllabus[0]?.createdAt}</div>
        </>
      )}
      {props.dataValue === 9 && (
        <>
          <div>Updated at:{props?.data?.Syllabus[0]?.updatedAt}</div>
        </>
      )}
    </>
  );
};

export default ExamSyllabusRight;
