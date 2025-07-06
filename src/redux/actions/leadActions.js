import axios from "axios";
import {
  INCOMES_MODAL_ACTION_TYPE,
  INCOME_ACTION_TYPE,
  LEAD_ACTION_TYPE,
  LEAD_MODAL_ACTION_TYPE,
} from "../actions-type";
import { apiRoot } from "../../apiRoot";
import { logoutAction } from "./auth";
import { toast } from "react-toastify";

const API = axios.create({
  baseURL: `${apiRoot}/lead`,
  withCredentials: true,
});

const refreshApi = axios.create({
  baseURL: `${apiRoot}/user/auth/refresh_token`,
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
  type: LEAD_ACTION_TYPE.LEAD_LOADING,
  payload: loadingValue,
});
const modalLoading = (loadingValue) => ({
  type: LEAD_MODAL_ACTION_TYPE.LEAD_MODAL_LOADING,
  payload: loadingValue,
});

export const getLeadPaginationAction =
  (length, startDate = "", endDate = "", monthCount = "") =>
  async (dispatch) => {
    dispatch(pageLoading(true));
    try {
      const { data } = await API.get(
        `/pagination?length=${length}&startDate=${startDate}&endDate=${endDate}&monthCount=${monthCount}
        `
      );

      dispatch({
        type: LEAD_ACTION_TYPE.GET_LEAD_PAGINATION,
        payload: data,
      });
    } catch (error) {
      // // console.log(error);
      const originalRequest = error.config;
      if (error.response?.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const token = await refreshApi.get("/");
          localStorage.setItem(
            "auth",
            JSON.stringify({
              AccessToken: token.data.accesstoken,
            })
          );

           await API.get(
            `/?length=${length}&startDate=${startDate || ""}&endDate=${
              endDate || ""
            }&monthCount=${monthCount || ""}`
          );
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

export const createLeadAction = (incomesData) => async (dispatch) => {
  dispatch(modalLoading(true));
  try {
    const { data } = await API.post("/", incomesData);

    dispatch({ type: LEAD_ACTION_TYPE.CREATE_LEAD, payload: data });
    dispatch({
      type: LEAD_MODAL_ACTION_TYPE.LEAD_OPEN_MODAL,
      payload: false,
    });
    dispatch({
      type: LEAD_MODAL_ACTION_TYPE.LEAD_MODAL_ACTIVATE_GET,
      payload: "create",
    });
    toastSuccess("Yeni məhsul əlavə edildi");
  } catch (error) {
    // // console.log(error);
    const originalRequest = error.config;
    toastError("Xəta baş verdi.");
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const token = await refreshApi.get("/");
        localStorage.setItem(
          "auth",
          JSON.stringify({
            AccessToken: token.data.accesstoken,
          })
        );

        await API.post("/", incomesData);

        dispatch({
          type: INCOMES_MODAL_ACTION_TYPE.INCOMES_OPEN_MODAL,
          payload: false,
        });
        toastSuccess("Yeni məhsul əlavə edildi");
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
    dispatch(modalLoading(false));
  }
};

export const updateLeadAction = (_id, leadData) => async (dispatch) => {
  dispatch(modalLoading(true));
  try {
    const { data } = await API.patch(`/${_id}`, leadData);
    dispatch({ type: LEAD_ACTION_TYPE.UPDATE_LEAD, payload: data });
    dispatch({
      type: LEAD_MODAL_ACTION_TYPE.LEAD_OPEN_MODAL,
      payload: false,
    });
    dispatch({
      type: LEAD_MODAL_ACTION_TYPE.LEAD_MODAL_ACTIVATE_GET,
      payload: "update",
    });
    toastSuccess("Məhsul yeniləndi");
  } catch (error) {
    // // console.log(error);
    toastError("Xəta baş verdi.");
    const originalRequest = error.config;
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const token = await refreshApi.get("/");
        localStorage.setItem(
          "auth",
          JSON.stringify({
            AccessToken: token.data.accesstoken,
          })
        );
        const { data } = await API.patch(`/${_id}`, leadData);
        dispatch({ type: INCOME_ACTION_TYPE.UPDATE_INCOME, payload: data });
        dispatch({
          type: INCOMES_MODAL_ACTION_TYPE.INCOMES_OPEN_MODAL,
          payload: false,
        });
        toastSuccess("Məhsul yeniləndi");
      } catch (error) {
        // // console.log(error);
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
  } finally {
    dispatch(modalLoading(false));
  }
};

export const deleteLeadAction = (id) => async (dispatch) => {
  try {
    const { data } = await API.delete(`/${id}`);

    dispatch({
      type: LEAD_ACTION_TYPE.DELETE_LEAD,
      payload: data._id,
    });

    dispatch({
      type: LEAD_MODAL_ACTION_TYPE.LEAD_MODAL_ACTIVATE_GET,
      payload: "delete",
    });

    toastSuccess("Lead silindi");
  } catch (error) {
    // console.log(error);
    toastError("Xəta baş verdi.");
    const originalRequest = error.config;
    if (error.response?.status === 403 && !originalRequest._retry) {
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
          type: LEAD_ACTION_TYPE.DELETE_LEAD,
          payload: data._id,
        });
        toastSuccess("Məhsul silindi");
      } catch (error) {
        // console.log(error);
        if (error?.response?.status === 401) {
          dispatch(logoutAction());
        }
      }
    }
    if (error?.response?.status === 403) {
      dispatch(logoutAction());
    }
  }
};
