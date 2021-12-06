import {
    HIDE_CHANGE_PASSWORD,
    HIDE_MESSAGE,
    HIDE_MODAL, HIDE_UPDATE_MEMBER,
    INIT_URL,
    ON_HIDE_LOADER,
    ON_SHOW_LOADER,
    SELECT_INDEX,
    SET_MEMBER, SHOW_CHANGE_PASSWORD,
    SHOW_MESSAGE,
    SHOW_MODAL, SHOW_UPDATE_MEMBER, TOGGLE_COLLAPSED_NAV, WINDOW_WIDTH,
} from '../../constants/ActionTypes'

const INIT_STATE = {
    loading: false,
    message: '',
    navCollapsed: true,
    width: window.innerWidth,
    pathname: '/',
    hasShowModal: false,
    selectIndex: -1,
    member: null,
    hasShowUpdateMember: false,
    hasShowChangePassword: false,
};

const CommonReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case WINDOW_WIDTH:
            return {
                ...state,
                width: action.width,
            };
        case TOGGLE_COLLAPSED_NAV: {
            return {
                ...state,
                navCollapsed: action.navCollapsed
            }
        }
        case INIT_URL: {
            return {
                ...state,
                pathname: action.payload
            }
        }
        case SHOW_MESSAGE: {
            return {
                ...state,
                message: action.payload.message,
                loading: false
            }
        }
        case HIDE_MESSAGE: {
            return {
                ...state,
                loading: false
            }
        }
        case ON_SHOW_LOADER: {
            return {
                ...state,
                loading: true
            }
        }
        case ON_HIDE_LOADER: {
            return {
                ...state,
                loading: false
            }
        }
        case SHOW_MODAL: {
            return {
                ...state,
                hasShowModal: true
            }
        }
        case HIDE_MODAL: {
            return {
                ...state,
                hasShowModal: false
            }
        }
        case SHOW_UPDATE_MEMBER: {
            return {
                ...state,
                hasShowUpdateMember: true
            }
        }
        case HIDE_UPDATE_MEMBER: {
            return {
                ...state,
                hasShowUpdateMember: false
            }
        }
        case SHOW_CHANGE_PASSWORD: {
            return {
                ...state,
                hasShowChangePassword: true
            }
        }
        case HIDE_CHANGE_PASSWORD: {
            return {
                ...state,
                hasShowChangePassword: false
            }
        }
        case SELECT_INDEX: {
            return {
                ...state,
                selectIndex: action.payload
            }
        }
        case SET_MEMBER: {
            return {
                ...state,
                member: action.payload
            }
        }
        default:
            return state;
    }
}

export default CommonReducer;
