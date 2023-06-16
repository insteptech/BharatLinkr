import Image from "next/image";
import React, { useRef, useState } from "react";
import { Modal, Button, Overlay, Tooltip } from "react-bootstrap";

function CollegeShareModal(props) {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const link = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setShow(!show);
    setTimeout(() => setShow(show), 2500);
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={`share-college-modal mx-auto`}
    >
      <Modal.Body>
        <div className="text-center position-relative share-college-modal-body">
          <img
            src="/images/cross-icon.svg"
            className="close-icon position-absolute chat_box_close_btn"
            onClick={props.onHide}
          />
          <h3 className="edit_profile_h2 mobile_font_18 py-3 mb-0">
            Share This College
          </h3>
          <h5 className="mobile_font_14">
            Share this college with your friends
          </h5>
          <div className="py-4 d-flex justify-content-center gap-4">
            <Image width={44} height={44} src="/images/Whatsapp-icon.png" />
            <Image width={44} height={44} src="/images/Telegram-icon.png" />
          </div>
          <div className="w-100 px-3 pb-3 text-start">
            <p className="mobile_font_16 college_left_page_master_heading pt-3">
              Page Link
            </p>
            <div className="d-flex">
              <input
                className="copy-link-input mobile_font_14 w-100 px-3"
                name="sharinglink"
                value={link}
                readOnly
              ></input>
              <Button
                ref={target}
                className="copy-link-button background-light-purple mobile_font_14"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-title="Tooltip on top"
                onClick={handleCopy}
              >
                Copy Link
              </Button>
              <Overlay target={target.current} show={show} placement="top">
                {(props) => (
                  <Tooltip id="overlay-example" {...props}>
                    Copied!
                  </Tooltip>
                )}
              </Overlay>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default CollegeShareModal;
