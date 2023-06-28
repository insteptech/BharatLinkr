import React, { useEffect, useMemo, useState } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { Field, Form } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators, { push } from "final-form-arrays";
import { useDispatch, useSelector } from "react-redux";
import CKeditorGenerator from "../../../components/admin/Ckeditor/CKeditor";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { getMainCategory } from "../../../redux/actions/corporate/addmaincategory";
import { getSubCategory } from "../../../redux/actions/corporate/addsubcategory";
import {
  addMockTestCorporate,
  getMockTestbyid,
  updateMocktest,
} from "../../../redux/actions/corporate/addmocktestcorporate";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";

function AddMockTest() {
  const FormSteps = ["Questions", "Responses"];
  const FormStep = ["Mock Test"];
  const [dataValue, setDataValue] = useState(0);
  const [FileState, setFileState] = useState([]);

  const dispatch = useDispatch();
  const router = useRouter();

  const { Id } = router.query;

  useEffect(() => {
    dispatch(getMainCategory());
    dispatch(getSubCategory());
  }, []);

  const subcategoryList = useSelector(
    (state) => state?.corporateSubCategory?.addsubcategory?.rows
  );

  const maincategoryData = useSelector(
    (state) => state?.corporateCategory?.addmaincategory?.rows
  );

  const getMocktestDetails = useSelector((state) => {
    if (state?.corporateMocktest?.mocktest?.rows?.length > 0) {
      return state?.corporateMocktest?.mocktest?.rows[0];
    }
  });

  const handleSubmit = (value) => {
    if (!Id) {
      var formData = new FormData();
      let tempValues = { ...value };
      FileState.map((item, i) => {
        let name = item?.name;
        let uid = item?.file?.name.split("_")[0];
        value.MocktestQuestions[item.index][name].uniqueId = uid;
        if (name === "OptionAData") {
          formData.append("optionAFile", item.file);
        }
        if (name === "OptionBData") {
          formData.append("optionBFile", item.file);
        }
        if (name === "OptionCData") {
          formData.append("optionCFile", item.file);
        }
        if (name === "OptionDData") {
          formData.append("optionDFile", item.file);
        }
        if (name === "QuestionData") {
          formData.append("questionFile", item.file);
        }
      });

      let data = {
        payload: [
          {
            MockTest: [
              {
                ...tempValues.MockTest[0],
                totalMarksOfTest:
                  value?.MockTest[0]?.questionMarks *
                  value?.MocktestQuestions?.length,
              },
            ],
            MocktestQuestions: [...tempValues.MocktestQuestions],
          },
        ],
      };

      formData.append("mockTestData", JSON.stringify(data));

      if (formData != 0) {
        dispatch(addMockTestCorporate(formData)).then((res) => {
          if (res?.payload?.status === 200 && res?.payload?.data?.success) {
            router.push("/admin/corporate/mocktest/table");
            toast.success("Added successfully", { autoClose: 1000 });
          } else {
            toast.error("something went wrong", { autoClose: 1000 });
          }
        });
      }
    } else {
      let datamocktestquestion = value.MocktestQuestions.map((item) => {
        return {
          id: item?.id,
          mockTestId: Number(Id),
          QuestionData: { question: item?.QuestionData?.question },
          type: item?.type,
          OptionAData: { optionA: item?.OptionAData?.optionA },
          OptionBData: { optionB: item?.OptionBData?.optionB },
          OptionCData: { optionC: item?.OptionCData?.optionC },
          OptionDData: { optionD: item?.OptionDData?.optionD },
          answer: item?.answer[0],
        };
      });

      let datamocktest = value.MockTest.map((item) => {
        return {
          id: getMocktestDetails?.id,
          mainCategoryId: item.mainCategoryId,
          subCategoryId: item.subCategoryId,
          topicName: item.topicName,
          subTopic: item?.subTopic,
          feildName: item?.feildName,
          totalMarksOfTest: item?.totalMarksOfTest,
          questionMarks: item?.questionMarks,
          totalTime: item?.totalTime,
          totalQuestions: item?.totalQuestions,
          MocktestQuestions: datamocktestquestion,
        };
      });

      var formdata = new FormData();

      let dataval = {
        payload: datamocktest,
      };

      formdata.append("mockTestData", JSON.stringify(dataval));

      if (formdata != 0 && dataval) {
        dispatch(updateMocktest(formdata)).then((res) => {
          if (res?.payload?.data?.success) {
            router.push("/admin/corporate/addcorporate");
            toast.success("Updated", { autoClose: 1000 });
          } else {
            toast.error("Error", { autoClose: 1000 });
          }
        });
      }
    }
  };

  const handlefileremoval = (i) => {
    if (FileState.length > 0) {
      let x = [];
      FileState.map((item) => {
        if (item.index > i) {
          item.index = item.index - 1;
          x.push(item);
        }
        if (item.index < i) {
          x.push(item);
        }
      });
      setFileState(x);
    }
  };

  const handleFileChange = (filesObject, name, index) => {
    const uniqueId = Date.now();
    const filename = uniqueId + "_" + filesObject[0].name;
    let file = new File(filesObject, filename);

    file["nameType"] = name;

    if (FileState.length === 0) {
      setFileState([{ file: file, index: index, name: name }]);
    } else {
      let x = FileState;
      FileState.map((item, i) => {
        if (item.name === name && item.index === index) {
          x.splice(i, 1);
          x.push({ file: file, index: index, name: name });
          setFileState(x);
        } else {
          setFileState([
            ...FileState,
            { file: file, index: index, name: name },
          ]);
        }
      });
    }
  };

  const setInitials = () => {
    if (Id) {
      const initialValues = {
        MockTest: [
          {
            id: getMocktestDetails?.id,
            mainCategoryId: getMocktestDetails?.MainCategory?.id,
            subCategoryId: getMocktestDetails?.SubCategory?.id,
            topicName: getMocktestDetails?.topicName,
            subTopic: getMocktestDetails?.subTopic,
            feildName: getMocktestDetails?.feildName,
            totalMarksOfTest: getMocktestDetails?.totalMarksOfTest,
            questionMarks: getMocktestDetails?.questionMarks,
            totalTime: getMocktestDetails?.totalTime,
            totalQuestions: getMocktestDetails?.totalQuestions,
          },
        ],

        MocktestQuestions: getMocktestDetails?.Questions?.map((ques) => ({
          id: ques?.id,
          QuestionData: { question: ques?.question },
          type: ques?.type,
          OptionAData: { optionA: ques?.optionA },
          OptionBData: { optionB: ques?.optionB },
          OptionCData: { optionC: ques?.optionC },
          OptionDData: { optionD: ques?.optionD },
          answer: ques?.Answerss?.map((ans) => {
            return ans?.answer;
          }),
        })),
      };
      return initialValues;
    } else {
      const initialValues = {
        MockTest: [
          {
            mainCategoryId: "",
            subCategoryId: "",
            topicName: "",
            subTopic: "",
            feildName: "",
            totalMarksOfTest: "",
            questionMarks: "",
            totalTime: "",
            totalQuestions: "",
          },
        ],

        MocktestQuestions: [
          {
            QuestionData: { question: "" },
            type: "",
            OptionAData: { optionA: "" },
            OptionBData: { optionB: "" },
            OptionCData: { optionC: "" },
            OptionDData: { optionD: "" },
            answer: "",
          },
        ],
      };
      return initialValues;
    }
  };

  useEffect(() => {
    if (Id) {
      dispatch(getMockTestbyid(Id));
    }
  }, [Id]);

  const validate = (values) => {
    let errors = {};
    let itemArray1 = [];
    let itemArray2 = [];

    values?.MockTest?.forEach((item) => {
      const error = {};
      if (!item?.mainCategoryId) {
        error["mainCategoryId"] = "*";
      }
      if (!item?.subCategoryId) {
        error["subCategoryId"] = "*";
      }
      if (!item?.topicName) {
        error["topicName"] = "*";
      }
      if (!item?.feildName) {
        error["feildName"] = "*";
      }
      if (!item?.subTopic) {
        error["subTopic"] = "*";
      }
      // if (!item?.totalMarksOfTest) {
      //   error["totalMarksOfTest"] = "*";
      // }
      if (!item?.questionMarks) {
        error["questionMarks"] = "*";
      }
      if (!item?.totalTime) {
        error["totalTime"] = "*";
      }
      if (!item?.totalQuestions) {
        error["totalQuestions"] = "*";
      }
      itemArray1.push(error);
    });
    errors["MockTest"] = itemArray1;

    values?.MocktestQuestions?.map((item) => {
      const error = {};
      if (!item?.QuestionData?.question) {
        error["QuestionData"] = {};
        error["QuestionData"]["question"] = "*";
      }
      if (!item?.type) {
        error["type"] = "*";
      }
      if (!item?.OptionAData?.optionA) {
        error["OptionAData"] = {};
        error["OptionAData"]["optionA"] = "*";
      }
      if (!item?.OptionBData?.optionB) {
        error["OptionBData"] = {};
        error["OptionBData"]["optionB"] = "*";
      }
      if (!item?.OptionCData?.optionC) {
        error["OptionCData"] = {};
        error["OptionCData"]["optionC"] = "*";
      }
      if (!item?.OptionDData?.optionD) {
        error["OptionDData"] = {};
        error["OptionDData"]["optionD"] = "*";
      }
      if (!item?.answer) {
        error["answer"] = "*";
      }
      itemArray2.push(error);
    });
    errors["MocktestQuestions"] = itemArray2;
    return errors;
  };

  return (
    <>
      <Row>
        <Col lg={6} md={12} className="p-0">
          <ScrollingCarousel show={5.5} slide={4} swiping={true}>
            <ul className="nav tabs_scroll">
              {FormStep &&
                FormStep?.map((steps, stepsIndex) => (
                  <li className="nav-item " key={stepsIndex}>
                    <a
                      className={`nav-link admin_tabs_name ${dataValue === stepsIndex && "head-active"
                        }`}
                      active={true}
                      onClick={() => setDataValue(stepsIndex)}
                    >
                      {steps}
                    </a>
                  </li>
                ))}
            </ul>
          </ScrollingCarousel>
        </Col>
        <hr></hr>
      </Row>
      <Form
        onSubmit={handleSubmit}
        mutators={{
          ...arrayMutators,
        }}
        keepDirtyOnReinitialize
        validate={validate}
        initialValues={useMemo(() => setInitials())}
        render={({ handleSubmit, submitFailed, values }) => (
          <form onSubmit={handleSubmit}>
            <FieldArray name="MockTest">
              {({ fields }) => (
                <>
                  {fields?.map((name, index) => (
                    <div>
                      <Row>
                        <Col md={12} lg={6}>
                          <Field name={`${name}.mainCategoryId`}>
                            {({ input, meta }) => (
                              <>
                                <div className="d-flex" key={index}>
                                  <label className="signup_form_label">
                                    Select Category
                                  </label>
                                </div>
                                <select
                                  {...input}
                                  className="form-control select-style signup_form_input"
                                >
                                  <option value={null}>Main Category</option>
                                  {maincategoryData &&
                                    maincategoryData?.map((item, index) => (
                                      <option key={index} value={item.id}>
                                        {item?.mainCategory}
                                      </option>
                                    ))}
                                </select>
                                <div className="text-end">
                                  <img
                                    className="select_down_icon"
                                    src="/images/down.png"
                                  />
                                </div>

                                {meta.error && submitFailed && meta.touched && (
                                  <span className="text-danger">
                                    {meta.error || submitFailed}
                                  </span>
                                )}
                              </>
                            )}
                          </Field>
                        </Col>
                        <Col md={12} lg={6}>
                          <Field name={`${name}.subCategoryId`}>
                            {({ input, meta }) => (
                              <>
                                <div className="d-flex">
                                  <label className="signup_form_label">
                                    Sub Category
                                  </label>
                                </div>
                                <select
                                  {...input}
                                  className="form-control select-style signup_form_input"
                                >
                                  <option value="">Select Category</option>
                                  {subcategoryList &&
                                    subcategoryList?.map((item, index) => (
                                      <option key={index} value={item.id}>
                                        {item.subCategory}
                                      </option>
                                    ))}
                                </select>
                                <div className="text-end">
                                  <img
                                    className="select_down_icon"
                                    src="/images/down.png"
                                  />
                                </div>
                                {meta.error && submitFailed && meta.touched && (
                                  <span className="text-danger">
                                    {meta.error}
                                  </span>
                                )}
                              </>
                            )}
                          </Field>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={6} md={12}>
                          <Field name={`${name}.topicName`}>
                            {({ input, meta }) => (
                              <div>
                                <label className="signup_form_label">
                                  Topic Name
                                </label>
                                <input
                                  {...input}
                                  type="text"
                                  className="form-control signup_form_input margin_bottom"
                                  placeholder="Enter Topic Name"
                                />
                                {meta.error && submitFailed && meta.touched && (
                                  <span className="text-danger">
                                    {meta.error || submitFailed}
                                  </span>
                                )}
                              </div>
                            )}
                          </Field>
                        </Col>
                        <Col lg={6} md={12}>
                          <Field name={`${name}.feildName`}>
                            {({ input, meta }) => (
                              <div>
                                <label className="signup_form_label">
                                  Field Name
                                </label>
                                <input
                                  {...input}
                                  type="text"
                                  className="form-control signup_form_input margin_bottom"
                                  placeholder="field name"
                                />
                                {meta.error && submitFailed && meta.touched && (
                                  <span className="text-danger">
                                    {meta.error || submitFailed}
                                  </span>
                                )}
                              </div>
                            )}
                          </Field>
                        </Col>
                        <Col lg={6} md={12}>
                          <Field name={`${name}.subTopic`}>
                            {({ input, meta }) => (
                              <div>
                                <label className="signup_form_label">
                                  Sub-Topic Name
                                </label>
                                <input
                                  {...input}
                                  type="text"
                                  className="form-control signup_form_input margin_bottom"
                                  placeholder="Enter Sub-Topic Name"
                                />
                                {meta.error && submitFailed && meta.touched && (
                                  <span className="text-danger">
                                    {meta.error || submitFailed}
                                  </span>
                                )}
                              </div>
                            )}
                          </Field>
                        </Col>
                        <Col lg={6} md={12}>
                          <label className="signup_form_label">
                            Total Time
                          </label>
                          <div className=" year_div">
                            <div className="year_1st">
                              <Field name={`${name}.totalTime`}>
                                {({ input, meta }) => (
                                  <div>
                                    <input
                                      {...input}
                                      type="number"
                                      className="form-control signup_form_input input_right_border"
                                      placeholder="Hrs/Mins"
                                    />
                                    {meta.error &&
                                      submitFailed &&
                                      meta.touched && (
                                        <span className="text-danger">
                                          {meta.error || submitFailed}
                                        </span>
                                      )}
                                  </div>
                                )}
                              </Field>
                            </div>
                            <div className="">
                              <Field
                                name={`${name}.timeType`}
                                component="select"
                                className="form-control select-style signup_form_input input_bg"
                              >
                                <option>Hrs</option>
                                <option>Minutes</option>
                              </Field>
                              <div className="text-end">
                                <img
                                  className="select_down_icon"
                                  src="/images/down.png"
                                />
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col lg={6} md={12}>
                          <Field name={`${name}.questionMarks`}>
                            {({ input, meta }) => (
                              <div>
                                <label className="signup_form_label">
                                  Question Marks
                                </label>
                                <input
                                  {...input}
                                  type="text"
                                  className="form-control signup_form_input margin_bottom"
                                  placeholder="Total Marks Of One Question"
                                />
                                {meta.error && submitFailed && meta.touched && (
                                  <span className="text-danger">
                                    {meta.error || submitFailed}
                                  </span>
                                )}
                              </div>
                            )}
                          </Field>
                        </Col>

                        <Col md={12} lg={6}>
                          <Field name={`${name}.totalQuestions`}>
                            {({ input, meta }) => (
                              <div>
                                <label className="signup_form_label">
                                  Total Questions
                                </label>
                                <input
                                  {...input}
                                  type="text"
                                  className="form-control signup_form_input margin_bottom"
                                  placeholder="Enter Total Number Of Questions"
                                />
                                {meta.error && submitFailed && meta.touched && (
                                  <span className="text-danger">
                                    {meta.error || submitFailed}
                                  </span>
                                )}
                              </div>
                            )}
                          </Field>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={6} md={12}>
                          <Field name={`${name}.totalMarksOfTest`}>
                            {({ input, meta }) => (
                              <div>
                                <label className="signup_form_label">
                                  Total Marks Of Test
                                </label>
                                <input
                                  {...input}
                                  value={
                                    values?.MockTest[0]?.questionMarks *
                                    values?.MocktestQuestions?.length
                                  }
                                  disabled="true"
                                  type="text"
                                  className="form-control signup_form_input margin_bottom"
                                  placeholder="Enter Total Marks Of Test"
                                />
                                {meta.error && submitFailed && meta.touched && (
                                  <span className="text-danger">
                                    {meta.error || submitFailed}
                                  </span>
                                )}
                              </div>
                            )}
                          </Field>
                        </Col>
                      </Row>
                    </div>
                  ))}
                </>
              )}
            </FieldArray>
            <div
              style={{
                backgroundColor: "white",
                border: "1px solid #C8C1DF",
                borderRadius: "5px",
                padding: "20px 35px",
              }}
            >
              <div className="admin_home_tabs_row pt-0">
                <Row>
                  <Col className="p-0">
                    <ul className="nav tabs_scroll">
                      {FormSteps &&
                        FormSteps?.map((steps, stepsIndex) => (
                          <li className="nav-item " key={stepsIndex}>
                            <a
                              className={`nav-link admin_tabs_name ${dataValue === stepsIndex && "head-active"
                                }`}
                              active={true}
                              onClick={() => setDataValue(stepsIndex)}
                            >
                              {steps}
                            </a>
                          </li>
                        ))}
                    </ul>
                  </Col>
                </Row>
              </div>
              {dataValue === 0 && (
                <>
                  <Tabs defaultActiveKey={0} className="mb-3">
                    <Tab
                      style={{
                        padding: "10px",
                        border: "1px solid black",
                        borderRadius: "5px",
                        backgroundColor: "#FFF",
                      }}
                      eventKey={0}
                    // title="General"
                    >
                      <FieldArray name="MocktestQuestions">
                        {({ fields }) => (
                          <>
                            {fields?.map((name, index) => (
                              <div key={index}>
                                <h3 className="text-center">
                                  Question no. {index + 1}
                                </h3>
                                <div className="d-flex justify-content-end">
                                  <Row>
                                    <Col>
                                      <img
                                        onClick={() => {
                                          if (
                                            index <
                                            values?.MockTest[0]?.totalQuestions
                                          ) {
                                            fields.push({
                                              QuestionData: {
                                                question: "",
                                              },
                                              type: "",
                                              OptionAData: {
                                                optionA: "",
                                              },
                                              OptionBData: {
                                                optionB: "",
                                              },
                                              OptionCData: {
                                                optionC: "",
                                              },
                                              OptionDData: {
                                                optionD: "",
                                              },
                                              answer: "",
                                            });
                                          }
                                        }}
                                        className="add_remove_icon"
                                        src="/images/question-add-icon.png"
                                      />
                                      {fields.length > 1 && (
                                        <>
                                          <img
                                            onClick={() => {
                                              if (
                                                Id &&
                                                values?.MocktestQuestions[index]
                                                  ?.id
                                              ) {
                                                dispatch(
                                                  deleteMockQuestion({
                                                    mockTestId: Number(
                                                      values?.MockTest[0]?.id
                                                    ),
                                                    id: Number(
                                                      values?.MocktestQuestions[
                                                        index
                                                      ]?.id
                                                    ),
                                                  })
                                                ).then((res) => {
                                                  if (
                                                    res?.payload?.data?.success
                                                  ) {
                                                    fields.remove(index);
                                                    handlefileremoval(index);
                                                  }
                                                });
                                              } else {
                                                fields.remove(index);
                                                handlefileremoval(index);
                                              }
                                            }}
                                            className="add_remove_icon"
                                            src="/images/delete-icon-blue.png"
                                          />
                                        </>
                                      )}
                                    </Col>
                                  </Row>
                                </div>
                                <Field name={`${name}.QuestionData.question`}>
                                  {({ input, meta }) => (
                                    <>
                                      <CKeditorGenerator
                                        input={input}
                                        onReady={(editor) => {
                                          // editor;
                                        }}
                                      />
                                      {meta.error && meta.touched && (
                                        <span className="text-danger">
                                          {meta.error}
                                        </span>
                                      )}
                                    </>
                                  )}
                                </Field>

                                {/* image  */}
                                <Row>
                                  <Col md={12} lg={6}>
                                    <Field
                                      name={`${name}.QuestionData.questionFile`}
                                    >
                                      {({ input, meta }) => (
                                        <div>
                                          <div className="d-flex ">
                                            <label className="signup_form_label">
                                              Image
                                            </label>
                                          </div>
                                          <input
                                            type="file"
                                            name="QuestionData"
                                            onChange={(e) => {
                                              handleFileChange(
                                                e.target.files,
                                                e.target.name,
                                                index
                                              );
                                            }}
                                            className="form-control signup_form_input margin_bottom"
                                            placeholder="Mock Image"
                                          />
                                        </div>
                                      )}
                                    </Field>
                                  </Col>

                                  <Col md={12} lg={6}>
                                    <Field name={`${name}.type`}>
                                      {({ input, meta }) => (
                                        <div>
                                          <label className="signup_form_label">
                                            Select Answer type
                                          </label>
                                          <select
                                            {...input}
                                            className="form-control select-style signup_form_input"
                                          >
                                            <option>select Answer Type</option>
                                            <option>objective</option>
                                            <option>subjective</option>
                                          </select>

                                          <div className="text-end">
                                            <img
                                              className="select_down_icon"
                                              src="/images/down.png"
                                            />
                                          </div>
                                          {meta.error &&
                                            submitFailed &&
                                            meta.touched && (
                                              <span className="text-danger">
                                                {meta.error || submitFailed}
                                              </span>
                                            )}
                                        </div>
                                      )}
                                    </Field>
                                  </Col>
                                </Row>

                                <Row>
                                  <Col lg={6} md={12}>
                                    <Field name={`${name}.OptionAData.optionA`}>
                                      {({ input, meta }) => (
                                        <div>
                                          <label className="signup_form_label">
                                            Option A
                                          </label>
                                          <input
                                            {...input}
                                            type="text"
                                            className="form-control signup_form_input margin_bottom"
                                            placeholder="option A"
                                          />
                                          {meta.error &&
                                            submitFailed &&
                                            meta.touched && (
                                              <span className="text-danger">
                                                {meta.error || submitFailed}
                                              </span>
                                            )}
                                        </div>
                                      )}
                                    </Field>
                                  </Col>

                                  {/* image  */}

                                  <Col md={12} lg={6}>
                                    <Field
                                      name={`${name}.OptionAData.OptionAFile`}
                                    >
                                      {({ files, meta }) => (
                                        <div>
                                          <div className="d-flex ">
                                            <label className="signup_form_label">
                                              Image
                                            </label>
                                            {meta.error && meta.touched && (
                                              <span className="text-danger required_msg">
                                                {meta.error}
                                              </span>
                                            )}
                                          </div>
                                          <input
                                            {...files}
                                            name="OptionAData"
                                            type="file"
                                            onChange={(e) => {
                                              handleFileChange(
                                                e.target.files,
                                                e.target.name,
                                                index
                                              );
                                            }}
                                            className="form-control signup_form_input margin_bottom"
                                            placeholder="Mock Image"
                                          />
                                        </div>
                                      )}
                                    </Field>
                                  </Col>
                                </Row>

                                <Row>
                                  <Col lg={6} md={12}>
                                    <Field name={`${name}.OptionBData.optionB`}>
                                      {({ input, meta }) => (
                                        <div>
                                          <label className="signup_form_label">
                                            Option B
                                          </label>
                                          <input
                                            {...input}
                                            type="text"
                                            className="form-control signup_form_input margin_bottom"
                                            placeholder="option B"
                                          />
                                          {meta.error &&
                                            submitFailed &&
                                            meta.touched && (
                                              <span className="text-danger">
                                                {meta.error || submitFailed}
                                              </span>
                                            )}
                                        </div>
                                      )}
                                    </Field>
                                  </Col>
                                  {/* image  */}

                                  <Col md={12} lg={6}>
                                    <Field
                                      name={`${name}.OptionBData.OptionBData`}
                                    >
                                      {({ input, meta }) => (
                                        <div>
                                          <div className="d-flex ">
                                            <label className="signup_form_label">
                                              Image
                                            </label>
                                            {meta.error && meta.touched && (
                                              <span className="text-danger required_msg">
                                                {meta.error}
                                              </span>
                                            )}
                                          </div>
                                          <input
                                            // {...input}
                                            name="OptionBData"
                                            type="file"
                                            onChange={(e) => {
                                              handleFileChange(
                                                e.target.files,
                                                e.target.name,
                                                index
                                              );
                                            }}
                                            className="form-control signup_form_input margin_bottom"
                                            placeholder="Mock Image"
                                          />
                                        </div>
                                      )}
                                    </Field>
                                  </Col>
                                </Row>

                                <Row>
                                  <Col lg={6} md={12}>
                                    <Field name={`${name}.OptionCData.optionC`}>
                                      {({ input, meta }) => (
                                        <div>
                                          <label className="signup_form_label">
                                            Option C
                                          </label>
                                          <input
                                            {...input}
                                            type="text"
                                            className="form-control signup_form_input margin_bottom"
                                            placeholder="option C"
                                          />
                                          {meta.error &&
                                            submitFailed &&
                                            meta.touched && (
                                              <span className="text-danger">
                                                {meta.error || submitFailed}
                                              </span>
                                            )}
                                        </div>
                                      )}
                                    </Field>
                                  </Col>

                                  {/* image  */}

                                  <Col md={12} lg={6}>
                                    <Field
                                      name={`${name}.OptionCData.optionCFile`}
                                    >
                                      {({ input, meta }) => (
                                        <div>
                                          <div className="d-flex ">
                                            <label className="signup_form_label">
                                              Image
                                            </label>
                                            {meta.error && meta.touched && (
                                              <span className="text-danger required_msg">
                                                {meta.error}
                                              </span>
                                            )}
                                          </div>
                                          <input
                                            // {...input}
                                            name="OptionCData"
                                            type="file"
                                            onChange={(e) => {
                                              handleFileChange(
                                                e.target.files,
                                                e.target.name,
                                                index
                                              );
                                            }}
                                            className="form-control signup_form_input margin_bottom"
                                            placeholder="Mock Image"
                                          />
                                        </div>
                                      )}
                                    </Field>
                                  </Col>
                                </Row>

                                <Row>
                                  <Col lg={6} md={12}>
                                    <Field name={`${name}.OptionDData.optionD`}>
                                      {({ input, meta }) => (
                                        <div>
                                          <label className="signup_form_label">
                                            Option D
                                          </label>
                                          <input
                                            {...input}
                                            type="text"
                                            className="form-control signup_form_input margin_bottom"
                                            placeholder="option D"
                                          />

                                          {meta.error &&
                                            submitFailed &&
                                            meta.touched && (
                                              <span className="text-danger">
                                                {meta.error || submitFailed}
                                              </span>
                                            )}
                                        </div>
                                      )}
                                    </Field>
                                  </Col>

                                  {/* image  */}

                                  <Col md={12} lg={6}>
                                    <Field
                                      name={`${name}.OptionDData.OptionDFile`}
                                    >
                                      {({ input, meta }) => (
                                        <div>
                                          <div className="d-flex ">
                                            <label className="signup_form_label">
                                              Image
                                            </label>
                                            {meta.error && meta.touched && (
                                              <span className="text-danger required_msg">
                                                {meta.error}
                                              </span>
                                            )}
                                          </div>
                                          <input
                                            // {...input}
                                            type="file"
                                            name="OptionDData"
                                            onChange={(e) => {
                                              handleFileChange(
                                                e.target.files,
                                                e.target.name,
                                                index
                                              );
                                            }}
                                            className="form-control signup_form_input margin_bottom"
                                            placeholder="Mock Image"
                                          />
                                        </div>
                                      )}
                                    </Field>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <Field name={`${name}.answer`}>
                                      {({ input, meta }) => (
                                        <div className="w-100">
                                          <label className="signup_form_label">
                                            Answer
                                          </label>
                                          <select
                                            {...input}
                                            className="form-control select-style signup_form_input"
                                          >
                                            <option value="">
                                              select option
                                            </option>
                                            <option value="optionA">
                                              option A
                                            </option>
                                            <option value="optionB">
                                              option B
                                            </option>
                                            <option value="optionC">
                                              option C
                                            </option>
                                            <option value="optionD">
                                              option D
                                            </option>
                                          </select>
                                          <div className="text-end">
                                            <img
                                              className="select_down_icon"
                                              src="/images/down.png"
                                            />
                                          </div>
                                          {meta.error &&
                                            submitFailed &&
                                            meta.touched && (
                                              <span className="text-danger">
                                                {meta.error || submitFailed}
                                              </span>
                                            )}
                                        </div>
                                      )}
                                    </Field>
                                  </Col>

                                  <Col>
                                    <Field name={`${name}.level`}>
                                      {({ input, meta }) => (
                                        <div className="w-100">
                                          <label className="signup_form_label">
                                            Level
                                          </label>
                                          <select
                                            {...input}
                                            className="form-control select-style signup_form_input"
                                          >
                                            <option value="">level</option>
                                            <option value="beginner">
                                              Beginner
                                            </option>
                                            <option value="intermediate">
                                              Intermidiate
                                            </option>
                                            <option value="advance">
                                              Advanced
                                            </option>
                                          </select>
                                          {meta.error &&
                                            submitFailed &&
                                            meta.touched && (
                                              <span className="text-danger">
                                                {meta.error || submitFailed}
                                              </span>
                                            )}
                                        </div>
                                      )}
                                    </Field>
                                    <div className="text-end">
                                      <img
                                        className="select_down_icon"
                                        src="/images/down.png"
                                      />
                                    </div>
                                  </Col>
                                </Row>

                                <hr></hr>
                              </div>
                            ))}
                          </>
                        )}
                      </FieldArray>
                    </Tab>
                  </Tabs>
                </>
              )}
              {dataValue === 1 && (
                <>
                  <Row className="mt-3">
                    <Col>
                      <p style={{ color: "#1BA643" }}>10 Responses</p>
                    </Col>
                    <Col className="d-flex justify-content-end">
                      <div className="me-3">
                        <img src="/images/xls-file-icon.png" />
                        <a
                          style={{
                            textDecoration: "underline",
                            color: "#1BA643",
                          }}
                        >
                          Download CSV
                        </a>
                      </div>
                      <div className="me-3">
                        <img src="/images/grey-check.png" />
                        <a
                          style={{
                            textDecoration: "underline",
                            color: "#939198",
                          }}
                        >
                          Not Accepting Responses
                        </a>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h5 style={{ color: "#939198" }}>Responses Here</h5>
                    </Col>
                  </Row>
                </>
              )}
            </div>

            <Row>
              <Col className="text-center">
                <button
                  className="admin_signup_btn admin_signup_btn_mobile"
                  type="submit"
                >
                  {Id ? "Update" : "Submit"}
                </button>
              </Col>
            </Row>
          </form>
        )}
      />
    </>
  );
}

export default AddMockTest;
