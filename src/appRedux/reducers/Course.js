import {
    GET_ALL_COURSE,
    GET_ALL_COURSE_ADD,
    GET_ALL_COURSE_ADD_SUCCESS,
    GET_ALL_COURSE_BY_CATEGORY,
    GET_ALL_COURSE_BY_CATEGORY_SUCCESS,
    GET_ALL_COURSE_SUCCESS, GET_COURSE_SUGGEST,
} from '../../constants/ActionTypes'

const INIT_STATE = {
    coursesByCategoryId: [],
    coursesAdd: [],
    courses: []
};

const CourseReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_COURSE: {
            return {
                ...state,
                courses: []
            }
        }
        case GET_ALL_COURSE_SUCCESS: {
            return {
                ...state,
                courses: action.payload,
            }
        }
        case GET_ALL_COURSE_ADD: {
            return {
                ...state,
                coursesAdd: []
            }
        }
        case GET_ALL_COURSE_ADD_SUCCESS: {
            return {
                ...state,
                coursesAdd: action.payload,
            }
        }
        case GET_ALL_COURSE_BY_CATEGORY: {
            return {
                ...state,
                coursesByCategoryId: []
            }
        }
        case GET_ALL_COURSE_BY_CATEGORY_SUCCESS: {
            return {
                ...state,
                coursesByCategoryId: action.payload,
            }
        }
        case GET_COURSE_SUGGEST: {
            return {
                ...state,
                courses: []
            }
        }
        default:
            return state;
    }
}

export default CourseReducer;
