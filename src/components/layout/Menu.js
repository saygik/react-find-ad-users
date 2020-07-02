import * as React from 'react';
import {  useState } from 'react';
import { makeStyles } from '@material-ui/core';
import DefaultIcon from '@material-ui/icons/ViewList';

import classnames from 'classnames';
import DashboardMenuItem from './DashboardMenuItem';
import SubMenu from './SubMenu';
import MenuItemLink from './MenuItemLink';
import {useData} from "../../context/Data"
import {useEffect} from "react"

const useStyles = makeStyles(
    {
        main: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
        },
    },
    { name: 'RaMenu' }
);

// const translatedResourceName = (resource: any, translate: Translate) =>
//     translate(`resources.${resource.name}.name`, {
//         smart_count: 2,
//         _:
//             resource.options && resource.options.label
//                 ? translate(resource.options.label, {
//                     smart_count: 2,
//                     _: resource.options.label,
//                 })
//                 : inflection.humanize(inflection.pluralize(resource.name)),
//     });

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
    const [state, setState] = useState({
    });
    useEffect(()=>{
        resources.filter(r => r.submenu).map(resource=>state[resource.name]=resource.open || false)
    },[])
    const handleToggle = (menu) => {
        // console.log('-menu-',menu)
        // console.log('-state-',state)
        setState(state => ({ ...state, [menu]: !state[menu] }));
    };
//    const isXSmall = useMediaQuery(theme => theme.breakpoints.down('xs'));
//    const open = useSelector((state: ReduxState) => state.admin.ui.sidebarOpen);
    const { selectors, actions } = useData()
    const { sidebarOpen: open } = selectors
//    console.log('-resources-',resources)

    // Used to force redraw on navigation
//    useSelector((state: ReduxState) => state.router.location.pathname);
    return (
        <div className={classnames(classes.main, className)} {...rest}>
            {hasDashboard && (
                <DashboardMenuItem
                    onClick={onMenuClick}
                    dense={dense}
                    sidebarIsOpen={open}
                />
            )}

            {resources
                .filter(r => r.submenu)
                .map(submenu => (
                    <SubMenu
                        key={submenu.name}
                        handleToggle={() => handleToggle(submenu.name)}
                        isOpen={state[submenu.name]}
                        sidebarIsOpen={open}
                        name={submenu.label}
                        icon={
                            submenu.icon ? <submenu.icon /> : <DefaultIcon />
                        }
                        dense={dense}
                    >
                        {resources
                            .filter(r => r.owner===submenu.name)
                            .map(menuItem => (
                              <MenuItemLink
                                  key={menuItem.name}
                                  to={`/${menuItem.path}`}
                                  primaryText={menuItem.label}
                                  leftIcon={
                                      menuItem.icon ? <menuItem.icon /> : <DefaultIcon />
                                  }
                                  onClick={onMenuClick}
                                  sidebarIsOpen={open}
                                  dense={dense}
                            />
                            )
                            )
                        }
                    </SubMenu>
                ))}
            {/*<SubMenu*/}
            {/*    key={submenu.name}*/}
            {/*    handleToggle={() => handleToggle(submenu.name)}*/}
            {/*    isOpen={state[submenu.name]}*/}
            {/*    sidebarIsOpen={open}*/}
            {/*    name={submenu.name}*/}
            {/*    icon={submenu.icon}*/}
            {/*    dense={dense}*/}
            {/*>*/}
            {/*</SubMenu>*/}
            {/*{isXSmall && logout}*/}
            {/*<SubMenu*/}
            {/*    handleToggle={() => handleToggle('menuSales')}*/}
            {/*    isOpen={state.menuSales}*/}
            {/*    sidebarIsOpen={open}*/}
            {/*    name="Поиск"*/}
            {/*    icon={<SearchIcon />}*/}
            {/*    dense={dense}*/}
            {/*>*/}
            {/*    <MenuItemLink*/}
            {/*        to={`/peoples`}*/}
            {/*        primaryText={'Люди'}*/}
            {/*        leftIcon={<DefaultIcon />}*/}
            {/*        onClick={onMenuClick}*/}
            {/*        sidebarIsOpen={open}*/}
            {/*        dense={dense}*/}
            {/*    />*/}
            {/*    <MenuItemLink*/}
            {/*        to={`/soft`}*/}
            {/*        primaryText={'Сервисы ИВЦ'}*/}
            {/*        leftIcon={<DefaultIcon />}*/}
            {/*        onClick={onMenuClick}*/}
            {/*        sidebarIsOpen={open}*/}
            {/*        dense={dense}*/}
            {/*    />*/}
            {/*</SubMenu>*/}
        </div>
    );
};


Menu.defaultProps = {
    onMenuClick: () => null,
};

export default Menu;
