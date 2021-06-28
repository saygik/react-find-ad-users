import types from './action-types'

import api from "../../api"

export const applyMiddleware = (dispatch, enqueueSnackbar, user) => action => {
    switch (action.type) {
        // case types.NEW_MESSAGE_REQUEST:
        //     api.sendMessage(action.payload.message, user.token)
        //         .then(response => {
        //             const msg = {
        //                 kvit: response.data.kvit,
        //                 message: response.data.message,
        //                 status: response.data.status,
        //             }
        //             if (msg.status) {
        //                 if (action.payload.awaitMessage) dispatch({type: types.AWAIT_MESSAGE, payload: msg.kvit})
        //                 enqueueSnackbar(`${msg.message} доставлено до SSP`, {variant: 'info'})
        //                 dispatch({type: types.NEW_MESSAGE_DIALOG_CLOSE})
        //             } else {
        //                 enqueueSnackbar(`$Запрос не доставлен`, {variant: 'error'})
        //             }
        //         })
        //         .catch(reason => {
        //             enqueueSnackbar(`Сообщение не доставлено ${reason}`, {variant: 'error'})
        //         })
        //     return
        // case types.NEW_TEMPLATE_REQUEST:
        //     api.createTemplate(action.payload.name, action.payload.text, user.token)
        //         .then(() => enqueueSnackbar(`Создан новый шаблон сообщений`, {variant: 'info'}))
        //         .catch(reason => enqueueSnackbar(`Шаблон сообщений не создан: ${reason}`, {variant: 'error'}))
        //     return
        // case types.UPDATE_TEMPLATE_REQUEST:
        //         api.updateTemplate(action.payload.id, action.payload.name, action.payload.text, user.token)
        //             .then(() => enqueueSnackbar(`Шаблон сообщений изменён`, {variant: 'info'}))
        //             .catch(reason => enqueueSnackbar(`Шаблон сообщений не изменён: ${reason}`, {variant: 'error'}))
        //     return
        default:
            dispatch(action)
    }
}
