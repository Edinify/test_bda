import axios from "axios";
import {
  DOWNLOAD_EXCEL_ACTION_TYPE,
  MENTOR_TYPES,
  TEACHER_ALL_ACTIONS_TYPE,
  TEACHERS_MODAL_ACTION_TYPE,
} from "../actions-type";
import { toast } from "react-toastify";
import { logoutAction } from "./auth";
import { apiRoot } from "../../apiRoot";

const API = axios.create({
  baseURL: `${apiRoot}/user/teacher`,
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

const setLoadingStudentsAction = (loadingValue) => ({
  type: TEACHER_ALL_ACTIONS_TYPE.TEACHER_LOADING,
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
const pageLoading = (loadingValue) => ({
  type: TEACHER_ALL_ACTIONS_TYPE.TEACHER_LOADING,
  payload: loadingValue,
});
const modalLoading = (loadingValue) => ({
  type: TEACHERS_MODAL_ACTION_TYPE.TEACHER_MODAL_LOADING,
  payload: loadingValue,
});

export const getAllTeachersAction = () => async (dispatch) => {
  try {
    const { data } = await API.get("/all");
    dispatch({ type: TEACHER_ALL_ACTIONS_TYPE.GET_TEACHER, payload: data });
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
        dispatch({ type: TEACHER_ALL_ACTIONS_TYPE.GET_TEACHER, payload: data });
      } catch (error) {
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
        // // console.log(error);
      }
    }
  }
};

export const getActiveTeachersAction = () => async (dispatch) => {
  try {
    const { data } = await API.get("/active");
    dispatch({
      type: TEACHER_ALL_ACTIONS_TYPE.GET_ACTIVE_TEACHERS,
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
          type: TEACHER_ALL_ACTIONS_TYPE.GET_ACTIVE_TEACHERS,
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

export const getTeachersByCourseId = (courseId) => async (dispatch) => {
  try {
    const { data } = await API.get("/by-course", {
      params: { courseId: courseId, role: "teacher" },
    });
    dispatch({
      type: TEACHER_ALL_ACTIONS_TYPE.GET_ACTIVE_TEACHERS,
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
          type: TEACHER_ALL_ACTIONS_TYPE.GET_ACTIVE_TEACHERS,
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

export const getTeachersPaginationAction =
  (length, searchQuery, status = "all", role, courseId) =>
  async (dispatch) => {
    console.log(length);
    dispatch(setLoadingStudentsAction(true));
    try {
      const { data } = await API.get(
        `/pagination/?length=${length}&searchQuery=${searchQuery}&status=${status}&role=${role}&courseId=${
          courseId || ""
        }`
      );
      dispatch({
        type: TEACHER_ALL_ACTIONS_TYPE.GET_TEACHER_PAGINATION,
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
            `/pagination/?length=${length}&searchQuery=${searchQuery}&status=${status}&role=${role}&courseId=${
              courseId || ""
            }`
          );

          dispatch({
            type: TEACHER_ALL_ACTIONS_TYPE.GET_TEACHER_PAGINATION,
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

export const createTeacherAction =
  (teacherData, pathName) => async (dispatch) => {
    dispatch(modalLoading(true));

    try {
      const { data } = await API.post("/", teacherData);

      dispatch({
        type: TEACHER_ALL_ACTIONS_TYPE.CREATE_TEACHER,
        payload: data,
      });

      dispatch({
        type: TEACHERS_MODAL_ACTION_TYPE.TEACHER_OPEN_MODAL,
        payload: false,
      });

      if (data.teacher.role === "teacher") {
        toastSuccess("Yeni müəllim yaradıldı");
      } else if (data.teacher.role === "mentor") {
        toastSuccess("Yeni tyutor yaradıldı");
      }
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
          const { data } = await REGISTERAPI.post("/teacher/sign", teacherData);
          dispatch(getTeachersPaginationAction(data.lastPage, "", "all"));
          dispatch({
            type: TEACHERS_MODAL_ACTION_TYPE.TEACHER_OPEN_MODAL,
            payload: false,
          });
          toastSuccess("Yeni təlimçi yaradıldı");
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

export const updateTeacherAction = (_id, teacherData) => async (dispatch) => {
  dispatch(modalLoading(true));
  try {
    const { data } = await API.patch(`/${_id}`, teacherData);
    dispatch({ type: TEACHER_ALL_ACTIONS_TYPE.UPDATE_TEACHER, payload: data });
    dispatch({
      type: TEACHERS_MODAL_ACTION_TYPE.TEACHER_OPEN_MODAL,
      payload: false,
    });
    toastSuccess("Təlimçi yeniləndi");
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
        const { data } = await API.patch(`/${_id}`, teacherData);
        dispatch({
          type: TEACHER_ALL_ACTIONS_TYPE.UPDATE_TEACHER,
          payload: data,
        });
        dispatch({
          type: TEACHERS_MODAL_ACTION_TYPE.TEACHER_OPEN_MODAL,
          payload: false,
        });
        toastSuccess("Təlimçi yeniləndi");
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

export const deleteTeacherAction = (id) => async (dispatch) => {
  try {
    const { data } = await API.delete(`/${id}`);

    dispatch({
      type: TEACHER_ALL_ACTIONS_TYPE.DELETE_TEACHER,
      payload: data._id,
    });
    toastSuccess("Təlimçi silindi");
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
          type: TEACHER_ALL_ACTIONS_TYPE.DELETE_TEACHER,
          payload: data._id,
        });
        toastSuccess("Təlimçi silindi");
      } catch (error) {
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
    if (error?.response?.data?.key === "has-current-week-lessons") {
      toastError("Cari həftədə  dərsi olan təlimçi silinə bilməz");
    }
    // console.log(error);
    toastError(error?.response?.data.message);
  }
};

export const getTeacherLessonStatisticsAction =
  (startDate, endDate, monthCount) => async (dispatch) => {
    try {
      const { data } = await API.get(
        `/me/chart?startDate=${startDate || ""}&endDate=${
          endDate || ""
        }&monthCount=${monthCount || ""}`
      );
      dispatch({
        type: TEACHER_ALL_ACTIONS_TYPE.GET_LESSON_STATISTICS,
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
            `/me/chart?startDate=${startDate || ""}&endDate=${
              endDate || ""
            }&monthCount=${monthCount || ""}`
          );
          dispatch({
            type: TEACHER_ALL_ACTIONS_TYPE.GET_LESSON_STATISTICS,
            payload: data,
          });
        } catch (error) {
          if (error?.response?.status === 401) {
            return dispatch(logoutAction());
          }
        }
      }
      // // console.log(error);
    }
  };

export const getTeacherConfirmedLessonsAction =
  (startDate, endDate, monthCount) => async (dispatch) => {
    try {
      const { data } = await API.get(
        `/me/confirmed-lessons?startDate=${startDate || ""}&endDate=${
          endDate || ""
        }&monthCount=${monthCount || ""}`
      );
      dispatch({
        type: TEACHER_ALL_ACTIONS_TYPE.GET_CONFIRMED_LESSONS,
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
            `/me/confirmed-lessons?startDate=${startDate || ""}&endDate=${
              endDate || ""
            }&monthCount=${monthCount || ""}`
          );
          dispatch({
            type: TEACHER_ALL_ACTIONS_TYPE.GET_CONFIRMED_LESSONS,
            payload: data,
          });
        } catch (error) {
          if (error?.response?.status === 401) {
            return dispatch(logoutAction());
          }
        }
      }
      // // console.log(error);
    }
  };

export const getTeacherCancelledLessonsAction =
  (startDate, endDate, monthCount) => async (dispatch) => {
    try {
      const { data } = await API.get(
        `/me/cancelled-lessons?startDate=${startDate || ""}&endDate=${
          endDate || ""
        }&monthCount=${monthCount || ""}`
      );
      dispatch({
        type: TEACHER_ALL_ACTIONS_TYPE.GET_CANCELLED_LESSONS,
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
            `/me/cancelled-lessons?startDate=${startDate || ""}&endDate=${
              endDate || ""
            }&monthCount=${monthCount || ""}`
          );
          dispatch({
            type: TEACHER_ALL_ACTIONS_TYPE.GET_CANCELLED_LESSONS,
            payload: data,
          });
        } catch (error) {
          if (error?.response?.status === 401) {
            return dispatch(logoutAction());
          }
        }
      }
      // // console.log(error);
    }
  };

export const getTeacherUnviewedLessonsAction =
  (startDate, endDate, monthCount) => async (dispatch) => {
    try {
      const { data } = await API.get(
        `/me/unviewed-lessons?startDate=${startDate || ""}&endDate=${
          endDate || ""
        }&monthCount=${monthCount || ""}`
      );
      dispatch({
        type: TEACHER_ALL_ACTIONS_TYPE.GET_UNVIEWED_LESSONS,
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
            `/me/unviewed-lessons?startDate=${startDate || ""}&endDate=${
              endDate || ""
            }&monthCount=${monthCount || ""}`
          );
          dispatch({
            type: TEACHER_ALL_ACTIONS_TYPE.GET_UNVIEWED_LESSONS,
            payload: data,
          });
        } catch (error) {
          if (error?.response?.status === 401) {
            return dispatch(logoutAction());
          }
        }
      }
      // // console.log(error);
    }
  };

export const getTeacherLeaderboradOrderAction =
  (startDate, endDate, monthCount, byFilter) => async (dispatch) => {
    try {
      const { data } = await API.get(
        `/me/leaderboard-order?startDate=${startDate || ""}&endDate=${
          endDate || ""
        }&monthCount=${monthCount || ""}&byFilter=${byFilter}`
      );
      dispatch({
        type: TEACHER_ALL_ACTIONS_TYPE.GET_LEADERBOARD_ORDER,
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
            `/me/leaderboard-order?startDate=${startDate || ""}&endDate=${
              endDate || ""
            }&monthCount=${monthCount || ""}&byFilter=${byFilter}`
          );
          dispatch({
            type: TEACHER_ALL_ACTIONS_TYPE.GET_LEADERBOARD_ORDER,
            payload: data,
          });
        } catch (error) {
          if (error?.response?.status === 401) {
            return dispatch(logoutAction());
          }
        }
      }
      // // console.log(error);
    }
  };

// Mentors Actions

export const getMentorsByCourseId = (courseId) => async (dispatch) => {
  try {
    const { data } = await API.get("/by-course", {
      params: { courseId: courseId, role: "mentor" },
    });
    // // console.log(data, "mentors in action");
    dispatch({
      type: MENTOR_TYPES.GET_MENTORS,
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
          type: TEACHER_ALL_ACTIONS_TYPE.GET_ACTIVE_TEACHERS,
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

export const confirmTeacherChangesAction =
  (_id, teacherData) => async (dispatch) => {
    dispatch(modalLoading(true));
    try {
      const { data } = await API.patch(`/changes/confirm/${_id}`, teacherData);

      dispatch({
        type: TEACHER_ALL_ACTIONS_TYPE.UPDATE_TEACHER,
        payload: data,
      });
      dispatch({
        type: TEACHERS_MODAL_ACTION_TYPE.CLOSE_TEACHER_CONFIRM_MODAL,
      });
      toastSuccess("Yeniliklər təsdiqləndi");
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
          const { data } = await API.patch(`/${_id}`, teacherData);
          dispatch({
            type: TEACHER_ALL_ACTIONS_TYPE.UPDATE_TEACHER,
            payload: data,
          });
          dispatch({
            type: TEACHERS_MODAL_ACTION_TYPE.CLOSE_TEACHER_CONFIRM_MODAL,
          });
          toastSuccess("Təlimçi təsdiqləndi!");
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

export const cancelTeacherChangesAction =
  (_id, teacherData) => async (dispatch) => {
    dispatch(modalLoading(true));
    try {
      const { data } = await API.patch(`/changes/cancel/${_id}`, teacherData);

      dispatch({
        type: TEACHER_ALL_ACTIONS_TYPE.UPDATE_TEACHER,
        payload: data,
      });
      dispatch({
        type: TEACHERS_MODAL_ACTION_TYPE.CLOSE_TEACHER_CONFIRM_MODAL,
      });
      toastSuccess("Yeniliklər ləğv edildi!");
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
          const { data } = await API.patch(`/${_id}`, teacherData);
          dispatch({
            type: TEACHER_ALL_ACTIONS_TYPE.UPDATE_TEACHER,
            payload: data,
          });
          dispatch({
            type: TEACHERS_MODAL_ACTION_TYPE.TEACHER_OPEN_MODAL,
            payload: false,
          });
          toastSuccess("Təlimçi yeniləndi");
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

export const downloadTeachersExcelAction = (role) => async (dispatch) => {
  dispatch(downloadExcelLoading(true));
  try {
    const response = await API.get(`/excel?role=${role || "teacher"}`, {
      responseType: "blob",
    });
    const fileName = role === "mentor" ? "tyutor.xlsx" : "teachers.xlsx";

    const url = window.URL.createObjectURL(new Blob([response.data]));

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    dispatch(downloadExcelLoading(false));
  } catch (error) {}
};
