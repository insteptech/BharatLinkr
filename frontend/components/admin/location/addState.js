import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Field, Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getCountry } from "../../../redux/actions/location/countryList";
import {
  createState,
  editState,
  getStateById,
} from "../../../redux/actions/location/createState";

function AddStatePage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const state = useSelector((data) => data?.stateById?.state?.data);
  const initialdata = () => {
    let initialValue = {};
    if (router.query.Id) {
      initialValue = {
        countryId: `${state?.result?.Countries?.id}`,
        state: state?.result?.state,
      };
    } else {
      initialValue = {
        countryId: "",
        state: "",
      };
    }
    console.log(initialValue, "eeeeeeeeeeee");
    return initialValue;
  };
  const countryList = useSelector(
    (data) => data?.countrylist?.countrylist?.data?.data?.rows
  );
  let stateId;
  useEffect(() => {
    dispatch(getCountry());
    initialdata();
    if (router.query.Id) {
      const stateId = router.query.Id;
      dispatch(getStateById(stateId));
      console.log(stateId, "gggggggggg1");
    }
  }, [router.query.Id]);
  const handleSubmit = (values) => {
    const data = { state: [values] };
    let updatedData = {};
    if (!router.query.Id) {
      dispatch(createState(data)).then((res) => {
        if (res?.payload?.data?.success) {
          console.log(res, "resssss");
          const status = res?.payload?.data?.data?.state[0]?.status;
          if (status == "duplicate") {
            toast.error(`State is ${status}`);
          } else {
            toast.success("State created successfuly");
          }
          router.push("/admin/location");
        }
      });
    } else {
      updatedData = {
        state: [
          {
            state: data?.state[0].state,
            id: state.result.id,
          },
        ],
      };
      console.log();
      dispatch(editState(updatedData)).then((res) => {
        if (res?.payload?.data?.success) {
          toast.success("Done");
          router.push("/admin/location");
        } else {
          alert("errrrr");
        }
      });
    }
  };

  return (
    <>
      {/* <button onClick={() => console.log(stateId, 'gggggggg')}>dddddd</button> */}
      <Form
        onSubmit={handleSubmit}
        initialValues={() => initialdata()}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Row className="padding_top mt-3">
              <Col lg={6} md={12}>
                <label className="signup_form_label">Country Name</label>
                <Field
                  name="countryId"
                  component="select"
                  className="form-control select-style signup_form_input margin_bottom"
                  placeholder="wrfw"
                  disabled={router.query.Id ? true : false}
                >
                  {!router.query.Id && <option value="">Select</option>}
                  {countryList &&
                    countryList?.map((item) => (
                      <option value={item.id}>{item.name}</option>
                    ))}
                </Field>
              </Col>
              <Col lg={6} md={12}>
                <label className="signup_form_label">State Name</label>
                <Field
                  name="state"
                  component="input"
                  className="form-control select-style signup_form_input margin_bottom"
                  placeholder="Enter State"
                />
              </Col>
            </Row>
            <Row>
              <Col className="text-center">
                <button className="admin_signup_btn m-2" type="submit">
                  {!router.query.Id ? "Submit" : "Update"}
                </button>
              </Col>
            </Row>
          </form>
        )}
      />
    </>
  );
}

export default AddStatePage;
