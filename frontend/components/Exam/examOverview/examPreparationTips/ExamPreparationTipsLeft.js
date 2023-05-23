import React from "react";
const PreparationTipsBars = [
  "bestTime",
  "sectionWisePreparationTips",
  "subject1Books",
  "subject2Books",
  "subject3Books",
  "subject4Books",
  "createdAt",
  "updatedAt",
];
const ExamPreparationTipsLeft = (props) => {
  const { dataValue, setDataValue } = props;

  return (
    <>
      <div className="card_sec">
        <div lassName="card_mid search_left_card">
          <ul className="nav search_page_left_tabs_box">
            {PreparationTipsBars &&
              PreparationTipsBars?.map((steps, stepsIndex) => (
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

export default ExamPreparationTipsLeft;
