import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Field, Form } from "react-final-form";

function ClientForm() {
  const required = (value) => (value ? undefined : "Required");
  const mustBeNumber = (value) =>
    isNaN(value) ? "Must be a number" : undefined;
  const minValue = (min) => (value) =>
    isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;
  const composeValidators =
    (...validators) =>
    (value) =>
      validators.reduce(
        (error, validator) => error || validator(value),
        undefined
      );

  const handleSubmit = (values) => {
    console.log(values, "valuesssssssssss");
  };
  const initialValues = {};
  return (
    <>
      <Container>
        <Row>
          <Col lg={12} className="text-center ">
            <h2 className="edit_profile_h2 pt-3 pb-1 mb-0 font_24">Client Form</h2>
            <p className="form_modal_sub_heading">A common form for your all business needs</p>
          </Col>
        </Row>
        <Form
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validate={(values) => {
            const errors = {};
            if (!values.selectField) errors.selectField = "*";
            if (!values.spocName) errors.spocName = "*";
            if (!values.spocMail) errors.spocMail = "*";
            if (!values.contactNo) errors.contactNo = "*";
            return errors;
          }}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <Row>
                <Col lg="12" md="12">
                  <Field name="selectField" component="input">
                    {({ input, meta }) => (
                      <div>
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                        <label className="signup_form_label">
                          Select Field
                        </label>

                        <select
                          {...input}
                          type="text"
                          className="form-control signup_form_input margin_bottom"
                          placeholder="Select the field you are interested for"
                        >
                          <option>Civil</option>
                          <option>Teaching</option>
                          <option>Consultancy</option>
                        </select>
                      </div>
                    )}
                  </Field>
                </Col>
              </Row>
              <Row>
                <Col lg="6" md="12">
                  <Field name="spocName">
                    {({ input, meta }) => (
                      <div>
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                        <label className="signup_form_label">SPOC Name</label>
                        <input
                          {...input}
                          type="text"
                          className="form-control signup_form_input margin_bottom"
                          placeholder="Enter Concerned person name"
                        />
                      </div>
                    )}
                  </Field>
                </Col>
                <Col lg="6" md="12">
                  <Field name="spocMail">
                    {({ input, meta }) => (
                      <div>
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                        <label className="signup_form_label">
                          SPOC Mail Id
                        </label>
                        <input
                          {...input}
                          type="email"
                          className="form-control signup_form_input margin_bottom"
                          placeholder="Enter mail Id"
                        />
                      </div>
                    )}
                  </Field>
                </Col>
              </Row>
              <Row>
                <Col lg="6" md="12">
                  <Field name="contactNo">
                    {({ input, meta }) => (
                      <div>
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                        <label className="signup_form_label">
                          SPOC Contact No.
                        </label>
                        <input
                          {...input}
                          type="number"
                          className="form-control signup_form_input "
                          placeholder="Enter Contact No."
                        />
                      </div>
                    )}
                  </Field>
                </Col>
              </Row>
              <Row>
                <Col lg={12} className="text-center">
                  <button
                    className="admin_signup_btn my-4"
                    type="submit"
                  >
                    Submit
                  </button>
                </Col>
              </Row>
            </form>
          )}
        />
      </Container>
    </>
  );
}
export default ClientForm;
