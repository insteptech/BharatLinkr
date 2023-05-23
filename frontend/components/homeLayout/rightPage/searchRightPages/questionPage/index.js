import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import Searchfilters from "../../../../searchPage/searchFilters/searchfilters";

const QuestionPage = () => {
  const filterdata = [
      {
        name: 'Stream',
        data: [{ name: 'Date' }, { name: 'Popularity' }],
        key: 'name'
      },
      {
        name: 'Sub Stream',
        data: [{ name: 'Date' }, { name: 'Popularity' }],
        key: 'name'
      },
      {
        name: 'College',
        data: [{ name: 'Date' }, { name: 'Popularity' }],
        key: 'name'
      },
      {
        name: 'Course',
        data: [{ name: 'Date' }, { name: 'Popularity' }],
        key: 'name'
      },
      {
        name: 'Exams',
        data: [{ name: 'Date' }, { name: 'Popularity' }],
        key: 'name'
      },
      {
        name: 'Corporate',
        data: [{ name: 'Date' }, { name: 'Popularity' }],
        key: 'name'
      },
      {
        name: 'Sort by',
        data: [{ name: 'Date' }, { name: 'Popularity' }],
        key: 'name'
      },
  ]
  return (
    <>
      <div className="">
        <Row>
          <Col lg={12} className="text-center edit_profile_h2">
            <h2>QUESTion</h2>
          </Col>
        </Row>
      </div>
      <div className="dropdown_row mt-1 mb-3">
      <Searchfilters filterdata={filterdata}/>
      </div>
      <div className="banner_img">
        <img src="/images/course-bg1.png" />
      </div>
      <div className="banner_text">
        <h5>hello</h5>
        <p>hello jkhbfjsa jfhfbkjea fhfaj fjhbsajsljhb jlhs </p>
      </div>
    </>
  );
};

export default QuestionPage;
