import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import LoadingBtn from "../../../Loading/components/LoadingBtn/LoadingBtn";
import {
  cancelCourseChangesAction,
  confirmCourseChangesAction,
} from "../../../../redux/actions/coursesActions";

const CoursesConfirmModal = ({}) => {
  const { coursesModalData, coursesModalLoading } = useSelector(
    (state) => state.coursesModal
  );

  const beforeDataList = [{ title: "Fənn adı", value: coursesModalData?.name }];
  const newDataList = [
    { title: "Fənn adı", value: coursesModalData?.changes?.name },
  ];
  const [btns, setBtns] = useState(true);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.role === "worker") {
      const power = user?.profiles?.find(
        (item) => item.profile === "courses"
      )?.power;

      if (power === "update") {
        setBtns(false);
      }
    }
  });
  return (
    <>
      {(!coursesModalData?.changes?._id && (
        <h1 style={{ color: "red" }}>Heç bir yeniləmə yoxdur!</h1>
      )) || (
        <>
          <h2>Əvvəlki məlumatlar</h2>
          <div className="more-modal-header-inform">
            {beforeDataList?.map((item, index) => (
              <h3 key={index}>
                {item?.title}: <span>{item?.value}</span>
              </h3>
            ))}
            <div className="payment">
              {coursesModalData?.payments?.map((payment) => (
                <div key={payment._id}>
                  <h3 style={{ color: "black", fontWeight: 600 }}>
                    Ödəniş növü : {payment.paymentType} hissəli
                  </h3>
                  <h3 style={{ paddingLeft: "15px" }}>
                    Ödəniş : <span> {payment.payment}</span> AZN
                  </h3>
                </div>
              ))}
            </div>
          </div>
          <div className="more-modal-work-inform">
            <div className="work-inform-con"></div>
          </div>

          <h2>Yenilənmiş məlumatlar</h2>
          <div className="more-modal-header-inform">
            {newDataList?.map((item, index) => (
              <h3 key={index}>
                {item?.title}: <span>{item?.value}</span>
              </h3>
            ))}
            <div className="payment">
              {coursesModalData?.changes?.payments?.map((payment) => (
                <div key={payment._id}>
                  <h3 style={{ color: "black", fontWeight: 600 }}>
                    Ödəniş növü : {payment.paymentType} hissəli
                  </h3>
                  <h3 style={{ paddingLeft: "15px" }}>
                    Ödəniş : <span> {payment.payment}</span> AZN
                  </h3>
                </div>
              ))}
            </div>
          </div>
          {btns && (
            <div className="confirm-btns">
              <button
                className="cancel"
                style={
                  coursesModalLoading ? { backgroundColor: "#b29bff" } : {}
                }
                disabled={coursesModalLoading}
                onClick={() =>
                  dispatch(
                    cancelCourseChangesAction(
                      coursesModalData._id,
                      coursesModalData
                    )
                  )
                }
              >
                {(coursesModalLoading && <LoadingBtn />) || "Ləğv et"}
              </button>

              <button
                className="confirm"
                style={
                  coursesModalLoading ? { backgroundColor: "#b29bff" } : {}
                }
                disabled={coursesModalLoading}
                onClick={() =>
                  dispatch(
                    confirmCourseChangesAction(
                      coursesModalData._id,
                      coursesModalData
                    )
                  )
                }
              >
                {(coursesModalLoading && <LoadingBtn />) || "təsdiqlə"}
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CoursesConfirmModal;
