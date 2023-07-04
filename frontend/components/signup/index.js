import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Field, Form } from "react-final-form";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";
import { getUsers, verifyOtp } from "../../redux/actions/auth";
import { getState } from "../../redux/actions/location/createState";
import { signupAsync } from "../../redux/signup/signupSlice";
import { FieldTypes, inputFieldTypes } from "../../utils/helper";
import FormGenerator from "../common-components/Form/FormGenerator";
import { cityDropdown } from "../../redux/actions/location/createCity";
import Image from "next/image";
import LoaderPage from "../common-components/loader";

function SignUpPage() {
  const [dataValue, setDataValue] = useState(0);
  const [mobileNum, setMobileNum] = useState();
  const [otp, setOtp] = useState("");
  const [usertype, setUsertype] = useState("");
  const FormSteps = ["Step  1", "Step 2"];
  const [image, setImage] = useState("");
  const [formImage, setFormImage] = useState(null);

  let otpCall = useSelector((state) => state);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getState());
  }, []);
  const initialValuesStudent = {
    userType: "",
    name: "",
    designation: "",
    email: "",
    mobileNumber: "",
    state: "",
    school_college_company: "",
    highestEducation: "",
    summary: "",
    expertise: "",
    accomplishments: "",
    experience: "",
    profilePhoto: "",
    coverPhoto: "",
    password: "",
    confirmPassword: "",
  };

  const initialValuesCollege = {
    userType: "",
    email: "",
    mobileNumber: "",
    state: "",
    city: "",
    website: "",
    college: "",
    password: "",
    confirmPassword: "",
  };

  const initialValuesOrganization = {
    userType: "",
    email: "",
    mobileNumber: "",
    state: "",
    city: "",
    password: "",
    confirmPassword: "",
    orgcategory: "",
    selectcompany: "",
    headorregofc: "",
  };

  const stateList = useSelector((state) => state?.stateList?.stateList?.data?.data?.rows);
  const cityListByState = useSelector(state => state.cityList?.cityList?.data?.result)
  const isRegistering = useSelector(state => state.signUp.isRegistering)

  const validate = (values) => {
    const errors = {};

    if (!values.userType) {
      errors["userType"] = " Select A User Type";
    }

    if (!values.name && values?.usertype === "Student") {
      errors.name = "*";
    }
    if (!values.designation && values?.usertype === "Student") {
      errors["designation"] = "*";
    }
    if (
      !values.email ||
      values?.usertype === "Student" ||
      values?.usertype === "College" ||
      values?.usertype === "Organization"
    ) {
      errors.email = "*";
    }
    if (
      !values.mobileNumber ||
      values?.usertype === "Student" ||
      values?.usertype === "College" ||
      values?.usertype === "Organization"
    ) {
      errors.mobileNumber = { ...errors.mobileNumber, required: "*" };
    }

    if (values.mobileNumber && !values.mobileNumber.match(/^[0-9]{10}$/)) {
      errors.mobileNumber = { ...errors.mobileNumber, fieldError: "Mobile Number should be of 10 digits" };
    }
    if (
      !values.state ||
      values?.usertype === "Student" ||
      values?.usertype === "College" ||
      values?.usertype === "Organization"
    ) {
      errors["state"] = "*";
    }
    if (!values.profilePhoto && values?.usertype === "Student") {
      errors.profilePhoto = "*";
    }
    if (!values.coverPhoto && values?.usertype === "Student") {
      errors.coverPhoto = "*";
    }
    if (!values.school_college_company && values?.usertype === "Student") {
      errors["school_college_company"] = "*";
    }
    if (!values.highestEducation && values?.usertype === "Student") {
      errors["highestEducation"] = "*";
    }
    if (
      !values.city &&
      (values?.usertype === "College" || values?.usertype === "Organization")
    ) {
      errors["city"] = "*";
    }
    if (!values.website && values?.usertype === "College") {
      errors["website"] = "*";
    }
    if (!values.college && values?.usertype === "College") {
      errors["college"] = "*";
    }

    if (
      !values.password ||
      values?.usertype === "Student" ||
      values?.usertype === "College" ||
      values?.usertype === "Organization"
    ) {
      errors["password"] = "*";
    }
    if (
      !values.confirmPassword ||
      values?.usertype === "Student" ||
      values?.usertype === "College" ||
      values?.usertype === "Organization"
    ) {
      errors["confirmPassword"] = "*";
    } else if (
      values.password &&
      values.confirmPassword &&
      values.password !== values.confirmPassword
    ) {
      errors["confirmPassword"] = "Both passwords must match";
    }

    if (dataValue === 1) {
    }

    return errors;
  };

  const router = useRouter();
  const handleOtp = (values) => {
    let newVal = JSON.stringify(values);
    newVal = { mobileNumber: mobileNum, otp: Number(values) };
    dispatch(verifyOtp(newVal)).then((res) => {
      if (res?.payload?.success) {
        toast.success("Otp Verified");
        router.push("/login");
      } else {
        toast.error(res?.payload?.message);
      }
    });
  };

  const handleSubmit = (values) => {

    const payload = {
      accomplishments: values.accomplishments,
      designation: values.designation,
      email: values.email.toLowerCase(),
      totalExperience: values.experience,
      areaOfExpertise: values.expertise,
      highestEducation: values.highestEducation,
      mobileNumber: values.mobileNumber,
      name: values.name,
      password: values.password,
      school_college_company: values.school_college_company,
      stateId: Number(values.state),
      cityId: Number(values.city),
      summary: values.summary,
      userType: values.userType,

      // college values
      website: values.website,
      college: values.college,

      //organization values
      company: values.company,
      orgcategory: values.orgcategory,
      headregofc: values.headregofc,

    }

    setMobileNum(values.mobileNumber);

    const dataFomrs = new FormData();
    if (values.profilePhoto) {
      dataFomrs.append("profile", values?.profilePhoto);
    }
    if (values.coverPhoto) {
      dataFomrs.append("cover", values?.coverPhoto);
    }
    dataFomrs.append("profileData", JSON.stringify(payload));

    dispatch(getUsers(dataFomrs))
      .then(res => {
        if (res.payload.data.success) {
          setDataValue(1);
        } else {
          toast.info(res.payload.data.message)
        }
      });
  };

  const memoizedInitialValue = (e) => {
    if (e && Object.keys(e).length > 0) {
      return e;
    } else {
      if (usertype !== "College") {
        return initialValuesStudent;
      }
      if (usertype === "College") {
        return initialValuesCollege;
      }
      if (usertype === "organization") {
        return initialValuesOrganization;
      }
    }
  }

  const handleCityDropdown = ({ target: { value } }) => {
    dispatch(cityDropdown({ stateId: value }))
  }

  return (
    <>
      <Container className="p-3">
        <Row>
          <Col className="d-flex">
            <div className="text-center signup_logo_headings mt-4">
              <Image width={240} height={40} src="images/bharat-logo.svg" />
              <p className="f-22 logo_sub_heading"> Create Your Account</p>
            </div>
          </Col>
        </Row>
        {isRegistering && <LoaderPage />}
        <Row>
          <ul className="nav ps-2 pe-2">
            {FormSteps &&
              FormSteps.map((steps, stepsIndex) => (
                <li className="nav-item form_tabs" key={stepsIndex}>
                  <a
                    className={`nav-link btn_tabs admin_tabs_name ${dataValue === stepsIndex && "head-active"
                      }`}
                    active={true}
                    onClick={() => setDataValue(stepsIndex)}
                  >
                    {steps}
                  </a>
                </li>
              ))}
          </ul>
        </Row>

        <Row className="mt-5">
          <div className={`${dataValue === 1 && "signup_otp_page"}`}>
            {dataValue === 1 && (
              <>
                <p className="otp_heading">
                  OTP has been sent on your given mobile number or email.
                </p>
                <label className="otp_text">Enter 6 Digit Mobile OTP</label>
                <Row>
                  <Col lg={12}>
                    <div className="text-center otp_div">
                      <OtpInput
                        className="otp_input"
                        value={otp}
                        onChange={(e) => setOtp(e)}
                        numInputs={6}
     
                        separator={<span></span>}
                      />
                    </div>
                  </Col>
                </Row>
                <button
                  className="admin_signup_btn"
                  onClick={() => handleOtp(otp)}
                >
                  Verify
                </button>
              </>
            )}

            <Form
              onSubmit={handleSubmit}
              // mutators={{
              //   ...arrayMutators
              // }}
              keepDirtyOnReinitialize
              validate={validate}
              initialValues={(e) => memoizedInitialValue(e)}
              render={({ handleSubmit, values, form: { change } }) => dataValue === 0 && (
                <form onSubmit={handleSubmit}>
                  <>
                    <Row>
                      <Col lg={6} md={12}>
                        <label className="signup_form_label">
                          Select User Type
                        </label>
                        <Field name="userType">
                          {({ input, meta }) => (
                            <>
                              {meta.touched && meta.error && (
                                <span className="text-danger">
                                  {meta.error}
                                </span>
                              )}
                              <select
                                {...input}
                                className="form-control select-style signup_form_input"
                              >
                                <option value="">--Select Usertype--</option>
                                <option>Student</option>
                                <option>College</option>
                                <option>Organization</option>
                              </select>
                              <div className="text-end">
                                <img
                                  className="select_down_icon"
                                  src="/images/down.png"
                                />
                              </div>
                            </>
                          )}
                        </Field>
                      </Col>
                      {values.userType == "" && (
                        <>
                          <Col md={12} lg={6}>
                            <Field name="name">
                              {({ input, meta }) => (
                                <div>
                                  <label className="signup_form_label">
                                    Name
                                  </label>
                                  <input
                                    {...input}
                                    type="text"
                                    className="form-control signup_form_input margin_bottom"
                                    placeholder="Enter Full Name"
                                  />
                                  {meta.error && meta.touched && (
                                    <span className="text-danger">
                                      {meta.error}
                                    </span>
                                  )}
                                </div>
                              )}
                            </Field>
                          </Col>
                          <Col md={12} lg={6}>
                            <Field name="designation">
                              {({ input, meta }) => (
                                <div>
                                  <div className="d-flex">
                                    <label className="signup_form_label">
                                      Designation
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
                                    placeholder="Designation"
                                  />
                                  {/* {meta.error && meta.touched && (
                                      <span className="text-danger">
                                        {meta.error}
                                      </span>
                                    )} */}
                                </div>
                              )}
                            </Field>
                          </Col>
                          <Col md={12} lg={6}>
                            <Field name="email">
                              {({ input, meta }) => (
                                <div>
                                  <div className="d-flex">
                                    <label className="signup_form_label">
                                      Email
                                    </label>
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
                                    placeholder="Enter Your Email"
                                  />
                                  {/* {meta.error && meta.touched && (
                                      <span className="text-danger">
                                        {meta.error}
                                      </span>
                                    )} */}
                                </div>
                              )}
                            </Field>
                          </Col>
                          <Col md={12} lg={6}>
                            <Field name="mobileNumber">
                              {({ input, meta }) => (
                                <div>
                                  <div className="d-flex">
                                    <label className="signup_form_label">
                                      Mobile Number
                                    </label>
                                    {meta.error && meta.touched && (
                                      <span className="text-danger required_msg">
                                        {meta.error.required}
                                      </span>
                                    )}
                                  </div>

                                  <input
                                    {...input}
                                    type="number"
                                    className="form-control signup_form_input margin_bottom"
                                    placeholder="Enter Mobile No."
                                  />
                                  {meta.error && meta.touched && (
                                    <span className="text-danger">
                                      {meta.error.fieldError}
                                    </span>
                                  )}
                                </div>
                              )}
                            </Field>
                          </Col>
                          <Col md={12} lg={6}>
                            <Field name="state">
                              {({ input, meta }) => (
                                <>
                                  <div className="d-flex">
                                    <label className="signup_form_label">
                                      State
                                    </label>
                                    {meta.error && meta.touched && (
                                      <span className="text-danger required_msg">
                                        {meta.error}
                                      </span>
                                    )}
                                  </div>
                                  <select
                                    {...input}
                                    className="form-control select-style signup_form_input "
                                  >
                                    <option value="">Choose State</option>
                                    {stateList &&
                                      stateList?.map((item) => {
                                        return (
                                          <option
                                            key={item.id}
                                            value={item?.countryId}
                                          >
                                            {item?.state}{" "}
                                          </option>
                                        );
                                      })}
                                  </select>
                                  {/* {meta.error && meta.touched && (
                                      <span className="text-danger">
                                        {meta.error}
                                      </span>
                                    )} */}
                                  <div className="text-end">
                                    <img
                                      className="select_down_icon"
                                      src="/images/down.png"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </Col>
                          <Col md={12} lg={6}>
                            <Field name="school_college_company_college_company">
                              {({ input, meta }) => (
                                <div>
                                  <div className="d-flex">
                                    <label className="signup_form_label">
                                      School/College/Company
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
                                    placeholder="School/College/Company"
                                  />
                                  {/* {meta.error && meta.touched && (
                                      <span className="text-danger">
                                        {meta.error}
                                      </span>
                                    )} */}
                                </div>
                              )}
                            </Field>
                          </Col>
                          <Col md={12} lg={6}>
                            <Field name="highestEducation">
                              {({ input, meta }) => (
                                <div>
                                  <div className="d-flex">
                                    <label className="signup_form_label">
                                      Highest Education
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
                                    placeholder="Enter your Highest Qualification"
                                  />
                                  {/* {meta.error && meta.touched && (
                                      <span className="text-danger">
                                        {meta.error}
                                      </span>
                                    )} */}
                                </div>
                              )}
                            </Field>
                          </Col>
                          <Col md={12} lg={12}>
                            <Field name="summary">
                              {({ input, meta }) => (
                                <div>
                                  <div className="d-flex">
                                    <label className="signup_form_label">
                                      Summary
                                    </label>
                                    {meta.error && meta.touched && (
                                      <span className="text-danger required_msg">
                                        {meta.error}
                                      </span>
                                    )}
                                  </div>

                                  <textarea
                                    {...input}
                                    type="textarea"
                                    rows="4"
                                    className="form-control signup_form_input summary_input margin_bottom"
                                    placeholder="Summary"
                                  />
                                  {/* {meta.error && meta.touched && (
                                      <span className="text-danger">
                                        {meta.error}
                                      </span>
                                    )} */}
                                </div>
                              )}
                            </Field>
                          </Col>
                          <Col md={12} lg={6}>
                            <Field name="expertise">
                              {({ input, meta }) => (
                                <div>
                                  <div className="d-flex">
                                    <label className="signup_form_label">
                                      Area of Expertise
                                    </label>
                                    {meta.error && meta.touched && (
                                      <span className="text-danger required_msg">
                                        {meta.error}
                                      </span>
                                    )}
                                  </div>

                                  <textarea
                                    {...input}
                                    type="textarea"
                                    rows="4"
                                    className="form-control signup_form_input summary_input margin_bottom"
                                    placeholder="Expertise area in comma separated value"
                                  />
                                  {/* {meta.error && meta.touched && (
                                      <span className="text-danger">
                                        {meta.error}
                                      </span>
                                    )} */}
                                </div>
                              )}
                            </Field>
                          </Col>
                          <Col md={12} lg={6}>
                            <Field name="accomplishments">
                              {({ input, meta }) => (
                                <div>
                                  <div className="d-flex">
                                    <label className="signup_form_label">
                                      Accomplishments
                                    </label>
                                    {meta.error && meta.touched && (
                                      <span className="text-danger required_msg">
                                        {meta.error}
                                      </span>
                                    )}
                                  </div>

                                  <textarea
                                    {...input}
                                    type="textarea"
                                    rows="4"
                                    className="form-control signup_form_input summary_input margin_bottom"
                                    placeholder="Accomplishments in comma separated value"
                                  />
                                  {/* {meta.error && meta.touched && (
                                      <span className="text-danger">
                                        {meta.error}
                                      </span>
                                    )} */}
                                </div>
                              )}
                            </Field>
                          </Col>
                          <Col md={12} lg={6}>
                            <Field name="experience">
                              {({ input, meta }) => (
                                <div>
                                  <label className="signup_form_label">
                                    Total Experience
                                  </label>
                                  <input
                                    {...input}
                                    type="text"
                                    className="form-control signup_form_input margin_bottom"
                                    placeholder="Enter your total experience"
                                  />
                                </div>
                              )}
                            </Field>
                          </Col>
                          <Col md={12} lg={6}></Col>
                          <Col md={12} lg={6}>
                            <Field name="profilePhoto">
                              {({ input, meta }) => (
                                <div>
                                  <div className="d-flex">
                                    <label className="signup_form_label">
                                      Profile Photo
                                    </label>
                                    {meta.error && meta.touched && (
                                      <span className="text-danger required_msg">
                                        {meta.error}
                                      </span>
                                    )}
                                  </div>

                                  <input
                                    {...input}
                                    type="file"
                                    className="form-control signup_form_input margin_bottom"
                                    placeholder="Choose File"
                                  />
                                  {/* {meta.error && meta.touched && (
                                      <span>{meta.error}</span>
                                    )} */}
                                </div>
                              )}
                            </Field>
                          </Col>
                          <Col md={12} lg={6}>
                            <Field name="coverPhoto">
                              {({ input, meta }) => (
                                <div>
                                  <div className="d-flex">
                                    <label className="signup_form_label">
                                      Cover Photo
                                    </label>
                                    {meta.error && meta.touched && (
                                      <span className="text-danger required_msg">
                                        {meta.error}
                                      </span>
                                    )}
                                  </div>

                                  <input
                                    {...input}
                                    type="file"
                                    className="form-control signup_form_input margin_bottom"
                                    placeholder="Choose File"
                                  />
                                  {/* {meta.error && meta.touched && (
                                      <span className="text-danger">
                                        {meta.error}
                                      </span>
                                    )} */}
                                </div>
                              )}
                            </Field>
                          </Col>
                          <Col md={12} lg={6}>
                            <Field name="password">
                              {({ input, meta }) => (
                                <div>
                                  <div className="d-flex">
                                    <label className="signup_form_label">
                                      Password
                                    </label>
                                    {meta.error && meta.touched && (
                                      <span className="text-danger required_msg">
                                        {meta.error}
                                      </span>
                                    )}
                                  </div>

                                  <input
                                    {...input}
                                    type="password"
                                    className="form-control signup_form_input margin_bottom"
                                    placeholder="Password"
                                  />
                                  {/* {meta.error && meta.touched && (
                                      <span className="text-danger">
                                        {meta.error}
                                      </span>
                                    )} */}
                                </div>
                              )}
                            </Field>
                          </Col>
                          <Col md={12} lg={6}>
                            <Field name="confirmPassword">
                              {({ input, meta }) => (
                                <div>
                                  <div className="d-flex">
                                    <label className="signup_form_label">
                                      Confirm Password
                                    </label>
                                    {meta.error && meta.touched && (
                                      <span className="text-danger required_msg">
                                        {meta.error}
                                      </span>
                                    )}
                                  </div>

                                  <input
                                    {...input}
                                    type="password"
                                    className="form-control signup_form_input margin_bottom margin_bottomd"
                                    placeholder="Re-Enter Password"
                                  />
                                  {/* {meta.error && meta.touched && (
                                      <span className="text-danger">
                                        {meta.error}
                                      </span>
                                    )} */}
                                </div>
                              )}
                            </Field>
                          </Col>
                        </>
                      )}
                      {values.userType == "Student" && (
                        <>
                          <Col md={12} lg={6}>
                            <Field name="name">
                              {({ input, meta }) => (
                                <div>
                                  <div className="d-flex">
                                    <label className="signup_form_label">
                                      Name
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
                                    placeholder="Enter Full Name"
                                  />
                                  {/* {meta.error && meta.touched && (
                                      <span className="text-danger">
                                        {meta.error}
                                      </span>
                                    )} */}
                                </div>
                              )}
                            </Field>
                          </Col>
                          <Col md={12} lg={6}>
                            <Field name="designation">
                              {({ input, meta }) => (
                                <div>
                                  <div className="d-flex">
                                    <label className="signup_form_label">
                                      Designation
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
                                    placeholder="Designation"
                                  />
                                  {/* {meta.error && meta.touched && (
                                      <span className="text-danger">
                                        {meta.error}
                                      </span>
                                    )} */}
                                </div>
                              )}
                            </Field>
                          </Col>
                          <Col md={12} lg={6}>
                            <Field name="email">
                              {({ input, meta }) => (
                                <div>
                                  <div className="d-flex">
                                    <label className="signup_form_label">
                                      Email
                                    </label>
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
                                    placeholder="Enter Your Email"
                                  />
                                  {/* {meta.error && meta.touched && (
                                      <span className="text-danger">
                                        {meta.error}
                                      </span>
                                    )} */}
                                </div>
                              )}
                            </Field>
                          </Col>
                          <Col md={12} lg={6}>
                            <Field name="mobileNumber">
                              {({ input, meta }) => (
                                <div>
                                  <div className="d-flex">
                                    <label className="signup_form_label">
                                      Mobile Number
                                    </label>
                                    {meta.error && meta.touched && (
                                      <span className="text-danger required_msg">
                                        {meta.error.required}
                                      </span>
                                    )}
                                  </div>

                                  <input
                                    {...input}
                                    type="number"
                                    className="form-control signup_form_input margin_bottom"
                                    placeholder="Enter Mobile No."
                                  />
                                  {meta.error && meta.touched && (
                                    <span className="text-danger">
                                      {meta.error.fieldError}
                                    </span>
                                  )}
                                </div>
                              )}
                            </Field>
                          </Col>
                          <Col md={12} lg={6}>
                            <Field name="state">
                              {({ input, meta }) => (
                                <>
                                  <div className="d-flex">
                                    <label className="signup_form_label">
                                      State
                                    </label>
                                    {meta.error && meta.touched && (
                                      <span className="text-danger required_msg">
                                        {meta.error}
                                      </span>
                                    )}
                                  </div>
                                  <select
                                    {...input}
                                    className="form-control select-style signup_form_input "
                                  >
                                    <option value="">Choose State</option>
                                    {stateList &&
                                      stateList?.map((item) => {
                                        return (
                                          <option
                                            key={item.id}
                                            value={item?.countryId}
                                          >
                                            {item?.state}{" "}
                                          </option>
                                        );
                                      })}
                                  </select>
                                  {/* {meta.error && meta.touched && (
                                      <span className="text-danger">
                                        {meta.error}
                                      </span>
                                    )} */}
                                  <div className="text-end">
                                    <img
                                      className="select_down_icon"
                                      src="/images/down.png"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </Col>
                          <Col md={12} lg={6}>
                            <Field name="school_college_company">
                              {({ input, meta }) => (
                                <div>
                                  <div className="d-flex">
                                    <label className="signup_form_label">
                                      School/College/Company
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
                                    placeholder="School/College/Company"
                                  />
                                  {/* {meta.error && meta.touched && (
                                      <span className="text-danger">
                                        {meta.error}
                                      </span>
                                    )} */}
                                </div>
                              )}
                            </Field>
                          </Col>
                          <Col md={12} lg={6}>
                            <Field name="highestEducation">
                              {({ input, meta }) => (
                                <div>
                                  <div className="d-flex">
                                    <label className="signup_form_label">
                                      Highest Education
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
                                    placeholder="Enter your Highest Qualification"
                                  />
                                  {/* {meta.error && meta.touched && (
                                      <span className="text-danger">
                                        {meta.error}
                                      </span>
                                    )} */}
                                </div>
                              )}
                            </Field>
                          </Col>
                          <Col md={12} lg={12}>
                            <Field name="summary">
                              {({ input, meta }) => (
                                <div>
                                  <div className="d-flex">
                                    <label className="signup_form_label">
                                      Summary
                                    </label>
                                    {meta.error && meta.touched && (
                                      <span className="text-danger required_msg">
                                        {meta.error}
                                      </span>
                                    )}
                                  </div>

                                  <textarea
                                    {...input}
                                    type="textarea"
                                    rows="4"
                                    className="form-control signup_form_input summary_input margin_bottom"
                                    placeholder="Summary"
                                  />
                                  {/* {meta.error && meta.touched && (
                                      <span className="text-danger">
                                        {meta.error}
                                      </span>
                                    )} */}
                                </div>
                              )}
                            </Field>
                          </Col>
                          <Col md={12} lg={6}>
                            <Field name="expertise">
                              {({ input, meta }) => (
                                <div>
                                  <div className="d-flex">
                                    <label className="signup_form_label">
                                      Area of Expertise
                                    </label>
                                    {meta.error && meta.touched && (
                                      <span className="text-danger required_msg">
                                        {meta.error}
                                      </span>
                                    )}
                                  </div>

                                  <textarea
                                    {...input}
                                    type="textarea"
                                    rows="4"
                                    className="form-control signup_form_input summary_input margin_bottom"
                                    placeholder="Expertise area in comma separated value"
                                  />
                                  {/* {meta.error && meta.touched && (
                                      <span className="text-danger">
                                        {meta.error}
                                      </span>
                                    )} */}
                                </div>
                              )}
                            </Field>
                          </Col>
                          <Col md={12} lg={6}>
                            <Field name="accomplishments">
                              {({ input, meta }) => (
                                <div>
                                  <div className="d-flex">
                                    <label className="signup_form_label">
                                      Accomplishments
                                    </label>
                                    {meta.error && meta.touched && (
                                      <span className="text-danger required_msg">
                                        {meta.error}
                                      </span>
                                    )}
                                  </div>

                                  <textarea
                                    {...input}
                                    type="textarea"
                                    rows="4"
                                    className="form-control signup_form_input summary_input margin_bottom"
                                    placeholder="Accomplishments in comma separated value"
                                  />
                                  {/* {meta.error && meta.touched && (
                                      <span className="text-danger">
                                        {meta.error}
                                      </span>
                                    )} */}
                                </div>
                              )}
                            </Field>
                          </Col>
                          <Col md={12} lg={6}>
                            <Field name="experience">
                              {({ input, meta }) => (
                                <div>
                                  <div className="d-flex">
                                    <label className="signup_form_label">
                                      Total Experience
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
                                    placeholder="Enter your total experience"
                                  />
                                  {/* {meta.error && meta.touched && (
                                      <span className="text-danger">
                                        {meta.error}
                                      </span>
                                    )} */}
                                </div>
                              )}
                            </Field>
                          </Col>
                          <Col md={12} lg={6}></Col>
                          <Col md={12} lg={6}>
                            <Field name="profilePhoto">
                              {({ input, meta }) => (
                                <div>
                                  <div className="d-flex">
                                    <label className="signup_form_label">
                                      Profile Photo
                                    </label>
                                    {meta.error && meta.touched && (
                                      <span className="text-danger required_msg">
                                        {meta.error}
                                      </span>
                                    )}
                                  </div>

                                  <input
                                    // {...input}
                                    type="file"
                                    className="form-control signup_form_input margin_bottom"
                                    placeholder="Choose File"
                                    onChange={(event) =>
                                      input?.onChange(event.target.files[0])
                                    }
                                  />
                                  {/* {meta.error && meta.touched && (
                                      <span className="text-danger">
                                        {meta.error}
                                      </span>
                                    )} */}
                                </div>
                              )}
                            </Field>
                          </Col>
                          <Col md={12} lg={6}>
                            <Field name="coverPhoto">
                              {({ input, meta }) => (
                                <div>
                                  <div className="d-flex">
                                    <label className="signup_form_label">
                                      Cover Photo
                                    </label>
                                    {meta.error && meta.touched && (
                                      <span className="text-danger required_msg">
                                        {meta.error}
                                      </span>
                                    )}
                                  </div>

                                  <input
                                    // {...input}
                                    type="file"
                                    className="form-control signup_form_input margin_bottom"
                                    placeholder="Choose File"
                                    onChange={(event) =>
                                      input.onChange(event.target.files[0])
                                    }
                                  />
                                  {/* {meta.error && meta.touched && (
                                      <span className="text-danger">
                                        {meta.error}
                                      </span>
                                    )} */}
                                </div>
                              )}
                            </Field>
                          </Col>
                          <Col md={12} lg={6}>
                            <Field name="password">
                              {({ input, meta }) => (
                                <div>
                                  <div className="d-flex">
                                    <label className="signup_form_label">
                                      Password
                                    </label>
                                    {meta.error && meta.touched && (
                                      <span className="text-danger required_msg">
                                        {meta.error}
                                      </span>
                                    )}
                                  </div>

                                  <input
                                    {...input}
                                    type="password"
                                    className="form-control signup_form_input margin_bottom"
                                    placeholder="Password"
                                  />
                                  {/* {meta.error && meta.touched && (
                                      <span className="text-danger">
                                        {meta.error}
                                      </span>
                                    )} */}
                                </div>
                              )}
                            </Field>
                          </Col>
                          <Col md={12} lg={6}>
                            <Field name="confirmPassword">
                              {({ input, meta }) => (
                                <div>
                                  <div className="d-flex">
                                    <label className="signup_form_label">
                                      Confirm Password
                                    </label>
                                    {meta.error && meta.touched && (
                                      <span className="text-danger required_msg">
                                        {meta.error}
                                      </span>
                                    )}
                                  </div>

                                  <input
                                    {...input}
                                    type="password"
                                    className="form-control signup_form_input margin_bottom"
                                    placeholder="Re-Enter Password"
                                  />
                                  {/* {meta.error && meta.touched && (
                                      <span className="text-danger">
                                        {meta.error}
                                      </span>
                                    )} */}
                                </div>
                              )}
                            </Field>
                          </Col>
                        </>
                      )}
                      {values.userType == "College" && (
                        <>
                          <Col md={12} lg={6}>
                            <Field name="email">
                              {({ input, meta }) => (
                                <div>
                                  <div className="d-flex">
                                    <label className="signup_form_label">
                                      College Email
                                    </label>
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
                                    placeholder="Enter Email"
                                  />
                                  {/* {meta.error && meta.touched && (
                                      <span className="text-danger">
                                        {meta.error}
                                      </span>
                                    )} */}
                                </div>
                              )}
                            </Field>
                          </Col>
                          <Col md={12} lg={6}>
                            <Field name="mobileNumber">
                              {({ input, meta }) => (
                                <div>
                                  <div className="d-flex">
                                    <label className="signup_form_label">
                                      Mobile Number
                                    </label>
                                    {meta.error && meta.touched && (
                                      <span className="text-danger required_msg">
                                        {meta.error.required}
                                      </span>
                                    )}
                                  </div>

                                  <input
                                    {...input}
                                    type="number"
                                    className="form-control signup_form_input margin_bottom"
                                    placeholder="Enter Mobile Number"
                                  />
                                  {meta.error && meta.touched && (
                                    <span className="text-danger">
                                      {meta.error.fieldError}
                                    </span>
                                  )}
                                </div>
                              )}
                            </Field>
                          </Col>
                          <Col md={12} lg={6}>
                            <Field name="state">
                              {({ input, meta }) => (
                                <>
                                  <div className="d-flex">
                                    <label className="signup_form_label">
                                      State
                                    </label>
                                    {meta.error && meta.touched && (
                                      <span className="text-danger required_msg">
                                        {meta.error}
                                      </span>
                                    )}
                                  </div>
                                  <select
                                    {...input}
                                    className="form-control select-style signup_form_input"
                                    onChange={(e) => {
                                      input.onChange(e)
                                      change('city', "")
                                      handleCityDropdown(e)
                                    }}
                                  >
                                    <option value=" ">Select State</option>
                                    {stateList &&
                                      stateList?.map((item) => {
                                        return (
                                          <option
                                            key={item.id}
                                            value={item?.id}
                                          >{item?.state}{" "}
                                          </option>
                                        );
                                      })}
                                  </select>
                                  {/* {meta.error && meta.touched && (
                                      <span className="text-danger">
                                        {meta.error}
                                      </span>
                                    )} */}
                                  <div className="text-end">
                                    <img
                                      className="select_down_icon"
                                      src="/images/down.png"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </Col>
                          <Col md={12} lg={6}>
                            <Field name="city">
                              {({ input, meta }) => (
                                <>
                                  <div className="d-flex">
                                    <label className="signup_form_label">
                                      City
                                    </label>
                                    {meta.error && meta.touched && (
                                      <span className="text-danger required_msg">
                                        {meta.error}
                                      </span>
                                    )}
                                  </div>
                                  <select
                                    {...input}
                                    className="form-control select-style signup_form_input"
                                  >
                                    <option value="">Select City</option>
                                    {cityListByState &&
                                      cityListByState?.map((item) => <option key={`CityItem_${item.id}`} value={item?.id} > {item?.name}</option>
                                      )}
                                  </select>
                                  {/* {meta.error && meta.touched && (
                                      <span className="text-danger">
                                        {meta.error}
                                      </span>
                                    )} */}
                                  <div className="text-end">
                                    <img
                                      className="select_down_icon"
                                      src="/images/down.png"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </Col>
                          <Col md={12} lg={6}>
                            <Field name="website">
                              {({ input, meta }) => (
                                <div>
                                  <div className="d-flex">
                                    <label className="signup_form_label">
                                      College Website
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
                                    placeholder="College Website"
                                  />
                                  {/* {meta.error && meta.touched && (
                                      <span className="text-danger">
                                        {meta.error}
                                      </span>
                                    )} */}
                                </div>
                              )}
                            </Field>
                          </Col>
                          <Col md={12} lg={12}>
                            <Field name="college">
                              {({ input, meta }) => (
                                <div>
                                  <div className="d-flex">
                                    <label className="signup_form_label">
                                      College
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
                                    placeholder="Choose College"
                                  />
                                  {/* {meta.error && meta.touched && (
                                      <span className="text-danger">
                                        {meta.error}
                                      </span>
                                    )} */}
                                </div>
                              )}
                            </Field>
                          </Col>
                          <Col md={12} lg={6}>
                            <Field name="password">
                              {({ input, meta }) => (
                                <div>
                                  <div className="d-flex">
                                    <label className="signup_form_label">
                                      Password
                                    </label>
                                    {meta.error && meta.touched && (
                                      <span className="text-danger required_msg">
                                        {meta.error}
                                      </span>
                                    )}
                                  </div>

                                  <input
                                    {...input}
                                    type="password"
                                    className="form-control signup_form_input margin_bottom"
                                    placeholder="Password"
                                  />
                                  {/* {meta.error && meta.touched && (
                                      <span className="text-danger">
                                        {meta.error}
                                      </span>
                                    )} */}
                                </div>
                              )}
                            </Field>
                          </Col>
                          <Col md={12} lg={6}>
                            <Field name="confirmPassword">
                              {({ input, meta }) => (
                                <div>
                                  <div className="d-flex">
                                    <label className="signup_form_label">
                                      Password
                                    </label>
                                    {meta.error && meta.touched && (
                                      <span className="text-danger required_msg">
                                        {meta.error}
                                      </span>
                                    )}
                                  </div>

                                  <input
                                    {...input}
                                    type="password"
                                    className="form-control signup_form_input margin_bottom"
                                    placeholder="Confirm Password"
                                  />
                                  {/* {meta.error && meta.touched && (
                                      <span className="text-danger">
                                        {meta.error}
                                      </span>
                                    )} */}
                                </div>
                              )}
                            </Field>
                          </Col>
                        </>
                      )}
                      {values.userType == "Organization" && (
                        <>
                          <Col md={12} lg={6}>
                            <Field name="orgcategory">
                              {({ input, meta }) => (
                                <>
                                  <div className="d-flex">
                                    <label className="signup_form_label">
                                      Select Organization Category
                                    </label>
                                    {meta.error && meta.touched && (
                                      <span className="text-danger required_msg">
                                        {meta.error}
                                      </span>
                                    )}
                                  </div>
                                  <select
                                    {...input}
                                    className="form-control select-style signup_form_input"
                                  >
                                    <option value="">--Select--</option>

                                    <option>Organization 1</option>
                                    <option>Organization 2</option>
                                  </select>
                                  {/* {meta.error && meta.touched && (
                                      <span className="text-danger">
                                        {meta.error}
                                      </span>
                                    )} */}
                                  <div className="text-end">
                                    <img
                                      className="select_down_icon"
                                      src="/images/down.png"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </Col>
                          <Col md={12} lg={6}>
                            <Field name="company">
                              {({ input, meta }) => (
                                <>
                                  <div className="d-flex">
                                    <label className="signup_form_label">
                                      Select Company
                                    </label>
                                    {meta.error && meta.touched && (
                                      <span className="text-danger required_msg">
                                        {meta.error}
                                      </span>
                                    )}
                                  </div>
                                  <select
                                    {...input}
                                    className="form-control select-style signup_form_input"
                                  >
                                    <option value="">
                                      --Select Company--
                                    </option>

                                    <option>Company 1</option>
                                    <option>Company 2</option>
                                  </select>
                                  {/* {meta.error && meta.touched && (
                                      <span className="text-danger">
                                        {meta.error}
                                      </span>
                                    )} */}
                                  <div className="text-end">
                                    <img
                                      className="select_down_icon"
                                      src="/images/down.png"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </Col>
                          <Col md={12} lg={6}>
                            <Field name="headregofc">
                              {({ input, meta }) => (
                                <>
                                  <div className="d-flex">
                                    <label className="signup_form_label">
                                      Is it a Head/Registered Office
                                    </label>
                                    {meta.error && meta.touched && (
                                      <span className="text-danger required_msg">
                                        {meta.error}
                                      </span>
                                    )}
                                  </div>
                                  <select
                                    {...input}
                                    className="form-control select-style signup_form_input"
                                  >
                                    <option value="">--Select --</option>

                                    <option>yes</option>
                                    <option>No</option>
                                  </select>
                                  {/* {meta.error && meta.touched && (
                                      <span className="text-danger">
                                        {meta.error}
                                      </span>
                                    )} */}
                                  <div className="text-end">
                                    <img
                                      className="select_down_icon"
                                      src="/images/down.png"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </Col>
                          <Col md={12} lg={6}>
                            <Field name="state">
                              {({ input, meta }) => (
                                <>
                                  <div className="d-flex">
                                    <label className="signup_form_label">
                                      State
                                    </label>
                                    {meta.error && meta.touched && (
                                      <span className="text-danger required_msg">
                                        {meta.error}
                                      </span>
                                    )}
                                  </div>
                                  <select
                                    {...input}
                                    className="form-control select-style signup_form_input"
                                  >
                                    <option>state 1</option>
                                    <option>state 2</option>
                                  </select>
                                  {/* {meta.error && meta.touched && (
                                      <span className="text-danger">
                                        {meta.error}
                                      </span>
                                    )} */}
                                  <div className="text-end">
                                    <img
                                      className="select_down_icon"
                                      src="/images/down.png"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </Col>
                          <Col md={12} lg={6}>
                            <Field name="city">
                              {({ input, meta }) => (
                                <>
                                  <div className="d-flex">
                                    <label className="signup_form_label">
                                      City
                                    </label>
                                    {meta.error && meta.touched && (
                                      <span className="text-danger required_msg">
                                        {meta.error}
                                      </span>
                                    )}
                                  </div>
                                  <select
                                    {...input}
                                    className="form-control select-style signup_form_input"
                                  >
                                    <option>city 1</option>
                                    <option>city 2</option>
                                  </select>
                                  {/* {meta.error && meta.touched && (
                                      <span className="text-danger">
                                        {meta.error}
                                      </span>
                                    )} */}
                                  <div className="text-end">
                                    <img
                                      className="select_down_icon"
                                      src="/images/down.png"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </Col>
                          <Col md={12} lg={6}>
                            <Field name="email">
                              {({ input, meta }) => (
                                <div>
                                  <div className="d-flex">
                                    <label className="signup_form_label">
                                      Email
                                    </label>
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
                                    placeholder="Enter Email"
                                  />
                                  {/* {meta.error && meta.touched && (
                                      <span className="text-danger">
                                        {meta.error}
                                      </span>
                                    )} */}
                                </div>
                              )}
                            </Field>
                          </Col>
                          <Col md={12} lg={6}>
                            <Field name="mobileNumber">
                              {({ input, meta }) => (
                                <div>
                                  <div className="d-flex">
                                    <label className="signup_form_label">
                                      Mobile Number
                                    </label>
                                    {meta.error && meta.touched && (
                                      <span className="text-danger required_msg">
                                        {meta.error.required}
                                      </span>
                                    )}
                                  </div>

                                  <input
                                    {...input}
                                    type="number"
                                    className="form-control signup_form_input margin_bottom"
                                    placeholder="Enter Mobile Number"
                                  />
                                  {meta.error && meta.touched && (
                                    <span className="text-danger">
                                      {meta.error.fieldError}
                                    </span>
                                  )}
                                </div>
                              )}
                            </Field>
                          </Col>

                          <Col md={12} lg={6}>
                            <Field name="password">
                              {({ input, meta }) => (
                                <div>
                                  <div className="d-flex">
                                    <label className="signup_form_label">
                                      Password
                                    </label>
                                    {meta.error && meta.touched && (
                                      <span className="text-danger required_msg">
                                        {meta.error}
                                      </span>
                                    )}
                                  </div>

                                  <input
                                    {...input}
                                    type="password"
                                    className="form-control signup_form_input margin_bottom"
                                    placeholder="Password"
                                  />
                                  {/* {meta.error && meta.touched && (
                                      <span className="text-danger">
                                        {meta.error}
                                      </span>
                                    )} */}
                                </div>
                              )}
                            </Field>
                          </Col>
                          <Col md={12} lg={6}>
                            <Field name="confirmPassword">
                              {({ input, meta }) => (
                                <div>
                                  <div className="d-flex">
                                    <label className="signup_form_label">
                                      Confirm Password
                                    </label>
                                    {meta.error && meta.touched && (
                                      <span className="text-danger required_msg">
                                        {meta.error}
                                      </span>
                                    )}
                                  </div>

                                  <input
                                    {...input}
                                    type="password"
                                    className="form-control signup_form_input margin_bottom"
                                    placeholder="Confirm Password"
                                  />
                                  {/* {meta.error && meta.touched && (
                                      <span className="text-danger">
                                        {meta.error}
                                      </span>
                                    )} */}
                                </div>
                              )}
                            </Field>
                          </Col>
                        </>
                      )}
                    </Row>
                    <Row>
                      <Col className="text-center">
                        <button type="submit" className="admin_signup_btn">
                          Next Step
                        </button>
                      </Col>
                    </Row>
                  </>
                </form>
              )}
            />

          </div>
        </Row>
      </Container>
    </>
  );
}

export default SignUpPage;
