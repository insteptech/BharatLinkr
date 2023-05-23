import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Field, Form } from "react-final-form";

function CounslingForm() {
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
          <Col lg={12} className="text-center edit_profile_h2">
            <h2>Common Counsiling Form</h2>
            <p>a common form for your Counsiling needs</p>
          </Col>
        </Row>
        <Form
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validate={(values) => {
            const errors = {};
            if (!values.selectCountry) errors.selectCountry = "*";
            if (!values.selectState) errors.selectState = "*";
            if (!values.selectCity) errors.selectCity = "*";
            if (!values.selectColleges) errors.selectColleges = "*";
            if (!values.selectCourses) errors.selectCourses = "*";
            return errors;
          }}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <Row>
                <Col lg="12" md="12">
                  <Field name="selectCountry" component="input">
                    {({ input, meta }) => (
                      <div>
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                        <label className="signup_form_label">
                          Select Country
                        </label>

                        <select
                          {...input}
                          type="text"
                          className="form-control signup_form_input margin_bottom"
                          placeholder="Select Country"
                        >
                          <option>Select Country</option>
                          <option>Select Country 1</option>
                          <option>Select Country 2</option>
                        </select>
                      </div>
                    )}
                  </Field>
                </Col>
              </Row>
              <Row>
                <Col lg="6" md="12">
                  <Field name="selectState">
                    {({ input, meta }) => (
                      <div>
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                        <label className="signup_form_label">
                          Select State
                        </label>
                        <select
                          {...input}
                          type="text"
                          className="form-control signup_form_input margin_bottom"
                          placeholder="Enter program fees"
                        >
                          <option>Punjab</option>
                          <option>WashingTon,D.C.</option>
                          <option>New South Wales</option>
                        </select>
                      </div>
                    )}
                  </Field>
                </Col>
                <Col lg="6" md="12">
                  <Field name="selectCity">
                    {({ input, meta }) => (
                      <div>
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                        <label className="signup_form_label">Select City</label>
                        <select
                          {...input}
                          type="text"
                          className="form-control signup_form_input margin_bottom"
                          placeholder="Enter program fees"
                        >
                          <option>Chandigarh</option>
                          <option>Yakima</option>
                          <option>Hillston</option>
                        </select>
                      </div>
                    )}
                  </Field>
                </Col>
              </Row>
              <Row>
                <Col lg="6" md="12">
                  <Field name="selectColleges">
                    {({ input, meta }) => (
                      <div>
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                        <label className="signup_form_label">
                          Select Colleges
                        </label>
                        <select
                          {...input}
                          type="text"
                          className="form-control signup_form_input margin_bottom"
                          placeholder="Enter program fees"
                        >
                          <option>Punjab University</option>
                          <option>Yakima University</option>
                          <option>University of Hillston</option>
                        </select>
                      </div>
                    )}
                  </Field>
                </Col>
                <Col lg="6" md="12">
                  <Field name="selectCourses">
                    {({ input, meta }) => (
                      <div>
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                        <label className="signup_form_label">
                          Select Courses
                        </label>
                        <select
                          {...input}
                          type="text"
                          className="form-control signup_form_input margin_bottom"
                          placeholder="Enter program fees"
                        >
                          <option>B.technology</option>
                          <option>Masters in Business</option>
                          <option>Diploma in Civil</option>
                        </select>
                      </div>
                    )}
                  </Field>
                </Col>
              </Row>
              <Row>
                <Col lg={12} className="text-center">
                  <button
                    className="admin_signup_btn me-4 account_btn"
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
export default CounslingForm;
