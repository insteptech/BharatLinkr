import React, { useEffect } from "react";
import { useState } from "react";
import { Accordion, Button, Col, Image, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { corporateLikes, corporatelikesList, getCorporateData } from "../../../../../../redux/actions/corporate/addcorporate";
import PdfComponent from "./pdf";
import { apibasePath } from "../../../../../../config";
import Pagination from "../../../../../admin/pagination/pagination";
import Pageize from "../../../../../admin/pagination/pagesize";
import SignupModal from "../../../../../modals/signupmodal";
import { getTokenDecode, isUserLogined } from "../../../../../utils";

const ShortTricks = () => {
  const [show, setShow] = useState(false);
  const [showScreen, setShowScreen] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [array, setArray] = useState([]);
  const [pagination, setPagination] = useState({
    pageNo: 1,
    pageSize: 10,
  });
  const [alreadyViewed, setAlreadyViewed] = useState([])
  const likedList = useSelector((state) => state?.corporateData?.corplikeslist)

  const [userId, setUserId] = useState(null)

  const handleShow = (data) => {
    setShow(true);
    setShowScreen(data);
  };
  const handleClose = () => setShow(false);
  const dispatch = useDispatch();

  const isloggedin = isUserLogined()

  const corporateRegisterlist = useSelector(
    (state) => state?.corporateData?.getListCorporate
  );

  const handleHide = () => {
    setModalShow(false);
  };

  function showPdf(index) {
    if (!getTokenDecode()) {
      setModalShow(true);
    } else {
      if (!array.includes(index)) {
        setArray([...array, index]);
      } else {
        let temp = array;
        let res = temp.filter((e) => e !== index);
        setArray(res);
      }
    }
  }

  const handleViews = (id) => {
    if (isloggedin) {
      if (!alreadyViewed.includes(id)) {
        dispatch(corporateLikes({
          "corporateId": id,
          "update": "views",
          "userId": userId
        })).then((res) => {
          if (res?.payload?.data?.success) {
            dispatch(getCorporateData(pagination))
          }
        })
        setAlreadyViewed([
          ...alreadyViewed,
          id
        ])
      }
    } else {
      setModalShow(true);
    }
  }

  const handleLikes = (item, value) => {
    if (isloggedin) {
      dispatch(corporateLikes({
        "corporateId": item.id,
        "update": value,
        "userId": userId
      })).then((res) => {
        if (res?.payload?.data?.success) {
          dispatch(corporatelikesList(getTokenDecode().userId))
          dispatch(getCorporateData(pagination))
        }
      })
    } else {
      setModalShow(true);
    }
  }
  useEffect(() => {
    dispatch(getCorporateData(pagination));
    if (isloggedin) {
      setUserId(getTokenDecode().userId)
      dispatch(corporatelikesList(getTokenDecode().userId))
    }
  }, [pagination]);

  return (
    <>
      {corporateRegisterlist &&
        corporateRegisterlist?.rows?.map((item, index) => {

          let isliked = likedList.filter((i) => {
            if (item.id === i.categoryId) {
              return true
            }
          })

          return (
            <div
              key={index}
              className="profile_sec_c w-100 pb-0 pt-2"
            // eventKey={item.eventKey}
            >
              {/* <Accordion.Header> */}
              <Row>
                <Col md={6}>
                  <div>
                    <h6 className="profile_card_title font_15 mb-2 align_center">
                      {item?.topicName}
                    </h6>
                    <div className="corporate_card_text">
                      <p className="profile_card_sub_title px-1 icon_text  w-100 font_12">
                        <Image
                          className="me-1"
                          src="/images/black-like.svg"
                        />
                        <span>{item?.count[0]?.likes}</span> Likes
                      </p>
                      <p className="profile_card_sub_title icon_text w-100  px-1 font_12 ">
                        <Image className="me-1" src="/images/black-eye.svg" />
                        <span>{item?.count[0]?.views}</span> Views
                      </p>
                      <p className="profile_card_sub_title icon_text font_12 w-100 px-1 border_none">
                        <Image
                          className="me-1"
                          src="/images/black-download.svg"
                        />
                        <span>{item?.downloads}</span> Downloads
                      </p>
                    </div>
                  </div>
                </Col>

                <Col md={6}>
                  <div className="corporate_card_btn_col align_center">
                    <Button className="corporate_card_btn" onClick={() => {
                      if (isliked.length > 0) {
                        handleLikes(item, 'dislikes')
                      } else {
                        handleLikes(item, 'likes')
                      }
                    }}>
                      <Image className="me-1" src={isliked.length > 0 ? "/images/black-like.svg" : "/images/border-like.svg"} />
                      {'Like'}
                    </Button>
                    <Button
                      className="corporate_card_btn download_btn"
                      onClick={() => {
                        showPdf(index)
                        handleViews(item?.id)
                      }}
                    >
                      <Image
                        className="me-1"
                        src="/images/black-download.svg"
                      />
                      Download
                    </Button>
                  </div>
                </Col>
                <Col>
                  <div className="pdf_viewer">
                    {array && array.length > 0 && array.includes(index) && (
                      <PdfComponent item={item} />
                    )}
                  </div>
                </Col>
              </Row>
              <div className="post_bar_accordion_body_max_hiegt">
                {item.pdfData?.map((item) => {
                  return (
                    <>
                      <h6
                        key={item.id}
                        onClick={() => handleShow(item)}
                        className="pdf_title"
                      >
                        {item.pdfTitle}
                      </h6>
                    </>
                  );
                })}
              </div>
            </div>
          );
        })}
      <Pagination
        pagination={pagination}
        setPagination={setPagination}
        list={corporateRegisterlist}
      />
      <Modal
        className="pdf_modal"
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header>
          <Modal.Title
            className="w-100"
            id="example-custom-modal-styling-title"
          >
            <div className="modal_heading_row">
              <h6 className="modal_heading">{showScreen?.pdfTitle}</h6>
              <button className="chat_box_close_btn" onClick={handleClose}>
                <img src="/images/cross-icon.png" />
              </button>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal_body">
          <h5>{showScreen?.itemHeadingA}</h5>
          <p>{showScreen?.pdfdetail}</p>
          <p>{showScreen?.itemTextA}</p>
          <h5>{showScreen?.itemHeadingB}</h5>
          <p>{showScreen?.itemTextB}</p>
        </Modal.Body>
      </Modal>
      <SignupModal
        show={modalShow}
        // setModalShow={setModalShow}
        onHide={() => handleHide()}
      />
    </>
  );
};

export default ShortTricks;
