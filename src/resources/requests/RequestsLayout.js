import React from 'react'
import {Divider,} from '@material-ui/core'

import { makeStyles, } from '@material-ui/core/styles';
import {useData} from "../../context/Data"
import OutcomingMessage from './OutcomingMessage'
import RequestsHeader from './RequestsHeader'
import InfiniteScroll from "react-infinite-scroller"


const useStyles = makeStyles(theme => ({
    root: {
        minWidth: '100%',
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
}));

const RequestsLayout = () => {
    const {
        selectors:{requests: {data: requests, HasNextPage}},
        mutations:{requestMessages:{ fetchNextPage}}
    }= useData()
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <RequestsHeader/>
            <Divider  />
            <div style={{ width: '100%', height: 200 }}>
            <InfiniteScroll
                hasMore={HasNextPage}
                loadMore={fetchNextPage}
                useWindow={true}
            >
            {requests && requests.map(message => {
                    return <OutcomingMessage
                        record={message}
                        key={`message_${message.id}`}
                    />
                }
            )}
            </InfiniteScroll>
            </div>
        </div>
    );
};

export default RequestsLayout;
