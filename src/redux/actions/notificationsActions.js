import axios from "axios";
import { NOTIFICATION_ACTION_TYPE } from "../actions-type";
import { apiRoot } from "../../apiRoot";
import { logoutAction } from "./auth";

const API = axios.create({
  baseURL: `${apiRoot}/notification`,
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

const refreshApi = axios.create({
  baseURL: `${apiRoot}/user/auth/refresh_token`,
});

export const getNotificationsAdminAction = () => async (dispatch) => {
  dispatch(setLoadingNotificationAction(true));
  try {
    const { data } = await API.get("/admin");
    dispatch({
      type: NOTIFICATION_ACTION_TYPE.GET_NOTIFICATION,
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

        const { data } = await API.get("/admin");
        dispatch({
          type: NOTIFICATION_ACTION_TYPE.GET_NOTIFICATION,
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
    dispatch(setLoadingNotificationAction(false));
  }
};

export const getNotifications = () => async (dispatch) => {
  dispatch(setLoadingNotificationAction(true));
  try {
    const { data } = await API.get("/");

    console.log(data, "notificatipns");
    dispatch({
      type: NOTIFICATION_ACTION_TYPE.GET_NOTIFICATION,
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

        const { data } = await API.get("/admin");
        dispatch({
          type: NOTIFICATION_ACTION_TYPE.GET_NOTIFICATION,
          payload: data,
        });
      } catch (error) {
        // console.log(error);
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
  } finally {
    dispatch(setLoadingNotificationAction(false));
  }
};

export const getNotificationsTeacherAction = () => async (dispatch) => {
  dispatch(setLoadingNotificationAction(true));
  try {
    const { data } = await API.get("/teacher");
    dispatch({
      type: NOTIFICATION_ACTION_TYPE.GET_NOTIFICATION,
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

        const { data } = await API.get("/teacher");
        dispatch({
          type: NOTIFICATION_ACTION_TYPE.GET_NOTIFICATION,
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
    dispatch(setLoadingNotificationAction(false));
  }
};

export const getNotificationsStudentAction = () => async (dispatch) => {
  dispatch(setLoadingNotificationAction(true));
  try {
    const { data } = await API.get("/student");
    dispatch({
      type: NOTIFICATION_ACTION_TYPE.GET_NOTIFICATION,
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

        const { data } = await API.get("/student");
        dispatch({
          type: NOTIFICATION_ACTION_TYPE.GET_NOTIFICATION,
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
    dispatch(setLoadingNotificationAction(false));
  }
};

export const viewedAllNotifications = () => async (dispatch) => {
  try {
    const { data } = await API.patch("/viewed");
    dispatch({
      type: NOTIFICATION_ACTION_TYPE.VIEWED_NOTIFICATION,
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

        const { data } = await API.patch("/viewed");
        dispatch({
          type: NOTIFICATION_ACTION_TYPE.VIEWED_NOTIFICATION,
          payload: data,
        });
      } catch (error) {
        // // console.log(error);
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
  }
};

export const setLoadingNotificationAction = (loadingValue) => ({
  type: NOTIFICATION_ACTION_TYPE.NOTIFICATION_LOADING,
  payload: loadingValue,
});
