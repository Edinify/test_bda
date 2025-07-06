import axios from "axios";
import {
  DOWNLOAD_EXCEL_ACTION_TYPE,
  STUDENTS_ALL_ACTIONS_TYPE,
  STUDENTS_MODAL_ACTION_TYPE,
} from "../actions-type";
import { toast } from "react-toastify";
import { logoutAction } from "./auth";
import { apiRoot } from "../../apiRoot";

const refreshApi = axios.create({
  baseURL: `${apiRoot}/user/auth/refresh_token`,
  withCredentials: true,
});

const API = axios.create({
  baseURL: `${apiRoot}/user/student`,
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
  type: STUDENTS_ALL_ACTIONS_TYPE.STUDENT_LOADING,
  payload: loadingValue,
});
export const setLoadingAllStudentsAction = (loadingValue) => ({
  type: STUDENTS_ALL_ACTIONS_TYPE.STUDENT_LOADING_ALL,
  payload: loadingValue,
});
const studentModalLoading = (loadingValue) => ({
  type: STUDENTS_MODAL_ACTION_TYPE.STUDENT_MODAL_LOADING,
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

export const getStudentsAction = (payload) => async (dispatch) => {
  dispatch(setLoadingStudentsAction(true));
  try {
    const { data } = await API.get(
      `/?studentsCount=${payload.studentsCount}&searchQuery=${payload.searchQuery}`
    );
    if (payload.studentsCount > 0) {
      dispatch({
        type: STUDENTS_ALL_ACTIONS_TYPE.GET_MORE_STUDENTS_ALL,
        payload: data,
      });
    } else {
      dispatch({
        type: STUDENTS_ALL_ACTIONS_TYPE.GET_MORE_STUDENTS_ALL_ADD,
        payload: data,
      });
    }
  } catch (error) {
    const originalRequest = error.config;
    // // console.log(error);
    if (error?.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const token = await refreshApi.get("/");
        localStorage.setItem(
          "auth",
          JSON.stringify({
            AccessToken: token?.data?.accesstoken,
          })
        );
        const { data } = await API.get(
          `/?studentsCount=${payload.studentsCount}&searchQuery=${payload.searchQuery}`
        );
        if (payload.studentsCount > 0) {
          dispatch({
            type: STUDENTS_ALL_ACTIONS_TYPE.GET_MORE_STUDENTS_ALL,
            payload: data,
          });
        } else {
          dispatch({
            type: STUDENTS_ALL_ACTIONS_TYPE.GET_MORE_STUDENTS_ALL_ADD,
            payload: data,
          });
        }
      } catch (error) {
        // // console.log(error);
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
  } finally {
    dispatch(setLoadingStudentsAction(false));
  }
};

export const getActiveStudentsAction = (payload) => async (dispatch) => {
  dispatch(setLoadingStudentsAction(true));
  try {
    const { data } = await API.get(
      `/active?studentsCount=${payload.studentsCount}&searchQuery=${payload.searchQuery}&courseId=${payload.courseId}`
    );
    // // // console.log(data);
    if (payload.studentsCount > 0) {
      dispatch({
        type: STUDENTS_ALL_ACTIONS_TYPE.GET_MORE_STUDENTS_ALL,
        payload: data,
      });
    } else {
      dispatch({
        type: STUDENTS_ALL_ACTIONS_TYPE.GET_MORE_STUDENTS_ALL_ADD,
        payload: data,
      });
    }
  } catch (error) {
    const originalRequest = error.config;
    // // console.log(error);
    if (error?.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const token = await refreshApi.get("/");
        localStorage.setItem(
          "auth",
          JSON.stringify({
            AccessToken: token?.data?.accesstoken,
          })
        );
        const { data } = await API.get(
          `/active?studentsCount=${payload.studentsCount}&searchQuery=${payload.searchQuery}&courseId=${payload.courseId}`
        );
        if (payload.studentsCount > 0) {
          dispatch({
            type: STUDENTS_ALL_ACTIONS_TYPE.GET_MORE_STUDENTS_ALL,
            payload: data,
          });
        } else {
          dispatch({
            type: STUDENTS_ALL_ACTIONS_TYPE.GET_MORE_STUDENTS_ALL_ADD,
            payload: data,
          });
        }
      } catch (error) {
        // // console.log(error);
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
  } finally {
    dispatch(setLoadingStudentsAction(false));
    dispatch(setLoadingAllStudentsAction(false));
  }
};

export const getstudentsByCourseIdAction = (payload) => async (dispatch) => {
  dispatch(setLoadingStudentsAction(true));
  try {
    const { data } = await API.get(
      `/by/course?courseId=${payload.courseId}&day=${payload.day}&time=${payload.time}&role=${payload.role}&date=${payload.date}&studentsCount=${payload.studentsCount}&searchQuery=${payload.searchQuery}`
    );
    if (payload.studentsCount > 0) {
      dispatch({
        type: STUDENTS_ALL_ACTIONS_TYPE.GET_MORE_STUDENTS_BY_COURSE,
        payload: data,
      });
    } else {
      dispatch({
        type: STUDENTS_ALL_ACTIONS_TYPE.GET_MORE_STUDENTS_BY_COURSE_ADD,
        payload: data,
      });
    }
  } catch (error) {
    // // console.log(error);
    const originalRequest = error.config;
    if (error?.response?.status === 403 && !originalRequest._retry) {
      try {
        const token = await refreshApi.get("/");
        localStorage.setItem(
          "auth",
          JSON.stringify({
            AccessToken: token.data.accesstoken,
          })
        );

        const { data } = await API.get(
          `/by/course?courseId=${payload.courseId}&day=${payload.day}&time=${payload.time}&role=${payload.role}&date=${payload.date}`
        );
        if (payload.studentsCount > 0) {
          dispatch({
            type: STUDENTS_ALL_ACTIONS_TYPE.GET_MORE_STUDENTS_BY_COURSE,
            payload: data,
          });
        } else {
          dispatch({
            type: STUDENTS_ALL_ACTIONS_TYPE.GET_MORE_STUDENTS_BY_COURSE_ADD,
            payload: data,
          });
        }
      } catch (error) {
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
  } finally {
    dispatch(setLoadingStudentsAction(false));
  }
};

export const getStudentsPaginationAction =
  (
    length,
    searchQuery,
    status = "all",
    courseId = "",
    groupId = "",
    studentGroupStatus = ""
  ) =>
  async (dispatch) => {
    dispatch(setLoadingStudentsAction(true));

    // // console.log(searchQuery, "ssssssssssssssssssssss");
    try {
      const { data } = await API.get(
        `/pagination/?length=${length}&searchQuery=${searchQuery}&status=${
          status || ""
        }&courseId=${courseId || ""}&groupId=${
          groupId || ""
        }&studentGroupStatus=${studentGroupStatus || ""}`
      );

      dispatch({
        type: STUDENTS_ALL_ACTIONS_TYPE.GET_STUDENT_PAGINATION,
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

          const { data } = await API.get(
            `/pagination/?length=${length}&searchQuery=${searchQuery}&status=${status}`
          );
          // dispatch({
          //   type: STUDENTS_ALL_ACTIONS_TYPE.GET_STUDENT_LAST_PAGE,
          //   payload: pageNumber,
          // });
          dispatch({
            type: STUDENTS_ALL_ACTIONS_TYPE.GET_STUDENT_PAGINATION,
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
      dispatch(setLoadingStudentsAction(false));
    }
  };

export const createStudentsAction = (studentData) => async (dispatch) => {
  // // console.log(studentData);
  dispatch(studentModalLoading(true));
  try {
    const { data } = await API.post("/", studentData);

    dispatch({
      type: STUDENTS_ALL_ACTIONS_TYPE.CREATE_STUDENT,
      payload: data,
    });

    dispatch({
      type: STUDENTS_MODAL_ACTION_TYPE.STUDENT_OPEN_MODAL,
      payload: false,
    });

    toastSuccess("Yeni tələbə yaradıldı");
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

        await REGISTERAPI.post("/student/sign", studentData);

        dispatch({
          type: STUDENTS_MODAL_ACTION_TYPE.STUDENT_OPEN_MODAL,
          payload: false,
        });
        toastSuccess("Yeni tələbə yaradıldı");
      } catch (error) {
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }

    if (error?.response?.data?.key === "email-already-exist") {
      dispatch({
        type: STUDENTS_MODAL_ACTION_TYPE.STUDENT_OPEN_MODAL,
        payload: true,
      });
      toastError("Bu email ilə istifadəçi mövcuddur");
    }
    if (error?.response?.data?.key === "existing-student-fin") {
      dispatch({
        type: STUDENTS_MODAL_ACTION_TYPE.STUDENT_OPEN_MODAL,
        payload: true,
      });
      toastError("Bu fin kod ilə istifadəçi mövcuddur");
    }
  } finally {
    dispatch(studentModalLoading(false));
  }
};

export const updateStudentsAction = (_id, studentData) => async (dispatch) => {
  dispatch(studentModalLoading(true));
  try {
    const { data } = await API.patch(`/${_id}`, studentData);
    dispatch({ type: STUDENTS_ALL_ACTIONS_TYPE.UPDATE_STUDENT, payload: data });
    dispatch({
      type: STUDENTS_MODAL_ACTION_TYPE.STUDENT_OPEN_MODAL,
      payload: false,
    });
    toastSuccess("Tələbə yeniləndi");
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
        const { data } = await API.patch(`/${_id}`, studentData);
        dispatch({
          type: STUDENTS_ALL_ACTIONS_TYPE.UPDATE_STUDENT,
          payload: data,
        });
        dispatch({
          type: STUDENTS_MODAL_ACTION_TYPE.STUDENT_OPEN_MODAL,
          payload: false,
        });
        toastSuccess("Tələbə yeniləndi");
      } catch (error) {
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }

    if (error?.response?.data?.key === "email-already-exist") {
      toastError("Bu email ilə istifadəçi mövcuddur");
    }

    if (error?.response?.data?.key === "existing-student-fin") {
      toastError("Bu fin kod ilə istifadəçi mövcuddur");
    }
    if (error?.response?.data?.key === "has-current-week-lessons") {
      toastError("Cari həftədə  dərsi olan tələbə yenilənə bilməz");
    }
  } finally {
    dispatch(studentModalLoading(false));
  }
};

export const deleteStudentAction = (id) => async (dispatch) => {
  try {
    const { data } = await API.delete(`/${id}`);
    console.log(data);
    dispatch({
      type: STUDENTS_ALL_ACTIONS_TYPE.DELETE_STUDENT,
      payload: data._id,
    });
    toastSuccess("Tələbə silindi");
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
          type: STUDENTS_ALL_ACTIONS_TYPE.DELETE_STUDENT,
          payload: data._id,
        });
        toastSuccess("Tələbə silindi");
      } catch (error) {
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
    if (error?.response?.data?.key === "has-current-week-lessons") {
      toastError("Cari həftədə  dərsi olan tələbə silinə bilməz");
    }
    // console.log(error);
    toastError(error?.response?.data.message);
  }
};

export const confirmStudentChangesAction =
  (_id, studentData) => async (dispatch) => {
    dispatch(studentModalLoading(true));
    try {
      const { data } = await API.patch(`/changes/confirm/${_id}`, studentData);
      dispatch({
        type: STUDENTS_ALL_ACTIONS_TYPE.UPDATE_STUDENT,
        payload: data,
      });
      dispatch({
        type: STUDENTS_MODAL_ACTION_TYPE.CLOSE_STUDENT_CONFIRM_MODAL,
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
          const { data } = await API.patch(`/${_id}`, studentData);
          dispatch({
            type: STUDENTS_ALL_ACTIONS_TYPE.UPDATE_STUDENT,
            payload: data,
          });
          dispatch({
            type: STUDENTS_MODAL_ACTION_TYPE.STUDENT_OPEN_MODAL,
            payload: false,
          });
          toastSuccess("Tələbə yeniləndi");
        } catch (error) {
          if (error?.response?.status === 401) {
            return dispatch(logoutAction());
          }
        }
      }
      // // console.log(error);
      if (error?.response?.data?.key === "email-already-exist") {
        // dispatch({type:STUDENTS_MODAL_ACTION_TYPE.STUDENT_OPEN_MODAL,payload:true})
        toastError("Bu email ilə istifadəçi mövcuddur");
      }
      if (error?.response?.data?.key === "has-current-week-lessons") {
        toastError("Cari həftədə  dərsi olan tələbə yenilənə bilməz");
      }
    } finally {
      dispatch(studentModalLoading(false));
    }
  };

export const cancelStudentChangesAction =
  (_id, studentData) => async (dispatch) => {
    // // console.log(studentData);
    dispatch(studentModalLoading(true));
    try {
      const { data } = await API.patch(`/changes/cancel/${_id}`, studentData);
      dispatch({
        type: STUDENTS_ALL_ACTIONS_TYPE.UPDATE_STUDENT,
        payload: data,
      });
      dispatch({
        type: STUDENTS_MODAL_ACTION_TYPE.CLOSE_STUDENT_CONFIRM_MODAL,
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
          const { data } = await API.patch(`/${_id}`, studentData);
          dispatch({
            type: STUDENTS_ALL_ACTIONS_TYPE.UPDATE_STUDENT,
            payload: data,
          });
          dispatch({
            type: STUDENTS_MODAL_ACTION_TYPE.STUDENT_OPEN_MODAL,
            payload: false,
          });
          toastSuccess("Tələbə yeniləndi");
        } catch (error) {
          if (error?.response?.status === 401) {
            return dispatch(logoutAction());
          }
        }
      }
      // // console.log(error);
      if (error?.response?.data?.key === "email-already-exist") {
        // dispatch({type:STUDENTS_MODAL_ACTION_TYPE.STUDENT_OPEN_MODAL,payload:true})
        toastError("Bu email ilə istifadəçi mövcuddur");
      }
      if (error?.response?.data?.key === "has-current-week-lessons") {
        toastError("Cari həftədə  dərsi olan tələbə yenilənə bilməz");
      }
    } finally {
      dispatch(studentModalLoading(false));
    }
  };

export const downloadContractAction = async ({
  fullName,
  studentId,
  groupId,
}) => {
  try {
    const response = await API.get(
      `/contract?studentId=${studentId}&groupId=${groupId}`,
      { responseType: "blob" }
    );

    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fullName || "";
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {}
};

export const downloadStudentPaymentsAction = async ({
  fullName,
  studentId,
  groupId,
}) => {
  try {
    const response = await API.get(
      `/contract/payments?studentId=${studentId}&groupId=${groupId}`,
      { responseType: "blob" }
    );

    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fullName || "";
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {}
};

export const downloadExcelAction =
  ({ searchQuery, courseId, status, groupId }) =>
  async (dispatch) => {
    dispatch(downloadExcelLoading(true));
    try {
      const response = await API.get(
        `/excel?searchQuery=${searchQuery || ""}&courseId=${
          courseId || ""
        }&status=${status || "all"}&groupId=${groupId || ""}`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "students.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      dispatch(downloadExcelLoading(false));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoadingStudentsAction(false));
    }
  };
