import { put, call, takeEvery } from 'redux-saga/effects'
import { GET_USER_ROLE_REQUEST, GET_USER_ROLE_SUCCESS, GET_USER_ROLE_FAILED } from '../Types/types'
import Api from '../../Services/api';

export const asyncSaga = function* asyncSaga() {
    try {
        console.log('---------------SAGA CALLING AVAILABILITY')
        const response = yield call(Api.getDataList)
        //console.log(response);
        yield put({ type: GET_USER_ROLE_SUCCESS, payload: response });
    }
    catch (e) {
        console.log(e, 'error');
        yield put({ type: GET_USER_ROLE_FAILED, payload: e });
    }
}


export function* dashboardSaga(){
    console.log("dasboard saga called");
    
    yield takeEvery(GET_USER_ROLE_REQUEST, asyncSaga);
}
export default dashboardSaga;