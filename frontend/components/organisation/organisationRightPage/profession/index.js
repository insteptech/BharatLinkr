import { useRouter } from "next/router";
import React from "react";
import { Table } from "react-bootstrap";

const professionData = [
  {
    level: 2,
    code: "11-121.09",
    occupation: "chief Executive",
    path: "/organisation/profession/summary",
  },
  {
    level: 5,
    code: "11-432.09",
    occupation: "salse Managers",
  },
  {
    level: 8,
    code: "11-111.45",
    occupation: "security Managers",
  },
  {
    level: 3,
    code: "11-545.00",
    occupation: "chief Executive",
  },
];

const Profession = (props) => {
 
  
  const router = useRouter();
  return (
    <div>
      <Table responsive className="admin_table" bordered hover>
        <thead>
          <tr className="table_head blue_and_white">
            <th>Prep Level</th>
            <th>Code</th>
            <th>Occupation</th>
          </tr>
        </thead>
        <tbody>
          {professionData &&
            professionData?.map((item) => {
              return (
                <>
                  <tr key={item.id}>
                    <td className="text-center admin_table_data">
                      {item.level}
                    </td>
                    <td className="text-center admin_table_data">
                      {item.code}
                    </td>
                    <td
                      onClick={() => router.push(item.path)}
                      className="text-center admin_table_data profession_link"
                    >
                      {item.occupation}
                    </td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default Profession;
