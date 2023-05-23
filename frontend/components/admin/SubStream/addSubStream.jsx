import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Field, Form } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";
import { useDispatch, useSelector } from "react-redux";
import { getMainStream } from "../../../redux/actions/streams/addMainStreams";
import { CreateSubStream, editSubStream, getSubStreamById } from "../../../redux/actions/streams/addSubStream";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function AddSubStream() {
  const router = useRouter();
  const subStream = useSelector((data) => data?.subStreamById?.subStreamByIdValue?.data?.stream)
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    let updatedData = {}

    if (!router.query.Id) {
      dispatch(CreateSubStream(values)).then((res) => {
    
        if (res?.payload?.data?.success) {
          const status = res?.payload?.data?.data?.stream[0]?.status;
          if (status == "duplicate") {
            toast.error(`Sub Stream is ${status}`);
          } else {
            toast.success("Sub Stream added successfuly");
            router.push("/admin/streams");
          }
        }
      });
    } else {
      updatedData = {
        subStreamName: values?.substream[0].subStreamName,
        id: subStream?.id
      }
      dispatch(editSubStream(updatedData)).then((res) => {
        if (res?.payload?.data?.success) {
          router.push("/admin/streams")
          toast.success("Updated")
        } else {
          toast.error("error")
        }
      })
    }
  };
  const validate = (values) => {
    const errors = {};
    const itemArray = [];
    values.subStream.map((item, index) => {
      const error = {};
      if (!item.stream) {
        error["stream"] = "Sub stream is Required";
        itemArray.push(error);
      }
      errors["subStream"] = itemArray;
    });
    if (!values.mainStream || !values.mainStream === "") {
      errors["mainStream"] = "Main stream is Required";
    }
    return errors;
  };

  const mainData = useSelector(
    (data) => data?.mainStreamList?.mainStreamValue?.data?.data
  );

  const handleInit = () => {
    let initialValue = {}
    if (router.query.Id) {
      initialValue = {
        mainStreamId: subStream?.MainStream?.mainStreamName,
        substream: [{ subStreamName: subStream?.subStreamName }],
      }
    } else {
      initialValue =
      {
        mainStreamId: "",
        substream: [{ subStreamName: "" }],
      }
    }
    return initialValue
  }

  useEffect(() => {
    dispatch(getMainStream());
    if (router.query.Id) {
      dispatch(getSubStreamById(router.query.Id))
    }
  }, [router.query.Id]);
  
  return (
    <>
      <Row className="my-3 padding_top">
        <Col>
          <h3 className="fw-bold">Sub Stream Name</h3>
          <hr></hr>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form
            onSubmit={handleSubmit}
            mutators={{
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
                            className="form-control signup_form_input"
                            disabled={router.query.Id ? true : false}
                          >
                            {router.query.Id ?
                              <option>{subStream?.MainStream?.mainStreamName}</option>
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

                <div>
                  <Col lg={12}>
                    <label className="signup_form_label">Sub Stream Name</label>
                  </Col>
                  <FieldArray name="substream">
                    {({ fields }) => (
                      <>
                        {fields.map((name, index) => (
                          <Row>
                            <Col lg={12} md={12}>
                              <div className="add_main_stream_btn_input margin_bottom">
                                <Field name={`${name}.subStreamName`}>
                                  {({ input, meta }) => (
                                    <div className="w-100">
                                      <input
                                        {...input}
                                        type="text"
                                        className="form-control signup_form_input"
                                        placeholder="Enter sub Stream"
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
                                      onClick={() => fields.push({ stream: "" })}
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
        </Col>
      </Row>
    </>
  );
}
