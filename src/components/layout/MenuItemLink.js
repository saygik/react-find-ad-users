import React, {
    forwardRef,
    cloneElement,
    useCallback,
    FC,
    ReactElement,
    ReactNode,
} from 'react';
import classnames from 'classnames';

import { NavLink,  } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';

const NavLinkRef = forwardRef((props, ref) => (
    <NavLink innerRef={ref} {...props} />
));

const useStyles = makeStyles(
    theme => ({
        root: {
            color: theme.palette.text.secondary,
        },
        active: {
            color: theme.palette.text.primary,
        },
        icon: { minWidth: theme.spacing(5) },
    }),
    { name: 'RaMenuItemLink' }
);

const MenuItemLink= forwardRef((props, ref) => {
    const {
        classes: classesOverride,
        className,
        primaryText,
        leftIcon,
        onClick,
        sidebarIsOpen,
        ...rest
    } = props;
    const classes = useStyles(props);

    const handleMenuTap = useCallback(
        e => {
            onClick && onClick(e);
        },
        [onClick]
    );
    const renderMenuItem = () => {
        return (
            <MenuItem
                className={classnames(classes.root, className)}
                activeClassName={classes.active}
                component={NavLinkRef}
                ref={ref}
                {...rest}
                onClick={handleMenuTap}
            >
                {leftIcon && (
                    <ListItemIcon className={classes.icon}>
                        {cloneElement(leftIcon, {
                            titleAccess: primaryText,
                        })}
                    </ListItemIcon>
                )}
                {primaryText}
            </MenuItem>
        );
    };

    if (sidebarIsOpen) {
        return renderMenuItem();
    }

    return (
        <Tooltip title={primaryText} placement="right">
            {renderMenuItem()}
        </Tooltip>
    );
});


export default MenuItemLink;
