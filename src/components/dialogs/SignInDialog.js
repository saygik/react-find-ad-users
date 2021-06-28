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
import {useAuth} from '../../context/Auth'


const ACTION_SIGN_IN = 'ACTION_SIGN_IN';

const initialState = {
    performingAction: false,
    emailAddress: '',
    password: '',
    errors: null,
    action: null
};
const SignInDialog = (props) => {
    const {
        dialogProps,
        handleEmailAddressChange,
        handlePasswordChange,
        onClose,
        signIn
    }= props
    const {
        performingAction,
        emailAddress,
        password,
        errors
    } = props.state;
    return <div>

        <Dialog fullWidth maxWidth="sm" {...dialogProps} >
            <DialogTitle>
                Войти в программу
            </DialogTitle>

            <DialogContent>
                <Grid container direction="column" spacing={2}>
                    <Grid item xs>
                        <TextField
                            autoComplete="email"
                            disabled={performingAction}
                            error={!!(errors && errors.emailAddress)}
                            fullWidth
                            helperText={(errors && errors.emailAddress) ? errors.emailAddress[0] : ''}
                            label='пользователь(почта)'
                            placeholder="user@brnv.rw"
                            required
                            type="email"
                            value={emailAddress}
                            // variant="outlined"
                            onChange={handleEmailAddressChange}
                        />
                    </Grid>

                    <Grid item xs>
                        <TextField
                            autoComplete="current-password"
                            disabled={performingAction}
                            error={!!(errors && errors.password)}
                            fullWidth
                            helperText={(errors && errors.password) ? errors.password[0] : ''}
                            label='пароль'
                            placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                            required
                            type="password"
                            value={password}
                            // variant="outlined"

                            onChange={handlePasswordChange}
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
                    disabled={(!emailAddress || !password) || performingAction}
                    variant="contained"
                    onClick={signIn}>
                    Войти
                </Button>
            </DialogActions>
        </Dialog>


    </div>
}


const SignInDialogContainer = () => {
    const {signInDialogOpen, actions,getAuth}= useAuth()
    const [state, setState]=useState(initialState)


    const signIn = () => {
        const { emailAddress, password } = state;

        const errors = validate({
            emailAddress: emailAddress,
            password: password
        }, {
            emailAddress: constraints.emailAddress,
            password: constraints.password
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
                action: ACTION_SIGN_IN
            })
        }
    };
    const handleExited = () => {
        setState(initialState);
    };
    const handleKeyPress = (event) => {
        const { emailAddress, password } = state;
        if (!emailAddress || !password) {
            return;
        }
        const key = event.key;
        if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
            return;
        }
        if (key === 'Enter') {
            signIn();
        }
    };
    const handleEmailAddressChange = (event) => {
        const emailAddress = event.target.value;
        setState({
            ...state,
            emailAddress: emailAddress
        });
    };
    const handlePasswordChange = (event) => {
        const password = event.target.value;
        setState({
            ...state,
            password: password
        });
    };
    useEffect(()=> {

        if (state.action === ACTION_SIGN_IN) {
            getAuth(state.emailAddress, state.password)
            setState({
                        ...state,
                        performingAction: false,
                        action: null
                    });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.action])
    const dialogProps= {
        open: signInDialogOpen,
        onClose: actions.signInCancel,
        onExited: handleExited,
        onKeyPress: handleKeyPress
    }
    return <>
        {signInDialogOpen &&
        <SignInDialog
            state={state}
            dialogProps={dialogProps}
            onClose={actions.signInCancel}
            handleEmailAddressChange={handleEmailAddressChange}
            handlePasswordChange={handlePasswordChange}
            signIn={signIn}
        />}
    </>
}
export default SignInDialogContainer
