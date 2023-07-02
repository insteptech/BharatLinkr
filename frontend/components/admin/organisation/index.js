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
import {
  deleteOrganisation,
  getOrganisationlist,
} from "../../../redux/actions/organisation/addorganisation";
import Image from "next/image";
import { apibasePath } from "../../../config";
import Pagination from "../pagination/pagination";
import Pagesize from "../pagination/pagesize";
import { toast } from "react-toastify";
import { getRole } from "../../utils/index";
import {
  deleteFamilycode,
  deleteProfessioncode,
  familycodeList,
  professioncodeList,
  professionlist,
  deleteProfession,
} from "../../../redux/actions/organisation/profession";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import NoDataPage from "../../common-components/NoDataPage/NoDataPage";

function Organisation() {
  const headerTabs = [{ name: "Companies", key: 'companies' }, { name: "Professions", key: 'profession' }];
  const companyTabs = [
    { name: "Sector", key: 'sector', showFor: 'companies' },
    { name: "Industry", key: 'industry', showFor: 'companies' },
    { name: "Companies", key: 'companies', showFor: 'companies' },
    { name: "Family code", key: 'familyCode', showFor: 'profession' },
    { name: "Profession Code", key: 'professionCode', showFor: 'profession' },
    { name: "Profession list", key: 'professionlist', showFor: 'profession' }]
  const subHeaderTabs = [
    { name: "Sector", key: 'sector', showFor: 'companies' },
    { name: "Industry", key: 'industry', showFor: 'companies' },
    { name: "Companies", key: 'companies', showFor: 'companies' },
    { name: "Family code", key: 'familyCode', showFor: 'profession' },
    { name: "Profession Code", key: 'professionCode', showFor: 'profession' },
    { name: "Profession list", key: 'professionlist', showFor: 'profession' }]
  const professionTabs = [{ name: "Family code", key: 'familyCode' }, { name: "Profession Code", key: 'professionCode' }, { name: "Profession list", key: 'professionlist' }]
  const sectorheading = ["No.", "Sector", "Action"];
  const industryheading = ["No.", "Industry", "Action"];


  const router = useRouter();
  const dispatch = useDispatch();

  const [pagination, setPagination] = useState({ pageNo: 1, pageSize: 10, });
  const [modalShow, setModalShow] = useState(false);
  const [deleteItem, setDeleteItem] = useState();
  const [dataValue, setDataValue] = useState(headerTabs[0].key);
  const [header, setHeader] = useState(headerTabs[0].key);
  const [subHeader, setSubHeader] = useState(subHeaderTabs[0].key);

  const handleHide = () => {
    setModalShow(false);
  };


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

  const getSectorList = useSelector((state) => state?.sectorData?.sectorlist);
  const loadergetSectorlist = useSelector(state => state?.sectorData?.isLoading);
  const organisationlist = useSelector(state => state?.sectorData?.organisationList);
  const getIndustrylist = useSelector(state => state?.sectorData?.industrylist);
  const loadergetIndustrylist = useSelector(state => state?.sectorData?.isLoading);
  const familycodelist = useSelector(state => state?.sectorData?.familyCodelist);
  const professioncodelist = useSelector(state => state?.sectorData?.professionCodeList);
  const professionList = useSelector(state => state?.sectorData?.professionList);

  const apiCallbyTab = {
    sector: { forList: () => dispatch(getlistSector(pagination)) },
    industry: { forList: () => dispatch(getIndustryList(pagination)) },
    companies: { forList: () => dispatch(getOrganisationlist(pagination)) },
    familyCode: { forList: () => dispatch(familycodeList(pagination)) },
    professionCode: { forList: () => dispatch(professioncodeList(pagination)) },
    professionlist: { forList: () => dispatch(professionlist(pagination)) },

  }

  const subheaderJSON = {
    sector: "organisation/sector/add",
    industry: "organisation/industry/add",
    companies: "organisation/company/add",
    familyCode: "organisation/familycode/add",
    professionCode: "organisation/professioncode/add",
    professionlist: "organisation/profession/add"
  }
  useEffect(() => {
    if (subHeader) apiCallbyTab[subHeader].forList()
  }, [subHeader])
  console.log(subHeader)

  const familyCodeTablehead = [
    "Sr. no",
    "Family Name",
    "Family Code",
    "Action",
  ];
  const professionCodeTablehead = [
    "Sr. no",
    "Profession Name",
    "Profession Code",
    "Action",
  ];

  const handleDeleteOrganisation = (item) => {
    dispatch(deleteOrganisation(Number(item.id))).then((res) => {
      if (res?.payload?.data?.success) {
        toast.success("Deleted", { autoClose: 1000 });
        dispatch(getOrganisationlist(pagination));
      } else {
        toast.error("Error", { autoClose: 1000 });
      }
    });
  };

  const handleDeleteSector = (item) => {
    dispatch(deleteSector(item.id)).then((res) => {
      if (res?.payload?.data?.success) {
        toast.success("Deleted", { autoClose: 1000 })
        dispatch(getlistSector(pagination));
      }
    });
  };

  const handleFamilyCodeDelete = (item) => {
    dispatch(deleteFamilycode(item?.id)).then((res) => {
      if (res?.payload?.data?.success) {
        toast.success("Deleted", { autoClose: 1000 })
        dispatch(familycodeList(pagination));
      }
    });
  };

  const handleProfessionCodeDelete = (item) => {
    dispatch(deleteProfessioncode(item?.id)).then((res) => {
      if (res?.payload?.data?.success) {
        toast.success("Deleted", { autoClose: 1000 })
        dispatch(professioncodeList(pagination));
      }
    });
  };

  const handleDeleteProfession = (item) => {
    dispatch(deleteProfession(item.id)).then((res) => {
      if (res?.payload?.data?.success) {
        toast.success("Deleted", { autoClose: 1000 })
        dispatch(professionlist(pagination));
      }
    });
  };

  const handleDeleteIndustry = (item) => {
    dispatch(deleteIndustry(item.id)).then((res) => {
      if (res?.payload?.data?.success) {
        toast.success("Deleted", { autoClose: 1000 })
        dispatch(getIndustryList(pagination));
      }
    });
  };

  const handleEditSector = (item) => {
    router.push(`/admin/organisation/sector/update/${item.id}`);
  };

  const handleEditIndustry = (item) => {
    router.push(`/admin/organisation/industry/update/${item.id}`);
  };

  const handleOrgEdit = (id) => {
    router.push(`/admin/organisation/company/update/${id}`);
  };

  const handleMenu = (key) => {
    const subHeaderkey = subHeaderTabs.find(item => item.showFor == key)
    setHeader(key)
    setSubHeader(subHeaderkey?.key)
  }
  const handleRoutes = (key) => {
    console.log(route[key])

  }
  return (
    <>
      <div className="admin_home_tabs_row">
        <Row>
          <Col className="p-0 ">
            <div className="tab_drop_justify">
              <ScrollingCarousel show={5.5} slide={4} swiping={true}>
                <ul className="nav  ">
                  {headerTabs &&
                    headerTabs?.map((steps, stepsIndex) => (
                      <li className="nav-item " key={stepsIndex}>
                        <a
                          className={`nav-link admin_tabs_name ${header === steps.key && "head-active"
                            }`}
                          active='true'
                          onClick={() => {
                            handleMenu(steps.key)
                          }}
                        >
                          {steps.name}
                        </a>
                      </li>
                    ))}
                </ul>
              </ScrollingCarousel>
              {header}
              <div className="ms-2 d-flex">
                <Pagesize setPagination={setPagination} />
              </div>
            </div>
          </Col>
          <Col
            xl={6}
            lg={12}
            md={12}
            className="text-end admin_table_header_smallscreen hide_btn_row"
          >
            {
              subHeader === "companies" ?
                header === 'companies' &&
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
                : header === 'companies' &&
                < div >
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
            }
            {header === 'profession' &&
              <div>
                <Button className="border_btn">Upload CSV</Button>
                <Button className="border_btn">Download CSV</Button>
                <Button
                  className="border_btn green"
                  onClick={() =>
                    handleRoutes(subHeader)
                  }
                >
                  Add New
                </Button>
              </div>
            }
          </Col >
        </Row >
      </div >
      <Row>
        <Col
          xl={12}
          className="text-end  display_btn_row"
        >
          {
            subHeader === "companies" ?
              header === 'companies' &&
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
              : header === 'companies' &&
              < div >
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
          }
          {header === 'profession' &&
            <div>
              <Button className="border_btn">Upload CSV</Button>
              <Button className="border_btn">Download CSV</Button>
              <Button
                className="border_btn green"
                onClick={() =>
                  handleRoutes(subHeader)
                }
              >
                Add New
              </Button>
            </div>
          }
        </Col>
      </Row>

      <ScrollingCarousel show={5.5} slide={4} swiping={true}>
        <ul className="nav ">
          {subHeaderTabs.map((item, index) => {
            if (item.showFor === header)
              return (
                <li
                  key={index}
                  onClick={() => setSubHeader(item.key)}
                  className={`border_tabs_padding border_btn_tabs mobile_font_12 ${item.key === subHeader && "active_btn_tabs"}`}
                >
                  {item.name}
                </li>
              );
          })}
        </ul>
      </ScrollingCarousel>
      {
        header === 'companies' && (
          <>
            {subHeader === "sector" && (
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
                        {loadergetSectorlist ? (
                          <LoaderPage />
                        ) : getSectorList?.rows?.length > 0 && (
                          getSectorList?.rows?.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td className="text-center admin_table_serial">
                                  {pagination.pageSize * (pagination.pageNo - 1) + (index + 1)}
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
                    {getSectorList && getSectorList?.rows && getSectorList?.rows?.length === 0 && <NoDataPage />}
                  </Row>
                </div>
                {getSectorList && getSectorList?.rows && getSectorList?.rows?.length !== 0 && (
                  <div className="admin_table_footer">
                    <Pagination
                      pagination={pagination}
                      setPagination={setPagination}
                      list={getSectorList}
                    />
                  </div>
                )}
                <DeleteModal
                  show={modalShow}
                  onHide={() => handleHide()}
                  handleDelete={handleDeleteSector}
                  deleteItem={deleteItem}
                />
              </>
            )}

            {subHeader === "industry" && (
              <>
                <div className="admin_stream_table">
                  <Row>
                    {loadergetIndustrylist ? (
                      <LoaderPage />
                    ) : (
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
                          {getIndustrylist &&
                            getIndustrylist?.rows &&
                            getIndustrylist?.rows.length > 0 && getIndustrylist?.rows?.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td className="text-center admin_table_serial">
                                    {pagination.pageSize * (pagination.pageNo - 1) + (index + 1)}
                                  </td>
                                  <td className="text-center admin_table_data">
                                    {item?.name}
                                  </td>
                                  <td className="text-center admin_table_data">
                                    <img
                                      className="mx-1 admin_table_action_icon"
                                      src={"/images/edit-icon-blue.png"}
                                      onClick={() => handleEditIndustry(item)}
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
                          }
                        </tbody>
                      </Table>
                    )}
                    {getIndustrylist &&
                      getIndustrylist?.rows && getIndustrylist?.rows.length === 0 && <NoDataPage />}
                  </Row>
                  {getIndustrylist &&
                    getIndustrylist?.rows && getIndustrylist?.rows.length !== 0 &&
                    <div className="admin_table_footer">
                      <Pagination
                        pagination={pagination}
                        setPagination={setPagination}
                        list={getIndustrylist}
                      />
                    </div>
                  }
                  <DeleteModal
                    show={modalShow}
                    onHide={() => handleHide()}
                    handleDelete={handleDeleteIndustry}
                    deleteItem={deleteItem}
                  />
                </div>
              </>
            )}

            {subHeader === "companies" && (
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
                    {console.log(organisationlist, 'organisationlistorganisationlist')}
                    <tbody>
                      {organisationlist &&
                        organisationlist?.rows &&
                        organisationlist?.rows.length > 0 &&
                        organisationlist?.rows?.map((item, index) => {
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
                                  src={`${apibasePath}documents/organisation/${item?.companyLogo}`}
                                />
                              </td>
                              <td className="text-center admin_table_data">
                                <Image
                                  height={75}
                                  width={75}
                                  // className="college_card_img img-fluid"
                                  alt=""
                                  src={`${apibasePath}documents/organisation/${item?.companyCover}`}
                                />
                              </td>
                              <td className="text-center admin_table_data">
                                {item?.OrganisationCompany?.companyName}
                              </td>
                              <td className="text-center admin_table_data">
                                {item?.Cities?.name}
                              </td>
                              <td className="text-center admin_table_data">
                                {item?.States?.state}
                              </td>
                              <td className="text-center admin_table_data">
                                {item?.CompanyLevel.length > 0 &&
                                  item?.CompanyLevel[0]?.companyLevel}
                              </td>
                              <td className="text-center admin_table_data">
                                <img
                                  className="mx-1 admin_table_action_icon"
                                  src="/images/edit-icon-blue.png"
                                  onClick={() => handleOrgEdit(item?.id)}
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
                  {organisationlist &&
                    organisationlist?.rows && organisationlist.rows.length === 0 && <NoDataPage />}
                </Row>
                {organisationlist &&
                  organisationlist?.rows &&
                  organisationlist.rows.length !== 0 &&
                  <div className="admin_table_footer">
                    <Pagination
                      pagination={pagination}
                      setPagination={setPagination}
                      list={organisationlist}
                    />
                  </div>
                }
                <DeleteModal
                  show={modalShow}
                  onHide={() => handleHide()}
                  handleDelete={handleDeleteOrganisation}
                  deleteItem={deleteItem}
                />
              </div>
            )}
          </>
        )}

      {header === 'profession' && (
        <>
          {subHeader === "familyCode" && (
            <>
              <Row>
                <Table responsive className="admin_stream_table admin_table" bordered hover>
                  <thead>
                    <tr>
                      {familyCodeTablehead.map((hd, index) => {
                        return (
                          <th className="table_head" key={index}>
                            {hd}
                          </th>
                        )
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {familycodelist && familycodelist?.rows && familycodelist?.rows?.length > 0 &&
                      familycodelist?.rows?.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td className="text-center admin_table_data">
                              {pagination.pageSize * (pagination.pageNo - 1) +
                                (index + 1)}
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
                                onClick={() =>
                                  router.push(`/admin/organisation/familycode/update/${item?.id}`)} />
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
                {familycodelist && familycodelist?.rows && familycodelist?.rows?.length === 0 && <NoDataPage />}
                {familycodelist && familycodelist?.rows && familycodelist?.rows?.length !== 0 &&
                  <div className="admin_table_footer">
                    <Pagination
                      pagination={pagination}
                      setPagination={setPagination}
                      list={familycodelist}
                    />
                  </div>
                }
                <DeleteModal
                  show={modalShow}
                  onHide={() => handleHide()}
                  handleDelete={handleFamilyCodeDelete}
                  deleteItem={deleteItem}
                />
              </Row>
            </>
          )}

          {subHeader === "professionCode" && (
            <>
              <Row>
                <Table responsive className="admin_stream_table admin_table" bordered hover>
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
                    {professioncodelist && professioncodelist?.rows &&
                      professioncodelist?.rows?.length > 0 && (
                        <>
                          {professioncodelist?.rows.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td className="text-center admin_table_data">
                                  {pagination.pageSize *
                                    (pagination.pageNo - 1) +
                                    (index + 1)}
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
                                    onClick={() =>
                                      router.push(
                                        `/admin/organisation/professioncode/update/${item?.id}`
                                      )
                                    }
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
                        </>
                      )}
                  </tbody>

                  {professioncodelist && professioncodelist?.rows && professioncodelist?.rows?.length !== 0 &&
                    <div className="admin_table_footer">
                      <Pagination
                        pagination={pagination}
                        setPagination={setPagination}
                        list={professioncodelist}
                      />
                    </div>}
                  <DeleteModal
                    show={modalShow}
                    onHide={() => handleHide()}
                    handleDelete={handleProfessionCodeDelete}
                    deleteItem={deleteItem}
                  />
                </Table>
                {professioncodelist && professioncodelist?.rows && professioncodelist?.rows?.length === 0 && <NoDataPage />}

              </Row>
            </>
          )}

          {subHeader === "professionlist" && (
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
                                {pagination.pageSize * (pagination.pageNo - 1) +
                                  (index + 1)}
                              </td>
                              <td className="text-center admin_table_data">
                                {item?.ProfessionCode ? (
                                  <>
                                    {`${item?.ProfessionCode?.FamilyCode?.familyCode}.${item?.ProfessionCode?.professionCode}`}{" "}
                                    - {item?.ProfessionCode?.professionName}
                                  </>
                                ) : (
                                  <>
                                    {`${item?.FamilyCode?.familyCode}.0000`} -{" "}
                                    {item?.FamilyCode?.familyName}
                                  </>
                                )}
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
                                  onClick={() =>
                                    router.push(
                                      `organisation/profession/update/${item?.id}`
                                    )
                                  }
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
                </Row>
                <div className="admin_table_footer">
                  <Pagination
                    pagination={pagination}
                    setPagination={setPagination}
                    list={professionList}
                  />
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
