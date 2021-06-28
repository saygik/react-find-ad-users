import React, {useEffect} from 'react'

import {useData} from "../../context/Data"

import {makeStyles} from "@material-ui/core/styles"
import DeletedHeader from "./DeletedHeader"
import {Divider} from "@material-ui/core"
import InfiniteScroll from "react-infinite-scroller"
import IncomingMessage from "../messages/IncomingMessage"


const useStyles = makeStyles(theme => ({
    root: {
        minWidth: '100%',
    },
}));
const DeletedLayout=(props)=>{
    const {
        selectors:{deleted: {data, HasNextPage}},
        mutations:{deletedMessages:{ fetchNextPage, refresh, undelete, update}}
    }= useData()
    const classes = useStyles();
    // console.log('-AAAAAA--',data)
    useEffect(()=>{
        console.log('-LOADED-',)
        refresh()
    },[])
    return (
        <div className={classes.root}>
            <DeletedHeader/>
            <Divider  />
            <div style={{ width: '100%', height: 200 }}>
                <InfiniteScroll
                    hasMore={HasNextPage}
                    loadMore={fetchNextPage}
                    useWindow={true}
                >
                    {data && data.map(message => {
                            return <IncomingMessage
                                record={message}
                                key={`message_${message.id}`}
                                isDeletedMessages={true}
                                handleDelete={()=> undelete({
                                    id:message.id,
                                    starred: message.starred,
                                    deleted:false,
                                    priority:message.priority
                                })}
                                handleStarred={()=> update({
                                    id:message.id,
                                    starred: !message.starred,
                                    deleted:message.deleted,
                                    priority:message.priority
                                })}
                            />
                        }
                    )}
                </InfiniteScroll>
            </div>
        </div>
    );
}

export default DeletedLayout
