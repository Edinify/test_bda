import { Checkbox, FormControlLabel } from "@mui/material";

const MentorStatus = ({ modalData, updateModalState }) => {
  return (
    <>
      <div className="class-input">
        <FormControlLabel
          value="mentorHour"
          control={
            <Checkbox
              size="large"
              value={modalData?.mentorHour}
              checked={modalData?.mentorHour}
              onChange={(e) => {
                console.log(e.target.value);
                updateModalState("mentorHour", !modalData?.mentorHour);
              }}
            />
          }
          label="Tyutor saatı"
          labelPlacement="start"
          componentsProps={{ typography: { variant: "h5" } }}
          style={{
            margin: "20px 0 0 0",
            padding: "5px 14px",
            boxSizing: "border-box",
            borderLeft: "1px solid rgba(0, 0, 0, 0.38)",
          }}
        />
      </div>
    </>
  );
};

export default MentorStatus;
