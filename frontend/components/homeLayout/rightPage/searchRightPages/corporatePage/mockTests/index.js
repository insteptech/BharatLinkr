import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { Accordion, Button, Col, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCorporateData } from "../../../../../../redux/actions/corporate/addcorporate";
import { getMockTestCorporatelist } from "../../../../../../redux/actions/corporate/addmocktestcorporate";
import { getTokenDecode } from "../../../../../utils";
import { toast } from "react-toastify";
// import Modal from "react-bootstrap/Modal";

const MockTests = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(getMockTestCorporatelist());
  }, []);

  const mocktestlist = useSelector(
    (state) => state?.corporateMocktest?.mocktestcorporatelist
  );
  const handleCheck =(item) =>{
    if(getTokenDecode()){
      router.push(
        `/corporate/mocktest/instructions/${item?.id}`
      )
    }else {
      toast.info("Login first!")
    }
  }

  return (
    <>
      <div>
        <h6 className="corporate_master_heading">
          mock tests for practice / <span>reasoning</span>
        </h6>
      </div>
      {mocktestlist &&
        mocktestlist?.rows?.map((item, index) => {
          return (
            <div key={index} className="profile_sec_c post_bar py-2">
              <div className="w-100" eventKey="1">
                <Row>
                  <Col md={6}>
                    <div>
                      <h6 className="profile_card_title mobile_item_center font_15 mb-2">
                        {item?.topicName}
                      </h6>
                      <p className="profile_card_sub_title mobile_item_center p-0 font_13">
                        {item?.feildName}
                      </p>
                      <div className="corporate_card_text mt-2">
                        <p className="profile_card_sub_title icon_text  w-100 font_12">
                          <Image
                            className="me-1"
                            src="/images/question-dark-icon.svg"
                          />
                          <span>{item?.totalQuestions}</span> Questions
                        </p>
                        <p className="profile_card_sub_title icon_text w-100  font_12 ">
                          <Image className="me-1" src="/images/dark-book.svg" />
                          <span>{item?.totalMarksOfTest}</span> Marks
                        </p>
                        <p className="profile_card_sub_title icon_text font_12 w-100 border_none">
                          <Image className="me-1" src="/images/dark-time.svg" />
                          <span>{item?.totalTime}</span> Mins
                        </p>
                      </div>
                      <div className="d-flex mobile_item_center mt-3">
                        <p className="green_links me-5">Learn Short Tricks</p>
                        <p className="green_links">Download Worksheet</p>
                      </div>
                    </div>
                  </Col>
                  <Col md={6} className="corporate_card_btn_col mobile_item_center">
                    <Button
                      onClick={() =>
                        handleCheck(item)
                      }
                      className="corporate_card_btn download_btn"
                    >
                      Start Now
                    </Button>
                  </Col>
                </Row>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default MockTests;
