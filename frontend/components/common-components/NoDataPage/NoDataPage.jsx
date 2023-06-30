import React from 'react'

export default function NoDataPage(props) {
    const { name } = props
    return (
        <p className='no_data_page'>
            No {name ? name : 'Data'} To Show!
        </p>
    )
}
