import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getState,
  deleteState,
  updateState,
} from "../../../redux/actions/location/createState";
import {
  deleteCity,
  getCityList,
} from "../../../redux/actions/location/createCity";
import DeleteModal from "../../modals/deleteModal";
import { toast } from "react-toastify";
import Pagination from "../pagination/pagination";
import Pagesize from "../pagination/pagesize";
import {
  deleteCountry,
  getCountry,
} from "../../../redux/actions/location/countryList";
import LoaderPage from "../../common-components/loader";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";

function LocationPage() {
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState({
    pageNo: 1,
    pageSize: 10,
  });
  const cityList = useSelector((data) => data?.cityList?.cityList?.data?.data);
  const loadercityList = useSelector((data) => data?.cityList?.isLoading);

  const stateList = useSelector(
    (data) => data?.stateList?.stateList?.data?.data
  );
  const countryList = useSelector(
    (data) => data?.countrylist?.countrylist?.data?.data
  );
  useEffect(() => {
    dispatch(getCityList(pagination));
    dispatch(getState(pagination));
    dispatch(getCountry(pagination));
  }, [pagination]);
  const [modalShow, setModalShow] = useState(false);
  const [deleteItem, setDeleteItem] = useState();
  const handleHide = () => {
    setModalShow(false);
  };
  const handleEdit = (item) => {
    if (item?.stateId) {
      router.push(`/admin/location/updatecity/${item?.id}`);
    }
    if (item?.countryId) {
      router.push(`/admin/location/updatestate/${item?.id}`);
    } else router.push(`/admin/location/updatecountry/${item?.id}`);
  };

  const handlecityDelete = (item) => {
    dispatch(deleteCity(item?.id)).then((res) => {
      if (res?.payload?.data?.success) {
        dispatch(getCityList(pagination));
        toast.success("Deleted");
      } else {
        toast.error("Error");
      }
    });
  }
  const handlestateDelete = (item) => {
    dispatch(deleteState(item?.id)).then((res) => {
      if (res?.payload?.data?.success) {
        dispatch(getState(pagination));
        toast.success("Deleted");
      } else {
        toast.error("Error");
      }
    });
  }
  const handlecountryDelete = (item) => {
    dispatch(deleteCountry(item?.id)).then((res) => {
      if (res?.payload?.data?.success) {
        dispatch(getCountry(pagination));
        toast.success("Deleted", { autoClose: 1000 });
      } else {
        toast.error("Error");
      }
    });
  }

  const handleDelete = (item) => {
    if (item?.stateId) {
      dispatch(deleteCity(item?.id)).then((res) => {
        if (res?.payload?.data?.success) {
          dispatch(getCityList(pagination));
          toast.success("Deleted");
        } else {
          toast.error("Error");
        }
      });
    }
    if (item?.countryId) {
      dispatch(deleteState(item?.id)).then((res) => {
        if (res?.payload?.data?.success) {
          dispatch(getState(pagination));
          toast.success("Deleted");
        } else {
          toast.error("Error");
        }
      });
    } else {
      dispatch(deleteCountry(item?.id)).then((res) => {
        if (res?.payload?.data?.success) {
          dispatch(getCountry(pagination));
          toast.success("Deleted", { autoClose: 1000 });
        } else {
          toast.error("Error");
        }
      });
    }
  };

  const [active, setActive] = useState("City");
  const [dataValue, setDataValue] = React.useState(0);
  const json = [
    {
      DisplayName: "City",
      key: "City",
      data: "",
      className: "",
    },
    {
      DisplayName: "State",
      key: "State",
      data: "",
      className: "",
    },
    {
      DisplayName: "Country",
      key: "Country",
      data: "",
      className: "",
    },
  ];
  const router = useRouter();

  const handleTab = (key, index) => {
    setActive(key);
    setDataValue(index);
  };
  const tableHeading2 = [
    "No.",
    "Country Name",
    "State Name",
    "Status",
    "Action",
  ];
  const tableHeading1 = ["No.", "State Name", "City Name", "Status", "Action"];
  const tableHeading3 = ["No.", "Country Name", "Status", "Action"];
  return (
    <>
      <div className="admin_home_tabs_row">
        <Row>
          <Col xl={6} lg={12} md={12} className="p-0">
            <div className="d-flex table_heading_header p-0">
              <ScrollingCarousel show={5.5} slide={4} swiping={true}>
                <ul className="nav tabs_scroll">
                  {json &&
                    json?.map((steps, stepsIndex) => (
                      <li className="nav-item" key={stepsIndex}>
                        <a
                          className={`nav-link admin_tabs_name ${dataValue === stepsIndex && "head-active"
                            }`}
                          active='true'
                          onClick={() => {
                            handleTab(steps.key, stepsIndex);
                            setPagination({ ...pagination, pageNo: 1 });
                          }}
                        >
                          {steps.DisplayName}
                        </a>
                      </li>
                    ))}
                </ul>
              </ScrollingCarousel>
              <div className="enteries_input user_lead_entery_input location_enteries hide_btn_row">
                <h6 className="enteries_input_label">Show Enteries</h6>
                <Pagesize setPagination={setPagination} />
              </div>
            </div>
          </Col>
          <Col xl={6} lg={12} md={12} className="text-end p-0 hide_btn_row">
            <div className="city_state_btn_margin">
              <Button
                className="border_btn"
                onClick={() => router.push("location/addcity")}
              >
                Add New City
              </Button>
              <Button
                className="border_btn"
                onClick={() => router.push("location/addstate")}
              >
                Add New State
              </Button>
              <Button
                className="border_btn"
                onClick={() => router.push("location/addcountry")}
              >
                Add New Country
              </Button>
            </div>
          </Col>
        </Row>
      </div>
      <Row>
        <Col sm={6} className="display_btn_row">
          <div className=" user_lead_entery_input d-flex ">
            <h6 className="enteries_input_label mb-0 pt-2">Show Enteries</h6>
            <Pagesize setPagination={setPagination} />
          </div>
        </Col>
        <Col sm={6} className="display_btn_row">
          <div className="text-end">
            <Button
              className="border_btn btn_margin"
              onClick={() => router.push("location/addcity")}
            >
              Add New City
            </Button>
            <Button
              className="border_btn btn_margin"
              onClick={() => router.push("location/addstate")}
            >
              Add New State
            </Button>
            <Button
              className="border_btn btn_margin "
              onClick={() => router.push("location/addcountry")}
            >
              Add New Country
            </Button>
          </div>
        </Col>
      </Row>

      <div className="admin_table">
        {dataValue === 0 && (
          <>
            <Table responsive className="admin_table" bordered hover>
              <thead>
                <tr>
                  {tableHeading1 &&
                    tableHeading1?.map((i, index) => {
                      return (
                          <th className="table_head" key={index}>
                            {i}
                          </th>
                      );
                    })}
                </tr>
              </thead>
              <tbody>
                {loadercityList ? (
                  <LoaderPage />
                ) : (
                  cityList?.rows &&
                  cityList?.rows?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="text-center admin_table_data">
                          {pagination.pageSize * (pagination.pageNo - 1) +
                            (index + 1)}
                        </td>
                        <td className="text-center admin_table_data">
                          {item?.State?.state}
                        </td>
                        <td className="text-center admin_table_data">
                          {item?.name}
                        </td>
                        <td className="text-center admin_table_data">
                          {item?.active === true ? "Active" : "Inactive"}
                        </td>
                        <td className="text-center admin_table_data">
                          <img
                            className="mx-1 admin_table_action_icon"
                            src="/images/edit-icon-blue.png"
                            onClick={() => router.push(`/admin/location/updatecity/${item?.id}`)}
                          />
                          <img
                            className="mx-1 admin_table_action_icon"
                            src="/images/delete-icon-blue.png"
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
            <Pagination
              pagination={pagination}
              setPagination={setPagination}
              list={cityList}
            />
            <DeleteModal
              show={modalShow}
              onHide={() => handleHide()}
              handleDelete={handlecityDelete}
              deleteItem={deleteItem}
            />
          </>
        )}
        {dataValue === 1 && (
          <>
            <Table responsive className="admin_table" bordered hover>
              <thead>
                <tr>
                  {tableHeading2 &&
                    tableHeading2?.map((i, index) => {
                      return (
                          <th className="table_head" key={index}>
                            {i}
                          </th>
                      );
                    })}
                </tr>
              </thead>
              <tbody>
                {stateList?.rows &&
                  stateList?.rows?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="text-center admin_table_data">
                          {pagination.pageSize * (pagination.pageNo - 1) +
                            (index + 1)}
                        </td>
                        <td className="text-center admin_table_data">
                          {item?.Countries?.name}
                        </td>
                        <td className="text-center admin_table_data">
                          {item?.state}
                        </td>
                        <td className="text-center admin_table_data">
                          {item?.active === true ? "Active" : "Inactive"}
                        </td>
                        <td className="text-center admin_table_data">
                          <img
                            className="mx-1 admin_table_action_icon"
                            src="/images/edit-icon-blue.png"
                            onClick={() => router.push(`/admin/location/updatestate/${item?.id}`)}
                          />
                          <img
                            className="mx-1 admin_table_action_icon"
                            src="/images/delete-icon-blue.png"
                            onClick={() => {
                              setModalShow(true);
                              setDeleteItem(item);
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
            <Pagination
              pagination={pagination}
              setPagination={setPagination}
              list={stateList}
            />
            <DeleteModal
              show={modalShow}
              onHide={() => handleHide()}
              handleDelete={handlestateDelete}
              deleteItem={deleteItem}
            />
          </>
        )}
        {dataValue === 2 && (
          <>
            <Table responsive className="admin_table" bordered hover>
              <thead>
                <tr>
                  {tableHeading3 &&
                    tableHeading3?.map((i, index) => {
                      return (
                          <th className="table_head" key={index}>
                            {i}
                          </th>
                      );
                    })}
                </tr>
              </thead>
              <tbody>
                {countryList?.rows &&
                  countryList?.rows?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="text-center admin_table_data">
                          {pagination.pageSize * (pagination.pageNo - 1) +
                            (index + 1)}
                        </td>
                        <td className="text-center admin_table_data">
                          {item?.name}
                        </td>
                        <td className="text-center admin_table_data">
                          {item?.active === true ? "Active" : "Inactive"}
                        </td>
                        <td className="text-center admin_table_data">
                          <img
                            className="mx-1 admin_table_action_icon"
                            src="/images/edit-icon-blue.png"
                            onClick={() => router.push(`/admin/location/updatecountry/${item?.id}`)}
                          />
                          <img
                            className="mx-1 admin_table_action_icon"
                            src="/images/delete-icon-blue.png"
                            onClick={() => {
                              setModalShow(true);
                              setDeleteItem(item);
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
            <Pagination
              pagination={pagination}
              setPagination={setPagination}
              list={countryList}
            />
            <DeleteModal
              show={modalShow}
              onHide={() => handleHide()}
              handleDelete={handlecountryDelete}
              deleteItem={deleteItem}
            />
          </>
        )}
        {/* <DeleteModal
          show={modalShow}
          onHide={() => handleHide()}
          handleDelete={handleDelete}
          deleteItem={deleteItem}
        /> */}
      </div>
    </>
  );
}

export default LocationPage;
