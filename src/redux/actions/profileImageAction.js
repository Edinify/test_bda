import axios from "axios";
import { USER_ACTION_TYPE } from "../actions-type";
import { logoutAction } from "./auth";
import { toast } from "react-toastify";
import { apiRoot } from "../../apiRoot";

const refreshApi = axios.create({
  baseURL: `${apiRoot}/user/auth/refresh_token`,
  withCredentials:true
});

const API = axios.create({
  baseURL: `${apiRoot}/user`,
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

export const profileUpdateImage = (base64) => async (dispatch) => {
  try {
    const { data: updatedImageData } = await API.patch(
      "/profile/image/upload",
      base64
    );
    const { data: updatedUserData } = await API.get("/auth");
    dispatch({
      type: USER_ACTION_TYPE.UPDATE_IMAGE,
      payload: {
        profileImg: updatedImageData,
        user: updatedUserData.user,
      },
    });
    toastSuccess("Profil şəkli dəyişdi");
  } catch (error) {
    // // console.log(error, "img");
    if (error?.response?.status === 413) {
      toastError("Şəklin ölçüsü böyük olduğu üçün dəyişmək olmur");
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
        const { data: updatedImageData } = await API.patch(
          "/profile/image/upload",
          base64
        );
        const { data: updatedUserData } = await API.get("/auth");
        dispatch({
          type: USER_ACTION_TYPE.UPDATE_IMAGE,
          payload: {
            profileImg: updatedImageData,
            user: updatedUserData.user,
          },
        });
        toastSuccess("Profil şəkli dəyişdi");
      } catch (error) {
        // // console.log(error);
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
  }
};
export const profileGetImage = () => async (dispatch) => {
  try {
    const { data } = await API.get("/profile/image/");

    dispatch({ type: USER_ACTION_TYPE.GET_IMAGE, payload: data });
    localStorage.setItem("userProfileImg", JSON.stringify(data));
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

        const { data } = await API.get("/profile/image/");
        dispatch({ type: USER_ACTION_TYPE.GET_IMAGE, payload: data });
      } catch (error) {
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
  }
};
