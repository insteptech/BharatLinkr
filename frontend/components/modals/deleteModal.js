import React from "react";
import { Modal } from "react-bootstrap";

function DeleteModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className="text-center signup-modal-body my-5">
          <h1 className="font-dark-purple">Delete</h1>
          <div className="mt-5">
            <button
              className=" admin_signup_btn mx-2 my-0"
              onClick={() => {
                props.handleDelete( props.deleteItem,props.subHeader,);
                props.onHide();
              }}
            >
              Delete
            </button>
            <button className="grey_button admin_signup_btn mx-2 my-0" onClick={props.onHide}>
              Cancel
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default DeleteModal;
