import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function CommonModal(props) {
  return (
    <Modal
      className={props.className}
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>{props.components}</Modal.Body>
    </Modal>
  );
}
export default CommonModal;
