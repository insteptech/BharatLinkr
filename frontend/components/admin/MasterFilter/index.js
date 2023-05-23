import { Toast } from "bootstrap";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  adminMasterfilterData,
  deleteMasterFilter,
  getMasterFilter,
} from "../../../redux/actions/masterfilter/createmasterfilter";
import DeleteModal from "../../modals/deleteModal";
import Pagesize from "../pagination/pagesize";
import Pagination from "../pagination/pagination";
import LoaderPage from "../../common-components/loader";

function MasterFilterTable() {
  const router = useRouter();
  const [modalShow, setModalShow] = useState(false);
  const [deleteItem, setDeleteItem] = useState();
  const handleHide = () => {
    setModalShow(false)
  }
  const [pagination, setPagination] = useState({
    pageNo: 1,
    pageSize: 10
  })
  const dispatch = useDispatch();
  const masterData = useSelector(
    (data) => data?.masterFilterList?.masterfilterlist?.data?.data
  );

  const loaderMasterData = useSelector((state) => state?.masterFilterList?.isLoading)

  useEffect(() => {
    dispatch(adminMasterfilterData(pagination))
  }, [pagination]);

  const handleDelete = (item) => {
    dispatch(deleteMasterFilter(item.id)).then((res) => {
      if (res?.payload?.data?.success) {
        toast.success('Deleted')
        dispatch(adminMasterfilterData(pagination))
      } else {
        toast.error('Error')
      }
    });
  };

  const handleEdit = (item) => {
    const path = `masterfilter/updatemastetfilter/${item.id}`;
    router.push(path);
  };
  const tableHeading = ["No.", "Category", "Field", "Action"];
  return (
    <>
      <Row className="padding_top">
        <Col xl={6} lg={12} md={12}>
          <div className="d-flex table_heading_header">
            <h4 className="table_list_heading">Master Filter</h4>
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
              onClick={() => router.push("masterfilter/addmasterfilter")}
            >
              Add New
            </Button>
          </div>
        </Col>
      </Row>
      <hr />
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
          {loaderMasterData ? <LoaderPage/> : masterData?.rows?.map((item, index) => {
              return (
                <tr key={index}>
                  <td className="text-center admin_table_data">{pagination.pageSize * (pagination.pageNo-1) + (index + 1)}</td>
                  <td className="text-center admin_table_data">{item.types}</td>
                  <td className="text-center admin_table_data">{item.name}</td>
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
                        setModalShow(true)
                        setDeleteItem(item)
                      }}
                    ></img>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </Table>
      <Pagination pagination={pagination} setPagination={setPagination} list={masterData} />
      <DeleteModal
          show={modalShow}
          onHide={() => handleHide()}
          handleDelete={handleDelete}
          deleteItem={deleteItem}
        />
    </>
  );
}

export default MasterFilterTable;
