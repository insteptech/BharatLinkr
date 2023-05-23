import React from "react";

const SearchLeftPage = ({ searchdata1, dataValue, setDataValue }) => {
  return (
    <>
      <div className="position_set">
        <div className="card_sec card_fix">
          <div className="card_mid search_left_card">
            <ul className="nav search_page_left_tabs_box">
              {searchdata1 &&
                searchdata1?.map((steps, stepsIndex) => {
                  return (
                    <li
                      className="nav-item search_page_side_tabs w-100"
                      key={stepsIndex}
                    >
                      <a
                        className={`nav-link admin_tabs_name no_wrap side_tabs w-100 ${
                          dataValue === steps?.key && "active_bar"
                        }`}
                        active={true}
                        onClick={() => {
                          setDataValue(steps?.key);
                        }}
                      >
                        <img
                          src={
                            dataValue === steps?.key
                              ? steps.darkicons
                              : steps.icons
                          }
                        />
                        {steps.studyName}
                        <span className="ms-2">({steps.count})</span>
                      </a>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchLeftPage;
