import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCityList } from "../../../redux/actions/location/createCity";
import { getState } from "../../../redux/actions/location/createState";
import { getAllMasterFilter } from "../../../redux/actions/masterfilter/createmasterfilter";
import { getAllExams } from "../../../redux/actions/exams/createExam";

const ExamLeftPage = (props) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectApplicationItem, setSelectedApplication] = useState([]);
  const [selectexammodeItem, setSelectedExammode] = useState([]);
  const [searchData, setSearchData] = useState({ examtype: "", applicationmode: "", exammode: "" })

  const filterData = useSelector(
    (data) => data?.allMasterFilterList?.masterfilterlist?.data?.data
  );

  const examData = useSelector((data) => data?.examList?.examlist?.data?.data);

  const masterfiltertypes = "exammode,applicationmode,examtype";

  const filteredMastertype = {
    examtype: filterData?.examtype?.filter((elem, index) =>
      elem.name.toLowerCase().includes(searchData.examtype.toLowerCase())),

    applicationmode: filterData?.applicationmode?.filter((elem, index) =>
      elem.name.toLowerCase().includes(searchData.applicationmode.toLowerCase())),

    exammode: filterData?.exammode?.filter((elem, index) =>
      elem.name.toLowerCase().includes(searchData.exammode.toLowerCase()))
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getState());
    dispatch(getCityList());
    dispatch(getAllMasterFilter(masterfiltertypes));
  }, []);

  const deleteSelectedfilter = (type, id) => {
    props.setclear({ ...props.clear, [type]: id });
  };

  const handleFilter = (index, item) => {
    if (selectedItems.includes(item.name)) {
      let a = selectedItems.filter((ele) => ele !== item.name);
      setSelectedItems(a);
    } else {
      setSelectedItems([item.name]);
    }
  };

  const handleFilterApplication = (index, item) => {
    if (selectApplicationItem.includes(item.name)) {
      let a = selectApplicationItem.filter((ele) => ele !== item.name);
      setSelectedApplication(a);
    } else {
      setSelectedApplication([item.name]);
    }
  };

  const handleFilterExamination = (index, item) => {
    if (selectexammodeItem.includes(item.name)) {
      let a = selectexammodeItem.filter((ele) => ele !== item.name);
      setSelectedExammode(a);
    } else {
      setSelectedExammode([item.name]);
    }
  };

  const handleSearchMastertype = (e, type) => {
    setSearchData((prev) => ({
      ...prev,
      [type]: e.target.value
    }))
  }

  return (
    <>
      {/* -----------------------master search bar start--------------------- */}
      <div className="profile_search_bar_col hide_box">
        <div className="search_profile_search_bar college_master_search">
          <input
            type="text"
            placeholder="Search by name..."
            className="form-control chat_box_weite_bar"
            onChange={(e) => {
              props?.searchExam(e);
            }}
          />
          <button type="submit">
            <img src="/images/search.png" />
          </button>
        </div>
      </div>

      {/* ----------------------master search bar end----------------------- */}
      <div className="master_heading_manager_div">
        <h3 className="college_left_page_master_heading">
          Found {examData?.count} Exams
        </h3>
        {/* <p
          className="college_left_page_master_text"
          onClick={props?.handleSetDefault}
        >
          Set Default
        </p> */}
      </div>


      {/* ----------------------master filter bar start (selected filter)----------------------- */}

      <div className="colleges_left_boxes">
        <p className="college_box_heading mb-0">Selected Filters</p>
        <div className="selected_filters_subbox">
          {selectedItems &&
            selectedItems?.map((item, index) => {
              return (
                <div className="selected_filters" key={index}>
                  {item}
                  {/* <div className="filter_dot"></div> */}
                </div>
              );
            })}
          {selectApplicationItem &&
            selectApplicationItem?.map((item, index) => {
              return (
                <div className="selected_filters" key={index}>
                  {item}
                  {/* <div className="filter_dot"></div> */}
                </div>
              );
            })}

          {selectexammodeItem &&
            selectexammodeItem?.map((item, index) => {
              return (
                <div className="selected_filters" key={index}>
                  {item}
                  {/* <div className="filter_dot"></div> */}
                </div>
              );
            })}
        </div>
      </div>

      <div className="colleges_left_boxes">
        <p className="college_box_heading">Examination Type</p>
        {/* search for examination type */}
        <div>
          <input
            className="college_box_searchbar"
            type="text"
            placeholder="search"
            value={searchData.examtype}
            onChange={(e) => handleSearchMastertype(e, "examtype")}
          />
        </div>


        <p
          className="college_left_page_master_text mb-0"
          onClick={() => {
            setSelectedItems("");
            let obj = { ...props.clear };
            delete obj.examtype;
            props.setclear(obj);
            dispatch(getAllExams(obj));
          }}
        >
          clear
        </p>
        <form>
          <div className="box_data">
            {filteredMastertype?.examtype &&
              filteredMastertype?.examtype?.map((item, index) => {
                return (
                  <div key={index} className="check_input_label_div">
                    <input
                      className="college_box_check_input"
                      type="radio"
                      name="examTypeId"
                      value="radioo"
                      onChange={(e) => {
                        props.handleFilterSelect(e, item?.id, item);
                        deleteSelectedfilter(item.types, item?.id);
                        handleFilter(index, item);
                      }}
                      checked={props?.clear?.examtype === item?.id}
                    />
                    <label className="check_input_label">{item?.name}</label>
                  </div>
                );
              })}
          </div>
        </form>
      </div>

      <div className="colleges_left_boxes">
        <p className="college_box_heading">Application Mode</p>

        <div>
          <input
            className="college_box_searchbar"
            type="text"
            placeholder="search"
            value={searchData.applicationmode}
            onChange={(e) => handleSearchMastertype(e, "applicationmode")}
          />
        </div>

        <p
          className="college_left_page_master_text mb-0"
          onClick={() => {
            setSelectedApplication("");
            let obj = { ...props.clear };
            delete obj.applicationmode;
            props.setclear(obj);
            dispatch(getAllExams(obj));
          }}
        >
          clear
        </p>
        <div className="box_data">
          {filteredMastertype?.applicationmode &&
            filteredMastertype?.applicationmode?.map((item, index) => {
              return (
                <div key={item?.id} className="check_input_label_div">
                  <input
                    className="college_box_check_input"
                    type="radio"
                    name="applicationModeId"
                    value={item?.id}
                    onChange={(e) => {
                      props.handleFilterSelect(e, item?.id);
                      deleteSelectedfilter(item.types, item?.id);
                      handleFilterApplication(index, item);
                    }}
                    checked={props.clear?.applicationmode === item?.id}
                  />
                  <label className="check_input_label">{item.name}</label>
                </div>
              );
            })}
        </div>
      </div>
      <div className="colleges_left_boxes">
        <p className="college_box_heading">Examination Mode</p>

        <div>
          <input
            className="college_box_searchbar"
            type="text"
            placeholder="search"
            value={searchData.exammode}
            onChange={(e) => handleSearchMastertype(e, "exammode")}
          />
        </div>
        <p
          className="college_left_page_master_text mb-0"
          onClick={() => {
            setSelectedExammode("");
            let obj = { ...props.clear };
            delete obj.exammode;
            props.setclear(obj);
            dispatch(getAllExams(obj));
          }}
        >
          clear
        </p>

        <div className="box_data">
          {filteredMastertype?.exammode &&
            filteredMastertype?.exammode?.map((item, index) => {
              return (
                <div key={item?.id} className="check_input_label_div">
                  <input
                    className="college_box_check_input"
                    type="radio"
                    name="examModeId"
                    value="radioo"
                    onChange={(e) => {
                      props.handleFilterSelect(e, item?.id);
                      deleteSelectedfilter(item.types, item?.id);
                      handleFilterExamination(index, item);
                    }}
                    checked={props?.clear?.exammode === item?.id}
                  />
                  <label className="check_input_label">{item?.name}</label>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default ExamLeftPage;
