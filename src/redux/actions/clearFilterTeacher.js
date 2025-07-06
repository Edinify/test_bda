import {  
    DATEPICKER_ACTION_TYPE, 
    WEEKS_BETWEEN_SELECTED_DATES_ACTION_TYPE,
    LESSON_STATUS_ACTION_TYPE,
    PAGINATION_PAGE_NUMBER_ACTION_TYPE
   
  } from "../actions-type";
  
  export const clearFilterTeacher = () => {
      return (dispatch)=>{
      dispatch({ type: DATEPICKER_ACTION_TYPE.START_DATE, payload: '' });
      dispatch({ type: DATEPICKER_ACTION_TYPE.END_DATE, payload: '' });
      dispatch({type:WEEKS_BETWEEN_SELECTED_DATES_ACTION_TYPE.GET_SELECTED_DATES,payload:[]});
      dispatch({type:LESSON_STATUS_ACTION_TYPE.UPDATE_LESSON_STATUS, payload: 'all'});
      dispatch({type:PAGINATION_PAGE_NUMBER_ACTION_TYPE.UPDATE_PAGE_NUMBER,payload:0});
      }
    };