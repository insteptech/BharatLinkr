import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import React, { useState } from "react";
import { Accordion, Button, Col, Form, Image } from "react-bootstrap";
import Select, { components } from "react-select";

const categoryopt = [
  {
    value: "category",
    label: "category",
    icon: "/images/script-icon.png",
  },
  {
    value: "Script",
    label: "Script",
    icon: "/images/script-icon.png",
  },
  {
    value: "Announcement",
    label: "Announcement",
    icon: "/images/announcement-icon.png",
  },
  { value: "Job", label: "Job", icon: "/images/job-icon.png" },
  { value: "Internship", label: "Internship", icon: "/images/intern.png" },
  { value: "Mentoring", label: "Mentoring", icon: "/images/more-icon.png" },
  { value: "Question", label: "Question", icon: "/images/more-icon.png" },
  { value: "Services", label: "Services", icon: "/images/more-icon.png" },
  {
    value: "College festives",
    label: "College festives",
    icon: "/images/more-icon.png",
  },
  { value: "scholarship", label: "scholarship", icon: "/images/more-icon.png" },
  {
    value: "cultural events",
    label: "cultural events",
    icon: "/images/more-icon.png",
  },
  { value: "conferences", label: "conferences", icon: "/images/more-icon.png" },
  {
    value: "competitions",
    label: "competitions",
    icon: "/images/more-icon.png",
  },
  { value: "hackathon", label: "hackathon", icon: "/images/more-icon.png" },
  {
    value: "Hiring Challenges",
    label: "Hiring Challenges",
    icon: "/images/more-icon.png",
  },
  {
    value: "Campus Recruitment",
    label: "Campus Recruitment",
    icon: "/images/more-icon.png",
  },
];

const Option = (props) => (
  <components.Option {...props} className="country-option">
    <img className="post_card_icons" src={props.data.icon} />
    {props.data.label}
  </components.Option>
);

const PostBaar = () => {
  const [selectedlist, setSelectedlist] = useState(categoryopt[0]);
  const [show, setShow] = useState(null);

  const handleChange = (value) => {
    setSelectedlist(value);
    console.log(value.value, "sdfsdfsdf");
  };

  const SingleValue = ({ children, ...props }) => (
    <components.SingleValue {...props}>
      <img
        src={selectedlist.icon}
        alt="s-logo"
        className="selected-logo post_card_icons"
      />
      {children}
    </components.SingleValue>
  );

  return (
    <>
      <Accordion className=" post_bar">
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

              <div className="post_bar_col_right ms-0">
                {/* <div className=" w-100">
                 
                </div> */}
                <label className="" for="actual-btn">
                  <Image
                    className="ms-3 post_bar_icon"
                    src="/images/attach-pin.svg"
                  />
                </label>
                <input type="file" id="actual-btn" hidden />

                <Image
                  className="ms-3 post_bar_icon"
                  src="/images/addimg-post-icon.svg"
                />
                <h5 className="ms-3">@</h5>
              </div>
            </div>
          </Accordion.Header>
          <Accordion.Body className="post_bar_accordion_body">
            <Select
            className="font_13"
              value={selectedlist}
              options={categoryopt}
              onChange={handleChange}
              components={{
                Option,
                SingleValue,
              }}
            />
            {selectedlist.value === "Script" ? (
              ""
            ) : (
              <input
                className=" input_padding"
                type="text"
                placeholder="Write Titile here..."
              />
            )}
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
                {selectedlist.value === "Announcement" && (
                  <Form.Select aria-label="Default select example">
                    <option>Status</option>
                    <option value="1">Active</option>
                    <option value="2">Expired</option>
                  </Form.Select>
                )}
                {selectedlist.value === "Job" && (
                  <>
                    <Form.Select aria-label="Default select example">
                      <option>Status</option>
                      <option value="1">Active</option>
                      <option value="2">Expired</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>Documents</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>Location</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>work mode</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>job type</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>job role</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>eligibility</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>Sub Department</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>sort by</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                  </>
                )}
                {selectedlist.value === "Internship" && (
                  <>
                    <Form.Select aria-label="Default select example">
                      <option>Status</option>
                      <option value="1">Active</option>
                      <option value="2">Expired</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>Documents</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>Location</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>work mode</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>job type</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>job role</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>eligibility</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>Sub Department</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>sort by</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                  </>
                )}
                {selectedlist.value === "Mentoring" && (
                  <>
                    <Form.Select aria-label="Default select example">
                      <option>Streams</option>
                      <option value="1">Active</option>
                      <option value="2">Expired</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>sub streams</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>sort by</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                  </>
                )}
                {selectedlist.value === "Question" && (
                  <>
                    <Form.Select aria-label="Default select example">
                      <option>Streams</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>Organization</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>College</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>Course</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>Exam</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>Corporate</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>sub streams</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>sort by</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                  </>
                )}
                {selectedlist.value === "Services" && (
                  <>
                    <Form.Select aria-label="Default select example">
                      <option>Streams</option>
                      <option value="1">Active</option>
                      <option value="2">Expired</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>sub streams</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>sort by</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                  </>
                )}
                {selectedlist.value === "College festives" && (
                  <Form.Select aria-label="Default select example">
                    <option>Status</option>
                    <option value="1">Active</option>
                    <option value="2">Expired</option>
                  </Form.Select>
                )}
                {selectedlist.value === "scholarship" && (
                  <>
                    <Form.Select aria-label="Default select example">
                      <option>Status</option>
                      <option value="1">Active</option>
                      <option value="2">Expired</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>Streams</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>Eligibility</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>sub streams</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>sort by</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                  </>
                )}
                 {selectedlist.value === "cultural events" && (
                  <>
                    <Form.Select aria-label="Default select example">
                      <option>Status</option>
                      <option value="1">Active</option>
                      <option value="2">Expired</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>Streams</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>Eligibility</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>sub streams</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>sort by</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                  </>
                )}
                 {selectedlist.value === "conferences" && (
                  <>
                    <Form.Select aria-label="Default select example">
                      <option>Status</option>
                      <option value="1">Active</option>
                      <option value="2">Expired</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>Streams</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>Eligibility</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>sub streams</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>sort by</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                  </>
                )}
                 {selectedlist.value === "competitions" && (
                  <>
                    <Form.Select aria-label="Default select example">
                      <option>Status</option>
                      <option value="1">Active</option>
                      <option value="2">Expired</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>Streams</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>Eligibility</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>sub streams</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>sort by</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                  </>
                )}
                 {selectedlist.value === "hackathon" && (
                  <>
                    <Form.Select aria-label="Default select example">
                      <option>Status</option>
                      <option value="1">Active</option>
                      <option value="2">Expired</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>Streams</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>Eligibility</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>sub streams</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>sort by</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                  </>
                )}
                 {selectedlist.value === "Hiring Challenge" && (
                  <>
                    <Form.Select aria-label="Default select example">
                      <option>Status</option>
                      <option value="1">Active</option>
                      <option value="2">Expired</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>Streams</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>Eligibility</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>sub streams</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>sort by</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                  </>
                )}
                 {selectedlist.value === "Campus Recruitment" && (
                  <>
                    <Form.Select aria-label="Default select example">
                      <option>Status</option>
                      <option value="1">Active</option>
                      <option value="2">Expired</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>Streams</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>Eligibility</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>sub streams</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      <option>sort by</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                  </>
                )}
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
    </>
  );
};

export default PostBaar;
