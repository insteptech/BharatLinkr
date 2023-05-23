import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import Searchfilters from "../../../../searchPage/searchFilters/searchfilters";

const AnnouncementData = [
  {
    profileImg: "/images/mdi_pro.png",
    subImg: "/images/user-graduate.png",
    timeImg: "/images/ios-time.png",
    tagImg: "/images/metro-tag.png",
    userName: "Noor Fatima",
    userTitle: "created a hiring post",
    subTitle: "Student | Lyallpur college of Technology",
    postTime: "2Hrs",
    postTag: "Monika & 4 Others",
    postHeading: "Graphic designer required!",
    likeIcon: "/images/liker.png",
    comIcon: "/images/com_ent.png",
    shareIcon: "/images/sender.png",
    likeNum: "125",
    comNum: "105",
    shareNum: "25",
    viewOption: "View Opinions",
    sendcomIcon: "/images/send_btn.png",
    postPaira:
      " Lorem ipsum dolor sit amet, consetetur sadipscing  Lorem ipsum dolor sit amet, consetetur sadipscing  Lorem ipsum dolor sit amet, consetetur sadipscing",
  },
  {
    profileImg: "/images/mdi_pro.png",
    subImg: "/images/user-graduate.png",
    timeImg: "/images/ios-time.png",
    tagImg: "/images/metro-tag.png",
    userName: "Noor Fatima",
    userTitle: "created a hiring post",
    subTitle: "Student | Lyallpur college of Technology",
    postTime: "2Hrs",
    postTag: "Monika & 4 Others",
    postHeading: "Graphic designer required!",
    likeIcon: "/images/liker.png",
    comIcon: "/images/com_ent.png",
    shareIcon: "/images/sender.png",
    likeNum: "125",
    comNum: "105",
    shareNum: "25",
    viewOption: "View Opinions",
    sendcomIcon: "/images/send_btn.png",
    postPaira:
      " Lorem ipsum dolor sit amet, consetetur sadipscing  Lorem ipsum dolor sit amet, consetetur sadipscing  Lorem ipsum dolor sit amet, consetetur sadipscing",
  },
];

const AnnouncementTab = () => {
  const filterdata = [
    {
      name: 'Stream',
      data: [{ name: 'Date' }, { name: 'Popularity' }],
      key: 'name'
    },
    {
      name: 'Sub Stream',
      data: [{ name: 'Date' }, { name: 'Popularity' }],
      key: 'name'
    },
    {
      name: 'Sort By',
      data: [{ name: 'Date' }, { name: 'Popularity' }],
      key: 'name'
    },
  ]
  return (
    <>
      <div className="">
        <Row>
          <Col lg={12} className="text-center">
            <h2 className="edit_profile_h2">ANNOUNCEMEnts</h2>
          </Col>
        </Row>
        <Searchfilters filterdata={filterdata}/>
        <div>
          {AnnouncementData &&
            AnnouncementData?.map((item, index) => (
              <>
                <div key={index} className="profile_sec_c">
                  <Row>
                    <Col md={12}>
                      <div className="mid_comment">
                        <div className="mid_comment_profile">
                          <div className="mid_comment_left">
                            <img src={item.profileImg} />
                          </div>

                          <div className="mid_comment_mid">
                            <h1>
                              {item.userName}
                              <span>{item.userTitle}</span>
                            </h1>
                            <div>
                              <img src={item.subImg} />
                              <span>{item.subTitle}</span>
                            </div>
                          </div>

                          <div className="mid_comment_end">
                            <span>
                              <img src={item.timeImg} />
                              {item.postTime}
                            </span>
                            <span>
                              <img src={item.tagImg} />
                              {item.postTag}
                            </span>
                          </div>
                        </div>

                        <div className="req">
                          <p>{item.postHeading}</p>
                        </div>

                        <div className="req_p">
                          <p>
                            {item.postPaira}
                            <a href="">...Read more </a>
                          </p>
                        </div>

                        <div className="bottom_comment_profile">
                          <div className="bottom_comment_left">
                            <span>
                              <img src={item.likeIcon} />
                              {item.likeNum}
                            </span>
                            <span>
                              <img src={item.comIcon} />
                              {item.comNum}
                            </span>
                            <span>
                              <img src={item.shareIcon} />
                              {item.shareNum}
                            </span>
                          </div>

                          <div className="bottom_comment_right">
                            <a href="">{item.viewOption}</a>
                          </div>
                        </div>

                        <div className="chat-footer">
                          <div className="input-group">
                            <div className="input-group-append">
                              <span className=" attach_btn">
                                <img src={item.profileImg} />
                              </span>
                            </div>
                            <textarea
                              name=""
                              className="form-control type_msg"
                              placeholder="write an opinion..."
                            ></textarea>
                            <div className="input-group-append">
                              <span className=" attach_btn">
                                <img src={item.sendcomIcon} />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </>
            ))}
        </div>
      </div>
    </>
  );
};

export default AnnouncementTab;
