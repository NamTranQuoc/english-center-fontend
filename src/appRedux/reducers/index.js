import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router'
import Settings from "./Settings";
import Auth from "./Auth";
import Common from "./Common";
import GetList from "./GetList";
import CourseCategory from "./CourseCategory"
import Shift from "./Shift";
import Course from "./Course";


const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    settings: Settings,
    auth: Auth,
    common: Common,
    getList: GetList,
    courseCategory: CourseCategory,
    shift: Shift,
    course: Course,
});

export default createRootReducer
