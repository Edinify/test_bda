import React from "react";
import { useSelector } from "react-redux";
import LetterIcon  from "../../../../assets/icons/letter-unread-svgrepo-com.svg";
import StartIcon  from "../../../../assets/icons/star-svgrepo-com.svg";

const StudentCells = ({
  time,
  week,
  startWeek,
  getLesson,
  index,
  openModal,
}) => {
  const existRateByStudent =
    getLesson.length > 0 && getLesson[0]?.status !== "cancelled" && getLesson[0]?.students[0]?.attendance === 1 &&
    getLesson[0]?.students.filter((student) => student.ratingByStudent !== 0);
  const existNoteByStudent =
    getLesson.length > 0 && getLesson[0]?.status !== "cancelled" && getLesson[0]?.students[0]?.attendance === 1 &&
    getLesson[0]?.students.filter((student) => student.feedback);
  const { user } = useSelector((state) => state.user);

  const studentAttendance = [
    { id: 0, status: "unviewed" },
    { id: 1, status: "confirmed" },
    { id: -1, status: "cancelled" },
    { id: 2, status: "student-cancelled" },
  ];

  const statusName =
    getLesson.length > 0
      ? getLesson[0].status === "cancelled"
        ? "present-cancelled"
        : studentAttendance.filter((student) => {
            if (student.id === getLesson[0].students[0]?.attendance) {
              return true;
            } else {
              return false;
            }
          })[0]?.status
      : "";
  return (
    <td
      className={`lesson-name ${statusName}`}
      key={index}
      onClick={() => {
        const lessonKeys = {time, week, getLesson, startWeek}
        openModal(lessonKeys);
      }}
    >
      {user.role !== "student" && (
        <div className="icons-con">
          {existNoteByStudent.length > 0 && <LetterIcon />}
          {existRateByStudent.length > 0 && <StartIcon />}
        </div>
      )}

      <h3>{getLesson.length > 0 && getLesson[0].course?.name}</h3>
      <p>
        {getLesson.length > 0 &&
          getLesson[0].status === "cancelled" &&
          "Dərs ləğv edilib"}
        {getLesson.length > 0 &&
          getLesson[0].status !== "cancelled" &&
          getLesson[0].students.length > 0 &&
          getLesson[0].students[0].attendance === 2 &&
          "İştirak edilməyəcək"}
        {getLesson.length > 0 &&
          getLesson[0].status !== "cancelled" &&
          getLesson[0].students.length > 0 &&
          getLesson[0].students[0].attendance === 0 &&
          "Yoxlanılmayıb"}
        {getLesson.length > 0 &&
          getLesson[0].status !== "cancelled" &&
          getLesson[0].students.length > 0 &&
          getLesson[0].students[0].attendance === 1 &&
          "İştirak edilib"}
        {getLesson.length > 0 &&
          getLesson[0].status !== "cancelled" &&
          getLesson[0].students.length > 0 &&
          getLesson[0].students[0].attendance === -1 &&
          "İştirak edilməyib"}
      </p>
    </td>
  );
};

export default StudentCells;
