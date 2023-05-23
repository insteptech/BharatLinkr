import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { deleteExam, getAllExams, getExamById } from '../../../redux/actions/exams/createExam'
import DeleteModal from '../../modals/deleteModal'
import Pagesize from '../pagination/pagesize'
import Pagination from '../pagination/pagination'
import LoaderPage from '../../common-components/loader'



function ExamTable() {
    const [pagination, setPagination] = useState({
        pageNo: 1,
        pageSize: 10
    })
    const router = useRouter()
    const dispatch = useDispatch()
    const handleDelete = (item) => {
        dispatch(deleteExam(item.id)).then((res) => {
            if (res?.payload?.data?.success) {
                toast.success('Deleted')
                dispatch(getAllExams(pagination));
            } else {
                toast.error('Error')
            }
        });
    }
    const [modalShow, setModalShow] = useState(false);
    const [deleteItem, setDeleteItem] = useState();
    const handleHide = () => {
        setModalShow(false);
    };
    const handleEdit = (item) => {
        router.push(`exams/updateexam/${item.id}`)
    }
    const examData = useSelector((data) => data?.examList?.examlist?.data?.data)
    const loaderExamDate = useSelector((state) => state?.examList?.isLoading) 

    useEffect(() => {
        dispatch(getAllExams(pagination))
    }, [pagination])

    const tableHeading = ["No.", "Main Stream", "Course Type", "Name", "Action"]
    return (
        <>
            <Row className='padding_top'>
                <Col xl={6} lg={12} md={12}>
                    <div className="d-flex table_heading_header">
                        <h4 className="table_list_heading master_heading">Exams List</h4>
                        <div className="enteries_input">
                            <h6 className="enteries_input_label">Show Enteries</h6>
                            <Pagesize setPagination={setPagination} />
                        </div>
                    </div>
                </Col>
                <Col xl={6} lg={12} md={12} className="text-end">
                    <div>
                        <Button className="border_btn">Upload CSV</Button>
                        <Button className="border_btn">Download CSV</Button>
                        <Button
                            className="border_btn green"
                            onClick={() => router.push("exams/add")}
                        >
                            Add New
                        </Button>
                    </div>
                </Col>
            </Row>
            <hr></hr>
            <div>
                <Table responsive className="admin_table" bordered hover>
                    <thead>
                        <tr>
                            {tableHeading &&
                                tableHeading?.map((i, index) => {
                                    return (
                                            <th className="table_head" key={index}>
                                                {i}
                                            </th>
                                    );
                                })}
                        </tr>
                    </thead>
                    <tbody>
                        {loaderExamDate ? <LoaderPage /> : examData?.rows && examData?.rows?.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td className="text-center admin_table_data">{pagination.pageSize * (pagination.pageNo - 1) + (index + 1)}</td>
                                    <td className="text-center admin_table_data">{item?.MainStream?.mainStreamName}</td>
                                    <td className="text-center admin_table_data">{item?.CourseType?.name}</td>
                                    <td className="text-center admin_table_data">{item?.examName}</td>
                                    <td className="text-center admin_table_data">
                                        <img
                                            className="mx-1 admin_table_action_icon"
                                            src="/images/edit-icon-blue.png"
                                            onClick={() => handleEdit(item)}
                                        ></img>
                                        <img
                                            className="mx-1 admin_table_action_icon"
                                            src="/images/delete-icon-blue.png"
                                            onClick={() => {
                                                setModalShow(true);
                                                setDeleteItem(item);
                                            }}
                                        ></img>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <Pagination pagination={pagination} setPagination={setPagination} list={examData} />
                <DeleteModal
                    show={modalShow}
                    onHide={() => handleHide()}
                    handleDelete={handleDelete}
                    deleteItem={deleteItem}
                />
            </div>
        </>
    )
}

export default ExamTable
