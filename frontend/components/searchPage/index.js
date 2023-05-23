import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import SearchLeftPage from "../homeLayout/leftPage/searchLeftPage";
import SearchRightPage from "../homeLayout/rightPage/searchRightPages";

const searchdata1 = [
  {
    studyName: "Profiles",
    key:"profiles",
    count: 112,
    icons: "/images/profile-icon.svg",
    darkicons: "/images/dark-profile.svg",
    path: "/college",
  },
  {
    studyName: "Scripts",
    key:"scripts",
    count: 102,
    icons: "/images/post-icon.svg",
    darkicons: "/images/dark-posts.svg",
    path: "/courses",
  },
  {
    studyName: "Jobs",
    key:"jobs",
    count: 11,
    icons: "/images/hiring-icon.svg",
    darkicons: "/images/dark-hiring.svg",
    path: "/exams",
  },
  {
    studyName: "Internships",
    key:"internships",
    count: 12,
    icons: "/images/announcement-icon.svg",
    darkicons: "/images/dark-announcement.svg",
    path: "/college",
  },
  {
    studyName: "Announcements",
    key:"announcements",
    count: 12,
    icons: "/images/announcement-icon.svg",
    darkicons: "/images/dark-announcement.svg",
    path: "/college",
  },
  {
    studyName: "Question Bank",
    key:"questionbank",
    count: 161,
    icons: "/images/question-icon.svg",
    darkicons: "/images/dark-question.svg",
    path: "/college",
  },
  {
    studyName: "Offer Services",
    key:"offerservices",
    count: 102,
    icons: "/images/offer-icon.svg",
    darkicons: "/images/dark-offer.svg",
    path: "/courses",
  },
  {
    studyName: "Colleges",
    key:"colleges",
    count: 76,
    icons: "/images/college-icon.svg",
    darkicons: "/images/dark-college.svg",
    path: "/exams",
  },
  {
    studyName: "Courses",
    key:"courses",
    count: 179,
    icons: "/images/course-icon.svg",
    darkicons: "/images/dark-course.svg",
    path: "/college",
  },
  {
    studyName: "Exams",
    key:"exams",
    count: 2,
    icons: "/images/exam-icon.svg",
    darkicons: "/images/dark-exam.svg",
    path: "/college",
  },
  {
    studyName: "Corporate",
    key:"corporate",
    count: 12,
    icons: "/images/corporate-icon.svg",
    darkicons: "/images/dark-corporate.svg",
    path: "/college",
  },
  {
    studyName: "Organisation",
    key:"organisation",
    count: 16,
    icons: "/images/light-organization.svg",
    darkicons: "/images/company-profile-blue.svg",
    path: "/college",
  },
{
    studyName: "Mentoring",
    key:"mentoring",
    count: 120,
    icons: "/images/light-job.svg",
    darkicons: "/images/dark-job.svg",
    path: "/college",
  },
{
    studyName: "College Festives",
    key:"collegefestivals",
    count: 120,
    icons: "/images/light-job.svg",
    darkicons: "/images/dark-job.svg",
    path: "/college",
  },
{
    studyName: "scholarship",
    key:"scholarship",
    count: 120,
    icons: "/images/scholarship.svg",
    darkicons: "/images/scholarship-blue.svg",
    path: "/college",
  },
{
    studyName: "cultural events",
    key:"culturalevents",
    count: 120,
    icons: "/images/light-job.svg",
    darkicons: "/images/dark-job.svg",
    path: "/college",
  },
{
    studyName: "conferences",
    key:"conferences",
    count: 120,
    icons: "/images/conference.svg",
    darkicons: "/images/conference-blue.svg",
    path: "/college",
  },
{
    studyName: "competitions",
    key:"competitions",
    count: 120,
    icons: "/images/competition.svg",
    darkicons: "/images/competition-blue.svg",
    path: "/college",
  },
{
    studyName: "hackathon",
    key:"hackathon",
    count: 120,
    icons: "/images/light-job.svg",
    darkicons: "/images/dark-job.svg",
    path: "/college",
  },
{
    studyName: "Hiring Challenges",
    key:"hiringchallenges",
    count: 120,
    icons: "/images/light-job.svg",
    darkicons: "/images/dark-job.svg",
    path: "/college",
  },
{
    studyName: "Campus Recruitment",
    key:"campusrecruitment",
    count: 120,
    icons: "/images/light-job.svg",
    darkicons: "/images/dark-job.svg",
    path: "/college",
  },
];
const SearchPage = () => {
  const [dataValue, setDataValue] = React.useState('profiles');

  return (
    <>
      <div className="user_dashboard_bg ">
      <Container fluid>
          <Row>
            <Col lg={1} md={0} className="hide_box p-0"></Col>
            <Col lg={10}>
              <Row>
                <Col
                  lg={3}
                  md={0}
                  className="search_left_page_bg position_set hide_box"
                >
                  <div>
                    <SearchLeftPage
                      dataValue={dataValue}
                      setDataValue={setDataValue}
                      searchdata1={searchdata1}
                    />
                  </div>
                </Col>
                <Col md={12} lg={9} className="search_right_page_bg ">
                  <div>
                    <SearchRightPage
                      searchdata1={searchdata1}
                      dataValue={dataValue}
                      setDataValue={setDataValue}
                    />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col lg={1} md={0} className="p-0 white_bg hide_box"></Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default SearchPage;
