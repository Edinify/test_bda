import { EVENTS_MODAL_ACTION_TYPE } from "../actions-type";

const initialState = {
  eventsModalData: {},
  eventsOpenModal: false,
  eventsModalLoading: false,
  openConfirmModal: false,
};

export const eventModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case EVENTS_MODAL_ACTION_TYPE.GET_EVENTS_MODAL:
      return {
        ...state,
        eventsModalData: action.payload.data,
        eventsOpenModal: action.payload.openModal,
      };
    case EVENTS_MODAL_ACTION_TYPE.EVENT_OPEN_MODAL:
      return {
        ...state,
        eventsOpenModal: action.payload,
      };
    case EVENTS_MODAL_ACTION_TYPE.EVENT_MODAL_LOADING:
      return {
        ...state,
        eventsModalLoading: action.payload,
      };
    case EVENTS_MODAL_ACTION_TYPE.CLOSE_EVENT_CONFIRM_MODAL:
      return {
        ...state,
        ...initialState,
      };
    case EVENTS_MODAL_ACTION_TYPE.OPEN_EVENT_CONFIRM_MODAL:
      return {
        ...state,
        eventsModalData: action.payload.data,
        eventsOpenModal: action.payload.openModal,
        openConfirmModal: action.payload.confirmModal,
      };
    default:
      return state;
  }
};
