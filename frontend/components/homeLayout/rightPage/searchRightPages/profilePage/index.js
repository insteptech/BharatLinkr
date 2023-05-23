import React from "react";
import { Col, Row } from "react-bootstrap";
import CompanyCard from "../../../../organisation/organisationRightPage/companyCard";
import AllCard from "./allCard";
import ProfileCollegeCard from "./collegeCard";
import OrganisationsearchCard from "./organisationcard";
import PeopleCard from "./peopleCard";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import Searchfilters from "../../../../searchPage/searchFilters/searchfilters";

export default function ProfilesPage() {
  const FormSteps = ["All", "People", "College", "Organisation"];
  const [dataValue, setDataValue] = React.useState(0);
  const filterdata = [
    {
      name: "Stream",
      data: [{ name: "Date" }, { name: "Popularity" }],
      key: "name",
    },
    {
      name: "Sub Stream",
      data: [{ name: "Date" }, { name: "Popularity" }],
      key: "name",
    },
    {
      name: "Sort By",
      data: [{ name: "Date" }, { name: "Popularity" }],
      key: "name",
    },
  ];

  return (
    <>
      <div className="">
        <div className="admin_home_tabs_row top_padding_none">
          <Row>
            <Col lg={12} md={12} className="p-0">
              <ScrollingCarousel show={5.5} slide={4} swiping={true}>
                <ul className="nav ">
                  {FormSteps &&
                    FormSteps?.map((steps, stepsIndex) => (
                      <li className="nav-item " key={stepsIndex}>
                        <a
                          className={`nav-link admin_tabs_name ${
                            dataValue === stepsIndex && "head-active"
                          }`}
                          active={true}
                          onClick={() => setDataValue(stepsIndex)}
                        >
                          {steps}
                        </a>
                      </li>
                    ))}
                </ul>
              </ScrollingCarousel>
            </Col>
          </Row>
        </div>
        <Row>
          <Col lg={6} md={12} className="big_screen_hide_box">
            <div className="profile_search_bar_col padding_10">
              <div className="search_profile_search_bar">
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
          </Col>
        </Row>

        {dataValue === 0 && <AllCard />}
        {dataValue === 1 && <PeopleCard />}
        {dataValue === 2 && <ProfileCollegeCard />}
        {dataValue === 3 && <OrganisationsearchCard />}
      </div>
    </>
  );
}
