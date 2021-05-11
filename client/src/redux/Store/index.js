import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"

import { composeWithDevTools } from "redux-devtools-extension"

import {
    LoginReducres,
    singUPReducres,
    UserlisrReducres,
    

} from "../Reducres/Auth_reducres"



const reducer = combineReducers({
    userLogin : LoginReducres,
    singUp : singUPReducres,
    listUsers : UserlisrReducres
})


const localStoreUser = localStorage.getItem('userInfo') ?
JSON.parse(localStorage.getItem('userInfo')) : null


const intialState = {
    userLogin : {
        userInfo : localStoreUser
    }
}




const middleware = [thunk]
const store = createStore(reducer, intialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store