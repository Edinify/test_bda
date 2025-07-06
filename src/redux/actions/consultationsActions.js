import axios from "axios";
import {
  CONSULTATION_ALL_ACTIONS_TYPE,
  CONSULTATION_MODAL_ACTION_TYPE,
  DOWNLOAD_EXCEL_ACTION_TYPE,
} from "../actions-type";
import { toast } from "react-toastify";
import { logoutAction } from "./auth";
import { apiRoot } from "../../apiRoot";

const refreshApi = axios.create({
  baseURL: `${apiRoot}/user/auth/refresh_token`,
  withCredentials: true,
});

const API = axios.create({
  baseURL: `${apiRoot}/consultation`,
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

const pageLoading = (loadingValue) => ({
  type: CONSULTATION_ALL_ACTIONS_TYPE.CONSULTATION_LOADING,
  payload: loadingValue,
});
export const setLoadingConsultationAction = (loadingValue) => ({
  type: CONSULTATION_ALL_ACTIONS_TYPE.CONSULTATION_LOADING_ALL,
  payload: loadingValue,
});
const modalLoading = (loadingValue) => ({
  type: CONSULTATION_MODAL_ACTION_TYPE.CONSULTATION_MODAL_LOADING,
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

// export const getActiveConsultationAction = (payload) => async (dispatch) => {
//   dispatch(pageLoading(true));
//   try {
//     const { data } = await API.get(
//       `/active?studentsCount=${payload.studentsCount}&searchQuery=${payload.searchQuery}`
//     );
//     if (payload.studentsCount > 0) {
//       dispatch({
//         type: CONSULTATION_ALL_ACTIONS_TYPE.GET_MORE_CONSULTATION_ALL,
//         payload: data,
//       });
//     } else {
//       dispatch({
//         type: CONSULTATION_ALL_ACTIONS_TYPE.GET_MORE_CONSULTATION_ALL_ADD,
//         payload: data,
//       });
//     }
//   } catch (error) {
//     const originalRequest = error.config;
//     // console.log(error);
//     if (error?.response?.status === 403 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const token = await refreshApi.get("/");
//         localStorage.setItem(
//           "auth",
//           JSON.stringify({
//             AccessToken: token?.data?.accesstoken,
//           })
//         );
//         const { data } = await API.get(
//           `/active?studentsCount=${payload.studentsCount}&searchQuery=${payload.searchQuery}`
//         );
//         if (payload.studentsCount > 0) {
//           dispatch({
//             type: CONSULTATION_ALL_ACTIONS_TYPE.GET_MORE_CONSULTATION_ALL,
//             payload: data,
//           });
//         } else {
//           dispatch({
//             type: CONSULTATION_ALL_ACTIONS_TYPE.GET_MORE_CONSULTATION_ALL_ADD,
//             payload: data,
//           });
//         }
//       } catch (error) {
//         // console.log(error);
//         if (error?.response?.status === 401) {
//           return dispatch(logoutAction());
//         }
//       }
//     }
//   } finally {
//     dispatch(pageLoading(false));
//     // dispatch(setLoadingConsultationAction(false));
//   }
// };

export const getConsultationPaginationAction =
  (
    length,
    searchQuery,
    phone,
    status = "",
    startDate,
    endDate,
    courseId = "",
    whereComing = "",
    whereForDate = ""
  ) =>
  async (dispatch) => {
    dispatch(pageLoading(true));

    console.log(status, "status");
    try {
      const { data } = await API.get(
        `/pagination/?length=${length}&searchQuery=${
          searchQuery || ""
        }&phone=${phone}&status=${status || ""}&startDate=${
          startDate || ""
        }&endDate=${endDate || ""}&courseId=${courseId || ""}&whereComing=${
          whereComing || ""
        }&whichForDate=${whereForDate}`
      );

      dispatch({
        type: CONSULTATION_ALL_ACTIONS_TYPE.GET_CONSULTATION_PAGINATION,
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
            `/pagination/?length=${length}&searchQuery=${searchQuery}&phone=${phone}&status=${status}&startDate=${startDate}&endDate=${endDate}&courseId=${courseId}&whereComing=${whereComing}`
          );
          dispatch({
            type: CONSULTATION_ALL_ACTIONS_TYPE.GET_CONSULTATION_PAGINATION,
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

export const createConsultationAction =
  (consultationData) => async (dispatch) => {
    dispatch(modalLoading(true));
    try {
      const { data } = await API.post("/", consultationData);
      dispatch({
        type: CONSULTATION_ALL_ACTIONS_TYPE.CREATE_CONSULTATION,
        payload: data,
      });
      dispatch({
        type: CONSULTATION_MODAL_ACTION_TYPE.CONSULTATION_OPEN_MODAL,
        payload: false,
      });
      toastSuccess("Yeni konsultasiya yaradıldı");
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

          const { data } = await API.post("/", consultationData);
          dispatch(
            getConsultationPaginationAction(data.lastPage, "", "appointed")
          );
          dispatch({
            type: CONSULTATION_MODAL_ACTION_TYPE.CONSULTATION_OPEN_MODAL,
            payload: false,
          });
          toastSuccess("Yeni konsultasiya yaradıldı");
        } catch (error) {
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

export const updateConsultationAction =
  (_id, consultationData) => async (dispatch) => {
    dispatch(modalLoading(true));
    try {
      const { data } = await API.patch(`/${_id}`, consultationData);
      dispatch({
        type: CONSULTATION_ALL_ACTIONS_TYPE.UPDATE_CONSULTATION,
        payload: data,
      });
      dispatch({
        type: CONSULTATION_MODAL_ACTION_TYPE.CONSULTATION_OPEN_MODAL,
        payload: false,
      });
      toastSuccess("konsultasiya yeniləndi");
    } catch (error) {
      console.log(error);
      const originalRequest = error.config;

      if (error?.response?.data?.key === "existing-consultation-fin") {
        toastError("Bu fin kod ilə tələbə mövcuddur");
      }

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
          const { data } = await API.patch(`/${_id}`, consultationData);
          dispatch({
            type: CONSULTATION_ALL_ACTIONS_TYPE.UPDATE_CONSULTATION,
            payload: data,
          });
          dispatch({
            type: CONSULTATION_MODAL_ACTION_TYPE.CONSULTATION_OPEN_MODAL,
            payload: false,
          });
          toastSuccess("konsultasiya yeniləndi");
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

export const deleteConsultationAction = (id) => async (dispatch) => {
  try {
    const { data } = await API.delete(`/${id}`);

    dispatch({
      type: CONSULTATION_ALL_ACTIONS_TYPE.DELETE_CONSULTATION,
      payload: data._id,
    });
    toastSuccess("konsultasiya silindi");
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
          type: CONSULTATION_ALL_ACTIONS_TYPE.DELETE_CONSULTATION,
          payload: data._id,
        });
        toastSuccess("konsultasiya silindi");
      } catch (error) {
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
    if (error?.response?.data?.key === "has-current-week-lessons") {
      toastError("Cari həftədə  dərsi olan konsultasiya silinə bilməz");
    }
    // console.log(error);
    toastError(error?.response?.data.message);
  }
};

export const confirmConsultationChangesAction =
  (_id, consultationData) => async (dispatch) => {
    dispatch(modalLoading(true));
    try {
      const { data } = await API.patch(
        `/changes/confirm/${_id}`,
        consultationData
      );
      dispatch({
        type: CONSULTATION_ALL_ACTIONS_TYPE.UPDATE_CONSULTATION,
        payload: data,
      });
      dispatch({
        type: CONSULTATION_MODAL_ACTION_TYPE.CLOSE_CONSULTATION_CONFIRM_MODAL,
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
          const { data } = await API.patch(`/${_id}`, consultationData);
          dispatch({
            type: CONSULTATION_ALL_ACTIONS_TYPE.UPDATE_CONSULTATION,
            payload: data,
          });
          dispatch({
            type: CONSULTATION_MODAL_ACTION_TYPE.CONSULTATION_OPEN_MODAL,
            payload: false,
          });
          toastSuccess("konsultasiya yeniləndi");
        } catch (error) {
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

export const cancelConsultationChangesAction =
  (_id, consultationData) => async (dispatch) => {
    dispatch(modalLoading(true));
    try {
      const { data } = await API.patch(
        `/changes/cancel/${_id}`,
        consultationData
      );
      dispatch({
        type: CONSULTATION_ALL_ACTIONS_TYPE.UPDATE_CONSULTATION,
        payload: data,
      });
      dispatch({
        type: CONSULTATION_MODAL_ACTION_TYPE.CLOSE_CONSULTATION_CONFIRM_MODAL,
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
          const { data } = await API.patch(`/${_id}`, consultationData);
          dispatch({
            type: CONSULTATION_ALL_ACTIONS_TYPE.UPDATE_CONSULTATION,
            payload: data,
          });
          dispatch({
            type: CONSULTATION_MODAL_ACTION_TYPE.CONSULTATION_OPEN_MODAL,
            payload: false,
          });
          toastSuccess("konsultasiya yeniləndi");
        } catch (error) {
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

export const downloadConsultationExcelAction =
  ({
    consultationSearchValues,
    consultationPhoneSearchValues,
    startDate,
    endDate,
    status,
    course,
    whereComing,
  }) =>
  async (dispatch) => {
    dispatch(downloadExcelLoading(true));
    try {
      const response = await API.get(
        `/excel?consultationSearchValues=${
          consultationSearchValues || ""
        }&consultationPhoneSearchValues=${
          consultationPhoneSearchValues || ""
        }&startDate=${startDate || ""}&endDate=${endDate || ""}&status=${
          status || ""
        }&courseId=${course._id || ""}&whereComing=${whereComing || ""}`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "consultation.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      dispatch(downloadExcelLoading(false));
    } catch (error) {
      console.log(error);
      toastError("Xəta baş verdi!");
    } finally {
      dispatch(downloadExcelLoading(false));
    }
  };
