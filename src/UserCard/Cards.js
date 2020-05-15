import React, {useEffect, useState} from 'react'
import InfiniteScroll from "react-infinite-scroller"
import UserCard from './Card'

let page=0
const Cards = (props) => {
    const {adFiltredUsers, setSearching, searchValues, setSelectedUser}=props
    const [adShowedUsers,setAdShowedUsers]=useState([])         //Показанные на экране пользователи

    const getNewUsers=()=>{
        page++;
        const pageStart=page*10-10
        const pageEnd=pageStart+10>adFiltredUsers.length ? adFiltredUsers.length : pageStart+10
        const pageUsers = adFiltredUsers.slice(pageStart, pageEnd);
        setAdShowedUsers(adShowedUsers.concat(pageUsers));

    }

    useEffect(()=>{
        page=0
        setAdShowedUsers([])
        setSearching(false)
    },[adFiltredUsers])

    return <InfiniteScroll
        pageStart={page}
        loadMore={getNewUsers}
        hasMore={adFiltredUsers.length > adShowedUsers.length}
        threshold={10}
        useWindow={true}
    >
        {adShowedUsers.map((user, index) => <UserCard key={user.objectGUID}
                                                      user={user}
                                                      selectUser={setSelectedUser}
                                                      index={index}
                                                      searchValue={searchValues}
        />)}
    </InfiniteScroll>
}
export default Cards
