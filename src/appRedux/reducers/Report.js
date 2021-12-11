import {
    REPORT_ACTION_RECENT_SUCCESS,
    REPORT_COUNT_SUCCESS,
    REPORT_STATISTICAL_BY_PAID_SUCCESS,
    REPORT_STATISTICAL_BY_REGISTER_SUCCESS,
} from '../../constants/ActionTypes'

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
    actionRecent: [],
    statisticalByRegister: {
        "total": 0,
        "percent": 0,
        "details": [
            {
                "name": "-",
                "total": 0,
                "percent": 0
            },
            {
                "name": "-",
                "total": 0,
                "percent": 0
            },
            {
                "name": "-",
                "total": 0,
                "percent": 0
            },
            {
                "name": "-",
                "total": 0,
                "percent": 0
            }
        ]
    },
    statisticalByPaid: {
        "total": 0,
        "percent": 0,
        "details": [
            {
                "name": "-",
                "total": 0,
                "percent": 0
            },
            {
                "name": "-",
                "total": 0,
                "percent": 0
            },
            {
                "name": "-",
                "total": 0,
                "percent": 0
            },
            {
                "name": "-",
                "total": 0,
                "percent": 0
            }
        ]
    }
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
        case REPORT_STATISTICAL_BY_PAID_SUCCESS: {
            return {
                ...state,
                statisticalByPaid: action.payload,
            }
        }
        case REPORT_STATISTICAL_BY_REGISTER_SUCCESS: {
            return {
                ...state,
                statisticalByRegister: action.payload
            }
        }
        default:
            return state;
    }
}

export default RoomReducer;
