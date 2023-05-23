import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Field, Form } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";
import { useDispatch, useSelector } from "react-redux";
import {
  addMasterFilter,
  MasterFilterById,
  updateMasterFilter,
} from "../../../redux/actions/masterfilter/createmasterfilter";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

function CreateMasterFilter() {
  const dispatch = useDispatch();
  const router = useRouter();
  const ID = router.query.id;

  const handleSubmit = (values) => {
    let data = { payload: "" };
    data.payload = values.Field.map((item) => {
      if (!ID) {
        return {
          types: values.Category,
          name: item.FieldName,
          statusId: 1,
        };
      } else {
        return {
          types: values.Category,
          name: item.FieldName,
          statusId: 1,
          id: ID,
        };
      }
    });
    let formdata = new FormData();
    formdata.append("masterData", JSON.stringify(data));
    {
      !ID
        ? dispatch(addMasterFilter(formdata)).then((res) => {
            if (res?.payload?.data?.success) {
              const status = res?.payload?.data?.data?.master[0]?.status;
              if (status == "duplicate") {
                toast.error(`${status} added`);
              } else {
                toast.success("added successfuly");
                router.push("/admin/masterfilter");
              }
            }
          })
        : dispatch(updateMasterFilter(formdata)).then((res) => {
            if (res?.payload?.data?.success) {
              toast.success("Updated");
              router.push("/admin/masterfilter");
            }
          });
    }
  };
  const masterData = useSelector(
    (data) => data?.masterfilterByid?.masterfilterbyid?.data?.data
  );
  console.log(masterData, "dkjfkdkjfkg");
  useEffect(() => {
    console.log(router.query.id, "dkjfkdkjfkg");
    if (ID) {
      dispatch(MasterFilterById(ID));
    }
  }, []);

  const validate = (values) => {
    let errors = {};
    let itemArray = [];
    if (!values.Category) {
      errors["Category"] = "*";
    }
    if (values.Field) {
      values.Field.map((item, index) => {
        let error = {};
        if (!item.FieldName) {
          error["FieldName"] = "*";
        }
        itemArray.push(error);
      });
      errors["Field"] = itemArray;
    }
    console.log(errors, values);
    return errors;
  };
  const neData = [
    'courselevel',
    'programtype',
    'discipline',
    'schoolaffilation',
    'gradesystem',
    'schoollevel',
    'schooldesignation',
    'schoolmedium',
    'teacherlevels',
    'programduration',
    'collegetype',
    'accreditation',
    'affilation',
    'examaccepted',
    'facilities',
    'coursecategory',
    'coursetype',
    'collegecategory',
    'category',
    'collegeuniversitytype',
    'examtype',
    'applicationmode',
    'exammode',
    'examother',
    'ranking',
    'institutetype',
    'internationalcollaboration',
    'exampattern',
    'applicationexamstatus',
    'academiclevel',
    'qualification',
    'fieldofstudy',
    // 'specialization',
    'entranceexamaccepted',
    'courseduration',
    'studymode',
    'eligbilitycriteria',
    'examduration',
    'rankingtype',
    'examdurationtype',
    'qualificationcriteria',
    'headofinstitute',
    'campus',
    'preparatoryexams',
    'agency',
    'ratings',
    'department',
    'coursetype',
    'coursefeetype',
    'courseplace',
    'approvals',
    'eligibility',
    'coursefeedetails',
    'corporatemaincategory',
    'corporatesubcategory'
  ];

  return (
    <div className="padding_top">
      <Form
        onSubmit={handleSubmit}
        validate={validate}
        mutators={{
          // potentially other mutators could be merged here
          ...arrayMutators,
        }}
        initialValues={{
          Category: ID ? masterData?.types : "",
          Field: [{ FieldName: ID ? masterData?.name : "" }],
        }}
        render={({ handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>
            <Row className="pt-3">
              <Col md={12} lg={12}>
                <Field name="Category">
                  {({ input, meta }) => (
                    <>
                      <div className="d-flex">
                        <label className="signup_form_label">
                          Select Category
                        </label>
                        {meta.error && meta.touched && (
                          <span className="text-danger required_msg">
                            {meta.error}
                          </span>
                        )}
                      </div>
                      <select
                        {...input}
                        className="form-control select-style signup_form_input margin_bottom"
                      >
                        <option value="">Select Category</option>
                        {neData?.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </>
                  )}
                </Field>
              </Col>
              <Col md={12}></Col>
              <Col md={12}></Col>
              <FieldArray name="Field">
                {({ fields }) => (
                  <>
                    {fields.map((name, index) => (
                      <Col md={12} lg={12} className="d-flex">
                        <Field key={index} name={`${name}.FieldName`}>
                          {({ input, meta }) => (
                            <>
                              <div className="d-flex">
                                <label className="signup_form_label">
                                  Enter Field
                                </label>
                                {meta.error && meta.touched && (
                                  <span className="text-danger required_msg">
                                    {meta.error}
                                  </span>
                                )}
                              </div>
                              <input
                                {...input}
                                className="form-control signup_form_input "
                                placeholder="Enter Field"
                              />
                            </>
                          )}
                        </Field>
                        {!ID && (
                          <div className="d-flex mt-2 margin_bottom">
                            <div
                              type="button"
                              className="add_remove_btn ms-2"
                              onClick={() =>
                                fields.push({
                                  fieldName: "",
                                })
                              }
                            >
                              <img
                                className="add_remove_icon"
                                src="/images/plus.png"
                              />
                            </div>
                            {fields.length > 1 ? (
                              <div
                                className="add_remove_btn ms-2"
                                type="button"
                                onClick={() => fields.remove(index)}
                              >
                                <img
                                  className="add_remove_icon"
                                  src="/images/delete-black.png"
                                />
                              </div>
                            ) : (
                              <></>
                            )}
                          </div>
                        )}
                      </Col>
                    ))}
                  </>
                )}
              </FieldArray>
              {ID ? (
                <Col md={12} className="text-center">
                  <button
                    className="admin_signup_btn admin_signup_btn_mobile"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Update Field
                  </button>
                </Col>
              ) : (
                <Col md={12} className="text-center">
                  <button
                    className="admin_signup_btn admin_signup_btn_mobile"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Add Field
                  </button>
                </Col>
              )}
            </Row>
          </form>
        )}
      />
    </div>
  );
}

export default CreateMasterFilter;
