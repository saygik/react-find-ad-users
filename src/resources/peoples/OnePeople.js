import React, {useEffect,useState, useMemo} from 'react'
import {ListTitle, LoadingIndicator} from "../../components/layout"

import api from "../../api"
import UserCard from "../../components/UserCards/Card"
import PeopleAlerts from './PeopleAlerts'
import {makeStyles} from "@material-ui/core/styles"


const useStyles = makeStyles(theme => ({
    root: {
        display:'flex'
    },
    card: {
        flex: '1 1 auto'
    }
}));

const emptyUser=
    {
        "userPrincipalName":null,
        "dn": null,
        "cn": null,
        "company": null,
        "department": null,
        "title": null,
        "telephoneNumber": null,
        "mail": null,
        "msRTCSIP-PrimaryUserAddress": null,
        "url": [],
        "presence": null,
        "availability": {
            "presence": "Не определено",
        },
    }

const OnePeople = (props) => {
    const classes = useStyles();
    const [user,setUser]=useState(emptyUser)
    const [userAlerts,setUserAlerts]=useState([])
    const [refreshAlerts ,setRefreshAlerts]=useState(false)

    const [loaded ,setLoaded]=useState(false)

    const userPN=props.match.params.id

        //getOneUserCurrentAlerts
    const userWithAlerts=useMemo(()=>{

        return {...user, alerts:userAlerts}
    },[user,userAlerts])

    const handleRefreshAlerts=()=>setRefreshAlerts(true)

    useEffect( ()=>{
            const fetchData= async ()=> {
                const newUser = await api.getOneUser(userPN)
                setUser(newUser)
                setLoaded(true)
                setRefreshAlerts(true)
            }
            userPN && fetchData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ,[])
    useEffect( ()=>{
            const fetchData= async ()=> {
                setRefreshAlerts(false)
                const newUserAlerts = await api.getOneUserCurrentAlerts(userPN)
                setUserAlerts(newUserAlerts)
            }
            userPN && refreshAlerts && fetchData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ,[refreshAlerts])


     return (
        <>
            <ListTitle
                title={loaded ? user.cn: <LoadingIndicator loading={true} />}
            />
            {loaded &&
            <div className={classes.root}>
                <div className={classes.card}>
                    <UserCard user={userWithAlerts}/>
                </div>
                <PeopleAlerts userPN={userPN} refreshCurrentAlerts={handleRefreshAlerts}/>
            </div>
            }
        </>
    )
}
export default OnePeople
