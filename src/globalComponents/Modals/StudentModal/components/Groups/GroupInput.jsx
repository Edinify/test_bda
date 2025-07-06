import React, { useEffect } from "react";
import  MinusIcon  from "../../../../../assets/icons/minus-cirlce.svg?react";
import PaymentType from "../Groups/components/PaymentType";
import Payments from "./components/Payments/Payments";
import InputField from "./components/Inputs/InputField";
import DiscountReason from "./components/DiscountReason/DiscountReason";
import Status from "./components/Status/Status";

const GroupInput = ({
  data,
  index,
  deleteItem,
  modalData,
  updateModalState,
  formik,
  setInputValue,
}) => {
  const groupData = modalData.groups;
  const foundIndex = groupData.findIndex(
    (item) => item.group._id === data.group._id
  );

  const addPaymentType = (item) => {
    groupData[foundIndex] = {
      ...groupData[foundIndex],
      payment: item,
    };
    updateModalState("groups", groupData);
  };

  const addPayments = (key, value, index) => {
    groupData[foundIndex].payments[index] = {
      ...groupData[foundIndex].payments[index],
      [key]: value,
    };

    updateModalState("groups", groupData);
  };

  const addGroupData = (key, value) => {
    groupData[foundIndex] = {
      ...groupData[foundIndex],
      [key]: value,
    };

    // console.log(groupData,"dataaaaaa");
    updateModalState("groups", groupData);
  };

  useEffect(() => {
    if (data.amount && data.paymentPart) {
      const amount = data.amount;
      const discount = data?.discount || 0;

      const totalAmount = amount - (amount * discount) / 100;
      const part = data.paymentPart;
      const onePartPayment = totalAmount / part;
      const paymentsDate = data?.paymentStartDate
        ? new Date(data.paymentStartDate)
        : "";

      const paymentArr = [];

      for (let i = 0; i < part; i++) {
        const currentDate = paymentsDate ? new Date(paymentsDate) : "";

        paymentArr.push({
          payment: onePartPayment.toFixed(2),
          paymentDate: currentDate,
          status: "wait",
        });

        if (paymentsDate) paymentsDate.setMonth(paymentsDate.getMonth() + 1);
      }

      groupData[foundIndex] = {
        ...groupData[foundIndex],
        payments: paymentArr,
        totalAmount: totalAmount,
      };
      // // console.log("helllooooooo");
      updateModalState("groups", groupData);
    }
  }, [data.discount, data.amount, data.paymentStartDate, data.paymentPart]);

  return (
    <li className="group-li">
      <div className="top">
        {index + 1}. {data?.group?.name}, {data?.group?.course?.name}
        <div className="minus-icon-con">
          <MinusIcon
            className="minus-icon"
            onClick={() => deleteItem(data.group._id)}
          />
        </div>
      </div>
      <Status
        formik={formik}
        setInputValue={setInputValue}
        data={data}
        addGroupData={addGroupData}
      />
      {data?.status === "freeze" ? (
        <InputField
          inputName={"freezeDate"}
          formik={formik}
          setInputValue={setInputValue}
          data={data}
          addGroupData={addGroupData}
        />
      ) : data?.status === "stopped" ? (
        <InputField
          inputName={"stoppedDate"}
          formik={formik}
          setInputValue={setInputValue}
          data={data}
          addGroupData={addGroupData}
        />
      ) : null}

      <InputField
        inputName={"degree"}
        formik={formik}
        setInputValue={setInputValue}
        data={data}
        addGroupData={addGroupData}
      />

      <div className="input-couples">
        <InputField
          inputName={"contractStartDate"}
          formik={formik}
          setInputValue={setInputValue}
          data={data}
          addGroupData={addGroupData}
        />
        <InputField
          inputName={"contractEndDate"}
          formik={formik}
          setInputValue={setInputValue}
          data={data}
          addGroupData={addGroupData}
        />
        <InputField
          inputName={"paymentStartDate"}
          formik={formik}
          setInputValue={setInputValue}
          data={data}
          addGroupData={addGroupData}
        />
        <InputField
          inputName={"contractId"}
          formik={formik}
          setInputValue={setInputValue}
          data={data}
          addGroupData={addGroupData}
        />
      </div>
      <PaymentType
        data={data}
        addPaymentType={addPaymentType}
        formik={formik}
      />
      <div className="input-couples">
        <DiscountReason
          data={data}
          addGroupData={addGroupData}
          formik={formik}
        />
        <InputField
          inputName={"discount"}
          formik={formik}
          setInputValue={setInputValue}
          data={data}
          addGroupData={addGroupData}
        />
        <InputField
          inputName={"amount"}
          formik={formik}
          setInputValue={setInputValue}
          data={data}
          addGroupData={addGroupData}
        />{" "}
        <InputField
          inputName={"paymentPart"}
          formik={formik}
          setInputValue={setInputValue}
          data={data}
          addGroupData={addGroupData}
        />
        <InputField
          inputName={"totalAmount"}
          formik={formik}
          setInputValue={setInputValue}
          data={data}
          addGroupData={addGroupData}
        />
      </div>

      <p style={{ marginTop: "20px" }}>{index + 1}. Ödənişlər</p>
      {data?.payments?.map((item, index) => (
        <Payments
          key={index}
          index={index}
          setInputValue={setInputValue}
          data={item}
          addPayments={addPayments}
          formik={formik}
        />
      ))}
    </li>
  );
};

export default GroupInput;
