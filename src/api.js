import axios from 'axios'
import {avatarColors} from './services'
import moment from 'moment'
axios.defaults.timeout = 30000

//const _apiBase = 'http://vm-say-work.brnv.rw:9003'
const _apiBase = 'http://ad-users.brnv.rw'
//const _apiBase = 'http://find-api.brnvrw.by'
const api = {};
const emptyObject={}

const normalizeUser=(user)=>{

    if (!user || user===emptyObject ||  Array.isArray(user) ) return emptyObject
    return {
        ...user,
        title: user.title && user.title.toUpperCase(),
        url: user.url && Array.isArray(user.url) ? user.url.join(', ').toUpperCase(): user.url,
        avatarcolor:avatarColors(user.availability.presence),
    }
}
const normalizeUsers=(users)=>{
    return users.map(item=>{
        return normalizeUser(item)
    })

}
const formatAlerts=(alerts)=>{
    return alerts.map(alert=>{
        return {
            ...alert,
            description:`с ${moment(alert.from).format('DD.MM.YYYY')}  по ${moment(alert.to).format('DD.MM.YYYY')}`
        }
    })

}

const getApiData=(url)=>new Promise((resolve) => {
    axios({
        method: 'get',
        url: _apiBase+url,
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then((response)=> {
            if (response.data) {
                resolve(response.data)
            }
            else {
                console.log('-response-','NO DATA')
                resolve([]);
            }
        })
        .catch( (error) => {
            // handle error
            console.log('--ERROR--',error);
            resolve([]);
        })
})
const addApiData=(url,data)=>new Promise((resolve) => {
//    console.log('-------------',JSON.stringify(data))
    axios({
        method: 'post',
        url: _apiBase+url,
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
    })
        .then((response)=> {
            if (response.status===201) {
                resolve(true)
            }
            else {
                resolve(false);
            }
        })
        .catch( (error) => {
            // handle error
            console.log('--ERROR--',error);
            resolve(false);
        })
})
const delApiData=(url,data)=>new Promise((resolve) => {
//    console.log('-------------+',JSON.stringify(data))
    axios({
        method: 'DELETE',
        url: _apiBase+url,
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
    })
        .then((response)=> {
            if (response.status===200) {
                resolve(true)
            }
            else {
                resolve(false);
            }
        })
        .catch( (error) => {
            // handle error
            console.log('--ERROR--',error);
            resolve(false);
        })
})
const getApiDataWithProgress=(url, setProgress)=>new Promise((resolve) => {
    axios({
        method: 'get',
        url: _apiBase+url,
        headers: {
            'Content-Type': 'application/json'
        },
        onDownloadProgress: function (progressEvent) {
            const proc=Number((progressEvent.loaded/progressEvent.total*100).toFixed(1));
            setProgress(proc)
        },
    })
        .then((response)=> {
            if (response.data) {
                resolve(response.data)
            }
            else {
                console.log('-response-','NO DATA')
                resolve([]);
            }
        })
        .catch( (error) => {
            // handle error
            console.log('--ERROR--',error);
            resolve([]);
        })
})

api.getAuth=(user,password)=>{
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: _apiBase+'/auth',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({username:user, password:password})
        })
            .then((response)=> {
                if (response.data.status==="success") {
                    resolve({
                        name: response.data.data.user.cn,
                        email: response.data.data.user.userPrincipalName,
                        admin:response.data.data.user.admin || false,
                        token: response.data.token
                    })
                }
                else {
                    reject();
                }
            })
            .catch( (error) => {
                // handle error
                console.log('--ERROR--',error);
                // resolve({
                //     name: 'Крапивин Игорь',
                //     email: 'say@brnv.rw',
                // })
                reject(error);
            })
    });
}

api.findUser=(token)=>{
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: _apiBase+'/auth/user',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })
            .then((response)=> {

                if (response.status===200) {

                    resolve({
                        name: response.data.data.user.cn,
                        email: response.data.data.user.userPrincipalName,
                        admin:response.data.data.user.admin || false,
                    })
                }
                else {
                    reject();
                }
            })
            .catch( (error) => {
                // handle error
                console.log('--ERROR--',error);
                reject(error);
            })
    });
}

api.getAdUser=async (setProgress)=> normalizeUsers(await getApiDataWithProgress('/domain', setProgress))

api.getSoftware=async (setProgress)=> await getApiDataWithProgress('/soft', setProgress)

api.getInternetGroup=async ()=>await getApiData('/inet')

api.getOneUser=async (userPN)=>normalizeUser(await getApiData('/domain/'+userPN))
api.addAlert= (alert)=> addApiData('/useralerts', alert)
api.delAlert= (id)=> delApiData('/useralerts', {id:id})

api.getUserAlerts=async ()=>await getApiData('/useralerts')
api.getOneUserAlerts=async (userPN)=>formatAlerts(await getApiData('/useralerts/'+userPN))
api.getOneUserCurrentAlerts=async (userPN)=>await getApiData('/useralerts/today/'+userPN)

api.getZals = async ()=>await getApiData('/zals')

api.getActiveZals = async ()=>await getApiData('/skype/activeconf')

api.getConfCurrentUsers=async (confIf)=>await getApiData('/skype/conf/'+confIf)



export default api
//http://vm-say-work.brnv.rw:9003/skype?sip=say@brnv.rw
