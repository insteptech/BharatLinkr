import { useRouter } from "next/router";
import React from "react";

const studyGoals = [
  {
    studyName: "Top colleges",
    icons: "/images/top_college.png",
    path: "/college",
  },
  {
    studyName: "Top Courses",
    icons: "/images/top_cour.png",
    path: "/courses",
  },
  {
    studyName: "Top Exams",
    icons: "/images/top_ex.png",
    path: "/exams",
  },
  {
    studyName: "write a review",
    icons: "/images/write_review.png",
    path: "/reviews",
  },
];

const StudyGols = () => {
  const router = useRouter();
  return (
    <>
      <div className="card_sec hide_box">
        <div className="card_top">
          <h1>
            <img src="/images/study_goals.png" />
            study_goals
          </h1>
        </div>
        <div className="card_mid pb-1">
          {studyGoals &&
            studyGoals?.map((item, index) => {
              return (
                <>
                  <ul key={index}>
                    <li>
                      <img src={item.icons} />
                      <span className="hover_link" onClick={() => router.push(item.path)}>
                        {item.studyName}
                      </span>
                    </li>
                  </ul>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default StudyGols;
