import * as React from 'react';
import { useCallback } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {makeStyles} from "@material-ui/core/styles"
import classNames from "classnames"
import {useAuth} from "../../context/Auth"




const defaultIcon = <ExitToAppIcon />;
const defaultLabel = 'Войти в программу'

const useStyles = makeStyles(
    {
        button:{
            color:'#d9d9d9',
            "&:hover": {
                color:'#ffffff',
                backgroundColor: "transparent"
            },
        }
    },
    { name: 'LoginButton' }
);

const LoginButton = (props) => {
    const {label, icon, className,  ...rest} = props
    const { actions }= useAuth()
    const buttonLabel=label || defaultLabel
    const buttonIcon=icon || defaultIcon
    const classes = useStyles();

    const handleClick = useCallback(
        event => {
            event.preventDefault();
            actions.signIn()
        },
        [actions.signIn]
    );
    return (
        <Tooltip title={buttonLabel}>
            <IconButton
                aria-label={buttonLabel}
                className={classNames(classes.button, className)}
                color="inherit"
                onClick={handleClick}
                {...rest}
            >
                {buttonIcon}
            </IconButton>
        </Tooltip>
    );
}
export default LoginButton
