import { ROOMS_MODAL_ACTION_TYPE } from "../actions-type";

const initialState = {
  roomsModalData: { name: "" },
  roomsOpenModal: false,
  roomsModalLoading: false,
  openConfirmModal: false,
};

export const roomsModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case ROOMS_MODAL_ACTION_TYPE.GET_ROOMS_MODAL:
      console.log(action.payload);
      return {
        ...state,
        roomsModalData: action.payload.data,
        roomsOpenModal: action.payload.openModal,
      };
    case ROOMS_MODAL_ACTION_TYPE.ROOM_OPEN_MODAL:
      return {
        ...state,
        roomsOpenModal: action.payload,
      };
    case ROOMS_MODAL_ACTION_TYPE.ROOM_MODAL_LOADING:
      return {
        ...state,
        roomsModalLoading: action.payload,
      };
    case ROOMS_MODAL_ACTION_TYPE.CLOSE_ROOM_CONFIRM_MODAL:
      return {
        ...state,
        ...initialState,
      };
    case ROOMS_MODAL_ACTION_TYPE.OPEN_ROOM_CONFIRM_MODAL:
      return {
        ...state,
        roomsModalData: action.payload.data,
        roomsOpenModal: action.payload.openModal,
        openConfirmModal: action.payload.confirmModal,
      };
    default:
      return state;
  }
};
