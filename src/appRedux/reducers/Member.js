import {GET_LIST_STUDENT_SUCCESS, GET_MEMBER} from "../../constants/ActionTypes";

const INIT_STATE = {
    alertMessage: "",
    showMessage: false,
    initURL: "",
    authUser: localStorage.getItem('token'),
    indexSelected: -1,
    loader: false,
    items: [],
    totalItems: 0
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_MEMBER: {
            return {
                ...state,
                loader: true,
                param: action.payload
            }
        }
        case GET_LIST_STUDENT_SUCCESS: {
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
