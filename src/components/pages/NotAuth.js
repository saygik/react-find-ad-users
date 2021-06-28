import * as React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import History from '@material-ui/icons/History';
import classnames from 'classnames';
import Typography from "@material-ui/core/Typography"
import {useCallback} from "react"
import {useAuth} from "../../context/Auth"



const useStyles = makeStyles(
    theme => ({
        container: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center'
        },
        center: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center'
        },
        icon: {
            width: '9em',
            height: '9em',
        },
        message: {
            textAlign: 'center',
            fontFamily: 'Roboto, sans-serif',
            opacity: 0.5,
            margin: '0 1em',
        },
        toolbar: {
            textAlign: 'center',
            marginTop: '2em',
        },
    }),
    { name: 'RaNotFound' }
);


const NotAuth = props => {
    const { className } = props;
    const classes = useStyles(props);
    const {autologin, actions}= useAuth()
    const handleClick = useCallback(
        event => {
            event.preventDefault();
            actions.signIn()
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [actions.signIn]
    );

    return (
        <div
            className={classnames(classes.container, className)}
        >
            {/*<Title defaultTitle={title} />*/}
            <div className={classes.message}>
                <ExitToAppIcon className={classes.icon} />
                <h1>Вы не авторизованы</h1>
                <Typography variant="subtitle1">
                    {autologin ? 'Попытка автоматического входа' : 'Для продолжения работы войдите в систему'}
                </Typography>

            </div>
            <div className={classes.toolbar}>
                <Button variant="contained" icon={<History />} onClick={handleClick}>
                    Войти в систему
                </Button>
            </div>
        </div>
    );
};

export default NotAuth;
