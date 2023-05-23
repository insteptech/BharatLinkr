import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getExamById } from '../../../redux/actions/exams/createExam'

function Examleftpage({ setActiveInnertab, lefttab, setActiveTab, activeTab }) {
    const router = useRouter()
    const { active } = router.query

    useEffect(() => {
        if (active) {
            setActiveTab(lefttab[active][0].value)
            if (active !== 'faq') {   
                setActiveInnertab(lefttab[active][0].key)
            }
        }
    }, [active])

    return (
        <>
            <div className="card_sec">
                <div className="card_mid search_left_card">
                    <ul className="nav search_page_left_tabs_box">
                        {active &&
                            lefttab[active].map((item, index) => (
                                <li
                                    className="nav-item search_page_side_tabs w-100"
                                    key={index}
                                >
                                    <a
                                        className={`nav-link admin_tabs_name no_wrap side_tabs w-100 ${activeTab === item?.value && "active_bar"
                                            }`}
                                        active={true}
                                        onClick={() => {
                                            if (active !== 'faq') {   
                                                setActiveInnertab(item.key)
                                            }
                                            setActiveTab(item.value)
                                        }}
                                    >
                                        {item.value}
                                    </a>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Examleftpage