import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Field, Form } from "react-final-form";

function SubmitForm() {
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
            <h2 className="edit_profile_h2 pt-3 pb-1 mb-0 font_24">Submit Resume</h2>
            <p className="form_modal_sub_heading">A common form to get job in your dream company</p>
          </Col>
        </Row>
        <Form
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validate={(values) => {
            const errors = {};
            if (!values.chooseCourse) errors.chooseCourse = "*";
            if (!values.selectExperience) errors.selectExperience = "*";
            if (!values.selectDepartment) errors.selectDepartment = "*";
            if (!values.selectSubCategory) errors.selectSubCategory = "*";
            if (!values.selectSubDepartment) errors.selectSubDepartment = "*";
            if (!values.enterSkills) errors.enterSkills = "*";
            if (!values.selectLocations) errors.selectLocations = "*";
            return errors;
          }}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <Row>
                <Col lg="12" md="12">
                  <Field name="chooseCourse" component="input">
                    {({ input, meta }) => (
                      <div>
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                        <label className="signup_form_label">
                          Select Education
                        </label>
                        <select
                          {...input}
                          type="text"
                          className="form-control signup_form_input margin_bottom"
                          placeholder="Select Country"
                        >
                          <option>Master Degree</option>
                          <option>Bechelor Degree</option>
                          <option>Diploma</option>
                        </select>
                      </div>
                    )}
                  </Field>
                </Col>
              </Row>
              <Row>
                <Col lg="6" md="12">
                  <Field name="selectExperience">
                    {({ input, meta }) => (
                      <div>
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                        <label className="signup_form_label">
                          Select Experience
                        </label>
                        <select
                          {...input}
                          type="text"
                          className="form-control signup_form_input margin_bottom"
                          placeholder="Enter program fees"
                        >
                          <option>Poor</option>
                          <option>Good</option>
                          <option>Excellent</option>
                        </select>
                      </div>
                    )}
                  </Field>
                </Col>
                <Col lg="6" md="12">
                  <Field name="selectDepartment">
                    {({ input, meta }) => (
                      <div>
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                        <label className="signup_form_label">
                          Select Department
                        </label>
                        <select
                          {...input}
                          type="text"
                          className="form-control signup_form_input margin_bottom"
                          placeholder="Enter program fees"
                        >
                          <option>HR Department</option>
                          <option>Accounts Department</option>
                          <option>Management Department</option>
                        </select>
                      </div>
                    )}
                  </Field>
                </Col>
              </Row>
              <Row>
                <Col lg="6" md="12">
                  <Field name="selectSubCategory">
                    {({ input, meta }) => (
                      <div>
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                        <label className="signup_form_label">
                          Select Sub Category
                        </label>
                        <select
                          {...input}
                          type="text"
                          className="form-control signup_form_input margin_bottom"
                          placeholder="Enter program fees"
                        >
                          <option>Category 1</option>
                          <option>Category 2</option>
                          <option>Category 3</option>
                        </select>
                      </div>
                    )}
                  </Field>
                </Col>
                <Col lg="6" md="12">
                  <Field name="selectSubDepartment">
                    {({ input, meta }) => (
                      <div>
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                        <label className="signup_form_label">
                          Select Sub Department
                        </label>
                        <select
                          {...input}
                          type="text"
                          className="form-control signup_form_input margin_bottom"
                          placeholder="Enter program fees"
                        >
                          <option>Sub Department 1</option>
                          <option>Sub Department 2</option>
                          <option>Sub Department 3</option>
                        </select>
                      </div>
                    )}
                  </Field>
                </Col>
              </Row>
              <Row>
                <Col lg="6" md="12">
                  <Field name="enterSkills">
                    {({ input, meta }) => (
                      <div>
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                        <label className="signup_form_label">
                          Enter Skills
                        </label>
                        <select
                          {...input}
                          type="text"
                          className="form-control signup_form_input margin_bottom"
                          placeholder="Enter program fees"
                        >
                          <option>Typing</option>
                          <option>Managing</option>
                          <option>Cashier</option>
                        </select>
                      </div>
                    )}
                  </Field>
                </Col>
                <Col lg="6" md="12">
                  <Field name="selectLocations">
                    {({ input, meta }) => (
                      <div>
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                        <label className="signup_form_label">
                          Select Preferred Location
                        </label>
                        <select
                          {...input}
                          type="text"
                          className="form-control signup_form_input "
                          placeholder="Enter program fees"
                        >
                          <option>Preferred Location 1</option>
                          <option>Preferred Location 2</option>
                          <option>Preferred Location 3</option>
                        </select>
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
export default SubmitForm;
