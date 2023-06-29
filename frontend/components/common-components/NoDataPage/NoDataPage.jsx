import React from 'react'

export default function NoDataPage(props) {
    const { name } = props
    return (
        <p className='text-center'>
            No {name ? name : 'Data'} To Show
        </p>
    )
}
