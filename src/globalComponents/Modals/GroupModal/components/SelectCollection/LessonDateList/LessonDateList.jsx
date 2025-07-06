import React, {  useState } from "react";
import { TextField } from "@mui/material";
import { AiOutlinePlusCircle } from "react-icons/ai";
import LessonInput from "./LessonInput";

const LessonDateList = ({ formik, updateModalState, modalData }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [timeErrMessage, setTimeErrMessage] = useState(false);

  const deleteItem = (index) => {
    if (modalData.lessonDate.length === 1) {
      updateModalState("lessonDate", []);
    } else {
      const lessonDateData = [...modalData.lessonDate];
      lessonDateData.splice(index, 1);
      updateModalState("lessonDate", lessonDateData);
    }
  };

  const addDay = () => {
    if (modalData.lessonDate) {
      // the same element can't be added twice
      if (modalData.lessonDate.find((item) => item.day === selectedDay)) {
        setTimeErrMessage(true);
      } else {
        const lessonDateData = [
          ...modalData?.lessonDate,
          { day: selectedDay, time: "" },
        ];
        setTimeErrMessage(false);
        updateModalState("lessonDate", lessonDateData);
      }
    } else {
      const lessonDateData = [{ day: selectedDay, time: "" }];
      setTimeErrMessage(false);
      updateModalState("lessonDate", lessonDateData);
    }
    setSelectedDay("");
  };

  // // console.log(selectedDay, "selected day");

  return (
    <div>
      <div className="dropdown-input courses">
        <div className="left">
          <div className="input-box">
            <TextField
              sx={{
                "& input": { fontSize: "12px", marginRight: "32px" },
                marginTop: "24px",
              }}
              InputLabelProps={{
                style: { fontSize: "12px", color: "#3F3F3F" },
              }}
              fullWidth
              type="number"
              label="Dərs vaxtları"
              autoComplete="off"
              value={selectedDay || ""}
              onChange={(e) => setSelectedDay(e.target.value)}
            />
          </div>
        </div>

        <div className="right">
          <button
            disabled={!selectedDay}
            onClick={() => addDay()}
            className="add-class"
          >
            <AiOutlinePlusCircle />
          </button>
        </div>
      </div>

      {formik.errors.lessonDate && formik.touched.lessonDate && (
        <small className="validation-err-message">
          {formik.errors.lessonDate}
        </small>
      )}

      <ul className="category-list courses-li">
        {timeErrMessage ? (
          <small className="category-error-message">
            Bu dərs vaxtı artıq mövcuddur.
          </small>
        ) : null}

        {modalData?.lessonDate?.map((item, index) => (
          <LessonInput
            key={index}
            index={index}
            data={item}
            deleteItem={deleteItem}
            modalData={modalData}
            updateModalState={updateModalState}
          />
        ))}
      </ul>
    </div>
  );
};

export default LessonDateList;
