import * as React from 'react';
import { Children, cloneElement } from 'react';
import { Drawer, makeStyles, useMediaQuery } from '@material-ui/core';
import lodashGet from 'lodash/get';
import {useData} from "../../context/Data"
import {useAuth} from "../../context/Auth"
import AddRequestButton from '../buttons/AddRequestButton'
export const DRAWER_WIDTH = 240;
export const CLOSED_DRAWER_WIDTH = 55;

const useStyles = makeStyles(
    theme => ({
        paper:{
            position: 'relative',
            height: 'auto',
            overflowX: 'hidden',
            width: props =>
                props.open
                    ? lodashGet(theme, 'sidebar.width', DRAWER_WIDTH)
                    : lodashGet(
                    theme,
                    'sidebar.closedWidth',
                    CLOSED_DRAWER_WIDTH
                    ),
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        drawerPaper: {
            position: '-webkit-sticky',
            height: '100lv',
            overflowX: 'hidden',
            width: props =>
                props.open
                    ? lodashGet(theme, 'sidebar.width', DRAWER_WIDTH)
                    : lodashGet(
                    theme,
                    'sidebar.closedWidth',
                    CLOSED_DRAWER_WIDTH
                    ),
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            backgroundColor: theme.palette.primary.main,
            paddingTop: '4em',
            marginTop: '0.5em',
            marginRight: '1em',
            borderRight: 'none',
            [theme.breakpoints.only('xs')]: {
                marginTop: 0,
                height: '100vh',
                position: 'inherit',
                backgroundColor: theme.palette.background.default,
            },
            [theme.breakpoints.up('md')]: {
                border: 'none',
                marginTop: '1.5em',
            },
            zIndex: '55',
        },
    }),
    { name: 'Sidebar' }
);

const Sidebar = props => {
    const {
        children,
        closedSize,
        size,
        classes: classesOverride,
        ...rest
    } = props;
    const { selectors, actions } = useData()
    const { signedIn } = useAuth()
    const { sidebarOpen: open } = selectors
    const { setSidebar: setSidebarVisibility } = actions

//    const dispatch = useDispatch();
    const isXSmall = useMediaQuery(theme => theme.breakpoints.down('xs'));
//    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
//    const open = useSelector(state => state.admin.ui.sidebarOpen);
//    useSelector(state => state.locale); // force redraw on locale change
    const handleClose = () => setSidebarVisibility(false);
    const toggleSidebar = () => setSidebarVisibility(!open);
    const classes = useStyles({ ...props, open });

    return isXSmall ? (
        <Drawer
            variant="temporary"
            open={open}
            PaperProps={{
                className: classes.drawerPaper,
            }}
            onClose={toggleSidebar}
            {...rest}
        >
            {cloneElement(Children.only(children), {
                onMenuClick: handleClose,
            })}
        </Drawer>
    ) :  (<>
            <div className={classes.paper}>
            </div>
        <Drawer
            variant="permanent"
            open={open}
            PaperProps={{
                className: classes.drawerPaper,
            }}
            onClose={toggleSidebar}
            {...rest}
        >
            <AddRequestButton onClick={actions.newMessageDialogOpen} disabled={!signedIn}/>
            {children}
        </Drawer>
        </>
    );
};


export default Sidebar;
