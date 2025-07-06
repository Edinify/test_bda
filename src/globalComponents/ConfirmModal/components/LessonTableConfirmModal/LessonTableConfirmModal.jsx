import moment from "moment";
import "moment/locale/az";
import { useCustomHook } from "../../../GlobalFunctions/globalFunctions";
import { useDispatch, useSelector } from "react-redux";
import LoadingBtn from "../../../Loading/components/LoadingBtn/LoadingBtn";
import { useEffect, useState } from "react";
import {
  cancelLessonTableChangesAction,
  confirmLessonTableChangesAction,
} from "../../../../redux/actions/lessonTableActions";

const LessonTableConfirmModal = ({}) => {
  const { weeksArrFullName } = useCustomHook();
  const { lessonTableModalData, lessonTableModalLoading } = useSelector(
    (state) => state.lessonTableModal
  );
  const [btns, setBtns] = useState(true);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const lessonDay = lessonTableModalData.date
    ? `${moment(lessonTableModalData.date)
        .locale("az")
        .format("DD MMMM YYYY")}, ${
        weeksArrFullName[moment(new Date(lessonTableModalData.date)).day()]
      },`
    : "";

  const students =
    lessonTableModalData.students?.map((student) => student.student.fullName) ||
    [];

  const beforeDataList = [
    { title: "Qrup", value: lessonTableModalData?.group?.name },
    { title: "İxtisas", value: lessonTableModalData?.group?.course?.name },
    {
      title: "Mövzu",
      value: `${lessonTableModalData?.topic?.orderNumber}. ${lessonTableModalData?.topic?.name}`,
    },
    { title: "Müəllim", value: lessonTableModalData?.teacher.fullName },
    { title: "Dərs günü", value: lessonDay },
    { title: "Dərs saatı", value: lessonTableModalData?.time },
    { title: "Status", value: lessonTableModalData?.status },
    { title: "Tələbələr", value: students?.join(",") },
  ];

  const newDataList = [
    { title: "Qrup", value: lessonTableModalData?.group?.name },
    { title: "İxtisas", value: lessonTableModalData?.group?.course?.name },
    {
      title: "Mövzu",
      value: `${lessonTableModalData?.topic?.orderNumber}. ${lessonTableModalData?.topic?.name}`,
    },
    { title: "Müəllim", value: lessonTableModalData?.teacher.fullName },
    { title: "Dərs günü", value: lessonDay },
    { title: "Dərs saatı", value: lessonTableModalData?.time },
    { title: "Status", value: lessonTableModalData?.status },
    { title: "Tələbələr", value: students?.join(",") },
  ];

  useEffect(() => {
    if (user?.role === "worker") {
      const power = user?.profiles?.find(
        (item) => item.profile === "lessonTable"
      )?.power;

      if (power === "update") {
        setBtns(false);
      }
    }
  });
  return (
    <>
      {(!lessonTableModalData?.changes?._id && (
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
                  lessonTableModalLoading ? { backgroundColor: "#b29bff" } : {}
                }
                disabled={lessonTableModalLoading}
                onClick={() =>
                  dispatch(
                    cancelLessonTableChangesAction(
                      lessonTableModalData._id,
                      lessonTableModalData
                    )
                  )
                }
              >
                {(lessonTableModalLoading && <LoadingBtn />) || "Ləğv et"}
              </button>

              <button
                className="confirm"
                style={
                  lessonTableModalLoading ? { backgroundColor: "#b29bff" } : {}
                }
                disabled={lessonTableModalLoading}
                onClick={() =>
                  dispatch(
                    confirmLessonTableChangesAction(
                      lessonTableModalData._id,
                      lessonTableModalData
                    )
                  )
                }
              >
                {(lessonTableModalLoading && <LoadingBtn />) || "təsdiqlə"}
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default LessonTableConfirmModal;
