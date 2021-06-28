//******* Initial state ****************//
import {SIGN_IN_CANCEL,
    SIGN_IN_ERROR,
    SIGN_IN_REQUEST,
    SIGN_IN_SUCCESS,
    SIGN_OUT,
    USER_TOKEN_REFRESH,
    USER_TOKEN_UPDATE,
    TRY_AUTO_LOGIN_CANCEL,
    TRY_AUTO_LOGIN_REQUEST
} from "./action-types"

const EmptyUser={
    token:null,
}
export const initialState={
    tryAutologin: false,
    refreshingToken: false,
    authUser: EmptyUser,
    signedIn: false,
    signInDialogOpen: false
}
//**************************************//

//************* Reducer ****************//
export const reducer = (state, action) => {
    switch (action.type) {
        case SIGN_OUT:
            return initialState
        case SIGN_IN_REQUEST:
            return {...state, signInDialogOpen: true}
        case SIGN_IN_CANCEL:
            return {...state, signInDialogOpen: false}
        case SIGN_IN_SUCCESS:
            return {...state, signedIn: true, signInDialogOpen: false, authUser: action.payload}
        case USER_TOKEN_REFRESH:
            return {...state, refreshingToken:true, authUser: {...state.authUser, token: ''}}
        case USER_TOKEN_UPDATE:
            return {...state, refreshingToken:false, authUser: {...state.authUser, token: action.payload.access_token, rtoken: action.payload.refresh_token}}
        case SIGN_IN_ERROR:
            return {...state, signedIn: false, authUser: EmptyUser}
        case TRY_AUTO_LOGIN_REQUEST:
            return {...state, tryAutologin: true}
        case TRY_AUTO_LOGIN_CANCEL:
            return {...state, tryAutologin: false}
        default:
            return state
    }
}


