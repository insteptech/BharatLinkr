import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";

const CourseBars = ["All", "Script", "Job", "Inernship"];

function CourseFeeLeft(props) {
  const { dataValue, setDataValue } = props;

  const [width, setWidth] = useState(window.innerWidth);

  window.addEventListener("resize", function (event) {
    setWidth(window.innerWidth);
  });

  return (
    <>
      <div className="profile_search_bar_col ">
        <div
          className={
            width <= 992
              ? "search_profile_search_bar"
              : "search_profile_search_bar college_master_search"
          }
        >
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
      <div className="card_sec hide_box">
        <div className="card_mid search_left_card">
        <ul className="nav search_page_left_tabs_box">
            {CourseBars &&
              CourseBars?.map((steps, stepsIndex) => (
                <li
                  className="nav-item search_page_side_tabs w-100"
                  key={stepsIndex}
                >
                  <a
                    className={`nav-link admin_tabs_name no_wrap side_tabs w-100 ${
                      dataValue === stepsIndex && "active_bar"
                    }`}
                    active={true}
                    onClick={() => setDataValue(stepsIndex)}
                  >
                    {steps}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default CourseFeeLeft;
