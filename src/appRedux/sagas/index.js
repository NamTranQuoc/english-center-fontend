import {all} from "redux-saga/effects";
import authSagas from "./Auth";
import memberSagas from "./Member"
import settingsSagas from "./Settings";
import commonSagas from "./Common";

export default function* rootSaga(getState) {
    yield all([
        authSagas(),
        memberSagas(),
        settingsSagas(),
        commonSagas()
    ]);
}
