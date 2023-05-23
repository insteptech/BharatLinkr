import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";

const MobileTabs = () => {
  const dummyData = require("../UserHead/UserHeadData.json");
  const [activeIndex, setActiveIndex] = useState("");
  const router = useRouter();
  useEffect(() => {
    const storedActiveIndex = localStorage.getItem("activeIndex");
    if (storedActiveIndex !== null) {
      setActiveIndex(parseInt(storedActiveIndex));
    }
  }, []);
  const handleActive = (id, path) => {
    localStorage.setItem("activeIndex", id.toString());
    setActiveIndex(id);
    router.push(`${path}`);
  };
  return (
    <>
      <div className="mobile_footer_btn_row mobile_tab_scroll">
        {dummyData?.map((items, index) => {
          return (
            <div
              key={index}
              onClick={() => handleActive(index, items.path)}
              className="mobile_tabs_footer_btn m_f_tabs"
            >
              <Image
                className={
                  activeIndex == index
                    ? "mobile_tabs_icons icon_opacity"
                    : "mobile_tabs_icons"
                }
                src={items.bluelogo}
              />
              <h6 className="user_header_btn_namek font_12 font_10">
                {items.name}
              </h6>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MobileTabs;
