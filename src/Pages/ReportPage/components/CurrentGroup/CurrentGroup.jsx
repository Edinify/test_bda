import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTotalStudentsPaymentsByEachGroup } from "../../../../redux/actions/reportActions";

const CurrentGroup = () => {
  const dispatch = useDispatch();

  const { totalStudentsPayments } = useSelector((state) => state.reportDatas);

  useEffect(() => {
    dispatch(getTotalStudentsPaymentsByEachGroup());
  }, []);

  return (
    <div className="current-group-card">
      <table className="status-list-cards">
        <thead>
          <tr>
            <th>Mövcud qruplar</th>
            <th>Tam ödəniş</th>
            <th>Hissəli ödəniş</th>
            <th>Növ.ayl qalıq</th>
          </tr>
        </thead>
        <tbody>
          {totalStudentsPayments?.map((group, index) => {
            const colors = [
              "#FF8743",
              "#00B69B",
              "#000000",
              "#FF0000",
              "#FF5DA0",
              "#FF9000",
              "#4880FF",
            ];
            const bgColor = colors[index % colors.length];

            return (
              <tr key={group?.groupId}>
                <td style={{ color: bgColor }}>{group?.groupName}</td>
                <td>{group?.totalFullPayments} AZN</td>
                <td>{group?.totalPartPayments} AZN</td>
                <td>{group?.totalNextMonthsPayments} AZN</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CurrentGroup;
