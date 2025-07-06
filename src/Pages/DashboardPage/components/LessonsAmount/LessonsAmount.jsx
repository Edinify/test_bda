import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import  StudentsIcon  from "../../../../assets/icons/dashboard/students-svgrepo-com.svg?react";
import  ActiveStudentsIcon  from "../../../../assets/icons/dashboard/active-students-svgrepo-com.svg?react";
import  EventsIcon  from "../../../../assets/icons/dashboard/events-svgrepo-com.svg?react";
import  GroupsIcon  from "../../../../assets/icons/dashboard/groups-svgrepo-com.svg?react";
import  GroupsEndedIcon  from "../../../../assets/icons/dashboard/group-ended.svg?react";
import  GroupsCurrentIcon  from "../../../../assets/icons/dashboard/group-current.svg?react";
import  GroupsWaitingIcon  from "../../../../assets/icons/dashboard/group-waiting.svg?react";
import {
  getActiveStudentsCountAction,
  getAllEventsAction,
} from "../../../../redux/actions/dashboardAction";
import DateDropdown from "../../../../globalComponents/DateDropdown/DateDropdown";
import DateRangeModal from "../../../../globalComponents/Modals/DateRangeModal/DateRangeModal";

const LessonsAmount = () => {
  const dispatch = useDispatch();
  const {
    confirmedLessonsData,
    cancelledLessonsData,
    unviewedLessonsData,
    eventsData,
    allGroupsCount,
    waitingGroupsCount,
    currentGroupsCount,
    endedGroupsCount,
  } = useSelector((state) => state.dashboardData);
  const [openUnviewedLessons, setUnviewedLessons] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openDropdownCancelled, setOpenDropdownCancelled] = useState(false);
  const [openDropdownConfirmed, setOpenDropdownConfirmed] = useState(false);




  const applyConfirmedFilter = (startDate, endDate) => {
    dispatch(getAllEventsAction(startDate, endDate, ""));
    setOpenCalendar(false);
    setOpenDropdownCancelled(false);
    setOpenDropdownConfirmed(false);
  };
  const applyCancelledFilter = (startDate, endDate) => {
    dispatch(getActiveStudentsCountAction(startDate, endDate, ""));
    setOpenCalendar(false);
    setOpenDropdownCancelled(false);
    setOpenDropdownConfirmed(false);
  };
  const applyFilter = (startDate, endDate) => {
    if (openDropdownConfirmed) {
      applyConfirmedFilter(startDate, endDate);
    } else if (openDropdownCancelled) {
      applyCancelledFilter(startDate, endDate);
    }
  };
  const applyMonthsConfirmedFilter = (option) => {
    dispatch(getAllEventsAction("", "", option.key));
  };
  const applyMonthsCancelledFilter = (option) => {
    dispatch(getActiveStudentsCountAction("", "", option.key));
  };

  useEffect(() => {
    if (openDropdownCancelled) {
      setOpenDropdownConfirmed(false);
    }
  }, [openDropdownCancelled]);
  useEffect(() => {
    if (openDropdownConfirmed) {
      setOpenDropdownCancelled(false);
    }
  }, [openDropdownConfirmed]);
  useEffect(() => {
    if (openUnviewedLessons) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "overlay";
    }
  }, [openUnviewedLessons]);

  return (
    <>
      <section className="lessons-amount">
        <div className="content-box">
          <div className="left green">
            {/* <CheckIcon /> */}
            <StudentsIcon />
          </div>

          <div className="right">
            <div className="top">
              <h2 className="title">Tələbələr</h2>

              {/* { <DateDropdown
                optionType={"date"}
                calendar={true}
                setOpenCalendar={setOpenCalendar}
                openCalendar={openCalendar}
                openDropdown={openDropdownConfirmed}
                setOpenDropdown={setOpenDropdownConfirmed}
                applyMonthsFilter={applyMonthsConfirmedFilter}
              />} */}
            </div>
            <p className="amount">
              {confirmedLessonsData ? confirmedLessonsData : 0}
            </p>
          </div>
        </div>

        <div className="content-box cancelled-lessons">
          <div className="left red">
            <ActiveStudentsIcon />
          </div>

          <div className="right">
            <div className="top">
              <h2 className="title">Aktiv tələbələr</h2>
              {/* <DateDropdown
                optionType={"date"}
                calendar={true}
                setOpenCalendar={setOpenCalendar}
                openCalendar={openCalendar}
                openDropdown={openDropdownCancelled}
                setOpenDropdown={setOpenDropdownCancelled}
                applyMonthsFilter={applyMonthsCancelledFilter}
              /> */}
            </div>
            <p className="amount">
              {cancelledLessonsData ? cancelledLessonsData : 0}
            </p>
          </div>
        </div>

        <div className="content-box">
          <div className="left grey">
            <GroupsIcon />
          </div>

          <div className="right">
            <div className="top">
              <h2 className="title">Qruplar</h2>
            </div>
            <p className="amount">{allGroupsCount || 0}</p>
          </div>
        </div>
        <div className="content-box">
          <div className="left waiting">
            <GroupsWaitingIcon />
          </div>

          <div className="right">
            <div className="top">
              <h2 className="title">Yığılan qruplar</h2>
            </div>
            <p className="amount">{waitingGroupsCount || 0}</p>
          </div>
        </div>
        <div className="content-box">
          <div className="left current">
            <GroupsCurrentIcon />
          </div>

          <div className="right">
            <div className="top">
              <h2 className="title">Mövcud qruplar</h2>
            </div>
            <p className="amount">{currentGroupsCount || 0}</p>
          </div>
        </div>
        <div className="content-box">
          <div className="left ended">
            <GroupsEndedIcon />
          </div>

          <div className="right">
            <div className="top">
              <h2 className="title">Bitmiş qruplar</h2>
            </div>
            <p className="amount">{endedGroupsCount || 0}</p>
          </div>
        </div>
        <div className="content-box events">
          <div className="left green">
            <EventsIcon />
          </div>

          <div className="right">
            <div className="top">
              <h2 className="title">Tədbirlər</h2>

              {
                <DateDropdown
                  optionType={"date"}
                  calendar={true}
                  setOpenCalendar={setOpenCalendar}
                  openCalendar={openCalendar}
                  openDropdown={openDropdownConfirmed}
                  setOpenDropdown={setOpenDropdownConfirmed}
                  applyMonthsFilter={applyMonthsConfirmedFilter}
                />
              }
            </div>
            <p className="amount">{eventsData ? eventsData : 0}</p>
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

export default LessonsAmount;
