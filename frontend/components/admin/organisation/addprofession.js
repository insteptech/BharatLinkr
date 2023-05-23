import React, { useMemo, useState } from 'react'
import { Col, Row, Tab, Tabs } from 'react-bootstrap';
import { Field, Form } from 'react-final-form';
import arrayMutators from "final-form-arrays";
import { FieldArray } from 'react-final-form-arrays';
import dynamic from "next/dynamic";
const CKeditorGenerator = dynamic(() => import("../CKeditor"), {
    ssr: false,
  });
function Addprofession() {
    const [dataValue, setDataValue] = useState(0);
    const FormSteps = ["Register", "CMS"];
    const handleSubmit = (values) => {
        let data = {}
        data.profession = [{
            family: values.family,
            alsocalled: values.alsocalled,
            preplevel: values.preplevel,
            demand: values.demand,
            courses: values.courses,
            companies: values.companies,
            cerifications: values.cerifications
        }]
        data.cms = values.summary
        console.log(data)
    }
    const summary = [
        { title: "At a Glance", key: "glance" },
        { title: "Types", key: "types" },
        { title: "Tasks", key: "tasks" },
        { title: "Education", key: "education" },
        { title: "Experience", key: "experience" },
        { title: "Knowledge", key: "knowledge" },
        { title: "Technical Skills", key: "technicalskills" },
        { title: "Future Prospects", key: "futureprospects" },
    ];
    const init = (e) => {
        if (e && Object.keys(e).length > 0) {
            return e;
        };
        let initialValues = {};
        initialValues = {
            family: '',
            alsocalled: '',
            preplevel: '',
            demand: '',
            courses: '',
            companies: '',
            cerifications: '',
            summary: [{
                glance: '',
                types: '',
                tasks: '',
                education: '',
                experience: '',
                knowledge: '',
                technicalskills: '',
                futureprospects: '',
            }]
        }
        return initialValues
    }
    return (
        <>
            <div className="admin_home_tabs_row">
                {/* <button onClick={() => console.log(prevData)}>ffff</button> */}
                <Row>
                    <ul className="nav tabs_scroll">
                        {FormSteps &&
                            FormSteps.map((steps, stepsIndex) => (
                                <li className="nav-item" key={stepsIndex}>
                                    <a
                                        className={`nav-link admin_tabs_name ${dataValue === stepsIndex && "head-active"
                                            }`}
                                        active='true'
                                        onClick={() => setDataValue(stepsIndex)}
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
                    <Form
                        onSubmit={handleSubmit}
                        mutators={{
                            ...arrayMutators
                        }}
                        keepDirtyOnReinitialize
                        // validate={validate}
                        initialValues={useMemo((e) => (init(e)), [])}
                        render={({ handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                                {dataValue === 0 ?
                                    <>
                                        <Row>
                                            <Col md={12} lg={6}>
                                                <Field name={`family`}>
                                                    {({ input, meta }) => (
                                                        <>
                                                            <div className="d-flex">
                                                                <label className="signup_form_label">
                                                                    Choose Family/Profession
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
                                                                <option value="">Choose Family/Profession</option>
                                                                <option>Organisation Category 1</option>
                                                                <option>Organisation Category 2</option>
                                                                <option>Organisation Category 3</option>
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
                                                <Field name={`alsocalled`}>
                                                    {({ input, meta }) => (
                                                        <>
                                                            <div className="d-flex">
                                                                <label className="signup_form_label">
                                                                    Also Called
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
                                                                placeholder="Please enter other names of this profession"
                                                            />
                                                        </>
                                                    )}
                                                </Field>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={12} lg={6}>
                                                <Field name={`preplevel`}>
                                                    {({ input, meta }) => (
                                                        <>
                                                            <div className="d-flex">
                                                                <label className="signup_form_label">
                                                                    Preparation Level
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
                                                                <option value="">Choose preparation level</option>
                                                                <option>1</option>
                                                                <option>2</option>
                                                                <option>3</option>
                                                                <option>4</option>
                                                                <option>5</option>
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
                                                <Field name={`demand`}>
                                                    {({ input, meta }) => (
                                                        <>
                                                            <div className="d-flex">
                                                                <label className="signup_form_label">
                                                                    High demand of Profession
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
                                                                <option value="">Yes/No</option>
                                                                <option>Yes</option>
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
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={12} lg={6}>
                                                <Field name={`courses`}>
                                                    {({ input, meta }) => (
                                                        <>
                                                            <div className="d-flex">
                                                                <label className="signup_form_label">
                                                                    Courses
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
                                                                <option value="">Please Select Courses</option>
                                                                <option>Organisation Category 1</option>
                                                                <option>Organisation Category 2</option>
                                                                <option>Organisation Category 3</option>
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
                                                <Field name={`companies`}>
                                                    {({ input, meta }) => (
                                                        <>
                                                            <div className="d-flex">
                                                                <label className="signup_form_label">
                                                                    Companies
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
                                                                <option value="">Not Selected</option>
                                                                <option>Organisation Category 1</option>
                                                                <option>Organisation Category 2</option>
                                                                <option>Organisation Category 3</option>
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
                                                <Field name={`cerifications`}>
                                                    {({ input, meta }) => (
                                                        <>
                                                            <div className="d-flex">
                                                                <label className="signup_form_label">
                                                                    Certificates/Accredations
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
                                                                <option value="">Not Selected</option>
                                                                <option>Organisation Category 1</option>
                                                                <option>Organisation Category 2</option>
                                                                <option>Organisation Category 3</option>
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
                                            <Col className="text-center">
                                                <button
                                                    className="admin_signup_btn admin_signup_btn_mobile"
                                                    onClick={() => setDataValue(1)}
                                                >
                                                    Add Category
                                                </button>
                                            </Col>
                                        </Row>
                                    </>
                                    :
                                    null
                                }
                                {dataValue === 1 ?
                                    <>
                                        <Row>
                                            <Col>
                                                <h4 className="mt-4">Summary</h4>
                                                <FieldArray name="summary">
                                                    {({ fields }) => (
                                                        <>
                                                            {fields.map((name, index) => (
                                                                <Tabs
                                                                    key={index}
                                                                    defaultActiveKey={0}
                                                                    className="mb-3"
                                                                >
                                                                    {summary.map((item, index) => {
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
                                                                                                onReady={(editor) => {
                                                                                                    // console.log(editor, 'editor')
                                                                                                }}
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
                                                // onClick={() => setDataValue(1)}
                                                >
                                                    Submit
                                                </button>
                                            </Col>
                                        </Row>
                                    </>
                                    :
                                    null
                                }
                            </form>
                        )}
                    />
                </Col>
            </Row>
        </>
    )
}

export default Addprofession