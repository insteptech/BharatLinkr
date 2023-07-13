import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CourseLeftPage from "./courseLeftPage";
import CourseRightPage from "./courseLeftPage/courseRightPage";
import { useDispatch } from "react-redux";
import {
  filterMainstreamCourse,
  getCourse,
} from "../../redux/actions/course/addcourse";

const CoursePage = () => {
  const [show, setShow] = useState(null);
  const [showList, setShowList] = useState(null);

  const dispatch = useDispatch();
  const searchCourse = (e) => {
    let data = e.target.value;
    if (data.length > 0) {
      dispatch(getCourse({ search: data }));
    } else {
      dispatch(getCourse());
    }
  };
  const updateShowState = (value) => {
    setShow(value);
  };

  const updateShowlist=(value) => {
    setShowList(value)
  }
  return (
    <>
      <div className="user_dashboard_bg ">
        <Container fluid>
          <Row>
            <Col lg={1} className="p-0 hide_box "></Col>
            <Col lg={10} className="">
              <Row>
                <Col lg={3} className="search_left_page_bg hide_box hide_box">
                  <CourseLeftPage
                    // show={show}
                    // setShow={setShow}
                    showList={showList}
                    updateShowlist={updateShowlist}
                    updateShowState={updateShowState}
                    searchCourse={searchCourse}
                  />
                </Col>
                <Col lg={9} className="search_right_page_bg">
                  <CourseRightPage show={show} showList={showList} updateShowlist={updateShowlist} updateShowState={updateShowState}/>
                </Col>
              </Row>
            </Col>
            <Col lg={1} className="p-0 white_bg hide_box"></Col>
          </Row>
        </Container>    
      </div>
    </>
  );
};

export default CoursePage;
