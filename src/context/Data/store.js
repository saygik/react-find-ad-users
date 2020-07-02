import React, {useReducer, useContext, useEffect, useMemo, useState, useCallback} from 'react'
import _ from 'lodash'
import api from '../../api'
import {reducer, initialState} from './reducer'
import moment from 'moment'
import {
//    FETCH_DATA_REQUEST,
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
    FETCH_INTERNET_GROUP_USERS_SUCCESS,
    FETCH_USERS_ALERTS_SUCCESS,
    SET_SEARCH_VALUE,
    SET_SORT_STATE,
    SET_USERS_FILTRED,
    SET_SOFT_FILTRED,
    SET_SEARCHING,
    SET_NO_SEARCHING,
    SET_CURRENT_RESOURCE,
    SET_SELECTED_USER,
    SET_SIDEBAR,
    SEARCH,
    SET_USERS_SECOND_FILTERS
} from "./action-types"
import resourceTypes from './resource-types'

const DataContext = React.createContext()


//**************************************//
//const [searching,setSearching]=useState(false)              //Поиск

//const [adFiltredUsers,setAdFiltredUsers]=useState([])       //Отфильтрованные пользователи
//const [filtredSoft,setFiltredSoft]=useState([])             //Отфильтрованный софт
//************* Reducer ****************//

//**************************************//


export const DataProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [timeout,setNewTimeout]=useState(0)                 //Задержка фильтра при наборе текста
    const emptyObject = {}
//**************************************//
//*******     actions     *****************//
   const setCurrentResource=useCallback((value) => {

        switch (value) {
            case resourceTypes.PEOPLES :
                dispatch({type: SET_CURRENT_RESOURCE,payload: value})
//                console.log('---',moment.duration(moment()-state.adUsers.updated)/1000)
                 if(!state.adUsers.loaded || moment.duration(moment()-state.adUsers.updated)/1000>300)
                     dispatch({type: PEOPLES_DATA_REQUEST})
            case resourceTypes.SOFT :
                dispatch({type: SET_CURRENT_RESOURCE,payload: value})
                if(!state.software.loaded || moment.duration(moment()-state.software.updated)/1000>300)
                    dispatch({type: SOFT_DATA_REQUEST})
            case resourceTypes.ZALS :
                dispatch({type: SET_CURRENT_RESOURCE,payload: value})
                if(!state.zals.loaded || moment.duration(moment()-state.zals.updated)/1000>300)
                    dispatch({type: ZALS_DATA_REQUEST})
            default:
                return
        }
    },[state.adUsers, state.software, state.zals])
    const actions = {};
    // actions.getData=useCallback((value) => {
    //     switch (value) {
    //         case 'peoples' :
    //             dispatch({type: PEOPLES_DATA_REQUEST})
    //         case 'soft' :
    //             dispatch({type: SOFT_DATA_REQUEST})
    //         default:
    //             return
    //     }
    // },[])

    actions.setSidebar= useCallback(value =>  dispatch({type: SET_SIDEBAR, payload:value}),[])
    actions.setPeoplesSecondFilters= useCallback(value =>  dispatch({type: SET_USERS_SECOND_FILTERS, payload:value}),[])

    actions.setSearchValue= useCallback(value =>  dispatch({type: SET_SEARCH_VALUE, payload:value}),[])
    actions.setSortState= useCallback(value =>  dispatch({type: SET_SORT_STATE, payload:value}),[])
    actions.setSelectedUser= useCallback(value =>  dispatch({type: SET_SELECTED_USER, payload:value}),[])
    actions.refreshData= useCallback(() =>  {
        switch (state.currentResource) {
            case resourceTypes.PEOPLES :
                    dispatch({type: PEOPLES_DATA_REQUEST})
            case resourceTypes.SOFT :
                dispatch({type: SOFT_DATA_REQUEST})
            case resourceTypes.ZALS :
                dispatch({type: ZALS_DATA_REQUEST})
            default:
                return
        }
    },[state.currentResource])

    actions.selectUserByNameOrMail = useCallback(user => {
        if (!user) return dispatch({type: SET_SELECTED_USER, payload:emptyObject})
        const findedUser=adUsers.find(adUser=> adUser.cn===user.name || adUser.mail===user.mail)
        if (findedUser) {
            dispatch({type: SET_SELECTED_USER, payload: findedUser})
        } else {
            dispatch({type: SET_SELECTED_USER, payload: emptyObject})
        }
    },[])

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

//**************************************//
//***        side effects            ***//

//*******  on Load
    useEffect(()=>{
//            dispatch({type: FETCH_DATA_REQUEST})

            // const interval = setInterval(() => {
            //     dispatch({type: FETCH_DATA_REQUEST})
            // }, 300000);
            //
            // return () => clearInterval(interval);
        }
        ,[])



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
            if (state.search) {
                dispatch({type: SEARCH, payload: false })
                dispatch({type: SET_SEARCHING})
                search()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ,[state.search])

     const SearchWithTimeout=()=>{
        if(timeout) clearTimeout(timeout);
        const newTimeout = setTimeout(() => {
            dispatch({type: SEARCH, payload: true })
        }, 500);
        setNewTimeout(newTimeout)
    }
    const search=()=>{
        let filtredUsers=[...usersWithInternetAndAlerts]
        let filtredSoft=[...software.data]
        if (state.searchValue && state.searchValue.length>0) {
            // const searchValues=state.searchValue.split(' ')
            _.forEach(selectors.searchValues, searchValue => {
                filtredUsers = _.filter(filtredUsers, user => {
                        return _.includes(user.cn.toUpperCase(), searchValue.toUpperCase())
                            || (user.title && _.includes(user.title.toUpperCase(), searchValue.toUpperCase()))
                            || (user.company && _.includes(user.company.toUpperCase(), searchValue.toUpperCase()))
                            || (user.department && _.includes(user.department.toUpperCase(), searchValue.toUpperCase()))
                            || (user.url && _.includes(user.url.toUpperCase(), searchValue.toUpperCase()))
                            || (user.mail && _.includes(user.mail.toLowerCase(), searchValue.toLowerCase()))
                            || (user.telephoneNumber && _.includes(user.telephoneNumber.toUpperCase(), searchValue.toUpperCase()))
                    }
                )
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
                    filtredUsers = _.filter(filtredUsers, user => user[filter] && !!user[filter])
                } else if (selectors.peoples.secondFilters[filter].value === 'false') {
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
    },[state.searchValue, sortFields, state.adUsers.secondFilters])

//***************************  Selectors  *********************//

    const selectors = {};
    selectors.adUsers=usersWithInternetAndAlerts

    selectors.peoples=useMemo(()=> state.adUsers ,[state.adUsers])
    selectors.software=useMemo(()=> state.software ,[state.software])
    selectors.zals=useMemo(()=> state.zals ,[state.zals])
    selectors.orderedzals=useMemo(()=> _.sortBy(state.zals.data, o => o.order) ,[state.zals.data])


    selectors.loading=useMemo(()=> {
        return state.adUsers.loading
            || state.software.loading
    },[state.adUsers.loading,state.software.loading])

    selectors.searching=useMemo(()=> state.searching,[state.searching])

    selectors.searchValue=useMemo(()=> state.searchValue ,[state.searchValue])

    selectors.searchValues = useMemo(()=> state.searchValue.split(' ') ,[state.searchValue])

    selectors.serachType=useMemo(()=> state.serachType ,[state.serachType])
    const searchTypeLabels={
        "peoples":"Люди",
        "soft":"Сервисы ИВЦ",
    }
    selectors.searchTypeLabel=useMemo(()=> {
        if(!state.serachType) return ''
        return searchTypeLabels[state.serachType]
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } ,[state.serachType])

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

//**************************************//
    const value={
        state: state,
        selectors: selectors ,
        actions:actions,
        resourceTypes: resourceTypes,
        setCurrentResource: setCurrentResource,
        // searchValue:state.searchValue,
        // setSearchValue: actions.setSearchValue
    }
    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}

export const useData = () => useContext(DataContext)
