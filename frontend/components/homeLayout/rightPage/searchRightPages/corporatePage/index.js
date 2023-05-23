import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import HccecoLibrary from "./hccecoLibrary";
import MockTests from "./mockTests";
import ShortTricks from "./shortTricks";
import WorkSheets from "./worksheets";
import { useSelector } from "react-redux";
import Searchfilters from "../../../../searchPage/searchFilters/searchfilters";

export default function SearchCorporatePage() {
  const FormSteps = [
    "Short Tricks",
    "Worksheets",
    "Mock Tests",
    "HCCECO Library",
  ]; 
  const filterdata = [
    {
      name: 'Study Goals',
      data: [{ name: 'Date' }, { name: 'Popularity' }],
      key: 'name'
    },
    {
      name: 'Worksheets',
      data: [{ name: 'Date' }, { name: 'Popularity' }],
      key: 'name'
    },
    {
      name: 'Mock Tests',
      data: [{ name: 'Date' }, { name: 'Popularity' }],
      key: 'name'
    },
    {
      name: 'Library',
      data: [{ name: 'Date' }, { name: 'Popularity' }],
      key: 'name'
    }
  ]
  const [dataValue, setDataValue] = useState(0);

  return (
    <>
      <div className="">
        <Row>
          <Col lg={12} className="text-center edit_profile_h2">
            <h2>CORPORAtes</h2>
          </Col>
        </Row>
        <Searchfilters filterdata={filterdata} />
        <div className="admin_home_tabs_row">
          <Row>
            <Col lg={12} md={12} className="p-0">
              <ul className="nav tabs_scroll">
                {FormSteps &&
                  FormSteps?.map((steps, stepsIndex) => (
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
            </Col>
          </Row>
        </div>
        {dataValue === 0 && <ShortTricks />}
        {dataValue === 1 && <WorkSheets />}
        {dataValue === 2 && <MockTests />}
        {dataValue === 3 && <HccecoLibrary />}
      </div>
    </>
  );
}
