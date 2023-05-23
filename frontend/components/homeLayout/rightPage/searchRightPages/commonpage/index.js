import React from 'react'
import { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Searchfilters from '../../../../searchPage/searchFilters/searchfilters'

function CommonTab({ data }) {

    // const list = data.selectordata()
    // console.log(data,'data')
    useEffect(() => {
        data.api()
    }, [])

    return (
        <div>
            <Row>
                <Col lg={12} className="text-center edit_profile_h2">
                    <h2>{data?.name}</h2>
                </Col>
            </Row>
            <Row>
                <Col></Col>
                <Col lg={5} md={6} sm={12}>
                    <div className="search_profile_search_bar company_right_search_bar mb-3">
                        <input
                            type="text"
                            placeholder="Search..."
                            name=""
                            className="form-control chat_box_weite_bar font_13"
                        />
                        <button className="ms-0" type="submit">
                            <img src="/images/search.png" />
                        </button>
                    </div>
                </Col>
            </Row>
            {data?.name !== "Profiles" && <Searchfilters filterdata={data?.filterdata} />}
        </div>
    )
}

export default CommonTab