import React from "react";
import { useSelector } from "react-redux";

const ExamCentersRight = (props) => {
  const data = useSelector((data) => data?.exambyid?.exam?.data?.data?.rows[0]);

  //console.log(props?.data?.ExamAbout[0]?.examAboutHighlights, "ssssssssss");
  return (
    <>
      {props?.dataValue === 0 && (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                props?.data?.Centres[0]?.examCentreIntro
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
                props?.data?.Centres[0]?.listOfExamCentres
              ),
            }}
          />
        </>
      )}

      {props.dataValue === 2 && (
        <>
          <div>Created at:{props?.data?.Centres[0]?.createdAt}</div>
        </>
      )}
      {props.dataValue === 3 && (
        <>
          <div>Updated at:{props?.data?.Centres[0]?.updatedAt}</div>
        </>
      )}
    </>
  );
};

export default ExamCentersRight;
