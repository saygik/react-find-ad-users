import React, {useState, useEffect} from 'react'

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import {useData} from '../../context/Data'
import {makeStyles} from "@material-ui/core"

import Divider from '@material-ui/core/Divider';
import {DeleteButton, StarButton, TemplateButton} from "../buttons"
import StarIcon from "@material-ui/icons/Star"
import DeleteForeverIcon from "@material-ui/icons/DeleteForever"
import {IncomingMessage} from "../layout"
import Grow from "@material-ui/core/Grow"
//import {DeleteButton, StarButton} from "../buttons"

const useStyles = makeStyles(
    theme => ({
        title: {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.secondary.light,
            '& h2': {
                fontSize:'1.5rem',
                letterSpacing: '0.1em',
                fontWeight: '600'
            }
        },
        dividers:{
            marginBottom:'10px'
        },
        message: {
            padding:'10px',
            color:'#b7b3b3',
            backgroundColor:'#0c0c0c',
            fontSize:'1.3rem',
            lineHeight: '1.3',
            letterSpacing: '0.05em',
            [theme.breakpoints.down('md')]: {
                fontSize:'1rem',
            },
            [theme.breakpoints.down('sm')]: {
                fontSize:'.8rem',
            },
        },
        rootButton:{
            fontSize:'32px',
        },
        button:{
            marginTop:'10px'
        },
        request:{
            marginTop:'15px',
            marginBottom:'15px',
            fontSize:'1.4rem',
            color:theme.palette.primary.dark
        },
        starColor: ({ starred }) => ({
            color: starred ? '#f5f509' : '#565651',
        }),
        deletedColor: ({ deleted }) => ({
            color: deleted ? '#d40d24' : '#565651',
        }),
    }),
    { name: 'messageDialog' }
);



const initialState = {
    performingAction: false,
    errors: null,
};
const MessageDialog = (props) => {
    const {
        dialogProps,
        onClose,
        message
    }= props
    const {
        handleStarred,
        handleDelete
    }= props

    const classes = useStyles({starred: message.starred, deleted: message.deleted});
    return <div>

        <Dialog fullWidth maxWidth="lg" {...dialogProps} TransitionComponent={Grow} transitionDuration={800}>
            <DialogTitle className={classes.title}>
                Входящее Сообщение
            </DialogTitle>

            <DialogContent dividers>
                <Grid>
                <Box display="flex" flexDirection="row-reverse" >
                    <DeleteButton onClick={handleDelete} label={"Удалить"} size={"large"} color={message.deleted && '#d40d24'}/>
                    <StarButton onClick={handleStarred} label={"Отметить"} size={"large"} color={message.starred && '#f5f509'}/>
                </Box>
                    <Divider className={classes.dividers} />
                    {message?.requests?.id &&
                    <Typography className={classes.request}>{message.requests.text}</Typography> }
                <Typography gutterBottom className={classes.message}>
                    {message && message.text.split("\n").map(function(item, idx) {
                        return (
                            <span key={idx}>
                                        {item}
                                <br/>
                                    </span>
                        )
                    })
                    }
                </Typography>
                </Grid>
            </DialogContent>

            <DialogActions>
                <Button color="primary" onClick={onClose}>
                    Закрыть
                </Button>
            </DialogActions>
        </Dialog>


    </div>
}

const MessageDialogContainer = () => {
    const {
        selectors: {messageDialogOpen, selectedMessage: message},
        actions,
        mutations:{
            responceMessages:{update:updateMessage, deleteR: deleteMessage},
            deletedMessages:{  undelete}
        }}= useData()
    const [state, setState]=useState(initialState)

    const handleExited = () => {
        setState(initialState);
    };
    const handleKeyPress = (event) => {
//        const key = event.key;
        if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
            return;
        }
    };
const handleDelete = () => {
    !message.deleted && deleteMessage(message.id)
    message.deleted && undelete({
        id:message.id,
        starred: message.starred,
        deleted:false,
        priority:message.priority
    })
    actions.messageDialogClose()
}
    const handleStarred = () =>{
        updateMessage({
            id:message.id,
            starred: !message.starred,
            deleted:message.deleted,
            priority:message.priority
        })
    }

    useEffect(()=> {
        if (!messageDialogOpen) {
            setState(initialState)
        }
    },[messageDialogOpen])

    const dialogProps= {
        open: messageDialogOpen,
        onClose: actions.messageDialogClose,
        onExited: handleExited,
        onKeyPress: handleKeyPress
    }
     return <>
        {messageDialogOpen &&
        <MessageDialog
            message={message}
            state={state}
            dialogProps={dialogProps}
            onClose={actions.messageDialogClose}
            handleDelete={ handleDelete }
            handleStarred={handleStarred}
        />}
    </>
}
export default MessageDialogContainer
