import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import ExamLongCard from "../../../../Exam/examRightPage/examLongCard";
import Searchfilters from "../../../../searchPage/searchFilters/searchfilters";

const SearchExamsPage = () => {
  const filterdata = [
    {
      name: 'Exam Type',
      data: [{ name: 'Date' }, { name: 'Popularity' }],
      key: 'name'
    },
    {
      name: 'Application Mode',
      data: [{ name: 'Date' }, { name: 'Popularity' }],
      key: 'name'
    },
    {
      name: 'Exam Mode',
      data: [{ name: 'Date' }, { name: 'Popularity' }],
      key: 'name'
    }
  ]
  return (
    <>
      <div className="">
        <Row>
          <Col lg={12} className="text-center edit_profile_h2">
            <h2>EXAMs</h2>
          </Col>
        </Row>
        <Searchfilters filterdata={filterdata} />
        <div>
          <ExamLongCard />
        </div>
      </div>
    </>
  );
};

export default SearchExamsPage;
