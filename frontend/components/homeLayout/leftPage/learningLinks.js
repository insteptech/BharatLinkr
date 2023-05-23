import React from "react";
import { useState } from "react";

const learningLinksData = [
  {
    learningName: "Learn English",
    icon: "/images/learning.png",
  },
  {
    learningName: "Learn IELTS",
    icon: "/images/learning.png",
  },
  {
    learningName: "Learn Quants",
    icon: "/images/learning.png",
  },
  {
    learningName: "Learn Reasoning",
    icon: "/images/learning.png",
  },
  {
    learningName: "Learn Verbal Ability",
    icon: "/images/learning.png",
  },
  {
    learningName: "Soft Skills",
    icon: "/images/learning.png",
  },
  {
    learningName: "Interview Preparation",
    icon: "/images/learning.png",
  },
  {
    learningName: "Practice Test",
    icon: "/images/learning.png",
  },
  {
    learningName: "Question Bank",
    icon: "/images/learning.png",
  },
];

const LearningLinks = () => {
  const [show, setShow] = useState(1);
  const handleShow = () => {
    setShow(!show);
  };
  return (
    <>
      <div className="card_sec mid hide_box">
        <div className="card_top">
          <h1>
            <img src="/images/learning_link.png" />
            learning links
          </h1>
        </div>
        <div className="card_mid">
          {learningLinksData &&
            learningLinksData?.map((item, index) => {
              return (
                <>
                  {show && index < 8 && (
                    <ul key={index}>
                      <li>
                        <img src={item.icon} />
                        <span className="hover_link">{item.learningName}</span>
                      </li>
                    </ul>
                  )}
                  {!show && (
                    <ul key={index}>
                      <li>
                        <img src={item.icon} />
                        <span className="hover_link">{item.learningName}</span>
                      </li>
                    </ul>
                  )}
                </>
              );
            })}

          <div className="text-center">

            <h6 className="font_12 green_text" href="#" onClick={handleShow}>

              {show ? "Show more..." : "Show less"}
            </h6>
          </div>

        </div>
      </div>
    </>
  );
};

export default LearningLinks;
