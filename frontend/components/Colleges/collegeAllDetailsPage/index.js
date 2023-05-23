import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCollegebyId } from "../../../redux/actions/college/college";
import CollegeBanner from "./collegeBanner";
import CollegeDetailTabs from "./collegeDetailTab";

const CollegeAllDetailsPage = (props) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const collegeDetails = useSelector((data) => data?.collegelist?.college?.rows)

  console.log(props, "Asdasdasd")
  
  useEffect(() => {
    if (router.query.Id) {
      dispatch(getCollegebyId({id:Number(router.query.Id)}))
    }
  }, [router.query.Id])
  
  return (
    <>
      <div className="user_dashboard_bg mobile_white_bg">
        <Container fluid>
          <Row>
            <Col lg={1} className="p-0  hide_box"></Col>
            <Col lg={10} className="desk_screen_padding">
              <Row>
                <Col lg={12} className="desk_screen_padding">
                  <CollegeBanner collegeDetails={collegeDetails} />
                </Col>
              </Row>
              <Row>
                <Col lg={12} className="desk_screen_padding">
                  <CollegeDetailTabs collegeDetails={collegeDetails} />
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

export default CollegeAllDetailsPage;
