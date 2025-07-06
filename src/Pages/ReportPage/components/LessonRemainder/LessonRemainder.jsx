import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubstitutedLessonsCountByTeacher } from "../../../../redux/actions/reportActions";
import  TimeIcon  from "../../../../assets/icons/report/timeIcon.svg?react";
import LessonRemainderItem from "./LessonRemainderItem";
const LessonRemainder = () => {
  const dispatch = useDispatch();
  const { subtitutedLessonsCount } = useSelector((state) => state.reportDatas);

  useEffect(() => {
    dispatch(getSubstitutedLessonsCountByTeacher());
  }, [dispatch]);

  return (
    <div className="lesson-remainder time  ">
      <div className="lesson-remainder-img">
        <TimeIcon />
      </div>

      <h2>Əvəz dərs qalığı</h2>
      <div className="students-remainder">
        {subtitutedLessonsCount?.map((subtituted, i) => (
          <LessonRemainderItem key={i} subtituted={subtituted} />
        ))}
      </div>
    </div>
  );
};

export default LessonRemainder;
