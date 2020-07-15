import {
    SET_SIDEBAR,
    SET_USERS_SECOND_FILTERS,
    SET_OU_FILTER,
    SET_SEARCH_VALUE,
    SET_SORT_STATE,
    SET_SELECTED_USER,
    REFRESH_DATA,
} from "./action-types"


const mapDispatch = (state,dispatch) => ({
    setSidebar: value =>  dispatch({type: SET_SIDEBAR, payload:value}),
    setPeoplesSecondFilters: value =>  dispatch({type: SET_USERS_SECOND_FILTERS, payload:value}),
    setOU: value =>  dispatch({type: SET_OU_FILTER, payload:value}),
    setSearchValue: value =>  dispatch({type: SET_SEARCH_VALUE, payload:value}),
    setSortState: value =>  dispatch({type: SET_SORT_STATE, payload:value}),
    setSelectedUser: value =>  dispatch({type: SET_SELECTED_USER, payload:value}),
    refreshData: () =>  dispatch({type: REFRESH_DATA}),
    selectUserByNameOrMail: value =>  {},

})

export default mapDispatch
