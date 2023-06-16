import React from 'react'
import { Modal } from 'react-bootstrap'
import QuestionsPallete from '../mocktest/questionPallete'
import { mocktestQuestionStatus } from '../utils';

export default function ConfirmModal(props) {
    const { confirmModal, handleConfirmClose, questionpalletedata, handleSubmit } = props
    const getCount = (status) => {
        return questionpalletedata.reduce((count, item) => item.status === status ? count + 1 : count, 0);
    };
    return (
        <Modal
            size="lg"
            show={confirmModal}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={handleConfirmClose}
            className={`disclaimer-modal mx-auto`}>
            <Modal.Body className="signup_modal_body">
                <div className="ans_four_p_div mt-4 mx-auto">
                    <div className="green_dot color_dot"></div>
                    <p className="ans_four_p me-4">Answered-{getCount(mocktestQuestionStatus.answered)}</p>

                    <div className="light_dot color_dot"></div>
                    <p className="ans_four_p">Not Answered-{getCount(mocktestQuestionStatus.notAnswered)}</p>
                </div>
                <div className="ans_four_p_div">
                    <div className="orange_dot color_dot"></div>
                    <p className="ans_four_p me-4">
                        Not attempted-{getCount(mocktestQuestionStatus.notAttempted)}
                    </p>

                    <div className="dark_blue_dot color_dot"></div>
                    <p className="ans_four_p">
                        Marked for review-{getCount(mocktestQuestionStatus.forReview)}
                    </p>
                </div>
                <p className="ans_four_p text-center mt-4 fw-bold">
                    Are you sure you want to submit?
                </p>
                <div className="d-flex justify-content-center ">
                    <button className="admin_signup_btn modal_btn grey_button" onClick={handleConfirmClose}>
                        Decline
                    </button>
                    <button
                        className="admin_signup_btn modal_btn  ms-3"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    )
}
