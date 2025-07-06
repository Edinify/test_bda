import axios from "axios";
import {
  ALL_COURSES_ACTION,
  COURSES_ALL_ACTIONS_TYPE,
  COURSES_MODAL_ACTION_TYPE,
  DOWNLOAD_EXCEL_ACTION_TYPE,
} from "../actions-type";
import { toast } from "react-toastify";
import { logoutAction } from "./auth";
import { apiRoot } from "../../apiRoot";

const API = axios.create({
  baseURL: `${apiRoot}/course`,
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
const setLoadingCoursesAction = (loadingValue) => ({
  type: COURSES_ALL_ACTIONS_TYPE.COURSE_LOADING,
  payload: loadingValue,
});
const modalLoading = (loadingValue) => ({
  type: COURSES_MODAL_ACTION_TYPE.COURSE_MODAL_LOADING,
  payload: loadingValue,
});
const downloadExcelLoading = (value) => ({
  type: DOWNLOAD_EXCEL_ACTION_TYPE.LOADING,
  payload: value,
});

const courseModalOpen = (value) => ({
  type: COURSES_MODAL_ACTION_TYPE.COURSE_OPEN_MODAL,
  payload: value,
});

export const getAllCoursesAction = () => async (dispatch) => {
  try {
    const { data } = await API.get("/all");
    dispatch({ type: ALL_COURSES_ACTION.GET_ALL_COURSE, payload: data });
  } catch (error) {
    // // console.log(error);
  }
};

export const getCoursesPaginationAction =
  (length, searchQuery) => async (dispatch) => {
    dispatch(setLoadingCoursesAction(true));

    try {
      const { data } = await API.get(
        `/pagination/?length=${length || 0}&searchQuery=${searchQuery}`
      );
      dispatch({
        type: COURSES_ALL_ACTIONS_TYPE.GET_COURSES_PAGINATION,
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
            `/pagination/?length=${length}&searchQuery=${searchQuery}`
          );
          dispatch({
            type: COURSES_ALL_ACTIONS_TYPE.GET_COURSES_PAGINATION,
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
      dispatch(setLoadingCoursesAction(false));
    }
  };
export const createCoursesAction = (courseData) => async (dispatch) => {
  dispatch(setLoadingCoursesAction(true));
  // // console.log(courseData);
  try {
    const { data } = await API.post("/", courseData);
    // console.log(data);
    dispatch({
      type: COURSES_ALL_ACTIONS_TYPE.CREATE_COURSE,
      payload: data,
    });
    dispatch(courseModalOpen(false));
    toastSuccess("Yeni fənn yaradıldı");
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
        const { data } = await API.post("/", courseData);
        dispatch(getCoursesPaginationAction(data.lastPage, ""));
        dispatch(courseModalOpen(false));
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
export const updateCoursesAction = (_id, courseData) => async (dispatch) => {
  dispatch(modalLoading(true));
  try {
    const { data } = await API.patch(`/${_id}`, courseData);
    dispatch({ type: COURSES_ALL_ACTIONS_TYPE.UPDATE_COURSE, payload: data });
    dispatch(courseModalOpen(false));
    toastSuccess("Fənn yeniləndi");
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
        const { data } = await API.patch(`/${_id}`, courseData);
        dispatch({
          type: COURSES_ALL_ACTIONS_TYPE.UPDATE_COURSE,
          payload: data,
        });
        dispatch(courseModalOpen(false));
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
      dispatch(courseModalOpen(true));
      toastError("Fənn artıq mövcuddur");
    }
  } finally {
    dispatch(modalLoading(false));
  }
};

export const deleteCoursesAction = (id) => async (dispatch) => {
  try {
    const { data } = await API.delete(`/${id}`);

    dispatch({
      type: COURSES_ALL_ACTIONS_TYPE.DELETE_COURSE,
      payload: data._id,
    });
    toastSuccess("Fənn silindi");
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
          type: COURSES_ALL_ACTIONS_TYPE.DELETE_COURSE,
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

export const confirmCourseChangesAction =
  (_id, courseData) => async (dispatch) => {
    dispatch(modalLoading(true));
    try {
      const { data } = await API.patch(`/changes/confirm/${_id}`, courseData);

      dispatch({ type: COURSES_ALL_ACTIONS_TYPE.UPDATE_COURSE, payload: data });

      dispatch({
        type: COURSES_MODAL_ACTION_TYPE.CLOSE_COURSE_CONFIRM_MODAL,
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
          await API.patch(`/${_id}`, courseData);

          dispatch({
            type: COURSES_MODAL_ACTION_TYPE.CLOSE_COURSE_CONFIRM_MODAL,
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
  (_id, courseData) => async (dispatch) => {
    dispatch(modalLoading(true));
    try {
      const { data } = await API.patch(`/changes/cancel/${_id}`, courseData);

      dispatch({ type: COURSES_ALL_ACTIONS_TYPE.UPDATE_COURSE, payload: data });

      dispatch({
        type: COURSES_MODAL_ACTION_TYPE.CLOSE_COURSE_CONFIRM_MODAL,
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
          await API.patch(`/${_id}`, courseData);

          dispatch({
            type: COURSES_MODAL_ACTION_TYPE.CLOSE_COURSE_CONFIRM_MODAL,
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

export const downloadCoursesExcelAction = () => async (dispatch) => {
  dispatch(downloadExcelLoading(true));
  try {
    const response = await API.get(`/excel`, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "courses.xlsx");
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);

    dispatch(downloadExcelLoading(false));
  } catch (error) {
    dispatch(downloadExcelLoading(false));
    toastError("Xəta baş verdi!");
    console.log(error);
  }
};
