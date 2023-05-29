import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import OrganisationLeftPage from "./organisationLeftPage";
import OrganisationRightPage from "./organisationRightPage";
import { useDispatch } from "react-redux";
import { getOrganisationlist } from "../../redux/actions/organisation/addorganisation";

const OrganisationPage = () => {
  const [show, setShow] = useState(null);
  const [dataValue, setDataValue] = useState(0);
  const [filters, setFilters] = useState({});
  const [organisationFilter, setOrganisationFilter] = useState([]);

  const dispatch = useDispatch();

  const handleSearch = (e) => {
    let val = e.target.value;
    if (val.length > 0) {
      dispatch(getOrganisationlist({ search: e.target.value }));
    } else dispatch(getOrganisationlist());
  };

  const handleFilters = (data, name, isChecked) => {
    if (filters[name]) {
      if (isChecked === true) {
        filters[name].push(data.id);
      } else {
        if (filters[name].length === 1) {
          delete filters[name];
          let index = organisationFilter.indexOf(name);
          organisationFilter.splice(index, 1);
        } else {
          let index = filters[name].indexOf(data.id);
          filters[name].splice(index, 1);
        }
      }
    } else {
      filters[name] = [data.id];
      organisationFilter.push(name);
    }
    dispatch(getOrganisationlist(filters));
  };

  useEffect(() => {
    
  }, []);

  return (
    <>
      <div className="user_dashboard_bg ">
        <Container fluid>
          <Row>
            <Col lg={1} className="p-0  hide_box"></Col>
            <Col lg={10} className="">
              <Row>
                <Col lg={3} className="search_left_page_bg hide_box">
                  <OrganisationLeftPage
                    dataValue={dataValue}
                    setDataValue={setDataValue}
                    handleFilters={handleFilters}
                    handleSearch={handleSearch}
                    organisationFilter={organisationFilter}
                  />
                </Col>
                <Col lg={9} className="search_right_page_bg">
                  <OrganisationRightPage
                    dataValue={dataValue}
                    setDataValue={setDataValue}
                    show={show}
                    setShow={setShow}
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

export default OrganisationPage;
