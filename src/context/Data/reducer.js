import types from './action-types'

//******* Initial state ****************//
export const initialState={
    loading: false,
    loaded: false,
    // messages:[],
    // requests:[],
    // messageTemplates:[],
    logs:[],
    sidebarOpen:true,
    currentResource: '',
    newMessageDialogOpened: false,
    messageDialogOpen: false,
    templateDialogOpen: false,
    selectedMessages:[],
    responseMessagesIds: [],
    selectedTemplate: {},
    newMessageFromTemplate:'',
    templateCategorySelectorValue: 0,
    templateFilterValue: '*',
    selectedMessage: null,
    awaitingMessage:'',
    ssp: {
        connected: false,
    },
}
//    ..const [selectedUser, setSelectedUser] = React.useState({});
export const reducer = (state, action) => {
    switch (action.type) {
        // case MESSAGES_REQUEST:
        //     return {...state, loading: true}
        // case MESSAGES_ERROR:
        //     return {...state, messages:[],  loading: false}
        // case MESSAGES_SUCCESS:
        //     return {...state, messages: action.payload,  loading: false}
        case types.NEW_MESSAGE_DIALOG_OPEN:
            return {...state, newMessageDialogOpened: true, newMessageFromTemplate:action.payload}
        case types.NEW_MESSAGE_DIALOG_CLOSE:
            return {...state, newMessageDialogOpened: false, newMessageFromTemplate: ''}
        case types.TEMPLATE_DIALOG_OPEN:
            return {...state, templateDialogOpen: true, selectedTemplate: action.payload || {}}
        case types.TEMPLATE_DIALOG_CLOSE:
            return {...state, templateDialogOpen: false, selectedTemplate: {}}
        case types.TEMPLATE_CATEGORY_SELECTOR_VALUE_CHANGE:
            return {...state, templateCategorySelectorValue: action.payload.value}
        case types.TEMPLATE_FILTER_VALUE_CHANGE:
            return {...state, templateFilterValue: action.payload.value}
        case types.MESSAGE_DIALOG_OPEN:
            return {...state, messageDialogOpen: true}
        case types.SELECT_RESPONSE_MESSAGE_FOR_DIALOG:
            return {...state, selectedMessage: action.payload}
        case types.MESSAGE_DIALOG_CLOSE:
            return {...state, messageDialogOpen: false, selectedMessage:null}
        case types.SET_CURRENT_RESOURCE:
            return {...state, currentResource:action.payload}
        case types.SET_SIDEBAR:
            return {...state, sidebarOpen:  action.payload}
        case types.REFRESH_SSP_STATUS:
      //      console.log('-STATUS-',action.payload.status)
            return {...state, ssp: {...state.ssp, connected: action.payload.status}}
        case types.SELECT_RESPONSE_MESSAGE:
            return {...state, selectedMessages: [...state.selectedMessages, action.payload]}
        case types.DESELECT_RESPONSE_MESSAGE:
            return {...state, selectedMessages: state.selectedMessages.filter(item=>item!==action.payload)}
        case types.SELECT_ALL_RESPONSE_MESSAGES:
            return {...state, selectedMessages: state.responseMessagesIds}
        case types.DESELECT_ALL_RESPONSE_MESSAGES:
            return {...state, selectedMessages: []}
        case types.UPDATE_ALL_RESPONSE_MESSAGES_IDS:
            return {...state, responseMessagesIds: action.payload}
        // case types.UPDATE_REQUEST_MESSAGES:
        //     return {...state, requests: [...action.payload]}
        // case types.UPDATE_RESPONSE_MESSAGES:
        //     return {...state, messages: [...action.payload]}
        // case types.UPDATE_MESSAGE_TEMPLATES:
        //     return {...state, messageTemplates: [...action.payload]}
        // case types.SUBSCRIBED_DATA_LOGS:
        //     return {...state, logs: [action.payload ,...state.logs]}
        case types.AWAIT_MESSAGE:
            return {...state, awaitingMessage: action.payload }
        case types.AWAITING_MESSAGE_FIND:
            return {...state, awaitingMessage: '' }
        default:
            return state
    }
}
