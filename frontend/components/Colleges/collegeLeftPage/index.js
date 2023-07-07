import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourse } from "../../../redux/actions/course/addcourse";
import { cityDropdown, getCityList, searchCity } from "../../../redux/actions/location/createCity";
import {
  getState,
  searchState,
} from "../../../redux/actions/location/createState";
import { getMainStream } from "../../../redux/actions/streams/addMainStreams";
import { useRouter } from "next/router";
import { getColleges } from "../../../redux/actions/college/college";
import { getAllMasterFilter } from "../../../redux/actions/masterfilter/createmasterfilter";
import { getAllExams } from "../../../redux/actions/exams/createExam";
import { refined } from "../../../utils/helper";
import { debounce } from "debounce";

const CollegeLeftPage = (props) => {
  const [apiFilterObject, setApiFilterObject] = useState({});
  const [activeState, setActiveState] = useState([]);
  const [queryFilterObject, setQueryFilterObject] = useState({});
  const [searchFilters, setSearchFilters] = useState({
    programtype: "",
    agency: "",
    affilation: "",
    coursetype: "",
    collegetype: "",
  });

  const router = useRouter();
  const { query } = router;

  const dispatch = useDispatch();

  const stateList = useSelector(
    (state) => state?.stateList?.stateList?.data?.data?.rows
  );

  const cityStateList = useSelector(
    (state) => state?.cityList?.cityList?.data?.result
  );

  const mainstreamList = useSelector(
    (data) => data?.mainStreamList?.mainStreamValue?.data?.data?.rows
  );

  const courseList = useSelector(
    (state) => state?.courseList?.courselist?.data?.rows
  );

  const stateSearch = (e) => {
    let statedata = { search: e.target.value };
    dispatch(searchState(statedata));
  };

  const citySearch = (e) => {
    let citydata = {search : e.target.value}
    dispatch(cityDropdown(citydata))
  }

  const searchMainstream = (e) => {
    let streamdata = { search: e.target.value };
    dispatch(getMainStream(streamdata));
  };
  const searchCourse = (e) => {examlist
    let coursedata = { search: e.target.value };
    dispatch(getCourse(coursedata));
  };

  const searchExam = (e) => {
    let exam = { search: e.target.value };
    dispatch(getAllExams(exam));
  };

  const masterfiltervalues =
    "affilation,collegetype,approvals,agency,courselevel,coursetype,courseplace,coursefeetype,coursecategory,programtype";

  const masterFilterdata = useSelector(
    (data) => data?.allMasterFilterList?.masterfilterlist?.data?.data
  );

  const examlist = useSelector(
    (data) => data?.examList?.examlist?.data?.data?.rows
  );

  const handleSearchfilter = (e, filterCategory) => {
    setSearchFilters((prevFilter) => ({
      ...prevFilter,
      [filterCategory]: e.target.value,
    }));
  };

  const filteredItems = {
    programtype: masterFilterdata?.programtype?.filter((item, index) =>
      item?.name.toLowerCase().includes(searchFilters.programtype.toLowerCase())
    ),

    affilation: masterFilterdata?.affilation?.filter((item) =>
      item?.name.toLowerCase().includes(searchFilters.affilation.toLowerCase())
    ),

    agency: masterFilterdata?.agency?.filter((item, index) =>
      item?.name.toLowerCase().includes(searchFilters.agency.toLowerCase())
    ),

    coursetype: masterFilterdata?.coursetype?.filter((item, index) =>
      item?.name.toLowerCase().includes(searchFilters.coursetype.toLowerCase())
    ),

    collegetype: masterFilterdata?.collegetype?.filter((item, index) =>
      item?.name.toLowerCase().includes(searchFilters.collegetype.toLowerCase())
    ),
  };

  const selectedStateCheck = (name, selectedId) => {
    let isExist = false;
    if (apiFilterObject && selectedId && apiFilterObject[name]) {
      isExist = apiFilterObject[name]?.includes(selectedId);
    }
    return isExist;
  };

  let StringArray = ["courseId"];

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

  const handleFilters = (e, itemId, itemName) => {
    console.log(itemId, itemName, "aasdasdas234234234234")
    const refinedName = refined(itemName);
    const { name, checked } = e.target;

    if (!queryFilterObject[name]) {
      setQueryFilterObject({ ...queryFilterObject, [name]: [refinedName] });
    } else {
      if (queryFilterObject[name].includes(refinedName)) {
        // const updated = queryFilterObject[name].filter(
        //   (ele) => ele !== refinedName
        // );
      } else {
        setQueryFilterObject({
          ...queryFilterObject,
          [name]: [...queryFilterObject[name], refinedName],
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
      dispatch(getColleges(apiFilterObject));
      dispatch(cityDropdown({ stateId: apiFilterObject?.collegeStateId }));
    } else {
      dispatch(getColleges());
      dispatch(cityDropdown());
    }
  }, [JSON.stringify(apiFilterObject)]);

  useEffect(() => {
    dispatch(getAllMasterFilter(masterfiltervalues));
    dispatch(getState());
    dispatch(getMainStream());
    dispatch(getCourse());
    dispatch(getAllExams());
  }, []);

  const handleSearchCollege = debounce((e) => {
    const searchText = e.target.value
    dispatch(getColleges({ search: searchText }))
  }, 500)

  const handleRemoveState =(index) => {
      // let removeItem = [...queryFilterObject.collegeStateId]
      // removeItem.splice(index, 1)
      // setQueryFilterObject(removeItem)
      console.log(index, "czxczxczxczxc12312")
  }


  return (
    <>
      {/* -----------------------master search bar start--------------------- */}
      <div className="profile_search_bar_col hide_box">
        <div className="search_profile_search_bar college_master_search">
          <input
            type="text"
            placeholder="Search by name..."
            onChange={handleSearchCollege}
            className="form-control chat_box_weite_bar"
          />
          <button type="submit">
            <img src="/images/search.png" />
          </button>
        </div>
      </div>

      {/* ----------------------master search bar end----------------------- */}
      <div className="master_heading_manager_div">
        <h3 className="college_left_page_master_heading">
          Found {props.collegelistcount} Colleges
        </h3>
        <p className="college_left_page_master_text">Set Default</p>
      </div>

      {/* ----------------------master filter bar start----------------------- */}

      <div className="colleges_left_boxes">
        <p className="college_box_heading mb-0">Selected Filters</p>
        <div className="selected_filters_subbox">
         {queryFilterObject &&
          queryFilterObject?.collegeStateId?.map((item, index) => {
              return ( 
                <div className="selected_filters" >
                  {item} 
                   <div className="filter_dot"  onClick={handleRemoveState(index)}/>
                </div>
               );
             })} 
              {queryFilterObject &&
          queryFilterObject?.collegeCityId?.map((item, index) => {
              return ( 
                <div className="selected_filters" >
                  {item} 
                  {/* <div className="filter_dot"></div> */}
                </div>
               );
             })} 
              {queryFilterObject &&
          queryFilterObject?.mainStreamId?.map((item, index) => {
              return ( 
                <div className="selected_filters" >
                  {item} 
                  {/* <div className="filter_dot"></div> */}
                </div>
               );
             })} 
              {queryFilterObject &&
          queryFilterObject?.courseId?.map((item, index) => {
              return ( 
                <div className="selected_filters" >
                  {item} 
                  {/* <div className="filter_dot"></div> */}
                </div>
               );
             })} 
              {queryFilterObject &&
          queryFilterObject?.programTypeId?.map((item, index) => {
              return ( 
                <div className="selected_filters" >
                  {item} 
                  {/* <div className="filter_dot"></div> */}
                </div>
               );
             })} 
               {queryFilterObject &&
          queryFilterObject?.chooseAffiliationId
          ?.map((item, index) => {
              return ( 
                <div className="selected_filters" >
                  {item} 
                  {/* <div className="filter_dot"></div> */}
                </div>
               );
             })} 
               {queryFilterObject &&
          queryFilterObject?.collegeAgencyId?.map((item, index) => {
              return ( 
                <div className="selected_filters" >
                  {item} 
                  {/* <div className="filter_dot"></div> */}
                </div>
               );
             })} 
               {queryFilterObject &&
          queryFilterObject?.courseTypeId?.map((item, index) => {
              return ( 
                <div className="selected_filters" >
                  {item} 
                  {/* <div className="filter_dot"></div> */}
                </div>
               );
             })} 
               {queryFilterObject &&
          queryFilterObject?.collegeTypeId?.map((item, index) => {
              return ( 
                <div className="selected_filters" >
                  {item} 
                  {/* <div className="filter_dot"></div> */}
                </div>
               );
             })} 
               {queryFilterObject &&
          queryFilterObject?.chooseExamAcceptedId?.map((item, index) => {
              return ( 
                <div className="selected_filters" >
                  {item} 
                  {/* <div className="filter_dot"></div> */}
                </div>
               );
             })} 
        </div>
      </div>

      {/*............................... STATE.............................. */}

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
          {stateList?.map((item, index) => {
            return (
              <div className="check_input_label_div" key={index}>
                <input
                  className="college_box_check_input"
                  type="checkbox"
                  name="collegeStateId"
                  value={item?.state}
                  onChange={(e) => handleFilters(e, item.id, item.state)}
                  checked={selectedStateCheck("collegeStateId", item?.id)}
                />
                <label className="check_input_label">{item.state}</label>
              </div>
            );
          })}
        </div>
      </div>

      {/*...............................CITY............................. */}

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
          {cityStateList?.map((item, index) => {
            return (
              <div className="check_input_label_div" key={index}>
                <input
                  className="college_box_check_input"
                  type="checkbox"
                  name="collegeCityId"
                  onChange={(e) => handleFilters(e, item.id, item.name)}
                  checked={selectedStateCheck("collegeCityId", item?.id)}
                />
                <label className="check_input_label">{item.name}</label>
              </div>
            );
          })}
        </div>
      </div>

      {/*...............................STREAM........................... */}

      <div className="colleges_left_boxes">
        <p className="college_box_heading">STREAM</p>
        {/*Search */}
        <div>
          <input
            className="college_box_searchbar"
            type="text"
            placeholder="search"
            onChange={(e) => searchMainstream(e)}
          />
        </div>
        {/*Checkbox */}
        <div className="box_data">
          {mainstreamList?.map((item, index) => {
            return (
              <div className="check_input_label_div" key={index}>
                <input
                  className="college_box_check_input"
                  type="checkbox"
                  name="mainStreamId"
                  onChange={(e) => handleFilters(e, item.id, item.mainStreamName)}
                  checked={selectedStateCheck("mainStreamId", item?.id)}
                />
                <label className="check_input_label">
                  {item?.mainStreamName}
                </label>
              </div>
            );
          })}
        </div>
      </div>

      {/*...............................Course........................... */}

      <div className="colleges_left_boxes">
        <p className="college_box_heading">Course</p>

        {/*Search */}
        <div>
          <input
            className="college_box_searchbar"
            type="text"
            placeholder="search"
            onChange={(e) => searchCourse(e)}
          />
        </div>

        {/*Checkbox */}
        <div className="box_data">
          {courseList?.map((item, index) => {
            return (
              <div className="check_input_label_div" key={index}>
                <input
                  className="college_box_check_input"
                  type="checkbox"
                  name="courseId"
                  onChange={(e) =>
                    handleFilters(e, item.courseName, item.courseName)
                  }
                  checked={selectedStateCheck("courseId", item.courseName)}
                />
                <label className="check_input_label">{item?.courseName}</label>
              </div>
            );
          })}
        </div>
      </div>

      {/*....................................Program Type...................................*/}

      <div className="colleges_left_boxes">
        <p className="college_box_heading">Program Type</p>

        {/*Search */}
        <div>
          <input
            className="college_box_searchbar"
            type="text"
            placeholder="search"
            value={searchFilters.programtype}
            onChange={(e) => handleSearchfilter(e, "programtype")}
          />
        </div>

        {/*Checkbox */}
        <div className="box_data">
          {filteredItems &&
            filteredItems?.programtype?.map((item, index) => {
              return (
                <div className="check_input_label_div" key={index}>
                  <input
                    className="college_box_check_input"
                    type="checkbox"
                    name="programTypeId"
                    onChange={(e) => handleFilters(e, item.id, item.name)}
                    checked={selectedStateCheck("programTypeId", item?.id)}
                  />
                  <label className="check_input_label">{item.name}</label>
                </div>
              );
            })}
        </div>
      </div>

      {/*.....................................Affiliation..................................... */}

      <div className="colleges_left_boxes">
        <p className="college_box_heading">Affiliation</p>

        {/*Search */}
        <div>
          <input
            className="college_box_searchbar"
            type="text"
            value={searchFilters.affilation}
            placeholder="search"
            onChange={(e) => handleSearchfilter(e, "affilation")}
          />
        </div>

        {/*Checkbox */}
        <div className="box_data">
          {filteredItems &&
            filteredItems?.affilation?.map((item, index) => {
              return (
                <div className="check_input_label_div" key={index}>
                  <input
                    className="college_box_check_input"
                    type="checkbox"
                    name="chooseAffiliationId"
                    onChange={(e) => handleFilters(e, item.id, item.name)}
                    checked={selectedStateCheck(
                      "chooseAffiliationId",
                      item?.id
                    )}
                  />

                  <label className="check_input_label">{item.name}</label>
                </div>
              );
            })}
        </div>
      </div>

      <div className="colleges_left_boxes">
        <p className="college_box_heading">Agency</p>

        {/*Search */}
        <div>
          <input
            className="college_box_searchbar"
            type="text"
            value={searchFilters.agency}
            placeholder="search"
            onChange={(e) => handleSearchfilter(e, "agency")}
          />
        </div>

        {/*Checkbox */}
        <div className="box_data">
          {filteredItems &&
            filteredItems?.agency?.map((item, index) => {
              return (
                <div className="check_input_label_div" key={index}>
                  <input
                    className="college_box_check_input"
                    type="checkbox"
                    name="collegeAgencyId"
                    onChange={(e) => handleFilters(e, item.id, item.name)}
                    checked={selectedStateCheck("collegeAgencyId", item?.id)}
                  />
                  <label className="check_input_label">{item.name}</label>
                </div>
              );
            })}
        </div>
      </div>

      <div className="colleges_left_boxes">
        <p className="college_box_heading">Course Type</p>

        {/*Search */}
        <div>
          <input
            className="college_box_searchbar"
            type="text"
            placeholder="search"
            value={searchFilters.coursetype}
            onChange={(e) => handleSearchfilter(e, "coursetype")}
          />
        </div>

        {/*Checkbox */}
        <div className="box_data">
          {filteredItems &&
            filteredItems?.coursetype?.map((item, index) => {
              return (
                <div className="check_input_label_div" key={index}>
                  <input
                    className="college_box_check_input"
                    type="checkbox"
                    name="courseTypeId"
                    onChange={(e) => handleFilters(e, item.id, item.name)}
                    checked={selectedStateCheck("courseTypeId", item?.id)}
                  />
                  <label className="check_input_label">{item.name}</label>
                </div>
              );
            })}
        </div>
      </div>

      <div className="colleges_left_boxes">
        <p className="college_box_heading">Type of College</p>

        {/*Search */}
        <div>
          <input
            className="college_box_searchbar"
            type="text"
            placeholder="search"
            value={searchFilters.collegetype}
            onChange={(e) => handleSearchfilter(e, "collegetype")}
          />
        </div>

        {/*Checkbox */}
        <div className="box_data">
          {filteredItems &&
            filteredItems?.collegetype?.map((item, index) => {
              return (
                <div className="check_input_label_div" key={index}>
                  <input
                    className="college_box_check_input"
                    type="checkbox"
                    name="collegeTypeId"
                    onChange={(e) => handleFilters(e, item.id, item.name)}
                    checked={selectedStateCheck("collegeTypeId", item?.id)}
                  />
                  <label className="check_input_label">{item.name}</label>
                </div>
              );
            })}
        </div>
      </div>

      <div className="colleges_left_boxes">
        <p className="college_box_heading">Entrance/Exam Accepted</p>

        {/*Search */}
        <div>
          <input
            className="college_box_searchbar"
            type="text"
            placeholder="search"
            onChange={(e) => searchExam(e)}
          />
        </div>

        {/*Checkbox */}
        <div className="box_data">
          {examlist?.map((item, index) => {
            return (
              <div className="check_input_label_div" key={index}>
                <input
                  className="college_box_check_input"
                  type="checkbox"
                  name="chooseExamAcceptedId"
                  onChange={(e) => handleFilters(e, item?.id, item?.examName)}
                  checked={selectedStateCheck("chooseExamAcceptedId", item?.id)}
                />
                <label className="check_input_label">{item?.examName}</label>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CollegeLeftPage;
