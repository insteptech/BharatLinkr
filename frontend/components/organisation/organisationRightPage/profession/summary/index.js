import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import SummaryLeft from "./leftPage";
import { useState } from "react";
import SummaryRight from "./rightPage";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getProfessionById, professionlist } from "../../../../../redux/actions/organisation/profession";

const Summary = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { Id } = router.query

  const professionDetails = useSelector((state) => state?.sectorData?.professionById)
  const professiontypes = useSelector((state) => state?.sectorData?.professionList)

  useEffect(() => {
    dispatch(getProfessionById(Number(Id)))
    if (professionDetails && !professionDetails[0]?.ProfessionCode) {
      dispatch(professionlist({familyId:Number(professionDetails[0]?.FamilyCode?.id)}))
    }
  }, [Id])

  const [dataValue, setDataValue] = useState(0);
  return (
    <>
      <div className="user_dashboard_bg ">
        <Container fluid className="container_padding">
          <div className="test_name_row_bg">
            <Container>
              <h1 className="test_name ps-4 mobile_font_18">Summary</h1>
            </Container>
          </div>
          <Row>
            <Col lg={1} className="p-0 hide_box"></Col>
            <Col lg={10} className="">
              <Row>
                <Col lg={3} className="search_left_page_bg hide_box ps-4">
                  <SummaryLeft
                    professionDetails={professionDetails}
                    dataValue={dataValue}
                    setDataValue={setDataValue}
                  />
                </Col>
                <Col lg={9} className="search_right_page_bg">
                    <SummaryRight
                    professionDetails={professionDetails}
                    dataValue={dataValue}
                    setDataValue={setDataValue}
                    professiontypes={professiontypes}
                    />
                </Col>
              </Row>
            </Col>
            <Col lg={1} className="p-0 white_bg hide_box"></Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Summary;
