import React, { useEffect, useMemo, useState } from 'react'
import { Col, Row, Tab, Tabs } from 'react-bootstrap';
import { Field, Form } from 'react-final-form';
import arrayMutators from "final-form-arrays";
import { FieldArray } from 'react-final-form-arrays';
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from 'react-redux';
import { addProfession, familycodeList, professioncodeList } from '../../../redux/actions/organisation/profession';
import { getCourse } from '../../../redux/actions/course/addcourse';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
const CKeditorGenerator = dynamic(() => import("../CKeditor"), {
    ssr: false,
});
function Addprofession() {
    const dispatch = useDispatch()
    const router = useRouter()
    const { Id } = router.query
    const [dataValue, setDataValue] = useState(0);
    const [type, setType] = useState('Family')
    const FormSteps = ["Register", "CMS"];

    const familyList = useSelector((state) => state?.sectorData?.familyCodelist)
    const professionList = useSelector((state) => state?.sectorData?.professionCodeList)
    const courseList = useSelector((state) => state?.courseList?.courselist?.data)

    const handleSubmit = (values) => {
        if (Id) {

        } else {
            if (dataValue === 0) {
                setDataValue(1)
            }else {
                
                let data = { professionRegister: [] }
                data.professionRegister[0] = {
                ...values
            }
            if (type === 'Family') {
                delete data.professionRegister[0].professionId
            } else {
                delete data.professionRegister[0].familyId
            }
            data.professionRegister[0].cms = values?.cms[0]
            dispatch(addProfession(data)).then((res) => {
                if (res?.payload?.data?.success) {
                    toast.success('Success')
                    router.push('/admin/organisation')
                } else {
                    toast.error('Error')
                }
            })
        }
        }
    };

    const summary = [
        { title: "At a Glance", key: "glance" },
        { title: "Types", key: "types" },
        { title: "Tasks", key: "tasks" },
        { title: "Education", key: "education" },
        { title: "Experience", key: "experience" },
        { title: "Knowledge", key: "knowledge" },
        { title: "Technical Skills", key: "technicalSkills" },
        { title: "Future Prospects", key: "futureProspects" },
        { title: "Certifications", key: "certificates" },
    ];

    const init = (e) => {
        if (e && Object.keys(e).length > 0) {
            return e;
        };
        let initialValues = {};
        initialValues = {
            familyId: '',
            professionId: '',
            alsoCalled: '',
            prepLevel: '',
            highDemandOfProfession: '',
            courseId: '',
            cms: [{
                glance: '',
                types: '',
                tasks: '',
                education: '',
                experience: '',
                knowledge: '',
                technicalSkills: '',
                futureProspects: '',
                certificates: ''
            }]
        }
        // certificates,futureProspects,technicalSkills,knowledge,experience,education,tasks,types,glance
        return initialValues
    };

    const validate = (values) => {
        let errors = {}
        if (!values.courseId) {
            errors["courseId"] = "*"
        }
        if (!values.highDemandOfProfession) {
            errors["highDemandOfProfession"] = "*"
        }
        if (!values.prepLevel) {
            errors["prepLevel"] = "*"
        }
        if (!values.alsoCalled) {
            errors["alsoCalled"] = "*"
        }
        if (!values.alsoCalled) {
            errors["alsoCalled"] = "*"
        }
        if (type === "Family") {
            if (!values.familyId) {
                errors["familyId"] = "*"
            }
        } else {
            if (!values.professionId) {
                errors["professionId"] = "*"
            }
        }
        return errors;
    }

    useEffect(() => {
        dispatch(familycodeList())
        dispatch(professioncodeList())
        dispatch(getCourse())
    }, [])

    return (
        <>
            <div className="admin_home_tabs_row">
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
                        validate={validate}
                        initialValues={useMemo((e) => (init(e)), [])}
                        render={({ handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                                {dataValue === 0 ?
                                    <>
                                        <Row>
                                            <Col md={12} lg={6}>
                                                <>
                                                    <div className="d-flex">
                                                        <label className="signup_form_label">
                                                            Choose Family/Profession
                                                        </label>
                                                    </div>
                                                    <select
                                                        className="form-control select-style signup_form_input "
                                                        onChange={(e) => setType(e.target.value)}
                                                        value={type}
                                                    >
                                                        <option>Family</option>
                                                        <option>Profession</option>
                                                    </select>
                                                    <div className="text-end">
                                                        <img
                                                            className="select_down_icon"
                                                            src="/images/down.png"
                                                        />
                                                    </div>
                                                </>
                                            </Col>
                                            {type === 'Family' ?
                                                <Col md={12} lg={6}>
                                                    <Field name={`familyId`}>
                                                        {({ input, meta }) => (
                                                            <>
                                                                <div className="d-flex">
                                                                    <label className="signup_form_label">
                                                                        Family
                                                                    </label>
                                                                    {meta.error && meta.touched && (
                                                                        <span className="text-danger required_msg">
                                                                            {meta.error}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <select
                                                                    {...input}
                                                                    className="form-control select-style signup_form_input margin_bottom"
                                                                >
                                                                    <option value="">Select family</option>
                                                                    {familyList?.rows?.length > 0 && familyList?.rows?.map((item, index) => {
                                                                        return (<option key={index} value={item?.id}>{item?.familyName}</option>)
                                                                    })}
                                                                </select>
                                                            </>
                                                        )}
                                                    </Field>
                                                </Col>
                                                :
                                                <Col md={12} lg={6}>
                                                    <Field name={`professionId`}>
                                                        {({ input, meta }) => (
                                                            <>
                                                                <div className="d-flex">
                                                                    <label className="signup_form_label">
                                                                        Profession
                                                                    </label>
                                                                    {meta.error && meta.touched && (
                                                                        <span className="text-danger required_msg">
                                                                            {meta.error}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <select
                                                                    {...input}
                                                                    className="form-control select-style signup_form_input margin_bottom"
                                                                >
                                                                    <option value="">Select Profession</option>
                                                                    {professionList?.rows?.length > 0 && professionList?.rows?.map((item, index) => {
                                                                        return (<option key={index} value={item?.id}>{item?.professionName}</option>)
                                                                    })}
                                                                </select>
                                                            </>
                                                        )}
                                                    </Field>
                                                </Col>
                                            }
                                            <Col md={12} lg={6}>
                                                <Field name={`alsoCalled`}>
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
                                            <Col md={12} lg={6}>
                                                <Field name={`prepLevel`}>
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
                                                <Field name={`highDemandOfProfession`}>
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
                                                <Field name={`courseId`}>
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
                                                                {courseList?.rows?.length > 0 && courseList?.rows?.map((item, index) => {
                                                                    return (<option key={index} value={item?.id}>{item?.courseName}</option>)
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
                                        </Row>
                                        <Row>
                                            <Col className="text-center">
                                                <button
                                                    className="admin_signup_btn admin_signup_btn_mobile"
                                                    type="submit"
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
                                                <FieldArray name="cms">
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