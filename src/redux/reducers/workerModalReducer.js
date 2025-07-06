import { WORKER_MODAL_ACTION_TYPE } from "../actions-type";

const initialState = {
  workerModalData: {},
  workerOpenModal: false,
  workerModalLoading: false,
};

export const workerModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case WORKER_MODAL_ACTION_TYPE.GET_WORKER_MODAL:
      return {
        ...state,
        workerModalData: action.payload.data,
        workerOpenModal: action.payload.openModal,
      };
    case WORKER_MODAL_ACTION_TYPE.WORKER_OPEN_MODAL:
      return {
        ...state,
        workerOpenModal: action.payload,
      };
    case WORKER_MODAL_ACTION_TYPE.WORKER_MODAL_LOADING:
      return {
        ...state,
        workerModalLoading: action.payload,
      };
    default:
      return state;
  }
};
