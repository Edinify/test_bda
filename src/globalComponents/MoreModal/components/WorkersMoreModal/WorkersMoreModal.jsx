import React from "react";
import { useCustomHook } from "../../../GlobalFunctions/globalFunctions";

const WorkersMoreModal = ({ workerModal }) => {
  const { generalProfileList, generalProfilePowerList } = useCustomHook();
  let profiles =
    Array.isArray(workerModal.profiles) && workerModal.profiles.length > 0
      ? workerModal.profiles
          .map((item) => {
            return `${
              generalProfileList.find((profile) => profile.key === item.profile)
                .name
            } - ${
              generalProfilePowerList.find(
                (profile) => profile.key === item.power
              )?.name
            }`;
          })
          .join(", ")
      : "boş";

  const dataList1 = [
    { title: "Ad soyad", value: workerModal?.fullName },
    { title: "Fin kod", value: workerModal?.fin },
    { title: "Mobil nömrə", value: workerModal?.phone },
    { title: "Email", value: workerModal?.email },
    { title: "Pozisiya", value: workerModal?.position },
    { title: "Profillər", value: profiles },
  ];
  return (
    <>
      <div className="more-modal-header-inform">
        {dataList1.map((item, index) => (
          <h3 key={index}>
            {item.title}: <span>{item.value}</span>
          </h3>
        ))}
      </div>
    </>
  );
};

export default WorkersMoreModal;
