import React, { useState } from "react";

const hiringData = [
  {
    heading: "Apple reality pro May launch..",
    names: "Manpreet Kaur",
    dates: "19 Sep 22",
  },
  {
    heading: "Apple reality pro May launch..",
    names: "Manpreet Kaur",
    dates: "19 Sep 22",
  },
  {
    heading: "Apple reality pro May launch..",
    names: "Manpreet Kaur",
    dates: "19 Sep 22",
  },
  {
    heading: "Apple reality pro May launch..",
    names: "Manpreet Kaur",
    dates: "19 Sep 22",
  },
  {
    heading: "Apple reality pro May launch..",
    names: "Manpreet Kaur",
    dates: "19 Sep 22",
  },
  {
    heading: "Apple reality pro May launch..",
    names: "Manpreet Kaur",
    dates: "19 Sep 22",
  },
];

const LatestHiring = () => {
  const [show, setShow] = useState(1)

  const handleShow = () => {
    setShow(!show)
  }
  return (
    <>
      <div className="card_sec mid hide_box">
        <div className="card_top">
          <h1>
            <img src="/images/learning_link.png" />
            LATEST HIRING
          </h1>
        </div>
        <div className="card_mid">
          {hiringData &&
            hiringData?.map((item, index) => {
              return (
                <>
                  {show && index < 4 &&
                    <ul key={index}>
                      <li>
                        <span className="hover_link">{item.heading}</span>
                        <div className="flex_it">
                          <p>{item.names}</p>
                          <p>{item.dates}</p>
                        </div>
                      </li>
                    </ul>
                  }
                   {!show && 
                    <ul key={index}>
                      <li>
                        <span className="hover_link">{item.heading}</span>
                        <div className="flex_it">
                          <p>{item.names}</p>
                          <p>{item.dates}</p>
                        </div>
                      </li>
                    </ul>
                  }
                </>

              );
            })}

          <h6 onClick={handleShow}>{show ? "Show more..." : "Show less" }</h6>

        </div>
      </div>
    </>
  );
};

export default LatestHiring;
