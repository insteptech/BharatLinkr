import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { apibasePath } from "../../../config";
import { getColleges } from "../../../redux/actions/college/college";
import CommonHead from "../../common-components/UserHead/CommonHead";
import DeleteModal from "../../modals/deleteModal";
import AdminTable from "../AdminTable";
import Pagesize from "../pagination/pagesize";
import Pagination from "../pagination/pagination";

function CollegeAdminPage(props) {
  const [pagination, setPagination] = useState({
    pageNo: 1,
    pageSize: 10
  })
  const [modalShow, setModalShow] = useState(false);
  const [deleteItem, setDeleteItem] = useState();

  const collegeList = useSelector((data) => data?.collegelist?.collegelist)
  const Heading = ["No.", "Image", "Logo", "Name", "City", "State", "Courses", "Action"]


  const handleEdit = (item) => {
    router.push(`college/update/${item?.id}`)
  };
  
  const handleDelete = (item) => {
    dispatch(deleteCollege(item.id)).then((res) => {
      if (res?.payload?.data?.success ) {
        toast.success("Deleted");
        dispatch(getColleges(pagination));
      } else {
        toast.error("error");
      }
    })
  };
  const handleHide = () => {
    setModalShow(false);
  };


  const dispatch = useDispatch()
  const router = useRouter();


  useEffect(() => {
    dispatch(getColleges(pagination))
  }, [pagination])

  return (
    <>
      {/* <CommonHead /> */}
      {/* <div className="d-flex justify-content-between"> */}
      <Row className="padding_top">
        <Col xl={6} lg={12} md={12}>
          <div className="d-flex table_heading_header">
            <h4 className="table_list_heading master_heading">College List</h4>
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
              onClick={() => router.push("college/addcollege")}
            >
              Add New
            </Button>
          </div>
        </Col>
      </Row>
      {/* </div> */}
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
              {collegeList?.rows &&
                collegeList?.rows?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center admin_table_data">
                        {pagination.pageSize * (pagination.pageNo - 1) + (index + 1)}
                      </td>
                      <td className="text-center admin_table_data">
                        <Image
                          height={75}
                          width={75}
                          // className="college_card_img img-fluid"
                          alt=""
                          src={`${apibasePath}documents/college/${item?.collegeImage}`} />
                      </td>
                      <td className="text-center admin_table_data">
                        <Image
                          height={75}
                          width={75}
                          // className="college_card_img img-fluid"
                          alt=""
                          src={`${apibasePath}documents/college/${item?.collegeLogo}`} />
                      </td>
                      <td className="text-center admin_table_data">
                        {item?.collegeName}
                      </td>
                      <td className="text-center admin_table_data">
                        {item?.Cities?.name}
                      </td>
                      <td className="text-center admin_table_data">
                        {item?.States?.state}
                      </td>
                      <td className="text-center admin_table_data">
                        {item?.collegeCourse?.length}
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
                })}
            </tbody>
          </Table>
        </Row>
        <Pagination pagination={pagination} setPagination={setPagination} list={collegeList} />
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

export default CollegeAdminPage;
