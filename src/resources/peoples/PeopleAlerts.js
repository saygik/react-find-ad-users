import React, {useEffect, useState} from 'react'
import { Ellipsis } from 'react-spinners-css';

import {
    Tooltip,
    Typography,
    Card,
    CardContent,
    CardHeader,
    CardActions,
    Avatar,
    IconButton,
    Box,
} from '@material-ui/core';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ContentCreate from '@material-ui/icons/Create';
import ReviewIcon from '@material-ui/icons/Comment';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
// import order from '../orders';
// import review from '../reviews';
import { makeStyles, withStyles} from '@material-ui/core/styles';
import classnames from "classnames"
import api from "../../api"
import {today} from '../../services'
import {useAuth} from "../../context/Auth"


const ColorButton = withStyles((theme) => ({
    root: {
        color:'#fff',
        backgroundColor: '#3f51b5',
        '&:hover': {
            backgroundColor: '#5168f4',
        },
    },
}))(IconButton);

const useAsideStyles = makeStyles(theme => ({
    root: {
        minWidth: 400,
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
}));

const useStyles = makeStyles(theme => ({
    root:{
        margin: '0 0 1em 1em'
    },
    header:{
        color:'#757575'
    },
    calendar: {
        position: 'absolute',
        marginTop: '2px',
        width: '350px',
        maxWidth: '100vw',
        zIndex: '51',
        borderRadius: '1px',
    },
    calendarContainer:{
        fontSize: '16px',

    },
    text: {
        marginTop:'40px',
        width: '100%',
    },
    loaderContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // color:'#5d6666'
    },
    cardactions:{
        justifyContent: 'flex-end'
    },
    cardactionsadd:{
        margin: '0 15px 10px'
    }
}));


const PeopleAlerts = ({ userPN, refreshCurrentAlerts }) => {
    const {user, signedIn}= useAuth()
    const isAdmin=!signedIn ? false : user.admin || user.email===userPN
    const classes = useAsideStyles();
    const [userAlerts,setUserAlerts]=useState([])
    const [loadAlerts ,setLoadAlerts]=useState(false)
    const [refreshAlerts ,setRefreshAlerts]=useState(false)
    const handleDelete=async(id)=>{
        // const res=await api.delAlert(id)
        // console.log('-res-',res)
        setLoadAlerts(true)
        if (await api.delAlert(id)) {
            setRefreshAlerts(true)
            refreshCurrentAlerts()
        } else setLoadAlerts(false)

    }
    const handleAddAlert=async (alert)=>{
        const newAlert={...alert,email:userPN,}
        if (await api.addAlert(newAlert)) {
            setRefreshAlerts(true)
            refreshCurrentAlerts()
        }
    }
    useEffect( ()=> setRefreshAlerts(true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ,[])
    useEffect( ()=>{
            const fetchData= async ()=> {
                setRefreshAlerts(false)
                setLoadAlerts(true)
                const newUserAlerts = await api.getOneUserAlerts(userPN)
                setLoadAlerts(false)
                setUserAlerts(newUserAlerts)
            }
            userPN && refreshAlerts && fetchData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ,[refreshAlerts])
    return (
        <div className={classes.root}>
            { <AlertList alerts={userAlerts}
                         allowEdit={isAdmin}
                         loadAlerts={loadAlerts}
                         addAlert={handleAddAlert}
                         delAlert={handleDelete} />}
        </div>
    );
};



const AlertList = ({ alerts, loadAlerts, addAlert, delAlert, allowEdit }) => {
    const [valueDate, onChange] = useState([today, today]);
    const [value, setValue] = React.useState('');
    const classes = useStyles();

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const handleDelete=(id)=>delAlert(id)
    const handleAdd=()=>addAlert({
        from:valueDate[0],
        to:valueDate[1],
        title:value
    })
    return ( (alerts.length>0 || allowEdit) &&
        <>
            <Box className={classes.root}>
                <Card>
                    <CardContent>
                        <Box className={classes.header}>
                            <Typography variant="h6" gutterBottom >
                                Предупреждения пользователя
                            </Typography>
                        </Box>
                        {allowEdit &&
                            <>
                                <Box className={classes.calendarContainer}>
                                    <Box className={classes.header}>
                                        <Typography variant="caption" gutterBottom>
                                            период
                                        </Typography>
                                    </Box>
                                    <DateRangePicker
                                        onChange={onChange}
                                        value={valueDate}
                                        className={classnames(classes.calendar)}
                                        calendarIcon={<InsertInvitationIcon style={{ color:'#757575' }}/>}
                                        clearIcon={<CloseIcon style={{ color:'#757575' }}/>}
                                    />
                                </Box>

                                <Box display="flex">
                                    <TextField
                                        id="standard-multiline-flexible"
                                        label="Предепреждение пользователя"
                                        className={classes.text}
                                        multiline
                                        rowsMax={4}
                                        value={value}
                                        onChange={handleChange}
                                    />
                                </Box>

                            </>
                        }
                    </CardContent>
                    {allowEdit &&
                    <CardActions disableSpacing className={classes.cardactions}>
                        <ColorButton aria-label="добавить" onClick={handleAdd} className={classes.cardactionsadd} >
                            <AddIcon />
                        </ColorButton>

                    </CardActions>

                    }
                </Card>
            </Box>
            <Box className={classes.loaderContainer}>
                {loadAlerts
                    ?<Ellipsis color="#5d6666" size={60}/>
                    :<Box style={{height:'60px'}} />
                }
            </Box>
            {alerts.map(alert =>
                    <Review
                        record={alert}
                        key={`review_${alert.id}`}
                        handleDelete={handleDelete}
                        allowEdit={allowEdit}
                    />
            )}
        </>
    );
};



const useEventStyles = makeStyles({
    card: {
        margin: '0 0 1em 1em',
    },
    cardHeader: {
        alignItems: 'flex-start',
    },
    clamp: {
        fontSize:'1rem',
        color:'#17b506',
        display: '-webkit-box',
        '-webkit-line-clamp': 3,
        '-webkit-box-orient': 'vertical',
        overflow: 'hidden',
    },
});


const Review = ({ record, handleDelete, allowEdit }) => {
    const classes = useEventStyles();
    return record ? (
        <Card className={classes.card}>
            <CardHeader
                className={classes.cardHeader}
                avatar={
                    <Avatar
                        aria-label={'resources.reviews.name'}
                    >
                        <ReviewIcon />
                    </Avatar>
                }
                action={allowEdit && <DeleteButton record={record} handleDelete={handleDelete}/>}
                // title={
                //     <span>
                //         {'resources.reviews.relative_to_poster'}
                //
                //     </span>
                // }
                subheader={
                    <>
                        <Typography variant="caption">{record.description}</Typography>
                        <Typography variant="body2" className={classes.clamp}>
                            {record.title}
                        </Typography>
                    </>
                }
            />

        </Card>
    ) : null;
};


const DeleteButton= ({record, handleDelete }) => {
    return (
        <Tooltip title={'Удалить предупреждение'}>
            <IconButton
                aria-label={'Удалить предупреждение'}
                onClick={()=>handleDelete(record.id)}
            >
                <DeleteForeverIcon />
            </IconButton>
        </Tooltip>
    );
};

export default PeopleAlerts;
