import moment from 'moment'
import {

    PEOPLES_DATA_REQUEST,
    PEOPLES_DATA_LOADING_PROGRESS,
    PEOPLES_DATA_ERROR,
    PEOPLES_DATA_SUCCESS,
    SOFT_DATA_REQUEST,
    SOFT_DATA_LOADING_PROGRESS,
    SOFT_DATA_SUCCESS,
    SOFT_DATA_ERROR,
    ZALS_DATA_REQUEST,
    ZALS_DATA_SUCCESS,
    ZALS_DATA_ERROR,
    ACTIVE_ZALS_DATA_REQUEST,
    ACTIVE_ZALS_DATA_SUCCESS,
    ACTIVE_ZALS_DATA_ERROR,
    ONEZAL_DATA_REQUEST,
    FETCH_INTERNET_GROUP_USERS_SUCCESS,
    FETCH_USERS_ALERTS_SUCCESS,
    SET_SEARCH_VALUE,
    SET_SOFT_FILTRED,
    SET_SORT_STATE,
    SET_SEARCHING,
    SET_NO_SEARCHING,
    SET_USERS_FILTRED,
    SET_SELECTED_USER,
    SET_CURRENT_RESOURCE,
    SET_USERS_SECOND_FILTERS,
    SEARCH,
    SET_OU_FILTER,
    CLEAR_PEOPLE_FILTERS,
    CLEAR_USERS_SECOND_FILTERS,
    REFRESH_DATA,
    SET_SIDEBAR,
    ONEZAL_DATA_ERROR,
    ONEZAL_DATA_SUCCESS
} from "./action-types"
import resourceTypes from "./resource-types"

//******* Initial state ****************//
export const initialState={
    loading: false,
    loaded: false,
    search: false,
    searching: false,
    sidebarOpen:true,
    fetchDataRequest:false,
    // loadingProgress:{       // Прогресс загрузки списков
    //     peoples:{
    //         loaded:false,
    //         loading:false,
    //         progress:100
    //     },
    //     soft:{
    //         loaded:false,
    //         loading:false,
    //         progress:100
    //     }
    // },
    searchValue:'',
    searchOU:'',
    sortState:{              //Настройки сортировки
        company: true,
        department: true,
        pager: true,
        cn: true,
    },
    adUsers:{
        requested: false,
        loading:false,
        loaded:false,
        progress:100,
        updated: moment('2000-01-01'),
        filters:[
            'cn',
            'title',
            'company',
            'department',
            'url',
            'mail',
            'telephoneNumber'
        ],
        secondFilters:{
            sip:{
                name:'Skype для бизнеса',
                value:''
            },
            telephoneNumber:{
                name:'Рабочий телефон',
                value:''
            },
            internet:{
                name:'Интернет',
                value:''
            },
        },
        data:[]
    },             //Список пользователей из AD
    adFiltredUsers:[],      //Список пользователей из AD отфильтрованный
    selectedUser: {},
    software:{
        requested: false,
        loading:false,
        loaded:false,
        progress:100,
        updated: moment('2000-01-01'),
        data:[]
    },            //Список программ ИВЦ из Sharepoint
    zals:{
        requested: false,
        loading:false,
        loaded:false,
        progress:100,
        updated: moment('2000-01-01'),
        data:[]
    },            //Список фиксированных залов  из Sharepoint
    activeZals:{
        requested: false,
        loading:false,
        firstloading:true,
        data:[]
    },            //Список фиксированных залов  из Sharepoint
    oneZal: {
        requestId:'',
        loading:false,
        firstloading:true,
        errLoading: false,
        data:[]
    },
    filtredSoft:[],         //Список программ ИВЦ из Sharepoint  отфильтрованный
    internetUsers:[],       //Список предупреждений пользователей
    userAlerts:[],          //Список предупреждений пользователей
    currentResource: ''
}
//    ..const [selectedUser, setSelectedUser] = React.useState({});
export const reducer = (state, action) => {
    switch (action.type) {
        case SET_CURRENT_RESOURCE:
            return {...state, currentResource:action.payload}
        case SEARCH:
            return {...state, search:action.payload}
        case SET_OU_FILTER:
            return {...state, searchOU:action.payload}
        case CLEAR_PEOPLE_FILTERS:
            return {...state, searchOU:'', searchValue:''}
        case PEOPLES_DATA_REQUEST:
            return {...state, adUsers:{...state.adUsers, requested: true, loading:true, progress:0 }}
        case PEOPLES_DATA_LOADING_PROGRESS:
            return {...state, adUsers:{...state.adUsers, progress:action.payload }}
        case PEOPLES_DATA_SUCCESS:
            return {...state,search:true, adUsers:{...state.adUsers,data: action.payload, requested: false, loaded:true,loading:false, progress:100, updated: moment() }}
        case PEOPLES_DATA_ERROR:
            return {...state, adUsers:{...state.adUsers,requested: false, loading:false, progress:100 }}
        case SOFT_DATA_REQUEST:
            return {...state, software:{...state.software, requested: true, loading:true, progress:0 }}
        case SOFT_DATA_LOADING_PROGRESS:
            return {...state, software:{...state.software, progress:action.payload }}
        case SOFT_DATA_SUCCESS:
            return {...state, software:{...state.software,data: action.payload, requested: false, loaded:true,loading:false, progress:100, updated:moment() }}
        case SOFT_DATA_ERROR:
            return {...state, software:{...state.software,requested: false, loading:false, progress:100 }}
        case ZALS_DATA_REQUEST:
            return {...state, zals:{...state.zals, requested: true, loading:true, }}
        case ZALS_DATA_SUCCESS:
            return {...state, zals:{...state.zals,data: action.payload, requested: false, loaded:true,loading:false, updated:moment() }}
        case ZALS_DATA_ERROR:
            return {...state, zals:{...state.zals,requested: false, loading:false }}
        case ACTIVE_ZALS_DATA_REQUEST:
            return {...state, activeZals:{...state.activeZals, requested: true, loading:true, }}
        case ACTIVE_ZALS_DATA_SUCCESS:
            return {...state, activeZals:{...state.activeZals,data: action.payload, requested: false, loaded:true,loading:false }}
        case ACTIVE_ZALS_DATA_ERROR:
            return {...state, activeZals:{...state.activeZals,requested: false, loading:false }}
        case ONEZAL_DATA_REQUEST:
            return {...state, oneZal:{...state.oneZal,requestId: action.payload, loading:true, errLoading:false}}
        case ONEZAL_DATA_SUCCESS:
            return {...state, oneZal:{requestId:'',data: action.payload, loading:false,firstloading:false, errLoading:false }}
        case ONEZAL_DATA_ERROR:
            return {...state, oneZal:{...state.oneZal,requestId:'',data: [], loading:false,firstloading:false, errLoading:true }}
        // case SET_LOADING_PROGRESS:
        //     return {...state, loadingProgress:  action.payload}
        case SET_USERS_SECOND_FILTERS:
            const newSecondFilters={...state.adUsers.secondFilters}
            newSecondFilters[action.payload.filter]={...newSecondFilters[action.payload.filter], value:action.payload.value}
            return {...state, adUsers:{...state.adUsers, secondFilters: newSecondFilters}}
        case CLEAR_USERS_SECOND_FILTERS:
            return {...state, adUsers:{...state.adUsers, secondFilters: initialState.adUsers.secondFilters}}
        case SET_SIDEBAR:
            return {...state, sidebarOpen:  action.payload}
        case REFRESH_DATA:
//            console.log('-state.currentResource-',state.currentResource)

            switch (state.currentResource) {
                case resourceTypes.PEOPLES :
                    return {...state, adUsers:{...state.adUsers, requested: true, loading:true, progress:0 }}
                case resourceTypes.STRUCTURE :
                    return {...state, adUsers:{...state.adUsers, requested: true, loading:true, progress:0 }}
                case resourceTypes.SOFT :
                    return {...state, software:{...state.software, requested: true, loading:true, progress:0 }}
                case resourceTypes.ZALS :
                    return {...state, zals:{...state.zals, requested: true, loading:true, }}
                case resourceTypes.ACTIVEZALS :
                    return {...state, activeZals:{...state.activeZals, requested: true, loading:true, }}
                case resourceTypes.ONEZAL :
                    return {...state, oneZal:{...initialState.oneZal }}
                default:
                    return {...state}
            }
        // case FETCH_DATA_SUCCESS:
        //     return {...state,
        //         fetchDataRequest: false,
        //         loading: false,
        //         loaded: true
        //     }
        // case FETCH_USERS_SUCCESS:
        //     return {...state,
        //         adUsers:  action.payload,
        //         loadingProgress: {...state.loadingProgress, peoples: {...state.loadingProgress.peoples, loading:false, progress:100}}
        //     }
        // case FETCH_SOFT_SUCCESS:
        //     return {...state,
        //         software:  action.payload,
        //         loadingProgress: {...state.loadingProgress, soft: {...state.loadingProgress.peoples, loading:false, progress:100}}
        //     }
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
        // case FETCH_DATA_ERROR:
        //     return {...state,
        //         fetchDataRequest: false,
        //         loading: false,
        //         loaded: false
        //     }
        default:
            return state
    }
}
