// import DOMPurify from 'dompurify'
import React from "react";
import AboutBarch from "./aboutBarch";
import { useSelector } from "react-redux";

const CoursesDetailsRight = (props) => {
  return (
    <>
      {<AboutBarch props={props} />}
      {/* {props.dataValue === 1 && <AboutBarch props={props}/>}
      {props.dataValue === 2 && "hello1"}
      {props.dataValue === 3 && "helloret"}
      {props.dataValue === 4 && "hellofd"}
      {props.dataValue === 5 && "hello6"}
      {props.dataValue === 6 && "hello"}
      {props.dataValue === 7 && "hello"}
      {props.dataValue === 8 && "hello"}
      {props.dataValue === 9 && "hello"} */}
    </>
  );
};

export default CoursesDetailsRight;
