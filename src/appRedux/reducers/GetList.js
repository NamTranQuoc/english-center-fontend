import {GET_LIST_SUCCESS, GET_MEMBER, ON_HIDE_LOADER_TABLE} from "../../constants/ActionTypes";

const INIT_STATE = {
    items: [],
    totalItems: 0,
    loaderTable: false
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_MEMBER: {
            return {
                ...state,
                items: [],
                loaderTable: true,
                param: action.payload
            }
        }
        case GET_LIST_SUCCESS: {
            return {
                ...state,
                items: action.payload.items,
                totalItems: action.payload.total_items
            }
        }
        case ON_HIDE_LOADER_TABLE: {
            return {
                ...state,
                loaderTable: false,
            }
        }
        default:
            return state;
    }
}
