import {REPORT_ACTION_RECENT_SUCCESS, REPORT_COUNT_SUCCESS,} from '../../constants/ActionTypes'

const INIT_STATE = {
    counter: {
        student: {
            count: 0,
            percent: 0
        },
        teacher: {
            count: 0,
            percent: 0
        },
        receptionist: {
            count: 0,
            percent: 0
        },
        classroom: {
            count: 0,
            percent: 0
        }
    },
    actionRecent: []
};

const RoomReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case REPORT_COUNT_SUCCESS: {
            return {
                ...state,
                counter: action.payload,
            }
        }
        case REPORT_ACTION_RECENT_SUCCESS: {
            return {
                ...state,
                actionRecent: action.payload
            }
        }
        default:
            return state;
    }
}

export default RoomReducer;
