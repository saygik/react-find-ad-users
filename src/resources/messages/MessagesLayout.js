import React from 'react'
import { makeStyles, } from '@material-ui/core/styles';
import {useData} from "../../context/Data"
import {AddButton} from "../../components/buttons"
import MessagesHeader from './MessagesHeader'
import IncomingMessage from './IncomingMessage'
import {Divider} from "@material-ui/core"
import {TopToolbar} from "../../components/layout"

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: '100%',
    },
}));

const MessagesLayout = () => {
    const {selectors:{undeletedMessages: messages}, mutations:{responceMessages:{deleteR, update}}}= useData()
    const allowEdit=true
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <MessagesHeader/>
            <Divider  />
            {messages.map((message) => {
                return <IncomingMessage
                    record={message}
                    key={`review_${message.id}`}
                    handleDelete={()=> deleteR(message.id)}
                    handleStarred={()=> update({
                        id:message.id,
                        starred: !message.starred,
                        deleted:message.deleted,
                        priority:message.priority
                    })}
                    allowEdit={allowEdit}
                />
            }
            )}
        </div>
    );
};

export default MessagesLayout;
