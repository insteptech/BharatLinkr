import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getOrganisationbyid } from "../../../redux/actions/organisation/addorganisation";
import CollegeBanner from "./collegeBanner";
import CollegeDetailTabs from "./collegeDetailTab";

const CompanyAllDetail = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { Id } = router.query
  
  useEffect(() => {
    if (Id) { 
      dispatch(getOrganisationbyid(Number(Id)))
    }
  }, [Id])

  const orgdata = useSelector((state) => {
    if (state?.sectorData?.organisation?.rows?.length > 0) {
      return state?.sectorData?.organisation?.rows[0]
    }
  })

  return (
    <>
      <div className="user_dashboard_bg mobile_white_bg">
        <Container fluid>
          <Row>
            <Col lg={1} className="p-0 hide_box"></Col>
            <Col lg={10} className="desk_screen_padding">
              <Row>
                <Col lg={12} className="desk_screen_padding">
                  <CollegeBanner orgdata={orgdata} />
                </Col>
              </Row>
              <Row>
                <Col lg={12} className="desk_screen_padding">
                  <CollegeDetailTabs />
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

export default CompanyAllDetail;
