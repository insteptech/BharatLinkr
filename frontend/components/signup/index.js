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
    school: "",
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
  // const handleChange = (e) => {
  //   console.log(e.target.value);
  //   setUsertype(e.target.value);
  // };

  const stateList = useSelector(
    (item) => item?.stateList?.stateList?.data?.data?.rows
  );


  // const fields = [
  //   [
  //     {
  //       fieldType: FieldTypes.fields,
  //       name: "userType",
  //       component: (input) => <Select {...input} options={stateOptions} />,
  //       type: inputFieldTypes.text,
  //       label: "Select User Type",
  //       col: "6",
  //     },
  //     {
  //       fieldType: FieldTypes.fields,
  //       name: "name",
  //       type: inputFieldTypes.text,
  //       label: "Name",
  //       col: "6",
  //       placeholder: "Enter Full Name",
  //     },
  //     {
  //       fieldType: FieldTypes.fields,
  //       name: "designation",
  //       type: inputFieldTypes.text,
  //       label: "Designation",
  //       col: "6",
  //       placeholder: "Student",
  //     },
  //     {
  //       fieldType: FieldTypes.fields,
  //       name: "email",
  //       type: inputFieldTypes.email,
  //       label: "Email",
  //       col: "6",
  //       placeholder: "Enter your Email",
  //     },
  //     {
  //       fieldType: FieldTypes.fields,
  //       name: "mobileNumber",
  //       type: inputFieldTypes.number,
  //       label: "Mobile Number",
  //       col: "6",
  //       placeholder: "Enter Mobile Number",
  //     },
  //     {
  //       fieldType: FieldTypes.fields,
  //       name: "state",
  //       component: (input) => <Select {...input} options={stateOptions} />,
  //       type: inputFieldTypes.text,
  //       label: "State",
  //       col: "6",
  //     },
  //     {
  //       fieldType: FieldTypes.fields,
  //       name: "school",
  //       type: inputFieldTypes.text,
  //       label: "School/College/Company",
  //       col: "6",
  //       placeholder: "School/College/Company",
  //     },
  //     {
  //       fieldType: FieldTypes.fields,
  //       name: "highestEducation",
  //       type: inputFieldTypes.text,
  //       label: "Highest Education",
  //       col: "6",
  //       placeholder: "Enter your highest qualification",
  //     },
  //     {
  //       fieldType: FieldTypes.fields,
  //       name: "summary",
  //       type: inputFieldTypes.textarea,
  //       label: "Summary",
  //       col: "12",
  //       placeholder: "Summary",
  //     },
  //     {
  //       fieldType: FieldTypes.fields,
  //       name: "expertiseArea",
  //       type: inputFieldTypes.textarea,
  //       label: "Area Of Expertise",
  //       col: "6",
  //       placeholder: "Expertise area in comma separated value",
  //     },
  //     {
  //       fieldType: FieldTypes.fields,
  //       name: "accomplishment",
  //       type: inputFieldTypes.textarea,
  //       label: "Accomplishment",
  //       col: "6",
  //       placeholder: "Accomplishments in comma separated value",
  //     },
  //     {
  //       fieldType: FieldTypes.fields,
  //       name: "totalExperience",
  //       type: inputFieldTypes.text,
  //       label: "Total Experience",
  //       col: "12",
  //       placeholder: "Enter your total experience",
  //       className: "experience_input",
  //     },
  //     {
  //       fieldType: FieldTypes.fields,
  //       name: "profilePhoto",
  //       type: inputFieldTypes.file,
  //       label: "Profile Photo",
  //       col: "6",
  //       placeholder: "",
  //       className: "file_input",
  //     },
  //     {
  //       fieldType: FieldTypes.fields,
  //       name: "coverPhoto",
  //       type: inputFieldTypes.file,
  //       label: "Cover Photo",
  //       col: "6",
  //       placeholder: "",
  //     },
  //     {
  //       fieldType: FieldTypes.fields,
  //       name: "password",
  //       type: inputFieldTypes.password,
  //       label: "Password",
  //       col: "6",
  //       placeholder: "Password",
  //       icon: "/images/close-eye.png",
  //     },
  //     {
  //       fieldType: FieldTypes.fields,
  //       name: "confirmPassword",
  //       type: inputFieldTypes.password,
  //       label: "Re-Enter Password",
  //       col: "6",
  //       placeholder: "Re-Enter Password",
  //       icon: "/images/close-eye.png",
  //     },
  //     {
  //       fieldType: FieldTypes.actions,
  //       buttons: [
  //         {
  //           type: "submit",
  //           body: "Next Step",
  //           variant: "primary",
  //           className: "mx-auto admin_signup_btn",
  //           activeCondition: false,
  //           size: "lg",
  //           col: "12",
  //         },
  //       ],
  //     },
  //   ],
  //   [
  //     {
  //       fieldType: FieldTypes.fields,
  //       name: "OTP_1",
  //       type: inputFieldTypes.number,
  //       col: "1",
  //       className: "otp_input",
  //     },
  //     {
  //       fieldType: FieldTypes.fields,
  //       name: "OTP_2",
  //       type: inputFieldTypes.number,
  //       col: "1",
  //       className: "otp_input",
  //     },
  //     {
  //       fieldType: FieldTypes.fields,
  //       name: "OTP_3",
  //       type: inputFieldTypes.number,
  //       col: "1",
  //       className: "otp_input",
  //     },
  //     {
  //       fieldType: FieldTypes.fields,
  //       name: "OTP_4",
  //       type: inputFieldTypes.number,
  //       col: "1",
  //       className: "otp_input",
  //     },
  //     {
  //       fieldType: FieldTypes.fields,
  //       name: "OTP_5",
  //       type: inputFieldTypes.number,
  //       col: "1",
  //       className: "otp_input",
  //     },
  //     {
  //       fieldType: FieldTypes.fields,
  //       name: "OTP_6",
  //       type: inputFieldTypes.number,
  //       col: "1",
  //       className: "otp_input",
  //     },
  //     {
  //       fieldType: FieldTypes.actions,
  //       buttons: [
  //         {
  //           type: "submit",
  //           body: "Verify",
  //           variant: "primary",
  //           className: "mx-auto admin_signup_btn",
  //           activeCondition: false,
  //           size: "lg",
  //           col: "12",
  //         },
  //       ],
  //     },
  //   ],
  // ];

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
      errors.mobileNumber = "*";
    }

    if (values.mobileNumber && !values.mobileNumber.match(/^[0-9]{10}$/)) {
      errors.mobileNumber = "Mobile Number should be of 10 digits";
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
    if (!values.school && values?.usertype === "Student") {
      errors["school"] = "*";
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

  const onSubmit = (values) => {
    const finalValues = { ...values };
    if (dataValue === 0) {
      finalValues.userType = values.userType.values;
      finalValues.state = values.state.values;
    }
  };
  const router = useRouter();
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

    const payload = {
      accomplishments: values.accomplishments,
      designation: values.designation,
      email: values.email,
      experience: values.experience,
      expertise: values.expertise,
      highestEducation: values.highestEducation,
      mobileNumber: values.mobileNumber,
      name: values.name,
      password: values.password,
      school: values.school,
      stateId: Number(values.state),
      cityId: Number(values.city),
      summary: values.summary,
      userType: values.userType,

      // college values
      website : values.website,
      college : values.college,

      //organization values
      company : values.company,
      orgcategory : values.orgcategory,
      headregofc : values.headregofc,

    }

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


      if (usertype !== "College") {
        return initialValuesStudent;
      }
      if (usertype === "College") {
        return initialValuesCollege;
      }
      if (usertype === "organization") {
        return initialValuesOrganization;
      }

      // const initialFieldValues = Object.keys(initialValuesStudent).reduce((acc, key) => {
      //   acc[key] = initialValuesStudent[key];
      //   return acc;
      // }, {});

      // return initialFieldValues;
    }
  }


  let r;
  return (
    <>
      <Container className="p-3">
        <Row>
          <Col className="d-flex">
            <div className="text-center signup_logo_headings">
              <h1 className="logo_heading">LOGO</h1>
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
                        placeholder="-"
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
              render={({ handleSubmit, values }) => dataValue === 0 && (
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
                                        {meta.error}
                                      </span>
                                    )}
                                  </div>

                                  <input
                                    {...input}
                                    type="number"
                                    className="form-control signup_form_input margin_bottom"
                                    placeholder="Enter Mobile No."
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
                            <Field name="school">
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
                                        {meta.error}
                                      </span>
                                    )}
                                  </div>

                                  <input
                                    {...input}
                                    type="number"
                                    className="form-control signup_form_input margin_bottom"
                                    placeholder="Enter Mobile No."
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
                            <Field name="school">
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
                                        {meta.error}
                                      </span>
                                    )}
                                  </div>

                                  <input
                                    {...input}
                                    type="number"
                                    className="form-control signup_form_input margin_bottom"
                                    placeholder="Enter Mobile Number"
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
                                        {meta.error}
                                      </span>
                                    )}
                                  </div>

                                  <input
                                    {...input}
                                    type="number"
                                    className="form-control signup_form_input margin_bottom"
                                    placeholder="Enter Mobile Number"
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
