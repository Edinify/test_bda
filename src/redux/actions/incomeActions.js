import axios from "axios";
import {
  INCOMES_MODAL_ACTION_TYPE,
  INCOME_ACTION_TYPE,
} from "../actions-type/";
import { apiRoot } from "../../apiRoot";
import { logoutAction } from "./auth";
import { toast } from "react-toastify";

const API = axios.create({
  baseURL: `${apiRoot}/income`,
  withCredentials:true
});

const refreshApi = axios.create({
  baseURL: `${apiRoot}/user/auth/refresh_token`,
  withCredentials:true
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
  type: INCOME_ACTION_TYPE.INCOME_LOADING,
  payload: loadingValue,
});
const modalLoading = (loadingValue) => ({
  type: INCOMES_MODAL_ACTION_TYPE.INCOMES_MODAL_LOADING,
  payload: loadingValue,
});

export const getIncomePaginationAction =
  (page = 1, startDate, endDate, monthCount, category, sort) =>
  async (dispatch) => {
    // // // console.log(page, startDate, endDate, monthCount, category, sort);
    dispatch(pageLoading(true));
    try {
      const { data } = await API.get(
        `/?page=${page}&startDate=${startDate || ""}&endDate=${
          endDate || ""
        }&monthCount=${monthCount || ""}&category=${category || ""}&sort=${
          sort || "oldest"
        }`
      );

      dispatch({
        type: INCOME_ACTION_TYPE.GET_INCOME_LAST_PAGE,
        payload: page,
      });
      dispatch({
        type: INCOME_ACTION_TYPE.GET_INCOME_PAGINATION,
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

          const { data } = await API.get(
            `/?page=${page}&startDate=${startDate || ""}&endDate=${
              endDate || ""
            }&monthCount=${monthCount || ""}&category=${category || ""}&sort=${
              sort || "oldest"
            }`
          );

          dispatch({
            type: INCOME_ACTION_TYPE.GET_INCOME_LAST_PAGE,
            payload: page,
          });
          dispatch({
            type: INCOME_ACTION_TYPE.GET_INCOME_PAGINATION,
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

export const createIncomesAction = (incomesData) => async (dispatch) => {
  dispatch(modalLoading(true));
  try {
    const { data } = await API.post("/", incomesData);
    dispatch(getIncomePaginationAction(data.lastPage, "", "", 1, "", "oldest"));
    dispatch({
      type: INCOMES_MODAL_ACTION_TYPE.INCOMES_OPEN_MODAL,
      payload: false,
    });
    dispatch({
      type: INCOMES_MODAL_ACTION_TYPE.INCOMES_MODAL_ACTIVATE_GET,
      payload: 'create',
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

        const { data } = await API.post("/", incomesData);
        dispatch(
          getIncomePaginationAction(data.lastPage, "", "", 1, "", "oldest")
        );
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
    if (error?.response?.status === 403){
      dispatch(logoutAction())
    }
  } finally {
    dispatch(modalLoading(false));
  }
};

export const updateIncomesAction = (_id, incomesData) => async (dispatch) => {

  dispatch(modalLoading(true));
  try {
    const { data } = await API.patch(`/${_id}`, incomesData);
    dispatch({ type: INCOME_ACTION_TYPE.UPDATE_INCOME, payload: data });
    dispatch({
      type: INCOMES_MODAL_ACTION_TYPE.INCOMES_OPEN_MODAL,
      payload: false,
    });
    dispatch({
      type: INCOMES_MODAL_ACTION_TYPE.INCOMES_MODAL_ACTIVATE_GET,
      payload: 'update',
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
        const { data } = await API.patch(`/${_id}`, incomesData);
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

export const deleteIncomesAction = ({_id, page, startDate, endDate, monthCount, category, sort}) => async (dispatch) => {
  try {
    await API.delete(`/${_id}`);
    dispatch({ type: INCOME_ACTION_TYPE.DELETE_INCOME, payload: _id });
    dispatch(getIncomePaginationAction(page, startDate, endDate, monthCount, category, sort));
    dispatch({
      type: INCOMES_MODAL_ACTION_TYPE.INCOMES_MODAL_ACTIVATE_GET,
      payload: 'delete',
    });
    toastSuccess("Məhsul silindi");
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

        await API.delete(`/${_id}`);
        dispatch({ type: INCOME_ACTION_TYPE.DELETE_INCOME, payload: _id });
        dispatch(getIncomePaginationAction(page, startDate, endDate, monthCount, category, sort));
        toastSuccess("Məhsul silindi");
      } catch (error) {
        // // console.log(error);
        if (error?.response?.status === 401) {
          dispatch(logoutAction());
        }
      }
    }
    if (error?.response?.status === 403){
      dispatch(logoutAction())
    }
  }
};
