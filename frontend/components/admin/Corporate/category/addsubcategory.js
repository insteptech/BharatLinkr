import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Field, Form } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";
import { useRouter } from "next/router";
import { getMainCategory } from "../../../../redux/actions/corporate/addmaincategory";
import { useDispatch, useSelector } from "react-redux";
import { AddSubCategory } from "../../../../redux/actions/corporate/addsubcategory";

function Addsubcategory() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(
      AddSubCategory({
        ...values,
        mainCategoryId: Number(values.mainCategoryId),
      })
    ).then((res) => {
      if (res?.payload?.status === 200) {
        //     const status = res?.payload?.data?.data?.stream[0]?.status;
        //     if (status == "duplicate") {
        //       toast.error(`Sub Stream is ${status}`);
        //     } else {
        //       toast.success("Sub Stream added successfuly");
        router.push("/admin/corporate/addcorporate");
      }
    })
  }

  const handleInit = () => {
    let initialValue = {};
    if (router.query.Id) {
      initialValue = {
        mainStreamId: subStream?.MainStream?.mainStreamName,
        substream: [{ subStreamName: subStream?.subStreamName }],
      };
    } else {
      initialValue = {
        mainStreamId: "",
        substream: [{ subStreamName: "" }],
      };
    }
    console.log(initialValue, "hhhhhhhhhhhh");
    return initialValue;
  };

  const setInitial = () => {
    let initialValues = {};
    // if (Id) {
    initialValues.mainCategoryId = '';
    // } else {
    initialValues.subcategory = [{}];
    // }
    return initialValues;
  };

  useEffect(() => {
    dispatch(getMainCategory())
  }, [])

  const validate = (values) => {
    let errors = {}
    let itemArray = []
    if (!values?.mainCategoryId) {
      errors['mainCategoryId'] = "*"
    }
    values?.subcategory?.map((item) => {
      let error = {}
      if (!item?.subCategory) {
        error['subCategory'] = "*"
      }
      itemArray.push(error)
    })
    errors['subcategory'] = itemArray
    return errors
  }

  const maincategoryData = useSelector(
    (state) => state?.corporateCategory?.addmaincategory?.rows
  )

  return (
    <div>
      <Container className="p-0">
        <Row className="my-3 padding_top">
          <Col>
            <h3 className="master_heading">Sub Category</h3>
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
              initialValues={setInitial()}
              render={({ handleSubmit, values }) => (
                <form onSubmit={handleSubmit}>
                  <Row>
                    <Col lg={12}>
                      <label className="signup_form_label">Main Category</label>
                      <Field name="mainCategoryId">
                        {({ input, meta }) => (
                          <>
                            <select
                              {...input}
                              className="form-control signup_form_input"
                            //   disabled={router.query.Id ? true : false}
                            >
                              {router.query.Id ? (
                                <option>
                                  {/* {subStream?.MainStream?.mainStreamName} */}
                                </option>
                              ) : (
                                <option>Select main category</option>
                              )}
                              {maincategoryData &&
                                maincategoryData?.map((item) => (
                                  <option key={item.id} value={item.id}>
                                    {item?.mainCategory}
                                  </option>
                                ))}
                            </select>

                            <div className="text-end">
                              <img
                                className="select_down_icon"
                                src="/images/down.png"
                              />
                            </div>
                            {meta.error && meta.touched && (
                              <span className="text-danger required_msg">{meta.error}</span>
                            )}
                          </>
                        )}
                      </Field>

                    </Col>
                  </Row>

                  <div>
                    <Col lg={12}>
                      <label className="signup_form_label">Sub Category</label>
                    </Col>
                    <Row>
                      <FieldArray name="subcategory">
                        {({ fields }) => (
                          <div>
                            <>
                              {fields.map((name, index) => (
                                <Row>
                                  <Col lg={12} md={12}>
                                    <div className="add_main_stream_btn_input margin_bottom">
                                      <Field name={`${name}.subCategory`}>
                                        {({ input, meta }) => (
                                          <div className="w-100">
                                            <input
                                              {...input}
                                              type="text"
                                              className="form-control signup_form_input"
                                              placeholder="Enter Sub Category"
                                            />
                                            {meta.error && meta.touched && (
                                              <span className="text-danger required_msg">{meta.error}</span>
                                            )}
                                          </div>
                                        )}
                                      </Field>

                                      <div className="d-flex mt-2 ">
                                        {!router.query.Id && (
                                          <div
                                            type="button"
                                            className="add_remove_btn"
                                            onClick={() =>
                                              fields.push({ mainCategory: "" })
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
                      <Col className="text-center">
                        <button
                          className="admin_signup_btn  mt-3"
                          type="submit"
                        >
                          {router.query.Id ? "Update" : "Add"}
                        </button>
                      </Col>
                    </Row>
                  </div>
                </form>
              )}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Addsubcategory;
