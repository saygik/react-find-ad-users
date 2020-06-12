//******* Initial state ****************//
import {SIGN_IN_CANCEL, SIGN_IN_ERROR, SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_OUT} from "./action-types"

export const initialState={
    authUser: null,
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
        case SIGN_IN_ERROR:
            return {...state, signedIn: false, authUser: null}
        default:
            return state
    }
}


