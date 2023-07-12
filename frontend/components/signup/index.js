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
import { getColleges } from "../../redux/actions/college/college";
import { getOrganisationlist } from "../../redux/actions/organisation/addorganisation";

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
  const router = useRouter();

  useEffect(() => {
    dispatch(getState());
    dispatch(getColleges())
    dispatch(getOrganisationlist())
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
  const collegeList = useSelector((state) => state?.collegelist?.collegelist?.rows)
  const companyList = useSelector((state) => state?.sectorData?.organisationList?.rows)

  const validate = (values) => {
    const errors = {};

    if (!values.userType) {
      errors["userType"] = " Select A User Type";
    }
    if (values?.userType === "Student" && !values.name) {
        errors.name = "*";
    }
    if (
      !values.email &&
      (values?.userType === "Student" ||
      values?.userType === "College" ||
      values?.userType === "Organization")
    ) {
      errors.email = "*";
    }
    if (
      !values.mobileNumber &&
      (values?.userType === "Student" ||
      values?.userType === "College" ||
      values?.userType === "Organization")
    ) {
      errors.mobileNumber = { ...errors.mobileNumber, required: "*" };
    }

    if (values.mobileNumber && !values.mobileNumber.match(/^[0-9]{10}$/)) {
      errors.mobileNumber = { ...errors.mobileNumber, fieldError: "Mobile Number should be of 10 digits" };
    }
    if (
      !values.state &&
      (values?.userType === "College" ||
      values?.userType === "Organization")
    ) {
      errors["state"] = "*";
    }
    // if (!values.profilePhoto && values?.usertype === "Student") {
    //   errors.profilePhoto = "*";
    // }
    // if (!values.coverPhoto && values?.usertype === "Student") {
    //   errors.coverPhoto = "*";
    // }
    // if (!values.school_college_company && values?.usertype === "Student") {
    //   errors["school_college_company"] = "*";
    // }
    // if (!values.highestEducation && values?.usertype === "Student") {
    //   errors["highestEducation"] = "*";
    // }
    if (!values.city && (values?.userType === "College" || values?.userType === "Organization")) {
      errors["city"] = "*";
    }
    if (!values.website && values?.userType === "College") {
      errors["website"] = "*";
    }
    if (!values.college && values?.userType === "College") {
      errors["college"] = "*";
    }

    if (
      !values.password &&
      (values?.userType === "Student" ||
      values?.userType === "College" ||
      values?.userType === "Organization")
    ) {
      errors["password"] = "*";
    }
    if (
      !values.confirmPassword &&
      (values?.userType === "Student" ||
      values?.userType === "College" ||
      values?.userType === "Organization")
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

  const handleOtp = (values) => {
    let newVal = JSON.stringify(values);
    newVal = { mobileNumber: mobileNum, otp: Number(values) };
    dispatch(verifyOtp(newVal)).then((res) => {
      if (res?.payload?.success) {
        toast.success("otp verified");
        router.push("/login");
      } else {
        toast.error("wrong otp");
      }
    });
  };

  const handleSubmit = (values) => {

    let payload = {}

    if (values.userType === "Student") {
      payload = {
        mobileNumber: values.mobileNumber,
        name: values.name,
        password: values.password,
        summary: values.summary,
        userType: values.userType,
      }
    } if (values.userType === "College") {
      payload = {
        userType: values?.userType,
        email: values?.email,
        mobileNumber: values?.mobileNumber,
        stateId: Number(values.state),
        cityId: Number(values.city),
        collegeWebsite: values?.website,
        collegeId: values?.college?.value,
        password: values?.password,
        // confirmPassword: values?.confirmPassword,
      }
    } if (values.userType === "Organisation") {
      payload = {
        userType: values?.userType,
        email: values?.email,
        mobileNumber: values?.mobileNumber,
        stateId: Number(values.state),
        cityId: Number(values.city),
        orgcategory: values?.orgcategory,
        selectcompany: values?.selectcompany,
        headorregofc: values?.headorregofc,
        password: values?.password
      }
    }

    // const payload = {
    //   accomplishments: values.accomplishments,
    //   designation: values.designation,
    //   email: values.email,
    //   totalExperience: values.experience,
    //   areaOfExpertise: values.expertise,
    //   highestEducation: values.highestEducation,
    //   mobileNumber: values.mobileNumber,
    //   name: values.name,
    //   password: values.password,
    //   school_college_company: values.school_college_company,
    //   stateId: Number(values.state),
    //   cityId: Number(values.city),
    //   summary: values.summary,
    //   userType: values.userType,

    //   // college values
    //   website: values.website,
    //   college: values.college,

    //   //organization values
    //   company: values.company,
    //   orgcategory: values.orgcategory,
    //   headregofc: values.headregofc,

    // }

    setMobileNum(values.mobileNumber);
    if (values != 0) {
      setDataValue(1);
    }
    const dataFomrs = new FormData();
    if (values.profilePhoto) {
      dataFomrs.append("profile", values?.profilePhoto);
    }
    if (values.coverPhoto) {
      dataFomrs.append("cover", values?.coverPhoto);
    }
    dataFomrs.append("profileData", JSON.stringify(payload));

    dispatch(getUsers(dataFomrs));
  };

  const memoizedInitialValue = (e) => {
    if (e && Object.keys(e).length > 0) {
      return e;
    } else {
      const initialValues = {
        userType: "Student",
        name: "",
        mobileNumber: "",
        password: "",
        confirmPassword: "",
        email: "",
        mobileNumber: "",
        state: "",
        city: "",
        website: "",
        college: "",
        orgcategory: "",
        selectcompany: "",
        headorregofc: "",
      };
      return initialValues

      // if (usertype !== "College") {
      //   return initialValuesStudent;
      // }
      // if (usertype === "College") {
      //   return initialValuesCollege;
      // }
      // if (usertype === "organization") {
      //   return initialValuesOrganization;
      // }

      // const initialFieldValues = Object.keys(initialValuesStudent).reduce((acc, key) => {
      //   acc[key] = initialValuesStudent[key];
      //   return acc;
      // }, {});

      // return initialFieldValues;
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
                        <label className="signup_form_label">Select User Type</label>
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
                                  {/* <select {...input}
                                    className="form-control select-style signup_form_input">
                                    {collegeList?.map((item, index) => {
                                      return <option key={index} value={item?.id}>{item?.collegeName}</option>
                                    })}
                                  </select> */}
                                  <Select
                                    {...input}
                                    options={
                                      collegeList?.map((item) => {
                                        return ({
                                          value: item?.id,
                                          label: item?.collegeName
                                        })
                                      })
                                    }
                                    isSearchable={true}
                                    onInputChange={(e) => {
                                      if (e === "") {
                                        dispatch(getColleges())
                                      } else {
                                        dispatch(getColleges({ search: e }))
                                      }
                                    }}
                                  />
                                  <div className="text-end">
                                    <img
                                      className="select_down_icon"
                                      src="/images/down.png"
                                    />
                                  </div>

                                  {/* <input
                                    {...input}
                                    type="text"
                                    className="form-control signup_form_input margin_bottom"
                                    placeholder="Choose College"
                                  /> */}
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
                                    {companyList?.map((item, index) => {
                                      return (<option key={index} value={item?.id}>{item?.OrganisationCompany?.companyName}</option>)
                                     })}
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
