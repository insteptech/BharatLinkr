import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Field, Form } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
import { useDispatch, useSelector } from 'react-redux'
import arrayMutators from "final-form-arrays";
import { createprofessioncode, editProfessionCode, familycodeList, professionCodeById } from '../../../redux/actions/organisation/profession'
import { toast } from 'react-toastify'

function AddProfessioncode() {
    const router = useRouter()
    const dispatch = useDispatch()
    const [code, setCode] = useState("")
    const { Id } = router.query

    const professionCodeDetails = useSelector((state) => state?.sectorData?.professionCodeById)
    const familycodelist = useSelector((state) => state?.sectorData?.familyCodelist)

    const handleSubmit = (values) => {
        if (Id) {
            let data = { profession: [] }
            data.profession = values?.profession?.map((item) => {
                return (
                    {
                        ...item,
                        familyId: Number(values?.family)
                    }
                )
            })
            dispatch(editProfessionCode(data)).then((res) => {
                if (res?.payload?.data?.success) {
                    toast.success('Successful')
                    router.push('/admin/organisation')
                } else {
                    toast.error('Error')
                }
            })
        } else {
            let data = { profession: [] }
            data.profession = values?.profession?.map((item) => {
                return (
                    {
                        ...item,
                        familyId: Number(values?.family)
                    }
                )
            })
            dispatch(createprofessioncode(data)).then((res) => {
                if (res?.payload?.data?.success) {
                    toast.success('Successful')
                    router.push('/admin/organisation')
                } else {
                    toast.error('Error')
                }
            })
        }
    }

    const validate = (values) => {
        const errors = {};
        const itemErray = [];
        if (!values.family) {
            errors["family"] = "*"
        }
        values?.profession?.map((ele) => {
            const error = {};
            if (!ele.professionName || ele.professionName === " ") {
                error["professionName"] = "*";
            }
            if (!ele.professionCode || ele.professionCode === " ") {
                error["professionCode"] = "*";
            }
            itemErray.push(error);
        });
        errors["profession"] = itemErray;
        console.log(errors, 'oooooooooo')
        return errors;
    };

    const setInitial = (e) => {
        if (e && Object.keys(e).length > 0) {
            return e;
        }
        let initialValues = {};
        if (Id) {
            if (professionCodeDetails?.length > 0) {
                initialValues.family = professionCodeDetails[0]?.familyId
                initialValues.profession = [{ professionCode: professionCodeDetails[0]?.professionCode, professionName: professionCodeDetails[0]?.professionName, id: professionCodeDetails[0]?.id }];
            }
        } else {
            initialValues.family = "";
            initialValues.profession = [{ professionCode: "", professionName: "" }];
        }
        return initialValues;
    };

    useEffect(() => {
        dispatch(familycodeList())
        if (Id) {
            dispatch(professionCodeById(Number(Id)))
        }
    }, [Id])
    return (
        <>
            <Container className="p-0">
                <Row className="my-3 padding_top">
                    <Col>
                        <h3 className="master_heading">Profession code</h3>
                        <hr></hr>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form
                            onSubmit={handleSubmit}
                            mutators={{
                                // potentially other mutators could be merged here
                                ...arrayMutators,
                            }}
                            validate={validate}
                            initialValues={useMemo((e) => setInitial(e), [professionCodeDetails])}
                            render={({ handleSubmit, values }) => (
                                <form onSubmit={handleSubmit}>
                                    <Row>
                                        <Col md={12}>
                                            <label className="signup_form_label">
                                                Family Details
                                            </label>
                                        </Col>
                                        <Col lg={6} sm={12}>
                                            <Field name={`family`}>
                                                {({ input, meta }) => (
                                                    <div className="w-100">
                                                        <select
                                                            {...input}
                                                            type="text"
                                                            className="form-control signup_form_input"
                                                        >
                                                            <option value="">Select Family</option>
                                                            {familycodelist?.rows?.length > 0 && (
                                                                familycodelist?.rows?.map((item, index) => {
                                                                    return (<option key={index} value={item?.id}>{item?.familyName}</option>)
                                                                })
                                                            )}
                                                        </select>
                                                        {meta.error && meta.touched && (
                                                            <span className="text-danger">{meta.error}</span>
                                                        )}
                                                    </div>
                                                )}
                                            </Field>
                                        </Col>
                                        <Col lg={6} sm={12}>
                                            {/* <div className="w-100">
                                                <input
                                                    type="number"
                                                    className="form-control signup_form_input"
                                                    placeholder="family code"
                                                    value={() => {
                                                        familycodelist?.rows?.find((item) => { console.log(item?.id === values?.family?.familyId) })
                                                    }}
                                                />
                                            </div> */}
                                        </Col>
                                        <FieldArray name="profession">
                                            {({ fields }) => (
                                                <div>
                                                    <Col md={12}>
                                                        <label className="signup_form_label">
                                                            Profession Details
                                                        </label>
                                                    </Col>
                                                    <>
                                                        {fields.map((name, index) => (
                                                            <Row>
                                                                <div className="add_main_stream_btn_input margin_bottom">
                                                                    <Col lg={6} sm={12}>
                                                                        <Field name={`${name}.professionName`}>
                                                                            {({ input, meta }) => (
                                                                                <div className="w-100">
                                                                                    <input
                                                                                        {...input}
                                                                                        type="text"
                                                                                        className="form-control signup_form_input"
                                                                                        placeholder="Enter Profession name"
                                                                                    />
                                                                                    {meta.error && meta.touched && (
                                                                                        <span className="text-danger">{meta.error}</span>
                                                                                    )}
                                                                                </div>
                                                                            )}
                                                                        </Field>
                                                                    </Col>
                                                                    <Col className="d-flex">
                                                                        <Field name={`${name}.professionCode`}>
                                                                            {({ input, meta }) => (
                                                                                <div className="w-100">
                                                                                    <input
                                                                                        {...input}
                                                                                        type="number"
                                                                                        className="form-control signup_form_input"
                                                                                        placeholder="Enter Profession Code"
                                                                                    />
                                                                                    {meta.error && meta.touched && (
                                                                                        <span className="text-danger">{meta.error}</span>
                                                                                    )}
                                                                                </div>
                                                                            )}
                                                                        </Field>
                                                                        {!Id &&
                                                                            <div className="d-flex mt-2 ">
                                                                                {!Id && (
                                                                                    <div
                                                                                        type="button"
                                                                                        className="add_remove_btn"
                                                                                        onClick={() =>
                                                                                            fields.push({ professionCode: "", professionName: "" })
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
                                                                                            src="/images/minus.png"
                                                                                        />
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                            </div>
                                                                        }
                                                                    </Col>
                                                                </div>
                                                            </Row>
                                                        ))}
                                                    </>
                                                </div>
                                            )}
                                        </FieldArray>
                                    </Row>
                                    <Row>
                                        <Col className="text-center">
                                            <button className="admin_signup_btn  mt-3" type="submit">
                                                {Id ? "Update" : "Add Profession code"}
                                            </button>
                                        </Col>
                                    </Row>
                                </form>
                            )}
                        />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default AddProfessioncode