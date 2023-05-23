import React from "react";
import { useSelector } from "react-redux";

const ExamReservationRight = (props) => {
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
                props?.data?.Reservation[0]?.examReservationIntro
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
                props?.data?.Reservation[0]?.examReservationHighlights
              ),
            }}
          />
        </>
      )}
      {props.dataValue === 2 && (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(props?.data?.Reservation[0]?.criteria),
            }}
          />
        </>
      )}
      {props.dataValue === 3 && (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                props?.data?.Reservation[0]?.categoryWise
              ),
            }}
          />
        </>
      )}

      {props.dataValue === 4 && (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(props?.data?.Reservation[0]?.forWomen),
            }}
          />
        </>
      )}
      {props.dataValue === 5 && (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                props?.data?.Reservation[0]?.forPWDWomen
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
                props?.data?.Reservation[0]?.underEWSQuota
              ),
            }}
          />
        </>
      )}

      {props.dataValue === 7 && (
        <>
          <div>Created at:{props?.data?.Reservation[0]?.createdAt}</div>
        </>
      )}
      {props.dataValue === 8 && (
        <>
          <div>Updated at:{props?.data?.Reservation[0]?.updatedAt}</div>
        </>
      )}
    </>
  );
};

export default ExamReservationRight;
