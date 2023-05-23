import React from 'react'
import { Form } from 'react-bootstrap'

function Pagesize({ setPagination }) {
    const handlePageSize = (e) => {
        setPagination({
            pageNo: 1,
            pageSize: Number(e)
        })
    }
    return (
        <>
            <Form.Select className='num_dropdown' aria-label="Default select example" name="pagesize" onChange={(e) => { handlePageSize(e.target.value) }}>
                <option >10</option>
                <option >8</option>
                <option >5</option>
                <option >3</option>
            </Form.Select>
        </>
    )
}

export default Pagesize