import dashboardSaga from './GetDataSaga'
import authSaga from './authSaga'
import chatSaga from './chatSaga';
//Main Root Saga
const rootSaga = function* rootSaga() {
  yield* authSaga()
  yield* dashboardSaga()
  yield* chatSaga()
};
export default rootSaga;
