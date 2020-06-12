import React, {useReducer, useContext, useEffect} from 'react'

import mapDispatch from './actions'
import {reducer, initialState} from './reducer'

const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
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

export const useAuth = () => useContext(AuthContext)
