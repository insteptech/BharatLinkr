import { useRouter } from "next/router";
import React, { useState } from "react";
import HccecoLinks from "./hccecoLinks";
import LatestAnnouncement from "./latestAnnouncement";
import LatestHiring from "./latestHiring";

const RightPage = () => {
  return (
    <>
      <div className="user_right_page_bg">
        <div className="col">
          <div className="left_sec right">
            <LatestAnnouncement />
            <LatestHiring />
            <HccecoLinks />
          </div>
        </div>
      </div>
    </>
  );
};

export default RightPage;
