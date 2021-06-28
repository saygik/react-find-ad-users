import * as React from 'react';
import {  useState } from 'react';
import { makeStyles } from '@material-ui/core';
import DefaultIcon from '@material-ui/icons/ViewList';

import classnames from 'classnames';

import MenuItemLink from './MenuItemLink';
import {useData} from "../../context/Data"
import {useEffect} from "react"

const useStyles = makeStyles(theme => ({
        main: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            paddingTop: '60px',
        },
        item: {
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
            fontSize: 20,
            fontWeight:'bold',
            color: 'rgba(255, 255, 255, 0.7)',
            '&:hover,&:focus': {
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
            },
            itemCategory: {
                backgroundColor: '#232f3e',
                boxShadow: '0 -1px 0 #404854 inset',
                paddingTop: theme.spacing(2),
                paddingBottom: theme.spacing(2),
            },
            firebase: {
                fontSize: 28,
                color: theme.palette.common.white,
            },
        },
    }
));

const Menu = props => {
    const {
        classes: classesOverride,
        className,
        dense,
        hasDashboard,
        onMenuClick,
        logout,
        resources,
        ...rest
    } = props;
    const classes = useStyles(props);
    const [state] = useState({
    });
    useEffect(()=>{
        resources.filter(r => r.submenu).map(resource=>state[resource.name]=resource.open || false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const { selectors:{sidebarOpen:open} } = useData()

    return (
        <div className={classnames(classes.main, className)} {...rest}>

            {resources
                .map(menuItem => (
                    <MenuItemLink
                        className={classnames(classes.firebase, classes.item, classes.itemCategory)}
                        key={menuItem.name}
                        to={menuItem.path==='/' ?`/`:`/${menuItem.path}`}
                        primaryText={menuItem.label}
                        leftIcon={
                            menuItem.icon ? <menuItem.icon /> : <DefaultIcon />
                        }
                        onClick={onMenuClick}
                        sidebarIsOpen={open}
                        dense={dense}
                    />
                ))}
        </div>
    );
};


Menu.defaultProps = {
    onMenuClick: () => null,
};

export default Menu;
