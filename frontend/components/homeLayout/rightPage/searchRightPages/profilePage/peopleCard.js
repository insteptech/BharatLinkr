import React, { useState } from "react";
import { Button, Dropdown, Image } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const Peopledata = [
  {
    id: 6,
    cover_pic: "/images/cover-bg.jpg",
    profile_pic: "/images/cover-bg.jpg",
    title_name: "People card1",
    user_address: "Student | Jalandhar, Punjab",
    links_range: "142",
  },
  {
    id: 7,
    cover_pic: "/images/cover-bg.jpg",
    profile_pic: "/images/cover-bg.jpg",
    title_name: "People card2",
    user_address: "Student | Jalandhar, Punjab",
    links_range: "142",
  },
  {
    id: 8,
    cover_pic: "/images/cover-bg.jpg",
    profile_pic: "/images/cover-bg.jpg",
    title_name: "People card3",
    user_address: "Student | Jalandhar, Punjab",
    links_range: "142",
  },
  {
    id: 9,
    cover_pic: "/images/cover-bg.jpg",
    profile_pic: "/images/cover-bg.jpg",
    title_name: "People card4",
    user_address: "Student | Jalandhar, Punjab",
    links_range: "142",
  },
  {
    id: 10,
    cover_pic: "/images/cover-bg.jpg",
    profile_pic: "/images/cover-bg.jpg",
    title_name: "People card5",
    user_address: "Student | Jalandhar, Punjab",
    links_range: "142",
  },
  {
    id: 11,
    cover_pic: "/images/cover-bg.jpg",
    profile_pic: "/images/cover-bg.jpg",
    title_name: "People card6",
    user_address: "Student | Jalandhar, Punjab",
    links_range: "142",
  },
  {
    id: 12,
    cover_pic: "/images/cover-bg.jpg",
    profile_pic: "/images/cover-bg.jpg",
    title_name: "People card7",
    user_address: "Student | Jalandhar, Punjab",
    links_range: "142",
  },
];

const PeopleCard = () => {
  const [flip, setFlip] = useState(null);
  return (
    <Row xs={1} md={3} className="g-4">
    {Peopledata &&
      Peopledata.map((item) => (
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
                        <Dropdown.Item href="#/action-1">Block</Dropdown.Item>
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
                <Button className=" card_btn">Linked</Button>
                <Button className=" card_btn">Message</Button>
                <Button className=" card_btn">Activities</Button>
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
                  Hello everyone. My name is Anshita. I am a student of B.Tech
                  (CSE)
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
                  state level certificate in throwball state level certificate
                  in throwball
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
  );
};

export default PeopleCard;
