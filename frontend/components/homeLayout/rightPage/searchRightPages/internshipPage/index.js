import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Searchfilters from '../../../../searchPage/searchFilters/searchfilters'

function InternshipPage() {
    const filterdata = [
        {
          name: 'Status',
          data: [{ name: 'Date' }, { name: 'Popularity' }],
          key: 'name'
        },
        {
          name: 'Department',
          data: [{ name: 'Date' }, { name: 'Popularity' }],
          key: 'name'
        },
        {
          name: 'Sub Department',
          data: [{ name: 'Date' }, { name: 'Popularity' }],
          key: 'name'
        },
        {
          name: 'Location',
          data: [{ name: 'Date' }, { name: 'Popularity' }],
          key: 'name'
        },
        {
          name: 'Eligibility',
          data: [{ name: 'Date' }, { name: 'Popularity' }],
          key: 'name'
        },
        {
          name: 'Job Type',
          data: [{ name: 'Date' }, { name: 'Popularity' }],
          key: 'name'
        },
        {
          name: 'Job Role',
          data: [{ name: 'Date' }, { name: 'Popularity' }],
          key: 'name'
        },
        {
          name: 'Work mode',
          data: [{ name: 'Date' }, { name: 'Popularity' }],
          key: 'name'
        },
        {
          name: 'Sort By',
          data: [{ name: 'Date' }, { name: 'Popularity' }],
          key: 'name'
        },
      ]
    return (
        <div>
            <Row>
                <Col lg={12} className="text-center edit_profile_h2">
                    <h2>INTERNSHIPS</h2>
                </Col>
            </Row>
            <Searchfilters filterdata={filterdata} />
        </div>
    )
}

export default InternshipPage