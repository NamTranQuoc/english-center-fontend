import {HIDE_MESSAGE, INIT_URL, ON_HIDE_LOADER, ON_SHOW_LOADER, SHOW_MESSAGE} from "../../constants/ActionTypes";

const INIT_STATE = {
    loader: false,
    alertMessage: "",
    type: "error",
    initURL: "",
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case INIT_URL: {
            return {
                ...state,
                initURL: action.payload
            }
        }
        case SHOW_MESSAGE: {
            return {
                ...state,
                message: action.payload.message,
                type: action.payload.type,
                loader: false
            }
        }
        case HIDE_MESSAGE: {
            return {
                ...state,
                loader: false
            }
        }
        case ON_SHOW_LOADER: {
            return {
                ...state,
                loader: true
            }
        }
        case ON_HIDE_LOADER: {
            return {
                ...state,
                loader: false
            }
        }
        default:
            return state;
    }
}
