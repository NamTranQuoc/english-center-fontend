import {GET_MEMBER} from "../../constants/ActionTypes";

const INIT_STATE = {
    loader: false,
    alertMessage: "",
    showMessage: false,
    initURL: "",
    authUser: localStorage.getItem('token'),
    indexSelected: -1,
    items: [],
    totalItems: 0,
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
        default:
            return state;
    }
}
