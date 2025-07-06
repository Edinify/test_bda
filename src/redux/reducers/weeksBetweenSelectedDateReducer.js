import { WEEKS_BETWEEN_SELECTED_DATES_ACTION_TYPE } from "../actions-type";



export const weeksBetweenSelectedDatesReducer=(state={weeksBetweenSelectedDates:[]},action)=>{
    switch(action.type){
        case WEEKS_BETWEEN_SELECTED_DATES_ACTION_TYPE.GET_SELECTED_DATES:
            return{
                weeksBetweenSelectedDates:action.payload
            }
            default:
                return state
    }
       
}