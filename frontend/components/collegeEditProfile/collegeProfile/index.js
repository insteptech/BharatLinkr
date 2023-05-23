import Image from "next/image";
import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Field } from "react-final-form";

const CollegeProfile = () => {
  const handleSubmit = () => {
    console.log("data");
  };
  return (
    <>
      <Container>
        <Row>
          <Col lg={12} className="text-center p-0">
            <div className="user_profile_cover_div">
              <img
                className="img-fluid user_profile_cover_img"
                src="/images/college-banner2.jpg"
              />
              <div className="profile_hero_edit_icon_row">
                <div className="profile_hero_img_col">
                  <img
                    className="profile_hero_img"
                    src="/images/cover-bg.jpg"
                  />
                </div>
                <div className="edit_pen_col">
                  <div className="profile_pen_bg">
                    <img src="/images/pen.png" />
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <div className="p-4">
          <Row>
            <Col lg="6" md="12">
              <div>
                <label className="signup_form_label">Designation</label>
                <input
                  type="text"
                  className="form-control signup_form_input margin_bottom"
                  placeholder="Enter Name"
                />
              </div>
            </Col>
            <Col lg="6" md="12">
              <div>
                <label className="signup_form_label">Email</label>
                <input
                  type="text"
                  className="form-control signup_form_input margin_bottom"
                  placeholder="Student"
                />
              </div>
            </Col>
            <Col lg="6" md="12">
              <div>
                <label className="signup_form_label">Password</label>
                <input
                  type="text"
                  className="form-control signup_form_input margin_bottom"
                  placeholder="Enter Email"
                />
              </div>
            </Col>
            <Col lg="6" md="12">
              <div>
                <label className="signup_form_label">Mobile Number</label>
                <input
                  type="password"
                  className="form-control signup_form_input margin_bottom"
                  placeholder="Enter Password"
                />
              </div>
            </Col>
            <Col lg="6" md="12">
              <div>
                <label className="signup_form_label">College Website</label>
                <input
                  type="number"
                  className="form-control signup_form_input margin_bottom"
                  placeholder="Enter Mobile Number"
                />
              </div>
            </Col>
          </Row>
        </div>
        <Row>
          <Col lg={12} className="text-center">
            <Button className="admin_signup_btn me-4 account_btn">
              Save Changes
            </Button>
            <Button className="admin_signup_btn account_btn">
              Deactivate Account
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CollegeProfile;
