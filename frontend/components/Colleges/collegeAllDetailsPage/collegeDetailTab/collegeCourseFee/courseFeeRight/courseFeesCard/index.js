import React, { useState } from "react";
import { Button, Card, Col, Dropdown, Form, Image, Row } from "react-bootstrap";

const CourseFeesCard = ({item,index}) => {
  const [feeIndex,setFeeIndex] = useState(0)
  return (
      <div className=" course_fees_card" key={index}>
        <Card className="profile_sec_c mobile_card_padding pt-3">
          <Row>
            <Col md={6} className="item_align">
              <h6 className="p_c_card_master_heading align_center mobile_blue_text mobile_font_18 pt-2">
                {item?.courseName}
              </h6>
              <div className="text-end post_card_three_dot big_screen_none m-0 course_card_dot">
                <Dropdown className="edit_delete_drop">
                  <Dropdown.Toggle
                    className="three_dot_btn ms-0"
                    variant="success"
                    id="dropdown-basic"
                  >
                    <Image src="/images/blue-three-dot.svg" />
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="">
                    <Dropdown.Item href="#/action-1">Edit</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Apply Now</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Col>
            <Col md={6}>
              <Row className="">
                <Col md={12} xs={12} className="total_fees_main_row">
                  <div className="total_fees_row average_fees_text">
                    <h6 className="p_c_card_fees_heading mobile_font_13 m-0">
                      <Image src="/images/green-squre.svg" /> Total Fees
                    </h6>
                    <p className="p_c_card_fees_value m-0 ms-3">₹ {item?.CourseFees[feeIndex]?.fees}</p>
                  </div>
                  <Form.Select
                    className="me-0 hide_box"
                    aria-label="Default select example"
                    onChange={(e)=>setFeeIndex(e.target.value)}
                  >
                    {item?.CourseFees?.map((ele,i)=>{
                      return(<option key={i} value={i}>{ele?.FeeDetails?.name}</option>)
                    })}
                  </Form.Select>
                </Col>
              </Row>

              {/* <Row>
                <Col md={12}>
                  <div className="offer_heading_col">
                    <h6 className="offer_heading hover_link mobile_font_12">
                      rtyu
                    </h6>
                  </div>
                </Col>
              </Row> */}
            </Col>
          </Row>
          <Row className="mt-3">
            <Col xl={9} className="">
              <div className="icon_text_row">
                <div className="item_align me-4">
                  <Image
                    className="me-1"
                    src="/images/blue-clock.svg"
                    alt="icon"
                  />
                  <h6 className="p_c_card_fees_heading text-start margin_none mobile_font_12">
                    {item?.courseDuration}Yrs
                  </h6>
                </div>
                <div className="item_align me-4">
                  <Image
                    className="me-1"
                    src="/images/blue-degree-icon.svg"
                    alt="icon"
                  />
                  <h6 className="p_c_card_fees_heading margin_none mobile_font_12">
                    {item?.CourseType?.name}
                  </h6>
                </div>
                <div className="item_align me-4">
                  <Image
                    className="me-1"
                    src="/images/dark-college.svg"
                    alt="icon"
                  />
                  <h6 className="p_c_card_fees_heading margin_none mobile_font_12">
                    {item?.Place?.name}
                  </h6>
                </div>

                <div className="item_align me-4">
                  <Image
                    className="me-1"
                    src="/images/blue-hat.svg"
                    alt="icon"
                  />
                  <h6 className="p_c_card_fees_heading margin_none mobile_font_12">
                    {item?.CourseLevel?.name}
                  </h6>
                </div>
                <div className="item_align">
                  <Image
                    className="me-1"
                    src="/images/blue-time-clock.svg"
                    alt="icon"
                  />
                  <h6 className="p_c_card_fees_heading margin_none mobile_font_12">
                    {item?.ProgramType?.name}
                  </h6>
                </div>
              </div>
            </Col>
            <Col xl={3} className="item_end hide_box">
              <div className=" ">
                <button
                  className="update_btn course_fee_card_btn"
                  type="button"
                >
                  Apply Now
                </button>
              </div>
            </Col>
          </Row>
          <div className="mt-2 icon_text_row">
            <div sm={6} md={4} className="item_align">
              <Image className="me-1" src="/images/blue-hat.svg" alt="icon" />
              <h6 className="p_c_card_fees_heading text-start blue_color margin_none mobile_font_12 underline">
                Eligibility
              </h6>
              <p className="p_c_card_fees_value m-0 ms-2 me-4">Graduation</p>
            </div>
            <div sm={6} md={4} className="item_align">
              <Image className="me-1" src="/images/blue-exam.svg" alt="icon" />
              <h6 className="p_c_card_fees_heading margin_none blue_color mobile_font_12 underline">
                Exams Accepted
              </h6>
              <p className="p_c_card_fees_value m-0 ms-2 me-4">{item?.ExamAccepted?.examName}</p>
            </div>
            <div sm={6} md={4} className="item_align">
              <Image className="me-1" src="/images/blue-star.svg" alt="icon" />
              <h6 className="p_c_card_fees_heading margin_none blue_color mobile_font_12 underline">
                Rank
              </h6>
              <p className="p_c_card_fees_value m-0 ms-3">0by</p>
            </div>
          </div>
          <Row className="mt-3">
            <Col lg={12}>
              <p className="course_fee_card_paira">
                {item?.CourseAssociateStream?.map((ele,i)=>{
                  return(` ${ele?.MainStream?.mainStreamName} ${i+1==item?.CourseAssociateStream?.length?'':'|'}`)
                })}
                {/* <span className="green_text">...View more</span> */}
              </p>
            </Col>
          </Row>
        </Card>
      </div>
  );
};

export default CourseFeesCard;
