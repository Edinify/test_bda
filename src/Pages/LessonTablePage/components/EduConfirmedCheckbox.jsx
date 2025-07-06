import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateLessonTableAction } from "../../../redux/actions/lessonTableActions";
import LoadingBtn from "../../../globalComponents/Loading/components/LoadingBtn/LoadingBtn";

const EduConfirmedCheckbox = ({ data }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const { user } = useSelector((state) => state.user);
  const { lessonTableModalLoading } = useSelector(
    (state) => state.lessonTableModal
  );
  const [isTargetCard, setIsTargetCard] = useState(false);

  const dispatch = useDispatch();

  const changeEduConfirmStatus = (currentValue) => {
    if (!isDisabled) {
      dispatch(
        updateLessonTableAction(data._id, { isEduConfirmed: !currentValue })
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

  return (
    <>
      {(lessonTableModalLoading && isTargetCard && <LoadingBtn />) || (
        <form>
          <input
            disabled={isDisabled}
            value={data.isEduConfirmed}
            style={{ marginRight: "10px" }}
            type="checkbox"
            checked={data.isEduConfirmed}
            onChange={(e) =>
              changeEduConfirmStatus(e.target.value === "true" ? true : false)
            }
          />
          <span style={{ color: data.isEduConfirmed ? "#07bc0c" : "#e74c3c" }}>
            {data.isEduConfirmed ? "Təstiqlənib" : "Təstiqlənməyib"}
          </span>
        </form>
      )}
    </>
  );
};

export default EduConfirmedCheckbox;
