import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from "@material-ui/core/Toolbar"
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import SearchIcon from '@material-ui/icons/Search';
import InputBase from "@material-ui/core/InputBase"
import {fade, makeStyles} from "@material-ui/core/styles"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import { SwitchPanel, FindSettingsPanel} from "./Panels"
import {blueGrey} from "@material-ui/core/colors"
import CountUp from 'react-countup';

const Bar = (props) => {
    const {searchValue, handleSearch, count,sortState, setSortState,
           expanded, setExpanded, loading, serachType, setSerachType, countUsers, countSoft}=props
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
                        <Grid item xs={2} className={classes.box}>
                            <Typography className={classes.title} variant="h6" noWrap>
                                Барановичское отделение
                            </Typography>
                            <Box className={classes.count} >всего {countUsers} человек</Box>
                            <Box className={classes.count} >всего {countSoft} программ и сервисов</Box>
                        </Grid>
                        <Grid item xs={8}>
                            <Grid container
                                  spacing={0}
                                  direction="row"
                                  justify="flex-start"
                                  alignItems="flex-start"
                                  style={{width:'100%',marginTop:'0px',}}>
                                <Grid  item xs={3}>
                                    <SwitchPanel serachType={serachType} setSerachType={setSerachType}
                                    />
                                </Grid>
                                <Grid  item xs={9}>
                                    <div className={classes.search}>
                                        <div className={classes.searchIcon}>
                                            <SearchIcon />
                                        </div>
                                        <InputBase
                                            placeholder={serachType==='peoples'
                                                                    ? "Поиск по имени, предприятию, должности..."
                                                                    : "Поиск по наименованию программы или сервиса..."}
                                            classes={{
                                                root: classes.inputRoot,
                                                input: classes.inputInput,
                                            }}
                                            inputProps={{ 'aria-label': 'search', readOnly: loading,}}
                                            value={searchValue}
                                            onChange={handleSearch}
                                        />

                                    </div>
                                    <div className={classes.grow} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={2} className={classes.box} >
                            {serachType === 'peoples' && <IconButton
                                className={classes.expand}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                                size="small"
                            >
                                настройки {expanded ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                            </IconButton>
                            }
                        </Grid>
                    </Grid>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <FindSettingsPanel sortState={sortState} setSortState={setSortState}/>
                    </Collapse>
                </Grid>
            </Toolbar>
            <Box  className={classes.badgeBox}>
                {/*<FlipNumbers*/}
                {/*    play*/}
                {/*    color="#fff"*/}
                {/*    background="#3f51b5"*/}
                {/*    width={15}*/}
                {/*    height={25}*/}
                {/*    numbers={`${count}`}*/}
                {/*/>*/}
                <CountUp end={count} />
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
    expand: {
        color:'#d9d9d9',
        marginLeft:'15px',
        "&:hover": {
            color:'#ffffff',
            backgroundColor: "transparent"
        }
    },
    count: {
        color: blueGrey[200],
        fontSize:'.9rem',
    },
}));

export default Bar


