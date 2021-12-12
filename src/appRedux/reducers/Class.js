import {GET_ALL_CLASS_BY_COURSE, GET_ALL_CLASS_BY_COURSE_SUCCESS, SAVE_COURSE_NAME,} from '../../constants/ActionTypes'

const INIT_STATE = {
    classByCourseId: [],
    CourseNameSelect: null,
};

const ClassReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_CLASS_BY_COURSE: {
            return {
                ...state,
                classByCourseId: []
            }
        }
        case GET_ALL_CLASS_BY_COURSE_SUCCESS: {
            return {
                ...state,
                classByCourseId: action.payload,
            }
        }
        case SAVE_COURSE_NAME: {
            return {
                ...state,
                CourseNameSelect: action.payload.name,
            }
        }
        default:
            return state;
    }
}

export default ClassReducer;
