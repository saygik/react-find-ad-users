import React, {useEffect, useState} from 'react'
import SoftCard from "./SoftCard"
import InfiniteScroll from "react-infinite-scroller"

let page=0
const SoftCards = (props) => {
    const {software,searchValues, setSearching, findAndSelectUser}=props
    const [showedSoft,setShowedSoft]=useState([])         //Показанные на экране пользователи

    const getNewSoft=()=>{
        page++;
        const pageStart=page*10-10
        const pageEnd=pageStart+10>software.length ? software.length : pageStart+10
        const pageUsers = software.slice(pageStart, pageEnd);
        setShowedSoft(showedSoft.concat(pageUsers));

    }
    useEffect(()=>{
        page=0
        setShowedSoft([])
        setSearching(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[software])

    return <InfiniteScroll
        pageStart={page}
        loadMore={getNewSoft}
        hasMore={software.length > showedSoft.length}
        threshold={10}
        useWindow={true}
    >
        {showedSoft.map((soft, index) => <SoftCard key={index}
                                                 software={soft}
                                                 index={index}
                                                 searchValues={searchValues}
                                                 findAndSelectUser={findAndSelectUser}
        />)}
    </InfiniteScroll>

    //
    // return <div className={classes.root}>
    //     {software.map((soft, index) => <SoftCard key={index}
    //                                              software={soft}
    //                                              index={index}
    //                                              searchValues={searchValues}
    //     />)}
    // </div>
}
export default SoftCards
