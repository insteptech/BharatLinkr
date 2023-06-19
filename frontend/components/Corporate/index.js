import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Pagination, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCorporate,
  getCorporateData,
  updateCorporate,
} from "../../redux/actions/corporate/addcorporate";
import { toast } from "react-toastify";
import { getSubCategory } from "../../redux/actions/corporate/addsubcategory";
import LoaderPage from "../common-components/loader";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import DeleteModal from "../modals/deleteModal";
import Pagesize from "../admin/pagination/pagesize";

function CorporateTable() {
  const FormSteps = ["Corporate List", "Categories"];
  const [dataValue, setDataValue] = React.useState(0);
  const [pagination, setPagination] = useState({
    pageNo: 1,
    pageSize: 10
  })
  const [modalShow, setModalShow] = useState(false);
  const [deleteItem, setDeleteItem] = useState();
  const handleHide = () => {
    setModalShow(false)
  }

  const router = useRouter();

  const dispatch = useDispatch();

  const corporateRegisterlist = useSelector(
    (state) => state?.corporateData?.getListCorporate
  );
  const loadercorporateRegisterlist = useSelector(
    (state) => state?.corporateData?.isLoading
  );

  const subcategoryList = useSelector(
    (state) => state?.corporateSubCategory?.addsubcategory?.rows
  );

  const loadersubcategoryList = useSelector(
    (state) => state?.corporateSubCategory?.isLoading
  );

  const handleDelete = (item) => {
    dispatch(deleteCorporate(item?.id)).then((res) => {
      if (res?.payload?.data?.success) {
        toast.success('Deleted', {autoClose: 1000})
        dispatch(getCorporateData(pagination))
      } else {
        toast.error('Error', {autoClose: 1000})
      }
    })
  }

  const handleEdit = (item) => {
    router.push(`/admin/corporate/update/${item.id}`);
  };

  useEffect(() => {
    dispatch(getCorporateData(Pagination));
  }, [Pagination]);

  useEffect(() => {
    dispatch(getSubCategory());
  }, []);

  const tableHeading1 = [
    "No.",
    "Category",
    "Sub-Category",
    "Topic",
    "Sub Topic",
    "Date",
    "Views",
    "Downloads",
    "Likes",
    "Action",
  ];

  const tableHeading2 = ["No.", "Sub-Category", "Action"];
  return (
    <>
      <div className="admin_home_tabs_row">
        <Row>
          <Col xl={6} lg={12} md={12} className="p-0 ">
            <div className="justify_item">
              <ScrollingCarousel show={5.5} slide={4} swiping={true}>
                <ul className="nav tabs_scroll ">
                  {FormSteps &&
                    FormSteps?.map((steps, stepsIndex) => (
                      <li className="nav-item " key={stepsIndex}>
                        <a
                          className={`nav-link admin_tabs_name ${dataValue === stepsIndex && "head-active"
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
              <div className="enteries_input ms-3 mt-0 hide_btn_row">
                <h6 className="enteries_input_label">Show Enteries</h6>
                <Form.Select aria-label="Default select example">
                  <option>10</option>
                  <option value="1">3</option>
                  <option value="2">5</option>
                  <option value="3">8</option>
                </Form.Select>
              </div>
            </div>
          </Col>
          <Col xl={6} lg={12} md={12} className="text-end hide_btn_row">
            {dataValue == 0 && (
              <div>
                <Button className="border_btn">Upload CSV</Button>
                <Button className="border_btn">Download CSV</Button>
                <Button
                  className="border_btn green"
                  onClick={() => router.push("corporate/addcorporate")}
                >
                  Add New
                </Button>
              </div>
            )}
            {dataValue == 1 && (
              <>
                <Button
                  onClick={() =>
                    router.push("/admin/corporate/mainCategory/add")
                  }
                  className="border_btn upload_btn"
                >
                  Add Main Category
                </Button>
                <Button
                  onClick={() =>
                    router.push("/admin/corporate/subcategory/addsubcategory")
                  }
                  className="border_btn upload_btn"
                >
                  Add Sub Category
                </Button>
              </>
            )}
          </Col>
        </Row>
      </div>
      <Row>
        <Col md={6} className="display_btn_row">
          <div className="d-flex mt-0 ">
            <h6 className="enteries_input_label mb-0 pt-2">Show Enteries</h6>
            <Pagesize setPagination={setPagination} />
            <Form.Select aria-label="Default select example">
              <option>10</option>
              <option value="1">3</option>
              <option value="2">5</option>
              <option value="3">8</option>
            </Form.Select>
          </div>
        </Col>
        <Col className="text-end display_btn_row">
          {dataValue == 0 && (
            <div>
              <Button className="border_btn btn_margin">Upload CSV</Button>
              <Button className="border_btn btn_margin">Download CSV</Button>
              <Button
                className="border_btn green btn_margin"
                onClick={() => router.push("corporate/addcorporate")}
              >
                Add New
              </Button>
            </div>
          )}
          {dataValue == 1 && (
            <>
              <Button
                onClick={() => router.push("/admin/corporate/mainCategory/add")}
                className="border_btn upload_btn btn_margin"
              >
                Add Main Category
              </Button>
              <Button
                onClick={() =>
                  router.push("/admin/corporate/subcategory/addsubcategory")
                }
                className="border_btn upload_btn btn_margin"
              >
                Add Sub Category
              </Button>
            </>
          )}
        </Col>
      </Row>
      {dataValue == 0 && (
        <div>
          <Row>
            <div>
              <Table responsive className="admin_table" bordered hover>
                <thead>
                  <tr>
                    {tableHeading1 &&
                      tableHeading1?.map((i, index) => {
                        return (
                          <>
                            <th className="table_head" key={index}>
                              {i}
                            </th>
                          </>
                        );
                      })}
                  </tr>
                </thead>
                <tbody>
                  {loadercorporateRegisterlist === true ? (
                    <LoaderPage />
                  ) : (
                    corporateRegisterlist &&
                    corporateRegisterlist?.rows?.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className="text-center admin_table_data">
                            {pagination.pageSize * (pagination.pageNo - 1) + (index + 1)}
                          </td>
                          <td className="text-center admin_table_data">
                            {item?.MainCategory?.mainCategory}
                          </td>
                          <td className="text-center admin_table_data">
                            {item?.SubCategory?.subCategory}
                          </td>
                          <td className="text-center admin_table_data">
                            {item?.topicName}
                          </td>
                          <td className="text-center admin_table_data">
                            {item?.subTopic}
                          </td>
                          <td className="text-center admin_table_data">
                            {
                              new Date(item?.updatedAt)
                                .toISOString()
                                .split("T")[0]
                            }
                          </td>
                          <td className="text-center admin_table_data">
                            {item?.views || "1"}
                          </td>
                          <td className="text-center admin_table_data">
                            {item?.downloads || "1"}
                          </td>
                          <td className="text-center admin_table_data">
                            {item?.likes || "1"}
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
                              // onClick={() => handleDelete(item)}
                              onClick={() => {
                                setModalShow(true)
                                setDeleteItem(item)
                              }}
                            ></img>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </Table>
              <Pagination pagination={pagination} setPagination={setPagination} list={corporateRegisterlist} />
              <DeleteModal
                show={modalShow}
                onHide={() => handleHide()}
                handleDelete={handleDelete}
                deleteItem={deleteItem}
              />
            </div>
          </Row>
          <div className="admin_table_footer">
            {/* <Row>
              <Col md={6} className="table_footer_start">
                <h6>Showing {corporateRegisterlist?.length} enteries</h6>
              </Col>
              <Col md={6}>
                <div className="table_footer_end">
                  <Button className="border_btn green">Previous</Button>

                  <Button
                    className="border_btn green"
                  // onClick={handlePagenation}
                  >
                    Next
                  </Button>
                </div>
              </Col>
            </Row> */}
          </div>
        </div>
      )}
      {dataValue == 1 && (
        <>
          <div>
            <Table responsive className="admin_table" bordered hover>
              <thead>
                <tr>
                  {tableHeading2 &&
                    tableHeading2?.map((i, index) => {
                      return (
                        <>
                          <th className="table_head" key={index}>
                            {i}
                          </th>
                        </>
                      );
                    })}
                </tr>
              </thead>
              <tbody>
                {loadersubcategoryList === true ? (
                  <LoaderPage />
                ) : (
                  subcategoryList &&
                  subcategoryList?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="text-center admin_table_data">
                          {index + 1}
                        </td>

                        <td className="text-center admin_table_data">
                          {item?.subCategory}
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
                            onClick={() => handleDelete(item)}
                          ></img>
                        </td>
                      </tr>
                    );
                  })
                )}{" "}
              </tbody>
            </Table>
          </div>
          <div className="admin_table_footer">
            <Row>
              <Col md={6} className="table_footer_start">
                <h6>Showing {corporateRegisterlist?.length} enteries</h6>
              </Col>
              <Col md={6}>
                <div className="table_footer_end">
                  <Button className="border_btn green">Previous</Button>

                  <Button
                    className="border_btn green"
                  // onClick={handlePagenation}
                  >
                    Next
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </>
      )}
    </>
  );
}

export default CorporateTable;
