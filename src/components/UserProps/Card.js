import React, {useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import CircularProgress from '@material-ui/core/CircularProgress';
import GridLine from '../UserPropertyLine'
import {presenceTimeFormat} from '../../services'

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: '700px',
        marginTop:20,
    },

    avatar: {
        width: '70px',
        height: '70px',
        fontSize:'65px'
    },
    paper: {
        padding: '5px',
        paddingLeft: '15px',
        paddingBottom: '10px',
        marginTop: '20px',
        width: '100%',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },

    fio:{
        color:'#81817f',
        fontSize:'1.3rem',
        fontWeight: 500,
        textAlign:'left',
    },
    usertitle:{
        color:'#5d5d5b',
        fontSize:'0.8rem',
        fontWeight: 400,
        textAlign:'left',
    },
    usercompany:{
        color:'#4f774f',
        fontSize:'1rem',
        fontWeight: 600,
        textAlign:'left',
    },
    userdepartment:{
        color:'#72ac72',
        fontSize:'.9rem',
        fontWeight: 600,
        textAlign:'left',

    },
    userurl:{
        color:'#8ea78e',
        fontSize:'.7rem',
        fontWeight: 400,
        textAlign:'left',
    },
    usermail:{
        color:'#4f774f',
        fontSize:'.9rem',
        fontWeight: 400,
        textAlign:'left',

    },
    loader:{
        left: '32px',
        top: '66px',
        zIndex: '99',
        position:'absolute'
    },
}));


function UserCard(props) {
    const classes = useStyles();
    const {user, loading }=props
    const telephones=Array.isArray(user.otherTelephone) ? user.otherTelephone : [user.otherTelephone]

    return (
        <Card className={classes.root}>
            {loading && <CircularProgress size={70} className={classes.loader}/>}
            <CardHeader
                avatar={<Avatar aria-label="recipe" className={classes.avatar} style={{ backgroundColor: user.avatarcolor,}}>
                        <AccountCircleIcon fontSize={'inherit'} />
                    </Avatar>
                }

                title={
                    <Box letterSpacing={3} className={classes.fio}>
                            {user.cn}
                    </Box>
                }
                subheader={
                    <>
                        <Box letterSpacing={3} className={classes.usertitle}>
                            {user.title ? user.title : 'должность не определена'}
                        </Box>

                        <Box letterSpacing={3} className={classes.usercompany}>
                            {user.company ? user.company : 'предприятие не определено'}
                        </Box>
                        <Box letterSpacing={3} className={classes.userdepartment}>
                            {user.department ? user.department : 'отдел не определен'}
                        </Box>
                    </>
                }
            />

            <CardContent style={{padding:'0px', paddingLeft:'80px'}}>
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start"
                >
                    <GridLine caption={'присутствие:'} property={user.availability.presence} marginLeft={'20px'}>
                        {presenceTimeFormat(user.availability)}
                    </GridLine>
                    {/*<GridLine caption={'расположение:'} property={presence.location} marginLeft={'20px'}>*/}
                    {/*    {presence.location}*/}
                    {/*</GridLine>*/}

                </Grid>
                <Grid container  justify='flex-start' style={{marginTop:'30px'}}>
                    <Grid item>
                        {/*<UserNameBox text={user.cn} searchValue={searchValue} selectUser={selectUser} classes={classes}/>*/}
                        <Box letterSpacing={3} className={classes.userurl}>
                            {user.url ? user.url : ''}
                        </Box>
                    </Grid>
                </Grid>
                <Grid container  justify='flex-start' style={{marginTop:'30px'}}>
                    <Grid item>
                        {/*<UserNameBox text={user.cn} searchValue={searchValue} selectUser={selectUser} classes={classes}/>*/}
                        <Box  className={classes.userurl}>
                            {user.dn }
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions disableSpacing style={{marginLeft:'80px'}}>
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start"
                >
                    <GridLine caption={'почта:'} property={user.mail} marginLeft={'20px'}>
                        {<a href={`mailto:${user.mail}`}  target="_top">{user.mail}</a>}
                    </GridLine>
                    <GridLine caption={'скайп:'} property={user.sip} marginLeft={'20px'}>
                        {<a href={`${user.sip}`}  target="_top">{user.sip}</a>}
                    </GridLine>
                    <GridLine caption={'мобильный:'} property={user.mobile} marginLeft={'20px'}>
                        {user.mobile}
                    </GridLine>

                    <GridLine caption={'телефоны:'} property={user.telephoneNumber} marginLeft={'20px'}>
                        {user.telephoneNumber}
                    </GridLine>
                    {user.otherTelephone  && telephones.map((phone,index)=> <GridLine key={index} caption={''} property={phone} marginLeft={'120px'}>
                                                                {phone}
                                                                </GridLine>
                      )}
                </Grid>


            </CardActions>

        </Card>
    );
}
function UserCardContainer ({user}) {
    const [loading]=useState(false)
    // const [presence, setPresence]=useState({
    //     availability: "не определено",
    //     lastActive: "",
    //     location: ""})
    useEffect(()=>{
        // user.sip && api.getAdUserPresence(user.sip)
        //                 .then(resp=>{
        //                     setPresence(resp)
        //                     setLoading(false)
        //                 }).catch(err=>{
        //                     setLoading(false)
        //                     console.log('-err-',err)
        //                 })
    },[])

    return <>
        {!_.isEmpty(user) && <UserCard
            user={user}
            loading={loading}
        />}
        </>
}

export default UserCardContainer
//{sip: "sip:piv@brnv.rw", availability: "Away", lastActive: "/Date(1587121615000)/", location: "На месте"}
