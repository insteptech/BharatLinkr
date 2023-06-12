import dynamic from "next/dynamic";
import React, { useEffect, useMemo, useState } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { Field, Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { getMainStream } from "../../../redux/actions/streams/addMainStreams";
import { getAllMasterFilter } from "../../../redux/actions/masterfilter/createmasterfilter";
import { FieldTypes, inputFieldTypes } from "../../../utils/helper";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";
import {
  addCourse,
  editCourse,
  getCoursebyId,
} from "../../../redux/actions/course/addcourse";
import Router, { useRouter } from "next/router";
import { toast } from "react-toastify";
import { getAllExams } from "../../../redux/actions/exams/createExam";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";

const CKeditorGenerator = dynamic(() => import("../CKeditor"), {
  ssr: false,
});

export default function AddCourse() {
  const [dataValue, setDataValue] = useState(0);
  const FormSteps = ["Course Register", "CMS"];
  const [durationState, setDurationState] = useState("Year");
  const dispatch = useDispatch();
  const mainStreamData = useSelector(
    (data) => data?.mainStreamList?.mainStreamValue?.data?.data?.rows
  );
  const masterFilterData = useSelector(
    (data) => data?.allMasterFilterList?.masterfilterlist?.data?.data
  );
  const examData = useSelector(
    (data) => data?.examList?.examlist?.data?.data?.rows
  );
  const prevData = useSelector(
    (data) => data?.coursebyId?.course?.data?.data?.rows[0]
  );
  const courseCMS = [
    { title: "About", key: "about" },
    { title: "Specialization", key: "specialization" },
    { title: "Eligibility", key: "eligibility" },
    { title: "Course After Details", key: "courseAfterDetails" },
    { title: "Career", key: "career" },
    { title: "Avg. Fees", key: "avgFees" },
    { title: "Salary Trends", key: "salaryTrends" },
  ];
  const router = useRouter();
  const handleSubmit = (values) => {
    if (router.query.Id) {
      if (dataValue == 0) {
        setDataValue(1);
      }
      if (dataValue == 1) {
        values.courseDuration = values.courseDuration + ` ` + durationState;
        values.id = prevData.id;
        if (values.courseName === prevData.courseName) {
          delete values.courseName;
        }
        dispatch(editCourse(values)).then((res) => {
          if (res?.payload?.data?.success) {
            toast.success("Updated");
            router.push("/admin/courses");
          } else {
            toast.error("error");
          }
        });
      }
    } else {
      if (dataValue === 0) {
        setDataValue(1);
      }
      if (dataValue === 1) {
        values.courseDuration = values.courseDuration + ` ` + durationState;
        let data = { Course: [values] };

        dispatch(addCourse(data)).then((res) => {
          if (res?.payload?.data?.success) {
            let status = res?.payload?.data?.data?.stream[0].status;
            if (status === "duplicate") {
              toast.error("Duplicate");
              values.courseDuration = values.courseDuration.split(" ")[0];
            } else {
              toast.success("Course added");
              Router.push("/admin/courses");
            }
          } else {
            toast.error("error");
            values.courseDuration = values.courseDuration.split(" ")[0];
          }
        });
      }
    }
  };

  const validate = (values) => {
    const errors = {};
    if (dataValue === 0) {
      if (!values.mainStreamId) {
        errors["mainStreamId"] = "Required";
      }
      if (!values.courseTypeId) {
        errors["courseTypeId"] = "Required";
      }
      if (!values.courseName) {
        errors["courseName"] = "Required";
      }
      if (!values.courseCategoryId) {
        errors["courseCategoryId"] = "Required";
      }
      if (!values.eligibility) {
        errors["eligibility"] = "Required";
      }
      if (!values.courseDuration) {
        errors["courseDuration"] = "Required";
      }
      if (!values.averageFees) {
        errors["averageFees"] = "Required";
      }
      if (!values.averageSalary) {
        errors["averageSalary"] = "Required";
      }
      if (!values.entranceExamId) {
        errors["entranceExamId"] = "Required";
      }
      if (!values.courseLevelId) {
        errors["courseLevelId"] = "Required";
      }
    }

    return errors;
  };

  const MainStreamOptions = [
    { values: "1", label: "Medical" },
    { values: "2", label: "Non-medical" },
  ];

  const masterValues = "coursetype,coursecategory,courselevel,eligibility";

  const handledurationChange = (e) => {
    setDurationState(e.target.value);
  };

  const fields = [
    {
      fieldType: FieldTypes.fields,
      name: "mainStream",
      component: (input) => (
        <Select
          {...input}
          options={MainStreamOptions}
          placeholder={`Select Main Stream`}
        />
      ),
      label: "Main Stream Name",
      col: "6",
    },
    {
      fieldType: FieldTypes.fields,
      name: "courseType",
      component: (input) => (
        <Select
          {...input}
          options={MainStreamOptions}
          placeholder="Choose Course Type"
        />
      ),
      type: inputFieldTypes.text,
      label: "Course Type",
      placeholder: "Select College Type",
      col: "6",
      disabled: false,
    },
    {
      fieldType: FieldTypes.fields,
      name: "courseName",
      component: "",
      type: inputFieldTypes.text,
      label: "Course Name",
      placeholder: "Choose Course Name",
      col: "6",
      disabled: false,
    },
    {
      fieldType: FieldTypes.fields,
      name: "courseCategory",
      component: (input) => (
        <Select
          {...input}
          options={MainStreamOptions}
          placeholder="Enter Course Category"
        />
      ),
      label: "Course Category",
      placeholder: "Enter College Status",
      col: "6",
      disabled: false,
    },
    {
      fieldType: FieldTypes.fields,
      name: "eligibility",
      component: "",
      type: inputFieldTypes.text,
      label: "Course Elegibility",
      placeholder: "Enter Course Eligibility",
      col: "6",
      disabled: false,
    },
    {
      fieldType: FieldTypes.fields,
      name: "courseDuration",
      component: (input) => <Select {...input} options={MainStreamOptions} />,
      type: inputFieldTypes.date,
      label: "Course Duration (Years/Months)",
      placeholder: "Enter course duration",
      col: "6",
      disabled: false,
    },
    {
      fieldType: FieldTypes.fields,
      name: "averageFee",
      col: "6",
      type: inputFieldTypes.text,
      placeholder: "Enter Average Fee",
      label: "Average Fee",
      className: "",
      disabled: false,
    },
    {
      fieldType: FieldTypes.fields,
      name: "averageSalary",
      col: "6",
      type: inputFieldTypes.text,
      placeholder: "Enter Average Salary",
      label: "Average Salary",
      className: "",
      disabled: false,
    },
    {
      fieldType: FieldTypes.fields,
      name: "entranceExam",
      component: (input) => (
        <Select
          {...input}
          options={MainStreamOptions}
          placeholder={`Select Entrance Exam`}
        />
      ),
      type: inputFieldTypes.date,
      label: "Entrance Exa,",
      col: "6",
      disabled: false,
    },
    {
      fieldType: FieldTypes.fields,
      name: "courseType",
      component: (input) => (
        <Select
          {...input}
          options={MainStreamOptions}
          placeholder={`Select Course Type`}
        />
      ),
      type: inputFieldTypes.date,
      label: "Type Of Course",
      col: "6",
      disabled: false,
    },
    {
      fieldType: FieldTypes.actions,
      buttons: [
        {
          type: "submit",
          body: "Next",
          variant: "outline-primary",
          className: "w-25 mx-auto",
          activeCondition: false,
          size: "lg",
          col: "12",
        },
      ],
    },
  ];

  useEffect(() => {
    dispatch(getMainStream());
    dispatch(getAllMasterFilter(masterValues));
    dispatch(getAllExams());
    if (router.query.Id) {
      dispatch(getCoursebyId({ id: Number(router.query.Id) }));
      setDurationState(prevData?.courseDuration.split(" ")[1]);
    }
  }, [router.query.Id]);

  const init = (e) => {
    if (e && Object.keys(e).length > 0) {
      return e;
    }
    let initialValues = {};
    if (router.query.Id) {
      initialValues = {
        mainStreamId: prevData?.mainStreamId,
        courseTypeId: prevData?.courseTypeId,
        courseName: prevData?.courseName,
        courseCategoryId: prevData?.courseCategoryId,
        eligibility: prevData?.eligibility,
        courseDuration: prevData?.courseDuration.split(" ")[0],
        averageFees: prevData?.averageFees,
        averageSalary: prevData?.averageSalary,
        entranceExamId: prevData?.entranceExamId,
        courseLevelId: prevData?.courseLevelId,
        CMS: [
          {
            about: prevData?.CMS[0]?.about,
            specialization: prevData?.CMS[0]?.specialization,
            eligibility: prevData?.CMS[0]?.eligibility,
            courseAfterDetails: prevData?.CMS[0]?.courseAfterDetails,
            career: prevData?.CMS[0]?.career,
            avgFees: prevData?.CMS[0]?.avgFees,
            salaryTrends: prevData?.CMS[0]?.salaryTrends,
          },
        ],
      };
    } else {
      initialValues = {
        mainStreamId: null,
        courseTypeId: null,
        courseName: null,
        courseCategoryId: null,
        eligibility: null,
        courseDuration: null,
        averageFees: null,
        averageSalary: null,
        entranceExamId: null,
        courseLevelId: null,
        CMS: [
          {
            about: null,
            specialization: null,
            eligibility: null,
            courseAfterDetails: null,
            career: null,
            avgFees: null,
            salaryTrends: null,
          },
        ],
      };
    }

    return initialValues;
  };

  return (
    <>
      <div className="admin_home_tabs_row">
        <Row>
          <Col className="p-0">
            <ScrollingCarousel show={5.5} slide={4} swiping={true}>
              <ul className="nav tabs_scroll">
                {FormSteps &&
                  FormSteps.map((steps, stepsIndex) => (
                    <li className="nav-item" key={stepsIndex}>
                      <a
                        className={`nav-link admin_tabs_name ${
                          dataValue === stepsIndex && "head-active"
                        }`}
                        active="true"
                        onClick={() => setDataValue(stepsIndex)}
                      >
                        {steps}
                      </a>
                    </li>
                  ))}
              </ul>
            </ScrollingCarousel>
          </Col>
        </Row>
      </div>
      <Row className="mt-5">
        <Col>
          <Form
            onSubmit={handleSubmit}
            mutators={{
              ...arrayMutators,
            }}
            keepDirtyOnReinitialize
            validate={validate}
            initialValues={useMemo((e) => init(e), [])}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                {dataValue === 0 ? (
                  <>
                    <Row>
                      <Col md={12} lg={6}>
                        <label className="signup_form_label">Main Stream</label>
                        <Field name="mainStreamId">
                          {({ input, meta }) => (
                            <>
                              <select
                                {...input}
                                className="form-control signup_form_input"
                              >
                                {!router.query.Id && (
                                  <option value={null}>
                                    Select Mainstream
                                  </option>
                                )}
                                {mainStreamData &&
                                  mainStreamData.map((item, index) => {
                                    return (
                                      <option key={index} value={item.id}>
                                        {item?.mainStreamName}
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
                              {meta.error && meta.touched && (
                                <span className="text-danger">
                                  {meta.error}
                                </span>
                              )}
                            </>
                          )}
                        </Field>
                      </Col>
                      <Col md={12} lg={6}>
                        <label className="signup_form_label">Course Type</label>
                        <Field name="courseTypeId">
                          {({ input, meta }) => (
                            <>
                              <select
                                {...input}
                                className="form-control signup_form_input"
                              >
                                {!router?.query?.Id && (
                                  <option>Select Coursetype</option>
                                )}
                                {masterFilterData &&
                                  masterFilterData?.coursetype?.map(
                                    (item, index) => {
                                      return (
                                        <option key={index} value={item.id}>
                                          {item?.name}
                                        </option>
                                      );
                                    }
                                  )}
                              </select>
                              <div className="text-end">
                                <img
                                  className="select_down_icon"
                                  src="/images/down.png"
                                />
                              </div>
                              {meta.error && meta.touched && (
                                <span className="text-danger">
                                  {meta.error}
                                </span>
                              )}
                            </>
                          )}
                        </Field>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12} lg={6}>
                        <label className="signup_form_label">Course Name</label>
                        <Field name="courseName">
                          {({ input, meta }) => (
                            <div>
                              <input
                                {...input}
                                type="text"
                                className="form-control signup_form_input margin_bottom"
                                placeholder="Enter Course Name"
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
                        <label className="signup_form_label">
                          Course Category
                        </label>
                        <Field name="courseCategoryId">
                          {({ input, meta }) => (
                            <>
                              <select
                                {...input}
                                className="form-control signup_form_input"
                              >
                                <option value="">Select Course category</option>
                                {masterFilterData?.coursecategory &&
                                  masterFilterData?.coursecategory?.map(
                                    (item, index) => {
                                      return (
                                        <option key={index} value={item.id}>
                                          {item?.name}
                                        </option>
                                      );
                                    }
                                  )}
                              </select>
                              <div className="text-end">
                                <img
                                  className="select_down_icon"
                                  src="/images/down.png"
                                />
                              </div>
                              {meta.error && meta.touched && (
                                <span className="text-danger">
                                  {meta.error}
                                </span>
                              )}
                            </>
                          )}
                        </Field>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12} lg={6}>
                        <label className="signup_form_label">Eligibility</label>
                        <Field name="eligibility">
                          {({ input, meta }) => (
                            <>
                              <select
                                {...input}
                                className="form-control signup_form_input"
                              >
                                <option value="">Select Eligibility</option>
                                {masterFilterData?.eligibility &&
                                  masterFilterData?.eligibility?.map(
                                    (item, index) => {
                                      return (
                                        <option key={index} value={item.id}>
                                          {item?.name}
                                        </option>
                                      );
                                    }
                                  )}
                              </select>
                              <div className="text-end">
                                <img
                                  className="select_down_icon"
                                  src="/images/down.png"
                                />
                              </div>
                              {meta.error && meta.touched && (
                                <span className="text-danger">
                                  {meta.error}
                                </span>
                              )}
                            </>
                          )}
                        </Field>
                      </Col>
                      <Col md={12} lg={6}>
                        <label className="signup_form_label">
                          Course Duration (Years/Months)
                        </label>
                        <div className=" year_div">
                          <div className="year_1st">
                            <Field name="courseDuration">
                              {({ input, meta }) => (
                                <div>
                                  <input
                                    {...input}
                                    type="text"
                                    className="form-control signup_form_input input_right_border"
                                    placeholder="Enter Course Duration"
                                  />
                                  {/* <select {...input}
                                    className="form-control select-style signup_form_input input_bg">
                                  <option value="">Select Course Duration</option>
                                  {masterFilterData?.map((item) => {
                                    if (item.types === "courseduration") {
                                      return <option value={item.id}>{item.name}</option>
                                    }
                                  })}
                                  </select> */}
                                  {meta.error && meta.touched && (
                                    <span className="text-danger">
                                      {meta.error}
                                    </span>
                                  )}
                                </div>
                              )}
                            </Field>
                          </div>
                          <div className="year_2nd">
                            {/* <Field name="courseDurationType"> */}
                            {/* {({ input, meta }) => ( */}
                            <>
                              <select
                                value={durationState}
                                onChange={(e) => handledurationChange(e)}
                                className="form-control select-style signup_form_input input_bg"
                              >
                                <option>year</option>
                                <option>month</option>
                              </select>
                              <div className="text-end">
                                <img
                                  className="select_down_icon"
                                  src="/images/down.png"
                                />
                              </div>
                              {/* {meta.error && meta.touched && ( */}
                              {/* <span className="text-danger"> */}
                              {/* {meta.error} */}
                              {/* </span> */}
                              {/* )} */}
                            </>
                            {/* )} */}
                            {/* </Field> */}
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12} lg={6}>
                        <label className="signup_form_label">
                          Average Fees
                        </label>
                        <Field name="averageFees">
                          {({ input, meta }) => (
                            <div>
                              <input
                                {...input}
                                type="text"
                                className="form-control signup_form_input margin_bottom"
                                placeholder="Enter Average Fees"
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
                        <label className="signup_form_label">
                          Average Salary
                        </label>
                        <Field name="averageSalary">
                          {({ input, meta }) => (
                            <div>
                              <input
                                {...input}
                                type="text"
                                className="form-control input-style signup_form_input margin_bottom"
                                placeholder="Enter Average Salary"
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
                    </Row>
                    <Row>
                      <Col md={12} lg={6}>
                        <label className="signup_form_label">
                          Entrance Exam
                        </label>
                        <Field name="entranceExamId">
                          {({ input, meta }) => (
                            <>
                              <select
                                {...input}
                                className="form-control select-style signup_form_input"
                              >
                                <option value="">Select Exam</option>
                                {examData &&
                                  examData.map((item, index) => {
                                    return (
                                      <option key={index} value={item.id}>
                                        {item?.examName}
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
                              {meta.error && meta.touched && (
                                <span className="text-danger">
                                  {meta.error}
                                </span>
                              )}
                            </>
                          )}
                        </Field>
                      </Col>
                      <Col md={12} lg={6}>
                        <label className="signup_form_label">
                          Course Level
                        </label>
                        <Field name="courseLevelId">
                          {({ input, meta }) => (
                            <>
                              <select
                                {...input}
                                className="form-control select-style signup_form_input"
                              >
                                <option value="">Select Course level</option>
                                {masterFilterData?.courselevel &&
                                  masterFilterData?.courselevel?.map(
                                    (item, index) => {
                                      return (
                                        <option key={index} value={item.id}>
                                          {item.name}
                                        </option>
                                      );
                                    }
                                  )}
                              </select>
                              <div className="text-end">
                                <img
                                  className="select_down_icon"
                                  src="/images/down.png"
                                />
                              </div>
                              {meta.error && meta.touched && (
                                <span className="text-danger">
                                  {meta.error}
                                </span>
                              )}
                            </>
                          )}
                        </Field>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="text-center">
                        <button
                          className="admin_signup_btn admin_signup_btn_mobile"
                          onClick={handleSubmit}
                        >
                          Add Category
                        </button>
                      </Col>
                    </Row>
                  </>
                ) : null}
                {dataValue === 1 ? (
                  <>
                    <Row>
                      <Col>
                        <FieldArray name="CMS">
                          {({ fields }) => (
                            <>
                              {fields.map((name, index) => (
                                <Tabs
                                  key={index}
                                  defaultActiveKey={0}
                                  className="mb-3"
                                >
                                  {courseCMS.map((item, index) => {
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
                                        <Field name={`${name}.${item.key}`}>
                                          {({ input, meta }) => (
                                            <>
                                              <CKeditorGenerator
                                                input={input}
                                                onReady={(editor) => {}}
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
                          onClick={handleSubmit}
                        >
                          Add Category
                        </button>
                      </Col>
                    </Row>
                  </>
                ) : null}
              </form>
            )}
          />
        </Col>
      </Row>
    </>
  );
}
