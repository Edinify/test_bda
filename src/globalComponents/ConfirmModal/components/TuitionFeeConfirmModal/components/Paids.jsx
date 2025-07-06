// import { DataGrid } from "@mui/x-data-grid";
import { Box, Card, Checkbox, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import MinusIcon  from "../../../../../assets/icons/minus-cirlce.svg?react";
import "./paids.css";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { TUITION_FEE_MODAL_ACTION_TYPE } from "../../../../../redux/actions-type";

function Paids({ tuitionFeeModalData }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [workerPower, setWorkerPower] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const togglePaymentStatus = (index) => {
    const newPayments = tuitionFeeModalData.paids.map((item, i) =>
      i === index ? { ...item, confirmed: !item?.confirmed } : item
    );

    dispatch({
      type: TUITION_FEE_MODAL_ACTION_TYPE.UPDATE_TUITION_FEE_PAYMENTS,
      payload: {
        data: { ...tuitionFeeModalData, paids: newPayments },
        openModal: false,
        openConfirmModal: "openConfirmModal",
      },
    });
  };

  const deletePayment = (index) => {
    const newPayments = tuitionFeeModalData.paids.filter(
      (item, i) => i !== index
    );

    dispatch({
      type: TUITION_FEE_MODAL_ACTION_TYPE.UPDATE_TUITION_FEE_PAYMENTS,
      payload: {
        data: { ...tuitionFeeModalData, paids: newPayments },
        openModal: false,
        openConfirmModal: "openConfirmModal",
      },
    });
  };

  console.log(user, "user in tuition fee paids");

  useEffect(() => {
    if (user.role === "worker") {
      const power =
        user.profiles.find((item) => item.profile === "tuitionFee")?.power ||
        null;

      if (power === "all") {
        setIsDisabled(false);
      }

      setWorkerPower(power);
    }
  }, [user]);
  return (
    <Box sx={{ width: "100%", marginBottom: "40px" }}>
      {tuitionFeeModalData?.paids?.map((item, i) => (
        <Card
          key={i}
          sx={{
            // borderBottom: "0.1px solid ",
            borderRadius: "8px",
            marginBottom: "20px",
            backgroundColor: "var(--neutrals-200)",
            paddingRight: "10px",
          }}
          className="paids-container"
        >
          <Checkbox
            color="primary"
            onChange={() => togglePaymentStatus(i)}
            checked={item?.confirmed || false}
            sx={{
              ".MuiCheckbox-sizeMedium": {
                fontSize: "0px",
              },
            }}
            size="large"
            disabled={isDisabled}
          />
          {/* <div className="paids-content"> */}
          <Typography>
            {item?.paymentDate
              ? moment(item.paymentDate).format("DD.MM.YYYY")
              : ""}
          </Typography>
          <Typography>{item.payment} AZN</Typography>
          {/* </div> */}
          {workerPower === "update" && (
            <div
              className="minus-icon-con"
              style={item?.confirmed ? { visibility: "hidden" } : {}}
              onClick={() => deletePayment(i)}
            >
              <MinusIcon className="minus-icon" />
            </div>
          )}
        </Card>
      ))}
    </Box>
  );
}

export default Paids;
