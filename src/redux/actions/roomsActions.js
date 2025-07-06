import axios from "axios";
import {
  ALL_COURSES_ACTION,
  COURSES_ALL_ACTIONS_TYPE,
  COURSES_MODAL_ACTION_TYPE,
  DOWNLOAD_EXCEL_ACTION_TYPE,
  ROOMS_ALL_ACTIONS_TYPE,
  ROOMS_MODAL_ACTION_TYPE,
} from "../actions-type";

import { toast } from "react-toastify";
import { logoutAction } from "./auth";
import { apiRoot } from "../../apiRoot";

const API = axios.create({
  baseURL: `${apiRoot}/room`,
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

const setLoadingRoomsAction = (loadingValue) => ({
  type: ROOMS_ALL_ACTIONS_TYPE.ROOM_LOADING,
  payload: loadingValue,
});
const modalLoading = (loadingValue) => ({
  type: ROOMS_MODAL_ACTION_TYPE.ROOM_MODAL_LOADING,
  payload: loadingValue,
});
const downloadExcelLoading = (value) => ({
  type: DOWNLOAD_EXCEL_ACTION_TYPE.LOADING,
  payload: value,
});

const roomModalOpen = (value) => ({
  type: ROOMS_MODAL_ACTION_TYPE.ROOM_OPEN_MODAL,
  payload: value,
});

export const getAllRoomsAction = () => async (dispatch) => {
  try {
    const { data } = await API.get("/");
    dispatch({ type: ROOMS_ALL_ACTIONS_TYPE.GET_ALL_ROOMS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getRoomsPaginationAction =
  (length, searchQuery) => async (dispatch) => {
    dispatch(setLoadingRoomsAction(true));

    try {
      const { data } = await API.get(
        `/pagination/?length=${length || 0}&searchQuery=${searchQuery}`
      );
      dispatch({
        type: ROOMS_ALL_ACTIONS_TYPE.GET_ROOMS_PAGINATION,
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
            type: ROOMS_ALL_ACTIONS_TYPE.GET_ROOMS_PAGINATION,
            payload: data,
          });
        } catch (error) {
          // console.log(error);
          if (error?.response?.status === 401) {
            return dispatch(logoutAction());
          }
        }
      }
      if (error?.response?.status === 403) {
        dispatch(logoutAction());
      }
    } finally {
      dispatch(setLoadingRoomsAction(false));
    }
  };
export const createRoomAction = (roomData) => async (dispatch) => {
  dispatch(modalLoading(true));

  try {
    const { data } = await API.post("/", roomData);
    console.log(data);
    dispatch({
      type: ROOMS_ALL_ACTIONS_TYPE.CREATE_ROOM,
      payload: data,
    });
    dispatch(roomModalOpen(false));
    toastSuccess("Yeni otaq yaradıldı");
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
        const { data } = await API.post("/", roomData);
        dispatch(getRoomsPaginationAction(0, ""));
        dispatch(roomModalOpen(false));
        toastSuccess("Yeni otaq yaradıldı");
      } catch (error) {
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
    if (error?.response?.status === 403) {
      dispatch(logoutAction());
    }
    // console.log(error);
    if (error?.response?.data?.key === "room-already-exists") {
      toastError("Bu ad ilə otaq artıq mövcuddur");
    }
  } finally {
    dispatch(modalLoading(false));
  }
};
export const updateRoomAction = (_id, roomData) => async (dispatch) => {
  dispatch(modalLoading(true));
  try {
    const { data } = await API.patch(`/${_id}`, roomData);
    dispatch({ type: ROOMS_ALL_ACTIONS_TYPE.UPDATE_ROOM, payload: data });
    dispatch(roomModalOpen(false));
    toastSuccess("otaq yeniləndi");
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
        const { data } = await API.patch(`/${_id}`, roomData);
        dispatch({
          type: ROOMS_ALL_ACTIONS_TYPE.UPDATE_ROOM,
          payload: data,
        });
        dispatch(roomModalOpen(false));
        toastSuccess("otaq yeniləndi");
      } catch (error) {
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
    // console.log(error);
    toastError(error?.response?.data?.message);
    if (error?.response?.data?.key === "room-already-exists") {
      dispatch(roomModalOpen(true));
      toastError("otaq artıq mövcuddur");
    }
  } finally {
    dispatch(modalLoading(false));
  }
};

export const deleteRoomAction = (id) => async (dispatch) => {
  try {
    const { data } = await API.delete(`/${id}`);

    dispatch({
      type: ROOMS_ALL_ACTIONS_TYPE.DELETE_ROOM,
      payload: data._id,
    });
    toastSuccess("Otaq silindi");
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
          type: ROOMS_ALL_ACTIONS_TYPE.DELETE_ROOM,
          payload: data._id,
        });
        toastSuccess("Otaq silindi");
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

// export const confirmCourseChangesAction =
//   (_id, courseData) => async (dispatch) => {
//     dispatch(modalLoading(true));
//     try {
//       const { data } = await API.patch(`/changes/confirm/${_id}`, courseData);

//       dispatch({ type: COURSES_ALL_ACTIONS_TYPE.UPDATE_COURSE, payload: data });

//       dispatch({
//         type: COURSES_MODAL_ACTION_TYPE.CLOSE_COURSE_CONFIRM_MODAL,
//       });
//       toastSuccess("Yeniliklər təsdiqləndi!");
//     } catch (error) {
//       const originalRequest = error.config;
//       if (error?.response?.status === 403 && !originalRequest._retry) {
//         originalRequest._retry = true;
//         try {
//           const token = await refreshApi.get("/");
//           localStorage.setItem(
//             "auth",
//             JSON.stringify({
//               AccessToken: token.data.accesstoken,
//             })
//           );
//           await API.patch(`/${_id}`, courseData);

//           dispatch({
//             type: COURSES_MODAL_ACTION_TYPE.CLOSE_COURSE_CONFIRM_MODAL,
//           });
//           toastSuccess("fənn təsdiqləndi!");
//         } catch (error) {
//           if (error?.response?.status === 401) {
//             return dispatch(logoutAction());
//           }
//         }
//       }
//       if (error?.response?.data?.key === "email-already-exist") {
//         toastError("Bu email ilə istifadəçi mövcuddur");
//       }
//       if (error?.response?.data?.key === "has-current-week-lessons") {
//         toastError("Cari həftədə  dərsi olan təlimçi yenilənə bilməz");
//       }
//     } finally {
//       dispatch(modalLoading(false));
//     }
//   };

// export const cancelCourseChangesAction =
//   (_id, courseData) => async (dispatch) => {
//     dispatch(modalLoading(true));
//     try {
//       const { data } = await API.patch(`/changes/cancel/${_id}`, courseData);

//       dispatch({ type: COURSES_ALL_ACTIONS_TYPE.UPDATE_COURSE, payload: data });

//       dispatch({
//         type: COURSES_MODAL_ACTION_TYPE.CLOSE_COURSE_CONFIRM_MODAL,
//       });
//       toastSuccess("Yeniliklər təsdiqləndi!");
//     } catch (error) {
//       const originalRequest = error.config;
//       if (error?.response?.status === 403 && !originalRequest._retry) {
//         originalRequest._retry = true;
//         try {
//           const token = await refreshApi.get("/");
//           localStorage.setItem(
//             "auth",
//             JSON.stringify({
//               AccessToken: token.data.accesstoken,
//             })
//           );
//           await API.patch(`/${_id}`, courseData);

//           dispatch({
//             type: COURSES_MODAL_ACTION_TYPE.CLOSE_COURSE_CONFIRM_MODAL,
//           });
//           toastSuccess("fənn təsdiqləndi!");
//         } catch (error) {
//           if (error?.response?.status === 401) {
//             return dispatch(logoutAction());
//           }
//         }
//       }
//       if (error?.response?.data?.key === "email-already-exist") {
//         toastError("Bu email ilə istifadəçi mövcuddur");
//       }
//       if (error?.response?.data?.key === "has-current-week-lessons") {
//         toastError("Cari həftədə  dərsi olan təlimçi yenilənə bilməz");
//       }
//     } finally {
//       dispatch(modalLoading(false));
//     }
//   };

// export const downloadCoursesExcelAction = () => async (dispatch) => {
//   dispatch(downloadExcelLoading(true));
//   try {
//     const response = await API.get(`/excel`, {
//       responseType: "blob",
//     });

//     const url = window.URL.createObjectURL(new Blob([response.data]));

//     const link = document.createElement("a");
//     link.href = url;
//     link.setAttribute("download", "courses.xlsx");
//     document.body.appendChild(link);
//     link.click();
//     link.parentNode.removeChild(link);

//     dispatch(downloadExcelLoading(false));
//   } catch (error) {
//     dispatch(downloadExcelLoading(false));
//     toastError("Xəta baş verdi!");
//     console.log(error);
//   }
// };
