import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CollegeLikesList, getColleges } from "../../redux/actions/college/college";
import CollegeLeftPage from "./collegeLeftPage";
import CollegeRightPage from "./collegeRightPage";
import { getUsersList } from "../../redux/actions/auth";
import { getTokenDecode } from "../utils";

const CollegePage = () => {
  const [filters, setFilters] = useState({});
  const [selectedFilter, setSelectedFilter] = useState([]);
  const dispatch = useDispatch();
  const user = getTokenDecode();
  const collegedata = useSelector((data) => data?.collegelist?.collegelist);

  const handleSearch = (e) => {
    let val = e.target.value;
    if (val.length > 0) {
      dispatch(getColleges({ search: e.target.value }));
    } else dispatch(getColleges());
  };

  useEffect(() => {
    // dispatch(getColleges());
 
    if (user) {
      dispatch(CollegeLikesList(user.id));
    }
  }, []);


  const handleFilters = (data, name, isChecked) => {
    if (filters[name]) {
      if (isChecked === true) {
        filters[name].push(data.id);
      } else {
        if (filters[name].length === 1) {
          delete filters[name];
          let index = selectedFilter.indexOf(name);
          selectedFilter.splice(index, 1);
        } else {
          let index = filters[name].indexOf(data.id);
          filters[name].splice(index, 1);
        }
      }
    } else {
      filters[name] = [data.id];
      selectedFilter.push(name);
    }
    dispatch(getColleges(filters));
  };
  return (
    <>
      <div className="user_dashboard_bg ">
        <Container fluid>
          <Row>
            <Col lg={1} className="p-0  hide_box"></Col>
            <Col lg={10} className="">
              <Row>
                <Col lg={3} className="search_left_page_bg hide_box">
                  <CollegeLeftPage
                    collegelistcount={collegedata?.count}
                    handleSearch={handleSearch}
                    handleFilters={handleFilters}
                    selectedFilter={selectedFilter}
                  />
                </Col>
                <Col lg={9} className="search_right_page_bg">
                  <CollegeRightPage />
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

export default CollegePage;
