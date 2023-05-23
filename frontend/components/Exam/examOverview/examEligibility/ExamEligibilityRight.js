import React from "react";
import { useSelector } from "react-redux";
import DOMPurify from "isomorphic-dompurify";

const ExamEligibilityRight = (props) => {
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
                props?.data?.Eligibility[0]?.examEligibilityIntro
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
                props?.data?.Eligibility[0]?.examEligibilityHighlights
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
                props?.data?.Eligibility[0]?.detailedCriteria
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
                props?.data?.Eligibility[0]?.marksRequiredForQualifying
              ),
            }}
          />
        </>
      )}

      {props.dataValue === 4 && (
        <>
          <div>Created at:{props?.data?.Eligibility[0]?.createdAt}</div>
        </>
      )}
      {props.dataValue === 5 && (
        <>
          <div>Updated at:{props?.data?.Eligibility[0]?.updatedAt}</div>
        </>
      )}
    </>
  );
};

export default ExamEligibilityRight;
