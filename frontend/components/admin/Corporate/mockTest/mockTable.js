import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Button, Col, Row, Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllExams } from "../../../../redux/actions/exams/createExam";
import {
  deleteMocktestCorporate,
  getMockTestCorporatelist,
} from "../../../../redux/actions/corporate/addmocktestcorporate";

function MockTable() {
  const router = useRouter();
  const dispatch = useDispatch();

  const mocktestlistData = useSelector(
    (state) => state?.corporateMocktest?.mocktestcorporatelist?.rows
  );

  useEffect(() => {
    dispatch(getAllExams());
  }, []);

  const tableHeading = [
    "No.",
    "Main Category",
    "Sub-Category",
    "Topic",
    "Sub Topic",
    "T.Questions",
    "Likes",
    "Attempts",
    "Date",
    "Action",
  ];

  const handleDelete = (item) => {
    dispatch(deleteMocktestCorporate(item?.id)).then((res) => {
      if (res?.payload?.data?.success) {
        dispatch(getMockTestCorporatelist());
      }
    });
  };

  const handleEdit = (item) => {
    router.push(`/admin/corporate/mocktest/update/${item.id}`);
  };

  useEffect(() => {
    dispatch(getMockTestCorporatelist());
  }, []);

  return (
    <>
      <div>
        <Table responsive className="admin_table" bordered hover>
          <thead>
            <tr>
              {tableHeading &&
                tableHeading?.map((i, index) => {
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
            {mocktestlistData &&
              mocktestlistData?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="text-center admin_table_data">
                      {index + 1}
                    </td>
                    <td className="text-center admin_table_data">
                      {item?.MainCategory.mainCategory}
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
                      {item?.totalQuestions}
                    </td>
                    <td className="text-center admin_table_data">{"190"}</td>
                    <td className="text-center admin_table_data">{"190"}</td>
                    <td className="text-center admin_table_data">
                      {"02-1-2023"}
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
              })}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default MockTable;
