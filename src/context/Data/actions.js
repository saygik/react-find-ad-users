import types from './action-types'


export const mapActions = (state, dispatch) => ({
        setSidebar: value =>  dispatch({type: types.SET_SIDEBAR, payload:value}),
        newMessageDialogOpen: (newMessage='') => dispatch({type: types.NEW_MESSAGE_DIALOG_OPEN, payload: newMessage}),
        newMessageDialogClose: () => dispatch({type: types.NEW_MESSAGE_DIALOG_CLOSE}),
        // addLog: (data) => dispatch({type: types.SUBSCRIBED_DATA_LOGS, payload:{id: data.MessageId, description: data.Message, status:data.Status}}),
        // updateMessages: (data) => dispatch({type: types.UPDATE_RESPONSE_MESSAGES, payload:data}),
        // updateRequestMessages: (data) => dispatch({type: types.UPDATE_REQUEST_MESSAGES, payload:data}),
        // updateMessageTemplates: (data) => dispatch({type: types.UPDATE_MESSAGE_TEMPLATES, payload:data}),
        // refreshSSPstatus: (status) => dispatch({type: types.REFRESH_SSP_STATUS, payload: {status}}),
        messageDialogOpen: (message) => {
                dispatch({type: types.SELECT_RESPONSE_MESSAGE_FOR_DIALOG, payload: message})
                dispatch({type: types.MESSAGE_DIALOG_OPEN})
        },
        updateSelectedForDialogMessage: (message) => {
                dispatch({type: types.SELECT_RESPONSE_MESSAGE_FOR_DIALOG, payload: message})
        },
        messageDialogClose: () => dispatch({type: types.MESSAGE_DIALOG_CLOSE}),
        templateDialogOpen: (template) => dispatch({type: types.TEMPLATE_DIALOG_OPEN,payload: {...template}}),
        templateDialogClose: () => dispatch({type: types.TEMPLATE_DIALOG_CLOSE}),
        awaitMessage: (kvit) => dispatch({type: types.AWAIT_MESSAGE,payload: kvit}),
        awaitingMessageFinded:()=> dispatch({type: types.AWAITING_MESSAGE_FIND}),
//        newMessageRequest: (message, awaitMessage=false) => dispatch({type: types.NEW_MESSAGE_REQUEST, payload: {message,awaitMessage}}),
//        createTemplate: (name, text) =>  dispatch({type: types.NEW_TEMPLATE_REQUEST, payload: {name,text}}),
        updateTemplateCategorySelectorValue: (value) =>  dispatch({type: types.TEMPLATE_CATEGORY_SELECTOR_VALUE_CHANGE, payload: {value}}),
        updateTemplateFilterValue: (value) =>  {
                if (value==='') return dispatch({type: types.TEMPLATE_FILTER_VALUE_CHANGE, payload: {value: '*'}})
                dispatch({type: types.TEMPLATE_FILTER_VALUE_CHANGE, payload: {value}})
        },
        selectAllResponseMessages: (isSelect) => {
                if (isSelect) dispatch({type: types.SELECT_ALL_RESPONSE_MESSAGES})
                else dispatch({type: types.DESELECT_ALL_RESPONSE_MESSAGES})
        },
        selectResponseMessage: (id, isChecked) => {
                if (isChecked) dispatch({type: types.SELECT_RESPONSE_MESSAGE, payload: id})
                else dispatch({type: types.DESELECT_RESPONSE_MESSAGE, payload: id})
        },
        updateAllMessagesIds: (ids)=> dispatch({type: types.UPDATE_ALL_RESPONSE_MESSAGES_IDS, payload: ids}),


    })

//
//
// const mapDispatch = (state,dispatch) => ({
//     setSidebar: value =>  dispatch({type: types.SET_SIDEBAR, payload:value}),
//     newMessageDialogOpen: (newMessage='') => dispatch({type: types.NEW_MESSAGE_DIALOG_OPEN, payload: newMessage}),
//     newMessageDialogClose: () => dispatch({type: types.NEW_MESSAGE_DIALOG_CLOSE}),
//     addLog: (data) => dispatch({type: types.SUBSCRIBED_DATA_LOGS, payload:{id: data.MessageId, description: data.Message, status:data.Status}}),
//     updateMessages: (data) => dispatch({type: types.UPDATE_RESPONSE_MESSAGES, payload:data}),
//     updateRequestMessages: (data) => dispatch({type: types.UPDATE_REQUEST_MESSAGES, payload:data}),
//     updateMessageTemplates: (data) => dispatch({type: types.UPDATE_MESSAGE_TEMPLATES, payload:data}),
//     refreshSSPstatus: (status) => dispatch({type: types.REFRESH_SSP_STATUS, payload: {status}}),
//     messageDialogOpen: (id) => dispatch({type: types.MESSAGE_DIALOG_OPEN,payload: {id}}),
//     messageDialogClose: () => dispatch({type: types.MESSAGE_DIALOG_CLOSE}),
//     templateDialogOpen: (template) => dispatch({type: types.TEMPLATE_DIALOG_OPEN,payload: {...template}}),
//     templateDialogClose: () => dispatch({type: types.TEMPLATE_DIALOG_CLOSE}),
//     awaitMessage: (kvit) => dispatch({type: types.AWAIT_MESSAGE,payload: kvit}),
//     awaitingMessageFinded:()=> dispatch({type: types.WAITING_MESSAGE_FIND}),
// })
//
// export default mapDispatch
