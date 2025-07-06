import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBtn from "../../../Loading/components/LoadingBtn/LoadingBtn";
import {
  cancelSyllabusChangesAction,
  confirmSyllabusChangesAction,
} from "../../../../redux/actions/syllabusActions";

const SyllabusConfirmModal = () => {
  const { syllabusModalData, syllabusModalLoading } = useSelector(
    (state) => state.syllabusModal
  );
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [btns, setBtns] = useState(true);

  const beforeDataList = [
    { title: "No", value: syllabusModalData?.orderNumber },
    { title: "Mövzu", value: syllabusModalData?.name },
  ];

  const newDataList = [
    { title: "No", value: syllabusModalData?.changes?.orderNumber },
    { title: "Mövzu", value: syllabusModalData?.changes?.name },
  ];

  useEffect(() => {
    if (user?.role === "worker") {
      const power = user?.profiles?.find(
        (item) => item.profile === "syllabus"
      )?.power;

      if (power === "update") {
        setBtns(false);
      }
    }
  });
  return (
    <>
      {(!syllabusModalData?.changes?._id && (
        <h1 style={{ color: "red" }}>Heç bir yeniləmə yoxdur!</h1>
      )) || (
        <>
          <h2>Əvvəlki məlumatlar</h2>
          <div className="more-modal-header-inform">
            {beforeDataList.map((item, index) => (
              <h3 key={index}>
                {item.title}: <span>{item.value}</span>
              </h3>
            ))}
          </div>
          <div className="more-modal-work-inform">
            <div className="work-inform-con"></div>
          </div>

          <h2>Yenilənmiş məlumatlar</h2>
          <div className="more-modal-header-inform">
            {newDataList.map((item, index) => (
              <h3 key={index}>
                {item.title}:{" "}
                <span
                  style={
                    item.value !== beforeDataList[index].value
                      ? { color: "red" }
                      : {}
                  }
                >
                  {item.value}
                </span>
              </h3>
            ))}
          </div>
          {btns && (
            <div className="confirm-btns">
              <button
                className="cancel"
                style={
                  syllabusModalLoading ? { backgroundColor: "#b29bff" } : {}
                }
                disabled={syllabusModalLoading}
                onClick={() =>
                  dispatch(
                    cancelSyllabusChangesAction(
                      syllabusModalData._id,
                      syllabusModalData
                    )
                  )
                }
              >
                {(syllabusModalLoading && <LoadingBtn />) || "Ləğv et"}
              </button>

              <button
                className="confirm"
                style={
                  syllabusModalLoading ? { backgroundColor: "#b29bff" } : {}
                }
                disabled={syllabusModalLoading}
                onClick={() =>
                  dispatch(
                    confirmSyllabusChangesAction(
                      syllabusModalData._id,
                      syllabusModalData
                    )
                  )
                }
              >
                {(syllabusModalLoading && <LoadingBtn />) || "təsdiqlə"}
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default SyllabusConfirmModal;
