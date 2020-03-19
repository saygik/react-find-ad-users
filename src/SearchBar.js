import React, {useEffect, useState, useMemo} from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import InfiniteScroll from 'react-infinite-scroller';
import _ from 'lodash'
import api from './api'
import UserCard from './UserCard'
import Bar from './Bar'
import LinearProgress from '@material-ui/core/LinearProgress';

let page=0
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    searchResult: {
        marginRight: theme.spacing(2),
    },

}));

const FilterProgress = withStyles({
    colorPrimary: {
        backgroundColor: '#b2dfdb',
    },
    barColorPrimary: {
        backgroundColor: '#00695c',
    },
})(LinearProgress);

const SearchBar=()=>{
    const classes = useStyles();
    const [loading,setLoading]=useState(false)           //Значение в поле поиска
    const [searchValue,setSearchValue]=useState('')           //Значение в поле поиска
    const [adUsers,setAdUsers]=useState([])                   //Все пользователи домена brnv.rw
    const [adFiltredUsers,setAdFiltredUsers]=useState([])     //Отфильтрованные пользователи
    const [adShowedUsers,setAdShowedUsers]=useState([])       //Показанные на экране пользователи
    const [expanded, setExpanded] = React.useState(false);
    const [sortState, setSortState] = React.useState({        //Настройки сортировки
        company: true,
        department: true,
        cn: true,
    });
    const sortFields=useMemo(()=>Object.entries(sortState).filter(prop=>prop[1]).map(prop=>prop[0]),[sortState])
    const [timeout,setNewTimeout]=useState(0)                 //Задержка фильтра при наборе текста

    const searchValues=useMemo(()=>{
        return searchValue.split(' ')
    },[searchValue])

    const getNewUsers=()=>{
        page++;
        const pageStart=page*10-10
        const pageEnd=pageStart+10>adFiltredUsers.length ? adFiltredUsers.length : pageStart+10
        const pageUsers = adFiltredUsers.slice(pageStart, pageEnd);
        setAdShowedUsers(adShowedUsers.concat(pageUsers));

    }
    const handleSearch=(e)=>setSearchValue(e.target.value)

    const searchUsers=()=>{
        setLoading(true)
        let filtredUsers={...adUsers}
        _.forEach(searchValues, searchValue =>{
            filtredUsers=_.filter(filtredUsers, user =>
                _.includes(user.cn.toUpperCase(), searchValue.toUpperCase())
                || (user.title && _.includes(user.title.toUpperCase(), searchValue.toUpperCase()))
                || (user.company && _.includes(user.company.toUpperCase(), searchValue.toUpperCase()))
                || (user.department && _.includes(user.department.toUpperCase(), searchValue.toUpperCase()))
                || (user.telephoneNumber && _.includes(user.telephoneNumber.toUpperCase(), searchValue.toUpperCase()))
                )})

        const sortedUsers = _.sortBy(filtredUsers, sortFields)
        setAdFiltredUsers(sortedUsers)
    }

const SearchUsersWithTimeout=()=>{

    if(timeout) clearTimeout(timeout);
    const newTimeout = setTimeout(() => {
        searchUsers()
    }, 300);
    setNewTimeout(newTimeout)
}



//крап
    useEffect(()=>{
        page=0
        setAdShowedUsers([])
        setLoading(false)
    },[adFiltredUsers])

    useEffect(()=>{
        if (searchValues[0].length>2) {
            SearchUsersWithTimeout()
        } else {
            setAdFiltredUsers([])
        }
    },[searchValues, sortFields])

    useEffect(()=>{
        setLoading(true)
        api.getAdUser().then(res=>{
            setAdUsers(res)
            setLoading(false)
//            setSearchValue('крап')
        })

    },[])

    return (
        <div className={classes.root}>
            <Bar searchValue={searchValue}
                 handleSearch={handleSearch}
                 count={adFiltredUsers.length}
                 sortState={sortState}
                 setSortState={setSortState}
                 expanded={expanded}
                 setExpanded={setExpanded}
            />
            <FilterProgress value={0} variant={loading ? 'indeterminate' : 'determinate'} style={{marginTop: expanded ? 180 : 68, height: 5,}}/>
            <Grid container justify="center">
                <Grid  item  xs={8} >
                {/*{adShowedUsers.map( (user,index)=> <UserCard key={user.objectGUID} user={user} index={index} searchValue={searchValue}/> )}*/}
                <InfiniteScroll
                    pageStart={page}
                    loadMore={getNewUsers}
                    hasMore={adFiltredUsers.length > adShowedUsers.length}
                    threshold={10}
                    useWindow={true}
                >
                    {adShowedUsers.map( (user,index)=> <UserCard key={user.objectGUID} user={user} index={index} searchValue={searchValues}/> )}
                </InfiniteScroll>
                </Grid>
            </Grid>

        </div>
    );
}

export default SearchBar



