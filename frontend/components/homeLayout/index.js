import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CenterPage from "./centerPages";
import LeftPage from "./leftPage";
import RightPage from "./rightPage";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserList } from "../../redux/actions/user/userActions";

const HomeLayout = () => {
  const dispatch = useDispatch()
  const loginStatus = useSelector((state) => state.userSlice.loginStatus);

  useEffect(() => {
    if (loginStatus) dispatch(getAllUserList())
  }, [loginStatus])
  return (
    <>
      <div className="user_dashboard_bg">
        <Container fluid className="">
          <Container>
            <Row>
              <Col lg={3} md={0} className="hide_box">
                <LeftPage />
              </Col>
              <Col lg={6} md={12} className="mobile_padding">
                <CenterPage />
              </Col>
              <Col lg={3} md={0} className="hide_box">
                <RightPage />
              </Col>
            </Row>
          </Container>
        </Container>
      </div>
    </>
  );
};

export default HomeLayout;
