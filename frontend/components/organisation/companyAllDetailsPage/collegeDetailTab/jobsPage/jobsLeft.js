import React from "react";
const jobsDetail = [
  "Business Development Manager [BDM]",
  "Business Development Manager [BDM]",
  "Business Development Manager [BDM]",
  "Business Development Manager [BDM]",
  "Business Development Manager [BDM]",
];
function JobsLeft(props) {
  const { dataValue, setDataValue } = props;

  return (
    <>
      <div className="profile_search_bar_col ">
        <div className="search_profile_search_bar college_master_search">
          <input
            type="text"
            placeholder="Search Job Role..."
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
            {jobsDetail &&
              jobsDetail?.map((steps, stepsIndex) => (
                <li
                  className="nav-item search_page_side_tabs w-100"
                  key={stepsIndex}
                >
                  <a
                    className={`nav-link admin_tabs_name side_tabs ${
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

export default JobsLeft;
