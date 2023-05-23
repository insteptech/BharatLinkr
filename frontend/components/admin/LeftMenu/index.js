import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Image } from "react-bootstrap";

const LeftMenuPage = () => {
  const dummyData = require("./leftmenuData.json");
  const [activeIndex, setActiveIndex] = useState("");
  const router = useRouter();
  // console.log(router.pathname, "pathname");
  //   router.asPath
  const handleActive = (id, path) => {
    setActiveIndex(id);
    router.push(`/admin${path}`);
  };
  return (
    <>
      <div className="leftmenu">
        <h2 className="leftmenu_logo_heading">Logo</h2>
        {dummyData?.map((items, index) => {
          return (
              <div
                key={index}
                onClick={() => handleActive(index, items.path)}
                className={
                  router.pathname.includes(items.path)
                    ? "leftmenu_btn active"
                    : "leftmenu_btn"
                }
              >
                <Image
                  className="admin_leftmenu_btn_icon"
                  src={activeIndex == index ? items.whitelogo : items.logo}
                />
                <h6
                  className={
                    activeIndex == index
                      ? "leftmenu_tabs_name white_font"
                      : "leftmenu_tabs_name"
                  }
                >
                  {items.name}
                </h6>
              </div>
          );
        })}
      </div>
    </>
  );
};

export default LeftMenuPage;
