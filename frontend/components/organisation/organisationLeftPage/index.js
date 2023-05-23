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

function OrganisationLeftPage({ dataValue }, props) {
  // const [selectId, setSelectId] = useState([]);
  const [apiFilterObject, setApiFilterObject] = useState({});
  const [searchValue, setSearchValue] = useState();
  const [activeState, setActiveState] = useState([]);
  const router = useRouter();
  const { query } = router;

  const stateList = useSelector(
    (data) => data?.stateList?.stateList?.data?.data?.rows
  );
  var cityList = useSelector(
    (city) => city?.cityList?.cityList?.data?.data?.rows
  );

  const cityStateList = useSelector(
    (state) => state?.cityList?.cityList?.data?.result
  );

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
  }, [JSON.stringify(query)]);

  const handleStateSelect = (e, itemId, itemName) => {
    const { name, checked } = e.target;

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
    // const refinedName = refined(itemName);
    // if (selectId.includes(id)) {
    //   let temp = [...selectId];
    //   let a = temp.filter((ele) => ele !== id);
    //   setSelectId(a);
    //   if (a.length === 0) {
    //     dispatch(cityDropdown());
    //   }

    // } else {
    //   let temp = [...selectId];
    //   temp.push(id);
    //   setSelectId(temp);
    //   dispatch(cityDropdown({ stateId: temp }));
    // }
  };

  const companyAge = [
    
      {
        value: [1900, 1910],
        key: "1900 - 1910",
      },
      {
        value: [1910, 1920],
        key: "1910 - 1920",
      },
      {
        value: [1920, 1930],
        key: "1920 - 1930",
      },
      {
        value: [1930, 1940],
        key: "1930 - 1940",
      },
      {
        value: [1940, 1950],
        key: "1940 - 1950",
      },
      {
        value: [1950, 1960],
        key: "1950 - 1960",
      },
      {
        value: [1960, 1970],
        key: "1960 - 1970",
      },
      {
        value: [1970, 1980],
        key: "1970 - 1980",
      },
      {
        value: [1980, 1990],
        key: "1980 - 1990",
      },
      {
        value: [1990, 2000],
        key: "1990 - 2000",
      },
  
  ];

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

  const stateSearch = (e) => {
    let data = { search: e.target.value };
    dispatch(searchState(data));
  };

  const citySearch = (e) => {
    let data = { search: e.target.value };
    dispatch(searchCity(data));
  };

  const companylevelSearch = (e) => {
    let data = { search: e.target.value };
    dispatch();
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getState());
    // dispatch(getCityList());
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
        <h3 className="college_left_page_master_heading">Found 33 Companies</h3>
        <p className="college_left_page_master_text">Set Default</p>
      </div>

      {/* ----------------------master filter bar start----------------------- */}

      <div className="colleges_left_boxes">
        <p className="college_box_heading">Selected Filters</p>
        <div className="selected_filters_subbox">
          <div className="selected_filters">
            hello <div className="filter_dot"></div>
          </div>
          <div className="selected_filters">
            notification <div className="filter_dot"></div>
          </div>
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
                        onChange={(e) =>
                          props.handleFilters(
                            item,
                            e.target.name,
                            e.target.checked
                          )
                        }
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
            <p className="college_box_heading">Eligibility</p>
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
            <p className="college_box_heading">Department</p>
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
            <p className="college_box_heading">Sub Department</p>
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
            <p className="college_box_heading">Work Mode</p>
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
            <p className="college_box_heading">Job Type</p>
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
            <p className="college_box_heading">Posted By</p>
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
            <p className="college_box_heading">Company Level</p>
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
                onChange={(e) => citySearch(e)}
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
            <p className="college_box_heading">Type of Company</p>
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
            {/* <div>
              <input
                className="college_box_searchbar"
                type="text"
                placeholder="search"
                onChange={(e) => citySearch(e)}
              />
            </div> */}
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
                onChange={(e) => companylevelSearch(e)}
              />
            </div>
            {/*Checkbox */}
            <div className="box_data">
              {companylevel?.map((item) => {
                return (
                  <>
                    <div className="check_input_label_div">
                      <input
                        className="college_box_check_input"
                        type="checkbox"
                        name="CompanyLevel"
                        onChange={(e) => handleStateSelect(e, item)}
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
                onChange={(e) => stateSearch(e)}
              />
            </div>
            {/*Checkbox */}
            <div className="box_data">
              {natureOfBuisness?.map((item, index) => {
                return (
                  <div className="check_input_label_div" key={index}>
                    <input
                      className="college_box_check_input"
                      type="checkbox"
                      name="natureOfBusiness"
                      onChange={(e) => handleStateSelect(e, item.id, item)}
                      checked={selectedStateCheck("natureOfBusiness", item)}
                    />
                    <label className="check_input_label">{item}</label>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="colleges_left_boxes">
            <p className="college_box_heading">Established Year</p>
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
              {companyAge?.map((item) => {
                console.log(item ,"dfgdfgd21323123")
                return (
                  <>
                    <div className="check_input_label_div">
                      <input
                        className="college_box_check_input"
                        type="checkbox"
                        name="establishedYear"
                        onChange={(e) => handleStateSelect(e, item.value)}
                        checked={selectedStateCheck("establishedYear", item.key)}
                      />
                      <label className="check_input_label">{item.key}</label>
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
                onChange={(e) => stateSearch(e)}
              />
            </div>
            {/*Checkbox */}
            <div className="box_data">
              {typeOfCompany?.map((item, index) => {
                return (
                  <div className="check_input_label_div" key={index}>
                    <input
                      className="college_box_check_input"
                      type="checkbox"
                      name="typeOfCompany"
                      onChange={(e) => handleStateSelect(e, item)}
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
