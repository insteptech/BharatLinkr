import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Field, Form } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";
import { useRouter } from "next/router";
import { AddMainCategory } from "../../../../redux/actions/corporate/addmaincategory";
import { useDispatch } from "react-redux";

function Addmaincategory() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    console.log(values, "values");

    dispatch(AddMainCategory(values));
    //.then((res) => {
    // if (res?.payload?.data?.success) {
    //   const status = res?.payload?.data?.data?.stream[0]?.status;
    //   if (status == "duplicate") {
    //     toast.error(`Main Stream is ${status}`);
    //   } else {
    //     toast.success("Main Stream added successfuly");
    //     router.push("/admin/streams");
    //   }
    //  })
  };

  const setInitial = () => {
    let initialValues = {};
    // if (Id) {
    //   initialValues.mainCategory = [{ mainCategory: mainCategory }];
    // } else {
    initialValues.mainCategory = [{ mainCategory: "" }];
    // }

    console.log(initialValues, "initialValues");
    return initialValues;
  };
  return (
    <div>
      <Container className="p-0">
        {/* <button onClick={() => console.log(mainStream)}>hhh</button> */}
        <Row className="my-3 padding_top">
          <Col>
            <h3 className="master_heading">Main Category</h3>
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
              // validate={validate}
              initialValues={setInitial()}
              render={({ handleSubmit, values }) => (
                <form onSubmit={handleSubmit}>
                  <Row>
                    <FieldArray name="mainCategory">
                      {({ fields }) => (
                        <div>
                          <>
                            {fields.map((name, index) => (
                              <Row>
                                <Col lg={12} md={12}>
                                  <div className="add_main_stream_btn_input margin_bottom">
                                    <Field name={`${name}.mainCategory`}>
                                      {({ input, meta }) => (
                                        <div className="w-100">
                                          <input
                                            {...input}
                                            type="text"
                                            className="form-control signup_form_input"
                                            placeholder="Enter Main Category"
                                          />
                                          {meta.error && meta.touched && (
                                            <span>{meta.error}</span>
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
                      <button className="admin_signup_btn  mt-3" type="submit">
                        {router.query.Id ? "Update" : "Add"}
                      </button>
                    </Col>
                  </Row>
                </form>
              )}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Addmaincategory;
