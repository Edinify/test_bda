import axios from "axios";
import { apiRoot } from "../../apiRoot";
import {
  WHERE_HEARD_ALL_ACTIONS_TYPE,
  WHERE_HEARD_MODAL_ACTION_TYPE,
} from "../actions-type";
import { toast } from "react-toastify";

const API = axios.create({
  baseURL: `${apiRoot}/where-coming`,
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

const refreshApi = axios.create({
  baseURL: `${apiRoot}/user/auth/refresh_token`,
  withCredentials: true,
});

const whereHeardModalOpen = (value) => ({
  type: WHERE_HEARD_MODAL_ACTION_TYPE.WHERE_HEARD_OPEN_MODAL,
  payload: value,
});

const setLoadingwhereHeardAction = (loadingValue) => ({
  type: WHERE_HEARD_ALL_ACTIONS_TYPE.WHERE_LOADING,
  payload: loadingValue,
});
const modalLoading = (loadingValue) => ({
  type: WHERE_HEARD_MODAL_ACTION_TYPE.WHERE_HEARD_MODAL_LOADING,
  payload: loadingValue,
});

export const getAllWhereComing = () => async (dispatch) => {
  dispatch(setLoadingwhereHeardAction(true));
  try {
    const { data } = await API.get("/all");
    dispatch({
      type: WHERE_HEARD_ALL_ACTIONS_TYPE.GET_ALL_WHERE_COMING,
      payload: data,
    });
  } catch (error) {
    // // console.log(error);
  } finally {
    dispatch(setLoadingwhereHeardAction(false));
  }
};

export const getActiveWhereComing = () => async (dispatch) => {
  try {
    const { data } = await API.get("/active");
    dispatch({
      type: WHERE_HEARD_ALL_ACTIONS_TYPE.GET_ACTIVE_WHERE_COMING,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createWhereComing = (newData) => async (dispatch) => {
  dispatch(setLoadingwhereHeardAction(true));
  try {
    const { data } = await API.post("/", newData);
    dispatch({
      type: WHERE_HEARD_ALL_ACTIONS_TYPE.CREATE_WHERE_COMING,
      payload: data,
    });
    dispatch(whereHeardModalOpen(false));
    toastSuccess("Yeni reklam yaradıldı");
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(modalLoading(false));
  }
};

export const updateWhereComing = (id, newData) => async (dispatch) => {
  dispatch(modalLoading(true));
  try {
    const { data } = await API.patch(`/${id}`, newData);
    dispatch({
      type: WHERE_HEARD_ALL_ACTIONS_TYPE.UPDATE_WHERE_COMING,
      payload: data,
    });
    toastSuccess("Reklam yeniləndi");
    dispatch(whereHeardModalOpen(false));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(modalLoading(false));
  }
};
