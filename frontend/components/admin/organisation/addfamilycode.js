import React, { useEffect, useMemo } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Field, Form } from 'react-final-form';
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { createfamilycode, editFamilyCode, familyCodeById } from '../../../redux/actions/organisation/profession';
import { toast } from 'react-toastify';

function AddFamilycode() {
    const router = useRouter()
    const dispatch = useDispatch()
    const { Id } = router.query

    const familcodedetails = useSelector((state) => state?.sectorData?.familycodeById)

    const handleSubmit = (values) => {
        if (Id) {
            dispatch(editFamilyCode(values)).then((res) => {
                if (res?.payload?.data?.success) {
                    toast.success("Updated successfully")
                    router.push('/admin/organisation')
                } else {
                    toast.error("Error")
                }
            })
        } else {
            dispatch(createfamilycode(values)).then((res) => {
                if (res?.payload?.data?.success) {
                    toast.success("Success")
                    router.push('/admin/organisation')
                } else {
                    toast.error("Error")
                }
            })
        }
    }

    const validate = (values) => {
        const errors = {};
        const itemErray = [];
        values?.family?.map((ele) => {
            const error = {};
            if (!ele.familyName || ele.familyName === " ") {
                error["familyName"] = "*";
            }
            if (!ele.familyCode || ele.familyCode === " ") {
                error["familyCode"] = "*";
            }
            itemErray.push(error);
        });
        errors["family"] = itemErray;
        return errors;
    };

    const setInitial = (e) => {
        if (e && Object.keys(e).length > 0) {
            return e;
        }
        let initialValues = {};
        if (Id) {
            if (familcodedetails.length > 0) {
                initialValues.family = [{ id: familcodedetails[0]?.id, familyCode: familcodedetails[0]?.familyCode, familyName: familcodedetails[0]?.familyName }];
            }
        } else {
            initialValues.family = [{ familyCode: "", familyName: "" }];
        }
        return initialValues;
    };

    useEffect(() => {
        dispatch(familyCodeById(Number(Id)))
    }, [Id])

    return (
        <>
            <Container className="p-0">
                <Row className="my-3 padding_top">
                    <Col>
                        <h3 className="master_heading">Family code</h3>
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
                            initialValues={useMemo((e) => setInitial(e), [familcodedetails])}
                            render={({ handleSubmit, values }) => (
                                <form onSubmit={handleSubmit}>
                                    <Row>
                                        <FieldArray name="family">
                                            {({ fields }) => (
                                                <div>
                                                    <>
                                                        {fields.map((name, index) => (
                                                            <Row>
                                                                <div className="add_main_stream_btn_input margin_bottom">
                                                                    <Col lg={6} sm={12}>
                                                                        <Field name={`${name}.familyName`}>
                                                                            {({ input, meta }) => (
                                                                                <div className="w-100">
                                                                                    <input
                                                                                        {...input}
                                                                                        type="text"
                                                                                        className="form-control signup_form_input"
                                                                                        placeholder="Enter Family name"
                                                                                    />
                                                                                    {meta.error && meta.touched && (
                                                                                        <span className="text-danger">{meta.error}</span>
                                                                                    )}
                                                                                </div>
                                                                            )}
                                                                        </Field>
                                                                    </Col>
                                                                    <Col className="d-flex">
                                                                        <Field name={`${name}.familyCode`}>
                                                                            {({ input, meta }) => (
                                                                                <div className="w-100">
                                                                                    <input
                                                                                        {...input}
                                                                                        type="text"
                                                                                        className="form-control signup_form_input"
                                                                                        placeholder="Enter Family Code"
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
                                                                                            fields.push({ familyCode: "", familyName: "" })
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
                                                {Id ? "Update" : "Add Family code"}
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

export default AddFamilycode