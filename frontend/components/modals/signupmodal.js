import { useRouter } from "next/router";
import React from "react";
import { Modal } from "react-bootstrap";

function SignupModal(props) {
  const router = useRouter();
  const handleRoute = () => {
    router.push("/signup");
  };
  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={`signup-now-modal mx-auto`}
    >
      <Modal.Body>
      <div className="text-center position-relative share-college-modal-body">
        
          <img
            onClick={props.onHide}
            className="close-icon position-absolute chat_box_close_btn p-0"
            src="/images/cross-icon.svg"
          />
        </div>
        <div className="text-center signup-modal-body my-5">
          <h1 className="font-dark-purple">SIGN UP NOW!</h1>
          <h4 className="font-color-grey fw-normal">
            SIgnup to your account to see amazing content
          </h4>
          <div className="mt-5">
            <button className="grey-button mx-2" onClick={handleRoute}>
              Create Account
            </button>
            <button className="dark-purple-button mx-2" onClick={handleLogin}>
              Log In
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default SignupModal;
