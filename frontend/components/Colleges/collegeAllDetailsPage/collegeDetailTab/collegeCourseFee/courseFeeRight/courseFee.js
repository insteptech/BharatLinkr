import React, { memo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CourseFeesCard from "./courseFeesCard";
import { useSelector } from "react-redux";

function CourseFee({ programTypelist }) {
  const [dataValue, setDataValue] = React.useState(programTypelist[0]?.id);
  const collegeDetails = useSelector(
    (data) => data?.collegelist?.college?.rows
  );
  return (
    <>
      <div className="admin_home_tabs_row">
        <Row>
          <Col lg={12} md={12} className="p-0">
            <ul className="nav tabs_scroll" style={{ display: "flex" }}>
              {programTypelist &&
                programTypelist?.map((steps, stepsIndex) => (
                  <li className="nav-item " key={stepsIndex}>
                    <a
                      className={`nav-link admin_tabs_name ${dataValue === steps?.id && "head-active"
                        }`}
                      active={true}
                      onClick={() => setDataValue(steps?.id)}
                    >
                      {steps?.name}
                    </a>
                  </li>
                ))}
            </ul>
          </Col>
        </Row>
      </div>
      <Row>
        <Col md={12}>
          {collegeDetails?.length > 0 && collegeDetails[0]?.AssociateCourse?.map((item, index) => {
            if (item?.CourseCategory?.id == dataValue) {
              return <CourseFeesCard index={index} item={item}/>
            }
          })
          }
        </Col>
      </Row>
    </>
  );
}

export default memo(CourseFee);
