import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBtn from "../../../Loading/components/LoadingBtn/LoadingBtn";
import {
  cancelGroupChangesAction,
  confirmGroupChangesAction,
} from "../../../../redux/actions/groupsActions";

const GroupsConfirmModal = () => {
  const { groupModalData, groupModalLoading } = useSelector(
    (state) => state.groupModal
  );
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [btns, setBtns] = useState(true);

  // // console.log(groupModalData, "group modal data");
  let beforeTeachers =
    Array.isArray(groupModalData?.teachers) &&
    groupModalData?.teachers.length > 0
      ? groupModalData?.teachers
          .map((item) => {
            return `${item.fullName}`;
          })
          .join(", ")
      : "boş";

  let beforeMentors =
    Array.isArray(groupModalData?.mentors) && groupModalData?.mentors.length > 0
      ? groupModalData?.mentors
          .map((item) => {
            return `${item.fullName}`;
          })
          .join(", ")
      : "boş";

  let beforeStudents =
    Array.isArray(groupModalData?.students) &&
    groupModalData?.students.length > 0
      ? groupModalData?.students
          .map((item) => {
            return `${item.fullName}`;
          })
          .join(", ")
      : "boş";
  let beforeLessonDates = groupModalData?.lessonDate?.map((item, index) => (
    <p className="lesson-date" style={{ marginLeft: "20px" }} key={index}>
      gün: {item.day}, saat: {item.time}, növ:
      {item.practical ? " praktiki" : " adi"} <br />
    </p>
  ));

  let newTeachers =
    Array.isArray(groupModalData?.changes?.teachers) &&
    groupModalData?.changes?.teachers?.length > 0
      ? groupModalData?.changes?.teachers
          .map((item) => {
            return `${item.fullName}`;
          })
          .join(", ")
      : "boş";

  let newMentors =
    Array.isArray(groupModalData?.changes?.mentors) &&
    groupModalData?.changes?.mentors?.length > 0
      ? groupModalData?.changes?.mentors
          .map((item) => {
            return `${item.fullName}`;
          })
          .join(", ")
      : "boş";

  let newStudents =
    Array.isArray(groupModalData?.changes?.students) &&
    groupModalData?.changes?.students?.length > 0
      ? groupModalData?.changes?.students
          .map((item) => {
            return `${item.fullName}`;
          })
          .join(", ")
      : "boş";
  let newLessonDates = groupModalData?.changes?.lessonDate?.map(
    (item, index) => (
      <p className="lesson-date" style={{ marginLeft: "20px" }} key={index}>
        gün: {item.day}, saat: {item.time}, növ:
        {item.practical ? " praktiki" : " adi"} <br />
      </p>
    )
  );

  const beforeDataList = [
    { title: "Qrup adı", value: groupModalData?.name },
    { title: "İxtisas", value: groupModalData?.course?.name },
    { title: "Müəllimlər", value: beforeTeachers },
    { title: "Mentorlar", value: beforeMentors },
    { title: "Tələbələr", value: beforeStudents },
    { title: "Dərs günləri", value: beforeLessonDates },
    {
      title: "Başlama tarixi",
      value: moment(groupModalData.startDate)
        .locale("az")
        .format("DD MMMM YYYY"),
    },
    {
      title: "Bitmə tarixi",
      value: moment(groupModalData.endDate).locale("az").format("DD MMMM YYYY"),
    },
    {
      title: "Status",
      value: groupModalData?.complated ? "Mövcud qrup" : "Yığılan qrup",
    },
  ];

  const newDataList = [
    { title: "Qrup adı", value: groupModalData?.changes?.name },
    { title: "İxtisas", value: groupModalData.changes?.course?.name },
    { title: "Təlimçilər", value: newTeachers },
    { title: "Tələbələr", value: newStudents },
    { title: "Dərs günləri", value: newLessonDates },
    {
      title: "Başlama tarixi",
      value: moment(groupModalData.changes?.startDate)
        .locale("az")
        .format("DD MMMM YYYY"),
    },
    {
      title: "Bitmə tarixi",
      value: moment(groupModalData.changes?.endDate)
        .locale("az")
        .format("DD MMMM YYYY"),
    },
  ];

  useEffect(() => {
    if (user?.role === "worker") {
      const power = user?.profiles?.find(
        (item) => item.profile === "groups"
      )?.power;

      if (power === "update") {
        setBtns(false);
      }
    }
  });
  return (
    /*groupModalData?.changes?._id*/
    <>
      {(false && (
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
                style={groupModalLoading ? { backgroundColor: "#b29bff" } : {}}
                disabled={groupModalLoading}
                onClick={() =>
                  dispatch(
                    cancelGroupChangesAction(groupModalData._id, groupModalData)
                  )
                }
              >
                {(groupModalLoading && <LoadingBtn />) || "Ləğv et"}
              </button>

              <button
                className="confirm"
                style={groupModalLoading ? { backgroundColor: "#b29bff" } : {}}
                disabled={groupModalLoading}
                onClick={() =>
                  dispatch(
                    confirmGroupChangesAction(
                      groupModalData._id,
                      groupModalData
                    )
                  )
                }
              >
                {(groupModalLoading && <LoadingBtn />) || "təsdiqlə"}
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default GroupsConfirmModal;
