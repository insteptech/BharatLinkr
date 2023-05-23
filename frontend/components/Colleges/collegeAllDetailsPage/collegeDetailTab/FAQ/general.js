import React from "react";
import { useState } from "react";

const faqData = [
  {
    id: 1,
    question: "What is eligibility criteria for scholarship?",
    answer:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, seddiam nonumy eirmod tempor invidunt ut labore et dolore magnaaliquyam erat, sed diam voluptua. At vero eos et accusam etjusto duo dolores et ea rebum. Stet clita kasd gubergren, no",
  },
  {
    id: 2,
    question: "What is eligibility ?",
    answer:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, erat, sed diam voluptua. At vero eos et accusam etjusto duo dolores et ea rebum. Stet clita kasd gubergren, no",
  },
];

const General = () => {
  const [show, toggleShow] = useState(false);
  const handleShow = () => {
    toggleShow(true);
  };
  const handleHide = () => {
    toggleShow(false);
  };
  return (
    <>
      <h4 className="heading_20 mobile_font_18">General</h4>
      {faqData &&
        faqData?.map((item) => {
          return (
            <>
              <div>
                <div
                  key={item.id}
                  className="plus_minus_acc_row mb-1"
                  onClick={handleShow}
                >
                  <img
                    className="plus_minus_icon"
                    src="/images/plus-border.svg"
                  />
                  <h6 className="plus_minus_acc_h6 mobile_font_14">
                    {item.question}
                  </h6>
                </div>
                {show && (
                  <div className="open">
                    <div className="plus_minus_acc_row" onClick={handleHide}>
                      <img
                        className="plus_minus_icon"
                        src="/images/minus-border.svg"
                      />
                      <h6 className="plus_minus_acc_h6 blue_color mobile_font_14">
                        {item.question}
                      </h6>
                    </div>
                    <p className="plus_minus_acc_h6 font_400 ps-4 mobile_font_14">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            </>
          );
        })}
    </>
  );
};

export default General;
