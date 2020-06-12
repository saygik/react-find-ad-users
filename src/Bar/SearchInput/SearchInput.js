import React from 'react'
import InputBase from "@material-ui/core/InputBase"
import IconButton from "@material-ui/core/IconButton"
import {fade, makeStyles} from "@material-ui/core/styles"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import Box from "@material-ui/core/Box"
import CountUp from "react-countup"


const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
    },
    root: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.05),
        paddingTop:'3px',
        paddingBottom:'12px',
        marginLeft: 0,
        width: '100%',
        color: '#fff',
    },
    searchRoot: {
        position: 'relative',
        padding: theme.spacing(0, 7, 0, 0),
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.1),
        marginLeft: 0,
        width: '100%',
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
        // [theme.breakpoints.up('sm')]: {
        //     marginLeft: theme.spacing(1),
        //
        // },
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
    settingsIcon: {
        width: theme.spacing(5),
        top:'0px',
        right:'10px',
        height: '100%',
        position: 'absolute',
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
    expand: {
        color:'#d9d9d9',
        marginLeft:'15px',
        "&:hover": {
            color:'#ffffff',
            backgroundColor: "transparent"
        }
    },
    clearIcon: {
        width: theme.spacing(5),
        top:'0px',
        right:'0px',
        height: '100%',
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
            cursor: 'pointer'
        },
    },
    badgeBox: {
        right: theme.spacing(2),
        paddingTop: '12px',
        color:'#d9d9d9',
        fontSize:'20px',
        padding:0,

        [theme.breakpoints.up('xs')]: {
            display:'none'
        },
        [theme.breakpoints.down('xs')]: {
            display:'inline'
        },
        "&:hover": {
            color:'#ffffff',
            backgroundColor: "transparent"
        }
    },
    countBox: {
        paddingTop: '10px',
    },
}));



const SearchInput = (props) => {
    const {serachType,count, loading,searchValue,handleSearch,expanded, handleExpandClick,handleClear}=props
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <div className={classes.searchRoot}>
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
                        inputProps={{ 'aria-label': 'search', readOnly: loading,  }}
                        value={searchValue}
                        onChange={handleSearch}
                    />
                    <div className={classes.clearIcon}>
                                <ClearIcon onClick={handleClear} />
                    </div>

                </div>
                <div className={classes.settingsIcon}>
                    {serachType === 'peoples' && <IconButton
                        className={classes.expand}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        {expanded ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                    </IconButton>
                    }
                </div>
            </div>
            <div className={classes.grow} />
            {/*<SwitchPanel serachType={serachType} setSerachType={setSerachType} />*/}
                <Box display="flex" flexDirection="row-reverse" >
                    <Box className={classes.badgeBox} >
                        <CountUp end={count} />
                    </Box>

            </Box>
        </div>
        )
}
export default SearchInput
