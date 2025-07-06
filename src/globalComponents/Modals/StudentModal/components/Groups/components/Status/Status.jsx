import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React from "react";

export default function Status({ data, setInputValue, formik, addGroupData }) {
  const changeSector = (value) => {
    addGroupData("status", value);
    setInputValue("status", value);
  };

  // console.log(data, "data in status component");
  return (
    <div style={{ marginTop: "16px" }}>
      <label className="radio-sector-title"></label>
      <div className="radio-sector-con department">
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          sx={{
            "& .MuiSvgIcon-root": {
              fontSize: 20,
            },
            "& .MuiFormControlLabel-label": {
              fontSize: 12,
            },
          }}
        >
          <FormControlLabel
            value="waiting"
            control={<Radio checked={data?.status === "waiting"} />}
            label="Gözləmədə"
            onClick={() => {
              changeSector("waiting");
            }}
          />
          <FormControlLabel
            value="continue"
            control={<Radio checked={data?.status === "continue"} />}
            label="Davam edir"
            onClick={() => {
              changeSector("continue");
            }}
          />
          <FormControlLabel
            value="graduate"
            control={<Radio checked={data?.status === "graduate"} />}
            label="Məzun"
            onClick={() => {
              changeSector("graduate");
            }}
          />
          <FormControlLabel
            value="freeze"
            control={<Radio checked={data?.status === "freeze"} />}
            label="Dondurdu"
            onClick={() => {
              changeSector("freeze");
            }}
          />
          <FormControlLabel
            value="stopped"
            control={<Radio checked={data?.status === "stopped"} />}
            label="Dayandırdı"
            onClick={() => {
              changeSector("stopped");
            }}
          />{" "}
          <FormControlLabel
            value="debtor-graduate"
            control={<Radio checked={data?.status === "debtor-graduate"} />}
            label="Borclu Məzun"
            onClick={() => {
              changeSector("debtor-graduate");
            }}
          />
        </RadioGroup>
      </div>
      {formik.errors.sector && (
        <small className="validation-err-message sector">
          {formik.errors.status}
        </small>
      )}
    </div>
  );
}
