import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import React, { useState } from "react";
import { Button, Dropdown, Form, Image, Modal } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Searchfilters from "../../../../searchPage/searchFilters/searchfilters";

export const OrganisationData = [
  {
    id: 1,
    cover_pic: "/images/cover-bg.jpg",
    profile_pic: "/images/cover-bg.jpg",
    title_name: "Organisation card1",
    user_address: "Student | Jalandhar, Punjab",
    links_range: "142",
  },
  {
    id: 2,
    cover_pic: "/images/cover-bg.jpg",
    profile_pic: "/images/cover-bg.jpg",
    title_name: "Organisation card2",
    user_address: "Student | Jalandhar, Punjab",
    links_range: "142",
  },
  {
    id: 3,
    cover_pic: "/images/cover-bg.jpg",
    profile_pic: "/images/cover-bg.jpg",
    title_name: "Organisation card3",
    user_address: "Student | Jalandhar, Punjab",
    links_range: "142",
  },
  {
    id: 4,
    cover_pic: "/images/cover-bg.jpg",
    profile_pic: "/images/cover-bg.jpg",
    title_name: "Organisation card4",
    user_address: "Student | Jalandhar, Punjab",
    links_range: "142",
  },
  {
    id: 5,
    cover_pic: "/images/cover-bg.jpg",
    profile_pic: "/images/cover-bg.jpg",
    title_name: "Organisation card5",
    user_address: "Student | Jalandhar, Punjab",
    links_range: "142",
  },
];

const OrganisationsearchCard = () => {
  const [modalShow, setModalShow] = useState(false);
  const [showScreen, setShowScreen] = useState();
  const [flip, setFlip] = useState(null);
  const handleHide = () => {
    setModalShow(false);
  };

  const filterdata = [
    {
      name: "State",
      data: [{ name: "Date" }, { name: "Popularity" }],
      key: "name",
    },
    {
      name: "City",
      data: [{ name: "Date" }, { name: "Popularity" }],
      key: "name",
    },
    {
      name: "Company Level",
      data: [{ name: "Date" }, { name: "Popularity" }],
      key: "name",
    },
    {
      name: "Industry",
      data: [{ name: "Date" }, { name: "Popularity" }],
      key: "name",
    },
    {
      name: "Company Age",
      data: [{ name: "Date" }, { name: "Popularity" }],
      key: "name",
    },
    {
      name: "Nature of Business",
      data: [{ name: "Date" }, { name: "Popularity" }],
      key: "name",
    },
    {
      name: "Type of Company",
      data: [{ name: "Date" }, { name: "Popularity" }],
      key: "name",
    },
  ];

  const handleShow = (data) => {
    setModalShow(true);
    setShowScreen(data);
  };
  return (
    <>
      <Searchfilters filterdata={filterdata} />
      {/* <Row xs={1} md={3} className="g-4">
        {OrganisationData &&
          OrganisationData.map((item) => (
            <Col>
              <Card key={item.id} className="profile_master_card">
                <Card.Img
                  className="card_img"
                  variant="top"
                  src={item.cover_pic}
                />
                <div className="profile_card_logo_img_div">
                  <img
                    className="profile_card_logo_img img-fluid"
                    src={item.cover_pic}
                    alt="Logo Here"
                  />
                  <div className="notification_dot"></div>
                </div>
                <Card.Body className="profile_card_body">
                  <div className="padding_left">
                    <Card.Title className="profile_card_title">
                      {item.title_name}
                    </Card.Title>
                    <Card.Text className="profile_card_sub_title">
                      {item.user_address}
                    </Card.Text>
                    <Card.Text className="total_links">
                      Total Links <span>{item.links_range}</span>
                    </Card.Text>
                  </div>
                  <div className="text-center">
                    <Button
                      onClick={() => handleShow(item)}
                      className=" card_btn"
                    >
                      Linked
                    </Button>
                    <Button className=" card_btn">Message</Button>
                    <Button className=" card_btn">Activities</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row> */}

      <Row xs={1} sm={2} md={3} lg={2} xl={3} className="g-4">
        {OrganisationData &&
          OrganisationData.map((item) => (
            <Col className="flip-card">
              <Card
                key={item.id}
                className={`profile_master_card ${
                  flip !== item.id ? "flip-card" : "flip-card-inner"
                }`}
              >
                <Card.Img
                  className="card_img"
                  onClick={() => setFlip(item.id)}
                  variant="top"
                  src={item.cover_pic}
                />
                <div className="profile_card_logo_img_div">
                  <img
                    className="profile_card_logo_img img-fluid"
                    src={item.cover_pic}
                    alt="Logo Here"
                  />
                  <div className="notification_dot"></div>
                </div>
                <Card.Body className="profile_card_body">
                  <div className="padding_left">
                    <Card.Title className="profile_card_title">
                      {item.title_name}
                      {/* <img className="blue_three_dot" src="/images/blue-three-dot.svg" /> */}
                      <div className="all_card_three_dot">
                        <Dropdown>
                          <Dropdown.Toggle
                            className=""
                            variant="success"
                            id="dropdown-menu-start"
                          >
                            <Image
                              className="blue_three_dot"
                              src="/images/blue-three-dot.svg"
                            />
                          </Dropdown.Toggle>

                          <Dropdown.Menu className="edit_delete_drop">
                            <Dropdown.Item href="#/action-1">
                              Block
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </Card.Title>
                    <Card.Text className="profile_card_sub_title">
                      {item.user_address}
                    </Card.Text>
                    <Card.Text className="total_links">
                      Total Links <span>{item.links_range}</span>
                    </Card.Text>
                  </div>
                  <div className="text-center">
                    <Button
                      onClick={() => handleShow(item)}
                      className="card_btn"
                    >
                      Linked
                    </Button>
                    <Button className="card_btn">Message</Button>
                    <Button className="card_btn">Activities</Button>
                  </div>
                </Card.Body>
                <div
                  onClick={() => setFlip(null)}
                  className="flip-card-back flip_card_scroll_box"
                >
                  {/* <div className="">
                <h5 className="flip_card_profile_h5">Profile</h5>
                <h1 className="profile_card_title">{item.title_name}</h1>
              </div> */}

                  <div className="">
                    <h6 className="flip_card_headings">
                      <img
                        className="flip_card_icons"
                        src="/images/basic-info.svg"
                      />
                      Basic Info
                    </h6>
                    <p className="profile_card_sub_title">
                      Hello everyone. My name is Anshita. I am a student of
                      B.Tech (CSE)
                      <span className="green_font">...Read More</span>
                    </p>

                    <h6 className="flip_card_headings">
                      <img
                        className="flip_card_icons"
                        src="/images/h-e-icon.svg"
                      />
                      Highest Education
                    </h6>
                    <p className="profile_card_sub_title">
                      B.TECH Computer Science And Engineering
                    </p>
                    <h6 className="flip_card_headings">
                      <img
                        className="flip_card_icons"
                        src="/images/total-exp-icon.svg"
                      />
                      Total Experience
                    </h6>
                    <p className="profile_card_sub_title">
                      hello | instep | tech
                    </p>
                    <h6 className="flip_card_headings">
                      <img
                        className="flip_card_icons"
                        src="/images/area-of-expt-icon.svg"
                      />
                      Area of Expertise
                    </h6>
                    <p className="profile_card_sub_title flip_card_p">
                      <img
                        className="flip_card_icons p_dot"
                        src="/images/border-dot.svg"
                      />
                      I have experience in UI/UX.
                    </p>
                    <p className="profile_card_sub_title flip_card_p">
                      <img
                        className="flip_card_icons p_dot"
                        src="/images/border-dot.svg"
                      />
                      I have experience in UI/UX.
                    </p>
                    <h6 className="flip_card_headings">
                      {" "}
                      <img
                        className="flip_card_icons"
                        src="/images/acc-icon.svg"
                      />
                      Accomplishments
                    </h6>
                    <p className="profile_card_sub_title flip_card_p">
                      <img
                        className="flip_card_icons p_dot"
                        src="/images/border-dot.svg"
                      />
                      Monitor in class 6
                    </p>
                    <p className="profile_card_sub_title flip_card_p">
                      <img
                        className="flip_card_icons p_dot"
                        src="/images/border-dot.svg"
                      />
                      throwball 6 certificate
                    </p>
                    <p className="profile_card_sub_title flip_card_p">
                      <img
                        className="flip_card_icons p_dot"
                        src="/images/border-dot.svg"
                      />
                      i got medal in relay 200 meter
                    </p>
                    <p className="profile_card_sub_title flip_card_p">
                      <img
                        className="flip_card_icons p_dot"
                        src="/images/border-dot.svg"
                      />
                      state level certificate in throwball state level
                      certificate in throwball
                    </p>
                    <p className="profile_card_sub_title flip_card_p">
                      {" "}
                      <img
                        className="flip_card_icons p_dot"
                        src="/images/border-dot.svg"
                      />
                      discuss throw
                    </p>
                    <p className="profile_card_sub_title flip_card_p">
                      <img
                        className="flip_card_icons p_dot"
                        src="/images/border-dot.svg"
                      />
                      shields in sports and academics.
                    </p>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
      </Row>

      {/* -------------modal---------------- */}

      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className={`share-college-modal mx-auto`}
      >
        <Modal.Body className="modal_body">
          <div className="text-end blue_background">
            <h6 className="modal_title">
              Tata consultancy service offices in india
            </h6>
            <button className="chat_box_close_btn" onClick={handleHide}>
              <img src="/images/white-cross.svg" />
            </button>
          </div>
          <div className="modal_padding">
            <div className="modal_select_row border_none">
              <Form.Select aria-label="Default select example ">
                <option>State</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
              <Form.Select aria-label="Default select example">
                <option>City</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </div>
            <div className="pt-3">
              <Row className="mb-3">
                <Col lg={4}>
                  <h4 className="profile_card_title">
                    tata consultancy services
                  </h4>
                </Col>
                <Col lg={5} className="center_sub_text">
                  <p className="profile_card_sub_title mt-1">
                    Company | <span>Kolkata West Bengal</span> |{" "}
                    <span className="total_links">Total Links </span>
                    <span className="ms-1">142</span>
                  </p>
                </Col>
                <Col lg={3} className="text-end">
                  <Button className=" card_btn">Link</Button>
                  <Button className=" card_btn">Message</Button>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col lg={4}>
                  <h4 className="profile_card_title">
                    tata consultancy services
                  </h4>
                </Col>
                <Col lg={5} className="center_sub_text">
                  <p className="profile_card_sub_title mt-1">
                    Company | <span>Kolkata West Bengal</span> |{" "}
                    <span className="total_links">Total Links </span>
                    <span className="ms-1">142</span>
                  </p>
                </Col>
                <Col lg={3} className="text-end">
                  <Button className=" card_btn">Link</Button>
                  <Button className=" card_btn">Message</Button>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col lg={4}>
                  <h4 className="profile_card_title">
                    tata consultancy services
                  </h4>
                </Col>
                <Col lg={5} className="center_sub_text">
                  <p className="profile_card_sub_title mt-1">
                    Company | <span>Kolkata West Bengal</span> |{" "}
                    <span className="total_links">Total Links </span>
                    <span className="ms-1">142</span>
                  </p>
                </Col>
                <Col lg={3} className="text-end">
                  <Button className=" card_btn">Link</Button>
                  <Button className=" card_btn">Message</Button>
                </Col>
              </Row>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default OrganisationsearchCard;
