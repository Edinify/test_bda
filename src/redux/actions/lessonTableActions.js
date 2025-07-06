import axios from "axios";
import {
  LESSON_TABLE_ALL_ACTIONS_TYPE,
  LESSON_TABLE_MODAL_ACTION_TYPE,
} from "../actions-type";
import { toast } from "react-toastify";
import { logoutAction } from "./auth";
import { apiRoot } from "../../apiRoot";

const API = axios.create({
  baseURL: `${apiRoot}/lesson`,
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
  type: LESSON_TABLE_ALL_ACTIONS_TYPE.LESSON_TABLE_LOADING,
  payload: loadingValue,
});
const modalLoading = (loadingValue) => ({
  type: LESSON_TABLE_MODAL_ACTION_TYPE.LESSON_TABLE_MODAL_LOADING,
  payload: loadingValue,
});

export const getLessonTablePaginationAction =
  (
    length,
    searchQuery,
    groupId,
    teacherId = "",
    startDate = "",
    endDate = "",
    status = ""
  ) =>
  async (dispatch) => {
    dispatch(pageLoading(true));
    try {
      const { data } = await API.get(
        `/?length=${length}&searchQuery=${searchQuery}&groupId=${groupId}&teacherId=${teacherId}&startDate=${
          startDate || ""
        }&endDate=${endDate || ""}&status=${status || ""}`
      );
      // console.log(length);
      // console.log(data, "lesson paginationnnn");

      dispatch({
        type: LESSON_TABLE_ALL_ACTIONS_TYPE.GET_LESSON_TABLE_PAGINATION,
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
            `/?length=${length}&searchQuery=${searchQuery}&groupId=${groupId}&teacherId=${teacherId}&startDate=${
              startDate || ""
            }&endDate=${endDate || ""}&status=${status || ""}`
          );

          dispatch({
            type: LESSON_TABLE_ALL_ACTIONS_TYPE.GET_LESSON_TABLE_PAGINATION,
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

export const createLessonTableAction =
  (lessonTableData) => async (dispatch) => {
    dispatch(modalLoading(true));
    try {
      const { data } = await API.post("/", lessonTableData);

      dispatch({
        type: LESSON_TABLE_ALL_ACTIONS_TYPE.CREATE_LESSON_TABLE,
        payload: data,
      });
      dispatch({
        type: LESSON_TABLE_MODAL_ACTION_TYPE.LESSON_TABLE_OPEN_MODAL,
        payload: false,
      });

      toastSuccess("Yeni dərs yaradıldı");
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
          const { data } = await API.post("/create", lessonTableData);

          dispatch({
            type: LESSON_TABLE_ALL_ACTIONS_TYPE.CREATE_LESSON_TABLE,
            payload: data,
          });
          dispatch({
            type: LESSON_TABLE_MODAL_ACTION_TYPE.LESSON_TABLE_OPEN_MODAL,
            payload: false,
          });
          toastSuccess("Yeni dərs yaradıldı");
        } catch (error) {
          // // console.log(error);
          if (error?.response?.status === 401) {
            return dispatch(logoutAction());
          }
        }
      }
      // // console.log(error);
    } finally {
      dispatch(modalLoading(false));
    }
  };

export const updateLessonTableAction =
  (_id, lessonTableData) => async (dispatch) => {
    dispatch(modalLoading(true));

    try {
      const { data } = await API.patch(`/${_id}`, lessonTableData);

      dispatch({
        type: LESSON_TABLE_ALL_ACTIONS_TYPE.UPDATE_LESSON_TABLE,
        payload: data,
      });
      dispatch({
        type: LESSON_TABLE_MODAL_ACTION_TYPE.LESSON_TABLE_OPEN_MODAL,
        payload: false,
      });
      dispatch({
        type: LESSON_TABLE_MODAL_ACTION_TYPE.STUDENT_MODAL,
        payload: false,
      });
      toastSuccess("Dərs yeniləndi");
    } catch (error) {
      if (error?.response?.data?.key === "already-lesson-confirmed") {
        toastError("Dərs artıq təstiqlənib!");
      }

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
          const { data } = await API.patch(`/${_id}`, lessonTableData);
          dispatch({
            type: LESSON_TABLE_ALL_ACTIONS_TYPE.UPDATE_LESSON_TABLE,
            payload: data,
          });
          dispatch({
            type: LESSON_TABLE_MODAL_ACTION_TYPE.LESSON_TABLE_OPEN_MODAL,
            payload: false,
          });
          toastSuccess("Dərs yeniləndi");
        } catch (error) {
          if (error?.response?.status === 401) {
            return dispatch(logoutAction());
          }
        }
      }
    } finally {
      dispatch(modalLoading(false));
    }
  };

export const deleteLessonTableAction = (id) => async (dispatch) => {
  try {
    const { data } = await API.delete(`/${id}`);

    dispatch({
      type: LESSON_TABLE_ALL_ACTIONS_TYPE.DELETE_LESSON_TABLE,
      payload: data,
    });
    toastSuccess("Dərs silindi");
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
          type: LESSON_TABLE_ALL_ACTIONS_TYPE.DELETE_LESSON_TABLE,
          payload: data,
        });
        toastSuccess("Dərs silindi");
      } catch (error) {
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
    if (error?.response?.data?.key === "has-current-week-lessons") {
      toastError("Cari həftədə  dərsi olan dərs silinə bilməz");
    }

    toastError(error?.response?.data.message);
  }
};

export const confirmLessonTableChangesAction =
  (_id, lessonTableData) => async (dispatch) => {
    dispatch(modalLoading(true));

    try {
      const { data } = await API.patch(
        `/changes/confirm/${_id}`,
        lessonTableData
      );

      dispatch({
        type: LESSON_TABLE_ALL_ACTIONS_TYPE.UPDATE_LESSON_TABLE,
        payload: data,
      });
      dispatch({
        type: LESSON_TABLE_MODAL_ACTION_TYPE.CLOSE_LESSON_CONFIRM_MODAL,
        payload: false,
      });

      toastSuccess("Yeniləmələr təsdiqləndi!");
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
          const { data } = await API.patch(`/${_id}`, lessonTableData);
          dispatch({
            type: LESSON_TABLE_ALL_ACTIONS_TYPE.UPDATE_LESSON_TABLE,
            payload: data,
          });
          dispatch({
            type: LESSON_TABLE_MODAL_ACTION_TYPE.LESSON_TABLE_OPEN_MODAL,
            payload: false,
          });
          toastSuccess("Dərs yeniləndi");
        } catch (error) {
          if (error?.response?.status === 401) {
            return dispatch(logoutAction());
          }
        }
      }
    } finally {
      dispatch(modalLoading(false));
    }
  };

export const cancelLessonTableChangesAction =
  (_id, lessonTableData) => async (dispatch) => {
    dispatch(modalLoading(true));

    try {
      const { data } = await API.patch(
        `/changes/cancel/${_id}`,
        lessonTableData
      );

      dispatch({
        type: LESSON_TABLE_ALL_ACTIONS_TYPE.UPDATE_LESSON_TABLE,
        payload: data,
      });
      dispatch({
        type: LESSON_TABLE_MODAL_ACTION_TYPE.CLOSE_LESSON_CONFIRM_MODAL,
        payload: false,
      });

      toastSuccess("Yeniləmələr ləğv edildi!");
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
          const { data } = await API.patch(`/${_id}`, lessonTableData);
          dispatch({
            type: LESSON_TABLE_ALL_ACTIONS_TYPE.UPDATE_LESSON_TABLE,
            payload: data,
          });
          dispatch({
            type: LESSON_TABLE_MODAL_ACTION_TYPE.LESSON_TABLE_OPEN_MODAL,
            payload: false,
          });
          toastSuccess("Dərs yeniləndi");
        } catch (error) {
          if (error?.response?.status === 401) {
            return dispatch(logoutAction());
          }
        }
      }
    } finally {
      dispatch(modalLoading(false));
    }
  };
