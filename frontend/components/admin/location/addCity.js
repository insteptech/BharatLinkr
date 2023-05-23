import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Field, Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createCity, editCity, getCityById } from "../../../redux/actions/location/createCity";
import { getState } from "../../../redux/actions/location/createState";

function AddCityPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const city = useSelector(
    (data) => data?.cityById?.state?.data
  );
  const initialData = () => {
    let initialValue = {}
    if (router.query.Id) {
      initialValue = {
        name: city?.result?.name,
        stateId: city?.result?.State?.id
      }
    } else {
      initialValue = {
        name: '',
        stateId: ''
      }
    }
    console.log(initialValue, 'gg')
    return initialValue
  }
  const handleSubmit = (values) => {
    const data = { city: [values] };
    let updatedData = {}
    // console.log(data, "submit");
    if (!router.query.Id) {
      console.log('create')
      dispatch(createCity(data)).then((res) => {
        if (res?.payload?.data?.success) {
          console.log(res, "resssss");
          const status = res?.payload?.data?.data?.city[0]?.status;
          if (status == "duplicate") {
            toast.error(`City is ${status}`);
          } else {
            toast.success("city added successfuly");
          }
          router.push("/admin/location");
        }
      });
    } else {
      updatedData = {
        city: [
          {
            name: data?.city[0].name,
            id : city?.result?.id
          }
        ]
      }
      dispatch(editCity(updatedData)).then((res) => {
        console.log(res, 'rddddddddd')
        if (res?.payload?.data?.success) {
          toast.success("Updated")
          router.push("/admin/location")
        } else {
          alert('errrrrr')
        }
      })
    }
  };
  const stateList = useSelector(
    (data) => data?.stateList?.stateList?.data?.data?.rows
  );
  useEffect(() => {
    dispatch(getState());
    if (router.query.Id) {
      dispatch(getCityById(router.query.Id))
    }
  }, [router.query.Id]);

  return (
    <>
      {/* <button onClick={() => console.log(city, 'gggggggg')}>jjjjjjjj</button> */}
      <Form
        onSubmit={handleSubmit}
        initialValues={() => initialData()}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Row className="padding_top mt-3">
              <Col lg={6} md={12}>
                <label className="signup_form_label">State Name</label>
                <Field
                  name="stateId"
                  component="select"
                  className="form-control select-style signup_form_input margin_bottom"
                  placeholder="Select State"
                  disabled={router.query.Id? true : false}
                >
                  <option>Select State</option>
                  {stateList &&
                    stateList?.map((item) => (
                      <option key={item.id} value={item.id}>{item.state} </option>
                    ))}
                </Field>
              </Col>
              <Col lg={6} md={12}>
                <label className="signup_form_label">City Name</label>
                <Field
                  name="name"
                  component="input"
                  className="form-control select-style signup_form_input margin_bottom"
                  placeholder="Enter City"
                />
              </Col>
            </Row>
            <Row>
              <Col className="text-center mt-4">
                <button className="admin_signup_btn m-2" type="submit">
                  {!router.query.Id ?
                    'Submit'
                    :
                    'update'
                  }
                </button>
              </Col>
            </Row>
          </form>
        )}
      />
    </>
  );
}

export default AddCityPage;
