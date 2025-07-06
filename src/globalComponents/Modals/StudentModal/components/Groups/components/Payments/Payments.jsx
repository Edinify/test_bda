import React from "react";
import Payment from "./Payment";

const Payments = ({ formik, setInputValue, data, addPayments, index }) => {
  return (
    <div style={{ borderTop: "1px solid gray", padding: "20px 0" }}>
      <div className="input-couples">
        <Payment
          inputName={"payment"}
          formik={formik}
          setInputValue={setInputValue}
          data={data}
          addPayments={addPayments}
          index={index}
        />
        <Payment
          inputName={"paymentDate"}
          formik={formik}
          setInputValue={setInputValue}
          data={data}
          addPayments={addPayments}
          index={index}
        />
      </div>
      <hr />
    </div>
  );
};

export default Payments;
