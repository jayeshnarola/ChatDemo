//LIBRARIES
// import { combineReducers } from 'redux';

//ASSETS
import GetDataReducer from './GetDataReducer';
import AuthReducer from './AuthReduer';
import ChatReducer from './ChatReducer';

let rootReducer = {
    GetDataList: GetDataReducer,
    Auth: AuthReducer,
    Chat: ChatReducer,
  };
  export default rootReducer