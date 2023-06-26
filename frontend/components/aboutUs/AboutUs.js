import React from "react";
import AboutPage from "./AboutPage";
import FactsFigures from "./facts&figures";
import GetInTouch from "./getInTouch";
import HowWeWork from "./howWeWork";
import OurBusinessPage from "./ourBusinessArea";
import CareValues from "./OurCareValues";
import OurTeam from "./ourTeam";
import PartnershipWithUs from "./partnersipWithUs";
import PrestigiousClients from "./prestigiousWithUs";
import VissionPage from "./vision&mision";

const AboutUs = (props) => {
  return (
    <>
      {/* <div>
        <AboutPage />
      </div> */}
      {props.dataValue === 0 && <AboutPage />}
      {props.dataValue === 1 && <VissionPage />}
      {props.dataValue === 2 && <OurBusinessPage />}
      {props.dataValue === 3 && <CareValues />}
      {props.dataValue === 4 && <HowWeWork />}
      {props.dataValue === 5 && <PartnershipWithUs />}
      {props.dataValue === 6 && <PrestigiousClients />}
      {props.dataValue === 7 && <FactsFigures />}
      {props.dataValue === 8 && <OurTeam />}
      {props.dataValue === 9 && <GetInTouch />}
    </>
  );
};

export default AboutUs;
