import { useRouter } from "next/router";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login } from "../../redux/actions/auth";
import DisclaimerModal from "../modals/disclaimermodal";
import SignupModal from "../modals/signupmodal";
import ForgotPasswordPage from "../admin/forgotPassword";
import { cookies } from 'next/headers'

function LoginPage() {
  const [modalShow, setModalShow] = useState(false);
  const handleHide = () => {
    setModalShow(false);
  };
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const [userData, setUserData] = useState();
  const handleLogin = () => {
    dispatch(login(loginData)).then((res) => {
      if (res?.payload?.success === true) {
        let token = res?.payload?.data?.token;
        localStorage.setItem("token", token);
        document.cookie =
          // cookies().set('name', JSON.stringify(loginData));
          toast.success("logined successfuly");
        router.push("/");
      } else {
        toast.error(res?.payload?.message);
      }
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(userData);
    // if (loginData) {

    //   toast.success("logined");
    // }
  };
  const handleForget = () => {
    router.push("/forget");
  };
  return (
    <>
      <div className="login_bg">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 col-md-12 col-12 mobile_padding">
              <div className="text-center login_left_col">
                <img className="hcceco_logo" src="/images/bharat-logo.svg" />
                <p className="logo_sub_heading">Sign in to your account</p>
                <img
                  className="img-fluid login_img"
                  src="images/login-img.svg"
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-12 col-12 mobile_padding">
              <div className="login_right_col">
                <form onSubmit={onSubmit} className="login_form">
                  <input
                    type="email"
                    placeholder="Enter Email"
                    className="login_input signup_form_input"
                    required
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                  />
                  <input
                    type="password"
                    placeholder="Enter Password"
                    className="login_input signup_form_input"
                    required
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                  />
                  <div className="forgot_row" onClick={handleForget}>
                    <p className="login_paira mobile_font_14 under_line hover_link">
                      Forgot Password?
                    </p>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn login_btn"
                      onClick={handleLogin}
                    >
                      Login
                    </button>
                  </div>
                  <p className="login_paira text-center mobile_font_14">
                    Don't have an account?{" "}
                    <a onClick={() => setModalShow(true)}>Create Account</a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <SignupModal
        show={modalShow}
        onHide={() => handleHide()}
        /> */}
      <DisclaimerModal show={modalShow} onHide={() => handleHide()} />
    </>
  );
}
export default LoginPage;
