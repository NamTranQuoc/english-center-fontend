import {GET_LIST_SUCCESS, GET_MEMBER} from "../../constants/ActionTypes";

const INIT_STATE = {
    items: [],
    totalItems: 0
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_MEMBER: {
            return {
                ...state,
                items: [],
                loader: true,
                param: action.payload
            }
        }
        case GET_LIST_SUCCESS: {
            return {
                ...state,
                loader: false,
                items: action.payload.items,
                totalItems: action.payload.total_items
            }
        }
        default:
            return state;
    }
}
