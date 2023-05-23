import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import PopularCourseCard from "../../../../course/courseLeftPage/courseRightPage/popularcourseCard";
import Searchfilters from "../../../../searchPage/searchFilters/searchfilters";

const SearchCoursesPage = () => {
  const filterdata = [
    {
      name: 'Stream',
      data: [{ name: 'Date' }, { name: 'Popularity' }],
      key: 'name'
    },
    {
      name: 'Course Level',
      data: [{ name: 'Date' }, { name: 'Popularity' }],
      key: 'name'
    }
  ]
  return (
    <>
      <div className="">
        <Row>
          <Col lg={12} className="text-center edit_profile_h2">
            <h2>COURSes</h2>
          </Col>
        </Row>
        <Searchfilters filterdata={filterdata} />
        <div>
          <PopularCourseCard />
        </div>
      </div>
    </>
  );
};

export default SearchCoursesPage;
