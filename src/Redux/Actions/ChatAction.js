import { GET_CHATLIST_REQUEST, GET_SEARCH_USER_REQUEST, GET_MESSAGES_REQUEST } from '../Types/types'

export const getConversionRequest = (params) => {
    console.log(params, "params in action")
    return {
        type: GET_CHATLIST_REQUEST,
        params
    };
}

export const getSearchUser = (params) => {
    console.log(params, "params in action")
    return {
        type: GET_SEARCH_USER_REQUEST,
        params
    };
}

export const getMessageList = (params) => {
    console.log(params, "params in action")
    return {
        type: GET_MESSAGES_REQUEST,
        params
    };
}
