import axios from "axios";
import {
  WORKER_ALL_ACTIONS_TYPE,
  WORKER_MODAL_ACTION_TYPE,
} from "../actions-type";
import { toast } from "react-toastify";
import { logoutAction } from "./auth";
import { apiRoot } from "../../apiRoot";

const API = axios.create({
  baseURL: `${apiRoot}/user/worker`,
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
  type: WORKER_ALL_ACTIONS_TYPE.WORKER_LOADING,
  payload: loadingValue,
});
const setLoadingCoursesAction = (loadingValue) => ({
  type: WORKER_ALL_ACTIONS_TYPE.WORKER_LOADING,
  payload: loadingValue,
});
const modalLoading = (loadingValue) => ({
  type: WORKER_MODAL_ACTION_TYPE.WORKER_MODAL_LOADING,
  payload: loadingValue,
});

export const getWorkersAction = () => async (dispatch) => {
  try {
    const { data } = await API.get("/all");
    dispatch({ type: WORKER_ALL_ACTIONS_TYPE.GET_ALL_WORKERS, payload: data });
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
          type: WORKER_ALL_ACTIONS_TYPE.GET_ALL_WORKERS,
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

export const getWorkersActiveAction = () => async (dispatch) => {
  try {
    const { data } = await API.get("/active");
    dispatch({
      type: WORKER_ALL_ACTIONS_TYPE.GET_ACTIVE_WORKER,
      payload: data,
    });
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
        const { data } = await API.get("/active");
        dispatch({
          type: WORKER_ALL_ACTIONS_TYPE.GET_ACTIVE_WORKER,
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

export const getWorkersPaginationAction =
  (length, searchQuery) => async (dispatch) => {
    dispatch(setLoadingCoursesAction(true));
    try {
      const { data } = await API.get(
        `/?length=${length}&searchQuery=${searchQuery}`
      );
      dispatch({
        type: WORKER_ALL_ACTIONS_TYPE.GET_WORKER_PAGINATION,
        payload: data,
      });
    } catch (error) {
      console.log(error);
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
            type: WORKER_ALL_ACTIONS_TYPE.GET_WORKER_PAGINATION,
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

export const createWorkerAction = (workerData) => async (dispatch) => {
  // // console.log(workerData);
  dispatch(modalLoading(true));
  try {
    const { data } = await API.post("/create", workerData);
    dispatch({
      type: WORKER_ALL_ACTIONS_TYPE.CREATE_WORKER,
      payload: data,
    });
    dispatch({
      type: WORKER_MODAL_ACTION_TYPE.WORKER_OPEN_MODAL,
      payload: false,
    });
    toastSuccess("Yeni əməkdaş yaradıldı");
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
        const { data } = await API.post("/create", workerData);
        dispatch(getWorkersPaginationAction(data.lastPage, ""));
        dispatch({
          type: WORKER_MODAL_ACTION_TYPE.WORKER_OPEN_MODAL,
          payload: false,
        });
        toastSuccess("Yeni əməkdaş yaradıldı");
      } catch (error) {
        // // console.log(error);
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }

    if (error?.response?.data?.key === "email-already-exist") {
      toastError("Bu email ilə istifadəçi mövcuddur");
    }
    // // console.log(error);
  } finally {
    dispatch(modalLoading(false));
  }
};

export const updateWorkerAction = (_id, workerData) => async (dispatch) => {
  dispatch(modalLoading(true));
  try {
    const { data } = await API.patch(`/${_id}`, workerData);
    dispatch({ type: WORKER_ALL_ACTIONS_TYPE.UPDATE_WORKER, payload: data });
    dispatch({
      type: WORKER_MODAL_ACTION_TYPE.WORKER_OPEN_MODAL,
      payload: false,
    });
    toastSuccess("İşçi yeniləndi");
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
        const { data } = await API.patch(`/${_id}`, workerData);
        dispatch({
          type: WORKER_ALL_ACTIONS_TYPE.UPDATE_WORKER,
          payload: data,
        });
        dispatch({
          type: WORKER_MODAL_ACTION_TYPE.WORKER_OPEN_MODAL,
          payload: false,
        });
        toastSuccess("İşçi yeniləndi");
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

export const deleteWorkerAction = (id) => async (dispatch) => {
  try {
    const { data } = await API.delete(`/${id}`);

    dispatch({
      type: WORKER_ALL_ACTIONS_TYPE.DELETE_WORKER,
      payload: data._id,
    });

    toastSuccess("İşçi silindi");
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
          type: WORKER_ALL_ACTIONS_TYPE.DELETE_WORKER,
          payload: data._id,
        });
        toastSuccess("İşçi silindi");
      } catch (error) {
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
    if (error?.response?.data?.key === "has-current-week-lessons") {
      toastError("Cari həftədə  dərsi olan əməkdaş silinə bilməz");
    }
    // console.log(error);
    toastError(error?.response?.data.message);
  }
};


