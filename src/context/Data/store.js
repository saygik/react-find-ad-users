import React, {useReducer, useContext, useEffect, useMemo, useState} from 'react'
import _ from 'lodash'
import api from '../../api'
import {reducer, initialState} from './reducer'
import {
    FETCH_DATA_REQUEST,
    FETCH_DATA_SUCCESS,
    SET_LOADING_PROGRESS,
    FETCH_USERS_SUCCESS,
    FETCH_SOFT_SUCCESS,
    FETCH_INTERNET_GROUP_USERS_SUCCESS,
    FETCH_USERS_ALERTS_SUCCESS,
    SET_SEARCH_VALUE,
    SET_SEARCH_TYPE,
    SET_SORT_STATE,
    SET_USERS_FILTRED,
    SET_SOFT_FILTRED,
    SET_SEARCHING,
    SET_NO_SEARCHING,
    SET_SELECTED_USER
} from "./action-types"

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
    const actions = {};
    actions.setSearchValue= (value) =>  dispatch({type: SET_SEARCH_VALUE, payload:value})
    actions.setSerachType= (value) =>  dispatch({type: SET_SEARCH_TYPE, payload:value})
    actions.setSortState= (value) =>  dispatch({type: SET_SORT_STATE, payload:value})
    actions.setSelectedUser= (value) =>  dispatch({type: SET_SELECTED_USER, payload:value})

    actions.selectUserByNameOrMail = (user) => {
        if (!user) return dispatch({type: SET_SELECTED_USER, payload:emptyObject})
        const findedUser=adUsers.find(adUser=> adUser.cn===user.name || adUser.mail===user.mail)
        if (findedUser) {
            dispatch({type: SET_SELECTED_USER, payload: findedUser})
        } else {
            dispatch({type: SET_SELECTED_USER, payload: emptyObject})
        }
    };

    const adUsers=useMemo(()=> state.adUsers ,[state.adUsers])
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
    const searchValues=useMemo(()=> state.searchValue.split(' ') ,[state.searchValue])

//**************************************//
//***        side effects            ***//

//*******  on Load
    useEffect(()=>{
            dispatch({type: FETCH_DATA_REQUEST})

            // const interval = setInterval(() => {
            //     dispatch({type: FETCH_DATA_REQUEST})
            // }, 300000);
            //
            // return () => clearInterval(interval);
        }
        ,[])

    useEffect( ()=>{
        const SetPeopleProgress=(proc)=>{
            dispatch({type: SET_LOADING_PROGRESS,
                payload: {...state.loadingProgress, peoples: {
                        loading:proc<100,
                        progress:proc
                    }
                }})
        }
        const SetSoftProgress=(proc)=> {
            dispatch({type: SET_LOADING_PROGRESS,
                payload: {...state.loadingProgress, soft: {
                        loading:proc<100,
                        progress:proc
                    }
                }})
        }
        const fetchData= async ()=>{
            if (state.fetchDataRequest) {
                dispatch({type: FETCH_DATA_REQUEST})
                SetPeopleProgress(0)
                const res = await api.getAdUser(SetPeopleProgress)
                if (res.length > 1) dispatch({type: FETCH_USERS_SUCCESS, payload: res})
                SetSoftProgress(0)
                const soft= await api.getSoftware(SetSoftProgress)
                if (soft.length>1) dispatch({type: FETCH_SOFT_SUCCESS, payload: soft})
                dispatch({type: FETCH_DATA_SUCCESS})
                const inet= await api.getInternetGroup()
                if (inet.length>1) dispatch({type: FETCH_INTERNET_GROUP_USERS_SUCCESS, payload: inet})
                const alerts= await api.getUserAlerts()
                if (alerts.length>0) dispatch({type: FETCH_USERS_ALERTS_SUCCESS, payload: alerts})
            }
        }
        fetchData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ,[state.fetchDataRequest])

     const SearchWithTimeout=()=>{
        if(timeout) clearTimeout(timeout);
        const newTimeout = setTimeout(() => {
            search()
        }, 300);
        setNewTimeout(newTimeout)
    }
    const search=()=>{
        let filtredUsers={...usersWithInternetAndAlerts}
        let filtredSoft={...software}
        if (searchValues[0]!=='*') {
            _.forEach(searchValues, searchValue => {
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
        if (state.sortState.skype) {
            filtredUsers = _.filter(filtredUsers, user => user.sip && user.sip.length>3)
        }
        if (state.sortState.phone) {
            filtredUsers = _.filter(filtredUsers, user => user.telephoneNumber && user.telephoneNumber.length>3)
        }

        const sortedUsers = _.sortBy(filtredUsers, sortFields)
        dispatch({type: SET_USERS_FILTRED, payload: sortedUsers})
        dispatch({type: SET_SOFT_FILTRED, payload: _.sortBy(filtredSoft, 'title')})
        dispatch({type: SET_NO_SEARCHING})
    }
    useEffect(()=>{
        if (searchValues[0].length>1 || searchValues[0]==='*') {
            dispatch({type: SET_SEARCHING})
            SearchWithTimeout()
        } else {
            dispatch({type: SET_NO_SEARCHING})
            dispatch({type: SET_USERS_FILTRED, payload: []})
            dispatch({type: SET_SOFT_FILTRED, payload: []})
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[searchValues, sortFields])

//***************************  Selectors  *********************//

    const selectors = {};

    selectors.adUsers=usersWithInternetAndAlerts

    selectors.software=useMemo(()=> state.software ,[state.software])

    selectors.loading=useMemo(()=> state.loading,[state.loading])

    selectors.searching=useMemo(()=> state.searching,[state.searching])

    selectors.searchValue=useMemo(()=> state.searchValue ,[state.searchValue])

    selectors.searchValues = searchValues

    selectors.serachType=useMemo(()=> state.serachType ,[state.serachType])
    const searchTypeLabels={
        "peoples":"Люди",
        "soft":"Сервисы ИВЦ",
    }
    selectors.searchTypeLabel=useMemo(()=> {
        if(!state.serachType) return ''
        return searchTypeLabels[state.serachType]
    } ,[state.serachType])

    selectors.loadingProgress=useMemo(()=> state.loadingProgress ,[state.loadingProgress])

    selectors.sortState=useMemo(()=> state.sortState ,[state.sortState])

    selectors.adFiltredUsers=useMemo(()=> state.adFiltredUsers ,[state.adFiltredUsers])

    selectors.filtredSoft=useMemo(()=> state.filtredSoft ,[state.filtredSoft])

    selectors.selectedUser=useMemo(()=> state.selectedUser ,[state.selectedUser])

    selectors.isCurrentListUsers=useMemo(()=>state.serachType==='peoples',[state.serachType])

    selectors.currentListCount=useMemo(()=> {
        return selectors.isCurrentListUsers ? state.adFiltredUsers.length:state.filtredSoft.length
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } ,[state.adFiltredUsers,state.filtredSoft])

//**************************************//
    const value={state: state, selectors: selectors , actions:actions}
    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}

export const useData = () => useContext(DataContext)
