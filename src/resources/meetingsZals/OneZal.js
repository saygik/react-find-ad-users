import React, {useEffect, useMemo, useState} from 'react'
import {useData} from "../../context/Data"
import {
    ListTitle,
    UserListItemText,
    LoadingIndicator,
    ListItems,
} from "../../components/layout"
import {makeStyles} from "@material-ui/core/styles"
import moment from 'moment'

const useStyles = makeStyles(theme => ({
    searchResult: {
        marginRight: theme.spacing(2),
    },
    cardsGrid: {
        marginTop: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            marginTop: theme.spacing(8),
        },
    },
    loader: {
        margin:0,
    },

}));


const OneZal = (props) => {
    const classes = useStyles();
    const {
        selectors: { oneZal},
        actions: {refreshData},
        resourceTypes,
        setCurrentResource
    } = useData()
    const [requestData, setRequestData] = useState(false)
    const currentId=useMemo(()=>props.match.params.id
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ,[])

    useEffect(()=> {
        setCurrentResource(resourceTypes.ONEZAL,{id:props.match.params.id})
        let timer1 = setInterval(() => setRequestData(true), 5000)
        return () => {
            console.log('-clear onezal-',)
            refreshData()
            clearInterval(timer1)
        }},
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [])
    useEffect(()=> {
        if (!requestData) return
            setRequestData(false)
            if (!oneZal.loading) setCurrentResource(resourceTypes.ONEZAL,{id:currentId})
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [requestData])

    const title=useMemo(()=>{
        if (oneZal.loading && oneZal.firstloading) return <LoadingIndicator loading={true} className={classes.loader}/>
        if (oneZal.data.length>0) return oneZal.data[0].title
        return 'Зал совещаний пуст'
        // eslint-disable-next-line react-hooks/exhaustive-deps
     },[oneZal.data,oneZal.loading])

    const primaryText=(item)=> <UserListItemText
        user={
                {
                    name:item.displayname,
                    mail:item.username,
                    company:item.company,
                    department:item.department,
                    title: item.dolg
                }
            }
    />
    const secondaryText=item=>`подключился в ${moment(item.jointime).format('HH:mm:ss')}`
    const leftAvatar=(item)=> item.npp
//    console.log(oneZal.loading)
    return (
        <div>
            <ListTitle
                title={title}
                count= {
                    oneZal.data.length>0
                        ? `участников: ${oneZal.data.length}`
                        : ``
                }
            />
            <ListItems
                classAvatarName={classes.avatar}
                data={oneZal.data}
                leftAvatar={leftAvatar}
                primaryText={primaryText}
                secondaryText={secondaryText}
            />
        </div>
    )
}
export default OneZal
