import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DateDropdown from "../../../../globalComponents/DateDropdown/DateDropdown";
import DateRangeModal from "../../../../globalComponents/Modals/DateRangeModal/DateRangeModal";
import { getDashboardAdvertisingAction } from "../../../../redux/actions/dashboardAction";

const WhereHeard = ({ type}) => {
  const dispatch = useDispatch();
  const { advertising } = useSelector((state) => state.dashboardData);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openDateDropdown, setOpenDateDropdown] = useState(false);

  const applyFilter = (startDate, endDate) => {
    dispatch(getDashboardAdvertisingAction(startDate, endDate, ""));
    setOpenCalendar(false);
    setOpenDateDropdown(false);
  };

  const applyMonthsFilter = (option) => {
    dispatch(getDashboardAdvertisingAction("", "", option.key));
  };


  // console.log(advertising,"advertisinggg")


  return (
    <>
      <section className="where-heard">
        <div className="content-box">
          <div className="top">
            <h2 className="title">Bizi haradan eşidiblər?</h2>
            {type !== "mobile" ? (
              <DateDropdown
                optionType={"date"}
                calendar={true}
                setOpenCalendar={setOpenCalendar}
                openCalendar={openCalendar}
                openDropdown={openDateDropdown}
                setOpenDropdown={setOpenDateDropdown}
                applyMonthsFilter={applyMonthsFilter}
              />
            ) : (
              <DateDropdown
                optionType={"date"}
                setOpenCalendar={setOpenCalendar}
                openCalendar={openCalendar}
                openDropdown={openDateDropdown}
                setOpenDropdown={setOpenDateDropdown}
                applyMonthsFilter={applyMonthsFilter}
              />
            )}
          </div>

          <div className="bottom">
            {advertising?.map((item, index) => (
              <div key={index} className="linear-con">
                <h5>
                  {item.name}| {item.value}%
                </h5>
                <div style={{ width: `${item.value}%` }} className="line"></div>
              </div>
            ))}
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

export default WhereHeard;
