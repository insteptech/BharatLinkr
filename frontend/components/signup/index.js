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
import { addOrganisation, companyBrandList, companyGroupList, companyNameList, getOrganisationlist } from "../../redux/actions/organisation/addorganisation";
import LoaderPage from "../common-components/loader";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";
import Creatable from "react-select/creatable";
import { getIndustryList, getlistSector } from "../../redux/actions/organisation/addsector";

function SignUpPage() {
  const [dataValue, setDataValue] = useState(0);
  const [mobileNum, setMobileNum] = useState();
  const [otp, setOtp] = useState("");
  const [usertype, setUsertype] = useState("");
  const FormSteps = ["Step  1", "Step 2"];
  const [image, setImage] = useState("");
  const [formImage, setFormImage] = useState(null);
  const [regOption, setRegOption] = useState({ key: 1, state: "Not in the list, add your company" })

  let otpCall = useSelector((state) => state);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(getState());
    dispatch(getColleges())
    // dispatch(getOrganisationlist())
    dispatch(getlistSector());
    dispatch(getIndustryList());
    dispatch(companyGroupList());
    dispatch(companyBrandList());
    dispatch(companyNameList());
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
  const collegeList = useSelector((state) => state?.collegelist?.collegelist?.rows)
  const organisationList = useSelector((state) => state?.sectorData?.organisationList?.rows)
  const companyList = useSelector((state) => state?.sectorData?.companyNamelist)
  const grouplist = useSelector((data) => data?.sectorData?.grouplist);
  const brandnamelist = useSelector((data) => data?.sectorData?.brandlist);
  const companynamelist = useSelector((data) => data?.sectorData?.companyNamelist);
  const industrylist = useSelector((data) => data?.sectorData?.industrylist?.rows);
  const sectorlist = useSelector((data) => data?.sectorData?.sectorlist?.rows);

  const validate = (values) => {
    const errors = {};

    if (!values.userType) {
      errors["userType"] = "Select A User Type";
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
    console.log(values, 'eeeeeeeeeeeeeeeeeeeeeee')
    let payload = {}

    if (values.userType === "Student") {
      payload = {
        mobileNumber: values.mobileNumber,
        name: values.name,
        password: values.password,
        email: values?.email,
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
    } if (values.userType === "Organization") {
      if (regOption?.key == 1) {
        payload = {
          userType: values?.userType,
          email: values?.email,
          mobileNumber: values?.mobileNumber,
          // stateId: Number(values.state),
          // cityId: Number(values.city),
          // orgcategory: values?.orgcategory,
          organisationId: values?.selectcompany,
          // headorregofc: values?.headorregofc,
          password: values?.password
        }
      } else {
        let data = { payload: [], CMS: {} };
        // data.CMS = tempValues.cms[0];
        // delete tempValues.cms;
        data.payload[0] = {
          orgCatgeory: values?.regorgCatgeory,
          groupId: values?.reggroupId,
          sector: values?.regsector,
          industry: values?.regindustry,
          brandId: values?.regbrandId,
          companyId: values?.regcompanyId,
          levelOfCompany: values?.reglevelOfCompany,
          businessNature: values?.regbusinessNature,
          typeOfCompany: values?.regtypeOfCompany,
          companySize: values?.regcompanySize,
          establishedYear: values?.regestablishedYear,
          webSite: values?.regwebSite,
          competitors: values?.regcompetitors,
          headOffice: values?.regheadOfficenull,
          stateId: values?.regstateId,
          cityId: values?.regcityId,
          plotNumber: values?.regplotNumber,
          streetAddress: values?.regstreetAddress,
          contactNumber: values?.regcontactNumber,
          email: values?.regemail,
          yourRole: values?.regyourRole,
        }
        data.payload[0].brandId = values.regbrandId.value;
        data.payload[0].groupId = values.reggroupId.value;
        data.payload[0].companyId = values.regcompanyId.value;

        console.log(data, 'eeeeeeeeeeeeeee')

        var formData = new FormData();
        formData.append("organisationData", JSON.stringify(data));

        dispatch(addOrganisation(formData)).then((res) => {
          if (res?.payload?.data?.success) {
            console.log(res, 'iiiiiiiiiiii')
            payload = {
              password: values?.password,
              mobileNumber: values?.mobileNumber,
              email: values?.email,
              userType: values?.userType,
              organisationId: res?.payload?.data?.data?.corp?.id
            }
            // toast.success("Organisation Added");
            setMobileNum(values.mobileNumber);
            if (values != 0) {
              setDataValue(1);
            }
            const orgd = new FormData();
            orgd.append("profileData", JSON.stringify(payload));

            dispatch(getUsers(orgd))
              .then(res => {
                if (res.payload.data.success) {
                  setDataValue(1);
                } else {
                  toast.info(res.payload.data.message)
                }
              });;
          } else {
            toast.error("error");
          }
        });
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

    if (values.userType !== "Organization") {
      setMobileNum(values.mobileNumber);
      if (values != 0) {
        setDataValue(1);
      }
      console.log(payload,'rrrrrrrrrrrrrr')
      const dataFomrs = new FormData();
      dataFomrs.append("profileData", JSON.stringify(payload));

    dispatch(getUsers(dataFomrs))
      .then(res => {
        if (res.payload.data.success) {
          setDataValue(1);
        } else {
          toast.info(res.payload.data.message)
        }
      });;
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


        regorgCatgeory: "",
        reggroupId: "",
        regsector: [{ sectorId: "" }],
        regindustry: [{ industryId: "" }],
        regbrandId: "",
        regcompanyId: "",
        reglevelOfCompany: [{ companyLevel: "" }],
        regbusinessNature: [{ natureOfBusiness: "" }],
        regtypeOfCompany: "",
        regcompanySize: "",
        regestablishedYear: "",
        regwebSite: "",
        regcompetitors: "",
        regheadOffice: null,
        regstateId: "",
        regcityId: "",
        regplotNumber: "",
        regstreetAddress: "",
        regcontactNumber: "",
        regemail: "",
        regyourRole: "",
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

  const companySize = [
    "1-50",
    "51 - 200",
    "201 - 500",
    "501 - 1000",
    "1001 - 5000",
    "5001 - 10000",
    "10000+",
  ];

  const organisationType = ["Company", "Consultant", "Store"];

  const companylevel = [
    "Corporate",
    "Foreign MNC",
    "Startup",
    "Indian MNC",
    "Govt./PSU",
    "Others",
    "Small and Medium Enterprises (SMEs)",
    "Corporate",
    "Non Profit Organisation",
    "PSUs",
  ];

  const natureOfBuisness = ["B2B", "B2C", "B2C", "B2B2C", "D2C"];

  const typeOfCompany = [
    "Private Limited",
    "Proprietorship",
    "Limited Liability Partnership (LLP)",
    "Public Limited",
    "One person company",
    "Section 8 company",
    "Nidhi company",
    "Foreign company",
    "Producer company",
  ];

  const handleCityDropdown = ({ target: { value } }) => {
    dispatch(cityDropdown({ stateId: value }))
  }

  const handleCompanyChange = (item) => {
    dispatch(getOrganisationlist({ companyId: [item.target.value] }))
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
              mutators={{
                ...arrayMutators
              }}
              keepDirtyOnReinitialize
              // validate={validate}
              initialValues={(e) => memoizedInitialValue(e)}
              render={({ handleSubmit, values, form: { change } }) => dataValue === 0 && (
                <form onSubmit={handleSubmit}>
                  <>
                    <Row>
                      <Col lg={6} md={12}>
                        {console.log(values, 'kkkkkkkkkkkkkkkkkkkkkkkkkkk')}
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
                          {/* <Col md={12} lg={6}>
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
                                  <div className="text-end">
                                    <img
                                      className="select_down_icon"
                                      src="/images/down.png"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </Col> */}
                          {/* <Col md={12} lg={6}>
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
                                  <div className="text-end">
                                    <img
                                      className="select_down_icon"
                                      src="/images/down.png"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </Col> */}
                          {regOption?.key === 1 &&
                            <>
                              <Col md={12} lg={6}>
                                <Field name="companyName">
                                  {({ input, meta }) => (
                                    <>
                                      <div className="d-flex">
                                        <label className="signup_form_label">
                                          Select Company Name
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
                                          handleCompanyChange(e)
                                          change('company', "")
                                        }}
                                      >
                                        <option value="">
                                          --Select Company Name--
                                        </option>
                                        {companyList?.map((item, index) => {
                                          return (<option key={index} value={item?.id}>{item?.companyName}</option>)
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
                              <Col md={12} lg={12}>
                                <Field name="company">
                                  {({ input, meta }) => (
                                    <>
                                      <div className="d-flex">
                                        <label className="signup_form_label">
                                          select Company Address
                                        </label>
                                        {meta.error && meta.touched && (
                                          <span className="text-danger required_msg">
                                            {meta.error}
                                          </span>
                                        )}
                                      </div>
                                      <select
                                        {...input}
                                        disabled={!values?.companyName}
                                        className="form-control select-style signup_form_input"
                                        onChange={(e) => {
                                          input.onChange(e)
                                          change('city', "")
                                          // handleCityDropdown(e)
                                        }}
                                      >
                                        <option value=" ">Select Company Address</option>
                                        {organisationList &&
                                          organisationList?.map((item) => {
                                            return (
                                              <option
                                                key={item.id}
                                                value={item?.id}
                                              >
                                                {`${item?.plotNumber},${item?.streetAddress},${item?.States?.state},${item?.Cities?.name}`}
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
                                    </>
                                  )}
                                </Field>
                              </Col>
                            </>
                          }
                          {/* <Col md={12} lg={6}>
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
                                  <div className="text-end">
                                    <img
                                      className="select_down_icon"
                                      src="/images/down.png"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </Col> */}
                          {/* <Col md={12} lg={6}>
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
                                  
                                  <div className="text-end">
                                    <img
                                      className="select_down_icon"
                                      src="/images/down.png"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </Col> */}
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
                                </div>
                              )}
                            </Field>
                          </Col>
                          <Col lg={12}>
                            <p><span onClick={() => {
                              if (regOption?.key == 1) {
                                setRegOption({
                                  key: 2,
                                  state: "Select from list instead"
                                })
                              } else {
                                setRegOption({ key: 1, state: "Not in the list, add your company" })
                              }
                            }}>{regOption?.state}</span></p>
                          </Col>
                          {regOption?.key === 2 &&
                            <>
                              <Col lg={12}>
                                <h3>Company Details</h3>
                              </Col>
                              <Col md={12} lg={6}>
                                <Field name={`regorgCatgeory`}>
                                  {({ input, meta }) => (
                                    <>
                                      <div className="d-flex">
                                        <label className="signup_form_label">
                                          Organisation Category
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
                                        <option value="">
                                          Select an Organisation Category
                                        </option>
                                        {organisationType?.map((item, index) => {
                                          return <option key={index}>{item}</option>;
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
                                <Field name={`reggroupId`}>
                                  {({ input, meta }) => (
                                    <>
                                      <div className="d-flex">
                                        <label className="signup_form_label">
                                          Group Name
                                        </label>
                                        {meta.error && meta.touched && (
                                          <span className="text-danger required_msg ">
                                            {meta.error}
                                          </span>
                                        )}
                                      </div>
                                      <Creatable
                                        {...input}
                                        className="select_div margin_bottom"
                                        placeholder="Enter Group Name"
                                        isSearchable={true}
                                        options={grouplist?.map((item) => {
                                          return {
                                            label: item?.groupName,
                                            value: item?.id,
                                          };
                                        })}
                                      />
                                    </>
                                  )}
                                </Field>
                              </Col>
                              <Col md={12} lg={6}>
                                <FieldArray name="regsector">
                                  {({ fields }) => (
                                    <>
                                      {fields.map((name, index) => (
                                        <div className="d-flex" key={index}>
                                          <Field name={`${name}.sectorId`}>
                                            {({ input, meta }) => (
                                              <div className="w-100">
                                                <div className="d-flex">
                                                  <label className="signup_form_label">
                                                    Select Sector
                                                  </label>
                                                  {meta.error && meta.touched && (
                                                    <span className="text-danger required_msg ">
                                                      {meta.error}
                                                    </span>
                                                  )}
                                                </div>
                                                <div className="d-flex">
                                                  <select
                                                    {...input}
                                                    className="form-control select-style signup_form_input "
                                                    onChange={(e) => {
                                                      input.onChange(e);
                                                      // handleSectorSelect(e, values);
                                                    }}
                                                  >
                                                    <option value="">
                                                      Select Sector
                                                    </option>
                                                    {sectorlist &&
                                                      sectorlist?.map((item, index) => {
                                                        return (
                                                          <option
                                                            value={item?.id}
                                                            key={index}
                                                          >
                                                            {item?.name}
                                                          </option>
                                                        );
                                                      })}
                                                  </select>
                                                </div>
                                                <div className="text-end">
                                                  <img
                                                    className="select_down_icon"
                                                    src="/images/down.png"
                                                  />
                                                </div>
                                              </div>
                                            )}
                                          </Field>
                                          <div className=" d-flex plus_minus_btn_margin">
                                            {!router.query.Id && (
                                              <div
                                                type="button"
                                                className="add_remove_btn"
                                                onClick={() =>
                                                  fields.push({
                                                    sectorId: "",
                                                  })
                                                }
                                              >
                                                <img
                                                  className="add_remove_icon"
                                                  src="/images/plus.png"
                                                />
                                              </div>
                                            )}
                                            {fields.length > 1 ? (
                                              <div
                                                className="add_remove_btn"
                                                type="button"
                                                onClick={() => fields.remove(index)}
                                              >
                                                <img
                                                  className="add_remove_icon"
                                                  src="/images/delete-black.png"
                                                />
                                              </div>
                                            ) : (
                                              <></>
                                            )}
                                          </div>
                                        </div>
                                      ))}
                                    </>
                                  )}
                                </FieldArray>
                              </Col>
                              <Col md={12} lg={6}>
                                <FieldArray name="regindustry">
                                  {({ fields }) => (
                                    <>
                                      {fields.map((name, index) => (
                                        <div className="d-flex">
                                          <Field name={`${name}.industryId`}>
                                            {({ input, meta }) => (
                                              <div className="w-100">
                                                <div className="d-flex">
                                                  <label className="signup_form_label">
                                                    Select Industry
                                                  </label>
                                                  {meta.error && meta.touched && (
                                                    <span className="text-danger required_msg ">
                                                      {meta.error}
                                                    </span>
                                                  )}
                                                </div>
                                                <div className="d-flex">
                                                  <select
                                                    {...input}
                                                    className="form-control select-style signup_form_input "
                                                  >
                                                    <option value="">
                                                      Select Industry
                                                    </option>
                                                    {industrylist &&
                                                      industrylist?.map((ele, i) => {
                                                        return (values?.regsector?.map((item, index) => {
                                                          if (item.sectorId == ele?.sectorId) {
                                                            return (<option value={ele?.id} key={index}>{ele?.name}</option>)
                                                          }
                                                        }))
                                                      })
                                                    }
                                                  </select>
                                                </div>
                                                <div className="text-end">
                                                  <img
                                                    className="select_down_icon"
                                                    src="/images/down.png"
                                                  />
                                                </div>
                                              </div>
                                            )}
                                          </Field>
                                          <div className="  d-flex plus_minus_btn_margin">
                                            {!router.query.Id && (
                                              <div
                                                type="button"
                                                className="add_remove_btn"
                                                onClick={() =>
                                                  fields.push({
                                                    industryId: "",
                                                  })
                                                }
                                              >
                                                <img
                                                  className="add_remove_icon"
                                                  src="/images/plus.png"
                                                />
                                              </div>
                                            )}
                                            {fields.length > 1 ? (
                                              <div
                                                className="add_remove_btn"
                                                type="button"
                                                onClick={() => fields.remove(index)}
                                              >
                                                <img
                                                  className="add_remove_icon"
                                                  src="/images/delete-black.png"
                                                />
                                              </div>
                                            ) : (
                                              <></>
                                            )}
                                          </div>
                                        </div>
                                      ))}
                                    </>
                                  )}
                                </FieldArray>
                              </Col>
                              <Col md={12} lg={6}>
                                <Field name={`regbrandId`}>
                                  {({ input, meta }) => (
                                    <>
                                      <div className="d-flex">
                                        <label className="signup_form_label">
                                          Brand Name
                                        </label>
                                        {meta.error && meta.touched && (
                                          <span className="text-danger required_msg">
                                            {meta.error}
                                          </span>
                                        )}
                                      </div>
                                      <Creatable
                                        {...input}
                                        className="margin_bottom"
                                        placeholder="Enter Brand Name"
                                        isSearchable={true}
                                        options={brandnamelist?.map((item) => {
                                          return {
                                            label: item?.brandName,
                                            value: item?.id,
                                          };
                                        })}
                                      />
                                    </>
                                  )}
                                </Field>
                              </Col>
                              <Col md={12} lg={6}>
                                <Field name={`regcompanyId`}>
                                  {({ input, meta }) => (
                                    <>
                                      <div className="d-flex">
                                        <label className="signup_form_label">
                                          Company Name
                                        </label>
                                        {meta.error && meta.touched && (
                                          <span className="text-danger required_msg">
                                            {meta.error}
                                          </span>
                                        )}
                                      </div>
                                      <Creatable
                                        {...input}
                                        className="margin_bottom"
                                        placeholder="Enter Compay Name"
                                        isSearchable={true}
                                        options={companynamelist?.map((item) => {
                                          return {
                                            label: item?.companyName,
                                            value: item?.id,
                                          };
                                        })}
                                      />
                                    </>
                                  )}
                                </Field>
                              </Col>
                              <Col md={12} lg={6}>
                                <FieldArray name="reglevelOfCompany">
                                  {({ fields }) => (
                                    <>
                                      {fields.map((name, index) => (
                                        <div className="d-flex">
                                          <Field name={`${name}.companyLevel`}>
                                            {({ input, meta }) => (
                                              <div className="w-100">
                                                <div className="d-flex">
                                                  <label className="signup_form_label">
                                                    Company Level
                                                  </label>
                                                  {meta.error && meta.touched && (
                                                    <span className="text-danger required_msg ">
                                                      {meta.error}
                                                    </span>
                                                  )}
                                                </div>
                                                <div className="d-flex">
                                                  <select
                                                    {...input}
                                                    className="form-control select-style signup_form_input "
                                                  >
                                                    <option value="">
                                                      Select Company Level
                                                    </option>
                                                    {companylevel?.map(
                                                      (item, index) => {
                                                        return (
                                                          <option key={index}>
                                                            {item}
                                                          </option>
                                                        );
                                                      }
                                                    )}
                                                  </select>
                                                </div>

                                                <div className="text-end">
                                                  <img
                                                    className="select_down_icon"
                                                    src="/images/down.png"
                                                  />
                                                </div>
                                              </div>
                                            )}
                                          </Field>
                                          <div className="  d-flex plus_minus_btn_margin">
                                            {!router.query.Id && (
                                              <div
                                                type="button"
                                                className="add_remove_btn"
                                                onClick={() =>
                                                  fields.push({
                                                    companyLevel: "",
                                                  })
                                                }
                                              >
                                                <img
                                                  className="add_remove_icon"
                                                  src="/images/plus.png"
                                                />
                                              </div>
                                            )}
                                            {fields.length > 1 ? (
                                              <div
                                                className="add_remove_btn"
                                                type="button"
                                                onClick={() => fields.remove(index)}
                                              >
                                                <img
                                                  className="add_remove_icon"
                                                  src="/images/delete-black.png"
                                                />
                                              </div>
                                            ) : (
                                              <></>
                                            )}
                                          </div>
                                        </div>
                                      ))}
                                    </>
                                  )}
                                </FieldArray>
                              </Col>
                              <Col md={12} lg={6}>
                                <FieldArray name="regbusinessNature">
                                  {({ fields }) => (
                                    <>
                                      {fields.map((name, index) => (
                                        <div className="d-flex">
                                          <Field name={`${name}.natureOfBusiness`}>
                                            {({ input, meta }) => (
                                              <div className="w-100">
                                                <div className="d-flex">
                                                  <label className="signup_form_label">
                                                    Nature of Business
                                                  </label>
                                                  {meta.error && meta.touched && (
                                                    <span className="text-danger required_msg ">
                                                      {meta.error}
                                                    </span>
                                                  )}
                                                </div>
                                                <div className="d-flex">
                                                  <select
                                                    {...input}
                                                    className="form-control select-style signup_form_input "
                                                  >
                                                    <option value="">
                                                      Select Nature of Business
                                                    </option>
                                                    {natureOfBuisness?.map(
                                                      (item, index) => {
                                                        return (
                                                          <option key={index}>
                                                            {item}
                                                          </option>
                                                        );
                                                      }
                                                    )}
                                                  </select>
                                                </div>

                                                <div className="text-end">
                                                  <img
                                                    className="select_down_icon"
                                                    src="/images/down.png"
                                                  />
                                                </div>
                                              </div>
                                            )}
                                          </Field>

                                          <div className="  d-flex plus_minus_btn_margin">
                                            {!router.query.Id && (
                                              <div
                                                type="button"
                                                className="add_remove_btn"
                                                onClick={() =>
                                                  fields.push({
                                                    companyLevel: "",
                                                  })
                                                }
                                              >
                                                <img
                                                  className="add_remove_icon"
                                                  src="/images/plus.png"
                                                />
                                              </div>
                                            )}
                                            {fields.length > 1 ? (
                                              <div
                                                className="add_remove_btn"
                                                type="button"
                                                onClick={() => fields.remove(index)}
                                              >
                                                <img
                                                  className="add_remove_icon"
                                                  src="/images/delete-black.png"
                                                />
                                              </div>
                                            ) : (
                                              <></>
                                            )}
                                          </div>
                                        </div>
                                      ))}
                                    </>
                                  )}
                                </FieldArray>
                              </Col>
                              <Col md={12} lg={6}>
                                <Field name={`regtypeOfCompany`}>
                                  {({ input, meta }) => (
                                    <>
                                      <div className="d-flex">
                                        <label className="signup_form_label">
                                          Type of Company
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
                                        <option value="">Select Type of Company</option>
                                        {typeOfCompany?.map((item, index) => {
                                          return <option key={index}>{item}</option>;
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
                                <Field name={`regcompanySize`}>
                                  {({ input, meta }) => (
                                    <>
                                      <div className="d-flex">
                                        <label className="signup_form_label">
                                          Company's Size
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
                                        <option value="">Select Company size</option>
                                        {companySize?.map((item, index) => {
                                          return <option key={index}>{item}</option>;
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
                                <Field name={`regestablishedYear`}>
                                  {({ input, meta }) => {
                                    let yearList = [];
                                    for (let i = 0; i < 300; i++) {
                                      yearList.push(new Date().getFullYear() - i);
                                    }
                                    return (
                                      <>
                                        <div className="d-flex">
                                          <label className="signup_form_label">
                                            Established Year
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
                                          <option value="">Select Company size</option>
                                          {yearList?.map((item, index) => {
                                            return <option key={index}>{item}</option>;
                                          })}
                                        </select>
                                        <div className="text-end">
                                          <img
                                            className="select_down_icon"
                                            src="/images/down.png"
                                          />
                                        </div>
                                      </>
                                    );
                                  }}
                                </Field>
                              </Col>
                              <Col md={12} lg={6}>
                                <Field name={`regwebSite`}>
                                  {({ input, meta }) => (
                                    <>
                                      <div className="d-flex">
                                        <label className="signup_form_label">
                                          Website
                                        </label>
                                        {meta.error && meta.touched && (
                                          <span className="text-danger required_msg">
                                            {meta.error}
                                          </span>
                                        )}
                                      </div>
                                      <input
                                        {...input}
                                        className="form-control select-style signup_form_input margin_bottom"
                                        placeholder="Enter Website"
                                      />
                                    </>
                                  )}
                                </Field>
                              </Col>
                              <Col md={12} lg={6}>
                                <Field name={`regcompetitors`}>
                                  {({ input, meta }) => (
                                    <>
                                      <div className="d-flex">
                                        <label className="signup_form_label">
                                          Competitors
                                        </label>
                                        {meta.error && meta.touched && (
                                          <span className="text-danger required_msg">
                                            {meta.error}
                                          </span>
                                        )}
                                      </div>
                                      <input
                                        {...input}
                                        className="form-control select-style signup_form_input margin_bottom"
                                        placeholder="Enter Competitors"
                                      />
                                    </>
                                  )}
                                </Field>
                              </Col>
                              <Col md={12} lg={6}>
                                <Field name={`regheadOffice`}>
                                  {({ input, meta }) => (
                                    <>
                                      <div className="d-flex">
                                        <label className="signup_form_label">
                                          Head Office
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
                                        <option value="">Is it head office?</option>
                                        <option value={true}>Yes</option>
                                        <option value={false}>No</option>
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
                                <Field name={`regstateId`}>
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
                                <Field name={`regcityId`}>
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
                                <Field name={`regplotNumber`}>
                                  {({ input, meta }) => (
                                    <>
                                      <div className="d-flex">
                                        <label className="signup_form_label">
                                          Plot No.
                                        </label>
                                        {meta.error && meta.touched && (
                                          <span className="text-danger required_msg">
                                            {meta.error}
                                          </span>
                                        )}
                                      </div>
                                      <input
                                        {...input}
                                        className="form-control select-style signup_form_input margin_bottom"
                                        placeholder="Enter Plot No."
                                      />
                                    </>
                                  )}
                                </Field>
                              </Col>
                              <Col md={12} lg={6}>
                                <Field name={`regstreetAddress`}>
                                  {({ input, meta }) => (
                                    <>
                                      <div className="d-flex">
                                        <label className="signup_form_label">
                                          Street Address
                                        </label>
                                        {meta.error && meta.touched && (
                                          <span className="text-danger required_msg">
                                            {meta.error}
                                          </span>
                                        )}
                                      </div>
                                      <input
                                        {...input}
                                        className="form-control select-style signup_form_input margin_bottom"
                                        placeholder="Enter Street Address"
                                      />
                                    </>
                                  )}
                                </Field>
                              </Col>
                              <Col md={12} lg={6}>
                                <Field name={`regcontactNumber`}>
                                  {({ input, meta }) => (
                                    <>
                                      <div className="d-flex">
                                        <label className="signup_form_label">
                                          Contact no.
                                        </label>
                                        {meta.error && meta.touched && (
                                          <span className="text-danger required_msg">
                                            {meta.error}
                                          </span>
                                        )}
                                      </div>
                                      <input
                                        {...input}
                                        className="form-control select-style signup_form_input margin_bottom"
                                        placeholder="Enter Contact no."
                                      />
                                    </>
                                  )}
                                </Field>
                              </Col>
                              <Col md={12} lg={6}>
                                <Field name={`regemail`}>
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
                                        className="form-control select-style signup_form_input margin_bottom"
                                        placeholder="Enter Email"
                                      />
                                    </div>
                                  )}
                                </Field>
                              </Col>
                              <Col md={12} lg={6}>
                                <Field name={`regyourRole`}>
                                  {({ input, meta }) => (
                                    <div>
                                      <div className="d-flex">
                                        <label className="signup_form_label">
                                          {" "}
                                          Your Role in Organisation
                                        </label>
                                        {meta.error && meta.touched && (
                                          <span className="text-danger required_msg">
                                            {meta.error}
                                          </span>
                                        )}
                                      </div>
                                      <input
                                        {...input}
                                        className="form-control select-style signup_form_input margin_bottom"
                                        placeholder="Enter Role"
                                      />
                                    </div>
                                  )}
                                </Field>
                              </Col>
                            </>
                          }
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
