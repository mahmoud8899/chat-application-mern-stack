import {
    ADD_USER_LOADING,
    ADD_USER_SUCCESS,
    ADD_USER_FAIL,
    ADD_USER_RESET,

    ADD_USER_SINGUP_LOGIN,
    ADD_USER_SINGUP_SECCESS,
    ADD_USER_SINGUP_FAIL,

    
    ADD_USERLIST_SUCCESS,
    ADD_USERLIST_FAIL,
} from "../Action/types"










// userlist ... 
export const UserlisrReducres = (state = {userList : [] }, action)=>{
switch(action.type){
   
    case ADD_USERLIST_SUCCESS : return {...state,userList: action.payload}
    case ADD_USERLIST_FAIL : return {error: action.payload}
    default : return state
}
}

// singup 
export const singUPReducres = (state = { userInfo: {} }, action) => {
    switch (action.type) {
        case ADD_USER_SINGUP_LOGIN: return { loading: true }
        case ADD_USER_SINGUP_SECCESS: return { userInfo: action.payload, success: true }
        case ADD_USER_SINGUP_FAIL: return { error: action.payload }
        default: return state
    }
}
// logoin....
export const LoginReducres = (state = { userInfo: {} }, action) => {
    switch (action.type) {
        case ADD_USER_LOADING: return { loading: true }
        case ADD_USER_SUCCESS: return { userInfo: action.payload }
        case ADD_USER_FAIL: return { error: action.payload }
        case ADD_USER_RESET: return {}
        default: return state
    }
}