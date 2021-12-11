import {
    ADD_ROOM,
    DELETE_ROOM,
    GET_ALL_ROOMS,
    GET_ALL_ROOMS_BY_STATUS,
    GET_ALL_ROOMS_BY_STATUS_SUCCESS,
    GET_ALL_ROOMS_SUCCESS,
    GET_ROOM,
    UPDATE_ROOM
} from "../../constants/ActionTypes";

export const getListRoom = (param) => {
    return {
        type: GET_ROOM,
        payload: param
    };
};

export const addRoom = (param) => {
    return {
        type: ADD_ROOM,
        payload: param
    };
};

export const getAllRooms = () => {
    return {
        type: GET_ALL_ROOMS,
    };
};

export const getAllRoomsSuccess = (param) => {
    return {
        type: GET_ALL_ROOMS_SUCCESS,
        payload: param
    };
};

export const getAllRoomsByStatus = (status, capacity) => {
    return {
        type: GET_ALL_ROOMS_BY_STATUS,
        payload: {
            status: status,
            capacity: capacity
        }
    };
};

export const getAllRoomsByStatusSuccess = (param) => {
    return {
        type: GET_ALL_ROOMS_BY_STATUS_SUCCESS,
        payload: param
    };
};

export const updateRoom = (room, param) => {
    return {
        type: UPDATE_ROOM,
        payload: {
            room: room,
            param: param
        }
    };
};

export const deleteRoom = (id, param) => {
    return {
        type: DELETE_ROOM,
        payload: {
            id: id,
            param: param
        }
    };
};
