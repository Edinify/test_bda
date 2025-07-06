import axios  from "axios";
import {
  GROUP_WEEKLY_ACTION_TYPE
} from "../actions-type";


const API = axios.create({
  baseURL: `${apiRoot}/group`,
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


export const getWeeklyGroupsAction = () => async (dispatch) => {
  try {
    const { data } = await API.get("/all");
    dispatch({ type: GROUP_WEEKLY_ACTION_TYPE.GET_GROUP_WEEKLY_TABLE, payload: data });
  } catch (error) {
    // // console.log(error);
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
        const { data } = await API.get("/all");
        dispatch({
          type: GROUP_ALL_ACTIONS_TYPE.GET_ALL_GROUPS,
          payload: data,
        });
      } catch (error) {
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
        // // console.log(error);
      }
    }
  }
};