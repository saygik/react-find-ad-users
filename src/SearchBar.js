import React, {useEffect, useState, useMemo} from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import _ from 'lodash'
import api from './api'
import UserCards from './UserCard'
import SoftCards from './SoftCards'
import Bar from './Bar'
import LinearProgress from '@material-ui/core/LinearProgress';
import NotFound from './NotFound'

import UserPropsDialog from './UserProps'


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    searchResult: {
        marginRight: theme.spacing(2),
    },
    cardsGrid: {
        marginTop: theme.spacing(4),
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
    const [searching,setSearching]=useState(false)              //Поиск
    const [serachType, setSerachType] = React.useState('peoples'); //Тип поиска (люди-программы)
    const [loading,setLoading]=useState(false)                  //Загрузка
    const [searchValue,setSearchValue]=useState('')             //Значение в поле поиска
    const [adUsers,setAdUsers]=useState([])                     //Все пользователи домена brnv.rw
    const [software,setSoftware]=useState([])                   //Все программы на обслуживании ИВЦ
    const [adFiltredUsers,setAdFiltredUsers]=useState([])       //Отфильтрованные пользователи
    const [filtredSoft,setFiltredSoft]=useState([])             //Отфильтрованный софт

    const [expanded, setExpanded] = React.useState(false);
    const [sortState, setSortState] = React.useState({          //Настройки сортировки
        company: true,
        department: true,
        cn: true,
        skype: false,
        phone: false
    });
    const sortFields=useMemo(()=>Object.entries(sortState).filter(prop=>prop[1]).map(prop=>prop[0]),[sortState])
    const [timeout,setNewTimeout]=useState(0)                 //Задержка фильтра при наборе текста

    const searchValues=useMemo(()=>{
        return searchValue.split(' ')
    },[searchValue])


    const isUsers=useMemo(()=>serachType==='peoples',[serachType])

    const countRecords=useMemo(()=>{
        return isUsers ? adFiltredUsers.length:filtredSoft.length
    },[adFiltredUsers,filtredSoft])

    const handleSearch=(e)=>setSearchValue(e.target.value)

    const search=()=>{

        let filtredUsers={...adUsers}
        let filtredSoft={...software}
        if (searchValues[0]!=='*') {
            _.forEach(searchValues, searchValue => {
                filtredUsers = _.filter(filtredUsers, user => {
                        return _.includes(user.cn.toUpperCase(), searchValue.toUpperCase())
                            || (user.title && _.includes(user.title.toUpperCase(), searchValue.toUpperCase()))
                            || (user.company && _.includes(user.company.toUpperCase(), searchValue.toUpperCase()))
                            || (user.department && _.includes(user.department.toUpperCase(), searchValue.toUpperCase()))
                            || (user.url && _.includes(user.url.toUpperCase(), searchValue.toUpperCase()))
                            || (user.mail && _.includes(user.mail.toLowerCase(), searchValue.toLowerCase()))
                            || (user.telephoneNumber && _.includes(user.telephoneNumber.toUpperCase(), searchValue.toUpperCase()))
                    }
                )
            })
            filtredSoft = _.filter(filtredSoft, soft => _.includes(soft.title.toUpperCase(), searchValue.toUpperCase()))
        }
        if (sortState.skype) {
            filtredUsers = _.filter(filtredUsers, user => user.sip && user.sip.length>3)
        }
        if (sortState.phone) {
            filtredUsers = _.filter(filtredUsers, user => user.telephoneNumber && user.telephoneNumber.length>3)
        }

        const sortedUsers = _.sortBy(filtredUsers, sortFields)
        setFiltredSoft(_.sortBy(filtredSoft, 'title'))
        setAdFiltredUsers(sortedUsers)
        setSearching(false)
    }

const SearchWithTimeout=()=>{

    if(timeout) clearTimeout(timeout);
    const newTimeout = setTimeout(() => {
        search()
    }, 300);
    setNewTimeout(newTimeout)
}

    useEffect(()=>{
        if (searchValues[0].length>1 || searchValues[0]==='*') {
            setSearching(true)
            SearchWithTimeout()
        } else {
            setSearching(false)
            setAdFiltredUsers([])
            setFiltredSoft([])
        }
    },[searchValues, sortFields])

    useEffect( ()=>{
        async function fetchUsers() {
            const res= await api.getAdUser()
            if (res.length>1) setAdUsers(res)
            const soft= await api.getSoftware()
            if (soft.length>1) setSoftware(soft)
            setLoading(false)
        }
        setLoading(true)
        fetchUsers()
        const interval = setInterval(() => {
            setLoading(true)
            fetchUsers()
        }, 300000);

        return () => clearInterval(interval);
    },[])

    const [selectedUser, setSelectedUser] = React.useState({});
    const handleDialogClose = () => {
        setSelectedUser({});
    };
    const findAndSelectUser = (user) => {
        if (!user) return setSelectedUser({});
        const findedUser=adUsers.find(adUser=> adUser.cn===user.name || adUser.mail===user.mail)
        if (findedUser) {
            setSelectedUser(findedUser);
        } else {
            setSelectedUser({});
        }
    };

    return (
        <div className={classes.root}>
            <Bar searchValue={searchValue}
                 handleSearch={handleSearch}
                 count={isUsers ? adFiltredUsers.length: filtredSoft.length}
                 countUsers={adUsers.length}
                 countSoft={software.length}
                 sortState={sortState}
                 setSortState={setSortState}
                 expanded={expanded}
                 setExpanded={setExpanded}
                 loading={loading}
                 serachType={serachType}
                 setSerachType={setSerachType}
            />
            <FilterProgress value={0} variant={loading ? 'indeterminate' : 'determinate'} style={{marginTop: expanded ? 220 : 107, height: 3,}}/>
            <Grid container justify="center" className={classes.cardsGrid}>
                <Grid  item  xs={8} >
                            {countRecords === 0
                                ? <NotFound loading={searching} filtred={searchValues[0].length > 1}/>
                                : isUsers
                                    ? <UserCards
                                        adFiltredUsers={adFiltredUsers}
                                        setSearching={setSearching}
                                        setSelectedUser={setSelectedUser}
                                        searchValues={searchValues}
                                      />
                                    : <SoftCards
                                        software={filtredSoft}
                                        searchValues={searchValues}
                                        setSearching={setSearching}
                                        findAndSelectUser={findAndSelectUser}
                                      />
                            }
                </Grid>
            </Grid>

            <UserPropsDialog selectedValue={selectedUser} onClose={handleDialogClose} />
        </div>
    );
}

export default SearchBar
