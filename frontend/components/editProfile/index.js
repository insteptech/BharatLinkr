import Image from "next/image";
import React from "react";
import { Accordion, Button, Col, Container, Row } from "react-bootstrap";
import { Field, Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/actions/auth";
import { toast } from "react-toastify";

import { apibasePath } from "../../config";

import { useEffect } from "react";
import { getToken } from "../utils";
import { useRouter } from "next/router";
import { friendRequestStatus, getPendingFriendRequest } from "../../redux/actions/user/userActions";
import NoDataPage from "../common-components/NoDataPage/NoDataPage";

const EditProfile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const loginStatus = useSelector((state) => state?.userSlice.loginStatus);
  const currentUser = useSelector((state) => state?.userSlice.currentUser);
  const friendList = useSelector((state) => state?.userSlice.friendList);
  const freindCount = useSelector((state) => state?.userSlice.freindCount);
  useEffect(() => {
    if (!getToken() && router.pathname.includes("editprofile")) {
      router.push("/"); // redirect to the home page when user not logged in
    }
    if (loginStatus && currentUser) dispatch(getPendingFriendRequest({ id: currentUser.id }))
  }, [dispatch, currentUser]);

  const onSubmit = (values) => {
    const payload = {
      id: currentUser.id,
      name: values.name,
      areaOfExpertise: values.area,
      designation: values.Designation,
      email: values.Email,
      number: values.number,
      totalExperience: values.Expirence,
      accomplishments: values.Accomplishments,
      education: values.education,
      summary: values.Summary,
    };
    const formData = new FormData();
    if (values.profilePhoto) {
      dataFomrs.append("profile", values?.profilePhoto);
    }
    if (values.coverPhoto) {
      dataFomrs.append("cover", values?.coverPhoto);
    }
    formData.append("profileData", JSON.stringify(payload));
    dispatch(getUsers(formData)).then((res) => {
      if (res.payload?.success === true) {
        toast.success("Profile updated successfully!");
      }
    });
  };

  const handleRequestStatus = (userObject, status) => {
    let requestData = {
      FriendRequest: [{
        recieverId: userObject.id,
        senderId: currentUser.id,
        status: status
      }]
    }
    if (loginStatus) dispatch(friendRequestStatus(requestData)).then(res => {
      if (res.payload[0]) {
        toast.success(res.payload[0].status)
      }
    })
  }
  return (
    <>
      <Form
        onSubmit={onSubmit}
        initialValues={
          currentUser
            ? currentUser && {
              name: currentUser.name,
              area: currentUser.areaOfExpertise,
              Designation: currentUser.designation,
              Email: currentUser.email,
              number: currentUser.mobileNumber,
              Expirence: currentUser.totalExperience,
              Accomplishments: currentUser.accomplishments,
              education: currentUser.highestEducation,
              Summary: currentUser.summary,
            }
            : ""
        }
        render={({ handleSubmit, pristine }) => {
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
                        height={1080}
                        width={1080}
                        className={
                          currentUser?.coverPhoto
                            ? "img-fluid user_profile_cover_img"
                            : "user_profile_cover_img_dammy"
                        }
                        // src={`${apibasePath}documents/userProfile/${currentUser?.coverPhoto}`}
                        src={
                          currentUser?.coverPhoto
                            ? `${apibasePath}documents/userProfile/${currentUser?.coverPhoto}`
                            : "/images/dammy-cover-1.svg"
                        }
                      />
                      <div className="profile_hero_edit_icon_row">
                        <div className="profile_hero_img_col">
                          <Image
                            height={1080}
                            width={1080}
                            className="profile_hero_img"
                            src={
                              currentUser?.profilePhoto
                                ? `${apibasePath}documents/userProfile/${currentUser?.profilePhoto}`
                                : "/images/dammy.svg"
                            }
                          />
                          <div className="profile_pen_bg logo_pen">
                                  <img className="pen" src="/images/pen.png" />
                          </div>
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
                                placeholder="*****************"
                                disabled={true}
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
                    <Accordion >
                      <Accordion.Item eventKey={'friend'}>
                        <Accordion.Header>
                          <p className="friend_request fw-bold">
                            Pending Friend Request <span className="fw-bold">{freindCount ? freindCount : ''}</span>
                          </p>
                        </Accordion.Header>
                        <Accordion.Body>
                          {friendList && friendList.length > 0 ? friendList.map((listItem, listIndex) => (
                            <div className="d-flex justify-content-between">
                              <div className="d-flex gap-4 fw-bold">
                                <p>{listIndex + 1}.</p>
                                <img
                                  src={
                                    listItem?.profilePhoto
                                      ? `${apibasePath}documents/userProfile/${listItem?.profilePhoto}`
                                      : "/images/dammy.svg"}
                                />
                                <p className="friend_request fw-bold">
                                  {listItem.name}
                                </p>
                              </div>
                              <div>
                                <button
                                  className="suggested_card_btn suggested_card_link_btn"
                                  type="button"
                                  onClick={() => handleRequestStatus(listItem, true)}
                                >
                                  Accept
                                </button>
                                <button
                                  className=" suggested_card_btn"
                                  onClick={() => handleRequestStatus(listItem, false)}
                                  type="button"
                                >
                                  Decline
                                </button>
                              </div>

                            </div>
                          )) : <NoDataPage name='Friends' />}
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </Row>
                  <Row>
                    <Col lg={12} className="text-center">
                      <Button className="admin_signup_btn me-4" type="btn" disabled={pristine}>
                        Save Changes
                      </Button>
                      <Button className="admin_signup_btn" type="btn" disabled={pristine}>
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
