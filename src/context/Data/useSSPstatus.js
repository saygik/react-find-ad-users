import {useContext, } from 'react'
import DataContext from "./DataContext"

const useSSPstatus=() => {
    const useAuth = () => useContext(DataContext)
    const {sspConnectionStatus} = useAuth()
    return sspConnectionStatus;
}
export default useSSPstatus
