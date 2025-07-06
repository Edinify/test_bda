import { useSelector } from "react-redux";

const StudentStatus = ({ updateModalState, modalData }) => {
  const { user } = useSelector((state) => state.user);

  const confirmedStatusList = [
    { status: 1, label: "İştirak etdim" },
    { status: -1, label: "İştirak etmədim" },
  ];

  const handleStatusClick = (status) => {
    const payload = modalData?.students?.map((item) =>
      item.student._id === user._id
        ? { ...item, studentSignature: status }
        : item
    );

    updateModalState("students", payload);
  };

  console.log(modalData, "modal data in status");
  return (
    <>
      <div className="modal-select">
        <ul>
          {confirmedStatusList.map((item, i) => (
            <li
              key={i}
              className={
                modalData?.students?.find(
                  (item) => item.student._id === user._id
                )?.studentSignature === item.status
                  ? "active"
                  : ""
              }
              onClick={() => handleStatusClick(item.status)}
              id={item.status}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default StudentStatus;
