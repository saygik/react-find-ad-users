import React from 'react'
import {
    AppBar ,
    IconButton,
    Toolbar,
    Tooltip,
    Typography,
    makeStyles,
    useMediaQuery,
    Box
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames';
import {useData} from "../../context/Data"
import {useAuth} from '../../context/Auth'
import {LoadingIndicator, UserMenu} from "./"
import {LoginButton} from "../buttons"

const useStyles = makeStyles(theme => ({
    root: {
        marginBottom:'5px'

    },
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    titleCaption: {
        flexGrow: 1,
        fontSize:'1.2rem',
        fontWeight:'700',
        // [theme.breakpoints.down('xs')]: {
        //     visibility:'hidden',
        //     width:'50px'
        // },
    },
    toolbar: {
        paddingRight: 24,
    },
    menuButton: {
        marginLeft: '0.5em',
        marginRight: '0.5em',
    },
    menuButtonIconClosed: {
        transition: theme.transitions.create(['transform'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        transform: 'rotate(0deg)',
    },
    menuButtonIconOpen: {
        transition: theme.transitions.create(['transform'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        transform: 'rotate(180deg)',
    },

}));

// const FilterProgress = withStyles({
//     colorPrimary: {
//         backgroundColor: '#3243a0',
//     },
//     barColorPrimary: {
//         backgroundColor: '#b2dfdb',
//     },
// })(LinearProgress);

function MenuAppBarContainer() {
    const classes = useStyles();
    const {signedIn}= useAuth()
    const { selectors: {loading, sidebarOpen: open}, actions } = useData()


    // const [expanded, setExpanded] = React.useState(false)
    const isXSmall = useMediaQuery(theme => theme.breakpoints.down('xs'));
    return <div className={classes.root}>
        <AppBar position="fixed"      >
            <Toolbar
                disableGutters
                variant={isXSmall ? 'regular' : 'dense'}
                className={classes.toolbar}
            >
                <Tooltip
                    title={
                        open
                            ? 'Закрыть меню'
                            : 'Открыть меню'
                    }
                    enterDelay={500}
                >
                    <IconButton
                        color="inherit"
                        onClick={() => actions.setSidebar(!open)}
                        className={classNames(classes.menuButton)}
                    >
                        <MenuIcon
                            classes={{
                                root: open
                                    ? classes.menuButtonIconOpen
                                    : classes.menuButtonIconClosed,
                            }}
                        />
                    </IconButton>
                </Tooltip>
                <Typography
                    variant="h6"
                    color="inherit"
                    className={classes.title}
                    id="react-adusers-title"
                />
                {/*<MenuAppDrawer />*/}
                <Box letterSpacing={3} className={classes.titleCaption}>
                    СПРАВКА НОД-2
                </Box>

                <LoadingIndicator loading={loading} />
                {signedIn ? <UserMenu/> : <LoginButton/> }
            </Toolbar>
            {/*<FilterProgress value={0} variant={loading ? 'indeterminate' : 'determinate'}*/}
            {/*                style={{marginTop: '2px', height: 3}}/>*/}
            {/*<FilterBar expanded={expanded} setExpanded={setExpanded}/>*/}
        </AppBar>

    </div>
}


export default MenuAppBarContainer


