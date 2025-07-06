import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConsultationPaginationAction } from "../../redux/actions/consultationsActions";
import {
  CONSULTATION_MODAL_ACTION_TYPE,
  CONSULTATION_ALL_ACTIONS_TYPE,
} from "../../redux/actions-type";
import GlobalHead from "../../globalComponents/GlobalHead/GlobalHead";
import ConsultationData from "./components/ConsultationData";
// import HeadTabs from "../../globalComponents/HeadTabs/HeadTabs";
import { useLocation } from "react-router-dom";

const ConsultationsPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { totalLength, loading, consultationData } = useSelector(
    (state) => state.consultationPagination
  );
  const { consultationSearchValues, consultationPhoneSearchValues } =
    useSelector((state) => state.searchValues);

  const { startDate, endDate, status, course, whereComing, forDate } =
    useSelector((state) => state.filter);

  let userData = JSON.parse(localStorage.getItem("userData"));
  userData =
    userData.role !== "super-admin"
      ? userData.profiles
      : JSON.parse(localStorage.getItem("userData"));

  const getNextConsultation = () => {
    if (loading) return;

    dispatch(
      getConsultationPaginationAction(
        consultationData?.length || 0,
        consultationSearchValues || "",
        consultationPhoneSearchValues || "",
        status,
        startDate,
        endDate,
        course?._id,
        whereComing,
        forDate
      )
    );
  };

  const openModal = () => {
    dispatch({
      type: CONSULTATION_MODAL_ACTION_TYPE.GET_CONSULTATION_MODAL,
      payload: { data: {}, openModal: true },
    });
  };
  const searchData = (e) => {
    e.preventDefault();

    dispatch({
      type: CONSULTATION_ALL_ACTIONS_TYPE.RESET_CONSULTATION_PAGINATION,
    });

    dispatch(
      getConsultationPaginationAction(
        0,
        consultationSearchValues,
        consultationPhoneSearchValues,
        status,
        startDate,
        endDate,
        course?._id || "",
        whereComing,
        forDate
      )
    );
  };

  useEffect(() => {
    dispatch({
      type: CONSULTATION_ALL_ACTIONS_TYPE.RESET_CONSULTATION_PAGINATION,
    });
    dispatch(
      getConsultationPaginationAction(0, "", "", "", "", "", "", "", forDate)
    );

    return () => {
      dispatch({
        type: CONSULTATION_ALL_ACTIONS_TYPE.RESET_CONSULTATION_PAGINATION,
      });
    };
  }, [location.pathname]);

  const consultationFilter = () => {
    dispatch({
      type: CONSULTATION_ALL_ACTIONS_TYPE.RESET_CONSULTATION_PAGINATION,
    });
    dispatch(
      getConsultationPaginationAction(
        0,
        consultationSearchValues,
        consultationPhoneSearchValues,
        status,
        startDate,
        endDate,
        course?._id,
        whereComing,
        forDate
      )
    );
  };

  return (
    <div className="details-page consultation ">
      <GlobalHead
        searchData={searchData}
        openModal={openModal}
        DATA_SEARCH_VALUE={"CONSULTATION_SEARCH_VALUE"}
        dataSearchValues={consultationSearchValues}
        phoneSearchValues={consultationPhoneSearchValues}
        PHONE_SEACH_VALUE={"CONSULTATION_PHONE_SEARCH_VALUE"}
        filter={consultationFilter}
        statusType="consultation"
        profile={"consultation"}
        count={totalLength}
      />

      <ConsultationData
        getNextConsultation={getNextConsultation}
        userData={userData}
      />
    </div>
  );
};

export default ConsultationsPage;
