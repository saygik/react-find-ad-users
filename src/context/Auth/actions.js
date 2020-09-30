import skypeApi from "../../api"
import {SIGN_IN_SUCCESS, SIGN_IN_ERROR, SIGN_IN_REQUEST, SIGN_IN_CANCEL, SIGN_OUT} from './action-types'

const AD_FIND_USER='AD_FIND_USER'
const mapDispatch = dispatch => ({
    getAuth: (user, password) =>  new Promise((resolve, reject) => {
        skypeApi.getAuth(user,password).then((user)=>{
              dispatch({type: SIGN_IN_SUCCESS, payload:user})
            user.token && localStorage.setItem(AD_FIND_USER, user.token);
            return resolve(user)
        }).catch(()=>{
            dispatch({type: SIGN_IN_ERROR})
            return  reject('неправильный пользователь или пароль.')
        })
    }),
    signIn: () => dispatch({type: SIGN_IN_REQUEST}),
    signOut: () => {
        dispatch({type: SIGN_OUT})
        localStorage.removeItem(AD_FIND_USER);
    },
    signInCancel: () => dispatch({type: SIGN_IN_CANCEL}),
    findLocalStoreUser: ()=> {
        const localStoreUser = localStorage.getItem(AD_FIND_USER)
        localStoreUser && skypeApi.findUser(localStoreUser)
            .then(user=>{
                dispatch({type: SIGN_IN_SUCCESS, payload:user})
            }).catch(()=>{
                localStorage.removeItem(AD_FIND_USER);
                })

    },
    findAnyUser: (user) =>  new Promise((resolve, reject) => {
            skypeApi.findUser(user).then((user)=>{
                return resolve(user)
            }).catch(()=>{
                return  reject(null)
            })
        }),
})

export default mapDispatch
