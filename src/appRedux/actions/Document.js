import {ADD_DOCUMENT, DELETE_DOCUMENT, GET_DOCUMENT, UPDATE_DOCUMENT} from "../../constants/ActionTypes";

export const getListDocument = (param) => {
    return {
        type: GET_DOCUMENT,
        payload: param
    };
};

export const addDocument = (param) => {
    return {
        type: ADD_DOCUMENT,
        payload: param
    };
};

export const updateDocument = (document, param) => {
    return {
        type: UPDATE_DOCUMENT,
        payload: {
            document: document,
            param: param
        }
    };
};

export const deleteDocument = (id, param) => {
    return {
        type: DELETE_DOCUMENT,
        payload: {
            id: id,
            param: param
        }
    };
};
