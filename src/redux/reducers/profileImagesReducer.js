import { USER_ACTION_TYPE } from "../actions-type";


const initialState={
  profileImg:{},
  user:{}
}

export const profileImageReducer = (
    state =initialState,
    action
  ) => {
    switch (action.type) {
      case USER_ACTION_TYPE.UPDATE_IMAGE:
        return {
          ...state,
          profileImg: action.payload.profileImg,
          user: action.payload.user,
        };
  
      case USER_ACTION_TYPE.GET_IMAGE:
        return {
          profileImg: action.payload,
          user: state.user,
        };
  
      default:
        return state;
    }
  };
  