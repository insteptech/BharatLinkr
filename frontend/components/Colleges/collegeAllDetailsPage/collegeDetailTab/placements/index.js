import React, { memo, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import PlacementLeft from "./placementLeft";
import PlacementRight from "./placementRight";

function PlacementsTab() {
  const [dataValue, setDataValue] = useState(0);
  return (
    <>
      <Container>
      <Row>
        <Col lg={3} className="search_left_page_bg hide_box">
           <PlacementLeft dataValue={dataValue} setDataValue={setDataValue} /> 
        </Col>
        <Col lg={9} className="search_right_page_bg">
           <PlacementRight dataValue={dataValue} setDataValue={setDataValue} /> 
        </Col>
      </Row>
      </Container>
    </>
  );
}

export default memo(PlacementsTab);




 




