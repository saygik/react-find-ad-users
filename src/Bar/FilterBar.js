import React from 'react'
import Box from "@material-ui/core/Box"
import {makeStyles} from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import SearchInput from "./SearchInput"
import Collapse from "@material-ui/core/Collapse/Collapse"
import {FindSettingsPanel} from "./Panels"
import {useData} from "../context/Data"
import CountUp from "react-countup"

const FilterBar = (props) => {
    const classes = useStyles();
    const {
        serachType,
        setSerachType,
        loading,
        searchValue,
        sortState,
        setSortState,
        handleSearch,
        handleClear,
        expanded,
        handleExpandClick,
        adFiltredUsers,
        filtredSoft,
        isCurrentListUsers
    }=props
    return <Box className={classes.root}>

        <Grid container justify="center"  >
            <Grid  item  xs={12} sm={8} >
            <Grid container
                  spacing={0}
                  direction="row"
                  justify="flex-start"
                  alignItems="flex-start"
                  className={classes.filterContainer}>

                <Grid item xs={12} >
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
                                count={isCurrentListUsers ? adFiltredUsers.length: filtredSoft.length}
                            />
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <FindSettingsPanel sortState={sortState} setSortState={setSortState}/>
            </Collapse>
            </Grid>
        </Grid>
        <Box  className={classes.badgeBox}>
            <CountUp end={isCurrentListUsers ? adFiltredUsers.length: filtredSoft.length} />
        </Box>
    </Box>
}

const FilterBarContainer = (props) => {
    const {selectors, actions } = useData()
    const { loading, searchValue, serachType, sortState, adFiltredUsers, filtredSoft, isCurrentListUsers } = selectors
    const { setSearchValue, setSerachType, setSortState } = actions

    const {expanded, setExpanded} = props
    const handleExpandClick = () => setExpanded(!expanded)

    const handleClear = () =>  setSearchValue('')
    const handleSearch=(e)=>setSearchValue(e.target.value)
    return <FilterBar
        serachType={serachType}
        setSerachType={setSerachType}
        loading={loading}
        searchValue={searchValue}
        sortState={sortState}
        setSortState={setSortState}
        expanded={expanded}
        handleExpandClick={handleExpandClick}
        handleClear={handleClear}
        handleSearch={handleSearch}
        adFiltredUsers={adFiltredUsers}
        filtredSoft={filtredSoft}
        isCurrentListUsers={isCurrentListUsers}
/>
}

const useStyles = makeStyles(theme => ({
    root: {
        width:'100%',
        backgroundColor: '#3243a0',
        position: 'relative'

    },
    rootGrid: {
        marginRight:'5px',
        [theme.breakpoints.up('sm')]: {
            marginRight:'40px'
        },
    },
    filterContainer: {
        padding:'7px',

    },
    badgeBox: {
        margin:'5px',
        position: 'absolute',
        right: theme.spacing(2),
        top: theme.spacing(0),
        color:'#d9d9d9',
        fontSize:'26px',
        fontWeight:'bold',
        padding:0,
        [theme.breakpoints.down('xs')]: {
            display:'none'
            // fontSize:'22px',
            // right: theme.spacing(1),
            // marginTop:'48px',
        },
        "&:hover": {
            color:'#ffffff',
            backgroundColor: "transparent"
        }
    },
}));



export default FilterBarContainer
