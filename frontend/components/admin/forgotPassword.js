import { useRouter } from "next/router";
import React from "react";
import { Container } from "react-bootstrap";

function ForgotPasswordPage() {
  const router = useRouter();
  return (
    <div className="main_admin_login_bg">
      <Container>
        <div className=" w-100 ">
          <form className="login_form mx-auto my-auto">
            <h2>FORGET PASSWORD</h2>
            <input
              type="email"
              placeholder="Enter Email"
              className="login_input"
              required
              // value={loginData.email}
              // onChange={(e) =>
              //   setLoginData({ ...loginData, email: e.target.value })
              // }
            />
            <button type="submit" className="btn login_btn">
              SUBMIT
            </button>
            <div className="forgot_row d-flex ">
              <p className="login_paira">You Remember Password?</p>{" "}
              <a onClick={() => router.back()}> Sign In </a>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default ForgotPasswordPage;
