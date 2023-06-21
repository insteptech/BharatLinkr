import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Accordion,
  Button,
  Col,
  Form as Bootform,
  Image,
  Row,
} from "react-bootstrap";
import Select from "react-select";
import Creatable from "react-select/creatable";
import { Form, Field } from "react-final-form";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  postFiltersArray,
  postCategoryOptions,
  offlineData,
} from "../../../utils/allJson";
import {
  addOrganisationPost,
  associateCourseByCollege,
  cityByStateIdForPost,
  commonFilterForPost,
  getFilterForQuestionPost,
  getFiltersForJobPost,
  subStreamByMainStreamForPost,
} from "../../../../redux/actions/organisation/postActions";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import { Form as Formboot } from "react-bootstrap";
import { toast } from "react-toastify";

const PostBaar = () => {
  const dispatch = useDispatch();
  const [activeKey, setActiveKey] = useState(0);
  const filterListForPost = useSelector(
    (state) => state.postSlice.postFilterList
  );

  const actionCallByPostCategory = {
    jobs: (types) => {
      dispatch(getFiltersForJobPost());
    },
    internship: (types) => {
      dispatch(getFiltersForJobPost());
    },
    question: (types) => {
      dispatch(getFilterForQuestionPost());
    },
  };

  const listData = {
    status: { list: offlineData["status"], value: "id", label: "name" },
    department: {
      list: filterListForPost["department"],
      value: "id",
      label: "mainStreamName",
    },
    subDepartment: {
      list: filterListForPost["subDepartment"],
      value: "id",
      label: "subStreamName",
    },
    state: { list: filterListForPost["state"], value: "id", label: "state" },
    city: { list: filterListForPost["city"], value: "id", label: "name" },
    workMode: {
      list: offlineData["workMode"],
      value: "modeName",
      label: "modeName",
    },
    jobType: {
      list: offlineData["jobType"],
      value: "jobTypeName",
      label: "jobTypeName",
    },
    jobRole: { list: filterListForPost["jobRole"], value: "id", label: "name" },
    eligibility: {
      list: filterListForPost["eligibility"],
      value: "id",
      label: "name",
    },
    organization: {
      list: filterListForPost["organization"],
      value: "id",
      label: "orgCatgeory",
    },
    college: {
      list: filterListForPost["college"],
      value: "id",
      label: "collegeName",
    },
    course: {
      list: filterListForPost["course"],
      value: "id",
      label: "courseName",
    },
    exam: { list: filterListForPost["exam"], value: "id", label: "examName" },
    corporate: {
      list: filterListForPost["corporate"],
      value: "id",
      label: "topicName",
    },
  };

  const handleSubmit = (values, form) => {
    let formData = new FormData();
    let tempValues = { ...values };
    postFiltersArray.forEach((item) => {
      if (item.postTypes.includes(values.postTypes)) {
        tempValues[item.key] = values[item.key]["value"];
      } else {
        delete tempValues[item.key];
      }
    });
    let data = { payload: [tempValues] };
    formData.append("organisationPostData", JSON.stringify(data));
    dispatch(addOrganisationPost(formData)).then((res) => {
      if (res.payload.success) {
        setActiveKey(0);
        toast.success("Post Created Succesfully");
        form.reset();
      } else {
        form.reset();
      }
    });
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      // minWidth: 180,
      borderRadius: "40px",
      fontFamily: "Inter",
      fontSize: "13px",
      lineHeight: "22px",
      color: "#22242c",
      border: "0.0313rem solid #45319697",
      // border: '1px solid #8e8ea1',
      padding: " 1px 10px",
      marginBottom: "10px",
      fontFamily: "poppins",
    }),
    option: (styles, { isFocused }) => {
      return {
        ...styles,
        backgroundColor: isFocused ? "#463196" : null,
        color: isFocused ? "#fff" : null,
      };
    },
  };
  const handlePostCategory = ({ target: { value } }) => {
    actionCallByPostCategory[value] && actionCallByPostCategory[value](value);
  };

  const renderFilterOptions = (types) => {
    const { list, label, value } = listData[types];
    return list.map((item) => {
      return { label: item[label], value: item[value] };
    });
  };

  const handleListApi = (key, value, form) => {
    switch (key) {
      case "state": {
        form.change("city", "");
        dispatch(cityByStateIdForPost({ stateId: value.value }));
        break;
      }
      case "department": {
        form.change("subDepartment", "");
        dispatch(subStreamByMainStreamForPost({ mainStreamId: value.value }));
        break;
      }
      // case 'college': {
      //   form.change('course', "")
      //   dispatch(associateCourseByCollege({ id: value.value }))
      //   break;
      // }
      default:
        break;
    }
  };

  useEffect(() => {
    if (activeKey) dispatch(commonFilterForPost());
  }, [activeKey]);

  return (
    <>
      <Accordion
        className=" post_bar"
        activeKey={activeKey}
        onSelect={(key) => setActiveKey(key)}
      >
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
              // initialValues={initialState}
              render={({ handleSubmit, values, form }) => (
                <form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={12}>
                      <Field name="postTypes">
                        {({ input, meta }) => (
                          <>
                            <Formboot.Select
                              {...input}
                              onChange={(e) => {
                                input.onChange(e);
                                handlePostCategory(e);
                              }}
                              className="font_13 w-100 input_padding"
                            >
                              {postCategoryOptions?.map((item, index) => {
                                return (
                                  <option
                                    key={`postTypes_${index}`}
                                    value={item?.value}
                                  >
                                    {item?.label}
                                  </option>
                                );
                              })}
                            </Formboot.Select>
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
                    <Col md={12} className="wrap_select_div">
                      <ScrollingCarousel show={5.5} slide={4} swiping={true}>
                        {postFiltersArray.map((filterItems, filterIndex) =>
                          filterItems.key === "jobRole"
                            ? filterItems.postTypes.includes(
                                values.postTypes
                              ) && (
                                <div
                                  className="me-2 react_select"
                                  key={`postFilter_${filterItems.key}_${filterIndex}`}
                                >
                                  <label className="react_select_lable font_13">
                                    {filterItems.displayName}
                                  </label>
                                  <Field name={filterItems.key}>
                                    {({ input, meta }) => (
                                      <Creatable
                                        {...input}
                                        styles={customStyles}
                                        placeholder="Select JobRole"
                                        isDisabled={filterItems.isDisabled(
                                          values
                                        )}
                                        options={renderFilterOptions(
                                          filterItems.key
                                        )}
                                      />
                                    )}
                                  </Field>
                                </div>
                              )
                            : filterItems.postTypes.includes(
                                values.postTypes
                              ) && (
                                <div
                                  className="me-2 react_select"
                                  key={`postFilter_${filterItems.key}_${filterIndex}`}
                                >
                                  <label className="react_select_lable font_13">
                                    {filterItems.displayName}
                                  </label>
                                  <Field name={filterItems.key}>
                                    {({ input, meta }) => (
                                      <Select
                                        {...input}
                                        styles={customStyles}
                                        options={renderFilterOptions(
                                          filterItems.key
                                        )}
                                        placeholder={`Select ${filterItems.displayName}`}
                                        isDisabled={filterItems.isDisabled(
                                          values
                                        )}
                                        onChange={(e) => {
                                          input.onChange(e);
                                          handleListApi(
                                            filterItems.key,
                                            e,
                                            form
                                          );
                                        }}
                                      />
                                    )}
                                  </Field>
                                </div>
                              )
                        )}
                      </ScrollingCarousel>
                    </Col>
                    <div className="text-center">
                      <Button
                        className="border_btn user_header_login_btn post_bar_post_btn"
                        type="submit"
                      >
                        Post
                      </Button>
                    </div>
                  </Row>
                </form>
              )}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default PostBaar;
