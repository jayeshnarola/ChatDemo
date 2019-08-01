import { GET_USER_ROLE_SUCCESS, GET_USER_ROLE_FAILED } from '../Types/types';


const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        
        case GET_USER_ROLE_SUCCESS:
            return { getUserRoleListSuccess: true, data: action.payload }

        case GET_USER_ROLE_FAILED:
            return { isRequestFailed: true, data: action.payload }
        
        default:
            return state;
    }
}