import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWaitingGroupsWithStudentsCount } from "../../../../redux/actions/reportActions";
import moment from "moment";
import "moment/locale/az";
const Groups = () => {
  const dispatch = useDispatch();
  const { waitinGroupsWithStudentsCount } = useSelector(
    (state) => state.reportDatas
  );

  useEffect(() => {
    dispatch(getWaitingGroupsWithStudentsCount());
  }, []);

  return (
    <div className="report-groups">
      <div className="group-header">
        <h2>Yığılan qruplar</h2>
      </div>
      <div className="group-cards">
        {waitinGroupsWithStudentsCount?.map((group, i) => (
          <div key={i} className="group-card">
            <span>
              {group?.createdAt
                ? moment(group?.createdAt).locale("az").format("DD MMMM YYYY")
                : "-"}
            </span>
            <span>{group.name}</span>
            <span>{group.studentsCount} tələbə</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Groups;
