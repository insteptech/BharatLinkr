import React from "react";
import CommonHead from "../common-components/UserHead/CommonHead";
import MobileTabs from "../common-components/mobile_tabs_footer";
import MobileChat from "../common-components/mobileChat";

function UserLayout({ children }) {
  return (
    <>
      <CommonHead />
      <div>{children}</div>
      <MobileChat />
      <MobileTabs />
    </>
  );
}

export default UserLayout;
