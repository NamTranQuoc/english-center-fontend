import {
    ADD_MEMBER,
    CHANGE_PASSWORD,
    DELETE_MEMBER,
    GET_ALL_TEACHERS,
    GET_ALL_TEACHERS_SUCCESS,
    GET_CURRENT_MEMBER,
    GET_LIST_SUCCESS,
    GET_MEMBER,
    ON_HIDE_LOADER_TABLE,
    UPDATE_CURRENT_MEMBER,
    UPDATE_MEMBER, UPDATE_SCORE_BY_EXCEL
} from "../../constants/ActionTypes";

export const getListMember = (param) => {
    return {
        type: GET_MEMBER,
        payload: param
    };
};

export const getListSuccess = (payload) => {
    return {
        type: GET_LIST_SUCCESS,
        payload: payload
    };
};


export const hideLoaderTable = () => {
    return {
        type: ON_HIDE_LOADER_TABLE,
    };
};

export const addMember = (member) => {
    return {
        type: ADD_MEMBER,
        payload: member
    };
};

export const updateMember = (member, param) => {
    return {
        type: UPDATE_MEMBER,
        payload: {
            member: member,
            param: param
        }
    };
};

export const deleteMember = (id, type, param) => {
    return {
        type: DELETE_MEMBER,
        payload: {
            id: id,
            type: type,
            param: param
        }
    };
};

export const getCurrentMember = () => {
    return {
        type: GET_CURRENT_MEMBER
    };
};

export const updateCurrentMember = (member) => {
    return {
        type: UPDATE_CURRENT_MEMBER,
        payload: member
    };
};

export const changePassword = (values) => {
    return {
        type: CHANGE_PASSWORD,
        payload: values
    };
};

export const getAllTeachers = () => {
    return {
        type: GET_ALL_TEACHERS,
        payload: {
            types: ["teacher"]
        }
    };
};

export const getAllTeachersSuccess = (param) => {
    return {
        type: GET_ALL_TEACHERS_SUCCESS,
        payload: param
    };
};

export const updateScoreByExcel = (path) => {
    return {
        type: UPDATE_SCORE_BY_EXCEL,
        payload: {
            path: path
        }
    };
};
