import { useRouter } from "next/router";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { forgetPassword, updatePassword } from "../../redux/actions/auth";
import { Field, Form } from "react-final-form";
import { toast } from "react-toastify";

function ForgotPasswordPage() {
  const router = useRouter();
  const dispatch = useDispatch()
  const [formStep, setFormStep] = useState(0);

  const onSubmit = (values) => {
    const otp = values.OTP1 + values.OTP2 + values.OTP3 + values.OTP4;
    if (formStep === 0) {

      dispatch(forgetPassword(values.email)).then((response) => {
        if (response?.payload?.status === 200 && response.payload?.data?.success === true) {
          setFormStep(1)
        } else {
          toast.info(response?.payload?.data?.message)
        }
      })
    }
    if (formStep === 1) {
      dispatch(updatePassword({
        email: values?.email,
        password: values?.password
      }
      )).then((response) => {
        if (response?.payload?.status === 200 && response?.payload?.data?.success === true) {
          toast.success(response?.payload?.data?.message, { autoClose: 2000 })
          router.push('/login');
        }
      })
    }
  }
  const formValidate = (values) => {

    const errors = {};
    var emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (formStep === 0) {
      if (!values.email) {
        errors.email = 'Email is required';
      } else if (!emailPattern?.test(values.email)) {
        errors.email = 'Invalid email address';
      }
    } else if (formStep === 1) {

      if (!values?.email) {
        errors.email = 'Email must be a valid email address'
      }
      if (!values?.password) {
        errors.password = 'Password is required'
      }
      if (!values.conformPassword) {
        errors.conformPassword = " confirmation password is required";
      } else if (values.password && values.conformPassword && values.password !== values.conformPassword) {
        errors.conformPassword = "Both passwords must match";
      }
    }
    return errors;
  }
  return (
    <div className="main_admin_login_bg">
      <Container>
        <div className=" w-100 ">
          <Form
            onSubmit={onSubmit}
            validate={formValidate}
            render={({ handleSubmit, values }) => (
              <form onSubmit={handleSubmit} className="login_form mx-auto my-auto">
                <h2>FORGET PASSWORD</h2>
                {formStep === 0 && (

                  <Field name="email">
                    {({ input, meta }) => (
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">
                          Email
                        </label>
                        <input
                          {...input}
                          type="text"
                          placeholder="Email"
                          className="login_input"
                        />
                        {meta.touched && meta.error && (
                          <span className=" text-danger  text-danger alert-danger">
                            {meta.error}
                          </span>
                        )}
                      </div>
                    )}
                  </Field>
                )}
                {formStep === 1 && (
                  <>
                    <Field name="email">
                      {({ input, meta }) => (
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">
                            Email
                          </label>
                          <input
                            {...input}
                            type="text"
                            placeholder="Email"
                            className="login_input" />
                          {meta.touched && meta.error && (
                            <span className=" text-danger  text-danger alert-danger">
                              {meta.error}
                            </span>
                          )}
                        </div>
                      )}
                    </Field>
                    <Field name="password">
                      {({ input, meta }) => (
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">
                            Password
                          </label>
                          <input
                            {...input}
                            type="password"
                            placeholder="Enter your password"
                            className="login_input" />
                          {meta.touched && meta.error && (
                            <span className=" text-danger  text-danger alert-danger">
                              {meta.error}
                            </span>
                          )}
                        </div>
                      )}
                    </Field><Field name="conformPassword">
                      {({ input, meta }) => (
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">
                            conform Password
                          </label>
                          <input
                            {...input}
                            type="password"
                            placeholder="Conform Password"
                            className="login_input" />
                          {meta.touched && meta.error && (
                            <span className=" text-danger  text-danger alert-danger">
                              {meta.error}
                            </span>
                          )}
                        </div>
                      )}
                    </Field>
                  </>
                )}
                <button type="submit" className="btn login_btn">
                  SUBMIT
                </button>
                <div className="forgot_row d-flex ">
                  <p className="login_paira">You Remember Password?</p>{" "}
                  <a onClick={() => router.back()}> Sign In </a>
                </div>
              </form>
            )}
          />
        </div>
      </Container>
    </div>
  );
}

export default ForgotPasswordPage;
