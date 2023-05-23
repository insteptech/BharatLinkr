import React, { useState } from "react";

const announcementData = [
  {
    title: "Apple reality pro May launch..",
    Name: "Manpreet Kaur",
    date: "19 Sep 22",
  },
  {
    title: "Apple reality pro May launch..",
    Name: "Manpreet Kaur",
    date: "19 Sep 22",
  },
  {
    title: "Apple reality pro May launch..",
    Name: "Manpreet Kaur",
    date: "19 Sep 22",
  },
  {
    title: "Apple reality pro May launch..",
    Name: "Manpreet Kaur",
    date: "19 Sep 22",
  },
  {
    title: "Apple reality pro May launch..",
    Name: "Manpreet Kaur",
    date: "19 Sep 22",
  },
  {
    title: "Apple reality pro May launch..",
    Name: "Manpreet Kaur",
    date: "19 Sep 22",
  },
];

const LatestAnnouncement = () => {
  const [showLess, setShowLess] = useState(1)

  const handleClickMore = () => {


    setShowLess(!showLess);

  }
  return (
    <>
      <div className="card_sec hide_box">
        <div className="card_top">
          <h1>
            <img src="/images/latest.png" />
            LATEST ANNOUNCEMENT
          </h1>
        </div>
        <div className="card_mid">
          {announcementData &&
            announcementData?.map((item, index) => {
              return (
                <>
                  {showLess && index < 4 &&
                    <ul key={index}>
                      <li>
                        <span className="hover_link">{item.title}</span>
                        <div className="flex_it">
                          <p>{item.Name}</p>
                          <p>{item.date}</p>
                        </div>
                      </li>
                    </ul>
                  }
                  {!showLess &&
                    <ul key={index}>
                      <li>
                        <span className="hover_link">{item.title}</span>
                        <div className="flex_it">
                          <p>{item.Name}</p>
                          <p>{item.date}</p>
                        </div>
                      </li>
                    </ul>
                  }
                </>
              );
            })}

          <h6 onClick={handleClickMore}>{showLess ? " Show more..." :
            "Show less"}</h6>
        </div>
      </div>
    </>
  );
};

export default LatestAnnouncement;
