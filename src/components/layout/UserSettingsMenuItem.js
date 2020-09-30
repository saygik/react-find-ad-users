import * as React from 'react';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { ListItemIcon, MenuItem, makeStyles } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import classnames from 'classnames';
import {useAuth} from "../../context/Auth"


const useStyles = makeStyles(theme => ({
    menuItem: {
        color: theme.palette.text.secondary,
    },
    icon: {minWidth: theme.spacing(5)},
}))

/**
 * Logout button component, to be passed to the Admin component
 *
 * Used for the Logout Menu item in the sidebar
 */
const UserSettingsMenuItem=React.forwardRef((props,ref)=> {
    const {
        className,
        classes: classesOverride,
        icon,
        onLeaveMenu,
        ...rest
    } = props;
    const classes = useStyles(props);
    const {user,actions}= useAuth()
    const history=useHistory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleClick = useCallback(() => {
            onLeaveMenu()
            history.push('/peoples/'+user.email+'/')
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [actions.signOut]);
    return (
        <MenuItem
            className={classnames('settings', classes.menuItem, className)}
            onClick={handleClick}
            ref={ref}
            {...rest}
        >
            <ListItemIcon className={classes.icon}>
                {icon ? icon : <SettingsIcon />}
            </ListItemIcon>
            {'Кабинет'}
        </MenuItem>
    );
})


export default UserSettingsMenuItem
