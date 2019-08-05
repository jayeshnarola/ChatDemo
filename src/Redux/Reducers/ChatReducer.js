import {
    GET_CHATLIST_SUCCESS,
    GET_CHATLIST_FAILED,
    GET_SEARCH_USER_SUCCESS,
    GET_SEARCH_USER_FAILED,
    GET_MESSAGES_SUCCESS,
    GET_MESSAGES_FAILED,
} from '../Types/types';


const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
    // console.log(action, "ActionsinReducer", state)
    let userId;
    if (action.other_user_id) {
        userId = action.other_user_id
    }
    switch (action.type) {

        case GET_CHATLIST_SUCCESS:
            return { ...state, getUserRegistrationSuccess: true, data: action.payload }

        case GET_CHATLIST_FAILED:
            return { ...state, isRegistrationRequestFailed: true, data: action.payload }


        case GET_SEARCH_USER_SUCCESS:
            return { ...state, getSearchUserSuccess: true, searchUserList: action.payload }

        case GET_SEARCH_USER_FAILED:
            return { ...state, isSearchUserRequestFailed: true, searchUserList: action.payload }

        case GET_MESSAGES_SUCCESS:
            {
                let obj = {}
                if (obj && state.messagesList && action.payload) {
                    obj = state.messagesList
                    // console.log(obj, "obj1", action.payload)
                    obj[action.payload.other_user_id] = action.payload
                }
                else {
                    // console.log(obj, "obj")
                    obj[action.payload.other_user_id] = action.payload
                }
                return { ...state, getMessageSuccess: true, messagesList: obj }
            }

        case GET_MESSAGES_FAILED:
            return { ...state, getMessageSuccess: false, messageData: action.payload }

        
        default:
            return state;
    }
}