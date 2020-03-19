import axios from 'axios'
axios.defaults.timeout = 10000

//const _apiBase = 'http://vm-say-work.brnv.rw:9003'
const _apiBase = 'http://ad-users.brnv.rw/'
const api = {};
api.getAdUser=()=>{
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: _apiBase,
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((response)=> {

                if (response.data) {
                    resolve(response.data.map(item=>{
                        return {
                            ...item,
                            title: item.title && item.title.toUpperCase(),
                            url: item.url && item.url.join(', ').toUpperCase(),

                        }
                    }))
                }
                else {
                    console.log('-response-','NO DATA')
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
export default api
