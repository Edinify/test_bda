import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateLessonTableAction } from "../../../redux/actions/lessonTableActions";
import LoadingBtn from "../../../globalComponents/Loading/components/LoadingBtn/LoadingBtn";

const MentorHour = ({ data }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const { user } = useSelector((state) => state.user);
  const { lessonTableModalLoading } = useSelector(
    (state) => state.lessonTableModal
  );
  const [isTargetCard, setIsTargetCard] = useState(false);

  const dispatch = useDispatch();

  const changeMentorHour = (currentValue) => {
    console.log(currentValue, "current1 valueeeeeeeeeeeee");
    console.log(!currentValue, "current2 valueeeeeeeeeeeee");
    if (!isDisabled) {
      dispatch(
        updateLessonTableAction(data._id, { mentorHour: !currentValue })
      );
      setIsTargetCard(true);
    }
  };

  useEffect(() => {
    if (user?.role === "super-admin") {
      setIsDisabled(false);
    }

    if (user?.role === "worker") {
      const power = user?.profiles?.find(
        (item) => item.profile === "lessonTable"
      )?.power;

      if (power === "all") {
        setIsDisabled(false);
      }
    }
  }, []);

  useEffect(() => {
    if (!lessonTableModalLoading) setIsTargetCard(false);
  }, [lessonTableModalLoading]);

  // console.log(data.mentorHour, "llllllllllllllllllllllllllllllllll");
  return (
    <>
      {(lessonTableModalLoading && isTargetCard && <LoadingBtn />) || (
        <form>
          <input
            disabled={isDisabled}
            value={data.mentorHour}
            style={{ marginRight: "10px" }}
            type="checkbox"
            checked={data.mentorHour}
            onChange={(e) =>
              changeMentorHour(e.target.value === "true" ? true : false)
            }
          />
          <span style={{ color: data.mentorHour ? "#07bc0c" : "#e74c3c" }}>
            {data.mentorHour ? "Keçirilib" : "Keçirilməyib"}
          </span>
        </form>
      )}
    </>
  );
};

export default MentorHour;
