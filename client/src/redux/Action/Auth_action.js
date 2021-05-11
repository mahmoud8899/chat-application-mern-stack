import {
    ADD_USER_LOADING,
    ADD_USER_SUCCESS,
    ADD_USER_FAIL,
    ADD_USER_RESET,


    ADD_LOGOUT,

    ADD_USER_SINGUP_LOGIN,
    ADD_USER_SINGUP_SECCESS,
    ADD_USER_SINGUP_FAIL,



    ADD_USERLIST_LOADING,
    ADD_USERLIST_SUCCESS,
    ADD_USERLIST_FAIL,



} from "./types"

import axios from "axios"






// login google//
export const Google_Action = (user) => async (dispatch) => {
    try {
        const { data } = await axios.post(`/api/user/google/`, user)
        dispatch({ type: ADD_USER_SUCCESS, payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: ADD_USER_FAIL,
            payload: error.response &&
                error.response.data.message ?
                error.response.data.message :
                error.response
        })
    }
}




// userList GET..
//localhost:8000/api/users
export const userList_action = (keyword = '') => async (dispatch) => {
    try {
        dispatch({ type: ADD_USERLIST_LOADING })
        const { data } = await axios.get(`/api/users/?keyword=${keyword}`)
        dispatch({ type: ADD_USERLIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: ADD_USERLIST_FAIL,
            payload: error.response &&
                error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}







// singup
// POST localhost:8000/api/singup/
export const SingUp_action = (user) => async (dispatch) => {

    try {
        dispatch({ type: ADD_USER_SINGUP_LOGIN })
        const { data } = await axios.post(`/api/singup/`, user)
        dispatch({ type: ADD_USER_SINGUP_SECCESS })
        dispatch({ type: ADD_USER_SUCCESS, payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: ADD_USER_SINGUP_FAIL,
            payload: error.response &&
                error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}


// logout...
export const lOgout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: ADD_LOGOUT })
    dispatch({ type: ADD_USER_RESET })
}



//POST LOGIN IN ...
// localhost:8000/api/login/
export const Action_Login = (user) => async (dispatch) => {
    try {
        dispatch({ type: ADD_USER_LOADING })

        const { data } = await axios.post(`/api/login/`, user)
        dispatch({ type: ADD_USER_SUCCESS, payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {

        dispatch({
            type: ADD_USER_FAIL,
            payload: error.response
                && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}


