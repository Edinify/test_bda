import React from "react";
import { useCustomHook } from "../../../GlobalFunctions/globalFunctions";

const WorkersConfirmModal = ({ workerModalData }) => {
  const { generalProfileList, generalProfilePowerList } = useCustomHook();

  let profiles =
    Array.isArray(workerModalData.profiles) &&
    workerModalData.profiles.length > 0
      ? workerModalData.profiles
          .map((item) => {
            return `${
              generalProfileList.find((profile) => profile.key === item.profile)
                .name
            } - ${
              generalProfilePowerList.find(
                (profile) => profile.key === item.power
              ).name
            }`;
          })
          .join(", ")
      : "boş";
  const dataList1 = [
    { title: "Ad soyad", value: workerModalData?.fullName },
    { title: "Email", value: workerModalData?.email },
    { title: "Doğum tarixi", value: workerModalData?.birthday },
    { title: "Mobil nömrə", value: workerModalData?.phone },
    { title: "Pozisiya", value: workerModalData?.position },
    { title: "Profil", value: profiles },
  ];
  return (
    <>
      <div className="more-modal-header-inform">
        {dataList1.map((item, index) => (
          <h3 key={index}>
            {item?.title}: <span>{item?.value}</span>
          </h3>
        ))}
        {/* <div className="payment">
          {coursesModalData.payments.map((payment) => (
            <div key={payment._id}>
              <h3>
                Ödəniş növü : <span>{payment.paymentType}</span> hissəli
              </h3>
              <h3>
                Ödəniş : <span> {payment.payment}</span> AZN
              </h3>
            </div>
          ))}
        </div> */}
      </div>
    </>
  );
};

export default WorkersConfirmModal;
