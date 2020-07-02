import * as React from 'react';
//import { useCallback } from 'react';
import { ListItemIcon, MenuItem, makeStyles } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
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
const UserTitleMenuItem=React.forwardRef((props,ref)=> {
    const {
        className,
        classes: classesOverride,
        icon,
        ...rest
    } = props;
    const classes = useStyles(props);
    const { user}= useAuth()
    return (
        <MenuItem
            className={classnames('logout', classes.menuItem, className)}
            ref={ref}
            {...rest}
        >
            <ListItemIcon className={classes.icon}>
                {icon ? icon : <PersonIcon />}
            </ListItemIcon>
            {user.name}
        </MenuItem>
    );
})


export default UserTitleMenuItem
