import React, {
    createElement,
} from 'react';
import classnames from 'classnames';
import { makeStyles, ThemeProvider,createMuiTheme} from '@material-ui/core/styles'
import Bar from "./Bar"
import DefaultSidebar from './Sidebar';
import DefaultMenu from './Menu';
import {NewMessageDialog, MessageDialog, NewTemplateDialog} from "../dialogs"


const useStyles = makeStyles(theme => ({
        root: {
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1,
            minHeight: '100vh',
//            color:theme.palette.grey[700],
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
        },
    }))
let theme = createMuiTheme({
    palette: {
        primary: {
            light: '#63ccff',
            main: '#375479',
            dark: '#3b516d',
        },
        secondary: {
            light: '#fff',
            main: '#c7d6e0',
            dark: '#707070'
        },
    },
    typography: {
        h5: {
            fontWeight: 500,
            fontSize: 26,
            letterSpacing: 0.5,
        },
        caption: {
            fontSize: 18,
            letterSpacing: 0.9,
            fontWeight: 500,
        }
    },
    shape: {
        borderRadius: 8,
    },
    props: {
        MuiTab: {
            disableRipple: true,
        },
    },
    mixins: {
        toolbar: {
            minHeight: 48,
        },
    },
});

theme = {
    ...theme,
    overrides: {
        MuiDrawer: {
            paper: {
                backgroundColor: '#18202c',
            },
        },
        MuiButton: {
            label: {
                textTransform: 'none',
            },
            contained: {
                boxShadow: 'none',
                '&:active': {
                    boxShadow: 'none',
                },
            },
        },
        MuiTabs: {
            root: {
                marginLeft: theme.spacing(1),
            },
            indicator: {
                height: 3,
                borderTopLeftRadius: 3,
                borderTopRightRadius: 3,
                backgroundColor: theme.palette.common.white,
            },
        },
        MuiTab: {
            root: {
                textTransform: 'none',
                margin: '0 16px',
                minWidth: 0,
                padding: 0,
                [theme.breakpoints.up('md')]: {
                    padding: 0,
                    minWidth: 0,
                },
            },
        },
        MuiIconButton: {
            root: {
                padding: theme.spacing(1),
            },
        },
        MuiTooltip: {
            tooltip: {
                borderRadius: 4,
            },
        },
        MuiDivider: {
            root: {
                backgroundColor: '#b9bcc3',
            },
        },
        MuiListItemText: {
            primary: {
                fontWeight: theme.typography.fontWeightMedium,
            },
        },
        MuiListItemIcon: {
            root: {
                color: 'inherit',
                marginRight: 0,
                '& svg': {
                    fontSize: 20,
                },
            },
        },
        MuiAvatar: {
            root: {
                width: 40,
                height: 40,
            },
        },
        MuiCardHeader: {
            avatar:{
                paddingTop:'10px'
            }
        }
    },
};


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
        <ThemeProvider theme={theme}>
            <div className={classnames('layout', classes.root, className)} >
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
            <NewMessageDialog/>
            <MessageDialog/>
            <NewTemplateDialog/>
        </ThemeProvider>
    );
}
Layout.defaultProps = {
    sidebar: DefaultSidebar,
    menu: DefaultMenu,
};


export default Layout
