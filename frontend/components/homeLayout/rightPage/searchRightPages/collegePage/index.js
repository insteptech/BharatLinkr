import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import CollegeCard from "../../../../Colleges/collegeCard";
import Searchfilters from "../../../../searchPage/searchFilters/searchfilters";

const SearchCollegePage = () => {
  const filterdata = [
    {
      name: 'State',
      data: [{ name: 'Date' }, { name: 'Popularity' }],
      key: 'name'
    },
    {
      name: 'City',
      data: [{ name: 'Date' }, { name: 'Popularity' }],
      key: 'name'
    },
    {
      name: 'Stream',
      data: [{ name: 'Date' }, { name: 'Popularity' }],
      key: 'name'
    },
    {
      name: 'Course',
      data: [{ name: 'Date' }, { name: 'Popularity' }],
      key: 'name'
    },
    {
      name: 'Program Type',
      data: [{ name: 'Date' }, { name: 'Popularity' }],
      key: 'name'
    },
    {
      name: 'Affiliation',
      data: [{ name: 'Date' }, { name: 'Popularity' }],
      key: 'name'
    },
    {
      name: 'Agency',
      data: [{ name: 'Date' }, { name: 'Popularity' }],
      key: 'name'
    },
    {
      name: 'Course Type',
      data: [{ name: 'Date' }, { name: 'Popularity' }],
      key: 'name'
    },
    {
      name: 'Type of College',
      data: [{ name: 'Date' }, { name: 'Popularity' }],
      key: 'name'
    },
    {
      name: 'Exam Accepted',
      data: [{ name: 'Date' }, { name: 'Popularity' }],
      key: 'name'
    },
  ]
  return (
    <>
      <div className="">
        <Row>
          <Col lg={12} className="text-center edit_profile_h2">
            <h2>COLLEges</h2>
          </Col>
        </Row>
        <Searchfilters filterdata={filterdata} />
        <div>
          <CollegeCard />
        </div>
      </div>
    </>
  );
};

export default SearchCollegePage;
