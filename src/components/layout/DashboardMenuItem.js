import * as React from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';

import MenuItemLink from './MenuItemLink';

const DashboardMenuItem = ({
                               locale,
                               onClick,
                               ...props
    }) => {
    return (
        <MenuItemLink
            onClick={onClick}
            to="/"
            primaryText={'Главная'}
            leftIcon={<DashboardIcon />}
            exact
            {...props}
        />
    );
};



export default DashboardMenuItem;
