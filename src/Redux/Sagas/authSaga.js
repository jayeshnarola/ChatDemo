import { put, call, takeEvery } from 'redux-saga/effects'

import Api from '../../Services/api';
import { GET_USER_LOGIN_SUCCESS, GET_USER_LOGIN_FAILED, GET_USER_LOGIN_REQUEST, GET_USER_REGISTER_REQUEST, GET_USER_REGISTER_SUCCESS, GET_USER_REGISTER_FAILED, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILED, UPDATE_PROFILE_REQUEST } from '../Types/types';

export const asyncSaga = function* asyncSaga({ params }) {
    try {
        console.log('---------------SAGA CALLING AVAILABILITY')
        const response = yield call(Api.getLogin, params)
        //console.log(response);
        yield put({ type: GET_USER_LOGIN_SUCCESS, payload: response });
    }
    catch (e) {
        console.log(e, 'error');
        yield put({ type: GET_USER_LOGIN_FAILED, payload: e });
    }
}

export const registerSaga = function* registerSaga({ params }) {
    try {
        console.log('---------------SAGA CALLING AVAILABILITY')
        const response = yield call(Api.registerUser, params)
        //console.log(response);
        yield put({ type: GET_USER_REGISTER_SUCCESS, payload: response });
    }
    catch (e) {
        console.log(e, 'error');
        yield put({ type: GET_USER_REGISTER_FAILED, payload: e });
    }
}
export const updateProfile = function* updateProfile({ params }) {
    try {
        console.log('---------------SAGA CALLING AVAILABILITY')
        const response = yield call(Api.updateProfileApi, params)
        //console.log(response);
        yield put({ type: UPDATE_PROFILE_SUCCESS, payload: response });
    }
    catch (e) {
        console.log(e, 'error');
        yield put({ type: UPDATE_PROFILE_FAILED, payload: e });
    }
}


export function* authSaga() {
    yield takeEvery(GET_USER_LOGIN_REQUEST, asyncSaga);
    yield takeEvery(GET_USER_REGISTER_REQUEST, registerSaga);
    yield takeEvery(UPDATE_PROFILE_REQUEST, updateProfile);

}
export default authSaga;