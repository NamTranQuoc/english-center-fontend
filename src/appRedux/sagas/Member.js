import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {GET_MEMBER} from "../../constants/ActionTypes";
import axios from "axios";
import {host} from "../store/Host";
import {showAuthMessage} from "../actions";

const INSTRUCTOR_API_URL = `${host}/member`;

const getListMemberRequest = async (payload) =>
    await axios({
        method: "POST",
        url: `${INSTRUCTOR_API_URL}/get_list?page=` + payload.page + `&size=` + payload.size,
        data: {
            sort: {
                is_asc: payload.is_asc,
                field: payload.field
            },
            types: payload.types,
            keyword: payload.keyword,
            from_date: payload.from_date,
            to_date: payload.to_date
        },
        headers: {
            Authorization: `Bearer ${payload.authUser}`,
        },
    }).then(response => response)
        .catch(error => error)

function* getListMemberGenerate({payload}) {
    try {
        const response = yield call(getListMemberRequest, payload);
        if (response.data.code !== 9999) {
            yield put(showAuthMessage(response.data.message));
        } else {

        }
    } catch (error) {
        console.log(error);
        yield put(showAuthMessage(error));
    }
}

export function* getListMember() {
    yield takeEvery(GET_MEMBER, getListMemberGenerate);
}

export default function* rootSaga() {
    yield all([
        fork(getListMember),
    ]);
}