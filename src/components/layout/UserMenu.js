import * as React from 'react';
import {  useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LogoutButton from '../buttons/LogoutButton'
import UserTitleMenuItem from './UserTitleMenuItem'
import UserSettingsMenuItem from './UserSettingsMenuItem'
import Divider from '@material-ui/core/Divider';

const defaultIcon = <AccountCircle />;
const defaultLabel = 'Профиль пользователя'

const UserMenu = props => {
    const [anchorEl, setAnchorEl] = useState(null);

    const { label, icon } = props;
    const open = Boolean(anchorEl);
    const menuLabel=label || defaultLabel
    const menuIcon=icon || defaultIcon
    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => setAnchorEl(null);
    return (
        <div>
            <Tooltip title={menuLabel}>
                <IconButton
                    aria-label={menuLabel}
                    aria-owns={open ? 'menu-appbar' : null}
                    aria-haspopup={true}
                    color="inherit"
                    onClick={handleMenu}
                >
                    {menuIcon}
                </IconButton>
            </Tooltip>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
            >

                <UserTitleMenuItem/>
                <Divider />
                <UserSettingsMenuItem/>
                <LogoutButton/>
            </Menu>
        </div>
    );
};


export default UserMenu;
