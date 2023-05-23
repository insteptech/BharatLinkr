import { useRouter } from "next/router";
import React from "react";

import LearningLinks from "./learningLinks";
import QuickLinks from "./quickLinks";
import StudyGols from "./studyGols";

const LeftPage = () => {
  return (
    <>
      <div className="user_left_page_bg">
        <div className="col">
          <div className="left_sec">
            <StudyGols />
            <LearningLinks />
            <QuickLinks />
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftPage;
