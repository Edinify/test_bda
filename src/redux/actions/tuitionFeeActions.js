import axios from "axios";
import {
  DOWNLOAD_EXCEL_ACTION_TYPE,
  TUITION_FEE_ALL_ACTIONS_TYPE,
  TUITION_FEE_MODAL_ACTION_TYPE,
} from "../actions-type";
import { toast } from "react-toastify";
import { logoutAction } from "./auth";
import { apiRoot } from "../../apiRoot";

const refreshApi = axios.create({
  baseURL: `${apiRoot}/user/auth/refresh_token`,
  withCredentials: true,
});

const API = axios.create({
  baseURL: `${apiRoot}/tution-fee`,
  withCredentials: true,
});
const REGISTERAPI = axios.create({
  baseURL: `${apiRoot}/user/auth`,
  withCredentials: true,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("auth")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("auth")).AccessToken
    }`;
  }

  return req;
});

REGISTERAPI.interceptors.request.use((req) => {
  if (localStorage.getItem("auth")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("auth")).AccessToken
    }`;
  }

  return req;
});

const pageLoading = (loadingValue) => ({
  type: TUITION_FEE_ALL_ACTIONS_TYPE.TUITION_FEE_LOADING,
  payload: loadingValue,
});
export const setLoadingAllTuitionFeeAction = (loadingValue) => ({
  type: TUITION_FEE_ALL_ACTIONS_TYPE.TUITION_FEE_LOADING_ALL,
  payload: loadingValue,
});
const modalLoading = (loadingValue) => ({
  type: TUITION_FEE_MODAL_ACTION_TYPE.TUITION_FEE_MODAL_LOADING,
  payload: loadingValue,
});

const downloadExcelLoading = (value) => ({
  type: DOWNLOAD_EXCEL_ACTION_TYPE.LOADING,
  payload: value,
});

const toastSuccess = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};
const toastError = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 2000,
    toastClassName: "custom-toast",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export const getTuitionFeePaginationAction =
  (length, searchQuery, coursesIds, groupsIds, status) => async (dispatch) => {
    dispatch(pageLoading(true));
    try {
      const { data } = await API.get(
        `/?length=${length}&searchQuery=${searchQuery}&coursesIds=${
          coursesIds || ""
        }&groupsIds=${groupsIds || ""}&status=${status || "all"}`
      );

      dispatch({
        type: TUITION_FEE_ALL_ACTIONS_TYPE.GET_TUITION_FEE_PAGINATION,
        payload: data,
      });
    } catch (error) {
      const originalRequest = error.config;
      if (error?.response?.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const token = await refreshApi.get("/");
          localStorage.setItem(
            "auth",
            JSON.stringify({
              AccessToken: token.data.accesstoken,
            })
          );

          const { data } = await API.get(
            `/?length=${length}&searchQuery=${searchQuery}`
          );
          dispatch({
            type: TUITION_FEE_ALL_ACTIONS_TYPE.GET_TUITION_FEE_PAGINATION,
            payload: data,
          });
        } catch (error) {
          if (error?.response?.status === 401) {
            return dispatch(logoutAction());
          }
        }
      }
    } finally {
      dispatch(pageLoading(false));
    }
  };

export const updateTuitionFeeAction = (newData) => async (dispatch) => {
  dispatch(modalLoading(true));
  try {
    const { data } = await API.patch(`/payment`, newData);

    dispatch({
      type: TUITION_FEE_ALL_ACTIONS_TYPE.UPDATE_TUITION_FEE,
      payload: data,
    });
    dispatch({
      type: TUITION_FEE_MODAL_ACTION_TYPE.UPDATE_TUITION_FEE_PAYMENTS,
      payload: {
        data: data,
        openModal: false,
        openConfirmModal: true,
      },
    });
    toastSuccess("Təhsil haqqı yeniləndi");
  } catch (error) {
    const originalRequest = error.config;
    if (error?.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const token = await refreshApi.get("/");
        localStorage.setItem(
          "auth",
          JSON.stringify({
            AccessToken: token.data.accesstoken,
          })
        );
        // const { data } = await API.patch(`/${_id}`, teacherData);
        // dispatch({
        //   type: TEACHER_ALL_ACTIONS_TYPE.UPDATE_TEACHER,
        //   payload: data,
        // });
        // dispatch({
        //   type: TEACHERS_MODAL_ACTION_TYPE.TEACHER_OPEN_MODAL,
        //   payload: false,
        // });
        toastSuccess("Xəta baş verdi!");
      } catch (error) {
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
    if (error?.response?.data?.key === "email-already-exist") {
      toastError("Bu email ilə istifadəçi mövcuddur");
    }
    if (error?.response?.data?.key === "has-current-week-lessons") {
      toastError("Cari həftədə  dərsi olan təlimçi yenilənə bilməz");
    }
  } finally {
    dispatch(modalLoading(false));
  }
};

export const downloadTuitionFeeExcelAction =
  ({ searchQuery, coursesIds, groupsIds, status }) =>
  async (dispatch) => {
    dispatch(downloadExcelLoading(true));
    try {
      const response = await API.get(
        `/excel?searchQuery=${searchQuery || ""}&coursesIds=${
          coursesIds || ""
        }&groupsIds=${groupsIds}&status=${status}`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "tuitionfee.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      dispatch(downloadExcelLoading(false));
    } catch (error) {
      dispatch(downloadExcelLoading(false));
      toastError("Xəta baş verdi!");
      console.log(error.message);
    }
  };
