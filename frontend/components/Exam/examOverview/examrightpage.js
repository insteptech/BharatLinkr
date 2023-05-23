import { ScrollingCarousel } from '@trendyol-js/react-carousel'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { apibasePath } from '../../../config'
import { getExamById } from '../../../redux/actions/exams/createExam'
import DOMPurify from 'dompurify'

function ExamrightPage({ activeInnertab, activeTab, setActiveTab, lefttab, setActiveInnertab }) {
    const router = useRouter()
    const dispatch = useDispatch()
    const { Id } = router.query
    const { active } = router.query

    const examData = useSelector((data) => {
        if (data?.exambyid?.exam?.data?.data?.rows?.length > 0) {
            return data?.exambyid?.exam?.data?.data?.rows[0]
        }
    })

    // const [activeTab, setActiveTab] = useState()

    const dataTabs = {
        about: 'ExamAbout',
        registration: 'Registration',
        admitcard: 'AdmitCard',
        importantdates: 'ImportantDates',
        reservation: 'Reservation',
        examcenters: 'Centres',
        eligibility: 'Eligibility',
        exampattern: 'Pattern',
        syllabus: 'Syllabus',
        preparationtips: 'PreparationTips',
        counselling: 'Counselling',
        faq: 'FAQ',
        participatingcolleges: 'ParticipatingCollege'
    }

    useEffect(() => {
        dispatch(getExamById(Number(Id)))
        // if (active && activeInnertab) {
        //     setActiveTab(dataTabs[active][0][activeInnertab])
        // }
    }, [Id])

    return (
        <>
            {/* <div className="admin_home_tabs_row top_padding_none big_screen_none">
        <Row>
          <Col lg={12} className="p-0">
            <ScrollingCarousel show={5.5} slide={4} swiping={true}>
              <ul className="nav ">
                {AboutBars &&
                  AboutBars?.map((steps, stepsIndex) => (
                    <li className="nav-item " key={stepsIndex}>
                      <a
                        className={`nav-link admin_tabs_name ${
                          dataValue === stepsIndex && "head-active"
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
      {props?.dataValue === 0 && (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                props?.data?.ExamAbout[0]?.examAboutDefination
              ),
            }}
          />
        </>
      )}

      {props.dataValue === 1 && (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                props?.data?.ExamAbout[0]?.examAboutHighlights
              ),
            }}
          />
        </>
      )}
      {props.dataValue === 2 && (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(data?.ExamAbout[0]?.examAboutHelpLine),
            }}
          />
        </>
      )}
      {props.dataValue === 3 && (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                data?.ExamAbout[0]?.examAboutHighlights
              ),
            }}
          />
        </>
      )}
      {props.dataValue === 4 && (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                data?.ExamAbout[0]?.examAboutImportantBooks
              ),
            }}
          />
        </>
      )}
      {props.dataValue === 5 && (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                data?.ExamAbout[0]?.examAboutImportantDates
              ),
            }}
          />
        </>
      )}
      {props.dataValue === 6 && (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(data?.ExamAbout[0]?.examAboutPattern),
            }}
          />
        </>
      )}
      {props.dataValue === 7 && (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                data?.ExamAbout[0]?.examAboutPreviousPapers
              ),
            }}
          />
        </>
        )}*/}
            <>
                <div className="admin_home_tabs_row top_padding_none big_screen_none">
                    <Row>
                        <Col lg={12} className="p-0">
                            <ScrollingCarousel show={5.5} slide={4} swiping={true}>
                                <ul className="nav ">
                                    {active &&
                                        lefttab[active].map((steps, stepsIndex) => (
                                            <li className="nav-item " key={stepsIndex}>
                                                <a
                                                    className={`nav-link admin_tabs_name ${activeTab === steps?.value && "head-active"
                                                        }`}
                                                    active={true}
                                                    onClick={() => {
                                                        if (active !== 'faq') {
                                                            setActiveInnertab(steps.key)
                                                        }
                                                        setActiveTab(steps.value)
                                                    }}
                                                >
                                                    {steps.value}
                                                </a>
                                            </li>
                                        ))}
                                </ul>
                            </ScrollingCarousel>
                        </Col>
                    </Row>
                </div>
                {active === 'faq' ?
                    examData?.FAQ?.map((item, index) => {
                        return (
                            <div key={index} className="mb-4">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(item?.question),
                                    }}
                                />
                                {/* {item.image &&
                                    <Image
                                        heigth={60}
                                        Width={60}
                                        src={`${apibasePath}documents/exam/${item?.image}`}
                                    />
                                } */}
                                <p>{item?.answer}</p>
                            </div>
                        )
                    })
                    :
                    examData && examData[dataTabs[active]] &&
                    <div
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(examData[dataTabs[active]][0][activeInnertab]),
                        }}
                    />

                }
            </>
        </>
    )
}

export default ExamrightPage