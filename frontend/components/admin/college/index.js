import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { apibasePath } from "../../../config";
import {
  deleteCollege,
  getColleges,
} from "../../../redux/actions/college/college";
import CommonHead from "../../common-components/UserHead/CommonHead";
import DeleteModal from "../../modals/deleteModal";
import AdminTable from "../AdminTable";
import Pagesize from "../pagination/pagesize";
import Pagination from "../pagination/pagination";
import { toast } from "react-toastify";
import LoaderPage from "../../common-components/loader";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import { collegeApprovalList } from "../../../redux/actions/auth";
import { collegeApprovalByAdmin } from "../../../redux/actions/auth";

function CollegeAdminPage(props) {
  const [pagination, setPagination] = useState({
    pageNo: 1,
    pageSize: 10,
  });
  const [modalShow, setModalShow] = useState(false);
  const [deleteItem, setDeleteItem] = useState();
  const FormSteps = ["College list", "Pending approvals"];
  const [dataValue, setDataValue] = React.useState(0);

  const collegeList = useSelector((data) => data?.collegelist?.collegelist);
  const approvalList = useSelector(
    (data) => data?.adminData?.pendingApprovalList
  );
  const Heading = [
    "No.",
    "Image",
    "Logo",
    "Name",
    "City",
    "State",
    "Courses",
    "Action",
  ];
  const approvalHeading = [
    "No.",
    "College",
    "State",
    "City",
    "E-mail",
    "Action",
  ];

  console.log(approvalList, "approvalList");

  const loadercollegecard = useSelector((data) => data?.collegelist?.isLoading);
  const loaderApproval = useSelector((data) => data?.adminData?.isLoading);

  const handleEdit = (item) => {
    router.push(`college/update/${item?.id}`);
  };

  const handleDelete = (item) => {
    dispatch(deleteCollege(item.id)).then((res) => {
      if (res?.payload?.data?.success) {
        toast.success("Deleted", { autoClose: 1000 });
        dispatch(getColleges(pagination));
      } else {
        toast.error("error", { autoClose: 1000 });
      }
    });
  };
  const handleHide = () => {
    setModalShow(false);
  };

  const handleApprove = (id) => {
    dispatch(
      collegeApprovalByAdmin({
        PendingRequest: [
          {
            id: id,
            active: true,
          },
        ],
      })
    ).then((res) => {
      if (res?.payload?.data?.success) {
        toast.success("Approved", { autoClose: 1000 });
        dispatch(collegeApprovalList(pagination));
      } else {
        toast.error("error", { autoClose: 1000 });
      }
    });
  };

  const handleReject = (id) => {
    dispatch(
      collegeApprovalByAdmin({
        PendingRequest: [
          {
            id: id,
            active: false,
          },
        ],
      })
    ).then((res) => {
      if (res?.payload?.data?.success) {
        toast.success("Rejected", { autoClose: 1000 });
        dispatch(collegeApprovalList(pagination));
      } else {
        toast.error("error", { autoClose: 1000 });
      }
    });
  };

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(getColleges(pagination));
    dispatch(collegeApprovalList(pagination));
  }, [pagination]);

  return (
    <>
      <div className="admin_home_tabs_row">
        <Row>
          <Col xl={12} lg={12} md={12} className="p-0 ">
            <ScrollingCarousel show={5.5} slide={4} swiping={true}>
              <ul className="nav tabs_scroll ">
                {FormSteps &&
                  FormSteps?.map((steps, stepsIndex) => (
                    <li className="nav-item " key={stepsIndex}>
                      <a
                        className={`nav-link admin_tabs_name ${
                          dataValue === stepsIndex && "head-active"
                        }`}
                        active="true"
                        onClick={() => {
                          setDataValue(stepsIndex);
                          // setPagination({ ...pagination, pageNo: 1 });
                        }}
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
      <Row>
        <Col xl={12} lg={12} md={12} className="">
          <div className="college_header_btn_row">
            <div className="enteries_input">
              <h6 className="enteries_input_label">Show Enteries</h6>
              <Pagesize setPagination={setPagination} />
            </div>
            <div className="text-end">
              <Button className="border_btn">Upload CSV</Button>
              <Button className="border_btn">Download CSV</Button>
              <Button
                className="border_btn green"
                onClick={() => router.push("college/addcollege")}
              >
                Add New
              </Button>
            </div>
          </div>
        </Col>
      </Row>
      {/* <Row className="padding_top">
        <Col xl={6} lg={12} md={12}>
          <div className="d-flex table_heading_header">
            <h4 className="table_list_heading master_heading">College List</h4>
            <div className="enteries_input">
              <h6 className="enteries_input_label">Show Enteries</h6>
              <Pagesize setPagination={setPagination} />
            </div>
          </div>
        </Col>
        <Col xl={6} lg={12} md={12} className="text-end mt-2">
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
      </Row> */}
      {/* <hr /> */}
      <div className="admin_stream_table">
        {dataValue === 0 && (
          <>
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
                  {loadercollegecard ? (
                    <LoaderPage />
                  ) : collegeList?.rows?.length > 0 ? (
                    collegeList?.rows?.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className="text-center admin_table_data">
                            {pagination.pageSize * (pagination.pageNo - 1) +
                              (index + 1)}
                          </td>
                          <td className="text-center admin_table_data">
                            <Image
                              height={75}
                              width={75}
                              // className="college_card_img img-fluid"
                              alt=""
                              src={`${apibasePath}documents/college/${item?.collegeImage}`}
                            />
                          </td>
                          <td className="text-center admin_table_data">
                            <Image
                              height={75}
                              width={75}
                              // className="college_card_img img-fluid"
                              alt=""
                              src={`${apibasePath}documents/college/${item?.collegeLogo}`}
                            />
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
                            {item?.AssociateCourse?.length}
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
                  ) : (
                    "No college"
                  )}
                </tbody>
              </Table>
            </Row>
            <Pagination
              pagination={pagination}
              setPagination={setPagination}
              list={collegeList}
            />
            <DeleteModal
              show={modalShow}
              onHide={() => handleHide()}
              handleDelete={handleDelete}
              deleteItem={deleteItem}
            />
          </>
        )}
        {dataValue === 1 && (
          <>
            <Row>
              <Table responsive className="admin_table" bordered hover>
                <thead>
                  <tr>
                    {approvalHeading.map((hd, index) => {
                      return (
                        <th className="table_head" key={index}>
                          {hd}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {loaderApproval ? (
                    <LoaderPage />
                  ) : approvalList?.rows?.length > 0 ? (
                    approvalList?.rows?.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className="text-center admin_table_data">
                            {pagination.pageSize * (pagination.pageNo - 1) +
                              (index + 1)}
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
                            {item?.email}
                          </td>
                          <td className="text-center admin_table_data">
                            {/* <img
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
                            ></img> */}
                            <Button
                              className="border_btn"
                              onClick={() => console.log("reject")}
                            >
                              Reject
                            </Button>
                            <Button
                              className="border_btn green"
                              onClick={() => handleApprove(item?.id)}
                            >
                              Approve
                            </Button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    "No college"
                  )}
                </tbody>
              </Table>
            </Row>
            <Pagination
              pagination={pagination}
              setPagination={setPagination}
              list={approvalList}
            />
          </>
        )}
      </div>
    </>
  );
}

export default CollegeAdminPage;
