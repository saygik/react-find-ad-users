import React, {useReducer,  useEffect} from 'react'

import mapDispatch from './actions'
import {reducer, initialState} from './reducer'
import AuthContext from './AuthContext'


const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const actions= mapDispatch(dispatch)

    useEffect(()=>{
            actions.findLocalStoreUser()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ,[])

    const value={
        signedIn:state.signedIn,
        user: state.authUser,
        signInDialogOpen: state.signInDialogOpen,
        actions: actions}
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
