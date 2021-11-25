import {
    GET_ALL_COURSE,
    GET_ALL_COURSE_SUCCESS, GET_SCHEDULE, GET_SCHEDULE_SUCCESS,
} from '../../constants/ActionTypes'

const INIT_STATE = {
    items: [],
    loaderTable: false
};

const CourseReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_SCHEDULE: {
            return {
                ...state,
                loaderTable: true
            }
        }
        case GET_SCHEDULE_SUCCESS: {
            return {
                ...state,
                items: action.payload,
                loaderTable: true
            }
        }
        default:
            return state;
    }
}

export default CourseReducer;
