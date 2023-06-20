import React, { useState } from "react";
import {
  Container,
  Form,
  Image,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { getTokenDecode } from "../utils";

function Header() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const handleActive = (id, path) => {
    setActiveIndex(id);
    router.push(`/admin/${path}`);
  };
  
  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  let dummyData = require("../admin/LeftMenu/leftmenuData.json");
  return (
    <Navbar sticky="top" expand="md" className="">
      <Container fluid className="p-0">
        <div className="mobile_admin_profile">
          <Image className="header_profile" src="/images/profile1.png" />
        </div>
        <Form className="d-flex header_form">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2 header_search_input"
            aria-label="Search"
          />
          <Image className="header_search_icon" src="/images/search-icon.svg" />
        </Form>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-md`}
          aria-labelledby={`offcanvasNavbarLabel-expand-md`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
              {/* <div className="mobile_admin_profile">
                <Image
                  className="header_profile"
                  src="/images/profile-img.jpg"
                />
              </div> */}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 header_btn item_align">
              <Nav.Link className="logout_btn" href="" onClick={handleLogout}>
                <Image src="/images/log-out-blue.svg" /> Log Out
              </Nav.Link>
              {/* <div className="mobile_admin_menu_profile"> */}
              <div className="drop_width">
                <NavDropdown
                  className="mobile_admin_menu_profile  mt-2"
                  title="Admin"
                  id={`offcanvasNavbarDropdown-expand-md`}
                >
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
              <Image
                className="header_profile mobile_admin_menu_profile"
                src="/images/profile1.png"
              />
              {/* </div> */}
            </Nav>
            <div className="mobile_menudata pt-5">
              {dummyData.map((items, index) => {
                return (
                  <div
                    onClick={() => handleActive(index, items.path)}
                    className={
                      activeIndex == index
                        ? "leftmenu_btn_mobile active"
                        : "leftmenu_btn_mobile"
                    }
                    key={index}
                  >
                    <Image
                      className="leftmenu_icons"
                      src={activeIndex == index ? items.whitelogo : items.logo}
                    />
                    <h6
                      className={
                        activeIndex == index
                          ? "leftmenu_tabs_name_mobile white_font"
                          : "leftmenu_tabs_name_mobile"
                      }
                    >
                      {items.name}
                    </h6>
                  </div>
                );
              })}
              <div className="leftmenu_tabs_name_mobile ms-3 mt-3" href="">
                <Image className="me-2" src="/images/pen.svg" /> Change Password
              </div>
              <div
                className="leftmenu_tabs_name_mobile ms-3 mt-3"
                href=""
                onClick={handleLogout}
              >
                <Image className="me-2" src="/images/log-out-blue.svg" /> Logout
              </div>
            </div>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default Header;
