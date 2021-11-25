import {GET_ROOMS, GET_ROOMS_SUCCESS,} from '../../constants/ActionTypes'

const INIT_STATE = {
    rooms: []
};

const RoomReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ROOMS: {
            return {
                ...state,
                rooms: []
            }
        }
        case GET_ROOMS_SUCCESS: {
            return {
                ...state,
                rooms: action.payload,
            }
        }
        default:
            return state;
    }
}

export default RoomReducer;
