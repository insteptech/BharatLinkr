import { useRouter } from 'next/router'
import React, { useEffect, useMemo } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Field, Form } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
import arrayMutators from "final-form-arrays";
import { useDispatch, useSelector } from 'react-redux'
import { addcountry, editcountry, getCountrybyId } from '../../../redux/actions/location/countryList'
import { toast } from 'react-toastify'

function AddCountry() {
    const router = useRouter()
    const dispatch = useDispatch()
    const { Id } = router.query
    const countrydetails = useSelector((data) => data?.countrylist?.country?.data?.result)
    const handleSubmit = (values) => {
        if (!Id) {
            dispatch(addcountry(values)).then((res) => {
                if (res?.payload?.data?.success) {
                    router.push('/admin/location')
                    toast.success('Country added successfully')
                } else {
                    toast.error("Error")
                }
            })
        } else {
            dispatch(editcountry(values)).then((res) => {
                console.log(res)
                if (res?.payload?.data?.success) {
                    router.push('/admin/location')
                    toast.success('Country updated successfully',{autoClose:1000})
                } else {
                    toast.error("Error")
                }
            })
        }
    }

    useEffect(() => {
        if (Id) {
            dispatch(getCountrybyId(Number(Id)))
        }
    }, [Id])

    const initialdata = () => {
        let initialValues = {}
        if (Id) {
            initialValues = {
                countryInputs: [{
                    id: Id,
                    name: countrydetails?.name
                }]
            }
        } else {
            initialValues = {
                countryInputs: [{
                    name: null
                }]
            }
        }
        return initialValues
    }
    return (
        <div>
            <Form
                onSubmit={handleSubmit}
                mutators={{
                    ...arrayMutators,
                }}
                initialValues={useMemo((e) => initialdata(e))}
                render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <label className="signup_form_label">Country Name</label>
                        <div>
                            <FieldArray name="countryInputs">
                                {({ fields }) => (
                                    <>
                                        {fields.map((name, index) => (
                                            <Row>
                                                <Col lg={12} md={12}>
                                                    <div className="add_main_stream_btn_input margin_bottom">
                                                        <Field name={`${name}.name`}>
                                                            {({ input, meta }) => (
                                                                <div className="w-100">
                                                                    <input
                                                                        {...input}
                                                                        type="text"
                                                                        className="form-control signup_form_input"
                                                                        placeholder="Enter Country name"
                                                                    />
                                                                    {meta.error && meta.touched && (
                                                                        <span>{meta.error}</span>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </Field>
                                                        <div className="d-flex mt-2 ">
                                                            {!router.query.Id &&
                                                                <div
                                                                    type="button"
                                                                    className="add_remove_btn"
                                                                    onClick={() => fields.push({ name: "" })}
                                                                >
                                                                    <img
                                                                        className="add_remove_icon"
                                                                        src="/images/plus.png"
                                                                    />
                                                                </div>
                                                            }
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
                                                    </div>
                                                </Col>
                                            </Row>
                                        ))}
                                    </>
                                )}
                            </FieldArray>
                        </div>
                        <Row>
                            <Col className="text-center">
                                <button className="admin_signup_btn  mt-3" type="submit">
                                    {router.query.Id ?
                                        'Update'
                                        :
                                        'submit'
                                    }
                                </button>
                            </Col>
                        </Row>
                    </form>
                )}
            />
        </div>
    )
}

export default AddCountry