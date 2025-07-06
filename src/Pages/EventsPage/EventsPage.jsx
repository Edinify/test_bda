import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  EVENTS_MODAL_ACTION_TYPE,
  EVENTS_ALL_ACTIONS_TYPE,
} from "../../redux/actions-type";
import GlobalHead from "../../globalComponents/GlobalHead/GlobalHead";
import { useCustomHook } from "../../globalComponents/GlobalFunctions/globalFunctions";
import EventsData from "./components/EventsData";
import { getEventsPaginationAction } from "../../redux/actions/eventsActions";

const EventsPage = () => {
  const dispatch = useDispatch();
  const { totalLength, loading, events } = useSelector(
    (state) => state.eventsPagination
  );
  const { eventsSearchValues } = useSelector((state) => state.searchValues);
  const [eventPageNum, setEventPageNum] = useState(1);
  const { user } = useSelector((state) => state.user);

  const openModal = () => {
    dispatch({
      type: EVENTS_MODAL_ACTION_TYPE.GET_EVENTS_MODAL,
      payload: { data: { status: false }, openModal: true },
    });
  };
  // ============

  const getNextTeachers = () => {
    if (loading) return;
    if (eventsSearchValues) {
      dispatch(
        getEventsPaginationAction(events?.length || 0, eventsSearchValues)
      );
    } else {
      dispatch(getEventsPaginationAction(events?.length || 0, ""));
    }
  };

  // ========

  const searchData = (e) => {
    e.preventDefault();
    dispatch({
      type: EVENTS_ALL_ACTIONS_TYPE.RESET_EVENTS_PAGINATION,
    });
    dispatch(getEventsPaginationAction(0, eventsSearchValues));
    setEventPageNum(1);
  };

  useEffect(() => {
    if (eventsSearchValues) {
      dispatch(getEventsPaginationAction(0, eventsSearchValues));
    } else {
      dispatch(getEventsPaginationAction(0, ""));
    }

    return () => {
      dispatch({
        type: EVENTS_ALL_ACTIONS_TYPE.RESET_EVENTS_PAGINATION,
      });
    };
  }, []);

  return (
    <div className="details-page courses ">
      <GlobalHead
        searchData={searchData}
        openModal={openModal}
        DATA_SEARCH_VALUE={"EVENTS_SEARCH_VALUE"}
        dataSearchValues={eventsSearchValues}
        profile="events"
        count={totalLength}
      />

      <EventsData userData={user} getNextTeachers={getNextTeachers} />

      {/* <GlobalHead 
      searchData={searchData} 
      openModal={openModal} 
      DATA_SEARCH_VALUE={'COURSES_SEARCH_VALUE'} 
      dataSearchValues={coursesSearchValues}
      statusType="courses"
      />
      <CoursesData coursePageNum={coursePageNum} getPageNumber={getPageNumber} /> */}
    </div>
  );
};

export default EventsPage;
