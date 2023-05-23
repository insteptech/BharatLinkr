import { useRouter } from "next/router";
import React from "react";
import { Modal } from "react-bootstrap";

function DisclaimerModal(props) {
  const router = useRouter();
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={`disclaimer-modal mx-auto`}
    >
      <Modal.Body className="signup_modal_body">
        <>
          <h3 className="modal_heading text-center mb-3">Disclaimer</h3>
          <h4 className="form_modal_sub_heading">
            1- Lorem ipsum dollar sit amet lorem ipsum
          </h4>
          <h4 className="form_modal_sub_heading">
            2- Lorem ipsum dollar sit amet lorem ipsum
          </h4>
          <h4 className="form_modal_sub_heading">
            3- Lorem ipsum dollar sit amet lorem ipsum
          </h4>

          <div className="d-flex justify-content-center ">
            <button className="admin_signup_btn modal_btn grey_button" onClick={props.onHide}>
              Decline
            </button>
            <button
              className="admin_signup_btn modal_btn  ms-3"
              onClick={() => router.push("/signup")}
            >
              I Accept
            </button>
          </div>
        </>
      </Modal.Body>
    </Modal>
  );
}

export default DisclaimerModal;
