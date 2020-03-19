import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from "@material-ui/core/Toolbar"
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import SearchIcon from '@material-ui/icons/Search';
import InputBase from "@material-ui/core/InputBase"
import {fade, makeStyles} from "@material-ui/core/styles"
import Badge from '@material-ui/core/Badge';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import SortPanel from "./Panels/SortPanel"
import Paper from "@material-ui/core/Paper"

const Bar = (props) => {
    const {searchValue, handleSearch, count,sortState, setSortState, expanded, setExpanded}=props
    const classes = useStyles();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return <>
        <AppBar position="fixed">
            <Toolbar >
                <Grid container direction="column" spacing={0}>
                    <Grid container
                          spacing={0}
                      direction="row"
                      justify="flex-start"
                      alignItems="flex-start"
                      style={{width:'100%',marginTop:'20px',}}>
                        <Grid item xs={3} className={classes.box}>
                            <Typography className={classes.title} variant="h6" noWrap>
                                Поиск работников Барановичского отделения
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                            <InputBase
                                placeholder="Поиск по имени, предприятию, должности…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                                value={searchValue}
                                onChange={handleSearch}
                            />
                        </div>
                            <div className={classes.grow} />
                        </Grid>
                        <Grid item xs={1} className={classes.box} >
                            <IconButton
                            className={classes.expand}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                            size="small"
                        >
                            настройки {expanded ? <ExpandLessIcon/> : <ExpandMoreIcon />}
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <Grid container
                                  spacing={0}
                                  direction="row"
                                  justify="flex-end"
                                  alignItems="flex-end"
                                  style={{width:'100%',marginTop:'20px',marginBottom:'10px',}}>
                                <Grid item xs={8} >
                                    <Paper className={classes.paper}>
                                        <SortPanel sortState={sortState} setSortState={setSortState}/>
                                    </Paper>

                                </Grid>
                                <Grid item xs={1} >
                                </Grid>
                            </Grid>
                    </Collapse>
                </Grid>
            </Toolbar>
            <Box  className={classes.badgeBox}>
                <Badge badgeContent={count} max={999}  classes={{ badge: classes.badge }} >

                </Badge>
            </Box>
        </AppBar>
    </>
}

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
    },
    box: {
        width:'100%',
        marginBottom:'10px',
        position: 'relative',
        alignSelf: 'flex-start',
        alignContent:'left'
    },
    title: {
        display: 'none',
        color:'#ccc',
        alignSelf: 'flex-start',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),

        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: 'inherit'
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',

    },
    badge:{
        backgroundColor:'#22ee09',
        fontSize:'18px',
        color: '#fff',
        height: '30px',
        width: '40px',
    },
    badgeBox: {
        margin:'5px',
        position: 'absolute',
        right: theme.spacing(4),
        top: theme.spacing(1),
        color:'#d9d9d9',
        padding:0,
        "&:hover": {
            color:'#ffffff',
            backgroundColor: "transparent"
        }
    },
    expand: {
        color:'#d9d9d9',
        marginLeft:'15px',
        "&:hover": {
            color:'#ffffff',
            backgroundColor: "transparent"
        }
    },
    paper: {
        backgroundColor:theme.palette.background.default,
        padding: '5px',
        paddingLeft: '15px',
        paddingBottom: '1px',
        marginTop: '-15px',
        width: '100%',
    },
}));

export default Bar


