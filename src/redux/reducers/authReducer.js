import { AUTH_ALL_ACTION_TYPE } from "../actions-type";

const initialState = {
  auth: null,
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_ALL_ACTION_TYPE.LOGIN:
      localStorage.setItem("auth", JSON.stringify(action.payload.data));
      console.log(action.payload,"reducer data")
      return {
        ...state,
        auth: action.payload.data,
        loading: false,
        error: false,
      };
    case AUTH_ALL_ACTION_TYPE.LOGOUT:
      localStorage.clear();
      return {
        auth: null,
        loading: false,
        error: false,
      };
    case AUTH_ALL_ACTION_TYPE.AUTH_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
