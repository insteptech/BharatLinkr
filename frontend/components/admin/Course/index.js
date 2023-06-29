import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Col, Row, Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  deleteCourse,
  editCourse,
  getCourse,
} from "../../../redux/actions/course/addcourse";
import DeleteModal from "../../modals/deleteModal";
import Pagesize from "../pagination/pagesize";
import Pagination from "../pagination/pagination";
import LoaderPage from "../../common-components/loader";
import NoDataPage from "../../common-components/NoDataPage/NoDataPage";

function CourseTable() {
  const [pagination, setPagination] = useState({
    pageNo: 1,
    pageSize: 10,
  });
  const [modalShow, setModalShow] = useState(false);
  const [deleteItem, setDeleteItem] = useState();
  const handleHide = () => {
    setModalShow(false);
  };
  const courseData = useSelector((data) => data?.courseList?.courselist?.data);

  const loadingData = useSelector((state) => state?.courseList?.isLoading);

  const dispatch = useDispatch();
  const handleEdit = (item) => {
    router.push(`/admin/courses/updatecourse/${item.id}`);
  };
  const handleDelete = (item) => {
    dispatch(deleteCourse(item.id)).then((res) => {
      if (res?.payload?.data?.success) {
        toast.success("Deleted", { autoClose: 1000 });
        dispatch(getCourse(pagination));
      } else {
        toast.error("error", { autoClose: 1000 });
      }
    });
  };
  const Heading = ["No.", "Main Stream", "Course Type", "Name", "Action"];
  useEffect(() => {
    dispatch(getCourse(pagination));
  }, [pagination]);

  const router = useRouter();
  return (
    <>
      <Row className="padding_top">
        <Col xl={6} lg={12} md={12}>
          <div className="d-flex table_heading_header">
            <h4 className="table_list_heading master_heading">Courses List</h4>
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
              onClick={() => router.push("courses/add")}
            >
              Add New
            </Button>
          </div>
        </Col>
      </Row>
      <hr />

      <div className="admin_stream_table">
        <Row>
          <Table responsive className="admin_table" bordered hover>
            <thead>
              <tr>
                {Heading.map((hd, index) => {
                  return (
                    <th className="table_head" key={index}>
                      {hd}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {loadingData ? (
                <LoaderPage />
              ) : (
                courseData?.rows &&
                courseData?.rows.length > 0 &&
                courseData?.rows?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center admin_table_data">
                        {pagination.pageSize * (pagination.pageNo - 1) +
                          (index + 1)}
                      </td>
                      <td className="text-center admin_table_data">
                        {item.MainStream.mainStreamName}
                      </td>
                      <td className="text-center admin_table_data">
                        {item.CourseType.name}
                      </td>
                      <td className="text-center admin_table_data">
                        {item?.courseName}
                      </td>
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
                  );
                })
              )}
            </tbody>
          </Table>
          {courseData && courseData?.rows && courseData?.rows.length === 0 && <NoDataPage name="Courses" />}
        </Row>
        {courseData && courseData?.rows && courseData?.rows.length !== 0 &&
          <Pagination
            pagination={pagination}
            setPagination={setPagination}
            list={courseData}
          />
        }
        <DeleteModal
          show={modalShow}
          onHide={() => handleHide()}
          handleDelete={handleDelete}
          deleteItem={deleteItem}
        />
      </div>
    </>
  );
}

export default CourseTable;
