import React from "react";
import { useSelector } from "react-redux";

const ExamParticipatingCollegesRight = (props) => {
  const data = useSelector((data) => data?.exambyid?.exam?.data?.data?.rows[0]);
  console.log(props, "sdfsdfsdfsd");

  //console.log(props?.data?.ExamAbout[0]?.examAboutHighlights, "ssssssssss");
  return (
    <>
      {props?.dataValue === 0 && (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(props?.data?.ParticipatingCollege[0]?.listOfTopCollegesAcceptingJEE),
            }}
          />
        </>
      )}

   

      {props.dataValue === 1 && (
        <>
          <div>Created at:{props?.data?.ParticipatingCollege[0]?.createdAt}</div>
        </>
      )}
      {props.dataValue === 2 && (
        <>
          <div>Updated at:{props?.data?.ParticipatingCollege[0]?.updatedAt}</div>
        </>
      )}
    </>
  );
};

export default ExamParticipatingCollegesRight;
