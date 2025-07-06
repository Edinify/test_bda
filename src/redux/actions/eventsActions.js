import axios from "axios";
import {
  COURSES_ALL_ACTIONS_TYPE,
  EVENTS_ALL_ACTIONS_TYPE,
  EVENTS_MODAL_ACTION_TYPE,
} from "../actions-type";
import { toast } from "react-toastify";
import { logoutAction } from "./auth";
import { apiRoot } from "../../apiRoot";

const API = axios.create({
  baseURL: `${apiRoot}/event`,
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
  withCredentials: true,
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
  type: EVENTS_ALL_ACTIONS_TYPE.EVENT_LOADING,
  payload: loadingValue,
});
const modalLoading = (loadingValue) => ({
  type: EVENTS_MODAL_ACTION_TYPE.EVENT_MODAL_LOADING,
  payload: loadingValue,
});
const eventModalOpen = (value) => ({
  type: EVENTS_MODAL_ACTION_TYPE.EVENT_OPEN_MODAL,
  payload: value,
});

export const getEventsPaginationAction =
  (length, searchQuery) => async (dispatch) => {
    dispatch(pageLoading(true));
    try {
      const { data } = await API.get(
        `/pagination/?length=${length}&searchQuery=${searchQuery}`
      );
      console.log(data);
      dispatch({
        type: EVENTS_ALL_ACTIONS_TYPE.GET_EVENTS_PAGINATION,
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
            `/pagination/?length=${length}&searchQuery=${searchQuery}`
          );
          dispatch({
            type: EVENTS_ALL_ACTIONS_TYPE.GET_EVENTS_PAGINATION,
            payload: data,
          });
        } catch (error) {
          // // console.log(error);
          if (error?.response?.status === 401) {
            return dispatch(logoutAction());
          }
        }
      }
      if (error?.response?.status === 403) {
        dispatch(logoutAction());
      }
    } finally {
      dispatch(pageLoading(false));
    }
  };

export const createEventAction = (eventData) => async (dispatch) => {
  dispatch(modalLoading(true));

  try {
    const { data } = await API.post("/", eventData);
    dispatch({
      type: EVENTS_ALL_ACTIONS_TYPE.CREATE_EVENT,
      payload: data,
    });
    dispatch(eventModalOpen(false));
    toastSuccess("Yeni tədbir yaradıldı");
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
        const { data } = await API.post("/", eventData);
        dispatch(getEventsPaginationAction(data.lastPage, ""));
        dispatch(eventModalOpen(false));
        toastSuccess("Yeni fənn yaradıldı");
      } catch (error) {
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
    if (error?.response?.status === 403) {
      dispatch(logoutAction());
    }
    // // console.log(error);
    if (error?.response?.data?.key === "course-already-exists") {
      toastError("Bu ad ilə fənn artıq mövcuddur");
    }
  } finally {
    dispatch(modalLoading(false));
  }
};
export const updateEventAction = (_id, eventData) => async (dispatch) => {
  dispatch(modalLoading(true));
  try {
    const { data } = await API.patch(`/${_id}`, eventData);
    dispatch({ type: EVENTS_ALL_ACTIONS_TYPE.UPDATE_EVENT, payload: data });
    dispatch(eventModalOpen(false));
    toastSuccess("Tədbir yeniləndi");
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
        const { data } = await API.patch(`/${_id}`, eventData);
        dispatch({
          type: COURSES_ALL_ACTIONS_TYPE.UPDATE_COURSE,
          payload: data,
        });
        dispatch(eventModalOpen(false));
        toastSuccess("Fənn yeniləndi");
      } catch (error) {
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
    // // console.log(error);
    toastError(error?.response?.data?.message);
    if (error?.response?.data?.key === "course-already-exists") {
      dispatch(eventModalOpen(true));
      toastError("Fənn artıq mövcuddur");
    }
  } finally {
    dispatch(modalLoading(false));
  }
};

export const deleteEventAction = (id) => async (dispatch) => {
  try {
    const { data } = await API.delete(`/${id}`);

    dispatch({ type: EVENTS_ALL_ACTIONS_TYPE.DELETE_EVENT, payload: data._id });

    toastSuccess("Tədbir silindi");
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
        const { data } = await API.delete(`/${id}`);

        dispatch({
          type: EVENTS_ALL_ACTIONS_TYPE.DELETE_EVENT,
          payload: data._id,
        });
        toastSuccess("Fənn silindi");
      } catch (error) {
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
    // console.log(error);
    toastError(error?.response?.data.message);
  }
};

export const confirmEventChangesAction =
  (_id, eventData) => async (dispatch) => {
    dispatch(modalLoading(true));
    try {
      const { data } = await API.patch(`/changes/confirm/${_id}`, eventData);

      dispatch({ type: EVENTS_ALL_ACTIONS_TYPE.UPDATE_EVENT, payload: data });

      dispatch({
        type: EVENTS_MODAL_ACTION_TYPE.CLOSE_EVENT_CONFIRM_MODAL,
      });
      toastSuccess("Yeniliklər təsdiqləndi!");
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
          await API.patch(`/${_id}`, eventData);
          // dispatch({
          //   type: TEACHER_ALL_ACTIONS_TYPE.UPDATE_TEACHER,
          //   payload: data,
          // });
          dispatch({
            type: EVENTS_MODAL_ACTION_TYPE.CLOSE_EVENT_CONFIRM_MODAL,
          });
          toastSuccess("fənn təsdiqləndi!");
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

export const cancelCourseChangesAction =
  (_id, eventData) => async (dispatch) => {
    dispatch(modalLoading(true));
    try {
      const { data } = await API.patch(`/changes/cancel/${_id}`, eventData);

      dispatch({ type: COURSES_ALL_ACTIONS_TYPE.UPDATE_COURSE, payload: data });

      dispatch({
        type: EVENTS_MODAL_ACTION_TYPE.CLOSE_EVENT_CONFIRM_MODAL,
      });
      toastSuccess("Yeniliklər təsdiqləndi!");
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
           await API.patch(`/${_id}`, eventData);
          // dispatch({
          //   type: TEACHER_ALL_ACTIONS_TYPE.UPDATE_TEACHER,
          //   payload: data,
          // });
          dispatch({
            type: EVENTS_MODAL_ACTION_TYPE.CLOSE_EVENT_CONFIRM_MODAL,
          });
          toastSuccess("fənn təsdiqləndi!");
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
