import React, {useReducer, useContext, useEffect, useMemo, useState, useCallback} from 'react'
import _ from 'lodash'
import api from '../../api'
import {reducer, initialState} from './reducer'
import moment from 'moment'
import {
    PEOPLES_DATA_REQUEST,
    PEOPLES_DATA_LOADING_PROGRESS,
    PEOPLES_DATA_ERROR,
    PEOPLES_DATA_SUCCESS,
    SOFT_DATA_REQUEST,
    SOFT_DATA_LOADING_PROGRESS,
    SOFT_DATA_SUCCESS,
    SOFT_DATA_ERROR,
    ZALS_DATA_REQUEST,
    ZALS_DATA_SUCCESS,
    ZALS_DATA_ERROR,
    ACTIVE_ZALS_DATA_REQUEST,
    ACTIVE_ZALS_DATA_SUCCESS,
    FETCH_INTERNET_GROUP_USERS_SUCCESS,
    FETCH_USERS_ALERTS_SUCCESS,
    SET_USERS_FILTRED,
    SET_SOFT_FILTRED,
    SET_SEARCHING,
    SET_NO_SEARCHING,
    SET_CURRENT_RESOURCE,
    SEARCH,
    SET_OU_FILTER,
    CLEAR_USERS_SECOND_FILTERS,
    ONEZAL_DATA_REQUEST,
    ONEZAL_DATA_SUCCESS,
    ONEZAL_DATA_ERROR
} from "./action-types"
import resourceTypes from './resource-types'
import mapDispatch from "./actions"

const DataContext = React.createContext()



export const DataProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [timeout,setNewTimeout]=useState(0)                 //Задержка фильтра при наборе текста
    const actions= useMemo(()=> mapDispatch(state,dispatch),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [])

   const setCurrentResource=useCallback((value,payload) => {
        switch (value) {
            case resourceTypes.PEOPLES :
                dispatch({type: SET_CURRENT_RESOURCE,payload: value})
                dispatch({type: SET_OU_FILTER,payload:''})
                if(!state.adUsers.loaded || moment.duration(moment()-state.adUsers.updated)/1000>300)
                    dispatch({type: PEOPLES_DATA_REQUEST})
                break
            case resourceTypes.STRUCTURE :
                dispatch({type: SET_CURRENT_RESOURCE,payload: value})
                dispatch({type: CLEAR_USERS_SECOND_FILTERS})
                if(!state.adUsers.loaded || moment.duration(moment()-state.adUsers.updated)/1000>300)
                    dispatch({type: PEOPLES_DATA_REQUEST})
                break
            case resourceTypes.SOFT :
                dispatch({type: SET_CURRENT_RESOURCE,payload: value})
                if(!state.software.loaded || moment.duration(moment()-state.software.updated)/1000>300)
                    dispatch({type: SOFT_DATA_REQUEST})
                break
            case resourceTypes.ZALS :
                dispatch({type: SET_CURRENT_RESOURCE,payload: value})
                if(!state.zals.loaded || moment.duration(moment()-state.zals.updated)/1000>300)
                    dispatch({type: ZALS_DATA_REQUEST})
                break
            case resourceTypes.ACTIVEZALS :
                dispatch({type: SET_CURRENT_RESOURCE,payload: value})
                dispatch({type: ACTIVE_ZALS_DATA_REQUEST})
                break
            case resourceTypes.ONEZAL :
                dispatch({type: SET_CURRENT_RESOURCE,payload: value})
                dispatch({type: ONEZAL_DATA_REQUEST, payload:payload.id})
                break
            default:
                return
        }
    },[state.adUsers, state.software, state.zals])

//***************************  Selectors  *********************//

    const selectors = {};
//    selectors.adUsers=usersWithInternetAndAlerts

    selectors.peoples=useMemo(()=> state.adUsers ,[state.adUsers])
    selectors.software=useMemo(()=> state.software ,[state.software])
    selectors.zals=useMemo(()=> state.zals ,[state.zals])
    selectors.activezals=useMemo(()=> state.activeZals ,[state.activeZals])
    selectors.oneZal=useMemo(()=> state.oneZal ,[state.oneZal])
    selectors.orderedzals=useMemo(()=> _.sortBy(state.zals.data, o => o.order) ,[state.zals.data])
    selectors.searchOU=useMemo(()=> state.searchOU ,[state.searchOU])


    selectors.loading=useMemo(()=> {
        return state.adUsers.loading
            || state.software.loading
    },[state.adUsers.loading,state.software.loading])

    selectors.searching=useMemo(()=> state.searching,[state.searching])

    selectors.searchValue=useMemo(()=> state.searchValue ,[state.searchValue])

    selectors.searchValues = useMemo(()=> state.searchValue.split(' ') ,[state.searchValue])

    selectors.serachType=useMemo(()=> state.serachType ,[state.serachType])
    // const searchTypeLabels={
    //     "peoples":"Люди",
    //     "soft":"Сервисы ИВЦ",
    // }
    // selectors.searchTypeLabel=useMemo(()=> {
    //     if(!state.serachType) return ''
    //     return searchTypeLabels[state.serachType]
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // } ,[state.serachType])

    selectors.loadingProgress=useMemo(()=> state.loadingProgress ,[state.loadingProgress])

    selectors.sortState=useMemo(()=> state.sortState ,[state.sortState])

    selectors.adFiltredUsers=useMemo(()=> state.adFiltredUsers ,[state.adFiltredUsers])

    selectors.filtredSoft=useMemo(()=> state.filtredSoft ,[state.filtredSoft])

    selectors.selectedUser=useMemo(()=> state.selectedUser ,[state.selectedUser])

    selectors.isCurrentListUsers=useMemo(()=>state.serachType==='peoples',[state.serachType])
    selectors.sidebarOpen=useMemo(()=>state.sidebarOpen,[state.sidebarOpen])

    selectors.currentListCount=useMemo(()=> {
        return selectors.isCurrentListUsers ? state.adFiltredUsers.length:state.filtredSoft.length
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } ,[state.adFiltredUsers,state.filtredSoft])

    const adUsers=useMemo(()=> state.adUsers.data ,[state.adUsers.data])
    const software=useMemo(()=> state.software ,[state.software])
    const usersWithInternet=useMemo(()=>{
        if (!state.internetUsers || state.internetUsers.length<1) return adUsers
        const users=adUsers.map(aduser=>{
            return {
                ...aduser,
                internet:_.some(state.internetUsers, ['name', aduser.userPrincipalName])
            }
        })
        return users
    },[adUsers,state.internetUsers])
    const usersWithInternetAndAlerts=useMemo(()=>{
        if (!state.userAlerts || state.userAlerts.length<1) return usersWithInternet
        const users=usersWithInternet.map(aduser=>{
            return {
                ...aduser,
                alerts:_.filter(state.userAlerts, ['email', aduser.userPrincipalName])
            }
        })
        return users
    },[usersWithInternet,state.userAlerts])
    const sortFields=useMemo(()=>Object.entries(state.sortState).filter(prop=>prop[1]).map(prop=>prop[0]),[state.sortState])


//***************************  Side Effects  *********************//

    useEffect( ()=>{
        if (state.adUsers.requested) {
            const SetProgress=(proc)=>{
                dispatch({type: PEOPLES_DATA_LOADING_PROGRESS, payload: proc })
            }
            const fetchData= async ()=>{
                const res = await api.getAdUser(SetProgress)
                if (res.length > 1) {
                    dispatch({type: PEOPLES_DATA_SUCCESS, payload: res})
                } else {
                    dispatch({type: PEOPLES_DATA_ERROR})
                }
                const inet= await api.getInternetGroup()
                if (inet.length>1) dispatch({type: FETCH_INTERNET_GROUP_USERS_SUCCESS, payload: inet})
                const alerts= await api.getUserAlerts()
                if (alerts.length>0) dispatch({type: FETCH_USERS_ALERTS_SUCCESS, payload: alerts})
            }
            fetchData()
        }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ,[state.adUsers.requested])
    useEffect( ()=>{
            if (state.software.requested) {
                const SetProgress=(proc)=>{
                    dispatch({type: SOFT_DATA_LOADING_PROGRESS, payload: proc })
                }
                const fetchData= async ()=>{
                    const res = await api.getSoftware(SetProgress)
                    if (res.length > 1) {
                        dispatch({type: SOFT_DATA_SUCCESS, payload: res})
                    } else {
                        dispatch({type: SOFT_DATA_ERROR})
                    }
                }
                fetchData()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ,[state.software.requested])
    useEffect( ()=>{
            if (state.zals.requested) {
                const fetchData= async ()=>{
                    const res = await api.getZals()
                    if (res.length > 1) {
                        dispatch({type: ZALS_DATA_SUCCESS, payload: res})
                    } else {
                        dispatch({type: ZALS_DATA_ERROR})
                    }
                }
                fetchData()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ,[state.zals.requested])
    useEffect( ()=>{
            if (state.activeZals.requested) {
                const fetchData= async ()=>{
                    const res = await api.getActiveZals()
                        dispatch({type: ACTIVE_ZALS_DATA_SUCCESS, payload: res})
                }
                fetchData()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ,[state.activeZals.requested])
    useEffect( ()=>{
            if (state.oneZal.requestId) {
                const fetchData= async ()=>{
                    const res = await api.getConfCurrentUsers(state.oneZal.requestId)
                    if (res.length > 0) {
                        dispatch({type: ONEZAL_DATA_SUCCESS, payload: res})
                    } else {
                        dispatch({type: ONEZAL_DATA_ERROR})
                    }
                }
                fetchData()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ,[state.oneZal.requestId])

    useEffect( ()=>{
            if (state.search) {
                dispatch({type: SEARCH, payload: false })
                dispatch({type: SET_SEARCHING})
                search()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ,[state.search])

    const search=()=>{
        let filtredUsers=[...usersWithInternetAndAlerts]
        let filtredSoft=[...software.data]
        if (state.searchOU && state.searchOU.length>0) {
            filtredUsers = _.filter(filtredUsers, user => {
                return user['dn'] && _.includes(user['dn'].toUpperCase(), state.searchOU.toUpperCase())
            })
        }
        if (state.searchValue && state.searchValue.length>0) {
            _.forEach(selectors.searchValues, searchValue => {
                filtredUsers = _.filter(filtredUsers, user => {
                        return state.adUsers.filters.some(filter=>
                            user[filter] && _.includes(user[filter].toUpperCase(), searchValue.toUpperCase())
                        )})
            })
            filtredSoft = _.filter(filtredSoft, soft => {
                    return _.includes(soft.title.toUpperCase(), state.searchValue.toUpperCase())
                        || (soft.tags && _.includes(soft.tags.toUpperCase(), state.searchValue.toUpperCase()))

                }
            )
        }

        if (filtredUsers.length>0) {
            for (var filter in selectors.peoples.secondFilters) {
                if (selectors.peoples.secondFilters[filter].value === 'true') {
                    // eslint-disable-next-line no-loop-func
                    filtredUsers = _.filter(filtredUsers, user => user[filter] && !!user[filter])
                } else if (selectors.peoples.secondFilters[filter].value === 'false') {
                    // eslint-disable-next-line no-loop-func
                    filtredUsers = _.filter(filtredUsers, user => !user[filter])
                }
            }

        }

        const sortedUsers = _.sortBy(filtredUsers, sortFields)

        dispatch({type: SET_USERS_FILTRED, payload: sortedUsers})
        dispatch({type: SET_SOFT_FILTRED, payload: _.sortBy(filtredSoft, 'title')})
        dispatch({type: SET_NO_SEARCHING})
    }
    useEffect(()=>{
        if(timeout) clearTimeout(timeout);
        const newTimeout = setTimeout(() => {
            dispatch({type: SEARCH, payload: true })
        }, 500);
        setNewTimeout(newTimeout)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[state.searchValue, sortFields, state.adUsers.secondFilters,state.searchOU, state.software.data])


//********************************************************************************************************//
    const value={
        state: state,
        selectors: selectors ,
        actions:actions,
        resourceTypes: resourceTypes,
        setCurrentResource: setCurrentResource,

    }

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}

export const useData = () => useContext(DataContext)
