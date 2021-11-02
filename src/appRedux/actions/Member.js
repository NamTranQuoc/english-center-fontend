import {GET_LIST_SUCCESS, SIGNUP_USER} from "../../constants/ActionTypes";

export const getListMember = (param) => {
    return {
        type: SIGNUP_USER,
        payload: param
    };
};

export const getListMemberSuccess = (user) => {
    return {
        type: GET_LIST_SUCCESS,
        payload: user
    };
};