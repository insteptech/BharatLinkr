import React, { useEffect, useMemo, useState } from "react";
import { Button, Col, Row, Tab, Table, Tabs } from "react-bootstrap";
import { Field, Form, useForm } from "react-final-form";
import AddMockTest from "./mockTest/addMockTest";
import MockTable from "./mockTest/mockTable";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import {
  CorporateData,
  getCorporateById,
  updateCorporate,
} from "../../../redux/actions/corporate/addcorporate";
import { getAllMasterFilter } from "../../../redux/actions/masterfilter/createmasterfilter";
import { useRouter } from "next/router";
import { getMainCategory } from "../../../redux/actions/corporate/addmaincategory";
import { getSubCategory } from "../../../redux/actions/corporate/addsubcategory";
import { getAllExams } from "../../../redux/actions/exams/createExam";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import { toast } from "react-toastify";

const CKeditorGenerator = dynamic(() => import("../Ckeditor/CKeditor"), {
  ssr: false,
});

export default function AddCorporate() {
  const FormSteps = ["Register", "CMS", "Mock Test"];
  const [dataValue, setDataValue] = useState(0);
  const [mockTableStatus, setMockTableStatus] = useState("MockTable");
  const [FileState, setFileState] = useState([]);
  const masterfiltervalues = useSelector(
    (data) => data?.allMasterFilterList?.masterfilterlist?.data?.data
  );

  const dispatch = useDispatch();

  const corporateCMS = [{ title: "Corporate about", key: "about" }];

  const updateCorporateList = useSelector(
    (state) => state?.corporateData?.getCorporateId
  );

  const subcategoryList = useSelector(
    (state) => state?.corporateSubCategory?.addsubcategory?.rows
  );

  const maincategoryData = useSelector(
    (state) => state?.corporateCategory?.addmaincategory?.rows
  );

  const router = useRouter();
  const { Id } = router.query;

  const handleSubmit = (value) => {
    if (!Id) {
      if (dataValue == 0) {
        setDataValue(1);
      } else if (dataValue == 1) {
        const applyData = {
          payload: [
            {
              Corporate: [
                {
                  feildName: value?.feildName,
                  topicName: value?.topicName,
                  subTopic: value?.subTopic,
                  subCategoryId: value?.subCategory,
                  mainCategoryId: value?.mainCategory,
                  //           views: 21,
                  //           downloads: 12,
                  //           likes: 2,
                },
              ],
              CorporateCMS: [
                {
                  about: value?.CorporateCMS[0]?.about,
                },
              ],
            },
          ],
        };
        var formData = new FormData();
        formData.append("corporateData", JSON.stringify(applyData));
        for (let i = 0; i < FileState.length; i++) {
          formData.append("pdfFile", FileState[i]);
        }
        if (formData != 0) {
          dispatch(CorporateData(formData)).then((res) => {
            if (res?.payload?.status === 200 && res?.payload?.data?.success) {
              toast.success("success", { autoClose: 1000 });
              router.push("/admin/corporate", { autoClose: 1000 });
            } else {
              toast.error("something went wrong", { autoClose: 1000 });
            }
          });
        }
      }
    } else {
      if (dataValue == 0) {
        setDataValue(1);
      } else if (dataValue === 1) {
        const applyEdit = {
          id: Id,
          topicName: value?.topicName,
          subTopic: value?.subTopic,
          feildName: value?.feildName,
          CorporateCMS: value?.CorporateCMS[0]?.about,
        };
        let formdata = new FormData();
        formdata.append("corporateData", JSON.stringify(applyEdit));
        if (formdata != 0) {
          dispatch(updateCorporate(formdata)).then((res) => {
            if (res?.payload?.request?.status === 200) {
              toast.success("Updated", { autoClose: 1000 });
              router.push("/admin/corporate");
            } else {
            }
          });
        }
      }
    }
  };

  const handleFileChange = (filesObject, name) => {
    const uniqueId = Date.now();
    const filename = uniqueId + "_" + filesObject[0].name;
    let file = new File(filesObject, filename);

    file["nameType"] = name;

    if (FileState.length === 0) {
      setFileState([file]);
    } else {
      FileState.map((ele, index) => {
        if (ele.nameType == name) {
          FileState.splice(index, 1);
        }
      });
      setFileState([...FileState, file]);
    }
  };

  const validate = (values) => {
    let errors = {};

    if (!values.mainCategory) {
      errors["mainCategory"] = "*";
    }
    if (!values.subCategory) {
      errors["subCategory"] = "*";
    }
    if (!values.topicName) {
      errors["topicName"] = "*";
    }
    if (!values.subTopic) {
      errors["subTopic"] = "*";
    }
    if (!values.feildName) {
      errors["feildName"] = "*";
    }
    return errors;
  };

  useEffect(() => {
    dispatch(getAllExams());
    dispatch(getSubCategory());
    dispatch(getMainCategory());
    if (Id) {
      dispatch(getCorporateById({ id: Number(Id) }));
    }
  }, [Id]);

  const init = (event) => {
    if (event && Object.keys(event).length > 0) {
      return event;
    }
    let initialvalues;
    if (Id) {
      initialvalues = {
        mainCategory: updateCorporateList[0]?.mainCategoryId,
        subCategory: updateCorporateList[0]?.subCategoryId,
        topicName: updateCorporateList[0]?.topicName,
        subTopic: updateCorporateList[0]?.subTopic,
        feildName: updateCorporateList[0]?.feildName,
        CorporateCMS: updateCorporateList[0]?.CMS,
      };
      return initialvalues;
    } else {
      initialvalues = {
        mainCategory: "",
        subCategory: "",
        topicName: "",
        subTopic: "",
        feildName: "",
        CorporateCMS: [{}],
      };
      return initialvalues;
    }
  };
  return (
    <>
      <div className="admin_home_tabs_row">
        <Row>
          <Col lg={6} md={12} className="p-0">
            <ScrollingCarousel show={5.5} slide={4} swiping={true}>
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
            </ScrollingCarousel>
          </Col>
          <Col lg={6} md={12} className="text-end p-0">
            {dataValue === 0 && (
              <>
                <Button className="border_btn upload_btn">
                  Upload Worksheet
                </Button>
                <Button className="border_btn upload_btn">
                  Upload Short Tricks
                </Button>
              </>
            )}
            {dataValue === 2 && mockTableStatus === "MockTable" && (
              <Button
                className="border_btn upload_btn"
                onClick={() => router.push("/admin/corporate/mocktest/add")}
              >
                Add new
              </Button>
            )}
            {dataValue === 2 && mockTableStatus === "AddMockTest" && (
              <Button className="border_btn upload_btn">
                Upload CSV Mock Test
              </Button>
            )}
          </Col>
        </Row>
      </div>
      <Form
        onSubmit={handleSubmit}
        mutators={{
          ...arrayMutators,
        }}
        keepDirtyOnReinitialize
        validate={validate}
        initialValues={useMemo((e) => init(e), [updateCorporateList])}
        render={({ handleSubmit, values, form: { mutators } }) => (
          <form onSubmit={handleSubmit}>
            {dataValue == 0 && (
              <>
                <Row>
                  <Col md={12} lg={6}>
                    <Field name="mainCategory">
                      {({ input, meta }) => (
                        <>
                          <div className="d-flex">
                            <label className="signup_form_label">
                              Select Category
                            </label>
                            {meta.error && meta.touched && (
                              <span className="text-danger  required_msg">
                                {meta.error}
                              </span>
                            )}
                          </div>
                          <select
                            {...input}
                            className="form-control select-style signup_form_input"
                          >
                            <option value="">Select Category</option>
                            {maincategoryData &&
                              maincategoryData?.map((item, index) => (
                                <option key={index} value={item.id}>
                                  {item?.mainCategory}
                                </option>
                              ))}
                          </select>
                        </>
                      )}
                    </Field>
                    <div className="text-end">
                      <img
                        className="select_down_icon"
                        src="/images/down.png"
                      />
                    </div>
                  </Col>
                  <Col md={12} lg={6}>
                    <Field name="subCategory">
                      {({ input, meta }) => (
                        <>
                          <div className="d-flex">
                            <label className="signup_form_label">
                              Sub Category
                            </label>
                            {meta.error && meta.touched && (
                              <span className="text-danger required_msg">
                                {meta.error}
                              </span>
                            )}
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
                        </>
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
                <Row>
                  <Col md={12} lg={6}>
                    <Field name="topicName">
                      {({ input, meta }) => (
                        <div>
                          <div className="d-flex">
                            <label className="signup_form_label">
                              Topic Name
                            </label>
                            {meta.error && meta.touched && (
                              <span className="text-danger required_msg">
                                {meta.error}
                              </span>
                            )}
                          </div>
                          <input
                            {...input}
                            type="text"
                            className="form-control signup_form_input margin_bottom"
                            placeholder="Enter Topic Name"
                          />
                        </div>
                      )}
                    </Field>
                  </Col>
                  <Col md={12} lg={6}>
                    <Field name="subTopic">
                      {({ input, meta }) => (
                        <div>
                          <div className="d-flex">
                            <label className="signup_form_label">
                              Sub Topic
                            </label>
                            {meta.error && meta.touched && (
                              <span className="text-danger required_msg">
                                {meta.error}
                              </span>
                            )}
                          </div>
                          <input
                            {...input}
                            type="text"
                            className="form-control signup_form_input margin_bottom"
                            placeholder="Enter Sub Topic"
                          />
                        </div>
                      )}
                    </Field>
                  </Col>
                </Row>
                <Row>
                  <Col md={12} lg={6}>
                    <Field name="feildName">
                      {({ input, meta }) => (
                        <div>
                          <div className="d-flex">
                            <label className="signup_form_label">
                              Field Name
                            </label>
                            {meta.error && meta.touched && (
                              <span className="text-danger required_msg">
                                {meta.error}
                              </span>
                            )}
                          </div>
                          <input
                            {...input}
                            type="text"
                            className="form-control signup_form_input margin_bottom"
                            placeholder="field Name"
                          />
                        </div>
                      )}
                    </Field>
                  </Col>

                  <Col md={12} lg={6}>
                    <Field name={`image`}>
                      {({ input, meta }) => (
                        <div>
                          <div className="d-flex">
                            <label className="signup_form_label">
                              Upload PDF
                            </label>
                            {meta.error && meta.touched && (
                              <span className="text-danger required_msg">
                                {meta.error}
                              </span>
                            )}
                          </div>
                          <input
                            onChange={(e) => {
                              handleFileChange(e.target.files, e.target.name);
                              // input.onChange(e.target.files[0])
                            }}
                            className="form-control signup_form_input margin_bottom"
                            type="file"
                          />
                        </div>
                      )}
                    </Field>
                  </Col>
                </Row>
                <Row>
                  <Col className="text-center">
                    <button
                      className="admin_signup_btn admin_signup_btn_mobile"
                      type="submit"
                    >
                      Next
                    </button>
                  </Col>
                </Row>
              </>
            )}
            {dataValue == 1 && (
              <>
                <Row>
                  <Col>
                    <FieldArray name="CorporateCMS">
                      {({ fields }) => (
                        <>
                          {fields.map((name, index) => (
                            <Tabs
                              key={index}
                              defaultActiveKey={0}
                              className="mb-3"
                            >
                              {corporateCMS.map((item, index) => {
                                return (
                                  <Tab
                                    style={{
                                      padding: "10px",
                                      border: "1px solid black",
                                      borderRadius: "5px",
                                      backgroundColor: "#FFF",
                                    }}
                                    key={index}
                                    eventKey={index}
                                    title={item.title}
                                  >
                                    <Field name={`${name}.${item.key}`}>
                                      {({ input, meta }) => (
                                        <>
                                          <CKeditorGenerator
                                            input={input}
                                            onReady={(editor) => {
                                              // console.log(editor, 'editor')
                                            }}
                                          />
                                        </>
                                      )}
                                    </Field>
                                  </Tab>
                                );
                              })}
                            </Tabs>
                          ))}
                        </>
                      )}
                    </FieldArray>
                  </Col>
                </Row>
                <Row>
                  <Col className="text-center">
                    <button
                      className="admin_signup_btn admin_signup_btn_mobile"
                      type="submit"
                    >
                      {router.query.Id ? "Update" : "Submit"}
                    </button>
                  </Col>
                </Row>
              </>
            )}
          </form>
        )}
      />
      {dataValue === 2 && mockTableStatus === "MockTable" && <MockTable />}
    </>
  );
}
