import { put, call, takeEvery } from 'redux-saga/effects'

import Api from '../../Services/api';
import {
    GET_CHATLIST_REQUEST,
    GET_CHATLIST_SUCCESS,
    GET_CHATLIST_FAILED,
    GET_SEARCH_USER_SUCCESS,
    GET_SEARCH_USER_FAILED,
    GET_SEARCH_USER_REQUEST,
    GET_MESSAGES_REQUEST,
    GET_MESSAGES_SUCCESS,
    GET_MESSAGES_FAILED,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILED
} from '../Types/types';

export const getconversionSaga = function* getconversionSaga({ params }) {
    try {
        console.log('---------------SAGA CALLING AVAILABILITY')
        const response = yield call(Api.getConversionList, params)
        //console.log(response);
        yield put({ type: GET_CHATLIST_SUCCESS, payload: response });
    }
    catch (e) {
        console.log(e, 'error');
        yield put({ type: GET_CHATLIST_FAILED, payload: e });
    }
}
export const getSearchUser = function* getSearchUser({ params }) {
    try {
        console.log('---------------SAGA CALLING AVAILABILITY')
        const response = yield call(Api.getSearchUser, params)
        //console.log(response);
        yield put({ type: GET_SEARCH_USER_SUCCESS, payload: response });
    }
    catch (e) {
        console.log(e, 'error');
        yield put({ type: GET_SEARCH_USER_FAILED, payload: e });
    }
}
export const getMessages = function* getMessages({ params }) {
    try {
        console.log('---------------SAGA CALLING AVAILABILITY')
        const response = yield call(Api.getMessageApi, params)
        //console.log(response);
        yield put({ type: GET_MESSAGES_SUCCESS, payload: response });
    }
    catch (e) {
        console.log(e, 'error');
        yield put({ type: GET_MESSAGES_FAILED, payload: e });
    }
}


export function* chatSaga() {
    yield takeEvery(GET_CHATLIST_REQUEST, getconversionSaga);
    yield takeEvery(GET_SEARCH_USER_REQUEST, getSearchUser);
    yield takeEvery(GET_MESSAGES_REQUEST, getMessages);
}
export default chatSaga;