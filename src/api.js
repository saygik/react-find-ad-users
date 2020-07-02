import axios from 'axios'
import {avatarColors} from './services'
axios.defaults.timeout = 30000

const _apiBase = 'http://vm-say-work.brnv.rw:9003'
//const _apiBase = 'http://ad-users.brnv.rw'
//const _apiBase = 'http://find-api.brnvrw.by'
const api = {};
api.getAdUser=(setProgress)=>{
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: _apiBase+'/domain',
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
                    resolve(response.data.map(item=>{
                        return {
                            ...item,
                            title: item.title && item.title.toUpperCase(),
                            url: item.url && Array.isArray(item.url) ? item.url.join(', ').toUpperCase(): item.url,
                            avatarcolor:avatarColors(item.availability.presence),
                        }
                    }))
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
    });
}

api.getSoftware=(setProgress)=>{
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: _apiBase+'/soft',
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
    });
}
api.getInternetGroup=()=>{
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: _apiBase+'/inet',
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
    });
}
api.getUserAlerts=()=>{
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: _apiBase+'/useralerts',
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
    });
}
api.getZals=()=>{
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: _apiBase+'/zals',
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
    });
}
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
// api.getAdUserPresence=(user)=>{
//     console.log('-uuuser--',_apiBase+'/skype/user?sip='+user)
//     return new Promise((resolve, reject) => {
//         axios({
//             method: 'get',
//             url: _apiBase+'/skype/user?sip='+user,
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//         })
//             .then((response)=> {
//
//                 if (response.data) {
//                     console.log('---',response.data)
//                     resolve(response.data)
//                 }
//                 else {
//                     console.log('-response-','NO DATA')
//                     reject();
//                 }
//             })
//             .catch( (error) => {
//                 // handle error
//                 console.log('--ERROR--',error);
//                 reject(error);
//             })
//     });
//
// }
export default api
//http://vm-say-work.brnv.rw:9003/skype?sip=say@brnv.rw
