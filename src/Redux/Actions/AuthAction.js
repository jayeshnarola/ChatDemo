import { GET_USER_LOGIN_REQUEST, GET_USER_REGISTER_REQUEST } from '../Types/types'


export const getLoginRequest = (params) => {
    console.log(params, "params in action")
    return {
        type: GET_USER_LOGIN_REQUEST,
        params
    };
}


export const registrationRequest = (params) => {
    console.log(params, "params in action")
    return {
        type: GET_USER_REGISTER_REQUEST,
        params
    };
}
