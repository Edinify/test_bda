import axios from "axios";
import {
  CAREER_ALL_ACTIONS_TYPE,
  CAREER_MODAL_ACTION_TYPE,
  DOWNLOAD_EXCEL_ACTION_TYPE,
} from "../actions-type";
import { toast } from "react-toastify";
import { logoutAction } from "./auth";
import { apiRoot } from "../../apiRoot";

const API = axios.create({
  baseURL: `${apiRoot}/career`,
  withCredentials: true,
});

const refreshApi = axios.create({
  baseURL: `${apiRoot}/user/auth/refresh_token`,
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
const pageLoading = (loadingValue) => ({
  type: CAREER_ALL_ACTIONS_TYPE.CAREER_LOADING,
  payload: loadingValue,
});
const modalLoading = (loadingValue) => ({
  type: CAREER_MODAL_ACTION_TYPE.CAREER_MODAL_LOADING,
  payload: loadingValue,
});
const downloadExcelLoading = (value) => ({
  type: DOWNLOAD_EXCEL_ACTION_TYPE.LOADING,
  payload: value,
});

export const getCareerPaginationAction =
  (length, searchQuery, courseId = "", groupId = "", status) =>
  async (dispatch) => {
    dispatch(pageLoading(true));

    try {
      const { data } = await API.get(
        `/?length=${length}&searchQuery=${searchQuery}&courseId=${courseId}&groupId=${groupId}&studentGroupStatus=${status||""}`
      );

      dispatch({
        type: CAREER_ALL_ACTIONS_TYPE.GET_CAREER_PAGINATION,
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
            `/?length=${length}&searchQuery=${searchQuery}&courseId=${courseId}&groupId=${groupId}`
          );

          dispatch({
            type: CAREER_ALL_ACTIONS_TYPE.GET_CAREER_PAGINATION,
            payload: data,
          });
        } catch (error) {
          // // console.log(error);
          if (error?.response?.status === 401) {
            return dispatch(logoutAction());
          }
        }
      }
    } finally {
      dispatch(pageLoading(false));
    }
  };

export const updateCareerAction = (newData) => async (dispatch) => {
  dispatch(modalLoading(true));
  try {
    const { data } = await API.patch(`/`, newData);

    dispatch({
      type: CAREER_ALL_ACTIONS_TYPE.UPDATE_CAREER,
      payload: data,
    });
    dispatch({
      type: CAREER_MODAL_ACTION_TYPE.CAREER_OPEN_MODAL,
      payload: false,
    });

    toastSuccess("Karyera yeniləndi");
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
        // const { data } = await API.patch(`/${_id}`, careerData);
        // dispatch({
        //   type: CAREER_ALL_ACTIONS_TYPE.UPDATE_CAREER,
        //   payload: data,
        // });
        // dispatch({
        //   type: CAREER_MODAL_ACTION_TYPE.CAREER_OPEN_MODAL,
        //   payload: false,
        // });
        // toastSuccess("İşçi yeniləndi");
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
      toastError("Cari həftədə  dərsi olan əməkdaş yenilənə bilməz");
    }
  } finally {
    dispatch(modalLoading(false));
  }
};

export const downloadCareersExcelAction = () => async (dispatch) => {
  dispatch(downloadExcelLoading(true));
  try {
    const response = await API.get(`/excel`, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "careers.xlsx");
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
