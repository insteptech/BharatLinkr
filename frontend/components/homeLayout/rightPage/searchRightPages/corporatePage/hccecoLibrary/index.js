import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import React from "react";
import { Accordion, Button, Form, Image } from "react-bootstrap";

const HccecoLibrary = () => {
  return (
    <>
      <div className="container">
        <div className="vcard">
          <div className="image_box">
            <div className="img">
              <Accordion className="profile_sec_c post_bar">
                <Accordion.Item className="w-100" eventKey="1">
                  <Accordion.Header>
                    <div className="acc_bar">
                      <div className="post_bar_col_left">
                        <div className="mid_comment_left">
                          <img
                            className="suggested_card_profile post_card_profile"
                            src="/images/mdi_pro.png"
                          />
                        </div>
                        <h2 className="post_bar_heading">
                          What's in your mind, Argha?
                        </h2>
                      </div>
                      <div className="post_bar_col_right">
                        <Image
                          className="ms-3"
                          src="/images/media-post-icon.png"
                        />
                        <Image
                          className="ms-3"
                          src="/images/addimg-post-icon.svg"
                        />
                        <h5 className="ms-3">@</h5>
                      </div>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body className="post_bar_accordion_body">
                    <input
                      className=" input_padding"
                      type="text"
                      placeholder="Write Titile here..."
                    />
                    <div>
                      <Form.Control
                        className="form-control  input_padding post_summary_input margin_bottom"
                        as="textarea"
                        placeholder="Write Description here.."
                        aria-label="With textarea"
                      />
                    </div>
                    <div className="dropdown_row">
                      <ScrollingCarousel show={5.5} slide={4} swiping={true}>
                        <Form.Select aria-label="Default select example">
                          <option>Status</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </Form.Select>
                        <Form.Select aria-label="Default select example">
                          <option>Type</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </Form.Select>
                        <Form.Select aria-label="Default select example">
                          <option>Ellgibillty</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </Form.Select>
                        <Form.Select aria-label="Default select example">
                          <option>Status</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </Form.Select>
                        <Form.Select aria-label="Default select example">
                          <option>Location</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </Form.Select>
                        <Form.Select aria-label="Default select example">
                          <option>value</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </Form.Select>
                        <Form.Select aria-label="Default select example">
                          <option>Status</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </Form.Select>
                      </ScrollingCarousel>
                    </div>
                    <div className="text-center">
                      <Button className="border_btn user_header_login_btn post_bar_post_btn">
                        Post
                      </Button>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
            {/* <div className="content">
              <div className="dropdown_row hover_position">
                <ScrollingCarousel show={5.5} slide={4} swiping={true}>
                  <Button className="view_and_apply_btn post_card_icons_btn  font_12">
                    <Image
                      className="post_card_icons"
                      src="/images/script-icon.png"
                    />
                    Script
                  </Button>
                  <Button className="view_and_apply_btn post_card_icons_btn  font_12">
                    <Image
                      className="post_card_icons"
                      src="/images/announcement-icon.png"
                    />
                    Announcement
                  </Button>
                  <Button className="view_and_apply_btn post_card_icons_btn  font_12">
                    <Image
                      className="post_card_icons"
                      src="/images/job-icon.png"
                    />
                    Job
                  </Button>
                  <Button className="view_and_apply_btn post_card_icons_btn  font_12">
                    <Image
                      className="post_card_icons"
                      src="/images/intern.png"
                    />
                    Intern
                  </Button>
                  <Button className="view_and_apply_btn post_card_icons_btn  font_12">
                    <Image
                      className="post_card_icons"
                      src="/images/more-icon.png"
                    />
                    More..
                  </Button>
                  <Button className="view_and_apply_btn post_card_icons_btn  font_12">
                    <Image
                      className="post_card_icons"
                      src="/images/job-icon.png"
                    />
                    Job
                  </Button>
                  <Button className="view_and_apply_btn post_card_icons_btn  font_12">
                    <Image
                      className="post_card_icons"
                      src="/images/more-icon.png"
                    />
                    More..
                  </Button>
                </ScrollingCarousel>
              </div>
            </div> */}
            <div className="content1">
              {" "}
              <Button className="view_and_apply_btn post_card_icons_btn  font_12">
                <Image
                  className="post_card_icons"
                  src="/images/script-icon.png"
                />
                Script
              </Button>
            </div>
            <div className="content2">
              {" "}
              <Button className="view_and_apply_btn post_card_icons_btn  font_12">
                <Image
                  className="post_card_icons"
                  src="/images/announcement-icon.png"
                />
                Announcement
              </Button>
            </div>
            <div className="content3">
              {" "}
              <Button className="view_and_apply_btn post_card_icons_btn  font_12">
                <Image className="post_card_icons" src="/images/job-icon.png" />
                Job
              </Button>
            </div>
            <div className="content4">
              {" "}
              <Button className="view_and_apply_btn post_card_icons_btn  font_12">
                <Image className="post_card_icons" src="/images/intern.png" />
                Intern
              </Button>
            </div>
            <div className="content5">
              {" "}
              <Button className="view_and_apply_btn post_card_icons_btn  font_12">
                <Image
                  className="post_card_icons"
                  src="/images/more-icon.png"
                />
                More..
              </Button>
            </div>
            {/* <div className="content6">hello6</div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default HccecoLibrary;
