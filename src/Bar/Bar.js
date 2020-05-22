import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from "@material-ui/core/Toolbar"
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { makeStyles, withStyles} from "@material-ui/core/styles"
import Collapse from '@material-ui/core/Collapse';
import { FindSettingsPanel} from "./Panels"
import {blueGrey} from "@material-ui/core/colors"
import CountUp from 'react-countup';
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchInput from './SearchInput'

const LittleLoader = withStyles({
    root: {
        color: '#fff',
    },
})(CircularProgress);

const Bar = (props) => {
    const {searchValue, handleSearch, count,sortState, setSortState,handleClear,loadingSettings,
           expanded, setExpanded, loading, serachType, setSerachType, countUsers, countSoft}=props
    const classes = useStyles();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return <>
        <AppBar position="fixed" >
            <Toolbar >
                <Grid container direction="column" spacing={0} className={classes.rootGrid}>
                    <Grid container
                          spacing={0}
                      direction="row"
                      justify="flex-start"
                      alignItems="flex-start"
                      style={{width:'100%',marginTop:'20px'}}>
                        <Grid item xs={10} sm={3} className={classes.box} style = {{minWidth: "280px"}}>
                            <Typography className={classes.title} variant="h6" noWrap >
                                Барановичское отделение
                            </Typography>
                            {loadingSettings.peoples.loading && <LittleLoader size={13} className={classes.loader} style={{top: '37px', }}/>}
                            {loadingSettings.soft.loading && <LittleLoader size={13} className={classes.loader} style={{top: '56px', }}/>}
                            <Box className={classes.count} >
                                {
                                    loadingSettings.peoples.loading
                                    ? `загружено ${loadingSettings.peoples.progress}%`
                                    : `всего ${countUsers} человек`
                                }
                            </Box>
                            <Box className={classes.count} >
                                {
                                    loadingSettings.soft.loading
                                        ? `загружено ${loadingSettings.soft.progress}%`
                                        : `всего ${countSoft} сервисов`
                                }
                            </Box>
                        </Grid>
                        <Grid item sm={7} xs={12} >
                            <Grid container
                                  spacing={0}
                                  direction="row"
                                  justify="flex-start"
                                  alignItems="flex-start"
                                  style={{width:'100%',marginTop:'0px',}}>

                                <Grid  item xs={12}>
                                    <SearchInput
                                        serachType={serachType}
                                        setSerachType={setSerachType}
                                        loading={loading}
                                        searchValue={searchValue}
                                        handleSearch={handleSearch}
                                        expanded={expanded}
                                        handleExpandClick={handleExpandClick}
                                        handleClear={handleClear}
                                    />
                                </Grid>
                            </Grid>
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

        color:'#ccc',
        alignSelf: 'flex-start',
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

    count: {
        color: blueGrey[200],
        fontSize:'.9rem',
        paddingLeft:'18px'
    },
}));

export default Bar


