import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBtn from "../../../globalComponents/Loading/components/LoadingBtn/LoadingBtn";
import { updateDiplomaAction } from "../../../redux/actions/diplomaActions";

const DiplomaStatus = ({ data }) => {
  const dispatch = useDispatch();
  const [isDisabled, setIsDisabled] = useState(true);
  const { user } = useSelector((state) => state.user);
  const { diplomaModalLoading } = useSelector((state) => state.diplomaModal);
  const [isTargetCard, setIsTargetCard] = useState(false);

  console.log(diplomaModalLoading, "lesson loading");

  const statusList = [
    { label: "Yoxdur", status: "none" },
    { label: "Dizayna göndərilib", status: "send-design" },
    { label: "Dizayn olunub", status: "designed" },
    { label: "Çapa göndərildi", status: "send-print" },
    { label: "Akademiyadadır", status: "in-academy" },
    { label: "Diplom verilib", status: "awarded" },
  ];

  const currIndex = statusList.findIndex(
    (item) => item.status === data.diplomaStatus
  );
  const statusFilteredList = statusList.slice(currIndex, currIndex + 2);

  console.log(statusFilteredList, "status filtered list");

  const updateStatus = (item) => {
    if (!isDisabled) {
      dispatch(updateDiplomaAction({ ...data, diplomaStatus: item.status }));

      setIsTargetCard(true);
    }
  };

  useEffect(() => {
    if (user?.role === "super-admin") {
      setIsDisabled(false);
    }

    if (user?.role === "worker") {
      const power = user?.profiles?.find(
        (item) => item.profile === "diploma"
      )?.power;

      if (power === "all" || power === "update") {
        setIsDisabled(false);
      }
    }
  }, []);

  useEffect(() => {
    if (!diplomaModalLoading) setIsTargetCard(false);
  }, [diplomaModalLoading]);

  return (
    <form className="lesson-page-status">
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        sx={{
          width: "100%",
          display: "flex",
          flexWrap: "nowrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {(diplomaModalLoading && isTargetCard && <LoadingBtn />) ||
          statusFilteredList?.map((item, i) => {
            return (
              <FormControlLabel
                disabled={isDisabled}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  marginRight: 0,
                }}
                key={i}
                value={item.status}
                control={<Radio checked={item.status === data.diplomaStatus} />}
                label={item.label}
                onChange={() => updateStatus(item)}
              />
            );
          })}
      </RadioGroup>
    </form>
  );
};

export default DiplomaStatus;
