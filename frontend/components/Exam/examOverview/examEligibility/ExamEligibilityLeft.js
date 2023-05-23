import React from "react";
const EligibilityBars = [
  "examEligibilityIntro",
  "examEligibilityHighlights",
  "detailedCriteria",
  "marksRequiredForQualifying",
  "createdAt",
  "updatedAt",
];
const ExamEligibilityLeft = (props) => {
  const { dataValue, setDataValue } = props;

  return (
    <>
      <div className="card_sec">
        <div lassName="card_mid search_left_card">
          <ul className="nav search_page_left_tabs_box">
            {EligibilityBars &&
              EligibilityBars?.map((steps, stepsIndex) => (
                <li className="nav-item search_page_side_tabs" key={stepsIndex}>
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
};

export default ExamEligibilityLeft;
