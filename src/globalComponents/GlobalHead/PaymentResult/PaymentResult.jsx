import React, { useEffect, useState } from "react";
import "./paymentResult.css";
import DateRangeModal from "../../Modals/DateRangeModal/DateRangeModal";
import { useDispatch, useSelector } from "react-redux";
import PaymentDropdown from "../../PaymentDropdown/PaymentDropdown";
import  PaymentIcon  from "../../../assets/icons/tuitionFee/payment-card.svg?react";
import moment from "moment";
import "moment/locale/az";
import {
  // getLatedPayment,
  // getPaidPayment,
  getTotalAllDept,
  getTotalDebtDisabledStudents,
  getTotalAmountWaiting,
  getTotalDebtContinueAction,
  getTotalPaidsAction,
  getTotalPaymentRestAction,
  getTotalPaymentRestStoppedAction,
  getTotalPaymentSumContinueAction,
  getTotalPaymentSumContinueFullPaymentAction,
  getTotalPaymentSumContinuePartPaymentAction,
  // getWillPayPayment,
} from "../../../redux/actions/tuitionFeePaymentActions";

const PaymentResult = () => {
  const dispatch = useDispatch();
  const [openCalendar, setOpenCalendar] = useState(false);
  // const [openDropdownEntered, setOpenDropdownEntered] = useState(false);
  // const [openDropdownLated, setOpenDropdownLated] = useState(false);
  // const [openDropdownEnter, setOpenDropdownEnter] = useState(false);
  const [openTotalPaidsDropdown, setOpenTotalPaidsDropdown] = useState(false);
  const [selectedDate,setSelectedDate] = useState({
    startDate:"",
    endDate:""
  })


  const {
    totalPaymentSum,
    fullPaymentTotalSum,
    partPaymentTotalSum,
    totalRest,
    totalDebt,
    totalRestStopped,
    totalPaids,
    totalAmountWaiting,
    totalDebtDisabledStudents,
    totalAllDebt,
  } = useSelector((state) => state.tuitionFeePayment);

  useEffect(() => {
    dispatch(getTotalPaymentSumContinueAction());
    dispatch(getTotalPaymentSumContinueFullPaymentAction());
    // dispatch(getLatedPayment("", "", "", true));
    // dispatch(getPaidPayment("", "", "", true));
    // dispatch(getWillPayPayment("", "", "", true));
    dispatch(getTotalPaymentSumContinuePartPaymentAction());
    dispatch(getTotalPaymentRestAction());
    dispatch(getTotalDebtContinueAction());
    dispatch(getTotalPaymentRestStoppedAction());
    dispatch(getTotalPaidsAction("", "", "", true));
    dispatch(getTotalAmountWaiting());
    dispatch(getTotalDebtDisabledStudents());
    dispatch(getTotalAllDept());
  }, [dispatch]);

  // const applyLatedFilter = (startDate, endDate) => {
  //   dispatch(getLatedPayment("", startDate, endDate, ""));
  //   setOpenCalendar(false);
  //   setOpenDropdownEntered(false);
  //   setOpenDropdownLated(false);
  //   setOpenDropdownEnter(false);
  //   setOpenTotalPaidsDropdown(false);
  // };
  // const applyPaidFilter = (startDate, endDate) => {
  //   dispatch(getPaidPayment("", startDate, endDate, ""));
  //   setOpenCalendar(false);
  //   setOpenDropdownEntered(false);
  //   setOpenDropdownLated(false);
  //   setOpenDropdownEnter(false);
  //   setOpenTotalPaidsDropdown(false);
  // };

  // const applyWillPayFilter = (startDate, endDate) => {
  //   dispatch(getWillPayPayment("", startDate, endDate, ""));
  //   setOpenCalendar(false);
  //   setOpenDropdownEntered(false);
  //   setOpenDropdownLated(false);
  //   setOpenDropdownEnter(false);
  //   setOpenTotalPaidsDropdown(false);
  // };

  const applyTotalPaidsFilter = (startDate, endDate) => {
    dispatch(getTotalPaidsAction("", startDate, endDate, ""));
    setOpenCalendar(false);
    // setOpenDropdownEntered(false);
    // setOpenDropdownLated(false);
    // setOpenDropdownEnter(false);
    setOpenTotalPaidsDropdown(false);
    setSelectedDate({startDate,endDate})
  };

  // const applyMonthsLatedFilter = (option) => {
  //   dispatch(getLatedPayment(option.key, "", "", ""));
  // };

  // const applyMonthsPaidFilter = (option) => {
  //   dispatch(getPaidPayment(option.key, "", "", ""));
  // };

  // const applyMonthsWillPayFilter = (option) => {
  //   dispatch(getWillPayPayment(option.key, "", "", ""));
  // };

  const applyMonthTotalPaids = (option) => {
    dispatch(getTotalPaidsAction(option.key, "", "", ""));
  };

  const applyFilter = (startDate, endDate) => {
    // if (openDropdownLated) {
    //   applyLatedFilter(startDate, endDate);
    // } else if (openDropdownEntered) {
    //   applyPaidFilter(startDate, endDate);
    // } else if (openDropdownEnter) {
    //   applyWillPayFilter(startDate, endDate);
    // }
    if (openTotalPaidsDropdown) {
      applyTotalPaidsFilter(startDate, endDate);
    }
  };

  // const newLocal = (
  //   <PaymentDropdown
  //     optionType={"date"}
  //     calendar={true}
  //     setOpenCalendar={setOpenCalendar}
  //     openCalendar={openCalendar}
  //     openDropdown={openDropdownEnter}
  //     setOpenDropdown={setOpenDropdownEnter}
  //     typeName="pay"
  //     applyMonthsFilter={applyMonthsWillPayFilter}
  //   />
  // );

  useEffect(() => {
    if (openCalendar) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "overlay";
    }
  }, [openCalendar]);
  return (
    <>
      <section className="payment-amount">
        <div className="content-box">
          <div className="left green">
            <PaymentIcon />
          </div>

          <div className="right">
            <div className="top">
              <h2 className="title">Ümumi həcm</h2>

             
            </div>
            <p className="amount">{totalPaymentSum ? totalPaymentSum : 0}</p>
          </div>
        </div>
     
        <div className="content-box events">
          <div className="left green">
            <PaymentIcon />
          </div>

          <div className="right">
            <div className="top">
              <h2 className="title">Tam ödəniş</h2>
            </div>
            <p className="amount">
              {fullPaymentTotalSum ? fullPaymentTotalSum : 0}
            </p>
          </div>
        </div>
        <div className="content-box events">
          <div className="left green">
            <PaymentIcon />
          </div>

          <div className="right">
            <div className="top">
              <h2 className="title">Hissəli ödəniş</h2>
            </div>
            <p className="amount">
              {partPaymentTotalSum ? partPaymentTotalSum : 0}
            </p>
          </div>
        </div>
        <div className="content-box events">
          <div className="left green">
            <PaymentIcon />
          </div>

          <div className="right">
            <div className="top">
              <h2 className="title">Növbəti aylara qalıq </h2>
            </div>
            <p className="amount">{totalRest ? totalRest : 0}</p>
          </div>
        </div>
        <div className="content-box events">
          <div className="left green">
            <PaymentIcon />
          </div>

          <div className="right">
            <div className="top">
              <h2 className="title">Gecikmə məbləği</h2>
            </div>
            <p className="amount">{totalDebt ? totalDebt : 0}</p>
          </div>
        </div>
        <div className="content-box events">
          <div className="left green">
            <PaymentIcon />
          </div>

          <div className="right">
            <div className="top">
              <h2 className="title">Dayandırdı məbləği</h2>
            </div>
            <p className="amount">{totalRestStopped ? totalRestStopped : 0}</p>
          </div>
        </div>
        <div className="content-box events">
          <div className="left green">
            <PaymentIcon />
          </div>

          <div className="right">
           {selectedDate?.startDate && selectedDate?.endDate && <div style={{marginBottom:"5px"}} >
          <span>{ selectedDate ?  moment(selectedDate?.startDate)
            .locale("az")
            .format("DD MMMM YYYY")  : ""}</span>
            <span> - </span>
            <span>{ selectedDate ?  moment(selectedDate?.endDate)
            .locale("az")
            .format("DD MMMM YYYY")  : ""}</span>
            </div>}
            <div className="top">
              <h2 className="title">Ödənilmiş məbləğ</h2>
          
              <PaymentDropdown
                optionType="date"
                calendar={true}
                setOpenCalendar={setOpenCalendar}
                openCalendar={openCalendar}
                openDropdown={openTotalPaidsDropdown}
                setOpenDropdown={setOpenTotalPaidsDropdown}
                applyMonthsFilter={applyMonthTotalPaids}
                typeName="totalPaids"
                selectedDate={selectedDate}
              />
            </div>
            <p className="amount">{totalPaids ? totalPaids : 0}</p>
           
          </div>
        </div>
        <div className="content-box events">
          <div className="left green">
            <PaymentIcon />
          </div>

          <div className="right">
            <div className="top">
              <h2 className="title">Gözləyən tələbə müqavilə cəmi</h2>
            </div>
            <p className="amount">
              {totalAmountWaiting ? totalAmountWaiting : 0}
            </p>
          </div>
        </div>
        <div className="content-box events">
          <div className="left green">
            <PaymentIcon />
          </div>

          <div className="right">
            <div className="top">
              <h2 className="title">Ümidsiz aktiv</h2>
            </div>
            <p className="amount">
              {totalDebtDisabledStudents ? totalDebtDisabledStudents : 0}
            </p>
          </div>
        </div>
        <div className="content-box events">
          <div className="left green">
            <PaymentIcon />
          </div>

          <div className="right">
            <div className="top">
              <h2 className="title">Ümumi borc</h2>
            </div>
            <p className="amount">{totalAllDebt ? totalAllDebt : 0}</p>
          </div>
        </div>
      </section>

      {openCalendar && (
        <DateRangeModal
          applyFilter={applyFilter}
          setOpenCalendar={setOpenCalendar}
        />
      )}
    </>
  );
};

export default PaymentResult;
