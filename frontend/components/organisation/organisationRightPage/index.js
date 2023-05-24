import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Form, Offcanvas, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getOrganisationlist } from "../../../redux/actions/organisation/addorganisation";
import OrganisationLeftPage from "../organisationLeftPage";
import CompanyCard from "./companyCard";
import Profession from "./profession";
import Internship from "./Internship";

const streamData = [
  {
    itemName: "Hello",
    itemCount: 12,
    courseItem: "B.ed",
  },
  {
    itemName: "notification",
    itemCount: 125,
    courseItem: "B.tech",
  },
  {
    itemName: "extra",
    itemCount: 124,
    courseItem: "B.ed",
  },
  {
    itemName: "technology",
    itemCount: 123,
    courseItem: "Bba",
  },
  {
    itemName: "Hello4",
    itemCount: 122,
    courseItem: "mbbs",
  },
  {
    itemName: "Hello5",
    itemCount: 121,
    courseItem: "b.sc",
  },
  {
    itemName: "Hello1",
    itemCount: 125,
    courseItem: "B.ed",
  },
  {
    itemName: "Hello2",
    itemCount: 124,
    courseItem: "B.ed",
  },
  {
    itemName: "Hello3",
    itemCount: 123,
    courseItem: "B.ed",
  },
  {
    itemName: "Hello4",
    itemCount: 122,
    courseItem: "B.ed",
  },
  {
    itemName: "Hello5",
    itemCount: 121,
    courseItem: "B.ed",
  },
];

const dropData = [
  {
    page: "Jobs",
    value: "1",
  },
  {
    page: "Profession",
    value: "2",
  },
  {
    page: "Internship",
    value: "3",
  },
  {
    page: "Company",
    value: "4",
  },
];

function OrganisationRightPage({ dataValue, setDataValue }, props) {
  const { show, setshow } = props;
  const dispatch = useDispatch();

  const orgList = useSelector((state) => state?.sectorData?.organisationList);

  const searchOrganisation = (e) => {
    let data = e.target.value;
    dispatch(getOrganisationlist({ search: data }));
  };

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  return (
    <>
      <div className="">
        <Row>
          <Col md={12} className="heading_align ">
            <h2 className="edit_profile_h2 mobile_margin_bottom">
              {dataValue == 0
                ? "List of top Jobs in india based on 2022 ranking"
                : dataValue == 1
                ? "List of top Profession in india based on 2022 ranking"
                : dataValue == 2
                ? "List of top Inernship in india based on 2022 ranking"
                : "List of top Company in india based on 2022 ranking"}
            </h2>
          </Col>
          <Col
            md={12}
            className=" big_screen_hide_box search_filter_row_padding "
          >
            <div className="search_filter_row">
              <div className="search_profile_search_bar ">
                <input
                  type="text"
                  placeholder="Search by name..."
                  name=""
                  className="form-control chat_box_weite_bar"
                />
                <button type="submit">
                  <img src="/images/search.png" />
                </button>
              </div>
              <div className="pt-1" onClick={handleShow1}>
                <img className="filter_icon" src="/images/filter-icon.svg" />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={6} lg={5}>
            <div className="search_profile_search_bar company_right_search_bar margin_bottom">
              <input
                type="text"
                placeholder="Job Title, Keywords or Company"
                name=""
                className="form-control chat_box_weite_bar font_13"
                onChange={(e) => searchOrganisation(e)}
              />
              <div className="org_search_icon_btn">
                <img className="org_search_icon" src="/images/search.png" />
              </div>
            </div>
          </Col>

          {dataValue == 1 ? (
            <Col xs={6} lg={7} className="ps-0 profession_drop_col">
              <div className="company_jobs_select margin_bottom w-50">
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => setDataValue(e.target.value)}
                >
                  {dropData &&
                    dropData?.map((steps, stepsIndex) => {
                      return (
                        <>
                          <option
                            active={true}
                            key={stepsIndex}
                            value={stepsIndex}
                          >
                            {steps.page}
                          </option>
                        </>
                      );
                    })}
                </Form.Select>
              </div>
            </Col>
          ) : (
            <Col xs={6} lg={2} className="ps-0">
              <div className="company_jobs_select margin_bottom">
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => setDataValue(e.target.value)}
                >
                  {dropData &&
                    dropData?.map((steps, stepsIndex) => {
                      return (
                        <>
                          <option
                            active={true}
                            key={stepsIndex}
                            value={stepsIndex}
                          >
                            {steps.page}
                          </option>
                        </>
                      );
                    })}
                </Form.Select>
              </div>
            </Col>
          )}
          <Col
            xs={12}
            lg={5}
            className={`"pading_left_0" ${
              dataValue == 1 ? "click_hide" : "pading_left_0"
            }`}
          >
            <div className="d-flex pe-1">
              <div className="search_profile_search_bar company_right_search_bar2">
                <input
                  type="text"
                  placeholder="Location..."
                  name=""
                  className="form-control chat_box_weite_bar font_13"
                />
              </div>
              <Button className="location_search_btn">Search</Button>
            </div>
          </Col>
        </Row>
        {dataValue == 0 && <CompanyCard />}
        {dataValue == 1 && <Profession />}

        {dataValue == 2 && <Internship />}

        {dataValue == 3 &&
          orgList?.rows?.map((item, index) => {
            return <CompanyCard data={item} dataValue={dataValue} />;
          })}
      </div>

      {/* --------------------------mobile-screen------------------------- */}
      <div className="">
        <Offcanvas
          placement={"bottom"}
          show={show1}
          onHide={handleClose1}
          className="offcanvas_container gray_bg"
        >
          <Offcanvas.Header className="pb-1">
            <Offcanvas.Title>
              <div className="profile_search_bar_col ">
                <div className="search_profile_search_bar mb-0">
                  <input
                    type="text"
                    placeholder="Search by name..."
                    name=""
                    className="form-control chat_box_weite_bar"
                  />
                  <button type="submit">
                    <img src="/images/search.png" />
                  </button>
                </div>
              </div>
            </Offcanvas.Title>
            <button className="chat_box_close_btn" onClick={handleClose1}>
              <img src="/images/cross-icon.svg" />
            </button>
          </Offcanvas.Header>
          <Offcanvas.Body className="">
            <OrganisationLeftPage />
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  );
}

export default OrganisationRightPage;
