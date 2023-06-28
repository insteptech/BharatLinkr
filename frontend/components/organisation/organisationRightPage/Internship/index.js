import React from "react";
import { useRef } from "react";

const Internship = () => {
  const handleClickScroll = () => {
    if (typeof window !== 'undefined') {
      const element = document.getElementById("section-1");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  const handleClickScroll2 = () => {
    if (typeof window !== 'undefined') {

      const element = document.getElementById("section-2");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div>
      <div id="hero-section">
        <button className="btn-scroll" onClick={handleClickScroll}>
          Scroll Down
        </button>
      </div>
      <div id="section-1" style={{ marginTop: "300px" }}>Section 1</div>
      <button style={{ marginTop: "90px" }} className="btn-scroll" onClick={handleClickScroll2}>
        Scroll Down
      </button>
      <div id="section-2" style={{ marginTop: "300px" }}>
        Section 2
      </div>
    </div>
  );
};

export default Internship;
