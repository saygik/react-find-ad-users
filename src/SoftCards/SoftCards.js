import React, {useEffect, useState} from 'react'
import {makeStyles} from "@material-ui/core/styles"
import SoftCard from "./SoftCard"
import InfiniteScroll from "react-infinite-scroller"
import UserCard from "../UserCard/Card"

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(3),
    },
    searchResult: {
        marginRight: theme.spacing(2),
    },

}));
let page=0
const SoftCards = (props) => {
    const classes = useStyles();
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
