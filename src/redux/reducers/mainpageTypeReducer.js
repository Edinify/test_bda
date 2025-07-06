import { MAIN_PAGE_TYPE_ACTION_TYPE } from "../actions-type";



export const mainPageTypeReducer=(state={mainpageType:"super-admin"},action)=>{
    switch(action.type){
        case MAIN_PAGE_TYPE_ACTION_TYPE.GET_MAIN_PAGE_TYPE:
            return{
                mainpageType:action.payload
            }
            default:
                return state;
    }
}