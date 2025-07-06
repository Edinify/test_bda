import { UPDATE_MODAL_ACTION_TYPE } from "../actions-type";

const initialState = {
  updatesModalData: {},
  updatesOpenModal: false,
};

export const udpatesModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MODAL_ACTION_TYPE.GET_UPDATES_MODAL:
      return {
        ...state,
        updatesModalData: action.payload.data,
        updatesOpenModal: action.payload.openModal,
      };
    case UPDATE_MODAL_ACTION_TYPE.UPDATES_OPEN_MODAL:
      return {
        ...state,
        updatesOpenModal: action.payload,
      };

    default:
      return state;
  }
};
