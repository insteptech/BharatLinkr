import React from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const CourseBars = ["B.Ed", "M.Ed", "BCA", "MCA"];

function CourseFeeLeft(props) {
  const { dataValue, setDataValue } = props;
  const collegeDetails = useSelector(
    (data) => data?.collegelist?.college?.rows
  );

  return (
    <>
      <div className="profile_search_bar_col ">
        <div className="search_profile_search_bar college_master_search">
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
      <div className="card_sec">
        <div className="card_mid search_left_card">
        <ul className="nav search_page_left_tabs_box">
            {collegeDetails.length>0 &&
              collegeDetails[0]?.AssociateCourse?.map((steps, stepsIndex) => (
                <li className="nav-item search_page_side_tabs w-100" key={stepsIndex}>
                  <a
                    className={`nav-link admin_tabs_name no_wrap side_tabs w-100 ${
                      dataValue === stepsIndex && "active_bar"
                    }`}
                    active={true}
                    onClick={() => setDataValue(stepsIndex)}
                  >
                    {steps?.courseName}
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
