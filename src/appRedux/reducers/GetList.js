import {
    CLEAR_ITEMS,
    GET_CLASS,
    GET_COURSE,
    GET_COURSE_CATEGORY,
    GET_DOCUMENT,
    GET_EXAM_SCHEDULE,
    GET_LIST_SUCCESS,
    GET_MEMBER,
    GET_REGISTER,
    GET_ROOM,
    GET_SHIFT, GET_STUDENT_ABSENT,
    GET_STUDENT_ABSENT_SUCCESS,
    GET_STUDENT_BY_CLASSROOM,
    GET_STUDENT_BY_CLASSROOM_SUCCESS,
    ON_HIDE_LOADER_TABLE, SELECT_ABSENT,
} from '../../constants/ActionTypes'

const INIT_STATE = {
    items: [],
    totalItems: 0,
    loaderTable: false,
    schedule: null,
    schedule_id: null
};

const GetListReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_STUDENT_ABSENT:
        case GET_STUDENT_BY_CLASSROOM:
        case GET_REGISTER:
        case GET_EXAM_SCHEDULE:
        case GET_CLASS:
    	case GET_DOCUMENT:
        case GET_ROOM:
        case GET_SHIFT:
        case GET_COURSE:
        case GET_COURSE_CATEGORY:
        case GET_MEMBER: {
            return {
                ...state,
                loaderTable: true,
                param: action.payload
            }
        }
        case GET_STUDENT_ABSENT_SUCCESS: {
            return {
                ...state,
                loaderTable: false,
                items: action.payload.students.map(item => {
                    return {
                        ...item,
                        selected: action.payload.schedule.absent_student_ids.includes(item._id)
                    }
                }),
                schedule: action.payload.schedule
            }
        }
        case SELECT_ABSENT: {
            return {
                ...state,
                schedule_id: action.payload,
                items: [],
                schedule: null
            }
        }
        case GET_STUDENT_BY_CLASSROOM_SUCCESS: {
            return {
                ...state,
                loaderTable: false,
                items: action.payload,
            }
        }
        case GET_LIST_SUCCESS: {
            return {
                ...state,
                items: action.payload.items,
                totalItems: action.payload.total_items
            }
        }
        case ON_HIDE_LOADER_TABLE: {
            return {
                ...state,
                loaderTable: false,
            }
        }
        case CLEAR_ITEMS: {
            return {
                ...state,
                items: [],
                totalItems: 0,
            }
        }
        default:
            return state;
    }
}

export default GetListReducer;
