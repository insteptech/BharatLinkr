import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ExamLeftPage from "./examLeftPage";
import ExamRightPage from "./examRightPage";
import { getAllExams, searchExams } from "../../redux/actions/exams/createExam";
import { filterExamByStreamCourse } from "../../redux/actions/exams/createExam";

function ExamPage() {
  const [searchText, setSearchText] = useState("");
  const [filterkeys, setFilterkeys] = useState({});
  const [showSearchList, setShowSearchList] = useState(null);

  const dispatch = useDispatch();
  const examData = useSelector((data) => data?.examList?.examlist?.data?.data);

  const searchExam = (key) => {
    let val = key.target.value;
    console.log(val);
    if (val.length > 0) {
      dispatch(getAllExams({ search: val }));
    } else {
      dispatch(getAllExams());
    }
  };

  const handleFilterSelect = (e, itemId, item) => {
    let data = { ...filterkeys, [e.target.name]: itemId };
    setFilterkeys(data);
    dispatch(getAllExams(data));
  };

  const handleSetDefault = () => {
    setSearchText("");
    dispatch(getAllExams());
  };

   const handleClear = (type) => {

   };

  const handleStreamFilter = (id) => {
    let data = { mainStreamId: id };
    dispatch(getAllExams(data));
  };

  useEffect(() => {
    dispatch(getAllExams());
  }, []);

  return (
    <div className="user_dashboard_bg ">
      <Container fluid>
        <Row>
          <Col lg={1} className="p-0 hide_box "></Col>
          <Col lg={10} className="">
            <Row>
              <Col lg={3} className="search_left_page_bg hide_box">
                <ExamLeftPage
                  handleClear={handleClear}
                  searchExam={searchExam}
                  examDataLength={examData?.length}
                  handleSetDefault={handleSetDefault}
                  searchText={searchText}
                  setSearchText={setSearchText}
                  handleFilterSelect={handleFilterSelect}
                  setShowSearchList={setShowSearchList}
                  showSearchList={showSearchList}
                  filterkeys={filterkeys}
                />
              </Col>
              <Col lg={9} className="search_right_page_bg">
                <ExamRightPage
                  examData={examData}
                  handleStreamFilter={handleStreamFilter}
                  setShowSearchList={setShowSearchList}
                  showSearchList={showSearchList}
                />
              </Col>
            </Row>
          </Col>
          <Col lg={1} className="p-0 white_bg hide_box"></Col>
        </Row>
      </Container>
    </div>
  );
}

export default ExamPage;
