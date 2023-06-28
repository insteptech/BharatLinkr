import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const PlacementBars = [
    "B.TECH HighLights",
    "M.B.A HighLights",
    "HighLights 2021",
    "Placement Introduction",
    "Top Recruiters"
]
const PlacementRight = (props) => {
    const { dataValue, setDataValue } = props;

    const collegeDetails = useSelector(
        (data) => data?.collegelist?.college?.rows
    );

    return (
        <>
            <div className="admin_home_tabs_row top_padding_none big_screen_none">
                <Row>
                    <Col lg={12} className="p-0">
                        <ScrollingCarousel show={5.5} slide={4} swiping={true}>
                            <ul className="nav ">
                                {PlacementBars &&
                                    PlacementBars?.map((steps, stepsIndex) => (
                                        <li className="nav-item " key={stepsIndex}>
                                            <a
                                                className={`nav-link admin_tabs_name ${dataValue === stepsIndex && "head-active"
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

            {collegeDetails && collegeDetails.map((placementData, index) => (
                <div className="" key={index}>
                    {props.dataValue === 0 && (
                        <>
                            <p>{placementData?.BTECHhighLights}</p>
                        </>
                    )}
                    {props.dataValue === 1 && (
                        <>
                            <p>{placementData?.MBAhighLights}</p>
                        </>
                    )}
                    {props.dataValue === 2 && (
                        <>
                            <p>{placementData?.highLights2021}</p>
                        </>
                    )}
                    {props.dataValue === 3 && (
                        <>
                            <p>{placementData?.placeMentIntro}</p>
                        </>
                    )}
                    {props.dataValue === 4 && (
                        <>
                            <p>{placementData?.topRecruiters}</p>
                        </>
                    )}
                    {props.dataValue === 5 && (
                        <>
                            <p>{placementData?.yearWisePlaceMents}</p>
                        </>
                    )}
                </div>
            ))}


        </>
    );
};

export default PlacementRight;
