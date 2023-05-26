import Image from "next/image";
import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Field, Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/actions/auth";
import { toast } from "react-toastify";

import { apibasePath } from "../../config";

import { useEffect } from "react";
import { getToken } from "../utils";
import { useRouter } from "next/router";

const EditProfile = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const userDetials = useSelector((detais) => detais?.loginUser?.userDetails);
  useEffect(() => {
    if (!getToken() && router.pathname.includes("editprofile")) {
      router.push("/"); // redirect to the home page when user not logged in
    }
  }, [dispatch]);

  const onSubmit = (values) => {
    const payload = {
      id: userDetials.id,
      name: values.name,
      area: values.area,
      Designation: values.Designation,
      Email: values.Email,
      number: values.number,
      Expirence: values.Expirence,
      Accomplishments: values.Accomplishments,
      education: values.education,
      Summary: values.Summary,
    };

    const formData = new FormData();
    formData.append("profileData", JSON.stringify(payload));
    if (values > 0) {
      dispatch(getUsers(formData)).then((res) => {
        if (res.payload?.success === true) {
          toast.success("Profile updated successfully!");
        }
      });
    }
  };
  return (
    <>
      <Form
        onSubmit={onSubmit}
        // keepDirtyOnReinitialize
        initialValues={
          userDetials
            ? userDetials && {
                name: userDetials.name,
                area: userDetials.areaOfExpertise,
                Designation: userDetials.designation,
                Email: userDetials.email,
                number: userDetials.mobileNumber,
                Expirence: userDetials.totalExperience,
                Accomplishments: userDetials.accomplishments,
                education: userDetials.highestEducation,
                Summary: userDetials.summary,
              }
            : ""
        }
        render={({ handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Container className="result_container_padding">
                <Row>
                  <Col lg={12} className="text-center">
                    <h2 className="edit_profile_h2">Edit Profile</h2>
                  </Col>
                  <Col lg={12} className="text-center">
                    <div className="user_profile_cover_div">
                      <Image
                        height={1000}
                        width={100}
                        className={
                          userDetials?.coverPhoto
                            ? "img-fluid user_profile_cover_img"
                            : "user_profile_cover_img_dammy"
                        }
                        // src={`${apibasePath}documents/userProfile/${userDetials?.coverPhoto}`}
                        src={
                          userDetials?.coverPhoto
                            ? `${apibasePath}documents/userProfile/${userDetials?.coverPhoto}`
                            : "/images/dammy-cover-1.svg"
                        }
                      />
                      <div className="profile_hero_edit_icon_row">
                        <div className="profile_hero_img_col">
                          <Image
                            height={200}
                            width={200}
                            className="profile_hero_img"
                            src={
                              userDetials?.profilePhoto
                                ? `${apibasePath}documents/userProfile/${userDetials?.profilePhoto}`
                                : "/images/dammy.svg"
                            }
                          />
                          <label
                            className="profile_pen_bg logo_pen"
                            for="actual-btn"
                          >
                            <img className="pen" src="/images/pen.png" />
                          </label>
                          <input type="file" id="actual-btn" hidden />
                        </div>
                        <div className="edit_pen_col">
                          <label className="profile_pen_bg" for="actual-btn">
                            <img src="/images/pen.png" />
                          </label>
                          <input type="file" id="actual-btn" hidden />
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="p-4">
                  <Row>
                    <Col Col lg="6" md="12">
                      <div>
                        <label className="signup_form_label">Name </label>
                        <Field name="name">
                          {({ input, meta }) => (
                            <div className="position-relative">
                              <input
                                type="text"
                                {...input}
                                className="form-control signup_form_input margin_bottom"
                                placeholder="Enter Name"
                              />
                              {meta.touched && meta.error && (
                                <p className="alert alert-danger  position-absolute w-100 mt-1 py-1 text-danger">
                                  {meta.error}
                                </p>
                              )}
                            </div>
                          )}
                        </Field>
                      </div>
                    </Col>
                    <Col Col lg="6" md="12">
                      <div>
                        <label className="signup_form_label">
                          Designation{" "}
                        </label>
                        <Field name="Designation">
                          {({ input, meta }) => (
                            <div className="position-relative">
                              <input
                                type="text"
                                {...input}
                                className="form-control signup_form_input margin_bottom"
                                placeholder="Student"
                              />
                              {meta.touched && meta.error && (
                                <p className="alert alert-danger  position-absolute w-100 mt-1 py-1 text-danger">
                                  {meta.error}
                                </p>
                              )}
                            </div>
                          )}
                        </Field>
                      </div>
                    </Col>
                    <Col Col lg="6" md="12">
                      <div>
                        <label className="signup_form_label">Email </label>
                        <Field name="Email">
                          {({ input, meta }) => (
                            <div className="position-relative">
                              <input
                                type="text"
                                {...input}
                                className="form-control signup_form_input margin_bottom"
                                placeholder="Enter Email"
                              />
                              {meta.touched && meta.error && (
                                <p className="alert alert-danger  position-absolute w-100 mt-1 py-1 text-danger">
                                  {meta.error}
                                </p>
                              )}
                            </div>
                          )}
                        </Field>
                      </div>
                    </Col>
                    <Col Col lg="6" md="12">
                      <div>
                        <label className="signup_form_label">Password </label>
                        <Field name="Password">
                          {({ input, meta }) => (
                            <div className="position-relative">
                              <input
                                type="password"
                                {...input}
                                className="form-control signup_form_input margin_bottom"
                                placeholder="Enter Password"
                              />
                              {meta.touched && meta.error && (
                                <p className="alert alert-danger  position-absolute w-100 mt-1 py-1 text-danger">
                                  {meta.error}
                                </p>
                              )}
                            </div>
                          )}
                        </Field>
                      </div>
                    </Col>
                    <Col Col lg="6" md="12">
                      <div>
                        <label className="signup_form_label">
                          Mobile Number{" "}
                        </label>
                        <Field name="number">
                          {({ input, meta }) => (
                            <div className="position-relative">
                              <input
                                {...input}
                                type="text"
                                className="form-control signup_form_input margin_bottom"
                                placeholder="Enter Mobile Number"
                              />
                              {meta.touched && meta.error && (
                                <p className="alert alert-danger  position-absolute w-100 mt-1 py-1 text-danger">
                                  {meta.error}
                                </p>
                              )}
                            </div>
                          )}
                        </Field>
                      </div>
                    </Col>
                    <Col Col lg="6" md="12">
                      <div>
                        <label className="signup_form_label">
                          Area of Expertise{" "}
                        </label>
                        <Field name="area">
                          {({ input, meta }) => (
                            <div className="position-relative">
                              <input
                                {...input}
                                type="text"
                                className="form-control signup_form_input margin_bottom"
                                placeholder="Enter Area of Expertise"
                              />
                              {meta.touched && meta.error && (
                                <p className="alert alert-danger  position-absolute w-100 mt-1 py-1 text-danger">
                                  {meta.error}
                                </p>
                              )}
                            </div>
                          )}
                        </Field>
                      </div>
                    </Col>
                    <Col Col lg="6" md="12">
                      <div>
                        <label className="signup_form_label">
                          Highest Education{" "}
                        </label>
                        <Field name="education">
                          {({ input, meta }) => (
                            <div className="position-relative">
                              <input
                                {...input}
                                type="text"
                                className="form-control signup_form_input margin_bottom"
                                placeholder="Enter Highest Education"
                              />
                              {meta.touched && meta.error && (
                                <p className="alert alert-danger  position-absolute w-100 mt-1 py-1 text-danger">
                                  {meta.error}
                                </p>
                              )}
                            </div>
                          )}
                        </Field>
                      </div>
                    </Col>
                    <Col Col lg="6" md="12">
                      <div>
                        <label className="signup_form_label">
                          Accomplishments{" "}
                        </label>
                        <Field name="Accomplishments">
                          {({ input, meta }) => (
                            <div className="position-relative">
                              <input
                                {...input}
                                type="text"
                                className="form-control signup_form_input margin_bottom"
                                placeholder="Enter Accomplishments"
                              />
                              {meta.touched && meta.error && (
                                <p className="alert alert-danger  position-absolute w-100 mt-1 py-1 text-danger">
                                  {meta.error}
                                </p>
                              )}
                            </div>
                          )}
                        </Field>
                      </div>
                    </Col>
                    <Col Col lg="6" md="12">
                      <div>
                        <label className="signup_form_label">
                          Total Expirence{" "}
                        </label>
                        <Field name="Expirence">
                          {({ input, meta }) => (
                            <div className="position-relative">
                              <input
                                {...input}
                                type="text"
                                className="form-control signup_form_input margin_bottom"
                                placeholder="Enter Expirence"
                              />
                              {meta.touched && meta.error && (
                                <p className="alert alert-danger  position-absolute w-100 mt-1 py-1 text-danger">
                                  {meta.error}
                                </p>
                              )}
                            </div>
                          )}
                        </Field>
                      </div>
                    </Col>
                    <Col Col lg="12" md="12">
                      <div>
                        <label className="signup_form_label">Summary </label>
                        <Field name="Summary">
                          {({ input, meta }) => (
                            <div className="position-relative">
                              <textarea
                                {...input}
                                type="text"
                                className="form-control signup_form_input summary_input margin_bottom"
                                placeholder="Enter Summary..."
                              />

                              {meta.touched && meta.error && (
                                <p className="alert alert-danger  position-absolute w-100 mt-1 py-1 text-danger">
                                  {meta.error}
                                </p>
                              )}
                            </div>
                          )}
                        </Field>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12} className="text-center">
                      <Button className="admin_signup_btn me-4" type="btn">
                        Save Changes
                      </Button>
                      <Button className="admin_signup_btn" type="btn">
                        Account Activate
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Container>
            </form>
          );
        }}
      />
    </>
  );
};

export default EditProfile;
