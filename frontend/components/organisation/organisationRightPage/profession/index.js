import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { professionlist } from "../../../../redux/actions/organisation/profession";

const Profession = (props) => {
  const router = useRouter();
  const dispatch = useDispatch()

  const professionList = useSelector((state) => state?.sectorData?.professionList?.rows)
  const porfessionListCount =

    useEffect(() => {
      dispatch(professionlist())
    }, [])

  return (
    <div className="mt-3">
      <Table responsive className="admin_table" bordered hover>
        <thead>
          <tr className="table_head blue_and_white">
            <th>Prep Level</th>
            <th>Code</th>
            <th>Occupation</th>
          </tr>
        </thead>
        <tbody>
          {professionList && professionList?.length > 0 &&
            professionList?.map((item, index) => {
              return (
                <tr key={index}>
                  <td className="text-center admin_table_data">
                    {item?.prepLevel}
                  </td>
                  <td className="text-center admin_table_data">
                    {
                      item?.ProfessionCode ?
                        <>
                          {`${item?.ProfessionCode?.FamilyCode?.familyCode}.${item?.ProfessionCode?.professionCode}`}
                        </>
                        :
                        <>
                          {`${item?.FamilyCode?.familyCode}.0000`}
                        </>
                    }
                  </td>
                  <td
                    onClick={() => router.push(`/organisation/profession/summary/${item?.id}`)}
                    className="text-center admin_table_data profession_link"
                  >
                    {
                      item?.ProfessionCode ?
                        <>
                        {`${item?.ProfessionCode?.professionName}`}
                        </>
                        :
                        <>
                        {`${item?.FamilyCode?.familyName}`}
                        </>
                    }
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default Profession;
