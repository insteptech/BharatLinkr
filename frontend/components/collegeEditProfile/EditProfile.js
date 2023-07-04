import React, { useState } from "react";
import {
  Col,
  Container,
  Row,
  Tab,
  Tabs,
  Form as Bootform,
  Table
} from "react-bootstrap";
import { Field, Form } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";

import dynamic from "next/dynamic";
import CollegeProfile from "./collegeProfile";
import ProfileReview from "./profileReview";
const CKeditorGenerator = dynamic(() => import("../admin/Ckeditor/CKeditor"), {
  ssr: false,
});

function EditProfile() {
  const [dataValue, setDataValue] = useState(0);
  const [collegeform, setCollegeform] = useState({
    maincategory: 'college',
    step: 0
  });
  const [datatype, setDatatype] = useState('postTypes');

  const SelectOptions = [
    { values: "student", label: "Student" },
    { values: "college", label: "College" },
    { values: "Corporate", label: "Corporate" },
  ];

  const handleSubmit = (values) => {
    console.log(values, "sadasdasdasd");
    const data = { payload: [values] };
    if (dataValue == 0) {
      setDataValue(1);
    }
    if (dataValue == 1) {
      setDataValue(2);
    }
    if (dataValue == 2) {
      console.log(data);
    }
    console.log(values);
  };

  const collegeTableHeading = ['S.no', 'Name', 'User Type', 'Contact No.', 'Email', 'Education', 'Location', 'Course', 'Action']
  const ExamTableHeading = ['S.no', 'Name', 'User Type', 'Contact No.', 'Email', 'Education', 'Location', 'Exam', 'Action']
  const collegeTableData = [
    {
      name: '',
      usertype: '',
      contact: '',
      email: '',
      education: '',
      location: '',
      course: '',
      exam: '',
    },
    {
      name: '',
      usertype: '',
      contact: '',
      email: '',
      education: '',
      location: '',
      course: '',
      exam: '',
    },
    {
      name: '',
      usertype: '',
      contact: '',
      email: '',
      education: '',
      location: '',
      course: '',
      exam: '',
    },
    {
      name: '',
      usertype: '',
      contact: '',
      email: '',
      education: '',
      location: '',
      course: '',
      exam: '',
    },
    {
      name: '',
      usertype: '',
      contact: '',
      email: '',
      education: '',
      location: '',
      course: '',
      exam: '',
    },
    {
      name: '',
      usertype: '',
      contact: '',
      email: '',
      education: '',
      location: '',
      course: '',
      exam: '',
    },
  ]

  const collegeAbout = [
    { title: "Intro", key: "intro" },
    { title: "Highlights", key: "highlights" },
    { title: "Ranking & Awards", key: "rankingawards" },
    { title: "Courses", key: "courses" },
    { title: "Scholarship Placements", key: "scholarships" },
    { title: "Facilities", key: "facilities" },
  ];

  const coursesandfee = [
    { title: "All Courses", key: "allcourses" },
    { title: "Lateral Entry", key: "lateralentry" },
    { title: "Honors", key: "honors" },
  ];

  const collegeadmission = [
    { title: "Intro", key: "intro" },
    { title: "About Test", key: "abouttest" },
    { title: "Imp. Dates", key: "impdates" },
    { title: "Admission Highlights", key: "admissionhighlights" },
    { title: "Application Process", key: "applicationprocess" },
    { title: "PHD Admission Process", key: "PHDadmissionprocess" },
  ];

  const distanceeducation = [
    { title: "Basic Info", key: "basicinfo" },
    { title: "Course Details", key: "coursedetails" },
    { title: "Honors", key: "honors" },
  ];

  const scholarship = [
    { title: "Intro", key: "intro" },
    { title: "Based on Uni Exams", key: "basedonuniexams" },
    { title: "Based on Admission Test", key: "basedonadmissiontest" },
    { title: "Based on Sports Quota", key: "basedonsportsquota" },
    { title: "Based on Diploma, Grad", key: "basedondiploma,grad" },
  ];

  const placements = [
    { title: "Intro", key: "intro" },
    { title: "Highlights 2021", key: "highlights2021" },
    { title: "MBA Highlights", key: "MBAhighlights" },
    { title: "BTECH Highlights", key: "BTECHhighlights" },
    { title: "Year Wise Placements", key: "yearwiseplacements" },
    { title: "Top Recruiters", key: "toprecruiters" },
  ];

  const faqs = [
    { title: "General", key: "general" },
    { title: "Courses & Fees", key: "courses&fees" },
    { title: "Scholarships", key: "scholarships" },
    { title: "Placements", key: "placements" },
  ];

  const validate = (values) => {
    console.log(values, "data");
    const errors = {};
    let itemArray1 = [];
    let itemArray2 = [];
    if (dataValue === 0) {
      values.CollegeAgency.map((item, index) => {
        const error = {};
        if (!item.selectAgencies) {
          error["selectAgencies"] = "*";
        }
        if (!item.Overall) {
          error["Overall"] = "*";
        }
        if (!item.TotalAgency) {
          error["TotalAgency"] = "*";
        }
        if (!item.Year) {
          error["Year"] = "*";
        }
        itemArray1.push(error);
      });
      errors["CollegeAgency"] = itemArray1;
      if (!values.chooseAffiliation) {
        errors["chooseAffiliation"] = "*";
      }
      if (!values.collegeName) {
        errors["collegeName"] = "*";
      }
      if (!values.CollegeMail) {
        errors["CollegeMail"] = "*";
      }
      if (!values.collegeType) {
        errors["collegeType"] = "*";
      }
      if (!values.establishedDate) {
        errors["establishedDate"] = "*";
      }
      if (!values.approval) {
        errors["approval"] = "*";
      }
      if (!values.collegeState) {
        errors["collegeState"] = "*";
      }
      if (!values.collegeCity) {
        errors["collegeCity"] = "*";
      }
      if (!values.collegeGrade) {
        errors["collegeGrade"] = "*";
      }
      if (!values.collegeStatus) {
        errors["collegeStatus"] = "*";
      }
      if (!values.collegeLogo) {
        errors["collegeLogo"] = "*";
      }
      if (!values.collegeImage) {
        errors["collegeImage"] = "*";
      }
      if (values.CollegeAgency) {
      }
      // if (values.select) {
      //   let itemErrors = []
      //   values.select.map((item, index) => {
      //     console.log(item, 'itrem')
      //     const error = {}
      //       if (!item.agencyName) {
      //         error['agencyName'] = 'required'
      //     }
      //     if (!item.agencyEmail) {
      //         error['agencyEmail'] = 'required'
      //       }
      //       itemErrors.push(error)
      //   })
      //   errors['select'] = itemErrors;
      // }
    }
    if (dataValue === 1) {
      if (values.ChooseStreams) {
        values.ChooseStreams.map((item, index) => {
          let error = {};
          if (!item.SelectStream) {
            error["SelectStream"] = "*";
          }
          if (!item.MainStream) {
            error["MainStream"] = "*";
          }
          if (!item.SubStream) {
            error["SubStream"] = "*";
          }
          itemArray1.push(error);
        });
        errors["ChooseStreams"] = itemArray1;
      }
      if (values.CourseFeeDetails) {
        values.CourseFeeDetails.map((item, index) => {
          let error = {};
          if (!item.FeeType) {
            error["FeeType"] = "*";
          }
          if (!item.CourseFee) {
            error["CourseFee"] = "*";
          }
          itemArray2.push(error);
        });
        errors["CourseFeeDetails"] = itemArray2;
      }
      if (!values.CourseType) {
        errors["CourseType"] = "*";
      }
      if (!values.CourseName) {
        errors["CourseName"] = "*";
      }
      if (!values.CoursePlace) {
        errors["CoursePlace"] = "*";
      }
      if (!values.CourseDuration) {
        errors["CourseDuration"] = "*";
      }
      if (!values.CourseEligibility) {
        errors["CourseEligibility"] = "*";
      }
      if (!values.TypeofCourse) {
        errors["TypeofCourse"] = "*";
      }
      if (!values.ProgramType) {
        errors["ProgramType"] = "*";
      }
      if (!values.CourseCategory) {
        errors["CourseCategory"] = "*";
      }
      if (!values.ChooseExamAccepted) {
        errors["ChooseExamAccepted"] = "*";
      }
      if (!values.ShowonFiltering) {
        errors["ShowonFiltering"] = "*";
      }
      // if (values.courseFees) {
      //   let itemErrors = []
      //   values.courseFees.map((item, index) => {
      //     const error = {}
      //     if (!item.feeType) {
      //       error['feeType'] = 'required'
      //     } if (!item.courseFee) {
      //       error['courseFee'] = 'required'
      //     }
      //     itemErrors.push(error)
      //     console.log(itemErrors,'rrrrrrr')
      //   })
      //   errors['courseFees'] = itemErrors;
      // }
    }
    console.log(errors, "eeeeeeeeee");
    return errors;
  };

  const handleTab = (index) => {
    setDataValue(index);
  };

  const handlecolChange = (e) => {
    setCollegeform({...collegeform,maincategory: e.target.value})
  }

  const FormSteps = [
    "Profile",
    "Inbox",
    "Edit info",
    "Account Admin",
  ];

  const handleChange = (e) => {
    setDatatype(e.target.value)
  }

  return (
    <>
      <Container>
        <Row>
          <Col lg={12} className="text-center edit_profile_h2">
            <h2>Edit Profile</h2>
          </Col>
        </Row>
        <div className="admin_home_tabs_row">
          <Row>
            <ul className="nav tabs_scroll">
              {FormSteps &&
                FormSteps.map((steps, stepsIndex) => (
                  <li className="nav-item" key={stepsIndex}>
                    <a
                      className={`nav-link admin_tabs_name ${dataValue === stepsIndex && "head-active"
                        }`}
                      active={true}
                      onClick={() => handleTab(stepsIndex)}
                    >
                      {steps}
                    </a>
                  </li>
                ))}
            </ul>
          </Row>
        </div>

        <Row className="mt-5">
          <Col>
            {dataValue === 0 && <CollegeProfile />}
            {dataValue === 1 && (<>
              <Row>
                <Col>
                  <div className="d-flex">
                    <Bootform.Select onChange={(e) => handleChange(e)} className="me-2">
                      <option value="postTypes">Post types</option>
                      <option value="colleges">Colleges</option>
                      <option value="exams">Exams</option>
                    </Bootform.Select>
                    {datatype === 'postTypes' && (
                      <>
                        <button className="me-2" style={{ backgroundColor: 'C7C7C7', border: 'none', borderRadius: '5px' }}>All post types</button>
                        <button className="me-2" style={{ backgroundColor: 'C7C7C7', border: 'none', borderRadius: '5px' }}>Script</button>
                        <button className="me-2" style={{ backgroundColor: 'C7C7C7', border: 'none', borderRadius: '5px' }}>Announcements</button>
                        <button className="me-2" style={{ backgroundColor: 'C7C7C7', border: 'none', borderRadius: '5px' }}>Jobs</button>
                        <button className="me-2" style={{ backgroundColor: 'C7C7C7', border: 'none', borderRadius: '5px' }}>Internships</button>
                        <button className="me-2" style={{ backgroundColor: 'C7C7C7', border: 'none', borderRadius: '5px' }}>Mentoring</button>
                      </>
                    )}
                    {datatype === 'colleges' && (
                      <>
                        <button className="me-2" style={{ backgroundColor: 'C7C7C7', border: 'none', borderRadius: '5px' }}>Apply Now</button>
                        <button className="me-2" style={{ backgroundColor: 'C7C7C7', border: 'none', borderRadius: '5px' }}>Reviews</button>
                        <button className="me-2" style={{ backgroundColor: 'C7C7C7', border: 'none', borderRadius: '5px' }}>Addmission Form</button>
                        <button className="me-2" style={{ backgroundColor: 'C7C7C7', border: 'none', borderRadius: '5px' }}>Counselling Form</button>
                      </>
                    )}
                    {datatype === 'exams' && (
                      <>
                        <button className="me-2" style={{ backgroundColor: 'C7C7C7', border: 'none', borderRadius: '5px' }}>Get updates</button>
                      </>
                    )}
                  </div>
                </Col>
              </Row>
              <hr className="my-2"></hr>
              <Row>
                <Col xl={6} lg={12} md={12}>
                  <div className="d-flex table_heading_header">
                    <h4 className="table_list_heading master_heading">All post type</h4>
                    <div className="enteries_input">
                      <h6 className="enteries_input_label">Show Enteries</h6>
                      <Bootform.Select aria-label="Default select example">
                        <option>10</option>
                        <option value="1">3</option>
                        <option value="2">5</option>
                        <option value="3">8</option>
                      </Bootform.Select>
                    </div>
                  </div>
                </Col>
                <Col xl={6} lg={12} md={12} className="text-end">
                  <p>Sort by: Date posted</p>
                </Col>
              </Row>
              <Row>
                <Table responsive className="admin_table" bordered hover>
                  <thead>
                    <tr>
                      {collegeTableHeading.map((heading, index) => {
                        return (
                          <th className="table_head" key={index}>
                            {heading}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {collegeTableData && collegeTableData?.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className="text-center admin_table_data">
                            <input
                              className="college_box_check_input me-2"
                              type="checkbox"
                              name="collegeStateId"
                            />
                            {index + 1}
                          </td>
                          <td className="text-center admin_table_data">{item.name}</td>
                          <td className="text-center admin_table_data">{item.usertype}</td>
                          <td className="text-center admin_table_data">{item.contact}</td>
                          <td className="text-center admin_table_data">{item.email}</td>
                          <td className="text-center admin_table_data">{item.education}</td>
                          <td className="text-center admin_table_data">{item.location}</td>
                          <td className="text-center admin_table_data">{item.course}</td>
                          <td className="text-center admin_table_data">
                            <img
                              className="mx-1 admin_table_action_icon"
                              src="/images/edit-icon-blue.png"
                            />
                            <img
                              className="mx-1 admin_table_action_icon"
                              src="/images/delete-icon-blue.png"
                            />
                            <img
                              className="mx-1 admin_table_action_icon"
                              src="/images/delete-icon-blue.png"
                            />
                            <img
                              className="mx-1 admin_table_action_icon"
                              src="/images/delete-icon-blue.png"
                            />
                            <img
                              className="mx-1 admin_table_action_icon"
                              src="/images/delete-icon-blue.png"
                            />
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </Row>
            </>)}
            {dataValue === 2 && (<>
              <div className="d-flex mb-5">
                <Bootform.Select name="maincategory" className="me-2" onChange={(e) => handlecolChange(e)}>
                  <option value="college">College</option>
                  <option value="exam">Exam</option>
                </Bootform.Select>
                <div className="d-flex">
                  {collegeform.maincategory === 'college' && (
                    <>
                      <button className="me-2" style={{ backgroundColor: 'C7C7C7', border: 'none', borderRadius: '5px' }} onClick={() => setCollegeform({...collegeform,step:0})}>Register</button>
                      <button className="me-2" style={{ backgroundColor: 'C7C7C7', border: 'none', borderRadius: '5px' }} onClick={() => setCollegeform({...collegeform,step:1})}>Courses</button>
                      <button className="me-2" style={{ backgroundColor: 'C7C7C7', border: 'none', borderRadius: '5px' }} onClick={() => setCollegeform({...collegeform,step:2})}>CMS</button>
                    </>
                  )}
                  {collegeform.maincategory === 'exam' && (
                    <>
                      <button className="me-2" style={{ backgroundColor: 'C7C7C7', border: 'none', borderRadius: '5px' }} onClick={() => setCollegeform({...collegeform,step:0})}>Register</button>
                      <button className="me-2" style={{ backgroundColor: 'C7C7C7', border: 'none', borderRadius: '5px' }} onClick={() => setCollegeform({...collegeform,step:1})}>CMS</button>
                    </>
                  )}
                </div>
              </div>
              <Form
                onSubmit={handleSubmit}
                mutators={{
                  // potentially other mutators could be merged here
                  ...arrayMutators,
                }}
                // validate={validate}
                initialValues={{
                  college: [
                    {
                      chooseAffiliation: "",
                      collegeName: "",
                      CollegeMail: "",
                      collegeType: "",
                      establishedDate: "",
                      approval: "",
                      collegeState: "",
                      collegeCity: "",
                      CollegeAgency: [
                        {
                          selectAgencies: "",
                          Overall: "",
                          TotalAgency: "",
                          Year: "",
                        },
                      ],
                      collegeGrade: "",
                      collegeStatus: "",
                      collegeLogo: "",
                      collegeImage: "",
                    },
                  ],
                  collegeCourse: [
                    {
                      ChooseStreams: [
                        { SelectStream: "", MainStream: "", SubStream: "" },
                      ],
                      CourseType: "",
                      CourseName: "",
                      CourseFeeDetails: [{ FeeType: "", CourseFee: "" }],
                      CoursePlace: "",
                      CourseDuration: "",
                      CourseEligibility: "",
                      TypeofCourse: "",
                      ProgramType: "",
                      CourseCategory: "",
                      ChooseExamAccepted: "",
                      ShowonFiltering: "",
                    },
                  ],
                  collegeAbout: [
                    {
                      intro: "",
                    },
                  ],
                  coursesandfee: [
                    {
                      allcourses: "",
                    },
                  ],
                  collegeadmission: [
                    {
                      intro: "",
                    },
                  ],
                  distanceeducation: [
                    {
                      basicinfo: "",
                    },
                  ],
                  scholarship: [
                    {
                      intro: "",
                    },
                  ],
                  placements: [
                    {
                      intro: "",
                    },
                  ],
                  faqs: [
                    {
                      general: "",
                    },
                  ],
                }}
                render={({ handleSubmit, values }) => (
                  <form onSubmit={handleSubmit}>
                    {collegeform.maincategory==='college' && collegeform.step == 0 && (
                      <>
                        <FieldArray name="college">
                          {({ fields }) => (
                            <>
                              {fields.map((name, index) => (
                                <div key={index}>
                                  <Row>
                                    <Col md={12} lg={6}>
                                      <Field name={`${name}.chooseAffiliation`}>
                                        {({ input, meta }) => (
                                          <>
                                            <div className="d-flex">
                                              <label className="signup_form_label">
                                                Choose Affiliation
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
                                              <option>Colleges</option>
                                              <option>chooseAffiliation2</option>
                                              <option>chooseAffiliation3</option>
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
                                      <Field name={`${name}.collegeName`}>
                                        {({ input, meta }) => (
                                          <div>
                                            <div className="d-flex">
                                              <label className="signup_form_label">
                                                College Name
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
                                              placeholder="Enter College Name"
                                            />
                                          </div>
                                        )}
                                      </Field>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col md={12} lg={6}>
                                      <Field
                                        name={`${name}.CollegeMail`}
                                        className="margin_bottom"
                                      >
                                        {({ input, meta }) => (
                                          <div>
                                            <div className="d-flex">
                                              <label className="signup_form_label">
                                                College Mail Id
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
                                              placeholder="Enter Mail Id"
                                            />
                                          </div>
                                        )}
                                      </Field>
                                    </Col>
                                    <Col md={12} lg={6}>
                                      <Field name={`${name}.collegeType`}>
                                        {({ input, meta }) => (
                                          <>
                                            <div className="d-flex">
                                              <label className="signup_form_label">
                                                College Type
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
                                              <option>
                                                Select College Type..
                                              </option>
                                              <option>collegeType1</option>
                                              <option>collegeType2</option>
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
                                  </Row>
                                  <Row>
                                    <Col md={12} lg={6}>
                                      <Field name={`${name}.establishedDate`}>
                                        {({ input, meta }) => (
                                          <div>
                                            <div className="d-flex">
                                              <label className="signup_form_label">
                                                College Established Date
                                              </label>
                                              {meta.touched && meta.error && (
                                                <span className="text-danger required_msg">
                                                  {meta.error}
                                                </span>
                                              )}
                                            </div>
                                            <input
                                              {...input}
                                              type="select"
                                              className="form-control signup_form_input margin_bottom"
                                              placeholder="Enter Established Date"
                                            />
                                          </div>
                                        )}
                                      </Field>
                                    </Col>
                                    <Col md={12} lg={6}>
                                      <Field name={`${name}.approval`}>
                                        {({ input, meta }) => (
                                          <>
                                            <div>
                                              <label className="signup_form_label">
                                                Choose Approval
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
                                              <option>Not Selected</option>
                                              <option>approval1</option>
                                              <option>approval2</option>
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
                                  </Row>
                                  <Row>
                                    <Col md={12} lg={6}>
                                      <Field name={`${name}.collegeState`}>
                                        {({ input, meta }) => (
                                          <>
                                            <div className="d-flex">
                                              <label className="signup_form_label">
                                                College State
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
                                              <option>Enter college State</option>
                                              <option>collegeState1</option>
                                              <option>collegeState2</option>
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
                                      <Field name={`${name}.collegeCity`}>
                                        {({ input, meta }) => (
                                          <>
                                            <div className="d-flex">
                                              <label className="signup_form_label">
                                                College City
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
                                              <option>Enter College City</option>
                                              <option>xyz</option>
                                              <option>abc</option>
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
                                  </Row>
                                  <Row className="position_label">
                                    <Col>
                                      <label className="signup_form_label ">
                                        College Agency
                                      </label>
                                    </Col>
                                    <FieldArray name={`${name}.CollegeAgency`}>
                                      {({ fields }) => (
                                        <div>
                                          <>
                                            {fields.map((name, index) => (
                                              <Row>
                                                <Col md={12} lg={6}>
                                                  <div className="d-flex margin_bottom small_screen_for_input">
                                                    <Field
                                                      name={`${name}.selectAgencies`}
                                                    >
                                                      {({ input, meta }) => (
                                                        <>
                                                          <select
                                                            {...input}
                                                            className="form-control select-style signup_form_input "
                                                          >
                                                            <option>
                                                              select Agencies
                                                            </option>
                                                            <option>
                                                              selectAgencies 1
                                                            </option>
                                                            <option>
                                                              selectAgencies 2
                                                            </option>
                                                          </select>
                                                          {meta.error &&
                                                            meta.touched && (
                                                              <span className="text-danger required_msg position_required">
                                                                {meta.error}
                                                              </span>
                                                            )}
                                                        </>
                                                      )}
                                                    </Field>
                                                    {/* <div className="">
                                      <img
                                        className="select_down_icon_second"
                                        src="/images/down.png"
                                      />
                                    </div> */}
                                                    <div className="for_input_center">
                                                      For
                                                    </div>
                                                    <Field
                                                      name={`${name}.Overall`}
                                                    >
                                                      {({ input, meta }) => (
                                                        <>
                                                          <select
                                                            {...input}
                                                            className="form-control select-style signup_form_input "
                                                          >
                                                            <option>
                                                              Overall
                                                            </option>
                                                            <option>
                                                              Overall 1
                                                            </option>
                                                            <option>
                                                              Overall 2
                                                            </option>
                                                          </select>
                                                          {meta.error &&
                                                            meta.touched && (
                                                              <span className="text-danger required_msg position_required">
                                                                {meta.error}
                                                              </span>
                                                            )}
                                                        </>
                                                      )}
                                                    </Field>
                                                    {/* <div className="">
                                      <img
                                        className="select_down_icon_second"
                                        src="/images/down.png"
                                      />
                                    </div> */}
                                                  </div>
                                                </Col>
                                                <Col md={12} lg={6}>
                                                  <div className="d-flex margin_bottom small_screen_for_input">
                                                    <Field
                                                      name={`${name}.TotalAgency`}
                                                    >
                                                      {({ input, meta }) => (
                                                        <>
                                                          <select
                                                            {...input}
                                                            className="form-control select-style signup_form_input "
                                                          >
                                                            <option>
                                                              Total Agency
                                                            </option>
                                                            <option>
                                                              TotalAgency1
                                                            </option>
                                                            <option>
                                                              TotalAgency2
                                                            </option>
                                                          </select>
                                                          {meta.error &&
                                                            meta.touched && (
                                                              <span className="text-danger required_msg position_required">
                                                                {meta.error}
                                                              </span>
                                                            )}
                                                        </>
                                                      )}
                                                    </Field>
                                                    {/* <div className="">
                                      <img
                                        className="select_down_icon_second"
                                        src="/images/down.png"
                                      />
                                    </div> */}
                                                    <div className="for_input_center">
                                                      For
                                                    </div>
                                                    <Field name={`${name}.Year`}>
                                                      {({ input, meta }) => (
                                                        <>
                                                          <select
                                                            {...input}
                                                            className="form-control select-style signup_form_input "
                                                          >
                                                            <option>Year</option>
                                                            <option>year1</option>
                                                            <option>year2</option>
                                                          </select>
                                                          {meta.error &&
                                                            meta.touched && (
                                                              <span className="text-danger required_msg position_required">
                                                                {meta.error}
                                                              </span>
                                                            )}
                                                        </>
                                                      )}
                                                    </Field>
                                                    {/* <div className="">
                                      <img
                                        className="select_down_icon_second"
                                        src="/images/down.png"
                                      />
                                    </div> */}

                                                    <div className="d-flex mt-2 add_remove_btn_div">
                                                      <div
                                                        type="button"
                                                        className="add_remove_btn plus_btn_margin"
                                                        onClick={() =>
                                                          fields.push({
                                                            selectAgencies: "",
                                                            Overall: "",
                                                            TotalAgency: "",
                                                            Year: "",
                                                          })
                                                        }
                                                      >
                                                        <img
                                                          className="add_remove_icon"
                                                          src="/images/plus.png"
                                                        />
                                                      </div>
                                                      {fields.length > 1 ? (
                                                        <div
                                                          className="add_remove_btn"
                                                          type="button"
                                                          onClick={() =>
                                                            fields.remove(index)
                                                          }
                                                        >
                                                          <img
                                                            className="add_remove_icon"
                                                            src="/images/minus.png"
                                                          />
                                                        </div>
                                                      ) : (
                                                        <></>
                                                      )}
                                                    </div>
                                                  </div>
                                                </Col>
                                              </Row>
                                            ))}
                                          </>
                                        </div>
                                      )}
                                    </FieldArray>
                                  </Row>
                                  <Row>
                                    <Col md={12} lg={6}>
                                      <Field name={`${name}.collegeGrade`}>
                                        {({ input, meta }) => (
                                          <div>
                                            <div className="d-flex">
                                              <label className="signup_form_label">
                                                College NAAC Grade
                                              </label>
                                              {meta.error && meta.touched && (
                                                <span className="text-danger required_msg">
                                                  {meta.error}
                                                </span>
                                              )}
                                            </div>
                                            <input
                                              {...input}
                                              type="select"
                                              className="form-control signup_form_input margin_bottom"
                                              placeholder="Enter NAAC Grade"
                                            />
                                          </div>
                                        )}
                                      </Field>
                                    </Col>
                                    <Col md={12} lg={6}>
                                      <Field name={`${name}.collegeStatus`}>
                                        {({ input, meta }) => (
                                          <>
                                            <div className="d-flex">
                                              <label className="signup_form_label">
                                                College Status
                                              </label>
                                              {meta.touched && meta.error && (
                                                <span className="text-danger required_msg">
                                                  {meta.error}
                                                </span>
                                              )}
                                            </div>
                                            <select
                                              {...input}
                                              className="form-control select-style signup_form_input "
                                            >
                                              <option>
                                                Enter College Status
                                              </option>
                                              <option>collegeStatus 1</option>
                                              <option>collegeStatus 2</option>
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
                                  </Row>
                                  <Row>
                                    <Col md={12} lg={6}>
                                      <Field name={`${name}.collegeLogo`}>
                                        {({ input, meta }) => (
                                          <div>
                                            <div className="d-flex">
                                              <label className="signup_form_label">
                                                College Logo
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
                                              placeholder="Enter logo"
                                            />
                                          </div>
                                        )}
                                      </Field>
                                    </Col>
                                    <Col md={12} lg={6}>
                                      <Field name={`${name}.collegeImage`}>
                                        {({ input, meta }) => (
                                          <div>
                                            <div className="d-flex">
                                              <label className="signup_form_label">
                                                College Image
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
                                              placeholder="College Image"
                                            />
                                          </div>
                                        )}
                                      </Field>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col className="text-center">
                                      <button
                                        className="admin_signup_btn"
                                        onClick={handleSubmit}
                                      >
                                        Update
                                      </button>
                                      {/* <button className="admin_signup_btn m-2" type="submit">
                        Submit
                      </button> */}
                                    </Col>
                                  </Row>
                                </div>
                              ))}
                            </>
                          )}
                        </FieldArray>
                      </>
                    )}
                    {collegeform.maincategory==='college' && collegeform.step == 1 && (
                      <>
                        <FieldArray name="collegeCourse">
                          {({ fields }) => (
                            <>
                              {fields.map((name, index) => (
                                <div key={index}>
                                  <Row>
                                    <Col></Col>
                                    <FieldArray name={`${name}.ChooseStreams`}>
                                      {({ fields }) => (
                                        <div>
                                          <>
                                            {fields.map((name, index) => (
                                              <Row>
                                                <Col lg={4} md={8}>
                                                  <Field
                                                    name={`${name}.SelectStream`}
                                                  >
                                                    {({ input, meta }) => (
                                                      <>
                                                        <div className="d-flex">
                                                          <label className="signup_form_label">
                                                            Choose Streams
                                                          </label>
                                                          {meta.touched &&
                                                            meta.error && (
                                                              <span className="text-danger required_msg">
                                                                {meta.error}
                                                              </span>
                                                            )}
                                                        </div>
                                                        <select
                                                          {...input}
                                                          className="form-control select-style signup_form_input"
                                                        >
                                                          <option>
                                                            Select Stream
                                                          </option>
                                                          <option>
                                                            SelectStream1
                                                          </option>
                                                          <option>
                                                            SelectStream2
                                                          </option>
                                                        </select>
                                                      </>
                                                    )}
                                                  </Field>
                                                  <div className="text-end">
                                                    <img
                                                      className="select_down_icon"
                                                      src="/images/down.png"
                                                    />
                                                  </div>
                                                </Col>
                                                <Col lg={4} md={8}>
                                                  <Field
                                                    name={`${name}.MainStream`}
                                                  >
                                                    {({ input, meta }) => (
                                                      <>
                                                        {/* <div className="d-flex">
                                            {meta.touched && meta.error && (
                                              <span className="text-danger required_msg">
                                                {meta.error}
                                              </span>
                                            )}
                                          </div> */}
                                                        <select
                                                          {...input}
                                                          className="form-control select-style signup_form_input margin_top"
                                                        >
                                                          <option>
                                                            Select Main Stream
                                                          </option>
                                                          <option>
                                                            MainStream 1
                                                          </option>
                                                          <option>
                                                            Mainstream 2
                                                          </option>
                                                        </select>
                                                        {/* {meta.touched && meta.error && (
                                            <span className="text-danger required_msg">
                                              {meta.error}
                                            </span>
                                          )} */}
                                                      </>
                                                    )}
                                                  </Field>
                                                  <div className="text-end">
                                                    <img
                                                      className="select_down_icon"
                                                      src="/images/down.png"
                                                    />
                                                  </div>
                                                </Col>
                                                <Col
                                                  lg={4}
                                                  md={8}
                                                  className="d-flex margin_top"
                                                >
                                                  <Field
                                                    name={`${name}.SubStream`}
                                                  >
                                                    {({ input, meta }) => (
                                                      <>
                                                        <select
                                                          {...input}
                                                          className="form-control select-style signup_form_input margin_bottom"
                                                        >
                                                          <option>
                                                            Select Stream
                                                          </option>
                                                          <option>
                                                            Select Sub Stream1
                                                          </option>
                                                          <option>
                                                            Select Sub Stream2
                                                          </option>
                                                        </select>
                                                        {/* {meta.touched && meta.error && (
                                            <span className="text-danger required_msg">
                                              {meta.error}
                                            </span>
                                          )} */}
                                                      </>
                                                    )}
                                                  </Field>
                                                  <div className="">
                                                    <img
                                                      className="select_down_icon_second"
                                                      src="/images/down.png"
                                                    />
                                                  </div>
                                                  <div className="d-flex mt-2 margin_bottom">
                                                    <div
                                                      type="button"
                                                      className="add_remove_btn ms-2"
                                                      onClick={() =>
                                                        fields.push({
                                                          SelectStream: "",
                                                          MainStream: "",
                                                          SubStream: "",
                                                        })
                                                      }
                                                    >
                                                      <img
                                                        className="add_remove_icon"
                                                        src="/images/plus.png"
                                                      />
                                                    </div>
                                                    {fields.length > 1 ? (
                                                      <div
                                                        className="add_remove_btn ms-2"
                                                        type="button"
                                                        onClick={() =>
                                                          fields.remove(index)
                                                        }
                                                      >
                                                        <img
                                                          className="add_remove_icon"
                                                          src="/images/minus.png"
                                                        />
                                                      </div>
                                                    ) : (
                                                      <></>
                                                    )}
                                                  </div>
                                                </Col>
                                              </Row>
                                            ))}
                                          </>
                                        </div>
                                      )}
                                    </FieldArray>
                                  </Row>
                                  <Row>
                                    <Col md={12} lg={6}>
                                      <Field name={`${name}.CourseType`}>
                                        {({ input, meta }) => (
                                          <>
                                            <div className="d-flex">
                                              <label className="signup_form_label">
                                                Course Type
                                              </label>
                                              {meta.touched && meta.error && (
                                                <span className="text-danger required_msg">
                                                  {meta.error}
                                                </span>
                                              )}
                                            </div>
                                            <select
                                              {...input}
                                              className="form-control select-style signup_form_input"
                                            >
                                              <option>Select Course Type</option>
                                              <option>Coursetype 1</option>
                                              <option>Coursetype 2</option>
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
                                      <Field name={`${name}.CourseName`}>
                                        {({ input, meta }) => (
                                          <>
                                            <div className="d-flex">
                                              <label className="signup_form_label">
                                                Course Name
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
                                              className="form-control select-style signup_form_input margin_bottom"
                                              Placeholder="Enter Course Name"
                                            />
                                          </>
                                        )}
                                      </Field>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col></Col>
                                    <FieldArray name={`${name}.CourseFeeDetails`}>
                                      {({ fields }) => (
                                        <div>
                                          <>
                                            {fields.map((name, index) => (
                                              <Row>
                                                <Col lg={6} md={12}>
                                                  <Field name={`${name}.FeeType`}>
                                                    {({ input, meta }) => (
                                                      <>
                                                        <div className="d-flex">
                                                          <label className="signup_form_label">
                                                            Course Fee Details
                                                          </label>
                                                          {meta.error &&
                                                            meta.touched && (
                                                              <span className="text-danger required_msg">
                                                                {meta.error}
                                                              </span>
                                                            )}
                                                        </div>
                                                        <select
                                                          {...input}
                                                          className="form-control select-style signup_form_input "
                                                        >
                                                          <option>
                                                            Enter Fee Type
                                                          </option>
                                                          <option>
                                                            FeeType 2
                                                          </option>
                                                          <option>
                                                            FeeType 3
                                                          </option>
                                                        </select>
                                                      </>
                                                    )}
                                                  </Field>
                                                  <div className="text-end">
                                                    <img
                                                      className="select_down_icon"
                                                      src="/images/down.png"
                                                    />
                                                  </div>
                                                </Col>
                                                <Col lg={6} md={12}>
                                                  <div className="d-flex margin_top">
                                                    <Field
                                                      name={`${name}.CourseFee`}
                                                    >
                                                      {({ input, meta }) => (
                                                        <div className="w-100">
                                                          <input
                                                            {...input}
                                                            type="text"
                                                            className="form-control signup_form_input margin_bottom"
                                                            placeholder="Enter Course Fee"
                                                          />
                                                        </div>
                                                      )}
                                                    </Field>
                                                    <div className="d-flex mt-2 margin_bottom">
                                                      <div
                                                        type="button"
                                                        className="add_remove_btn ms-2"
                                                        onClick={() =>
                                                          fields.push({
                                                            FeeType: "",
                                                            CourseFee: "",
                                                          })
                                                        }
                                                      >
                                                        <img
                                                          className="add_remove_icon"
                                                          src="/images/plus.png"
                                                        />
                                                      </div>
                                                      {fields.length > 1 ? (
                                                        <div
                                                          className="add_remove_btn ms-2"
                                                          type="button"
                                                          onClick={() =>
                                                            fields.remove(index)
                                                          }
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
                                                </Col>
                                              </Row>
                                            ))}
                                          </>
                                        </div>
                                      )}
                                    </FieldArray>
                                  </Row>
                                  <Row>
                                    <Col md={12} lg={6}>
                                      <Field name={`${name}.CoursePlace`}>
                                        {({ input, meta }) => (
                                          <>
                                            <div className="d-flex">
                                              <label className="signup_form_label">
                                                Course Place
                                              </label>
                                              {meta.error && meta.touched && (
                                                <span className="text-danger required_msg">
                                                  {meta.error}
                                                </span>
                                              )}
                                            </div>
                                            <select
                                              {...input}
                                              className="form-control signup_form_input"
                                            >
                                              <option>CoursePlace 1</option>
                                              <option>CoursePlace 2</option>
                                              <option>CoursePlace 3</option>
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
                                      <Field name={`${name}.CourseDuration`}>
                                        {({ input, meta }) => (
                                          <>
                                            <div className="d-flex">
                                              <label className="signup_form_label">
                                                Course Duration (Years/Months)
                                              </label>
                                              {meta.error && meta.touched && (
                                                <span className="text-danger required_msg">
                                                  {meta.error}
                                                </span>
                                              )}
                                            </div>
                                            <select
                                              {...input}
                                              className="form-control signup_form_input "
                                            >
                                              <option>CourseDuration 1</option>
                                              <option>CourseDuration 2</option>
                                              <option>CourseDuration 3</option>
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
                                  </Row>
                                  <Row>
                                    <Col md={12} lg={6}>
                                      <Field name={`${name}.CourseEligibility`}>
                                        {({ input, meta }) => (
                                          <>
                                            <div className="d-flex">
                                              <label className="signup_form_label">
                                                Course Eligibility
                                              </label>
                                              {meta.error && meta.touched && (
                                                <span className="text-danger required_msg">
                                                  {meta.error}
                                                </span>
                                              )}
                                            </div>
                                            <input
                                              {...input}
                                              className="form-control signup_form_input margin_bottom"
                                              placeholder="Enter Course Eligibility"
                                            />
                                          </>
                                        )}
                                      </Field>
                                    </Col>
                                    <Col md={12} lg={6}>
                                      <Field name={`${name}.TypeofCourse`}>
                                        {({ input, meta }) => (
                                          <>
                                            <div className="d-flex">
                                              <label className="signup_form_label">
                                                Type of Course
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
                                              placeholder="Enter Type of Course"
                                            />
                                          </>
                                        )}
                                      </Field>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col md={12} lg={6}>
                                      <Field name={`${name}.ProgramType`}>
                                        {({ input, meta }) => (
                                          <>
                                            <div className="d-flex">
                                              <label className="signup_form_label">
                                                Program Type
                                              </label>
                                              {meta.error && meta.touched && (
                                                <span className="text-danger required_msg">
                                                  {meta.error}
                                                </span>
                                              )}
                                            </div>
                                            <select
                                              {...input}
                                              className="form-control signup_form_input "
                                            >
                                              <option>ProgramType 1</option>
                                              <option>ProgramType 2</option>
                                              <option>ProgramType 3</option>
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
                                      <Field name={`${name}.CourseCategory`}>
                                        {({ input, meta }) => (
                                          <>
                                            <div className="d-flex">
                                              <label className="signup_form_label">
                                                Course Category
                                              </label>
                                              {meta.error && meta.touched && (
                                                <span className="text-danger required_msg">
                                                  {meta.error}
                                                </span>
                                              )}
                                            </div>
                                            <select
                                              {...input}
                                              className="form-control signup_form_input "
                                            >
                                              <option>CourseCategory 1</option>
                                              <option>CourseCategory 2</option>
                                              <option>CourseCategory 3</option>
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
                                  </Row>
                                  <Row>
                                    <Col md={12} lg={6}>
                                      <Field name={`${name}.ChooseExamAccepted`}>
                                        {({ input, meta }) => (
                                          <>
                                            <div className="d-flex">
                                              <label className="signup_form_label">
                                                Choose Exam Accepted
                                              </label>
                                              {meta.error && meta.touched && (
                                                <span className="text-danger required_msg">
                                                  {meta.error}
                                                </span>
                                              )}
                                            </div>
                                            <select
                                              {...input}
                                              className="form-control signup_form_input "
                                            >
                                              <option>ChooseExamAccepted1</option>
                                              <option>ChooseExamAccepted2</option>
                                              <option>ChooseExamAccepted3</option>
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
                                      <Field name={`${name}.ShowonFiltering`}>
                                        {({ input, meta }) => (
                                          <>
                                            <div className="d-flex">
                                              <label className="signup_form_label">
                                                Show on Filtering
                                              </label>
                                              {meta.error && meta.touched && (
                                                <span className="text-danger required_msg">
                                                  {meta.error}
                                                </span>
                                              )}
                                            </div>
                                            <select
                                              {...input}
                                              className="form-control signup_form_input margin_bottom"
                                            >
                                              <option value="">True/False</option>
                                              <option>True</option>
                                              <option>False</option>
                                            </select>
                                          </>
                                        )}
                                      </Field>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col className="text-center">
                                      <button className="admin_signup_btn me-4 ">
                                        Add More
                                      </button>
                                      <button
                                        className="admin_signup_btn admin_signup_btn_mobile"
                                        type="submit"
                                        onClick={handleSubmit}
                                      >
                                        Update
                                      </button>
                                    </Col>
                                  </Row>
                                </div>
                              ))}
                            </>
                          )}
                        </FieldArray>
                      </>
                    )}
                    {collegeform.maincategory==='college' && collegeform.step == 2 && (
                      <>
                        <Row>
                          <Col>
                            <h4 className="mt-4">College About</h4>
                            <FieldArray name="collegeAbout">
                              {({ fields }) => (
                                <>
                                  {fields.map((name, index) => (
                                    <Tabs
                                      key={index}
                                      defaultActiveKey={0}
                                      className="mb-3"
                                    >
                                      {collegeAbout &&
                                        collegeAbout?.map((item, index) => {
                                          return (
                                            <Tab
                                              style={{
                                                padding: "10px",
                                                border: "1px solid black",
                                                borderRadius: "5px",
                                                backgroundColor: "#FFF",
                                              }}
                                              key={index}
                                              eventKey={index}
                                              title={item.title}
                                            >
                                              <Field
                                                name={`${name}.${item?.key}`}
                                              >
                                                {({ input, meta }) => (
                                                  <>
                                                    <CKeditorGenerator
                                                      input={input}
                                                      onReady={(editor) => { }}
                                                    />
                                                  </>
                                                )}
                                              </Field>
                                            </Tab>
                                          );
                                        })}
                                    </Tabs>
                                  ))}
                                </>
                              )}
                            </FieldArray>
                          </Col>
                        </Row>

                        <Row>
                          <Col>
                            <h4 className="mt-4">College Admission</h4>
                            <FieldArray name="collegeadmission">
                              {({ fields }) => (
                                <>
                                  {fields.map((name, index) => (
                                    <Tabs
                                      key={index}
                                      defaultActiveKey={0}
                                      className="mb-3"
                                    >
                                      {collegeadmission &&
                                        collegeadmission?.map((item, index) => {
                                          return (
                                            <Tab
                                              style={{
                                                padding: "10px",
                                                border: "1px solid black",
                                                borderRadius: "5px",
                                                backgroundColor: "#FFF",
                                              }}
                                              key={index}
                                              eventKey={index}
                                              title={item.title}
                                            >
                                              <Field
                                                name={`${name}.${item?.key}`}
                                              >
                                                {({ input, meta }) => (
                                                  <>
                                                    <CKeditorGenerator
                                                      input={input}
                                                      onReady={(editor) => { }}
                                                    />
                                                  </>
                                                )}
                                              </Field>
                                            </Tab>
                                          );
                                        })}
                                    </Tabs>
                                  ))}
                                </>
                              )}
                            </FieldArray>
                          </Col>
                        </Row>

                        <Row>
                          <Col>
                            <h4 className="mt-4">College About</h4>
                            <FieldArray name="collegeAbout">
                              {({ fields }) => (
                                <>
                                  {fields.map((name, index) => (
                                    <Tabs
                                      key={index}
                                      defaultActiveKey={0}
                                      className="mb-3"
                                    >
                                      {coursesandfee &&
                                        coursesandfee?.map((item, index) => {
                                          return (
                                            <Tab
                                              style={{
                                                padding: "10px",
                                                border: "1px solid black",
                                                borderRadius: "5px",
                                                backgroundColor: "#FFF",
                                              }}
                                              key={index}
                                              eventKey={index}
                                              title={item.title}
                                            >
                                              <Field
                                                name={`${name}.${item?.key}`}
                                              >
                                                {({ input, meta }) => (
                                                  <>
                                                    <CKeditorGenerator
                                                      input={input}
                                                      onReady={(editor) => { }}
                                                    />
                                                  </>
                                                )}
                                              </Field>
                                            </Tab>
                                          );
                                        })}
                                    </Tabs>
                                  ))}
                                </>
                              )}
                            </FieldArray>
                          </Col>
                        </Row>

                        <Row>
                          <Col>
                            <h4 className="mt-4">Distance Education</h4>
                            <FieldArray name="distanceeducation">
                              {({ fields }) => (
                                <>
                                  {fields.map((name, index) => (
                                    <Tabs
                                      key={index}
                                      defaultActiveKey={0}
                                      className="mb-3"
                                    >
                                      {distanceeducation &&
                                        distanceeducation?.map((item, index) => {
                                          return (
                                            <Tab
                                              style={{
                                                padding: "10px",
                                                border: "1px solid black",
                                                borderRadius: "5px",
                                                backgroundColor: "#FFF",
                                              }}
                                              key={index}
                                              eventKey={index}
                                              title={item.title}
                                            >
                                              <Field
                                                name={`${name}.${item?.key}`}
                                              >
                                                {({ input, meta }) => (
                                                  <>
                                                    <CKeditorGenerator
                                                      input={input}
                                                      onReady={(editor) => { }}
                                                    />
                                                  </>
                                                )}
                                              </Field>
                                            </Tab>
                                          );
                                        })}
                                    </Tabs>
                                  ))}
                                </>
                              )}
                            </FieldArray>
                          </Col>
                        </Row>

                        <Row>
                          <Col>
                            <h4 className="mt-4">Scholarship</h4>
                            <FieldArray name="scholarship">
                              {({ fields }) => (
                                <>
                                  {fields.map((name, index) => (
                                    <Tabs
                                      key={index}
                                      defaultActiveKey={0}
                                      className="mb-3"
                                    >
                                      {scholarship &&
                                        scholarship?.map((item, index) => {
                                          return (
                                            <Tab
                                              style={{
                                                padding: "10px",
                                                border: "1px solid black",
                                                borderRadius: "5px",
                                                backgroundColor: "#FFF",
                                              }}
                                              key={index}
                                              eventKey={index}
                                              title={item.title}
                                            >
                                              <Field
                                                name={`${name}.${item?.key}`}
                                              >
                                                {({ input, meta }) => (
                                                  <>
                                                    <CKeditorGenerator
                                                      input={input}
                                                      onReady={(editor) => { }}
                                                    />
                                                  </>
                                                )}
                                              </Field>
                                            </Tab>
                                          );
                                        })}
                                    </Tabs>
                                  ))}
                                </>
                              )}
                            </FieldArray>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <h4 className="mt-4">Placements</h4>
                            <FieldArray name="placements">
                              {({ fields }) => (
                                <>
                                  {fields.map((name, index) => (
                                    <Tabs
                                      key={index}
                                      defaultActiveKey={0}
                                      className="mb-3"
                                    >
                                      {placements &&
                                        placements?.map((item, index) => {
                                          return (
                                            <Tab
                                              style={{
                                                padding: "10px",
                                                border: "1px solid black",
                                                borderRadius: "5px",
                                                backgroundColor: "#FFF",
                                              }}
                                              key={index}
                                              eventKey={index}
                                              title={item.title}
                                            >
                                              <Field
                                                name={`${name}.${item?.key}`}
                                              >
                                                {({ input, meta }) => (
                                                  <>
                                                    <CKeditorGenerator
                                                      input={input}
                                                      onReady={(editor) => { }}
                                                    />
                                                  </>
                                                )}
                                              </Field>
                                            </Tab>
                                          );
                                        })}
                                    </Tabs>
                                  ))}
                                </>
                              )}
                            </FieldArray>
                          </Col>
                        </Row>

                        <Row>
                          <Col>
                            <h4 className="mt-4">FAQs</h4>
                            <FieldArray name="faqs">
                              {({ fields }) => (
                                <>
                                  {fields.map((name, index) => (
                                    <Tabs
                                      key={index}
                                      defaultActiveKey={0}
                                      className="mb-3"
                                    >
                                      {faqs &&
                                        faqs?.map((item, index) => {
                                          return (
                                            <Tab
                                              style={{
                                                padding: "10px",
                                                border: "1px solid black",
                                                borderRadius: "5px",
                                                backgroundColor: "#FFF",
                                              }}
                                              key={index}
                                              eventKey={index}
                                              title={item.title}
                                            >
                                              <Field
                                                name={`${name}.${item?.key}`}
                                              >
                                                {({ input, meta }) => (
                                                  <>
                                                    <CKeditorGenerator
                                                      input={input}
                                                      onReady={(editor) => { }}
                                                    />
                                                  </>
                                                )}
                                              </Field>
                                            </Tab>
                                          );
                                        })}
                                    </Tabs>
                                  ))}
                                </>
                              )}
                            </FieldArray>
                          </Col>
                        </Row>
                        <Row>
                          <Col className="text-center">
                            <button
                              className="admin_signup_btn admin_signup_btn_mobile"
                              type="submit"
                              onClick={handleSubmit}
                            >
                              Update
                            </button>
                          </Col>
                        </Row>
                      </>
                    )}
                  </form>
                )}
              />
            </>)}
            {dataValue === 4 && <ProfileReview />}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default EditProfile;
