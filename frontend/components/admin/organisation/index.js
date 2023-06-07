import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import DeleteModal from "../../modals/deleteModal";
import {
  deleteIndustry,
  deleteSector,
  getIndustryList,
  getlistSector,
} from "../../../redux/actions/organisation/addsector";
import { useDispatch, useSelector } from "react-redux";
import LoaderPage from "../../common-components/loader";
import { deleteOrganisation, getOrganisationlist } from "../../../redux/actions/organisation/addorganisation";
import Image from "next/image";
import { apibasePath } from "../../../config";
import Pagination from "../pagination/pagination";
import Pagesize from "../pagination/pagesize";
import { toast } from "react-toastify";
import { deleteFamilycode, deleteProfessioncode, familycodeList, professioncodeList, professionlist, deleteProfession } from "../../../redux/actions/organisation/profession";

function Organisation() {
  const [pagination, setPagination] = useState({
    pageNo: 1,
    pageSize: 10
  })
  const [modalShow, setModalShow] = useState(false);
  const [deleteItem, setDeleteItem] = useState();
  const [displayProfessions, setDisplayProfessions] = useState("Family code")
  const handleHide = () => {
    setModalShow(false);
  };

  const router = useRouter();
  const dispatch = useDispatch();
  const Heading = [
    "S.No.",
    "Image",
    "Logo",
    "Name",
    "City",
    "State",
    "Company level",
    "Action",
  ];
  const professionHeading = [
    "S.No.",
    "family/profession",
    "Also called",
    "Prep Level",
    "Action",
  ];
  const FormSteps = ["Sector", "Industry", "Companies", 'Professions'];
  const sectorheading = ["No.", "Sector", "Action"];
  const industryheading = ["No.", "Industry", "Action"];
  const [dataValue, setDataValue] = useState(0);

  const getSectorList = useSelector((state) => state?.sectorData?.sectorlist);
  const loadergetSectorlist = useSelector((state) => state?.sectorData?.isLoading)
  const organisationlist = useSelector((state) => state?.sectorData?.organisationList)

  useEffect(() => {
    dispatch(getlistSector(pagination));
    dispatch(getIndustryList(pagination));
    dispatch(getOrganisationlist(pagination));
    dispatch(familycodeList(pagination));
    dispatch(professioncodeList(pagination));
    dispatch(professionlist(pagination))
  }, [pagination]);

  const getIndustrylist = useSelector(
    (state) => state?.sectorData?.industrylist
  );

  const loadergetIndustrylist = useSelector(
    (state) => state?.sectorData?.isLoading
  );

  const familycodelist = useSelector((state) => state?.sectorData?.familyCodelist)
  const professioncodelist = useSelector((state) => state?.sectorData?.professionCodeList)
  const professionList = useSelector((state) => state?.sectorData?.professionList)

  const professionTabs = ["Family code", "Profession Code", "Profession list"]
  const familyCodeTablehead = ["Sr. no", "Family Name", "Family Code", "Action"]
  const professionCodeTablehead = ["Sr. no", "Profession Name", "Profession Code", "Action"]

  const organisationData = [
    {
      image: "/images/card-logo1.png",
      logo: "/images/card-logo2.png",
      name: "Tesla",
      city: "Panchkula",
      state: "Haryana",
      level: "0",
    },
    {
      image: "/images/card-logo1.png",
      logo: "/images/card-logo2.png",
      name: "Tesla",
      city: "Panchkula",
      state: "Haryana",
      level: "0",
    },
    {
      image: "/images/card-logo1.png",
      logo: "/images/card-logo2.png",
      name: "Tesla",
      city: "Panchkula",
      state: "Haryana",
      level: "0",
    },
    {
      image: "/images/card-logo1.png",
      logo: "/images/card-logo2.png",
      name: "Tesla",
      city: "Panchkula",
      state: "Haryana",
      level: "0",
    },
    {
      image: "/images/card-logo1.png",
      logo: "/images/card-logo2.png",
      name: "Tesla",
      city: "Panchkula",
      state: "Haryana",
      level: "0",
    },
  ];

  const handleDeleteOrganisation = (item) => {
    dispatch(deleteOrganisation(item)).then((res) => {
      if (res?.payload?.data?.success) {
        toast.success('Deleted')
      } else {
        toast.error('Error')
      }
    })
  }

  const handleDeleteSector = (item) => {
    dispatch(deleteSector(item.id)).then((res) => {
      if (res?.payload?.data?.success) {
        dispatch(getlistSector(pagination));
      }
    });
  };

  const handleFamilyCodeDelete = (item) => {
    dispatch(deleteFamilycode(item?.id)).then((res) => {
      if (res?.payload?.data?.success) {
        dispatch(familycodeList(pagination));
      }
    });
  }

  const handleProfessionCodeDelete = (item) => {
    dispatch(deleteProfessioncode(item?.id)).then((res) => {
      if (res?.payload?.data?.success) {
        dispatch(professioncodeList(pagination));
      }
    });
  }

  const handleDeleteProfession = (item) => {
    dispatch(deleteProfession(item.id)).then((res) => {
      if (res?.payload?.data?.success) {
        dispatch(professionlist(pagination));
      }
    });
  }

  const handleEditSector = (item) => {
    router.push(`/admin/organisation/sector/update/${item.id}`);
  };

  const handleDeleteIndustry = (item) => {
    dispatch(deleteIndustry(item.id)).then((res) => {
      if (res?.payload?.data?.success) {
        dispatch(getIndustryList(pagination));
      }
    });
  };


  const handleEditIndustry = (item) => {
    router.push(`/admin/organisation/industry/update/${item.id}`);
  };

  const handleOrgEdit = (id) => {
    router.push(`/admin/organisation/company/update/${id}`)
  }

  return (
    <>
      <div className="admin_home_tabs_row">
        <Row>
          <Col className="p-0 ">
            <div className="d-flex ">
              <ul className="nav tabs_scroll ">
                {FormSteps &&
                  FormSteps?.map((steps, stepsIndex) => (
                    <li className="nav-item " key={stepsIndex}>
                      <a
                        className={`nav-link admin_tabs_name ${dataValue === stepsIndex && "head-active"
                          }`}
                        active={true}
                        onClick={() => {
                          setDataValue(stepsIndex);
                          //     setPagination({ ...pagination, pageNo: 1 });
                        }}
                      >
                        {steps}
                      </a>
                    </li>
                  ))}
              </ul>
              <Pagesize setPagination={setPagination} />
            </div>
          </Col>
          <Col
            xl={6}
            lg={12}
            md={12}
            className="text-end admin_table_header_smallscreen"
          >
            {dataValue === 0 && (
              <div>
                <Button
                  className="border_btn"
                  onClick={() => router.push("organisation/sector/add")}
                >
                  Add new sector
                </Button>
                <Button
                  className="border_btn green"
                  onClick={() => router.push("organisation/industry/add")}
                >
                  Add new industry
                </Button>
              </div>
            )}
            {dataValue === 1 && (
              <div>
                <Button
                  className="border_btn"
                  onClick={() => router.push("organisation/sector/add")}
                >
                  Add new sector
                </Button>
                <Button
                  className="border_btn green"
                  onClick={() => router.push("organisation/industry/add")}
                >
                  Add new industry
                </Button>
              </div>
            )}
            {dataValue === 2 && (
              <>
                <div>
                  <Button className="border_btn">Upload CSV</Button>
                  <Button className="border_btn">Download CSV</Button>
                  <Button
                    className="border_btn green"
                    onClick={() => router.push("organisation/company/add")}
                  >
                    Add New
                  </Button>
                </div>
              </>
            )}
            {dataValue === 3 && (
              <>
                {displayProfessions === "Family code" && (
                  <>
                    <div>
                      <Button className="border_btn">Upload CSV</Button>
                      <Button className="border_btn">Download CSV</Button>
                      <Button
                        className="border_btn green"
                        onClick={() => router.push("organisation/familycode/add")}
                      >
                        Add New
                      </Button>
                    </div>
                  </>
                )}
                {displayProfessions === "Profession Code" && (
                  <>
                    <div>
                      <Button className="border_btn">Upload CSV</Button>
                      <Button className="border_btn">Download CSV</Button>
                      <Button
                        className="border_btn green"
                        onClick={() => router.push("organisation/professioncode/add")}
                      >
                        Add New
                      </Button>
                    </div>
                  </>
                )}
                {displayProfessions === "Profession list" && (
                  <div>
                    <Button className="border_btn">Upload CSV</Button>
                    <Button className="border_btn">Download CSV</Button>
                    <Button
                      className="border_btn green"
                      onClick={() => router.push("organisation/profession/add")}
                    >
                      Add New
                    </Button>
                  </div>
                )}
              </>
            )}
          </Col>
        </Row>
      </div>

      {/* sector table */}
      {dataValue === 0 && (
        <>
          <div className="admin_stream_table">
            <Row>
              <Table responsive className="admin_table" bordered hover>
                <thead>
                  <tr>
                    {sectorheading.map((hd, index) => {
                      return (
                        <th className="table_head" key={index}>
                          {hd}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>

                  {loadergetSectorlist ? <LoaderPage /> : getSectorList?.map((item, index) => {

                    return (
                      <tr key={index}>
                        <td className="text-center admin_table_serial">
                          {/* {pagination.pageSize * (pagination.pageNo-1) + (index + 1)} */}
                          {index + 1}
                        </td>
                        <td className="text-center admin_table_data">
                          {item.name}
                        </td>

                        <td className="text-center admin_table_data">
                          <img
                            className="mx-1 admin_table_action_icon"
                            src={"/images/edit-icon-blue.png"}
                            onClick={() => handleEditSector(item)}
                          />
                          <img
                            className="mx-1 admin_table_action_icon"
                            src={"/images/delete-icon-blue.png"}
                            onClick={() => handleDeleteSector(item)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Row>
          </div>
        </>
      )}

      {/* industry table */}
      {dataValue === 1 && (
        <>
          <div className="admin_stream_table">
            <Row>
              <Table responsive className="admin_table" bordered hover>
                <thead>
                  <tr>
                    {industryheading.map((hd, index) => {
                      return (
                        <th className="table_head" key={index}>
                          {hd}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>

                  {loadergetIndustrylist ? <LoaderPage /> : getIndustrylist?.map((item, index) => {

                    return (
                      <tr key={index}>
                        <td className="text-center admin_table_serial">
                          {/* {pagination.pageSize * (pagination.pageNo-1) + (index + 1)} */}
                          {index + 1}
                        </td>
                        <td className="text-center admin_table_data">
                          {item?.name}
                        </td>
                        {/* <td className="text-center admin_table_data">
                        {item.subStreamName}
                      </td> */}
                        <td className="text-center admin_table_data">
                          <img
                            className="mx-1 admin_table_action_icon"
                            src={"/images/edit-icon-blue.png"}
                            onClick={() => handleEditIndustry(item)}
                          />
                          <img
                            className="mx-1 admin_table_action_icon"
                            src={"/images/delete-icon-blue.png"}
                            onClick={() => handleDeleteIndustry(item)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Row>
          </div>
        </>
      )}

      {/* Organisation Table */}
      {dataValue === 2 && (
        <>
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
                  {organisationlist &&
                    organisationlist?.rows?.map((item, index) => {
                      return (
                        <tr key={index} >
                          <td className="text-center admin_table_data">
                            {pagination.pageSize * (pagination.pageNo - 1) + (index + 1)}
                          </td>
                          <td className="text-center admin_table_data">
                            <Image
                              height={75}
                              width={75}
                              // className="college_card_img img-fluid"
                              alt=""
                              src={`${apibasePath}documents/organisation/${item?.companyLogo}`} />
                          </td>
                          <td className="text-center admin_table_data">
                            <Image
                              height={75}
                              width={75}
                              // className="college_card_img img-fluid"
                              alt=""
                              src={`${apibasePath}documents/organisation/${item?.companyCover}`} />
                          </td>
                          <td className="text-center admin_table_data">
                            {item?.companyName}
                          </td>
                          <td className="text-center admin_table_data">
                            {item?.Cities?.name}
                          </td>
                          <td className="text-center admin_table_data">
                            {item?.States?.state}
                          </td>
                          <td className="text-center admin_table_data">
                            {item?.CompanyLevel.length > 0 &&
                              item?.CompanyLevel[0]?.companyLevel
                            }
                          </td>
                          <td className="text-center admin_table_data">
                            <img
                              className="mx-1 admin_table_action_icon"
                              src="/images/edit-icon-blue.png"
                              onClick={() => handleOrgEdit(item?.id)}
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
            <div className="admin_table_footer">
              <Pagination pagination={pagination} setPagination={setPagination} list={organisationlist} />
            </div>
            <DeleteModal
              show={modalShow}
              onHide={() => handleHide()}
              handleDelete={handleDeleteOrganisation}
              deleteItem={deleteItem}
            />
          </div>
        </>
      )}

      {/* Professions Table */}
      {dataValue === 3 && (
        <>
          <div className="d-flex">
            {professionTabs.map((item, index) => {
              return (<div key={index} onClick={() => setDisplayProfessions(item)} className={`me-4 ${item === displayProfessions && "head-active"}`}>{item}</div>)
            })}
          </div>

          {displayProfessions === "Family code" && (
            <>
              <Row>
                <Table responsive className="admin_stream_table" bordered hover>
                  <thead>
                    <tr>
                      {familyCodeTablehead.map((hd, index) => {
                        return (
                          <th className="table_head" key={index}>
                            {hd}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {familycodelist?.rows?.length > 0 && (
                      familycodelist?.rows?.map((item, index) => {
                        return (
                          <tr key={index} >
                            <td className="text-center admin_table_data">
                              {pagination.pageSize * (pagination.pageNo - 1) + (index + 1)}
                            </td>
                            <td className="text-center admin_table_data">
                              {item?.familyName}
                            </td>
                            <td className="text-center admin_table_data">
                              {item?.familyCode}
                            </td>
                            <td className="text-center admin_table_data">
                              <img
                                className="mx-1 admin_table_action_icon"
                                src="/images/edit-icon-blue.png"
                                onClick={() => router.push(`/admin/organisation/familycode/update/${item?.id}`)}
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
                      })
                    )}
                  </tbody>
                </Table>
                <div className="admin_table_footer">
                  <Pagination pagination={pagination} setPagination={setPagination} list={familycodelist} />
                </div>
                <DeleteModal
                  show={modalShow}
                  onHide={() => handleHide()}
                  handleDelete={handleFamilyCodeDelete}
                  deleteItem={deleteItem}
                />
              </Row>
            </>
          )}

          {displayProfessions === "Profession Code" && (
            <>
              <Row>
                <Table responsive className="admin_stream_table" bordered hover>
                  <thead>
                    <tr>
                      {professionCodeTablehead.map((hd, index) => {
                        return (
                          <th className="table_head" key={index}>
                            {hd}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {professioncodelist?.rows && professioncodelist?.rows?.length > 0 &&
                      (
                        <>
                          {professioncodelist?.rows.map((item, index) => {
                            return (
                              <tr key={index} >
                                <td className="text-center admin_table_data">
                                  {pagination.pageSize * (pagination.pageNo - 1) + (index + 1)}
                                </td>
                                <td className="text-center admin_table_data">
                                  {item?.professionName}
                                </td>
                                <td className="text-center admin_table_data">
                                  {item?.professionCode}
                                </td>
                                <td className="text-center admin_table_data">
                                  <img
                                    className="mx-1 admin_table_action_icon"
                                    src="/images/edit-icon-blue.png"
                                    onClick={() => router.push(`/admin/organisation/professioncode/update/${item?.id}`)}
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
                        </>
                      )}
                  </tbody>
                  <div className="admin_table_footer">
                    <Pagination pagination={pagination} setPagination={setPagination} list={professioncodelist} />
                  </div>
                  <DeleteModal
                    show={modalShow}
                    onHide={() => handleHide()}
                    handleDelete={handleProfessionCodeDelete}
                    deleteItem={deleteItem}
                  />
                </Table>
              </Row>
            </>
          )}

          {displayProfessions === "Profession list" && (
            <>
              <div className="admin_stream_table">
                <Row>
                  <Table responsive className="admin_table" bordered hover>
                    <thead>
                      <tr>
                        {professionHeading.map((hd, index) => {
                          return (
                            <th className="table_head" key={index}>
                              {hd}
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {professionList?.rows?.length > 0 &&
                        professionList?.rows?.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td className="text-center admin_table_data">
                                {pagination.pageSize * (pagination.pageNo - 1) + (index + 1)}
                              </td>
                              <td className="text-center admin_table_data">
                                {item?.ProfessionCode ?
                                  <>
                                    {`${item?.ProfessionCode?.FamilyCode?.familyCode}.${item?.ProfessionCode?.professionCode}`} - {item?.ProfessionCode?.professionName}
                                  </>
                                  :
                                  <>
                                    {`${item?.FamilyCode?.familyCode}.0000`} - {item?.FamilyCode?.familyName}
                                  </>
                                }
                              </td>
                              <td className="text-center admin_table_data">
                                {item?.alsoCalled}
                              </td>
                              <td className="text-center admin_table_data">
                                {item?.prepLevel}
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
                <div className="admin_table_footer">
                  <Pagination pagination={pagination} setPagination={setPagination} list={professionList} />
                </div>
                <DeleteModal
                  show={modalShow}
                  onHide={() => handleHide()}
                  handleDelete={handleDeleteProfession}
                  deleteItem={deleteItem}
                />
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default Organisation;
