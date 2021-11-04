import {all, fork, put, takeEvery} from "redux-saga/effects";
import {INIT_URL} from "../../constants/ActionTypes";
import {clearItems} from "../actions";

function* setInitUrlGenerate({payload}) {
    yield put(clearItems());
}

export function* setInitUrl() {
    yield takeEvery(INIT_URL, setInitUrlGenerate);
}

export default function* rootSaga() {
    yield all([
        fork(setInitUrl),
    ]);
}