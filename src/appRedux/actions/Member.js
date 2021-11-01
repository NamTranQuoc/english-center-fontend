import {
    GET_MEMBER,
    GET_LIST_SUCCESS, SIGNUP_USER
} from "../../constants/ActionTypes";

export const getListMember = (param) => {
    console.log("action");
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