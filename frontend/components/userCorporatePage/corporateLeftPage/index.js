import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCityList } from "../../../redux/actions/location/createCity";
import { getState } from "../../../redux/actions/location/createState";
import { getSubCategory } from "../../../redux/actions/corporate/addsubcategory";
import { getMainCategory } from "../../../redux/actions/corporate/addmaincategory";
import { getCorporateData } from "../../../redux/actions/corporate/addcorporate";

const CorporateLeftPage = ({setFiltertitle}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMainCategory());
    dispatch(getSubCategory());
  }, []);

  const subcategoryList = useSelector(
    (state) => state?.corporateSubCategory?.addsubcategory?.rows
  );

  const maincategoryData = useSelector(
    (state) => state?.corporateCategory?.addmaincategory?.rows
  );

  const finalCategoryList = maincategoryData?.map((mainItem, mainIndex) => {
    const filtered = subcategoryList?.filter(
      (subItem, subIndex) => subItem?.mainCategoryId === mainItem?.id
    );

    return { name: mainItem.mainCategory, data: filtered };
  });

  const handlefilterSelect = (e,substreamid,mainstreamid,subcategory,maincategory) => {
    dispatch(getCorporateData({
      "mainCategoryId":mainstreamid,
      "subCategoryId":substreamid
    }))
    setFiltertitle({maincategory:maincategory,subcategory:subcategory})
  }

  return (
    <>
      <div className="profile_search_bar_col hide_box">
        <div className="search_profile_search_bar college_master_search">
          <input
            type="text"
            placeholder="Search by name..."
            className="form-control chat_box_weite_bar"
          // onChange={(e) => {
          //   console.log('ff')
          //   props?.searchExam(e)}}
          />
          <button type="submit">
            <img src="/images/search.png" />
          </button>
        </div>
      </div>

      {finalCategoryList?.length > 0 &&
        finalCategoryList?.map(({ name, data }, index) => {
          return (
            <div key={index} className="colleges_left_boxes">
              <div>
                <p className="college_box_heading">{name}</p>
              </div>
              {data?.map(({ subCategory }, dataIndex) => (
                <div
                  key={`${index}-${dataIndex}`}
                  className="check_input_label_div"
                >
                  <input className="college_box_check_input" name="filters" type="radio" onChange={(e)=>handlefilterSelect(e,data[0]?.id,data[0]?.mainCategoryId,data[0]?.subCategory,data[0]?.MainCategories?.mainCategory)}/>
                  <label className="check_input_label">{subCategory}</label>
                </div>
              ))}
            </div>
          )
        })}
    </>
  );
};

export default CorporateLeftPage;
