import axios from "axios";
import { apiRoot } from "../../apiRoot";
import { UPDATES_ALL_ACTION_TYPE } from "../actions-type";

const API = axios.create({
  baseURL: `${apiRoot}/history`,
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

export const getUpdatesAction = (id) => async (dispatch) => {
  try {
    const { data } = await API.get(`/by-docmunet-id/${id}`);
    dispatch({ type: UPDATES_ALL_ACTION_TYPE.GET_ALL_UPDATES, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const ChangeUpdatesStatus  = (status,id) =>async(dispatch)=>{
  try {
      const {data} = await API.patch(`/${id}`,status);
      dispatch({type:UPDATES_ALL_ACTION_TYPE.CHANGE_UPDATES_STATUS,payload:data})
  } catch (error) {
      console.log(error)
  }

}
