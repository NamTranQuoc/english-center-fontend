import {GET_LIST_STUDENT_SUCCESS, GET_MEMBER} from "../../constants/ActionTypes";

export const getListMember = (param) => {
    return {
        type: GET_MEMBER,
        payload: param
    };
};

export const getListSuccess = (payload) => {
    return {
        type: GET_LIST_STUDENT_SUCCESS,
        payload: payload
    };
};