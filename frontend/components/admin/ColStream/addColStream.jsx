import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  buttonTypes,
  FieldTypes,
  inputFieldTypes,
} from "../../../utils/helper";
import FormGenerator from "../../common-components/Form/FormGenerator";
import Select from "react-select";
import { FieldArray } from "react-final-form-arrays";
import { Field, Form } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { getMainStream } from "../../../redux/actions/streams/addMainStreams";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getSubStream } from "../../../redux/actions/streams/addSubStream";
import { CreateColStream, editColStream, getColStreamById } from "../../../redux/actions/streams/addColStream";
import { toast } from "react-toastify";

export default function AddColStream() {
  const router = useRouter();
  const dispatch = useDispatch();

  const mainData = useSelector(
    (data) => data?.mainStreamList?.mainStreamValue?.data?.data
  );
  const subData = useSelector(
    (data) => data?.subStreamList?.subStreamValue?.data?.data
  );
  const colStream = useSelector(
    (data) => data?.colStreamById?.colStreamByIdValue?.data?.stream
  )
  // console.log(subData, "mainDtatatat");

  useEffect(() => {
    dispatch(getMainStream());
    dispatch(getSubStream());
    if (router?.query.Id) {
      dispatch(getColStreamById(router.query.Id));
    }
  }, [router.query.Id]);

  const handleSubmit = (values) => {
    let updatedValue = {}
    // console.log(values, "mainDtatatat");
    if (!router.query.Id) {
      dispatch(CreateColStream(values)).then((res) => {
        console.log(res, "mainDtatatat");
        if (res?.payload?.data?.success) {
          const status = res?.payload?.data?.data?.stream[0]?.status;
          if (status == "duplicate") {
            toast.error(`Col Stream is ${status}`);
          } else {
            toast.success("Col Stream added successfuly");
            router.push("/admin/streams");
          }
        }
      });
    } else {
      updatedValue = {
        colStreamName: values?.colstream[0]?.colStreamName,
        id: colStream?.id
      }
      dispatch(editColStream(updatedValue)).then((res) => {
        console.log(res)
        if (res?.payload?.data?.success) {
          toast.success("Updated")
          router.push("/admin/streams")
        } else {
          toast.error("error")
        }
      })
    }
  };

  const handleInit = () => {
    let initialValue = {}
    if (router?.query?.Id) {
      initialValue = {
        mainStreamId: colStream?.MainStream?.mainStreamName,
        subStreamId: colStream?.SubStream?.subStreamName,
        colstream: [{ colStreamName: colStream?.colStreamName }]
      }
    } else {
      initialValue = {
        mainStreamId: '',
        subStreamId: '',
        colstream: [{ colStreamName: '' }]
      }
    }
    console.log(initialValue)
    return initialValue
  }

  const onSubmit = (values) => {
    console.log("colStream", values);
  };
  const validate = (values) => {
    const errors = {};
    const itemArray = [];
    values.colstream.map((item, index) => {
      const error = {};
      if (!item.stream) {
        error["stream"] = "Col Stream is Required";
        itemArray.push(error);
      }
      errors["colStream"] = itemArray;
    });
    if (!values.mainStream) {
      errors["mainStream"] = "Main Stream is Required";
    }
    if (!values.subStream) {
      errors["subStream"] = "Sub Stream is Required";
    }
    console.log(errors, values, "kllllllllllll");
    return errors;
  };
  const initialValues = {
    mainStream: "",
    subStream: "",
    colStream: [{ name: "" }],
  };

  return (
    <>
      <Row className="my-3 padding_top">
        <Col>
          <h3 className="fw-bold">Col Stream Name</h3>
          <hr />
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
            // validate={validate}
            initialValues={() => handleInit()}
            render={({ handleSubmit, values }) => (
              <form onSubmit={handleSubmit}>
                <Row>
                  <Col lg={12}>
                    <label className="signup_form_label">
                      Main Stream Name
                    </label>
                    <Field name="mainStreamId">
                      {({ input, meta }) => (
                        <>
                          <select
                            {...input}
                            className="form-control signup_form_input "
                            disabled={router.query.Id ? true : false}
                          >
                            {router.query.Id ?
                              <option>{colStream?.MainStream?.mainStreamName}</option>
                              :
                              <option>Select main stream</option>
                            }
                            {mainData &&
                              mainData?.rows?.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.mainStreamName}{" "}
                                </option>
                              ))}
                          </select>
                          {meta.error && meta.touched && (
                            <span>{meta.error}</span>
                          )}
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
                </Row>
                <Row>
                  <Col lg={12}>
                    <label className="signup_form_label">Sub Stream Name</label>
                    <Field
                      name="subStreamId"
                      component="select"
                      placeholder="Choose Exam Accepted"
                    >
                      {({ input, meta }) => (
                        <>
                          <select
                            {...input}
                            className="form-control signup_form_input"
                            disabled={router.query.Id ? true : false}
                          >
                            {router.query.Id ?
                              <option>{colStream?.SubStream?.subStreamName}</option>
                              :
                              <option>Select sub stream</option>
                            }
                            {subData &&
                              subData?.rows?.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.subStreamName}{" "}
                                </option>
                              ))}
                          </select>
                          {meta.error && meta.touched && (
                            <span>{meta.error}</span>
                          )}
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
                </Row>

                <div>
                  <Col lg={12}>
                    <label className="signup_form_label">Col Stream Name</label>
                  </Col>
                  <FieldArray name="colstream">
                    {({ fields }) => (
                      <>
                        {fields.map((name, index) => (
                          <Row>
                            <Col lg={12} md={12}>
                              <div className="d-flex margin_bottom">
                                <Field name={`${name}.colStreamName`}>
                                  {({ input, meta }) => (
                                    <div className="w-100">
                                      <input
                                        {...input}
                                        type="text"
                                        className="form-control signup_form_input"
                                        placeholder="Enter Col Stream"
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
                                      onClick={() =>
                                        fields.push({ colStreamName: "" })
                                      }
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
                      Add Col Stream
                    </button>
                  </Col>
                </Row>
              </form>
            )}
          />
        </Col>
      </Row>
    </>
  );
}
