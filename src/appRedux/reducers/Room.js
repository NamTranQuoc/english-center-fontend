import {GET_ALL_ROOMS_BY_STATUS_SUCCESS, GET_ALL_ROOMS_SUCCESS,} from '../../constants/ActionTypes'

const INIT_STATE = {
    rooms: [],
    roomsByStatus: []
};

const RoomReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_ROOMS_SUCCESS: {
            return {
                ...state,
                rooms: action.payload,
            }
        }
        case GET_ALL_ROOMS_BY_STATUS_SUCCESS: {
            return {
                ...state,
                roomsByStatus: action.payload,
            }
        }
        default:
            return state;
    }
}

export default RoomReducer;
