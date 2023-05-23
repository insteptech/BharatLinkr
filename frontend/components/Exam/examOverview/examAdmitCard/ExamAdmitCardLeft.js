import React from "react";
const AdmitCardBars = [
  "correction",
  "examAdmitCardHighlights",
  "forgotLoginDetails",
  "howToDownload",
  "releaseDate",
  "createdAt",
  "updatedAt",
];
const ExamAdmitCardLeft = (props) => {
  const { dataValue, setDataValue } = props;

  return (
    <>
     <div className="card_sec">
        <div className="card_mid search_left_card">
          <ul className="nav search_page_left_tabs_box">
            {AdmitCardBars &&
              AdmitCardBars?.map((steps, stepsIndex) => (
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
};

export default ExamAdmitCardLeft;
