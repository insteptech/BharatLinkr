import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterMainstreamCourse,
  getCourse,
  searchCourse,
} from "../../../redux/actions/course/addcourse";
import { toast } from "react-toastify";
import { getMainStream } from "../../../redux/actions/streams/addMainStreams";
import { debounce } from "debounce";

const CourseLeftPage = (props) => {
  const { show, setShow } = props;
  const dispatch = useDispatch();

  const [filteredId, setFilteredId] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const courseList = useSelector(
    (data) => data?.courseList?.courselist?.data
  );

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }
  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);

  useEffect(() => {
    if (filteredId.length > 0) {
      dispatch(filterMainstreamCourse({ mainStreamId: filteredId }));
      setShow(true);
    } else {
      if (dimensions.width > 990, dimensions.height > 660) {
        setShow(null);
      }
    }
  }, [JSON.stringify(filteredId)]);

  const handleStateSelect = (item, itemDetails) => {
    if (selectedItems.includes(itemDetails.mainStreamName)) {
      let a = selectedItems.filter((ele) => ele !== itemDetails.mainStreamName);
      setSelectedItems(a);
    } else {
      setSelectedItems([...selectedItems, itemDetails.mainStreamName]);
    }

    if (filteredId.includes(item)) {
      let x = filteredId.filter((filterID) => filterID !== item);
      setFilteredId(x);
    } else {
      let x = [...filteredId, item];
      setFilteredId(x);
    }
  };

  const mainStreamData = useSelector(
    (state) => state?.courseList?.mainStreamList?.data?.data?.rows
  );

  useEffect(() => {
    dispatch(getMainStream());
  }, []);

  const searchCourseList = useSelector(
    (state) => state?.courseList?.searchCourseList?.data?.data?.rows
  );

  const courseData = useSelector(
    (state) => state?.courseList?.courselist?.data?.rows
  );

  const handleSubmit = (e) => {
    // e.preventDefault();
    // if (searchCourseData === "") {
    //   toast.info("Search field is empty", { autoClose: 1000 });
    // } else {
    //   dispatch(
    //     searchCourse({
    //       search: searchCourseData,
    //     })
    //   );
    //   setShow(true);
    // }
  };

  return (
    <>
      {/* -----------------------master search bar start--------------------- */}
      <form onSubmit={handleSubmit}>
        <div className="profile_search_bar_col hide_box">
          <div className="search_profile_search_bar college_master_search">
            <input
              type="text"
              placeholder="Search by name..."
              onChange={debounce((e) => {
                dispatch(
                  getCourse({
                    search: e.target.value,
                  })
                );
              }, 600)}
              className="form-control chat_box_weite_bar"
            />
            <button type="submit">
              <img src="/images/search.png" />
            </button>
          </div>
        </div>
      </form>

      {/* ----------------------master search bar end----------------------- */}
      <div className="master_heading_manager_div">
        <h3 className="college_left_page_master_heading">Found {courseList?.count} Courses</h3>
        <p className="college_left_page_master_text">Set Default</p>
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
                  {/* <div className="filter_dot" onClick={() => handleSelectedFilterDelete(item, index)}></div> */}
                </div>
              );
            })}
        </div>
      </div>

      {/* ----------------------master filter bar start----------------------- */}

      <div className="colleges_left_boxes">
        <p className="college_box_heading">Trending Courses</p>
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

      <div className="colleges_left_boxes">
        <p className="college_box_heading">Choose By Your DREAM</p>
        <div className="course_box_data">
          {mainStreamData &&
            mainStreamData.map((listItem, listIndex) => {
              let count = 0;
              courseList?.rows?.map((item) => {
                if (item?.mainStreamId === listItem?.id) {
                  count++;
                }
              });
              return (
                <div className="check_input_label_div" key={listIndex}>
                  <input
                    className="college_box_check_input"
                    type="checkbox"
                    onChange={() => handleStateSelect(listItem.id, listItem)}
                  />
                  <label className="check_input_label">
                    {listItem?.mainStreamName}- {`${count}`}
                  </label>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default CourseLeftPage;
