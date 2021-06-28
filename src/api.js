import axios from 'axios'

axios.defaults.timeout = 30000
const _apiBase = 'http://vm-say-work.brnv.rw:9000/v1'
const api = {};
//const emptyObject={}


const apiData = async  (url, token='', method='get', data={}) => {
    const headers= {'Content-Type': 'application/json',}
    if (!!token) headers.Authorization='Bearer ' + token
    return axios({
        method: method,
        url: _apiBase + url,
        headers: headers,
        data: data
    })
}


api.getUsers = async ()=>await apiData('/ad/users')
//api.getSSPStatus = async ()=> await getApiData('/ssp')
api.getSSPStatus = async () => await apiData('/ssp')


api.findUser = async (token) => await apiData('/user/find', token,'post')
api.getAuth = async (email,password) => await apiData('/user/login', '','post',JSON.stringify({email:email, password:password}))

api.getNewMessages = async (token) => {
    try {
        const response = await apiData('/message/responses', token)
        if (response.data) return response.data.results[0].data
        else {}
    } catch (error) {
        if (error.response.status === 401) throw new Error("401 (Unauthorized)")
        return error
    }
}
api.getDeletedResponses = async (token, cursor=0) => {
    try {
        const response = await apiData('/message/responses/deleted?cursor='+cursor, token)
        console.log('-DELETED-',response.data)
        if (response.data) return response.data.results[0].data
        else {}
    } catch (error) {
        if (error.response.status === 401) throw new Error("401 (Unauthorized)")
        return error
    }
}
api.getRequestMessages= async (token, cursor= 0, desc= 'true') => {
    try {
        const response = await apiData('/message/request?cursor='+cursor+"&desc=" + desc, token)
        if (response.data) return response.data.results[0].data
        else {}
    } catch (error) {
        if (error.response.status === 401) throw new Error("401 (Unauthorized)")
        return error
    }
}
api.getMessageTemplates= async (token) => {
    try {
        const response = await apiData('/message/templates', token)
        if (response.data) return response.data.results
        else {}
    } catch (error) {
        if (error.response.status === 401) throw new Error("401 (Unauthorized)")
        return error
    }
}

api.sendMessage = async (message,token) =>
    await apiData('/ssp/msg', token,'post',JSON.stringify({message:message}))
api.createTemplate = async (name, text, category, token) =>
    await apiData('/message/template', token, 'post', JSON.stringify({name: name, text: text, category: category}))
api.updateTemplate = async (id, name, text, category, token) =>
    await apiData('/message/template/'+ id, token,'put',JSON.stringify({name:name, text:text, category: category}))
api.deleteTemplate = async (id, token) =>
    await apiData('/message/template/'+ id, token,'delete')


api.delResponseMessage= async (token, id) => {
    await apiData('/message/responses/' +id, token,'delete')
}
api.updateResponseMessage= async (token, message) => {
     await apiData('/message/responses/' +message.id, token,'put',JSON.stringify(message))
}
api.refreshToken = async (token) => await apiData (
    '/token/refresh',
    '',
    'post',
    JSON.stringify({refresh_token:token}))



let sse
api.subscribeToMessages=(token,onData, onError)=>{
                if (sse) sse.close();
                sse = new EventSource('http://vm-say-work.brnv.rw:9000/v1/subscribe/' + token)
                const getRealtimeData = data => {
                    onData(data)
                }
                sse.onmessage = e => getRealtimeData(JSON.parse(e.data));
                sse.onerror = () => {
                    onError()
                }
}
api.unsubscribeToMessages=()=>{
    if (sse) sse.close();
  //  console.log('-unsubscribeToMessages-',sse)
}
export default api
