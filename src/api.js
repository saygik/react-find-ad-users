import axios from 'axios'
import {avatarColors} from './serices'
axios.defaults.timeout = 30000

//const _apiBase = 'http://vm-say-work.brnv.rw:9003'
const _apiBase = 'http://ad-users.brnv.rw'
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
