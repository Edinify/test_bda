import {  
    DATEPICKER_ACTION_TYPE, 
    STUDENT_ATTENDACE_ACTION_TYPE, 
    WEEKS_BETWEEN_SELECTED_DATES_ACTION_TYPE,
    PAGINATION_PAGE_NUMBER_ACTION_TYPE,
    LESSON_STATUS_ACTION_TYPE
  } from "../actions-type";
  
  export const clearFilterStudent = () => {
      return (dispatch)=>{
        dispatch({type:STUDENT_ATTENDACE_ACTION_TYPE.GET_STUDENT_ATTENDANCE_TYPE,payload: 'all'})
        dispatch({ type: DATEPICKER_ACTION_TYPE.START_DATE, payload: '' });
        dispatch({ type: DATEPICKER_ACTION_TYPE.END_DATE, payload: '' });
        dispatch({type:WEEKS_BETWEEN_SELECTED_DATES_ACTION_TYPE.GET_SELECTED_DATES,payload:[]});
        dispatch({type:PAGINATION_PAGE_NUMBER_ACTION_TYPE.UPDATE_PAGE_NUMBER,payload:0});
      }
    };