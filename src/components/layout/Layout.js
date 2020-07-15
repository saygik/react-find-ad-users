import React, {
    createElement,
} from 'react';
import classnames from 'classnames';
//import { withRouter } from 'react-router-dom';
import { makeStyles, } from '@material-ui/core/styles'

import Bar from "./Bar"
//import {Footer} from "./"
import DefaultSidebar from './Sidebar';
import DefaultMenu from './Menu';


const useStyles = makeStyles(theme => ({
        root: {
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1,
            minHeight: '100vh',
            backgroundColor: theme.palette.background.default,
            position: 'relative',
            minWidth: 'fit-content',
            width: '100%',
        },
        appFrame: {
            display: 'flex',
            flexDirection: 'column',
            [theme.breakpoints.up('xs')]: {
                marginTop: theme.spacing(6),
            },
            [theme.breakpoints.down('xs')]: {
                marginTop: theme.spacing(7),
            },
        },
        contentWithSidebar: {
            display: 'flex',
            flexGrow: 1,
        },
        content: {
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            flexBasis: 0,
            padding: theme.spacing(3),
            paddingTop: theme.spacing(1),
            paddingLeft: 0,
            [theme.breakpoints.up('xs')]: {
                paddingLeft: 5,
            },
            [theme.breakpoints.down('sm')]: {
                padding: 0,
            },
        },
    }))
const Layout = (props) => {
    const classes = useStyles();
    const {
        children,
        className,
        logout,
        menu,
        sidebar,
        resources
    } = props;

    return (
        <div
            className={classnames('layout', classes.root, className)}
        >
            <div className={classes.appFrame}>
                <Bar/>
                <main className={classes.contentWithSidebar}>
                    {createElement(sidebar, {
                        children: createElement(menu, {
                            logout,
                            resources,
                            hasDashboard: true,
                        }),
                    })}
                    <div className={classes.content}>
                        { children }
                    </div>
                </main>
                {/*<Footer/>*/}
            </div>
        </div>
    );
}
Layout.defaultProps = {
    sidebar: DefaultSidebar,
    menu: DefaultMenu,
};


export default Layout
