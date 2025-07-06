import React from "react";

function LessonRemainderItem({ subtituted }) {
  const firstCancelledLessonDate = new Date(
    subtituted.firstCancelledLessonDate
  );
  const currentDate = new Date();
  const timeDiff =
    (currentDate - firstCancelledLessonDate) / (24 * 60 * 60 * 1000);

  const elapsedTime =
    timeDiff > 365
      ? `${Math.floor(timeDiff / 365)} il`
      : timeDiff > 30
      ? `${Math.floor(timeDiff / 30)} ay`
      : `${Math.floor(timeDiff)} gün`;

  return (
    <div className="student-remainder">
      <span>{subtituted?.teacherName}</span>
      <span>-{subtituted.substitutedLessonsCount} dərs</span>
      <span>{elapsedTime} Əvvəl</span>
    </div>
  );
}

export default LessonRemainderItem;
