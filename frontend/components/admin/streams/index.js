import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  deleteColStream,
  getColStream,
} from "../../../redux/actions/streams/addColStream";
import {
  deleteMainStream,
  getMainStream,
} from "../../../redux/actions/streams/addMainStreams";
import {
  deleteSubStream,
  getSubStream,
} from "../../../redux/actions/streams/addSubStream";
import DeleteModal from "../../modals/deleteModal";
import AdminTable from "../AdminTable";
import Pagesize from "../pagination/pagesize";
import Pagination from "../pagination/pagination";
import LoaderPage from "../../common-components/loader";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";

function StreamsPage() {
  const [pagination, setPagination] = useState({
    pageNo: 1,
    pageSize: 10,
  });
  const FormSteps = ["Main Streams", "Sub Streams", "Col Streams"];
  const dispatch = useDispatch();
  const data = useSelector((data) => data);
  const router = useRouter(0);
  const [dataValue, setDataValue] = React.useState(0);
  const mainsTreamHeading = ["No.", "Main Stream", "Action"];
  const subTreamHeading = ["No.", "Main Stream", "Sub Stream", "Action"];
  const colTreamHeading = ["No.", "Sub Stream", "Col Stream", "Action"];
  const mainsTreamData = data?.mainStreamList?.mainStreamValue?.data?.data;
  const loadingMainTreamData = data?.mainStreamList?.isLoading;
  const subStreamData = data?.subStreamList?.subStreamValue?.data?.data;
  const loadingSubStreamData = data?.subStreamList?.isLoading;
  const colStreamData = data?.colStreamList?.colStreamSlice?.data?.data;
  const loadingColStreamData = data?.colStreamList?.isLoading;

  const [modalShow, setModalShow] = useState(false);
  const [deleteItem, setDeleteItem] = useState();
  const handleHide = () => {
    setModalShow(false);
  };

  const handleDelete = (item) => {
    if (item.mainStreamName || item.mainStreamName=="") {
      dispatch(deleteMainStream(item.id)).then((res) => {
        console.log(res);
        if (res?.payload?.data?.success) {
          toast.success("Delete");
          dispatch(getMainStream());
        } else {
          toast.error(res?.payload?.response?.data?.message);
        }
      });
    }
    if (item.subStreamName) {
      dispatch(deleteSubStream(item.id)).then((res) => {
        console.log(res);
        if (res?.payload?.data?.success) {
          toast.success("Deleted");
          dispatch(getSubStream());
        } else {
          toast.error(res?.payload?.response?.data?.message);
        }
      });
    }
    if (item.colStreamName) {
      dispatch(deleteColStream(item.id)).then((res) => {
        if (res?.payload?.data?.success) {
          toast.success("Deleted");
          dispatch(getColStream());
        } else {
          toast.error(res?.payload?.message);
        }
      });
    }
    if (item.subStreamName) {
      dispatch(deleteSubStream(item.id)).then((res) => {
        if (res?.payload?.data?.success) {
          toast.success("Delete");
          dispatch(getSubStream());
        } else {
          toast.error("Error");
        }
      });
    }
    if (item.colStreamName) {
      dispatch(deleteColStream(item.id)).then((res) => {
        if (res?.payload?.data?.success) {
          toast.success("Deleted");
          dispatch(getColStream());
        } else {
          toast.error("Error");
        }
      });
    }
  };

  const handleEdit = (item) => {
    if (item.mainStreamName) {
      router.push(`/admin/streams/updatemainstream/${item.id}`);
    }
    if (item.subStreamName) {
      router.push(`/admin/streams/updatesubstream/${item.id}`);
    }
    if (item.colStreamName) {
      router.push(`/admin/streams/updatecolstream/${item.id}`);
    }
  };
  useEffect(() => {
    dispatch(getSubStream(pagination));
    dispatch(getMainStream(pagination));
    dispatch(getColStream(pagination));
  }, [pagination]);

  return (
    <div>
      <div className="admin_home_tabs_row">
        <Row>
          <Col className="p-0 ">
            <ScrollingCarousel show={5.5} slide={4} swiping={true}>
              <ul className="nav tabs_scroll ">
                {FormSteps &&
                  FormSteps?.map((steps, stepsIndex) => (
                    <li className="nav-item " key={stepsIndex}>
                      <a
                        className={`nav-link admin_tabs_name ${
                          dataValue === stepsIndex && "head-active"
                        }`}
                        active={true}
                        onClick={() => {
                          setDataValue(stepsIndex);
                          setPagination({ ...pagination, pageNo: 1 });
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
      {dataValue === 0 && (
        <Row>
          <Row>
            <Col xl={6} lg={12} className="admin_table_header_smallscreen">
              <div className="d-flex table_heading_header">
                <h4 className="table_list_heading">Main Stream List</h4>
                <div className="enteries_input">
                  <h6 className="enteries_input_label">Show Enteries</h6>
                  <Pagesize setPagination={setPagination} />
                </div>
              </div>
            </Col>
            <Col
              xl={6}
              lg={12}
              md={12}
              className="text-end admin_table_header_smallscreen"
            >
              <div>
                <Button className="border_btn">Upload CSV</Button>
                <Button className="border_btn">Download CSV</Button>
                <Button
                  className="border_btn green"
                  onClick={() => router.push("streams/mainstream/add")}
                >
                  Add New
                </Button>
              </div>
            </Col>
          </Row>
          <div className="admin_stream_table">
            <Row>
              <Table responsive className="admin_table" bordered hover>
                <thead>
                  <tr>
                    {mainsTreamHeading.map((hd, index) => {
                      return (
                        <th className="table_head" key={index}>
                          {hd}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {loadingMainTreamData ? (
                    <LoaderPage />
                  ) : (
                    mainsTreamData?.rows?.map((item, index) => {
                      return (
                        <tr>
                          <td className="text-center admin_table_serial">
                            {pagination.pageSize * (pagination.pageNo - 1) +
                              (index + 1)}
                          </td>
                          <td className="text-center admin_table_data">
                            {item.mainStreamName}
                          </td>
                          <td className="text-center admin_table_data">
                            <img
                              className="mx-1 admin_table_action_icon"
                              src={"/images/edit-icon-blue.png"}
                              onClick={() => handleEdit(item)}
                            />
                            <img
                              className="mx-1 admin_table_action_icon"
                              src={"/images/delete-icon-blue.png"}
                              onClick={() => {
                                setModalShow(true);
                                setDeleteItem(item);
                              }}
                            />
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </Table>
            </Row>
            <Pagination
              pagination={pagination}
              setPagination={setPagination}
              list={mainsTreamData}
            />
          </div>
        </Row>
      )}

      {dataValue === 1 && (
        <Row>
          <Row>
            <Col xl={6} lg={12} className="admin_table_header_smallscreen">
              <div className="d-flex table_heading_header">
                <h4 className="table_list_heading">Sub Stream List</h4>
                <div className="enteries_input">
                  <h6 className="enteries_input_label">Show Enteries</h6>
                  <Pagesize setPagination={setPagination} />
                </div>
              </div>
            </Col>
            <Col
              xl={6}
              lg={12}
              md={12}
              className="text-end admin_table_header_smallscreen"
            >
              <div>
                <Button className="border_btn">Upload CSV</Button>
                <Button className="border_btn">Download CSV</Button>
                <Button
                  className="border_btn green"
                  onClick={() => router.push("streams/substream/add")}
                >
                  Add New
                </Button>
              </div>
            </Col>
          </Row>
          <div className="admin_stream_table">
            <Row>
              <Table responsive className="admin_table" bordered hover>
                <thead>
                  <tr>
                    {subTreamHeading.map((hd, index) => {
                      return (
                        <th className="table_head" key={index}>
                          {hd}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {loadingSubStreamData ? (
                    <LoaderPage />
                  ) : (
                    subStreamData?.rows?.map((item, index) => {
                      return (
                        <tr>
                          <td className="text-center admin_table_serial">
                            {pagination.pageSize * (pagination.pageNo - 1) +
                              (index + 1)}
                          </td>
                          <td className="text-center admin_table_data">
                            {item.MainStream?.mainStreamName}
                          </td>
                          <td className="text-center admin_table_data">
                            {item.subStreamName}
                          </td>
                          <td className="text-center admin_table_data">
                            <img
                              className="mx-1 admin_table_action_icon"
                              src={"/images/edit-icon-blue.png"}
                              onClick={() => handleEdit(item)}
                            />
                            <img
                              className="mx-1 admin_table_action_icon"
                              src={"/images/delete-icon-blue.png"}
                              onClick={() => {
                                setModalShow(true);
                                setDeleteItem(item);
                              }}
                            />
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </Table>
            </Row>
            <Pagination
              pagination={pagination}
              setPagination={setPagination}
              list={subStreamData}
            />
          </div>
        </Row>
      )}

      {dataValue === 2 && (
        <Row>
          <Row>
            <Col xl={6} lg={12} className="admin_table_header_smallscreen">
              <div className="d-flex table_heading_header">
                <h4 className="table_list_heading">Col Stream List</h4>
                <div className="enteries_input">
                  <h6 className="enteries_input_label">Show Enteries</h6>
                  <Pagesize setPagination={setPagination} />
                </div>
              </div>
            </Col>
            <Col
              xl={6}
              lg={12}
              md={12}
              className="text-end admin_table_header_smallscreen"
            >
              <div>
                <Button className="border_btn">Upload CSV</Button>
                <Button className="border_btn">Download CSV</Button>
                <Button
                  className="border_btn green"
                  onClick={() => router.push("streams/colstream/add")}
                >
                  Add New
                </Button>
              </div>
            </Col>
          </Row>
          <div className="admin_stream_table">
            <Row>
              <Table responsive className="admin_table" bordered hover>
                <thead>
                  <tr className="table_head">
                    {colTreamHeading.map((hd, index) => {
                      return (
                        <th className="table_head" key={index}>
                          {hd}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {loadingColStreamData ? (
                    <LoaderPage />
                  ) : (
                    colStreamData?.rows?.map((item, index) => {
                      return (
                        <tr>
                          <td className="text-center admin_table_serial">
                            {pagination.pageSize * (pagination.pageNo - 1) +
                              (index + 1)}
                          </td>
                          <td className="text-center admin_table_data">
                            {item?.SubStream?.subStreamName}
                          </td>
                          <td className="text-center admin_table_data">
                            {item.colStreamName}
                          </td>
                          <td className="text-center admin_table_data">
                            <img
                              className="mx-1 admin_table_action_icon"
                              src={"/images/edit-icon-blue.png"}
                              onClick={() => handleEdit(item)}
                            />
                            <img
                              className="mx-1 admin_table_action_icon"
                              src={"/images/delete-icon-blue.png"}
                              onClick={() => {
                                setModalShow(true);
                                setDeleteItem(item);
                              }}
                            />
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </Table>
            </Row>
            <Pagination
              pagination={pagination}
              setPagination={setPagination}
              list={colStreamData}
            />
          </div>
        </Row>
      )}
      <DeleteModal
        show={modalShow}
        onHide={() => handleHide()}
        handleDelete={handleDelete}
        deleteItem={deleteItem}
      />
    </div>
  );
}

export default StreamsPage;
