import { useSelector } from "react-redux";
import UpdatesCard from "./UpdatesCard";

const UpdatesData = () => {
  const { allUpdates } = useSelector((state) => state.updatesData);

  console.log(allUpdates, "updates");

  const tableHead = [
    { id: 1, label: "Göndərən" },
    {
      id: 3,
      label: "Göndərilmə tarixi",
    },
    {
      id: 3,
      label: "Yenilənmə tarixi",
    },
    {
      id: 2,
      label: "Status",
    },
    {
      id: 4,
      label: "",
    },
  ];

  return (
    <>
        <table className={`details-table updates   courses-table`}>
          <thead>
            <tr>
              {tableHead.map((head, i) => (
                <th key={i}>{head.label}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {allUpdates?.map((item, i) => (
              <UpdatesCard
                key={item._id}
                data={item}
                mode="desktop"
                cellNumber={i + 1}
              />
            ))}
          </tbody>
        </table>
      </>
  );
};

export default UpdatesData;
