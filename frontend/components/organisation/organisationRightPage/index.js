import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Form, Offcanvas, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { companyLike, companyLikeslist, getOrganisationlist } from "../../../redux/actions/organisation/addorganisation";
import OrganisationLeftPage from "../organisationLeftPage";
import CompanyCard from "./companyCard";
import Profession from "./profession";
import Internship from "./Internship";
import { getTokenDecode, isUserLogined } from "../../utils";
import SignupModal from "../../modals/signupmodal";
import JobCard from "./jobCard";

const dropData = [
  {
    page: "Profession",
    value: "1",
  },
  {
    page: "Jobs",
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

function OrganisationRightPage({ dataValue, setDataValue }) {
  const dispatch = useDispatch();

  const [modalShow, setModalShow] = useState(false);

  // const userId = getTokenDecode().userId
  

  

  const searchOrganisation = (e) => {
    let data = e.target.value;
    dispatch(getOrganisationlist({ search: data }));
  };

  const handleHide = () => {
    setModalShow(false);
  };

  const date = new Date().getFullYear();

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
                ? `List of top Jobs in india based on ${date} ranking`
                : dataValue == 1
                  ? `List of top Profession in india`
                  : dataValue == 2
                    ? `List of top Inernship in india based on ${date} ranking`
                    : `List of top Company in india based on ${date} ranking`}
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
            className={`"pading_left_0" ${dataValue == 1 ? "click_hide" : "pading_left_0"
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
        {dataValue == 0 && <Profession />}
        {dataValue == 1 && <JobCard />}

        {dataValue == 2 && <Internship />}

        {dataValue == 3 &&
             <CompanyCard dataValue={dataValue} setModalShow={setModalShow} />
        }
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
      <SignupModal
        show={modalShow}
        // setModalShow={setModalShow}
        onHide={() => handleHide()}
      />
    </>
  );
}

export default OrganisationRightPage;
