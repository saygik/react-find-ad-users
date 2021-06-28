
import {
    SIGN_IN_REQUEST,
    SIGN_IN_CANCEL,
    SIGN_OUT,
    USER_TOKEN_REFRESH,
    USER_TOKEN_UPDATE,
    TRY_AUTO_LOGIN_CANCEL,
    TRY_AUTO_LOGIN_REQUEST
} from './action-types'

const SSP_USER_ATOKEN='SSP_USER_ATOKEN'
const SSP_USER_RTOKEN='SSP_USER_RTOKEN'

const mapDispatch = dispatch => ({
    refreshUserToken: () => dispatch({type: USER_TOKEN_REFRESH}),
    updateUserToken: (data) => {
        dispatch({type: USER_TOKEN_UPDATE, payload: data})
        data.access_token && localStorage.setItem(SSP_USER_ATOKEN, data.access_token);
        data.refresh_token && localStorage.setItem(SSP_USER_RTOKEN, data.refresh_token);

    },
    signIn: () => dispatch({type: SIGN_IN_REQUEST}),
    signOut: () => {
        dispatch({type: SIGN_OUT})
        localStorage.removeItem(SSP_USER_ATOKEN);
        localStorage.removeItem(SSP_USER_RTOKEN);
    },
    signInCancel: () => dispatch({type: SIGN_IN_CANCEL}),
    autoLogin: (status) => status ? dispatch({type: TRY_AUTO_LOGIN_REQUEST}) : dispatch({type: TRY_AUTO_LOGIN_CANCEL}),
})

export default mapDispatch
