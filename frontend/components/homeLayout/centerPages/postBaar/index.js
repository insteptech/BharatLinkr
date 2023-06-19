import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import React, { useMemo, useState } from "react";
import {
  Accordion,
  Button,
  Col,
  Form as Bootform,
  Image,
  Row,
} from "react-bootstrap";
import Select, { components } from "react-select";
import { Form, Field } from "react-final-form";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const categoryopt = [
  { value: "", label: "category", icon: "/images/script-icon.png" },
  { value: "script", label: "Script", icon: "/images/script-icon.png" },
  {
    value: "announcement",
    label: "Announcement",
    icon: "/images/announcement-icon.png",
  },
  { value: "job", label: "Job", icon: "/images/job-icon.png" },
  { value: "internship", label: "Internship", icon: "/images/intern.png" },
  { value: "mentoring", label: "Mentoring", icon: "/images/more-icon.png" },
  { value: "question", label: "Question", icon: "/images/more-icon.png" },
  { value: "services", label: "Services", icon: "/images/more-icon.png" },
  {
    value: "collegefestives",
    label: "College festives",
    icon: "/images/more-icon.png",
  },
  { value: "scholarship", label: "scholarship", icon: "/images/more-icon.png" },
  {
    value: "culturalevents ",
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
    value: "hiringchallenges",
    label: "Hiring Challenges",
    icon: "/images/more-icon.png",
  },
  {
    value: "campusrecruitment",
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

  const handleChange = (value) => {
    setSelectedlist(value);
    console.log(value.value, "sdfsdfsdf");
  };

  const handleSubmit = (values) => {
    console.log(values);
  };

  const handleinit = (e) => {
    let initialvalues;
    initialvalues = {
      organisationId: "",
      postTypes: "",
      title: "",
      description: "",
      department: "",
      subDepartment: "",
      state: "",
      city: "",
      workMode: "",
      jobType: "",
      jobRole: "",
      eligibility: "",
      college: "",
      course: "",
      exam: "",
      corporate: "",
      status: "",
    };
    return initialvalues;
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

  const list1 = ["hello", "select1", "instep"];
  const list2 = ["hello2", "select2", "instep2"];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      maxWidth: 160,
      borderRadius: "40px",
      fontFamily: "Inter",
      fontSize: "16px",
      lineHeight: "22px",
      color: "#22242c",
      border: "0.0313rem solid #45319697",
      // border: '1px solid #8e8ea1',
      padding: " 1px 10px",
    }),
    option: (styles, { isFocused }) => {
      return {
        ...styles,
        backgroundColor: isFocused ? "#463196" : null,
        color: isFocused ? "#fff" : null,
      };
    },
  };

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
            <Form
              onSubmit={handleSubmit}
              initialValues={useMemo((e) => handleinit(e), [])}
              render={({ handleSubmit, values }) => (
                <form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={12}>
                      <Field name="postTypes">
                        {({ input, meta }) => (
                          <>
                            {/* <Select
                          {...input}
                          className="font_13"
                          value={selectedlist}
                          options={categoryopt}
                          onChange={handleChange}
                          components={{
                            Option,
                            SingleValue,
                          }}
                        /> */}
                            <select
                              className="font_13 w-100 input_padding"
                              {...input}
                            >
                              {categoryopt?.map((item, index) => {
                                return (
                                  <option key={index} value={item?.value}>
                                    {item?.label}
                                  </option>
                                );
                              })}
                            </select>
                          </>
                        )}
                      </Field>
                    </Col>
                    <Col md={12}>
                      <div>
                        {values.postTypes !== "script" && (
                          <>
                            <Field name="title">
                              {({ input, meta }) => (
                                <>
                                  {console.log(values, "ooooooooooooo")}
                                  <input
                                    {...input}
                                    className=" input_padding"
                                    type="text"
                                    placeholder="Write Title here..."
                                  />
                                </>
                              )}
                            </Field>
                          </>
                        )}
                      </div>
                    </Col>
                    <Col md={12}>
                      <div>
                        <Field name="description">
                          {({ input, meta }) => (
                            <>
                              <Bootform.Control
                                {...input}
                                className="form-control  input_padding post_summary_input margin_bottom"
                                as="textarea"
                                placeholder="Write Description here.."
                                aria-label="With textarea"
                              />
                            </>
                          )}
                        </Field>
                      </div>
                    </Col>
                    <Col md={12} className="">
                      <div className="">

                        {values?.postTypes === "collegefestives" || values?.postTypes === "" && (
                          <>
                            <div className="me-2">
                              <label>{values?.postTypes === "job" || values?.postTypes === "internship" ?'Department': "Streams"}</label>
                              <Select
                                styles={customStyles}
                                isSearchable={true}
                                options={list1.map(item => {
                                  return {
                                    label: item,
                                    value: item
                                  }
                                })}
                              />
                            </div>
                          </>
                        )}
                        {values?.postTypes === "internship" || values?.postTypes === "job" && (
                          <>
                            <div className="me-2">
                              <label>State</label>
                              <Select
                                isSearchable={true}
                                options={list2.map(item => {
                                  return {
                                    label: item,
                                    value: item
                                  }
                                })}
                              />
                            </div>
                          </>
                        )}
                        {values?.postTypes === "internship" || values?.postTypes === "job" && (
                          <>
                            <div className="me-2">
                              <label>City</label>
                              <Select
                                isSearchable={true}
                                options={list2.map(item => {
                                  return {
                                    label: item,
                                    value: item
                                  }
                                })}
                              />
                            </div>
                          </>
                        )}
                        {values?.postTypes === "internship" || values?.postTypes === "job" && (
                          <>
                            <div className="me-2">
                              <label>work mode</label>
                              <Select
                                isSearchable={true}
                                options={list2.map(item => {
                                  return {
                                    label: item,
                                    value: item
                                  }
                                })}
                              />
                            </div>
                          </>
                        )}
                        {values?.postTypes === "internship" || values?.postTypes === "job" && (
                          <>
                            <div className="me-2">
                              <label>job type</label>
                              <Select
                                isSearchable={true}
                                options={list2.map(item => {
                                  return {
                                    label: item,
                                    value: item
                                  }
                                })}
                              />
                            </div>
                          </>
                        )}
                        {values?.postTypes === "internship" || values?.postTypes === "job" && (
                          <>
                            <div className="me-2">
                              <label>job role</label>
                              <Select
                                isSearchable={true}
                                options={list2.map(item => {
                                  return {
                                    label: item,
                                    value: item
                                  }
                                })}
                              />
                            </div>
                          </>
                        )}
                        {values?.postTypes === "collegefestives" || values?.postTypes === "services" || values?.postTypes === "question" || values?.postTypes === "mentoring" && (
                          <>
                            <div className="me-2">
                              <label>Eligibility</label>
                              <Select
                                isSearchable={true}
                                options={list2.map(item => {
                                  return {
                                    label: item,
                                    value: item
                                  }
                                })}
                              />
                            </div>
                          </>
                        )}

                        {values?.postTypes === "job" ||
                          values?.postTypes === "internship" ||
                          values?.postTypes === "mentoring" ||
                          values?.postTypes === "question" ||
                          values?.postTypes === "services" ||
                          values?.postTypes === "scholarship" ||
                          values?.postTypes === "culturalevents" ||
                          values?.postTypes === "conferences" ||
                          values?.postTypes === "competitions" ||
                          values?.postTypes === "hackathon" ||
                          values?.postTypes === "hiringchallenges" ||
                          (values?.postTypes === "campusrecruitment" && (
                            <>
                              <div className="me-2 react_select">
                                <label>
                                  {values?.postTypes === "job" ||
                                  values?.postTypes === "internship"
                                    ? "Sub Department"
                                    : "Sub Streams"}
                                </label>
                                <Select
                                  styles={customStyles}
                                  isSearchable={true}
                                  options={list2.map((item) => {
                                    return {
                                      label: item,
                                      value: item,
                                    };
                                  })}
                                />
                              </div>
                            </>
                          ))}
                        {values?.postTypes === "question" && (
                          <>
                            <div className="me-2 react_select">
                              <label>Organization</label>
                              <Select
                                styles={customStyles}
                                isSearchable={true}
                                options={list2.map((item) => {
                                  return {
                                    label: item,
                                    value: item,
                                  };
                                })}
                              />
                            </div>
                          </>
                        )}
                        {values?.postTypes === "question" && (
                          <>
                            <div className="me-2 react_select">
                              <label>College</label>
                              <Select
                                styles={customStyles}
                                isSearchable={true}
                                options={list2.map((item) => {
                                  return {
                                    label: item,
                                    value: item,
                                  };
                                })}
                              />
                            </div>
                          </>
                        )}
                        {values?.postTypes === "question" && (
                          <>
                            <div className="me-2 react_select">
                              <label>Course</label>
                              <Select
                                styles={customStyles}
                                isSearchable={true}
                                options={list2.map((item) => {
                                  return {
                                    label: item,
                                    value: item,
                                  };
                                })}
                              />
                            </div>
                          </>
                        )}
                        {values?.postTypes === "question" && (
                          <>
                            <div className="me-2 react_select">
                              <label>Exam</label>
                              <Select
                                styles={customStyles}
                                isSearchable={true}
                                options={list2.map((item) => {
                                  return {
                                    label: item,
                                    value: item,
                                  };
                                })}
                              />
                            </div>
                          </>
                        )}
                        {values?.postTypes === "question" && (
                          <>
                            <div className="me-2 react_select">
                              <label>Corporate</label>
                              <Select
                                styles={customStyles}
                                isSearchable={true}
                                options={list2.map((item) => {
                                  return {
                                    label: item,
                                    value: item,
                                  };
                                })}
                              />
                            </div>
                          </>
                        )}
                        {values?.postTypes === "internship" ||
                          (values?.postTypes === "job" && (
                            <>
                              <div className="me-2 react_select">
                                <label>Course</label>
                                <Select
                                  styles={customStyles}
                                  isSearchable={true}
                                  options={list2.map((item) => {
                                    return {
                                      label: item,
                                      value: item,
                                    };
                                  })}
                                />
                              </div>
                            </>
                          ))}
                      </div>
                    </Col>
                  </Row>
                </form>
              )}
            />

            {/* {selectedlist.value === "script" ? (
              ""
            ) : (
              <input
                className=" input_padding"
                type="text"
                placeholder="Write Title here..."
              />
            )}
            <div>
              <Bootform.Control
                className="form-control  input_padding post_summary_input margin_bottom"
                as="textarea"
                placeholder="Write Description here.."
                aria-label="With textarea"
              />
            </div>
            <div className="dropdown_row">
              <ScrollingCarousel show={5.5} slide={4} swiping={true}>
                {selectedlist.value === "Announcement" && (
                  <Bootform.Select aria-label="Default select example">
                    <option>Status</option>
                    <option value="1">Active</option>
                    <option value="2">Expired</option>
                  </Bootform.Select>
                )} */}
            {/* {selectedlist.value === "job" && (
                  <>
                    <Bootform.Select aria-label="Default select example">
                      <option>Status</option>
                      <option value="1">Active</option>
                      <option value="2">Expired</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>Documents</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>Location</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>work mode</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>job type</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>job role</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>eligibility</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>Sub Department</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>sort by</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                  </>
                )} */}
            {/* {selectedlist.value === "internship" && (
                  <>
                    <Bootform.Select aria-label="Default select example">
                      <option>Status</option>
                      <option value="1">Active</option>
                      <option value="2">Expired</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>Documents</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>Location</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>work mode</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>job type</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>job role</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>eligibility</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>Sub Department</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>sort by</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                  </>
                )}
                {selectedlist.value === "mentoring" && (
                  <>
                    <Bootform.Select aria-label="Default select example">
                      <option>Streams</option>
                      <option value="1">Active</option>
                      <option value="2">Expired</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>sub streams</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>sort by</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                  </>
                )}
                {selectedlist.value === "question" && (
                  <>
                    <Bootform.Select aria-label="Default select example">
                      <option>Streams</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>Organization</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>College</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>Course</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>Exam</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>Corporate</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>sub streams</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>sort by</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                  </>
                )}
                {selectedlist.value === "services" && (
                  <>
                    <Bootform.Select aria-label="Default select example">
                      <option>Streams</option>
                      <option value="1">Active</option>
                      <option value="2">Expired</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>sub streams</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>sort by</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                  </>
                )}
                {selectedlist.value === "collegefestives" && (
                  <Bootform.Select aria-label="Default select example">
                    <option>Status</option>
                    <option value="1">Active</option>
                    <option value="2">Expired</option>
                  </Bootform.Select>
                )}
                {selectedlist.value === "scholarship" && (
                  <>
                    <Bootform.Select aria-label="Default select example">
                      <option>Status</option>
                      <option value="1">Active</option>
                      <option value="2">Expired</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>Streams</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>Eligibility</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>sub streams</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>sort by</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                  </>
                )}
                {selectedlist.value === "culturalevents " && (
                  <>
                    <Bootform.Select aria-label="Default select example">
                      <option>Status</option>
                      <option value="1">Active</option>
                      <option value="2">Expired</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>Streams</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>Eligibility</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>sub streams</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>sort by</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                  </>
                )}
                {selectedlist.value === "conferences" && (
                  <>
                    <Bootform.Select aria-label="Default select example">
                      <option>Status</option>
                      <option value="1">Active</option>
                      <option value="2">Expired</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>Streams</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>Eligibility</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>sub streams</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>sort by</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                  </>
                )}
                {selectedlist.value === "competitions" && (
                  <>
                    <Bootform.Select aria-label="Default select example">
                      <option>Status</option>
                      <option value="1">Active</option>
                      <option value="2">Expired</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>Streams</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>Eligibility</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>sub streams</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>sort by</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                  </>
                )}
                {selectedlist.value === "hackathon" && (
                  <>
                    <Bootform.Select aria-label="Default select example">
                      <option>Status</option>
                      <option value="1">Active</option>
                      <option value="2">Expired</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>Streams</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>Eligibility</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>sub streams</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>sort by</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                  </>
                )}
                {selectedlist.value === "hiringchallenges" && (
                  <>
                    <Bootform.Select aria-label="Default select example">
                      <option>Status</option>
                      <option value="1">Active</option>
                      <option value="2">Expired</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>Streams</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>Eligibility</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>sub streams</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>sort by</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                  </>
                )}
                {selectedlist.value === "campusrecruitment" && (
                  <>
                    <Bootform.Select aria-label="Default select example">
                      <option>Status</option>
                      <option value="1">Active</option>
                      <option value="2">Expired</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>Streams</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>Eligibility</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>sub streams</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                    <Bootform.Select aria-label="Default select example">
                      <option>sort by</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Bootform.Select>
                  </>
                )}
              </ScrollingCarousel>
            </div> */}

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
