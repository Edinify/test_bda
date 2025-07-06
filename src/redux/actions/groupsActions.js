import axios from "axios";
import {
  ALL_GROUPS_ACTION,
  GROUP_ALL_ACTIONS_TYPE,
  GROUP_MODAL_ACTION_TYPE,
} from "../actions-type";
import { toast } from "react-toastify";
import { logoutAction } from "./auth";
import { apiRoot } from "../../apiRoot";

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

export const setLoadingAllGroupsAction = (loadingValue) => ({
  type: GROUP_ALL_ACTIONS_TYPE.GROUP_LOADING_ALL,
  payload: loadingValue,
});
const pageLoading = (loadingValue) => ({
  type: GROUP_ALL_ACTIONS_TYPE.GROUP_LOADING,
  payload: loadingValue,
});

const modalLoading = (loadingValue) => ({
  type: GROUP_MODAL_ACTION_TYPE.GROUP_MODAL_LOADING,
  payload: loadingValue,
});

export const getGroupsAction = (groupStatus, courseId) => async (dispatch) => {
  try {
    const { data } = await API.get(`/?status=${groupStatus}&courseId=${courseId||""}`);
    dispatch({ type: GROUP_ALL_ACTIONS_TYPE.GET_ALL_GROUPS, payload: data });
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
        dispatch({
          type: ALL_GROUPS_ACTION.GET_ALL_GROUPS,
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

export const getGroupsWithTeacherAction = (teacherId) => async (dispatch) => {
  try {
    const { data } = await API.get(`/with-teacher?teacherId=${teacherId}`);
    dispatch({ type: GROUP_ALL_ACTIONS_TYPE.GET_ALL_GROUPS, payload: data });
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

export const getGroupsWithMentorAction = (mentorId) => async (dispatch) => {
  try {
    const { data } = await API.get(`/with-mentor?mentorId=${mentorId}`);
    dispatch({ type: GROUP_ALL_ACTIONS_TYPE.GET_ALL_GROUPS, payload: data });
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

export const getGroupsWithStudentAction = (studentId) => async (dispatch) => {
  try {
    const { data } = await API.get(`/with-student?studentId=${studentId}`);
    dispatch({ type: GROUP_ALL_ACTIONS_TYPE.GET_ALL_GROUPS, payload: data });
  } catch (error) {
    // console.log(error);
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
        // console.log(error);
      }
    }
  }
};

export const getGroupsByCourseIdAction = (payload) => async (dispatch) => {
  dispatch(pageLoading(true));
  try {
    const { data } = await API.get(
      `/with-course?groupsCount=${payload.groupsCount}&searchQuery=${payload.searchQuery}`,
      { params: { courseIds: payload.courseIds } }
    );
    if (payload.groupsCount > 0) {
      dispatch({
        type: GROUP_ALL_ACTIONS_TYPE.GET_MORE_GROUP_ALL,
        payload: data,
      });
    } else {
      dispatch({
        type: GROUP_ALL_ACTIONS_TYPE.GET_MORE_GROUP_ALL_ADD,
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
          `/with-course?groupsCount=${payload.groupsCount}&searchQuery=${payload.searchQuery}&courseId=${payload.courseId}`
        );
        if (payload.groupsCount > 0) {
          dispatch({
            type: GROUP_ALL_ACTIONS_TYPE.GET_MORE_GROUP_ALL,
            payload: data,
          });
        } else {
          dispatch({
            type: GROUP_ALL_ACTIONS_TYPE.GET_MORE_GROUP_ALL_ADD,
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
    dispatch(pageLoading(false));
    dispatch(setLoadingAllGroupsAction(false));
  }
};

export const getGroupsPaginationAction =
  (length, searchQuery, status, courseId, teacherId) => async (dispatch) => {
    dispatch(pageLoading(true));
    // // console.log(status, "statussss");
    try {
      const { data } = await API.get(
        `/pagination?length=${length}&searchQuery=${
          searchQuery || ""
        }&status=${status}&courseId=${courseId || ""}&teacherId=${
          teacherId || ""
        }`
      );
      dispatch({
        type: GROUP_ALL_ACTIONS_TYPE.GET_GROUP_PAGINATION,
        payload: data,
      });
    } catch (error) {
      const originalRequest = error.config;
      // console.log(error);
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
            `/pagination?length=${length}&searchQuery=${searchQuery}&status=${status}&courseId=${courseId}&teacherId=${teacherId}`
          );
          dispatch({
            type: GROUP_ALL_ACTIONS_TYPE.GET_GROUP_PAGINATION,
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

export const createGroupAction = (groupData) => async (dispatch) => {
  dispatch(modalLoading(true));
  const status =
    window.location.pathname === "/groups/current"
      ? "current"
      : window.location.pathname === "groups/waiting"
      ? "waiting"
      : "ended";

  try {
    const { data } = await API.post("/", groupData);
    dispatch({
      type: GROUP_ALL_ACTIONS_TYPE.CREATE_GROUP,
      payload: data,
    });
    dispatch({
      type: GROUP_MODAL_ACTION_TYPE.GROUP_OPEN_MODAL,
      payload: false,
    });
    toastSuccess("Yeni qrup yaradıldı");
  } catch (error) {
    console.log(error);
    const originalRequest = error.config;
    // // console.log(error);
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
        const { data } = await API.post("/", groupData);
        dispatch(getGroupsPaginationAction(data.lastPage, "", status, "", ""));
        dispatch({
          type: GROUP_MODAL_ACTION_TYPE.GROUP_OPEN_MODAL,
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
    if (error?.response?.data?.key === "waiting-group-exists") {
      toastError("Bu ixtisas üçün yığılan qrup mövcuddur");
    }
    if (error?.response?.data?.key === "room-full") {
      toastError("Seçdiyiniz tarixdə otaq doludur!");
    }

    // console.log(error);
  } finally {
    dispatch(modalLoading(false));
  }
};

export const updateGroupAction = (_id, groupData) => async (dispatch) => {
  dispatch(modalLoading(true));
  try {
    const { data } = await API.patch(`/${_id}`, groupData);
    dispatch({ type: GROUP_ALL_ACTIONS_TYPE.UPDATE_GROUP, payload: data });
    dispatch({
      type: GROUP_MODAL_ACTION_TYPE.GROUP_OPEN_MODAL,
      payload: false,
    });
    toastSuccess("Qrup yeniləndi");
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
            AccessToken: token.data.accesstoken,
          })
        );
        const { data } = await API.patch(`/${_id}`, groupData);
        dispatch({
          type: GROUP_ALL_ACTIONS_TYPE.UPDATE_GROUP,
          payload: data,
        });
        dispatch({
          type: GROUP_MODAL_ACTION_TYPE.GROUP_OPEN_MODAL,
          payload: false,
        });
        toastSuccess("Qrup yeniləndi");
      } catch (error) {
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
    if (error?.response?.data?.key === "waiting-group-exists") {
      toastError("Bu ixtisas üçün yığılan qrup mövcuddur");
    }
    if (error?.response?.data?.key === "room-full") {
      toastError("Seçdiyiniz tarixdə otaq doludur!");
    }
  } finally {
    dispatch(modalLoading(false));
  }
};

export const deleteGroupAction = (id) => async (dispatch) => {
  try {
    const { data } = await API.delete(`/${id}`);

    dispatch({ type: GROUP_ALL_ACTIONS_TYPE.DELETE_GROUP, payload: data._id });
    toastSuccess("Qrup silindi");
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
          type: GROUP_ALL_ACTIONS_TYPE.DELETE_GROUP,
          payload: data._id,
        });
        toastSuccess("Qrup silindi");
      } catch (error) {
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }

    toastError(error?.response?.data.message);
  }
};

export const confirmGroupChangesAction =
  (_id, groupData) => async (dispatch) => {
    dispatch(modalLoading(true));
    try {
      const { data } = await API.patch(`/changes/confirm/${_id}`, groupData);
      dispatch({ type: GROUP_ALL_ACTIONS_TYPE.UPDATE_GROUP, payload: data });
      dispatch({
        type: GROUP_MODAL_ACTION_TYPE.CLOSE_GROUP_CONFIRM_MODAL,
      });
      toastSuccess("Yeniliklər təsdiqləndi!");
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
              AccessToken: token.data.accesstoken,
            })
          );
          const { data } = await API.patch(`/${_id}`, groupData);
          dispatch({
            type: GROUP_ALL_ACTIONS_TYPE.UPDATE_GROUP,
            payload: data,
          });
          dispatch({
            type: GROUP_MODAL_ACTION_TYPE.GROUP_OPEN_MODAL,
            payload: false,
          });
          toastSuccess("Qrup yeniləndi");
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

export const cancelGroupChangesAction =
  (_id, groupData) => async (dispatch) => {
    dispatch(modalLoading(true));
    try {
      const { data } = await API.patch(`/changes/cancel/${_id}`, groupData);
      dispatch({ type: GROUP_ALL_ACTIONS_TYPE.UPDATE_GROUP, payload: data });
      dispatch({
        type: GROUP_MODAL_ACTION_TYPE.CLOSE_GROUP_CONFIRM_MODAL,
        payload: false,
      });
      toastSuccess("Yeniliklər ləğv edildi!");
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
              AccessToken: token.data.accesstoken,
            })
          );
          const { data } = await API.patch(`/${_id}`, groupData);
          dispatch({
            type: GROUP_ALL_ACTIONS_TYPE.UPDATE_GROUP,
            payload: data,
          });
          dispatch({
            type: GROUP_MODAL_ACTION_TYPE.GROUP_OPEN_MODAL,
            payload: false,
          });
          toastSuccess("Qrup yeniləndi");
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
