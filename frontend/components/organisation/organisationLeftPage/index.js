import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cityDropdown,
  getCityList,
  searchCity,
} from "../../../redux/actions/location/createCity";
import {
  getState,
  searchState,
} from "../../../redux/actions/location/createState";
import { useRouter } from "next/router";
import { refined } from "../../../utils/helper";
import { getOrganisationlist } from "../../../redux/actions/organisation/addorganisation";
import { familycodeList, professionlist } from "../../../redux/actions/organisation/profession";
import { getCourse } from "../../../redux/actions/course/addcourse";

function OrganisationLeftPage({ dataValue }, props) {

  const router = useRouter();
  const { query } = router;
  const [apiFilterObject, setApiFilterObject] = useState({});
  const [queryFilterObject, setQueryFilterObject] = useState({});
  const [activeState, setActiveState] = useState([]);
  const dispatch = useDispatch();

  const [professionFilterData, setProfessionFilterData] = useState({})
  const stateList = useSelector((data) => data?.stateList?.stateList?.data?.data?.rows);
  var cityList = useSelector((city) => city?.cityList?.cityList?.data?.data?.rows);
  const cityStateList = useSelector((state) => state?.cityList?.cityList?.data?.result);
  const orgCount = useSelector((state) => state?.sectorData?.organisationList?.count)
  const courselist = useSelector((data) => data?.courseList?.courselist?.data?.rows);
  const familyCodelist = useSelector((data) => data?.sectorData?.familyCodelist?.rows);


  const handleprofessionFilters = (id, key) => {
    let x = professionFilterData
    if (x[key]) {
      let found = x[key].includes(id)
      if (found) {
        if (x[key].length == 1) {
          delete x[key]
        } else {
          let index = x[key].indexOf(id)
          x[key].splice(index, 1)
        }
      } else {
        x[key].push(id)
      }
    } else {
      x[key] = [id]
    }
    setProfessionFilterData(x)
    dispatch(professionlist(x))
  }

  const StringArray = [
    "CompanyLevel",
    "natureOfBusiness",
    "establishedYear",
    "typeOfCompany",
  ];

  useEffect(() => {
    if (query) {
      const queryObject = {};
      Object.keys(query).forEach((queryKey, queryIndex) => {
        if (StringArray.includes(queryKey) && !Array.isArray(query[queryKey])) {
          queryObject[queryKey] = [query[queryKey]];
        } else if (
          StringArray.includes(queryKey) &&
          Array.isArray(query[queryKey])
        ) {
          queryObject[queryKey] = query[queryKey];
        } else if (!Array.isArray(query[queryKey])) {
          queryObject[queryKey] = [Number(query[queryKey])];
        } else if (Array.isArray(query[queryKey])) {
          queryObject[queryKey] = query[queryKey].map((item) => Number(item));
        }
      });
      setApiFilterObject(queryObject);
      setActiveState(Object.keys(query));
    }
    dispatch(getCourse())
    dispatch(familycodeList())
  }, [JSON.stringify(query)]);


  const companylevel = [
    "Corporate",
    "Foreign MNC",
    "Startup",
    "Indian MNC",
    "Govt./PSU",
    "Others",
    "Small and Medium Enterprises (SMEs)",
    "Corporate",
    "Non Profit Organisation",
    "PSUs",
  ];

  const natureOfBuisness = ["B2B", "B2C", "B2G", "B2B2C", "D2C"];

  const typeOfCompany = [
    "Private Limited",
    "Proprietorship",
    "Limited Liability Partnership (LLP)",
    "Public Limited",
    "One person company",
    "Section 8 company",
    "Nidhi company",
    "Foreign company",
    "Producer company",
  ];

  const establishedyear = [{ value: "2023,2013", label: "2023-2013" }, { value: "2013,1993", label: "2013-1993" }, { value: "1993,1983", label: "1993-1983" }, { value: "1983,1973", label: "1983-1973" }, { value: "1973,1963", label: "1973-1963" }]

  const [searchFilter, setSearchFilter] = useState({ companylevel: "", natureOfBuisness: "", typeOfCompany: "", establishedyear: "" })

  const prepleveldata = ["1", "2", "3", "4", "5"]

  const handleStateSelect = (e, itemId, itemName) => {
    const { name, checked } = e.target;

    if (!queryFilterObject[name]) {
      setQueryFilterObject({ ...queryFilterObject, [name]: [itemName] });
    } else {
      if (queryFilterObject[name].includes(itemName)) {
        // const updated = queryFilterObject[name].filter(
        //   (ele) => ele !== refinedName
        // );
      } else {
        setQueryFilterObject({
          ...queryFilterObject,
          [name]: [...queryFilterObject[name], itemName],
        });
      }
    }

    if (!apiFilterObject[name]) {
      setApiFilterObject({ ...apiFilterObject, [name]: [itemId] });
    } else {
      if (apiFilterObject[name].includes(itemId)) {
        const updated = apiFilterObject[name].filter((ele) => ele !== itemId);

        if (!checked && name !== "stateId") {
          setApiFilterObject({
            ...apiFilterObject,
            [name]: updated,
          });
        } else if (!checked && name === "stateId") {
          dispatch(cityDropdown({ stateId: [itemId] })).then((res) => {
            if (res && res.payload) {
              const CityArray = res?.payload?.data.result?.map(
                (item) => item.id
              );

              if (
                apiFilterObject.cityId &&
                apiFilterObject.cityId.length > 0 &&
                CityArray &&
                CityArray.length > 0
              ) {
                const city = apiFilterObject?.cityId.filter(
                  (item) => !CityArray.includes(item)
                );

                setApiFilterObject({
                  ...apiFilterObject,
                  stateId: updated,
                  cityId: city,
                });
              } else {
                setApiFilterObject({
                  ...apiFilterObject,
                  [name]: updated,
                });
              }
            }
          });
        }
      } else {
        setApiFilterObject({
          ...apiFilterObject,
          [name]: [...apiFilterObject[name], itemId],
        });
      }
    }

  };

  const filteredSearchlist = {
    companylevel: companylevel.filter((elem) =>
      elem.toLowerCase().includes(searchFilter.companylevel.toLowerCase())),

    natureOfBuisness: natureOfBuisness.filter((elem) =>
      elem.toLowerCase().includes(searchFilter.natureOfBuisness.toLowerCase())),

    typeOfCompany: typeOfCompany.filter((elem) =>
      elem.toLowerCase().includes(searchFilter.typeOfCompany.toLowerCase())),

    establishedyear: establishedyear.filter((elem) =>
      elem.value.toLowerCase().includes(searchFilter.establishedyear.toLowerCase()))
  }

  const stateSearch = (e) => {
    let data = { search: e.target.value };
    dispatch(searchState(data));
  };

  const citySearch = (e) => {
    let citydata = { search: e.target.value }
    dispatch(cityDropdown(citydata))
  }

  const handleSearchCompany = (e, type) => {
    setSearchFilter(prev => ({
      ...prev,
      [type]: e.target.value
    }))
  };

  useEffect(() => {
    dispatch(getState());
    dispatch(cityDropdown());
  }, []);

  const selectedStateCheck = (name, selectedId) => {
    let isExist = false;
    if (apiFilterObject && selectedId && apiFilterObject[name]) {
      isExist = apiFilterObject[name]?.includes(selectedId);
    }
    return isExist;
  };

  useEffect(() => {
    let filCollege = false;
    if (apiFilterObject && Object.keys(apiFilterObject).length > 0) {
      Object.keys(apiFilterObject).forEach((key) => {
        if (apiFilterObject[key] && apiFilterObject[key].length === 0) {
          delete apiFilterObject[key];
        } else {
          filCollege = true;
        }
      });
      router.replace({ query: apiFilterObject });
    }
    if (filCollege) {
      dispatch(getOrganisationlist(apiFilterObject));
      dispatch(cityDropdown({ stateId: apiFilterObject.stateId }));
    } else {
      dispatch(getOrganisationlist());
      dispatch(cityDropdown());
    }
  }, [apiFilterObject]);

  // let x = new Date().getFullYear()
  // let yearList = []

  // for (let i = 1; i < 20; i++) {
  //   yearList.push({ value: [x - i * 10, x], key: i * 10 + 'yrs', id: i })
  // }
  // const handleYearSelect = (item) => {
  //   setApiFilterObject({
  //     ...apiFilterObject,
  //     "establishedYear": item,
  //   });

  // }

  const handleRemoveState = (item) => {
    setQueryFilterObject(prevFilter => {
      const updatedFilter = { ...prevFilter };
      const stateIdIndex = updatedFilter.stateId.indexOf(item);
      if (stateIdIndex !== -1) {
        updatedFilter.stateId.splice(stateIdIndex, 1);
      }
      return updatedFilter;
    });
  };

  const handleRemoveCity = (item, index) => {
    setQueryFilterObject(prevFilter => {
      const updatedFilter = { ...prevFilter }
      const cityIdIndex = updatedFilter.cityId.indexOf(item)
      if (cityIdIndex !== -1) {
        updatedFilter.cityId.splice(cityIdIndex, 1)
      }
      return updatedFilter
    })
  }

  const handleRemoveCompany = (item) => {
    setQueryFilterObject(prevFilter => {
      const updateFilter = { ...prevFilter }
      const companyIdIndex = updateFilter.CompanyLevel.indexOf(item)
      if (companyIdIndex !== -1) {
        updateFilter.CompanyLevel.splice(companyIdIndex, 1)
      }
      return updateFilter
    })
  }

  const handleRemoveNatureOfBusiness = (item) => {
    setQueryFilterObject(prevFilter => {
      const updateFilter = { ...prevFilter }
      const businessIdIndex = updateFilter.natureOfBusiness.indexOf(item)
      if (businessIdIndex !== -1) {
        updateFilter.natureOfBusiness.splice(businessIdIndex, 1)
      }
      return updateFilter
    })
  }

  const handleRemoveEstablishedYear = (item) => {
    setQueryFilterObject(prevFilter => {
      const updateFilter = { ...prevFilter }
      const establishyearIdIndex = updateFilter.establishedYear.indexOf(item)
      if (establishyearIdIndex !== -1) {
        updateFilter.establishedYear.splice(establishyearIdIndex, 1)
      }
      return updateFilter
    })
  }

  const handleRemoveTypeOfCompany = (item) => {
    setQueryFilterObject(prevFilter => {
      const updateFilter = { ...prevFilter }
      const typeofcompanyIdIndex = updateFilter.typeOfCompany.indexOf(item)
      if (typeofcompanyIdIndex !== -1) {
        updateFilter.typeOfCompany.splice(typeofcompanyIdIndex, 1)
      }
      return updateFilter
    })
  }

  return (
    <>
      {/* -----------------------master search bar start--------------------- */}
      <div className="profile_search_bar_col hide_box">
        <div className="search_profile_search_bar college_master_search">
          <input
            type="text"
            placeholder="Search by name..."
            name=""
            className="form-control chat_box_weite_bar"
          />
          <button type="submit">
            <img src="/images/search.png" />
          </button>
        </div>
      </div>

      {/* ----------------------master search bar end----------------------- */}
      <div className="master_heading_manager_div">
        <h3 className="college_left_page_master_heading">Found {orgCount} Companies</h3>
        {/* <p className="college_left_page_master_text">Set Default</p> */}
      </div>

      {/* ----------------------master filter bar start----------------------- */}

      <div className="colleges_left_boxes">
        <p className="college_box_heading mb-0">Selected Filters</p>
        <div className="selected_filters_subbox">
          {queryFilterObject &&
            queryFilterObject?.stateId?.map((item, index) => {
              return (
                <div className="selected_filters" >
                  {item}
                  <div className="filter_dot" onClick={() => handleRemoveState(item, index)} />
                </div>
              );
            })}
          {queryFilterObject &&
            queryFilterObject?.cityId?.map((item, index) => {
              return (
                <div className="selected_filters" >
                  {item}
                  <div className="filter_dot" onClick={() => handleRemoveCity(item, index)}></div>
                </div>
              );
            })}

          {queryFilterObject &&
            queryFilterObject?.CompanyLevel?.map((item, index) => {
              return (
                <div className="selected_filters" >
                  {item}
                  <div className="filter_dot" onClick={() => handleRemoveCompany(item, index)} />
                </div>
              );
            })}
          {queryFilterObject &&
            queryFilterObject?.natureOfBusiness?.map((item, index) => {
              return (
                <div className="selected_filters" >
                  {item}
                  <div className="filter_dot" onClick={() => handleRemoveNatureOfBusiness(item, index)}></div>
                </div>
              );
            })}
          {queryFilterObject &&
            queryFilterObject?.establishedYear?.map((item, index) => {
              return (
                <div className="selected_filters" >
                  {item}
                  <div className="filter_dot" onClick={() => handleRemoveEstablishedYear(item, index)} />
                </div>
              );
            })}
          {queryFilterObject &&
            queryFilterObject?.typeOfCompany?.map((item, index) => {
              return (
                <div className="selected_filters" >
                  {item}
                  <div className="filter_dot" onClick={() => handleRemoveTypeOfCompany(item, index)}></div>
                </div>
              );
            })}
        </div>
      </div>

      {/* ----------------------master filter bar end----------------------- */}
      {(dataValue == 0 || dataValue == 2) && (
        <>
          <div className="colleges_left_boxes">
            <p className="college_box_heading">STATE</p>
            {/*Search */}
            <div>
              <input
                className="college_box_searchbar"
                type="text"
                placeholder="search"
                onChange={(e) => stateSearch(e)}
              />
            </div>
            {/*Checkbox */}
            <div className="box_data">
              {stateList?.map((item) => {
                return (
                  <>
                    <div className="check_input_label_div">
                      <input
                        className="college_box_check_input"
                        type="checkbox"
                      // onChange={() => handleStateSelect(item.id)}
                      // onChange={(e) =>
                      // props.handleFilters(
                      //   item,
                      //   e.target.name,
                      //   e.target.checked
                      // )
                      // }
                      />
                      <label className="check_input_label">{item.state}</label>
                    </div>
                  </>
                );
              })}
            </div>
          </div>

          <div className="colleges_left_boxes">
            <p className="college_box_heading">CITY</p>
            {/*Search */}
            <div>
              <input
                className="college_box_searchbar"
                type="text"
                placeholder="search"
                onChange={(e) => citySearch(e)}
              />
            </div>
            {/*Checkbox */}
            <div className="box_data">
              {cityList?.map((item) => {
                return (
                  <>
                    <div className="check_input_label_div">
                      <input
                        className="college_box_check_input"
                        type="checkbox"
                      />
                      <label className="check_input_label">{item.name}</label>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className="colleges_left_boxes">
            <p className="college_box_heading">Job Role</p>
            {/*Search */}
            <div>
              <input
                className="college_box_searchbar"
                type="text"
                placeholder="search"
              // onChange={(e) => citySearch(e)}
              />
            </div>
            {/*Checkbox */}
            <div className="box_data">
              {cityList?.map((item) => {
                return (
                  <>
                    <div className="check_input_label_div">
                      <input
                        className="college_box_check_input"
                        type="checkbox"
                      />
                      <label className="check_input_label">{item.name}</label>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className="colleges_left_boxes">
            <p className="college_box_heading">Eligibility</p>
            {/*Search */}
            <div>
              <input
                className="college_box_searchbar"
                type="text"
                placeholder="search"
              // onChange={(e) => citySearch(e)}
              />
            </div>
            {/*Checkbox */}
            <div className="box_data">
              {cityList?.map((item) => {
                return (
                  <>
                    <div className="check_input_label_div">
                      <input
                        className="college_box_check_input"
                        type="checkbox"
                      />
                      <label className="check_input_label">{item.name}</label>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className="colleges_left_boxes">
            <p className="college_box_heading">Department</p>
            {/*Search */}
            <div>
              <input
                className="college_box_searchbar"
                type="text"
                placeholder="search"
              // onChange={(e) => citySearch(e)}
              />
            </div>
            {/*Checkbox */}
            <div className="box_data">
              {cityList?.map((item) => {
                return (
                  <>
                    <div className="check_input_label_div">
                      <input
                        className="college_box_check_input"
                        type="checkbox"
                      />
                      <label className="check_input_label">{item.name}</label>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className="colleges_left_boxes">
            <p className="college_box_heading">Sub Department</p>
            {/*Search */}
            <div>
              <input
                className="college_box_searchbar"
                type="text"
                placeholder="search"
              // onChange={(e) => citySearch(e)}
              />
            </div>
            {/*Checkbox */}
            <div className="box_data">
              {cityList?.map((item) => {
                return (
                  <>
                    <div className="check_input_label_div">
                      <input
                        className="college_box_check_input"
                        type="checkbox"
                      />
                      <label className="check_input_label">{item.name}</label>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className="colleges_left_boxes">
            <p className="college_box_heading">Work Mode</p>
            {/*Search */}
            <div>
              <input
                className="college_box_searchbar"
                type="text"
                placeholder="search"
              // onChange={(e) => citySearch(e)}
              />
            </div>
            {/*Checkbox */}
            <div className="box_data">
              {cityList?.map((item) => {
                return (
                  <>
                    <div className="check_input_label_div">
                      <input
                        className="college_box_check_input"
                        type="checkbox"
                      />
                      <label className="check_input_label">{item.name}</label>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className="colleges_left_boxes">
            <p className="college_box_heading">Job Type</p>
            {/*Search */}
            <div>
              <input
                className="college_box_searchbar"
                type="text"
                placeholder="search"
              // onChange={(e) => citySearch(e)}
              />
            </div>
            {/*Checkbox */}
            <div className="box_data">
              {cityList?.map((item) => {
                return (
                  <>
                    <div className="check_input_label_div">
                      <input
                        className="college_box_check_input"
                        type="checkbox"
                      />
                      <label className="check_input_label">{item.name}</label>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className="colleges_left_boxes">
            <p className="college_box_heading">Posted By</p>
            {/*Search */}
            <div>
              <input
                className="college_box_searchbar"
                type="text"
                placeholder="search"
              // onChange={(e) => citySearch(e)}
              />
            </div>
            {/*Checkbox */}
            <div className="box_data">
              {cityList?.map((item) => {
                return (
                  <>
                    <div className="check_input_label_div">
                      <input
                        className="college_box_check_input"
                        type="checkbox"
                      />
                      <label className="check_input_label">{item.name}</label>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className="colleges_left_boxes">
            <p className="college_box_heading">Company Level</p>
            {/*Search */}
            <div>
              <input
                className="college_box_searchbar"
                type="text"
                placeholder="search"
              // onChange={(e) => citySearch(e)}
              />
            </div>
            {/*Checkbox */}
            <div className="box_data">
              {companylevel?.map((item) => {
                return (
                  <div className="check_input_label_div">
                    <input
                      className="college_box_check_input"
                      type="checkbox"
                    />
                    <label className="check_input_label">{item}</label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="colleges_left_boxes">
            <p className="college_box_heading">Nature of Business</p>
            {/*Search */}
            <div>
              <input
                className="college_box_searchbar"
                type="text"
                placeholder="search"
              // onChange={(e) => citySearch(e)}
              />
            </div>
            {/*Checkbox */}
            <div className="box_data">
              {natureOfBuisness?.map((item) => {
                return (
                  <>
                    <div className="check_input_label_div">
                      <input
                        className="college_box_check_input"
                        type="checkbox"
                      />
                      <label className="check_input_label">{item}</label>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className="colleges_left_boxes">
            <p className="college_box_heading">Company Age</p>
            {/*Search */}
            <div>
              <input
                className="college_box_searchbar"
                type="text"
                placeholder="search"
              // onChange={(e) => citySearch(e)}
              />
            </div>
            {/*Checkbox */}
            <div className="box_data">
              {cityList?.map((item) => {
                return (
                  <>
                    <div className="check_input_label_div">
                      <input
                        className="college_box_check_input"
                        type="checkbox"
                      />
                      <label className="check_input_label">{item.name}</label>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className="colleges_left_boxes">
            <p className="college_box_heading">Type of Company</p>
            {/*Search */}
            <div>
              <input
                className="college_box_searchbar"
                type="text"
                placeholder="search"
              // onChange={(e) => citySearch(e)}
              />
            </div>
            {/*Checkbox */}
            <div className="box_data">
              {typeOfCompany?.map((item) => {
                return (
                  <>
                    <div className="check_input_label_div">
                      <input
                        className="college_box_check_input"
                        type="checkbox"
                      />
                      <label className="check_input_label">{item}</label>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </>
      )}

      {dataValue == 1 && (
        <>
          <div className="colleges_left_boxes">
            <p className="college_box_heading">Preparation Level</p>
            {/*Search */}
            <div>
              <input
                className="college_box_searchbar"
                type="text"
                placeholder="search"
                onChange={(e) => stateSearch(e)}
              />
            </div>
            {/*Checkbox */}
            <div className="box_data">
              {prepleveldata?.map((item, index) => {
                return (
                  <div className="check_input_label_div" key={index}>
                    <input
                      className="college_box_check_input"
                      type="checkbox"
                      onChange={() => handleprofessionFilters(item, 'prepLevel')}
                    />
                    <label className="check_input_label">{item}</label>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="colleges_left_boxes">
            <p className="college_box_heading">Eligibility</p>
            {/*Search */}
            <div>
              <input
                className="college_box_searchbar"
                type="text"
                placeholder="search"
                onChange={(e) => stateSearch(e)}
              />
            </div>
            {/*Checkbox */}
            <div className="box_data">
              {courselist?.map((item, index) => {
                return (
                  <div key={index} className="check_input_label_div">
                    <input
                      className="college_box_check_input"
                      type="checkbox"
                      onChange={() => handleprofessionFilters(item?.id, "courseId")}
                    />
                    <label className="check_input_label">{item?.courseName}</label>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="colleges_left_boxes">
            <p className="college_box_heading">Department</p>
            {/*Search */}
            <div>
              <input
                className="college_box_searchbar"
                type="text"
                placeholder="search"
                onChange={(e) => stateSearch(e)}
              />
            </div>
            {/*Checkbox */}
            <div className="box_data">
              {familyCodelist?.map((item, index) => {
                return (
                  <div className="check_input_label_div" key={index}>
                    <input
                      className="college_box_check_input"
                      type="checkbox"
                      onChange={() => handleprofessionFilters(item?.id, 'familyId')}
                    />
                    <label className="check_input_label">{item?.familyName}</label>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="colleges_left_boxes">
            <p className="college_box_heading">Sub Department</p>
            {/*Search */}
            <div>
              <input
                className="college_box_searchbar"
                type="text"
                placeholder="search"
                onChange={(e) => stateSearch(e)}
              />
            </div>
            {/*Checkbox */}
            <div className="box_data">
              {/* {stateList?.map((item) => { */}
              {/* return ( */}
              <>
                <div className="check_input_label_div">
                  <input
                    className="college_box_check_input"
                    type="checkbox"
                  //  onChange={() => handleStateSelect(item.id)}
                  />
                  <label className="check_input_label">hello</label>
                </div>
              </>
              {/* ); */}
              {/* })} */}
            </div>
          </div>

          <div className="colleges_left_boxes">
            <p className="college_box_heading">Industry</p>
            {/*Search */}
            <div>
              <input
                className="college_box_searchbar"
                type="text"
                placeholder="search"
                onChange={(e) => stateSearch(e)}
              />
            </div>
            {/*Checkbox */}
            <div className="box_data">
              {/* {stateList?.map((item) => { */}
              {/* return ( */}
              <>
                <div className="check_input_label_div">
                  <input
                    className="college_box_check_input"
                    type="checkbox"
                  //  onChange={() => handleStateSelect(item.id)}
                  />
                  <label className="check_input_label">hello</label>
                </div>
              </>
              {/* ); */}
              {/* })} */}
            </div>
          </div>
        </>
      )}

      {dataValue == 3 && (
        <>
          <div className="colleges_left_boxes">
            <p className="college_box_heading">State</p>
            {/*Search */}
            <div>
              <input
                className="college_box_searchbar"
                type="text"
                placeholder="search"
                onChange={(e) => stateSearch(e)}
              />
            </div>
            {/*Checkbox */}
            <div className="box_data">
              {stateList?.map((item) => {
                return (
                  <>
                    <div className="check_input_label_div">
                      <input
                        className="college_box_check_input"
                        type="checkbox"
                        name={"stateId"}
                        value={item?.state}
                        onChange={(e) =>
                          handleStateSelect(e, item.id, item.state)
                        }
                        checked={selectedStateCheck("stateId", item?.id)}
                      />
                      <label className="check_input_label">{item?.state}</label>
                    </div>
                  </>
                );
              })}
            </div>
          </div>

          <div className="colleges_left_boxes">
            <p className="college_box_heading">City</p>
            {/*Search */}
            <div>
              <input
                className="college_box_searchbar"
                type="text"
                placeholder="search"
                onChange={(e) => citySearch(e)}
              />
            </div>
            {/*Checkbox */}
            <div className="box_data">
              {cityStateList?.map((item) => {
                return (
                  <>
                    <div className="check_input_label_div">
                      <input
                        className="college_box_check_input"
                        type="checkbox"
                        name="cityId"
                        onChange={(e) =>
                          handleStateSelect(e, item.id, item.name)
                        }
                        checked={selectedStateCheck("cityId", item?.id)}
                      />
                      <label className="check_input_label">{item?.name}</label>
                    </div>
                  </>
                );
              })}
            </div>
          </div>

          <div className="colleges_left_boxes">
            <p className="college_box_heading">Company Level</p>
            {/*Search */}
            <div>
              <input
                className="college_box_searchbar"
                type="text"
                placeholder="search"
                value={searchFilter.companylevel}
                onChange={(e) => handleSearchCompany(e, "companylevel")}
              />
            </div>
            {/*Checkbox */}
            <div className="box_data">
              {filteredSearchlist?.companylevel?.map((item) => {
                return (
                  <>
                    <div className="check_input_label_div">
                      <input
                        className="college_box_check_input"
                        type="checkbox"
                        name="CompanyLevel"
                        onChange={(e) => handleStateSelect(e, item, item)}
                        checked={selectedStateCheck("CompanyLevel", item)}
                      />
                      <label className="check_input_label">{item}</label>
                    </div>
                  </>
                );
              })}
            </div>
          </div>

          <div className="colleges_left_boxes">
            <p className="college_box_heading">Nature of Business</p>
            {/*Search */}
            <div>
              <input
                className="college_box_searchbar"
                type="text"
                placeholder="search"
                value={searchFilter.natureOfBuisness}
                onChange={(e) => handleSearchCompany(e, "natureOfBuisness")}
              />
            </div>
            {/*Checkbox */}
            <div className="box_data">
              {filteredSearchlist?.natureOfBuisness?.map((item, index) => {
                return (
                  <div className="check_input_label_div" key={index}>
                    <input
                      className="college_box_check_input"
                      type="checkbox"
                      name="natureOfBusiness"
                      onChange={(e) => handleStateSelect(e, item, item)}
                      checked={selectedStateCheck("natureOfBusiness", item)}
                    />
                    <label className="check_input_label">{item}</label>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="colleges_left_boxes">
            <p className="college_box_heading">Company Age</p>
            {/*Search */}
            <div>
              <input
                className="college_box_searchbar"
                type="text"
                placeholder="search"
                value={searchFilter.establishedyear}
                onChange={(e) => handleSearchCompany(e, "establishedyear")}
              />
            </div>
            {/*Checkbox */}
            <div className="box_data">
              {filteredSearchlist?.establishedyear?.map((item, index) => {
                return (
                  <>
                    <div className="check_input_label_div" key={index}>
                      <input
                        className="college_box_check_input"
                        type="checkbox"
                        name="establishedYear"
                        onChange={(e) => handleStateSelect(e, item?.value, item?.label)}
                        checked={selectedStateCheck("establishedYear", item?.value)}
                      />
                      <label className="check_input_label">{item?.label}</label>
                    </div>
                  </>
                );
              })}
            </div>
          </div>

          <div className="colleges_left_boxes">
            <p className="college_box_heading">Type of Company</p>
            {/*Search */}
            <div>
              <input
                className="college_box_searchbar"
                type="text"
                placeholder="search"
                value={searchFilter.typeOfCompany}
                onChange={(e) => handleSearchCompany(e, "typeOfCompany")}
              />
            </div>
            {/*Checkbox */}
            <div className="box_data">
              {filteredSearchlist?.typeOfCompany?.map((item, index) => {
                return (
                  <div className="check_input_label_div" key={index}>
                    <input
                      className="college_box_check_input"
                      type="checkbox"
                      name="typeOfCompany"
                      onChange={(e) => handleStateSelect(e, item, item)}
                      checked={selectedStateCheck("typeOfCompany", item)}
                    />
                    <label className="check_input_label">{item}</label>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default OrganisationLeftPage;
