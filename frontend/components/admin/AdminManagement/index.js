import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";

function AdminManagementTable() {
  const json = [
    {
      DisplayName: "Sub Admin",
      key: "SubAdmin",
      data: "",
      className: "",
    },
    {
      DisplayName: "Account Admin",
      key: "accountAdmin",
      data: "",
      className: "",
    },
  ];
  const [active, setActive] = useState("SubAdmin");
  const [activeTab, setActiveTab] = useState(json[0]);
  const [dataValue, setDataValue] = useState(0);
  const subAdminHeading = ['No.', 'UserType', 'Name', 'Email', 'Contact', 'Category', 'Sub Category', 'Field', 'Action', 'Usename', 'Password']
  const subAdminData = [
    {
      usertype: 'Student',
      name: 'Abhishek',
      email: 'a@gmail.com',
      contact: '1234567890',
      category: 'Corporate',
      subcategory: 'Study Goals',
      Field: 'Reasoning',
      username: '1@gmail.com',
      password:'1234'
    },
    {
      usertype: 'Student',
      name: 'Abhishek',
      email: 'a@gmail.com',
      contact: '1234567890',
      category: 'Corporate',
      subcategory: 'Study Goals',
      Field: 'Reasoning',
      username: '1@gmail.com',
      password:'1234'
    },
    {
      usertype: 'Student',
      name: 'Abhishek',
      email: 'a@gmail.com',
      contact: '1234567890',
      category: 'Corporate',
      subcategory: 'Study Goals',
      Field: 'Reasoning',
      username: '1@gmail.com',
      password:'1234'
    },
    {
      usertype: 'Student',
      name: 'Abhishek',
      email: 'a@gmail.com',
      contact: '1234567890',
      category: 'Corporate',
      subcategory: 'Study Goals',
      Field: 'Reasoning',
      username: '1@gmail.com',
      password:'1234'
    },
    {
      usertype: 'Student',
      name: 'Abhishek',
      email: 'a@gmail.com',
      contact: '1234567890',
      category: 'Corporate',
      subcategory: 'Study Goals',
      Field: 'Reasoning',
      username: '1@gmail.com',
      password:'1234'
    },
  ]
  const accountAdminHeading = ['No.', 'UserType', 'Name', 'Email', 'Contact', 'Entity Type', 'Entity Name', 'Sub Entity', 'Action', 'Usename', 'Password']
  const accountAdminData = [
      {
        usertype: 'Student',
        name: 'Abhishek',
        email: 'a@gmail.com',
        contact: '1234567890',
        entitytype: 'College',
        entityname: 'Chandigarh University',
        subentity: 'Associate Course',
        username: '1@gmail.com',
        password:'1234'
      },
      {
        usertype: 'Student',
        name: 'Abhishek',
        email: 'a@gmail.com',
        contact: '1234567890',
        entitytype: 'College',
        entityname: 'Chandigarh University',
        subentity: 'Associate Course',
        username: '1@gmail.com',
        password:'1234'
      },
      {
        usertype: 'Student',
        name: 'Abhishek',
        email: 'a@gmail.com',
        contact: '1234567890',
        entitytype: 'College',
        entityname: 'Chandigarh University',
        subentity: 'Associate Course',
        username: '1@gmail.com',
        password:'1234'
      },
      {
        usertype: 'Student',
        name: 'Abhishek',
        email: 'a@gmail.com',
        contact: '1234567890',
        entitytype: 'College',
        entityname: 'Chandigarh University',
        subentity: 'Associate Course',
        username: '1@gmail.com',
        password:'1234'
      },
      {
        usertype: 'Student',
        name: 'Abhishek',
        email: 'a@gmail.com',
        contact: '1234567890',
        entitytype: 'College',
        entityname: 'Chandigarh University',
        subentity: 'Associate Course',
        username: '1@gmail.com',
        password:'1234'
      },
      {
        usertype: 'Student',
        name: 'Abhishek',
        email: 'a@gmail.com',
        contact: '1234567890',
        entitytype: 'College',
        entityname: 'Chandigarh University',
        subentity: 'Associate Course',
        username: '1@gmail.com',
        password:'1234'
      },
      {
        usertype: 'Student',
        name: 'Abhishek',
        email: 'a@gmail.com',
        contact: '1234567890',
        entitytype: 'College',
        entityname: 'Chandigarh University',
        subentity: 'Associate Course',
        username: '1@gmail.com',
        password:'1234'
      },
      {
        usertype: 'Student',
        name: 'Abhishek',
        email: 'a@gmail.com',
        contact: '1234567890',
        entitytype: 'College',
        entityname: 'Chandigarh University',
        subentity: 'Associate Course',
        username: '1@gmail.com',
        password:'1234'
      },
  ]
  const handleTab = (key, index) => {
    console.log(activeTab, "key");
    setActive(key);
    setActiveTab(json.find((ele) => ele.key === active));
    // setData(tableData[key]);
    setDataValue(index);
  };
  const router = useRouter();
  return (
    <>
      <div className="admin_home_tabs_row admin_home_tabs_row_padding bottom_border_mobile">
        <Row>
          <Col xl={6} lg={12} md={12} className="p-0">
            <div className="d-flex table_heading_header_sub_admin p-0">
              <ul className="nav tabs_scroll">
                {json &&
                  json?.map((steps, stepsIndex) => (
                    <li className="nav-item" key={stepsIndex}>
                      <a
                        className={`nav-link admin_tabs_name ${
                          dataValue === stepsIndex && "head-active"
                        }`}
                        active={true}
                        onClick={() => handleTab(steps.key, stepsIndex)}
                      >
                        {steps.DisplayName}
                      </a>
                    </li>
                  ))}
              </ul>
              <div className="enteries_input location_enteries hide_entery">
                <h6 className="enteries_input_label">Show Enteries</h6>
                <Form.Select aria-label="Default select example">
                  <option>10</option>
                  <option value="1">3</option>
                  <option value="2">5</option>
                  <option value="3">8</option>
                </Form.Select>
              </div>
            </div>
          </Col>
          {/* ---------------------------------------mobile-screen------------------------------- */}
          <Col lg={12} md={12} className="show_enteries_mobile p-0">
            <div className="enteries_input_sub_admin enteries_input location_enteries">
              <h6 className="enteries_input_label">Show Enteries</h6>
              <Form.Select aria-label="Default select example">
                <option>10</option>
                <option value="1">3</option>
                <option value="2">5</option>
                <option value="3">8</option>
              </Form.Select>
            </div>
          </Col>
          {/* ------------------------------------------end-------------------------------------- */}
          <Col xl={6} lg={12} md={12} className="text-end p-0 download_btn_set">
            {active === "SubAdmin" && (
              <div>
                <Button className="border_btn">Download CSV</Button>
                <Button
                  className="border_btn green"
                  onClick={() => router.push("adminmanagement/addsubadmin")}
                >
                  Add New
                </Button>
              </div>
            )}
            {active === "CollegeAdmin" && (
              <div>
                <Button className="border_btn">Download CSV</Button>
                <Button
                  className="border_btn green"
                  onClick={() => router.push("adminmanagement/addcollegeadmin")}
                >
                  Add New
                </Button>
              </div>
            )}
          </Col>
        </Row>
      </div>
      {active === "SubAdmin" && 
      <Table responsive className="admin_table" bordered hover>
      <thead>
        <tr>
          {subAdminHeading.map((hd, index) => {
            return (
              <th className="table_head" key={index}>
                {hd}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {subAdminData && subAdminData?.map((item, index) => {
          return (
            <tr key={index}>
              <td className="text-center admin_table_data">{index + 1}</td>
              <td className="text-center admin_table_data">{item.usertype}</td>
              <td className="text-center admin_table_data">{item.name}</td>
              <td className="text-center admin_table_data">{item.email}</td>
              <td className="text-center admin_table_data">{item.contact}</td>
              <td className="text-center admin_table_data">{item.category}</td>
              <td className="text-center admin_table_data">{item.subcategory}</td>
              <td className="text-center admin_table_data">{item.Field}</td>
              <td className="text-center admin_table_data">
                <img
                  className="mx-1 admin_table_action_icon"
                  src="/images/edit-icon-blue.png"
                  onClick={() => handleEdit(item)}
                />
                <img
                  className="mx-1 admin_table_action_icon"
                  src="/images/delete-icon-blue.png"
                  onClick={() => {
                    setModalShow(true)
                    setDeleteItem(item)
                  }}
                />
              </td>
                  <td className="text-center admin_table_data">{item.username}</td>
                  <td className="text-center admin_table_data">{item.password}</td>
            </tr>
          )
        })}
      </tbody>
    </Table>
      }
      {active === "accountAdmin" && 
      <Table responsive className="admin_table" bordered hover>
      <thead>
        <tr>
          {accountAdminHeading.map((hd, index) => {
            return (
              <th className="table_head" key={index}>
                {hd}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {accountAdminData && accountAdminData?.map((item, index) => {
          return (
            <tr key={index}>
              <td className="text-center admin_table_data">{index + 1}</td>
              <td className="text-center admin_table_data">{item.usertype}</td>
              <td className="text-center admin_table_data">{item.name}</td>
              <td className="text-center admin_table_data">{item.email}</td>
              <td className="text-center admin_table_data">{item.contact}</td>
              <td className="text-center admin_table_data">{item.entitytype}</td>
              <td className="text-center admin_table_data">{item.entityname}</td>
              <td className="text-center admin_table_data">{item.subentity}</td>
              <td className="text-center admin_table_data">
                <img
                  className="mx-1 admin_table_action_icon"
                  src="/images/edit-icon-blue.png"
                  onClick={() => handleEdit(item)}
                />
                <img
                  className="mx-1 admin_table_action_icon"
                  src="/images/delete-icon-blue.png"
                  onClick={() => {
                    setModalShow(true)
                    setDeleteItem(item)
                  }}
                />
              </td>
              <td className="text-center admin_table_data">{item.username}</td>
              <td className="text-center admin_table_data">{item.password}</td>
            </tr>
          )
        })}
      </tbody>
    </Table>
      }
    </>
  );
}

export default AdminManagementTable;
