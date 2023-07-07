import React, { useState } from "react";
import { Col, Container, Row, Form as Bootform } from "react-bootstrap";
import { Field, Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { getColleges } from "../../redux/actions/college/college";
import { useEffect } from "react";
import { getCourse } from "../../redux/actions/course/addcourse";
import { getCityList } from "../../redux/actions/location/createCity";
import { getState } from "../../redux/actions/location/createState";
import { components } from "react-select";
import Image from "next/Image";

function Reviews() {
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState("common");
  const handleTabSelect = (event) => {
    setSelectedTab(event.target.value);
  };
  const handleSubmit = (values) => {
    dispatch(getColleges(values));
    dispatch(getCityList(values));
    dispatch(getState(values));
  };
  const collegeNameList = useSelector(
    (state) => state?.collegelist?.collegelist?.rows
  );
  const stateNameList = useSelector(
    (state) => state?.stateList?.stateList?.data?.data?.rows
  );
  const cityNameList = useSelector(
    (state) => state?.cityList?.cityList?.data?.data?.rows
  );
  const courseNameList = useSelector(
    (state) => state?.courseList?.courselist?.data?.rows
  );
  useEffect(() => {
    dispatch(getColleges());
    dispatch(getCourse());
    dispatch(getCityList());
    dispatch(getState());
  }, []);

  const initialValues = {
    selectTab: "ChooseColleges",
    organisation: "",
    chooseCollege: "",
    chooseCourse: "",
    studentName: "",
    Gender: "",
    email: "",
    mobileNumber: "",
    city: "",
    stateName: "",
    enrollmentYear: "",
    programFees: "",
    reviewTitle: "",
    desciption: "",
  };

  return (
    <>
      <Container className="result_container_padding">
        <Row>
          <Col lg={12} className="text-center ">
            <h2 className="edit_profile_h2">How was your experience?</h2>
          </Col>
        </Row>
        <Form
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validate={(values) => {
            const errors = {};
            if (!values.selectTab) {
              errors.selectTab = "*";
            }
            if (!values.chooseCollege) {
              errors.chooseCollege = "*";
            }
            if (!values.organisation) {
              errors.organisation = "*";
            }
            if (!values.chooseCourse) {
              errors.chooseCourse = "*";
            }
            if (!values.studentName) {
              errors.studentName = "*";
            }
            if (!values.Gender) {
              errors.Gender = "*";
            }
            if (!values.email) {
              errors.email = "*";
            }
            if (!values.mobileNumber) {
              errors.mobileNumber = "*";
            }
            if (!values.city) {
              errors.city = "*";
            }
            if (!values.state) {
              errors.state = "*";
            }
            if (!values.studentName) {
              errors.studentName = "*";
            }
            if (!values.enrollmentYear) {
              errors.enrollmentYear = "*";
            }
            if (!values.programFees) {
              errors.programFees = "*";
            }
            if (!values.reviewTitle) {
              errors.reviewTitle = "*";
            }
            if (!values.desciption) {
              errors.desciption = "*";
            }
            return errors;
          }}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <Row>
                <Col lg="9" md="8">
                  <Field name="selectTab">
                    {({ input, meta }) => (
                      <div>
                        <div className="d-flex">
                          <label className="signup_form_label">Select</label>
                          {meta.error && meta.touched && (
                            <span className="text-danger required_msg">
                              {meta.error}
                            </span>
                          )}
                        </div>
                        <select
                          {...input}
                          type="select"
                          className="form-control signup_form_input "
                          placeholder="ChooseselectTab"
                        >
                          <option value="ChooseColleges">College</option>
                          <option value="ChooseOrganisation">
                            Organisation
                          </option>
                        </select>
                        <div className="text-end">
                          <img
                            className="select_down_icon"
                            src="/images/down.png"
                          />
                        </div>
                      </div>
                    )}
                  </Field>
                </Col>
              </Row>
              {values.selectTab === "ChooseOrganisation" ? (
                <>
                  <Row>
                    <Col lg="6" md="12">
                      <Field name="state" component="input">
                        {({ input, meta }) => (
                          <div>
                            {meta.error && meta.touched && (
                              <span>{meta.error}</span>
                            )}
                            <label className="signup_form_label">State</label>
                            <select
                              {...input}
                              type="text"
                              className="form-control signup_form_input margin_bottom"
                              placeholder="choose state"
                            >
                              <option value="">Choose state</option>
                              {stateNameList &&
                                stateNameList?.map((item, index) => {
                                  return (
                                    <option key={index} value={item.id}>
                                      {item.state}
                                    </option>
                                  );
                                })}
                            </select>
                          </div>
                        )}
                      </Field>
                    </Col>
                    <Col lg="6" md="12">
                      <Field name="city" component="input">
                        {({ input, meta }) => (
                          <div>
                            {meta.error && meta.touched && (
                              <span>{meta.error}</span>
                            )}
                            <label className="signup_form_label">City</label>
                            <select
                              {...input}
                              type="text"
                              className="form-control signup_form_input margin_bottom"
                            >
                              <option>Choose city</option>
                              {cityNameList &&
                                cityNameList?.map((item, index) => {
                                  return (
                                    <option key={index} value={item.id}>
                                      {item.name}
                                    </option>
                                  );
                                })}
                            </select>
                          </div>
                        )}
                      </Field>
                    </Col>
                    <Col lg="9" md="12">
                      <Field name="organisation" component="input">
                        {({ input, meta }) => (
                          <div>
                            {meta.error && meta.touched && (
                              <span>{meta.error}</span>
                            )}
                            <label className="signup_form_label">
                              Organisation
                            </label>
                            <select
                              {...input}
                              type="text"
                              className="form-control signup_form_input margin_bottom"
                              placeholder="Organisation"
                            >
                              <option value="">Organisation</option>
                              <option>organistaion 1</option>
                              <option>organistaion 2</option>
                            </select>
                          </div>
                        )}
                      </Field>
                    </Col>
                    <Col lg={3} md={4}>
                      <div className="cant_find_div">
                        <span className="cant_find">Can't find Company</span>{" "}
                        <Image
                          alt="img"
                          className="ms-1"
                          width={20}
                          height={20}
                          src="/images/blue-q-icon.svg"
                        />
                      </div>
                    </Col>
                    <Col lg="9" md="12">
                      <Field name="jobtitle" component="input">
                        {({ input, meta }) => (
                          <div>
                            {meta.error && meta.touched && (
                              <span>{meta.error}</span>
                            )}
                            <label className="signup_form_label">
                              Job title
                            </label>
                            <input
                              {...input}
                              type="text"
                              className="form-control signup_form_input margin_bottom"
                              placeholder="Enter job title"
                            />
                          </div>
                        )}
                      </Field>
                    </Col>
                  </Row>{" "}
                </>
              ) : (
                <Row>
                  <Col lg="9" md="8">
                    <Field name="chooseCollege" component="input">
                      {({ input, meta }) => (
                        <div>
                          <div className="d-flex">
                            <label className="signup_form_label">
                              Choose College
                            </label>
                            {meta.error && meta.touched && (
                              <span className="text-danger required_msg">
                                {meta.error}
                              </span>
                            )}
                          </div>
                          <select
                            {...input}
                            type="text"
                            className="form-control signup_form_input "
                            placeholder="Choose College"
                          >
                            <option value="">College</option>
                            {collegeNameList &&
                              collegeNameList.map((item, index) => (
                                <option value={item.id} key={index}>
                                  {item.collegeName}
                                </option>
                              ))}
                          </select>
                          <div className="text-end">
                            <img
                              className="select_down_icon"
                              src="/images/down.png"
                            />
                          </div>
                        </div>
                      )}
                    </Field>
                  </Col>
                  <Col lg={3} md={4}>
                    <div className="cant_find_div">
                      <span className="cant_find mobile_font_16">
                        Can't find college
                      </span>{" "}
                      <Image
                        alt="img"
                        className="ms-1"
                        width={20}
                        height={20}
                        src="/images/blue-q-icon.svg"
                      />
                    </div>
                  </Col>

                  <Col lg="9" md="12">
                    <Field name="chooseCourse" component="input">
                      {({ input, meta }) => (
                        <div>
                          <div className="d-flex">
                            <label className="signup_form_label">
                              Choose Course
                            </label>
                            {meta.error && meta.touched && (
                              <span className="text-danger required_msg">
                                {meta.error}
                              </span>
                            )}
                          </div>
                          <select
                            {...input}
                            type="text"
                            className="form-control signup_form_input "
                            placeholder=" Choose Course"
                          >
                            <option>Courses</option>
                            {courseNameList &&
                              courseNameList.map((item, index) => (
                                <option value={item.id} key={index}>
                                  {item.courseName}
                                </option>
                              ))}
                          </select>
                          <div className="text-end">
                            <img
                              className="select_down_icon"
                              src="/images/down.png"
                            />
                          </div>
                        </div>
                      )}
                    </Field>
                  </Col>
                </Row>
              )}
              <h3 className="basic_heading mobile_font_16">Basic info</h3>
              <Row>
                <Col lg="6" md="12">
                  <Field name="studentName" component="input">
                    {({ input, meta }) => (
                      <div>
                        <div className="d-flex">
                          <label className="signup_form_label">Name</label>
                          {meta.error && meta.touched && (
                            <span className="text-danger required_msg">
                              {meta.error}
                            </span>
                          )}
                        </div>

                        <input
                          {...input}
                          name="studentName"
                          component="input"
                          type="text"
                          className="form-control signup_form_input margin_bottom"
                          placeholder="Name"
                        />
                      </div>
                    )}
                  </Field>
                </Col>
                <Col lg="6" md="12">
                  <Field name="Gender">
                    {({ input, meta }) => (
                      <div>
                        <div className="d-flex">
                          <label className="signup_form_label">Gender</label>
                          {meta.error && meta.touched && (
                            <span className="text-danger required_msg">
                              {meta.error}
                            </span>
                          )}
                        </div>

                        <select
                          {...input}
                          //   component="input"
                          //   type="password"
                          className="form-control signup_form_input "
                          placeholder="Select your Gender"
                        >
                          <option>Gender</option>
                          <option>male</option>
                          <option>Female</option>
                        </select>
                        <div className="text-end">
                          <img
                            className="select_down_icon"
                            src="/images/down.png"
                          />
                        </div>
                      </div>
                    )}
                  </Field>
                </Col>
              </Row>
              <Row>
                <Col lg="6" md="12">
                  <Field name="email">
                    {({ input, meta }) => (
                      <div>
                        <div className="d-flex">
                          <label className="signup_form_label">Email</label>
                          {meta.error && meta.touched && (
                            <span className="text-danger required_msg">
                              {meta.error}
                            </span>
                          )}
                        </div>

                        <input
                          {...input}
                          type="email"
                          className="form-control signup_form_input margin_bottom"
                          placeholder="Noor@gmail.com"
                        />
                      </div>
                    )}
                  </Field>
                </Col>
                <Col lg="6" md="12">
                  <Field name="mobileNumber">
                    {({ input, meta }) => (
                      <div>
                        <div className="d-flex">
                          <label className="signup_form_label">
                            Mobile Number
                          </label>
                          {meta.error && meta.touched && (
                            <span className="text-danger required_msg">
                              {meta.error}
                            </span>
                          )}
                        </div>

                        <input
                          {...input}
                          type="number"
                          className="form-control signup_form_input margin_bottom"
                          placeholder="+91-1024421214"
                        />
                      </div>
                    )}
                  </Field>
                </Col>
              </Row>
              <Row>
                <Col lg="6" md="12">
                  <Field name="stateName">
                    {({ input, meta }) => (
                      <div>
                        <div className="d-flex">
                          <label className="signup_form_label">State</label>
                          {meta.error && meta.touched && (
                            <span className="text-danger required_msg">
                              {meta.error}
                            </span>
                          )}
                        </div>

                        <select
                          {...input}
                          type="text"
                          className="form-control signup_form_input "
                          placeholder="State Name"
                        >
                          <option>Courses</option>
                          {stateNameList &&
                            stateNameList.map((item, index) => (
                              <option value={item.id} key={index}>
                                {item.state}
                              </option>
                            ))}
                        </select>
                        <div className="text-end">
                          <img
                            className="select_down_icon"
                            src="/images/down.png"
                          />
                        </div>
                      </div>
                    )}
                  </Field>
                </Col>
                <Col lg="6" md="12">
                  <Field name="city">
                    {({ input, meta }) => (
                      <div>
                        <div className="d-flex">
                          <label className="signup_form_label">City</label>
                          {meta.error && meta.touched && (
                            <span className="text-danger required_msg">
                              {meta.error}
                            </span>
                          )}
                        </div>

                        <select
                          {...input}
                          type="text"
                          className="form-control signup_form_input "
                          placeholder="select city"
                        >
                          <option value="">Select city</option>
                          {cityNameList &&
                            cityNameList.map((item, index) => {
                              return (
                                <option value={item.id} key={index}>
                                  {item.name}
                                </option>
                              );
                            })}
                        </select>
                        <div className="text-end">
                          <img
                            className="select_down_icon"
                            src="/images/down.png"
                          />
                        </div>
                      </div>
                    )}
                  </Field>
                </Col>
              </Row>
              {values.selectTab === "ChooseOrganisation" ? (
                <>
                  <h3 className="basic_heading">Company Info</h3>
                  <Row>
                    <Col lg="6" md="12">
                      <Field name="company info">
                        {({ input, meta }) => (
                          <div>
                            {meta.error && meta.touched && (
                              <span>{meta.error}</span>
                            )}
                            <label className="signup_form_label">
                              Company Info
                            </label>
                            <input
                              {...input}
                              type="text"
                              className="form-control signup_form_input margin_bottom"
                              placeholder="Company Info"
                            />
                          </div>
                        )}
                      </Field>
                    </Col>
                    <Col lg="6" md="12">
                      <Field name="Joining Year">
                        {({ input, meta }) => (
                          <div>
                            {meta.error && meta.touched && (
                              <span>{meta.error}</span>
                            )}
                            <label className="signup_form_label">
                              Joining Year
                            </label>
                            <input
                              {...input}
                              type="date"
                              className="form-control signup_form_input margin_bottom"
                              // placeholder="Enter program fees"
                            />
                          </div>
                        )}
                      </Field>
                    </Col>
                    <Col lg="12" md="12">
                      <Field name="Salary">
                        {({ input, meta }) => (
                          <div>
                            <div className="d-flex">
                              <label className="signup_form_label">
                                Salary
                              </label>
                              {meta.error && meta.touched && (
                                <span className="text-danger required_msg">
                                  {meta.error}
                                </span>
                              )}
                            </div>

                            <input
                              {...input}
                              type="text"
                              className="form-control signup_form_input margin_bottom"
                              placeholder="Enter Salary"
                            />
                          </div>
                        )}
                      </Field>
                    </Col>
                  </Row>
                </>
              ) : (
                <>
                  <h3 className="basic_heading mobile_font_16">College Info</h3>
                  <Row>
                    <Col lg="6" md="12">
                      <Field name="enrollmentYear">
                        {({ input, meta }) => (
                          <div>
                            <div className="d-flex">
                              <label className="signup_form_label">
                                Enrollment Year
                              </label>
                              {meta.error && meta.touched && (
                                <span className="text-danger required_msg">
                                  {meta.error}
                                </span>
                              )}
                            </div>

                            <input
                              {...input}
                              type="text"
                              className="form-control signup_form_input margin_bottom"
                              placeholder="Choose Year"
                            />
                          </div>
                        )}
                      </Field>
                    </Col>
                    <Col lg="6" md="12">
                      <Field name="programFees">
                        {({ input, meta }) => (
                          <div>
                            <div className="d-flex">
                              <label className="signup_form_label">
                                Program Fees
                              </label>
                              {meta.error && meta.touched && (
                                <span className="text-danger required_msg">
                                  {meta.error}
                                </span>
                              )}
                            </div>

                            <input
                              {...input}
                              type="text"
                              className="form-control signup_form_input margin_bottom"
                              placeholder="Enter program fees"
                            />
                          </div>
                        )}
                      </Field>
                    </Col>
                    <Col lg={12}>
                      <h6 className="cant_find mt-2 mobile_font_14">
                        Rate your college based on overall experience
                      </h6>
                    </Col>
                    <Col lg={12} className="">
                      <div className="mb-4 mt-2">
                        <Image
                          alt="img"
                          width={40}
                          height={40}
                          className="rating_icon"
                          src="/images/angry.svg"
                        />
                        <Image
                          alt="img"
                          width={40}
                          height={40}
                          className="rating_icon"
                          src="/images/imogi-2.svg"
                        />
                        <Image
                          alt="img"
                          width={40}
                          height={40}
                          className="rating_icon"
                          src="/images/imogi-3.svg"
                        />
                        <Image
                          alt="img"
                          width={40}
                          height={40}
                          className="rating_icon"
                          src="/images/red-heart.svg"
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6" md="12">
                      <Field name="reviewTitle">
                        {({ input, meta }) => (
                          <div>
                            <div className="d-flex">
                              <label className="signup_form_label">
                                Review Title
                              </label>
                              {meta.error && meta.touched && (
                                <span className="text-danger required_msg">
                                  {meta.error}
                                </span>
                              )}
                            </div>

                            <input
                              {...input}
                              component="input"
                              type="text"
                              className="form-control signup_form_input margin_bottom"
                              placeholder="Give a nice title to your review.."
                            />
                          </div>
                        )}
                      </Field>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="12" md="12">
                      <Field name="desciption">
                        {({ input, meta }) => (
                          <div>
                            <div className="d-flex">
                              <label className="signup_form_label">
                                Describe your college here
                              </label>
                              {meta.error && meta.touched && (
                                <span className="text-danger required_msg">
                                  {meta.error}
                                </span>
                              )}
                            </div>

                            {/* <input
                              {...input}
                              component="input"
                              type="textarea"
                              rows={4}
                              className="form-control signup_form_input summary_input margin_bottom"
                              placeholder="Please share the reason to join this college and share your experiences in this college..."
                            /> */}
                            <Bootform.Control
                              {...input}
                              className="form-control signup_form_input summary_input margin_bottom"
                              as="textarea"
                              placeholder="Please share the reason to join this college and share your experiences in this college..."
                              aria-label="With textarea"
                            />
                          </div>
                        )}
                      </Field>
                    </Col>
                  </Row>
                </>
              )}
              <Row>
                <Col lg={12} className="text-center">
                  <button
                    className="admin_signup_btn review_submit_btn"
                    type="submit"
                  >
                    Submit
                  </button>
                </Col>
              </Row>
            </form>
          )}
        />
      </Container>
    </>
  );
}

export default Reviews;
