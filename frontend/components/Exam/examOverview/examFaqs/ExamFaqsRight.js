import React from "react";
import DOMPurify from "isomorphic-dompurify";
import { useSelector } from "react-redux";

const ExamFaqsRight = (props) => {
  const data = useSelector((data) => data?.exambyid?.exam?.data?.data?.rows[0]);
  console.log(props, "sdfsdfsdfsd");

  //console.log(props?.data?.ExamAbout[0]?.examAboutHighlights, "ssssssssss");
  return (
    <>
      {props?.dataValue === 0 && (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(props?.data?.FAQ[0]?.question),
            }}
          />
        </>
      )}

      {props.dataValue === 1 && (
        <>
          <div>answer :{props?.data?.FAQ[0]?.answer}</div>
        </>
      )}
      {props.dataValue === 2 && (
        <>
          <div>answerType:{props?.data?.FAQ[0]?.answerType}</div>
        </>
      )}

      {props.dataValue === 3 && (
        <>
          <div>Created at:{props?.data?.FAQ[0]?.createdAt}</div>
        </>
      )}
      {props.dataValue === 4 && (
        <>
          <div>Updated at:{props?.data?.FAQ[0]?.updatedAt}</div>
        </>
      )}
      {props.dataValue === 5 && (
        <>
          <div>Image:{props?.data?.FAQ[0]?.image}</div>
        </>
      )}
    </>
  );
};

export default ExamFaqsRight;
