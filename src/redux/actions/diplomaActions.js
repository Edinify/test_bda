import axios from "axios";
import {
  DIPLOMA_ALL_ACTIONS_TYPE,
  DIPLOMA_MODAL_ACTION_TYPE,
} from "../actions-type";
import { apiRoot } from "../../apiRoot";
import { toast } from "react-toastify";
import { logoutAction } from "./auth";

const API = axios.create({
  baseURL: `${apiRoot}/diploma`,
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

const diplomaModalLoading = (loadingValue) => ({
  type: DIPLOMA_MODAL_ACTION_TYPE.DIPLOMA_MODAL_LOADING,
  payload: loadingValue,
});

const setLoadingDiplomaAction = (loadingValue) => ({
  type: DIPLOMA_ALL_ACTIONS_TYPE.DIPLOMA_LOADING,
  payload: loadingValue,
});

const diplomaModalOpen = (value) => ({
  type: DIPLOMA_MODAL_ACTION_TYPE.DIPLOMA_OPEN_MODAL,
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

export const getDiplomaPaginationAction =
  (length, searchQuery, groupId,courseId) => async (dispatch) => {
    setLoadingDiplomaAction(true);
    try {
      const { data } = await API.get(
        `/?length=${length || 0}&searchQuery=${searchQuery || ""}&groupId=${
          groupId || ""
        }&courseId=${courseId || ""}`
      );

      dispatch({
        type: DIPLOMA_ALL_ACTIONS_TYPE.GET_DIPLOMA_PAGINATION,
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
            `/?length=${length || 0}&searchQuery=${searchQuery || ""}&groupId=${
              groupId || ""
            }`
          );

          dispatch({
            type: DIPLOMA_ALL_ACTIONS_TYPE.GET_DIPLOMA_PAGINATION,
            payload: data,
          });
        } catch (error) {
          if (error?.response?.status === 401) {
            return dispatch(logoutAction());
          }
        }
      }
    } finally {
      setLoadingDiplomaAction(false);
    }
  };

export const updateDiplomaAction = (newData) => async (dispatch) => {
  dispatch(diplomaModalLoading(true));
  try {
    const { data } = await API.patch(`/`, newData);
    dispatch({ type: DIPLOMA_ALL_ACTIONS_TYPE.UPDATE_DIPLOMA, payload: data });
    dispatch(diplomaModalOpen(false));
    toastSuccess("Diplom yeniləndi");
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

        const { data } = await API.patch(`/`, newData);
        dispatch({
          type: DIPLOMA_ALL_ACTIONS_TYPE.UPDATE_DIPLOMA,
          payload: data,
        });
        dispatch(diplomaModalOpen(false));
        toastSuccess("Diplom yeniləndi");
      } catch (error) {
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
  } finally {
    dispatch(diplomaModalLoading(false));
  }
};
