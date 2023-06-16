import React, { useEffect, useState } from 'react'
import Mocktest from '../../../components/mocktest/mocktest'
import Instructions from '../../../components/mocktest/instructions'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { getMockTestbyid } from '../../../redux/actions/corporate/addmocktestcorporate'
import LoaderPage from '../../../components/common-components/loader'
import { mocktestQuestionStatus } from '../../../components/utils'

function mocktest() {
  const dispatch = useDispatch()
  const router = useRouter()
  const [isTestStarted, setIsTestStarted] = useState(false)
  const [questionpalletedata, setQuestionpalletedata] = useState(null);
  const { query: { Id } } = router
  const mocktestLoading = useSelector(state => state?.corporateMocktest?.isMockTestLoading)

  useEffect(() => {
    if (Id) dispatch(getMockTestbyid(Id))
      .then((res) => {
        if (res?.payload?.data?.success) {
          setQuestionpalletedata(
            res?.payload?.data?.data?.rows[0]?.Questions?.map((item) => {
              return {
                status: mocktestQuestionStatus.notAttempted
              };
            })
          );
        }
      });
  }, [JSON.stringify(Id)])
  return (
    <>
      {mocktestLoading && <LoaderPage />}
      {!isTestStarted ?
        <Instructions setIsTestStarted={setIsTestStarted} />
        :
        <Mocktest questionpalletedata={questionpalletedata} setQuestionpalletedata={setQuestionpalletedata} />}
    </>
  )
}

export default mocktest