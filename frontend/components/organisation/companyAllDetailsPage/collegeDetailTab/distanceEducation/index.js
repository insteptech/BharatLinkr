import React, { memo, useState } from "react";
import { Col, Row } from "react-bootstrap";
import DistanceEducationLeft from "./distanceEducationLeft";
import DistanceeducationRight from "./distanceeducationRight";

function DistanceEducationTab() {
  const [dataValue, setDataValue] = useState(0);

  return (
    <>
      <Row>
        <Col lg={3} className="search_left_page_bg hide_box">
          <DistanceEducationLeft
            dataValue={dataValue}
            setDataValue={setDataValue}
          />
        </Col>
        <Col lg={9} className="search_right_page_bg">
          <DistanceeducationRight
            dataValue={dataValue}
            setDataValue={setDataValue}
          />
        </Col>
      </Row>
    </>
  );
}

export default memo(DistanceEducationTab);
