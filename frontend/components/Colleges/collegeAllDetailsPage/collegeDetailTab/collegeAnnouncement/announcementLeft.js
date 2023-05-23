import React from "react";
const AnnouncementBars = [
  "gRAphic Designer required...",
  "gRAphic Designer required...",
  "gRAphic Designer required...",
  "gRAphic Designer required...",
];
function AnnouncementLeft(props) {
  const { dataValue, setDataValue } = props;

  return (
    <>
      <div className="card_sec">
        <div className="card_mid search_left_card">
          <ul className="nav search_page_left_tabs_box">
            {AnnouncementBars &&
              AnnouncementBars?.map((steps, stepsIndex) => (
                <li className="nav-item search_page_side_tabs w-100" key={stepsIndex}>
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

export default AnnouncementLeft;
