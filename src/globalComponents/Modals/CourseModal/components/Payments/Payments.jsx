import React, { useState } from "react";
import { TextField } from "@mui/material";
import { useCustomHook } from "../../../../GlobalFunctions/globalFunctions";
import { AiOutlinePlusCircle } from "react-icons/ai";
// import { ReactComponent as CheckIcon } from "../../../../../assets/icons/Checkbox.svg";
import DropdownIcon from "../../../components/DropdownIcon/DropdownIcon";
import SelectedPaymentList from "./components/SelectedPaymentList";
import PaymentItem from "./components/PaymentItem";
import { COURSES_MODAL_ACTION_TYPE } from "../../../../../redux/actions-type";
import { useDispatch } from "react-redux";
import PartItem from "./components/PartItem";

const Payments = ({ formik, modalData }) => {
  const { paymentTypeList: dataList } = useCustomHook();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [sameItemErrMessage, setsameItemErrMessage] = useState(false);
  const dispatch = useDispatch();

  // // console.log(modalData, "course modal data");

  const updateModalState = (keyName, value) => {
    dispatch({
      type: COURSES_MODAL_ACTION_TYPE.GET_COURSES_MODAL,
      payload: {
        data: { ...modalData, [keyName]: value },
        openModal: true,
      },
    });
  };

  // add new payment section
  const addData = () => {
    if (modalData.payments) {
      // the same element can't be added twice
      if (
        modalData.payments.find(
          (item) => item.paymentType === selectedItem.name
        )
      ) {
        setsameItemErrMessage(true);
      } else {
        setsameItemErrMessage(false);
        updateModalState("payments", [
          ...modalData.payments,
          {
            paymentType: selectedItem.name,
            payment: "",
            part:
              selectedItem.name === "Tam"
                ? 1
                : selectedItem.name === "10 hissəli"
                ? 10
                : "",
          },
        ]);
      }
    } else {
      updateModalState("payments", [
        {
          paymentType: selectedItem.name,
          payment: "",
          part:
            selectedItem.name === "Tam"
              ? 1
              : selectedItem.name === "10 hissəli"
              ? 10
              : "",
        },
      ]);
    }
    setSelectedItem("");
    setOpenDropdown(false);
  };
  // add payment
  const addPayment = (type, payment) => {
    const paymentsData = modalData.payments.map((item) =>
      item.paymentType === type ? { ...item, payment } : item
    );

    updateModalState("payments", paymentsData);
  };

  // add part
  const addPart = (type, part) => {
    const paymentsData = modalData.payments.map((item) =>
      item.paymentType === type ? { ...item, part } : item
    );

    updateModalState("payments", paymentsData);
  };

  const deleteData = (type) => {
    if (modalData.payments.length === 1) {
      updateModalState("payments", []);
    } else {
      const paymentsData = modalData.payments.filter(
        (item) => item.paymentType !== type
      );
      updateModalState("payments", paymentsData);
    }
  };
  return (
    <>
      <div className="dropdown-input  courses">
        <div className="left">
          <div className="input-box">
            <TextField
              sx={{
                "& input": {
                  fontSize: "12px",
                  marginRight: "32px",
                },
                marginTop: "24px",
              }}
              InputLabelProps={{
                style: { fontSize: "12px", color: "#3F3F3F" },
              }}
              fullWidth
              label="Ödəniş növü"
              autoComplete="off"
              disabled
              value={selectedItem ? selectedItem.name : ""}
            />
            <DropdownIcon
              setOpenDropdown={setOpenDropdown}
              openDropdown={openDropdown}
            />
          </div>

          <ul className={`dropdown-body ${openDropdown ? "active" : ""}`}>
            {dataList.map((item) => (
              <li key={item.key} onClick={() => setSelectedItem(item)}>
                <h4>{item.name}</h4>
              </li>
            ))}
          </ul>
        </div>

        <div className="right">
          <button
            disabled={!selectedItem}
            onClick={() => addData()}
            className="add-class"
          >
            <AiOutlinePlusCircle />
          </button>
        </div>
      </div>
      {sameItemErrMessage && (
        <small className="exist-error-message">
          Bu ödəniş növü artıq mövcuddur.
        </small>
      )}
      <ul className="category-list courses-li">
        {modalData?.payments?.map((item, index) => (
          <li key={index}>
            <ul>
              <PaymentItem
                data={item}
                deleteData={deleteData}
                addPayment={addPayment}
              />
              <PartItem data={item} deleteData={deleteData} addPart={addPart} />
            </ul>
          </li>
        ))}
      </ul>{" "}
    </>
  );
};

export default Payments;
