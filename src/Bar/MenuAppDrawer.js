import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';

//import { useHistory } from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from '@material-ui/icons/Close';
import Grid from "@material-ui/core/Grid"
import PhoneIcon from '@material-ui/icons/Phone';
import {MenuItem, MenuList} from '@material-ui/core'
import ContactPhone from '@material-ui/icons/ContactPhone';
const drawerWidth = 600;
const useStyles = makeStyles(theme => ({
    drawer: {
        width: drawerWidth,
    },
    socialButton:{
        color:'#d9d9d9',
        padding:0,
        "&:hover": {
            color:'#ffffff',
            backgroundColor: "transparent"
        }
    },
    socialIcon:{
        fontSize:'2.5rem',
        margin: theme.spacing(1),
    },
    sideMenu:{
        marginTop: 80,
        marginLeft: 50,
        [theme.breakpoints.down('sm')]: {
            marginLeft: 'auto',
            marginRight: 'auto',
        }
    },
    paper:{
        width: 400,
        background:'rgb(56,56,178)',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        }
    },
    menuItem:{
        textAlign: 'center',
        color:'#ececec',
        fontSize:'1.4rem',
        fontWeight: 400,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color:'#d9d9d9',
        padding:0,
        "&:hover": {
            color:'#ffffff',
            backgroundColor: "transparent"
        }
    },
}));

function MenuAppDrawer() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    // const history = useHistory();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleMain=()=>{
//        history.push("/")
        handleDrawerClose()
    }

    return (
        <div>
            <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
                onClick={handleDrawerOpen}
            >
                <MenuIcon />
            </IconButton>

            <Drawer
                classes={{ paper: classes.paper }}
                width={600}
                anchor="left"
                open={open}
                onClose={handleDrawerClose}
            >
                <>
                    <IconButton aria-label="delete" className={classes.closeButton} onClick={handleDrawerClose}>
                        <CloseIcon />
                    </IconButton>
                    <div className={classes.sideMenu}>
                        <MenuList>
                            <MenuItem onClick={handleMain} >
                                <Box letterSpacing={3} className={classes.menuItem}>
                                    Главная
                                </Box>
                            </MenuItem>
                        </MenuList>
                    </div>

                    <Grid container  direction="row" alignItems="flex-start" style={{height:'100%'}}>
                        <Grid item xs={12}   >
                        </Grid>
                        <Grid item xs={12}   >
                        </Grid>
                        <Grid item  xs={12} >
                            <Grid container  direction="row" justify="center" alignItems="flex-end" style={{height:'100%'}}>
                                <Box mb={2}>
                                    <Typography  variant="h5"  className={classes.menuItem}>
                                        {/*<a href="tel:+48 796349132" style={{textDecoration: "none", color: "#ececec"}}>*/}
                                        {'493660'} <PhoneIcon />
                                        {/*</a>*/}
                                    </Typography>
                                </Box>
                                <Grid container justify="center"  alignItems="center" >
                                    <Typography  variant="h5"  className={classes.menuItem}>
                                        <a href="sip:say@brnv.rw" style={{textDecoration: "none", color: "#ececec"}}>
                                            <IconButton edge="start" className={classes.socialButton} color="inherit" aria-label="menu" onClick={handleDrawerClose}>
                                                <ContactPhone className={classes.socialIcon} />
                                            </IconButton>
                                        </a>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>

                </>
            </Drawer>

        </div>
    );
}

export default MenuAppDrawer;
