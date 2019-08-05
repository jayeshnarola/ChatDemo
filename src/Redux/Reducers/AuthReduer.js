import { GET_USER_LOGIN_SUCCESS, GET_USER_LOGIN_FAILED, GET_USER_REGISTER_SUCCESS, GET_USER_REGISTER_FAILED,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILED } from '../Types/types';


const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
    console.log(action, "ActionsinReducer")
    switch (action.type) {

        case GET_USER_LOGIN_SUCCESS:
            return { ...state, getUserLoginSuccess: true, data: action.payload }

        case GET_USER_LOGIN_FAILED:
            return { ...state, isRequestFailed: true, data: action.payload }

        case GET_USER_REGISTER_SUCCESS:
            return { ...state, getUserRegistrationSuccess: true, data: action.payload }

        case GET_USER_REGISTER_FAILED:
            return { ...state, isRegistrationRequestFailed: true, data: action.payload }

        case UPDATE_PROFILE_SUCCESS:
            {
                return { ...state, updateProfileSuccess: true, data: action.payload }
            }

        case UPDATE_PROFILE_FAILED:
            {
                return { ...state, isUpdateProfileFailed: true, data: action.payload }
            }
        default:
            return state;
    }
}