import {useContext, } from 'react'
import AuthContext from "./AuthContext"

const useAuthenticated=() => {
    const useAuth = () => useContext(AuthContext)
    const {signedIn} = useAuth()
    return signedIn;
}
export default useAuthenticated
