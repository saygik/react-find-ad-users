import React, {useState, useEffect} from 'react'

import validate from 'validate.js'

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import constraints from '../../assets/constraints';
import {useData} from '../../context/Data'
import {makeStyles} from "@material-ui/core"
import Grow from "@material-ui/core/Grow"

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
        message: {
            '& .MuiInputBase-root': {
//                color:'#fff',
                fontSize:'1.5rem',
                letterSpacing: '0.05em',
            },
            '& .MuiFormLabel-root': {
//                color:'#e0dede',

            },
            padding:'10px',
  //          backgroundColor:'#0c0c0c',
            lineHeight: '1.3',
        }
    }),
    { name: 'NewMessageDialog' }
);


const ACTION_SEND = 'ACTION_SEND';

const initialState = {
    performingAction: false,
    message: '',
    errors: null,
    action: null
};
const NewMessageDialog = (props) => {
    const {
        dialogProps,
        handleMessageChange,
        onClose,
        send
    }= props
    const {
        performingAction,
        message,
        errors
    } = props.state;
    const classes = useStyles();
    return <div>

        <Dialog fullWidth maxWidth="md" {...dialogProps} TransitionComponent={Grow} transitionDuration={400}>
            <DialogTitle className={classes.title}>
                Новое сообщение
            </DialogTitle>

            <DialogContent>
                <Grid container direction="column" spacing={2}>
                    <Grid item xs>
                        <TextField
                            autoFocus
                            className={classes.message}
                            disabled={performingAction}
                            error={!!(errors && errors.message)}
                            fullWidth
                            helperText={(errors && errors.message) ? errors.message[0] : ''}
                            label='сообщение'
                            placeholder="(:сообщение:)"
                            required
                            multiline
                            rows={1}
                            value={message}
                            // variant="outlined"
                            onChange={handleMessageChange}
                        />
                    </Grid>

                 </Grid>
            </DialogContent>

            <DialogActions>
                <Button color="primary" onClick={onClose}>
                    Отменить
                </Button>

                <Button
                    color="primary"
                    disabled={!message  || performingAction}
                    variant="contained"
                    onClick={send}>
                    Отослать
                </Button>
            </DialogActions>
        </Dialog>


    </div>
}


const NewMessageDialogContainer = () => {
    const {
        selectors: {newMessageDialogOpened, newMessageFromTemplate},
        actions:{newMessageDialogClose},
        mutations: { requestMessages:{create:sendMessage}},
    }= useData()
    const [state, setState]=useState(initialState)

    const send = () => {
        const { message } = state;
        const errors = validate({
            message: message,
        }, {
            message: constraints.message,
        });

        if (errors) {
            setState({
                ...state,
                errors: errors
            });
        } else {
            setState({
                ...state,
                performingAction: true,
                errors: null,
                action: ACTION_SEND
            })
        }
    };
    const handleExited = () => {
        setState(initialState);
    };
    const handleKeyPress = (event) => {
        const { message } = state;
        if (!message ) {
            return;
        }
        const key = event.key;
        if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
            return;
        }
        if (key === 'Enter') {
            send();
        }
    };
    const handleMessageChange = (event) => {
        const message = event.target.value;
        setState({
            ...state,
            message: message
        });
    };
    useEffect(()=> {
        if (newMessageDialogOpened && newMessageFromTemplate && newMessageFromTemplate.length>3)
            setState({...initialState, message: newMessageFromTemplate})
        else setState(initialState)
    },[newMessageDialogOpened])
    useEffect(()=> {

        if (state.action === ACTION_SEND) {
            sendMessage({ text: state.message, await:true })
            setState({
                        ...state,
                        performingAction: false,
                        action: null
                    });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.action])
    const dialogProps= {
        open: newMessageDialogOpened,
        onClose: newMessageDialogClose,
        onExited: handleExited,
        onKeyPress: handleKeyPress
    }
    return <>
        {newMessageDialogOpened &&
        <NewMessageDialog
            state={state}
            dialogProps={dialogProps}
            onClose={newMessageDialogClose}
            handleMessageChange={handleMessageChange}
            send={send}
        />}
    </>
}
export default NewMessageDialogContainer
