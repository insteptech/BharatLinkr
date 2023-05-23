import { ScrollingCarousel } from '@trendyol-js/react-carousel'
import React from 'react'
import { Form } from 'react-bootstrap'

function Searchfilters({ filterdata }) {
    return (
        <div className="dropdown_row mt-1 mb-3">
            <ScrollingCarousel show={5.5} slide={4} swiping={true}>
                {filterdata?.map((item, index) => {
                    let data = item?.data
                    let key = item?.key
                    return (
                        <Form.Select key={index} aria-label="Default select example">
                            <option>{item?.name}</option>
                            {data?.map((content, i) => {
                                return (
                                    <option key={i}>{content[key]}</option>
                                )
                            })}
                        </Form.Select>
                    )
                })}
            </ScrollingCarousel>
        </div >
    )
}

export default Searchfilters