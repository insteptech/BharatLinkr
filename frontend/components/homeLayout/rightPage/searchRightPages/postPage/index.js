import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import Searchfilters from "../../../../searchPage/searchFilters/searchfilters";

const PostPage = () => {
  const filterdata = [
    {
      name: 'Status',
      data: [{ name: 'Date' }, { name: 'Popularity' }],
      key: 'name'
    }
  ]
  return (
    <>
      <div className="">
        <Row>
          <Col lg={12} className="text-center edit_profile_h2">
            <h2>SCRIPts</h2>
          </Col>
        </Row>
        <Searchfilters filterdata={filterdata}/>
      </div>
    </>
  );
};

export default PostPage;
