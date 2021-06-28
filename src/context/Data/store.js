import React, {useReducer, useContext, useEffect, useMemo} from 'react'

import {reducer, initialState} from './reducer'

import {mapActions} from "./actions"
import { applyMiddleware } from './middleware'
import {useAuth} from "../../context/Auth"
import DataContext from './DataContext'
import {useSnackbar} from "notistack"
import {useHotkeys} from 'react-hotkeys-hook'
import {useApiQuerys} from "./api-querys"
import {useSSPSubscriber} from "./ssp-subscriber"




export const DataProvider = ({ children }) => {
    const {user, signedIn, refreshToken, refreshingToken}= useAuth()
    const { enqueueSnackbar } = useSnackbar()
    const [state, dispatch] = useReducer( reducer , initialState )
    const actions= useMemo(()=> mapActions(state,applyMiddleware(dispatch,enqueueSnackbar, user)),[user])

    const { queryData, mutations }=useApiQuerys(user,signedIn, {
        onNewMessages: (data)=> {
            if (state.awaitingMessage && state.awaitingMessage.length>5) {
                        const findedMsg = data.find(msg=> msg.kvit===state.awaitingMessage)
                        if (findedMsg && findedMsg?.id>0) {
                            actions.awaitingMessageFinded()
                            enqueueSnackbar(`Получено ожидаемое сообщение`, {variant: 'success'})
                            actions.messageDialogOpen(findedMsg)
                        }
                    }
        },
        onUnauthorized: ()=> refreshToken(),
        onTemplateSucess: ()=> actions.templateDialogClose(),
        onNewRequestSucess: (kvit)=> {
            kvit && actions.awaitMessage(kvit)
            actions.newMessageDialogClose()
        },
        onResponceUpdateSucess: variables => {
            if (!selectors.selectedMessage) return
            return actions.updateSelectedForDialogMessage({...selectors.selectedMessage,...variables})
        },
    })

    const {sspStatus, refreshSSPStatus}=useSSPSubscriber(user?.token, signedIn, refreshingToken, mutations.all.refresh)

    useHotkeys('F9', () => actions.newMessageDialogOpen());


//***************************  Selectors  *********************//
    const selectors = {};
    selectors.requests={}
    selectors.sidebarOpen=useMemo(()=>state.sidebarOpen,[state.sidebarOpen])
// **************       Templates Selectors

    selectors.selectedResponseMessages=useMemo(()=> state.selectedMessages ,[state.selectedMessages])

    selectors.selectedMessage=useMemo(()=> state.selectedMessage ,[state.selectedMessage])

    selectors.responseMessages=useMemo(()=> {
        if (!queryData.responceMessages) return []
        return queryData.responceMessages
    } ,[queryData.responceMessages])

    selectors.isHasSelectedMessages=useMemo(()=> {
        return selectors.selectedResponseMessages.length>0
        }
        ,[ selectors.selectedResponseMessages])

    selectors.messages=useMemo(()=> {
     return  selectors.responseMessages.map(message=>{
         return {...message,
             selected: selectors.selectedResponseMessages.includes(message.id)
         }
     })
    } ,[selectors.responseMessages, selectors.selectedResponseMessages])

// **************       Templates Selectors
    selectors.messageTemplateCategories=useMemo(()=> {
        const arr=[{id:0, text: 'Все'}]
        if (queryData.messageTemplates && queryData.messageTemplates.length===1 && queryData.messageTemplates[0]?.categories)  {
             queryData.messageTemplates[0].categories.every(template => arr[template.id]= template)
        }
        return arr
    } ,[queryData.messageTemplates])

    selectors.messageTemplatesCategorized=useMemo(()=> {
        const selectedCategory=selectors.messageTemplateCategories[state.templateCategorySelectorValue]?.text
        if (queryData.messageTemplates && queryData.messageTemplates.length===1) {
            if (state.templateCategorySelectorValue===0) return queryData.messageTemplates[0].data
            return queryData.messageTemplates[0].data.filter(item=>{
                return item.category===selectedCategory
            })
        }
        else return []
    } ,[queryData.messageTemplates, state.templateCategorySelectorValue])

    selectors.messageTemplates=useMemo(()=> {
        if (!state.templateFilterValue || state.templateFilterValue==='' || state.templateFilterValue==='*')
            return selectors.messageTemplatesCategorized
        const searchString=state.templateFilterValue.replace('*','').toUpperCase()
        return selectors.messageTemplatesCategorized.filter(item=>{
            return item.name.toUpperCase().includes(searchString) || item.text.toUpperCase().includes(searchString)
        })
    } ,[selectors.messageTemplatesCategorized, state.templateFilterValue])

// **************       Requests Selectors
    selectors.requests.data=useMemo(()=> {
        return [].concat.apply([], queryData.requestMessages.data.pages)
    } ,[queryData.requestMessages.data])

    selectors.requests.HasNextPage=useMemo(()=> {
        return queryData.requestMessages.hasNextPage
    } ,[queryData.requestMessages.hasNextPage])

    selectors.requests.isFetching=useMemo(()=> {
        return queryData.requestMessages.isFetching
    } ,[queryData.requestMessages.isFetching])

// **************       Deleted Selectors
    selectors.deleted={}

    selectors.deleted.data=useMemo(()=> {
        return [].concat.apply([], queryData.deletedMessages.data?.pages)
    } ,[queryData.deletedMessages.data])

    selectors.deleted.HasNextPage=useMemo(()=> {
        return queryData.deletedMessages.hasNextPage
    } ,[queryData.deletedMessages.hasNextPage])

    selectors.deleted.isFetching=useMemo(()=> {
        return queryData.deletedMessages.isFetching
    } ,[queryData.deletedMessages.isFetching])

// **************       R
    selectors.undeletedMessages=useMemo(()=>
        selectors.messages.filter(message=>!message.deleted),[selectors.messages])
    selectors.deletedMessages=useMemo(()=>
        selectors.messages.filter(message=>message.deleted),[selectors.messages])
    selectors.newMessageDialogOpened=useMemo(()=> state.newMessageDialogOpened ,[state.newMessageDialogOpened])
    selectors.messageDialogOpen=useMemo(()=> state.messageDialogOpen ,[state.messageDialogOpen])

    selectors.templateDialogOpen=useMemo(()=> state.templateDialogOpen ,[state.templateDialogOpen])
    selectors.selectedTemplate=useMemo(()=> state.selectedTemplate ,[state.selectedTemplate])
    selectors.newMessageFromTemplate=useMemo(()=> state.newMessageFromTemplate ,[state.newMessageFromTemplate])
    selectors.templateCategorySelectorValue=useMemo(()=> state.templateCategorySelectorValue ,[state.templateCategorySelectorValue])
    selectors.templateFilterValue=useMemo(()=> state.templateFilterValue ,[state.templateFilterValue])


//***************************  Side Effects  *********************//
    useEffect(()=> {
             actions.updateAllMessagesIds(selectors.responseMessages.map(message=>message.id))
        }
        ,[queryData.responceMessages])

    useEffect(()=> {
            refreshSSPStatus()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ,[user])
    const value={
        state: state,
        selectors: selectors,
        actions: actions,
        mutations,
        sspConnectionStatus: sspStatus,
    }
    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}

export const useData = () => useContext(DataContext)
