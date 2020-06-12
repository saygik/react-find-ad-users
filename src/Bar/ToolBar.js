import React from 'react'
import Box from "@material-ui/core/Box"
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { makeStyles, withStyles} from "@material-ui/core/styles"
import {blueGrey} from "@material-ui/core/colors"
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



const StyledButton = withStyles({
    root: {
        color: "#fff",
        marginRight: "30px"
    },
})(Button);

const BarToolBar = (props) => {
    const classes = useStyles();
    const {signedIn,searchTypeLabel, actions, dataActions, user, enqueueSnackbar}= props

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const [anchorRef, setAnchorRef] = React.useState(null);
    const openSelect = Boolean(anchorRef);



    const handleMenu=(event)=>
        setAnchorEl(event.currentTarget);
    const handleClose=()=>
        setAnchorEl(null);

    const handleUserSettings = () => {
        setAnchorEl(null);
        actions.signOut()
//        enqueueSnackbar(`Вы успешно вышли из программы.` , { variant: 'info' })
    }
    const handleLogout = () => {
        setAnchorEl(null);
        actions.signOut()
        enqueueSnackbar(`Вы успешно вышли из программы.` , { variant: 'info' })
    }
    const handleSignIn = () => {
        setAnchorEl(null);
        actions.signIn()
    }




    const handleMenuSelect = (event) => {
        setAnchorRef(event.currentTarget);
    };
    const handlePeoples = () => {
        setAnchorRef(null);
        dataActions.setSerachType('peoples')
    }
    const handleSoft = () => {
        setAnchorRef(null);
        dataActions.setSerachType('soft')
    }
    const handleCloseSelect = (event) => {
        setAnchorRef(null);
    };


    return <>
        <Toolbar >
            {/*<MenuAppDrawer />*/}
            <Box letterSpacing={3} className={classes.title}>
                СПРАВКА НОД-2
            </Box>
            <StyledButton
                ref={anchorRef}
                aria-controls={openSelect ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleMenuSelect}
                endIcon={<ExpandMoreIcon />}
            >
                <Box letterSpacing={2} >
                    {searchTypeLabel}
                </Box>
            </StyledButton>
            <Menu
                id="menu-appbar-select"
                anchorEl={anchorRef}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                open={openSelect}
                onClose={handleCloseSelect}
            >
                <MenuItem onClick={handlePeoples}>Люди</MenuItem>
                <MenuItem onClick={handleSoft}>Сервисы ИВЦ</MenuItem>
            </Menu>

            {signedIn && (
                <>

                    <IconButton
                        aria-owns={open ? 'menu-appbar' : undefined}
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem >{user.name}</MenuItem>
                        <Divider />
                        <MenuItem onClick={handleUserSettings }>Настройки</MenuItem>
                        <MenuItem onClick={handleLogout}>Выйти</MenuItem>
                    </Menu>
                </>
            )}
            {!signedIn && (
                <IconButton aria-label="delete" onClick={handleSignIn} className={classes.mainMenuButton}>
                    <ExitToAppIcon className={classes.mainMenuIcon} />
                </IconButton>
            )}

        </Toolbar>
    </>
}


const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
    },
    rootGrid: {
        marginRight:'5px',
        [theme.breakpoints.up('sm')]: {
            marginRight:'40px'
        },
    },
    box: {
        width:'100%',
        marginBottom:'10px',
        position: 'relative',
        alignSelf: 'flex-start',
        alignContent:'left'
    },
    title: {
        flexGrow: 1,
        fontSize:'1.3rem',
        [theme.breakpoints.down('xs')]: {
            visibility:'hidden'
        },
    },
    badge:{
        backgroundColor:'#22ee09',
        fontSize:'18px',
        color: '#fff',
        height: '30px',
        width: '40px',
    },
    loader:{
        position: 'absolute',
        left: '0px',
    },
    badgeBox: {
        margin:'5px',
        position: 'absolute',
        right: theme.spacing(2),
        top: theme.spacing(0),
        color:'#d9d9d9',
        fontSize:'28px',
        fontWeight:'bold',
        padding:0,
        "&:hover": {
            color:'#ffffff',
            backgroundColor: "transparent"
        }
    },
    mainMenuButton:{
        color:'#d9d9d9',
        padding:0,
        "&:hover": {
            color:'#ffffff',
            backgroundColor: "transparent"
        }
    },
    count: {
        color: blueGrey[200],
        fontSize:'.9rem',
        paddingLeft:'18px'
    },
}));
export default BarToolBar
