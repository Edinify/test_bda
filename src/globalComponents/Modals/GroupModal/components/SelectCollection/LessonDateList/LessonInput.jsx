import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import  MinusIcon  from "../../../../../../assets/icons/minus-cirlce.svg?react";

const LessonInput = ({
  data,
  index,
  deleteItem,
  modalData,
  updateModalState,
}) => {
  const addTime = (selectedTime, name) => {
    const lessonDateData = [...modalData.lessonDate];
    lessonDateData[index] = { ...lessonDateData[index], [name]: selectedTime };
    updateModalState("lessonDate", lessonDateData);
  };

  const updateLessonType = () => {
    const lessonDateData = [...modalData.lessonDate];
    lessonDateData[index] = {
      ...lessonDateData[index],
      practical: !data.practical,
    };
    updateModalState("lessonDate", lessonDateData);
  };

  // // console.log(data);
  // // console.log(modalData, "modal dataaaaaaaaa");

  return (
    <li>
      <div className="top">
        <span style={{ fontWeight: "bold" }}> dərs günü: {data.day}</span>
        <div className="minus-icon-con">
          <MinusIcon className="minus-icon" onClick={() => deleteItem(index)} />
        </div>
      </div>
      <div>
        <FormControlLabel
          control={<Checkbox checked={data.practical || false} />}
          onChange={updateLessonType}
          label="Praktiki Dərs"
          sx={{
            "& .MuiSvgIcon-root": { fontSize: 28 },
            "& .MuiFormControlLabel-label": {
              fontSize: "12px",
              fontWeight: 500,
            },
          }}
        />
      </div>
      <div className="input-couples">
        <TextField
          sx={{
            "& input": { fontSize: "12px" },
            marginTop: "16px",
          }}
          name="startTime"
          InputLabelProps={{
            style: { fontSize: "12px", color: "#3F3F3F" },
            shrink: true,
          }}
          fullWidth
          label="Dərs başlama saatı"
          autoComplete="off"
          type="time"
          value={data.startTime ? data.startTime : ""}
          onChange={(e) => addTime(e.target.value, e.target.name)}
        />{" "}
        <TextField
          sx={{
            "& input": { fontSize: "12px" },
            marginTop: "16px",
          }}
          name="endTime"
          InputLabelProps={{
            style: { fontSize: "12px", color: "#3F3F3F" },
            shrink: true,
          }}
          fullWidth
          label="Dərs bitmə saatı"
          autoComplete="off"
          type="time"
          value={data.endTime ? data.endTime : ""}
          onChange={(e) => addTime(e.target.value, e.target.name)}
        />
      </div>
    </li>
  );
};

export default LessonInput;
