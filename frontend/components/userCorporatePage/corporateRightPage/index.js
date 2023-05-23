import React from "react";
import { Col, Offcanvas, Row } from "react-bootstrap";
import MockTests from "../../homeLayout/rightPage/searchRightPages/corporatePage/mockTests";
import ShortTricks from "../../homeLayout/rightPage/searchRightPages/corporatePage/shortTricks";
import { useState } from "react";
import CorporateLeftPage from "../corporateLeftPage";

const CorporateRightPage = ({filtertitle}) => {
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  return (
    <>
      <Row>
        <Col md={12} className="text-center ">
          <h2 className="edit_profile_h2">CORPORAte</h2>
        </Col>
        <Col
          md={12}
          className=" big_screen_hide_box search_filter_row_padding "
        >
          <div className="search_filter_row">
            <div className="search_profile_search_bar ">
              <input
                type="text"
                placeholder="Search..."
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
      <div>
        {filtertitle.maincategory && filtertitle.subcategory && <p>{filtertitle.maincategory}/{filtertitle.subcategory}</p>}
      </div>
      <div>
        <ShortTricks />
        <MockTests />
      </div>
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
                    onChange={(e) => props?.handleSearch(e)}
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
            <CorporateLeftPage />
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  );
};

export default CorporateRightPage;
