import {
    CLEAR_ITEMS,
    GET_COURSE,
    GET_COURSE_CATEGORY, GET_DOCUMENT,
    GET_LIST_SUCCESS,
    GET_MEMBER, GET_ROOM, GET_SHIFT,
    ON_HIDE_LOADER_TABLE,
} from '../../constants/ActionTypes'

const INIT_STATE = {
    items: [],
    totalItems: 0,
    loaderTable: false
};

const GetListReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
    	case GET_DOCUMENT:
        case GET_ROOM:
        case GET_SHIFT:
        case GET_COURSE:
        case GET_COURSE_CATEGORY:
        case GET_MEMBER: {
            return {
                ...state,
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
        case CLEAR_ITEMS: {
            return {
                ...state,
                items: [],
                totalItems: 0,
            }
        }
        default:
            return state;
    }
}

export default GetListReducer;
