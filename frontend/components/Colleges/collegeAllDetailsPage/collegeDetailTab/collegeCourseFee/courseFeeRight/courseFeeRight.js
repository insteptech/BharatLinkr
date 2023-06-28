import React, { useEffect } from "react";
import CourseFee from "./courseFee";
import { Col, Row } from "react-bootstrap";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import { useDispatch, useSelector } from "react-redux";
import {getAllMasterFilter} from "../../../../../../redux/actions/masterfilter/createmasterfilter"

const CourseBars = ["B.Ed", "M.Ed", "BCA", "MCA"];

function CourseFeeRight(props) {
  const { dataValue, setDataValue } = props;
  const programTypelist = useSelector((data)=>data?.allMasterFilterList?.masterfilterlist?.data?.data?.coursecategory)
  
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllMasterFilter('coursecategory'))
  }, [])

  return (
    <>
      <div className="admin_home_tabs_row top_padding_none big_screen_none">
        <Row>
          <Col lg={12} className="p-0">
            <ScrollingCarousel show={5.5} slide={4} swiping={true}>
              <ul className="nav ">
                {CourseBars &&
                  CourseBars?.map((steps, stepsIndex) => (
                    <li className="nav-item " key={stepsIndex}>
                      <a
                        className={`nav-link admin_tabs_name ${
                          dataValue === stepsIndex && "head-active"
                        }`}
                        active={true}
                        onClick={() => setDataValue(stepsIndex)}
                      >
                        {steps}
                      </a>
                    </li>
                  ))}
              </ul>
            </ScrollingCarousel>
          </Col>
        </Row>
      </div>
      <div className="">
        {props.dataValue === 0 && <CourseFee programTypelist={programTypelist}/>}
        {props.dataValue === 1 && <h3>hIGHLIGHTS2</h3>}
        {props.dataValue === 2 && <h3>Ranking & Awards2</h3>}
        {props.dataValue === 3 && <h3>COURSES2</h3>}
        {props.dataValue === 4 && <h3>SCHOLARSHIP PLACEMENTS2</h3>}
        {props.dataValue === 5 && <h3>FACILITIES2</h3>}
      </div>
    </>
  );
}

export default CourseFeeRight;
