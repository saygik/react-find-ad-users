import React, {useReducer, useEffect, } from 'react'
import api from "../../api"
import mapDispatch from './actions'
import {reducer, initialState} from './reducer'
import AuthContext from './AuthContext'
import {SIGN_IN_ERROR, SIGN_IN_SUCCESS} from "./action-types"
import {useSnackbar} from "notistack"
import { useHistory  } from 'react-router-dom';


const SSP_USER_ATOKEN='SSP_USER_ATOKEN'
const SSP_USER_RTOKEN='SSP_USER_RTOKEN'

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const actions= mapDispatch(dispatch)
    const { enqueueSnackbar } = useSnackbar()
    const history=useHistory()
    // const location = useLocation();

    const refreshToken = async () => {
        actions.refreshUserToken()
        if (!state.signedIn) return
        try {
            const newToken= await api.refreshToken(state.authUser.rtoken)
            actions.updateUserToken(newToken.data)
            enqueueSnackbar(`Обновлен токен сервера` , { variant: 'info' })
        } catch(e) {
            actions.signOut()
        }
    }
const getAuth= async (email, password) => {
        try {
            const response= await api.getAuth(email,password)
            const user={
                name: response.data.user.cn,
                email: response.data.user.userPrincipalName,
                admin:response.data.user.admin || false,
                ao:response.data.user.ao,
                token: response.data.token.access_token,
                rtoken: response.data.token.refresh_token,
            }
            dispatch({type: SIGN_IN_SUCCESS, payload:user})
            user.token && localStorage.setItem(SSP_USER_ATOKEN, user.token);
            user.rtoken && localStorage.setItem(SSP_USER_RTOKEN, user.rtoken);
            dispatch({type: SIGN_IN_SUCCESS, payload:user})
            enqueueSnackbar(`Вы вошли как  ${user.name || user.email}` , { variant: 'info' })
            history.push('/')
        }catch (e) {
            dispatch({type: SIGN_IN_ERROR})
            if (e.response?.data?.message) {
//                console.log('-e-',e.response)
                    enqueueSnackbar('Вход в систему не был произведен: ' + e.response?.data?.message, {variant: 'error'})
            } else  enqueueSnackbar('Вход в систему не был произведен: ' + e.message, {variant: 'error'})
        }
}
    useEffect(()=>{

    },[state.signedIn])
    useEffect(()=>{
//            actions.findLocalStoreUser()
        async function tryReconnect() {
            const atoken = localStorage.getItem('SSP_USER_ATOKEN')
            const rtoken = localStorage.getItem('SSP_USER_RTOKEN')
            if (!atoken) return
            async function atokenReconnect(at, rt) {
                try {
                    const response = await api.findUser(at)
                    if (response.status === 200 && response.data) {
                        const user = {
                            name: response.data.user.cn,
                            email: response.data.user.userPrincipalName,
                            admin: response.data.user.admin || false,
                            ao: response.data.user.ao,
                            token: at,
                            rtoken: rt,
                        }
                        dispatch({type: SIGN_IN_SUCCESS, payload: user})
                        return true
                    }
                } catch (error) {
                    if (error.response.status === 401) {
                        return false
                    }
                    throw new Error("Ошибка получения токена с сервера")
                }
            }

            try {
                const atokenValid= await atokenReconnect(atoken, rtoken)
                if (!atokenValid) {
                    const newToken= await api.refreshToken(rtoken)
                    await atokenReconnect(newToken.data.access_token, newToken.data.refresh_token)
                }
            } catch(e) {
                actions.autoLogin(true)
                actions.signOut()
                actions.autoLogin(false)
            }

        }
            tryReconnect()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ,[])

    const value={
        signedIn:state.signedIn,
        autologin: state.tryAutologin,
        refreshToken: refreshToken,
        refreshingToken: state.refreshingToken,
        user: state.authUser,
        signInDialogOpen: state.signInDialogOpen,
        actions: actions,
        getAuth: getAuth
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider
