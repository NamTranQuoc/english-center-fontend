import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {GET_COURSE} from "../../constants/ActionTypes";
import {getListSuccess, hideLoaderTable, showMessage} from "../actions";
import axios from "axios";
import {host} from "../store/Host";

const INSTRUCTOR_API_URL = `${host}/course`;

export function* getListCourse() {
    yield takeEvery(GET_COURSE, getListCourseGenerate);
}

function* getListCourseGenerate({payload}) {
    try {
        const response = yield call(getListCourseRequest, payload);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(getListSuccess(response.data.payload));
        }
    } catch (error) {
        yield put(showMessage(error));
    } finally {
        yield put(hideLoaderTable());
    }
}

const getListCourseRequest = async (payload) =>
    await axios({
        method: "POST",
        url: `${INSTRUCTOR_API_URL}/get_list?page=` + payload.page + `&size=` + payload.size,
        data: {
            sort: payload.sort,
            category_courses: payload.category_courses,
            keyword: payload.keyword,
            from_date: payload.from_date,
            to_date: payload.to_date
        },
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
        },
    }).then(response => response)
        .catch(error => error)

export default function* rootSaga() {
    yield all([
        fork(getListCourse),
    ]);
}
