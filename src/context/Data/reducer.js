import {
    FETCH_DATA_ERROR,
    FETCH_DATA_REQUEST,
    FETCH_DATA_SUCCESS,
    FETCH_INTERNET_GROUP_USERS_SUCCESS,
    FETCH_SOFT_SUCCESS,
    FETCH_USERS_ALERTS_SUCCESS,
    FETCH_USERS_SUCCESS,
    SET_LOADING_PROGRESS,
    SET_SEARCH_TYPE,
    SET_SEARCH_VALUE,
    SET_SOFT_FILTRED,
    SET_SORT_STATE,
    SET_SEARCHING,
    SET_NO_SEARCHING,
    SET_USERS_FILTRED,
    SET_SELECTED_USER
} from "./action-types"

//******* Initial state ****************//
export const initialState={
    loading: false,
    loaded: false,
    searching: false,
    fetchDataRequest:false,
    loadingProgress:{       // Прогресс загрузки списков
        peoples:{
            loading:false,
            progress:100
        },
        soft:{
            loading:false,
            progress:100
        }
    },
    searchValue:'',
    sortState:{              //Настройки сортировки
        company: true,
        department: true,
        cn: true,
        skype: false,
        phone: false
    },
    adUsers:[],             //Список пользователей из AD
    adFiltredUsers:[],      //Список пользователей из AD отфильтрованный
    selectedUser: {},
    software:[],            //Список программ ИВЦ из Sharepoint
    filtredSoft:[],         //Список программ ИВЦ из Sharepoint  отфильтрованный
    internetUsers:[],       //Список предупреждений пользователей
    userAlerts:[],          //Список предупреждений пользователей
    serachType:'peoples'    //Текущий список поиска
}
//    ..const [selectedUser, setSelectedUser] = React.useState({});
export const reducer = (state, action) => {
    switch (action.type) {
        case FETCH_DATA_REQUEST:
            return {...state, fetchDataRequest: true, loading:true}
        case SET_LOADING_PROGRESS:
            return {...state, loadingProgress:  action.payload}
        case FETCH_DATA_SUCCESS:
            return {...state,
                fetchDataRequest: false,
                loading: false,
                loaded: true
            }
        case FETCH_USERS_SUCCESS:
            return {...state,
                adUsers:  action.payload,
                loadingProgress: {...state.loadingProgress, peoples: { loading:false, progress:100}}
            }
        case FETCH_SOFT_SUCCESS:
            return {...state,
                software:  action.payload,
                loadingProgress: {...state.loadingProgress, soft: { loading:false, progress:100}}
            }
        case FETCH_INTERNET_GROUP_USERS_SUCCESS:
            return {...state, internetUsers: action.payload }
        case FETCH_USERS_ALERTS_SUCCESS:
            return {...state, userAlerts: action.payload }
        case SET_SEARCH_VALUE:
            return {...state, searchValue: action.payload }
        case SET_SEARCHING:
            return {...state, searching: true }
        case SET_NO_SEARCHING:
            return {...state, searching: false }
        case SET_SORT_STATE:
            return {...state, sortState: action.payload }
        case SET_USERS_FILTRED:
            return {...state, adFiltredUsers: action.payload }
        case SET_SOFT_FILTRED:
            return {...state, filtredSoft: action.payload }
        case SET_SELECTED_USER:
            return {...state, selectedUser: action.payload }
        case SET_SEARCH_TYPE:
            return {...state, serachType: action.payload }
        case FETCH_DATA_ERROR:
            return {...state,
                fetchDataRequest: false,
                loading: false,
                loaded: false
            }
        default:
            return state
    }
}
