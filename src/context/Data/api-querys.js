import React, {useCallback, useEffect, useMemo} from 'react'
import {useMutation, useQuery, useInfiniteQuery, useQueryClient} from "react-query"
import api from "../../api"
import {useSnackbar} from "notistack"



export const useApiQuerys = (user, signedIn, events) => {
    const queryClient = useQueryClient()
    const { enqueueSnackbar } = useSnackbar()
    const isTokenExist=useMemo(()=> {
        if (!user || !user.token) return false
        return user.token.length >= 1;

    } ,[user])
//***************************  Queries  ********************* //
    const fetchRequests = ({ pageParam = 0 }) =>
        api.getRequestMessages(user.token, pageParam)

    const {
        data: requestMessages,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        isError: isRequestMessagesError,
        error: RequestMessagesError,
    } = useInfiniteQuery(['requestMessages',user.token], fetchRequests, {
        enabled: signedIn && isTokenExist,
        refetchInterval: 30000,
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.length === 0) return undefined
            return lastPage[lastPage.length - 1].id
        },
    })
    const fetchDeletedResponses = ({ pageParam = 0 }) =>
        api.getDeletedResponses(user.token, pageParam)
    const {
        data: deletedMessages,
        fetchNextPage: fetchNextPageDeleted,
        hasNextPage: hasNextPageDeleted,
        isFetching: isFetchingDeleted,
        // isFetchingNextPage,
        // status,
        // isError: isRequestMessagesError,
        // error: RequestMessagesError,
    } = useInfiniteQuery(['deletedMessages',user.token], fetchDeletedResponses, {
        enabled: signedIn && isTokenExist,
        refetchInterval: 30000,
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.length === 0) return undefined
            return lastPage[lastPage.length - 1].id
        },
    })

    const {isError: isResponceMessagesError, data: responceMessages, error: ResponceMessagesError, onSuccess} = useQuery(['messages',user.token],
        ()=>api.getNewMessages(user.token),
        {
            enabled: signedIn && isTokenExist,
            refetchInterval: 30000,
            onSuccess: (data) => {
                events.onNewMessages(data)
            },
    })
//     const {isError: isRequestMessagesError, data: requestMessages, error: RequestMessagesError} = useQuery(['requestMessages',user.token],
//         ()=>api.getRequestMessages(user.token),
//         {
//             enabled: signedIn && isTokenExist,
//             refetchInterval: 30000,})

    const {isError: isMessageTemplatesError, data: messageTemplates, error: messageTemplatesError} = useQuery(['messageTemplates',user.token],
        ()=>api.getMessageTemplates(user.token),
        {
            enabled: signedIn && isTokenExist,
            refetchInterval: 30000,})

    const delSelectedResponceMessage = async (selected) =>
    {
        try {
            await Promise.all(selected.map(async (id) => {
                const contents = await delResponceMessageMutation.mutateAsync(id)
            }));

        } catch (error) {
            console.error(error)
        }
    }


    const delResponceMessageMutation = useMutation(id => api.delResponseMessage(user.token, id), {
        onSuccess: (response, variables) => {
            console.log('variables',variables)
            enqueueSnackbar(`Сообщение ${variables}  перемещено в корзину`, {variant: 'Success'})
            queryClient.invalidateQueries('messages')
            queryClient.invalidateQueries('requestMessages')
            queryClient.invalidateQueries('deletedMessages')
        }
})
    const undeleteResponceMessageMutation = useMutation(message => api.updateResponseMessage(user.token, message), {
        onSuccess: (response, variables) => {
            events.onResponceUpdateSucess(variables)
            enqueueSnackbar(`Сообщение восстановлено из корзины`, {variant: 'Success'})
            queryClient.invalidateQueries('messages')
            queryClient.invalidateQueries('requestMessages')
            queryClient.invalidateQueries('deletedMessages')

        },
    })
    const updateResponceMessageMutation = useMutation(message => api.updateResponseMessage(user.token, message), {
        onSuccess: (response, variables) => {
            events.onResponceUpdateSucess(variables)
            enqueueSnackbar(`Сообщение  обновлено`, {variant: 'Success'})
            queryClient.invalidateQueries('messages')
            queryClient.invalidateQueries('requestMessages')
            queryClient.invalidateQueries('deletedMessages')

        },
    })
    const createTemplate = useMutation(tmplt => api.createTemplate(tmplt.name, tmplt.text, tmplt.category , user.token), {
        onSuccess: () => {
            events.onTemplateSucess()
            queryClient.invalidateQueries('messageTemplates')
            enqueueSnackbar(`Создан новый шаблон сообщений`, {variant: 'info'})
        },
        onError: (error)=> enqueueSnackbar(`Шаблон сообщений не создан: ${error}`, {variant: 'error'})
    })
    const updateTemplate = useMutation(tmplt => api.updateTemplate(tmplt.id, tmplt.name, tmplt.text, tmplt.category, user.token), {
        onSuccess: () => {
            events.onTemplateSucess()
            queryClient.invalidateQueries('messageTemplates')
            enqueueSnackbar(`Шаблон сообщений изменён`, {variant: 'Success'})
        },
        onError: (error)=> {
            enqueueSnackbar(`Шаблон сообщений не изменён: ${error.response.data.message || ''}`, {variant: 'error'})
        }
    })
    const deleteTemplate = useMutation(id => api.deleteTemplate(id, user.token), {
        onSuccess: () => {
            events.onTemplateSucess()
            queryClient.invalidateQueries('messageTemplates')
            enqueueSnackbar(`Шаблон сообщений удалён`, {variant: 'Success'})
        },
        onError: (error)=> enqueueSnackbar(`Шаблон сообщений не удалён: ${error}`, {variant: 'error'})
    })
    const newRequest = useMutation(message => api.sendMessage(message.text, user.token), {
        onSuccess: (response, variables) => {

            const msg = {
                kvit: response.data.kvit,
                message: response.data.message,
                status: response.data.status,
            }
            if (msg.status) {
                if (variables.await) events.onNewRequestSucess(msg.kvit)
                else events.onNewRequestSucess()
                enqueueSnackbar(`${msg.message} доставлено до SSP`, {variant: 'info'})
            } else {
                enqueueSnackbar(`$Запрос не доставлен`, {variant: 'error'})
            }
        },
        onError: (error)=> enqueueSnackbar(`Шаблон сообщений не изменён: ${error}`, {variant: 'error'})
    })

    const refreshDeleted= useCallback(
        () => {
            // queryClient.invalidateQueries('deletedMessages')
            console.log('-refreshDeleted-',)
            queryClient.setQueryData('deletedMessages', data => ({
                pages: [],
                pageParams: [],
            }))
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    const refreshData = useCallback(
        () => {
            queryClient.invalidateQueries('messages')
            queryClient.invalidateQueries('requestMessages')
            queryClient.invalidateQueries('deletedMessages')
            queryClient.invalidateQueries('messageTemplates')
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    useEffect(()=> {
            isResponceMessagesError && ResponceMessagesError.message==="401 (Unauthorized)" && events.onUnauthorized()
        }
        ,[isResponceMessagesError, ResponceMessagesError?.message])
    useEffect(()=> {
            isMessageTemplatesError && messageTemplatesError.message==="401 (Unauthorized)" && events.onUnauthorized()
        }
        ,[isMessageTemplatesError, messageTemplatesError?.message])
    useEffect(()=> {
            isRequestMessagesError && RequestMessagesError.message==="401 (Unauthorized)" && events.onUnauthorized()
        }
        ,[isRequestMessagesError, RequestMessagesError?.message])

    return {
        queryData: {
            responceMessages: responceMessages,
            messageTemplates: messageTemplates || [],
            requestMessages: {
                data: requestMessages || [],
                hasNextPage,
                isFetchingNextPage,
                isFetching
            },
            deletedMessages: {
                data: deletedMessages,
                hasNextPage: hasNextPageDeleted,
                isFetching: isFetchingDeleted
            }

        },
        mutations: {
            all:{
                refresh: refreshData
            },
            requestMessages: {
                create: newRequest.mutate,
                fetchNextPage,
            },
            deletedMessages: {
                fetchNextPage: fetchNextPageDeleted,
                refresh: refreshDeleted,
                undelete: undeleteResponceMessageMutation.mutate,
                update: updateResponceMessageMutation.mutate,
            },
            responceMessages:{
                deleteR: delResponceMessageMutation.mutate,
                deleteSelected: delSelectedResponceMessage,
                update: updateResponceMessageMutation.mutate
            },
            messageTemplates: {
                create: createTemplate,
                update: updateTemplate,
                delete: deleteTemplate
            }
        }
    }
}


