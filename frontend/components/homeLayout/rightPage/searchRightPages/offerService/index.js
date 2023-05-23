import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import React, { useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getMainStream } from "../../../../../redux/actions/streams/addMainStreams";
import { getSubStream } from "../../../../../redux/actions/streams/addSubStream";
import Searchfilters from "../../../../searchPage/searchFilters/searchfilters";

const OfferServicePage = () => {
  const dispatch = useDispatch()
  const mainstreamlist = useSelector((data)=>data?.mainStreamList?.mainStreamValue?.data?.data?.rows)
  const substreamlist = useSelector((data)=>data?.subStreamList?.subStreamValue?.data?.data?.rows)
  useEffect(() => {
    dispatch(getSubStream())
    dispatch(getMainStream())
  }, [])

  const filterdata = [
    {
      name: 'Stream',
      data: mainstreamlist,
      key: 'mainStreamName',
    },
    {
      name: 'Sub stream',
      data: substreamlist,
      key: 'subStreamName'
    },
    {
      name: 'Sort By',
      data: [{ name: 'Date' }, { name: 'Popularity' }],
      key: 'name'
    }
  ]

  return (
    <>
      <div className="">
        <Row>
          <Col lg={12} className="text-center edit_profile_h2">
            <h2>OFFER SERVice</h2>
          </Col>
        </Row>
        <Searchfilters filterdata={filterdata} />
      </div>
    </>
  );
};

export default OfferServicePage;
