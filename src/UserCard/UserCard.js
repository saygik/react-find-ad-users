import React from 'react'
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"

import PhoneIcon from '@material-ui/icons/Phone';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import MailIcon from './Icons/MailIcon';
import SkypeIcon from './Icons/SkypeIcon'
import {makeStyles} from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Link from '@material-ui/core/Link';
import TextHighlighter from '../TextHighlighter'
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';

const Phone=({phone,icon})=>{
    return <Grid item xs={12} >
        <Box style={{
            color:'#0066cc',
            fontSize:'1.1rem',
            fontWeight: 400,
            textAlign:'left',
        }}>
            {icon}
            {phone}
        </Box>
    </Grid>
}
const OtherTelephones=({otherTelephones})=>{
    if (!otherTelephones) return ''
    const telephones=Array.isArray(otherTelephones) ? otherTelephones : [otherTelephones]
    return telephones.map((phone,index)=>{
        return <Grid key={index} item xs={12} style={{
            marginLeft:'25px',
            color:'#81817f',
            fontSize:'1rem',
            fontWeight: 400,
            textAlign:'left',
        }}
        >
            {phone}
        </Grid>
    })
}


const UserCard = ({user,index, searchValue, selectUser, selectable}) => {
    const classes = useStyles();
    const handleSelectUser = event => {
        event.preventDefault();
        selectUser(user)
    }
    return <>
            <Paper className={classes.paper}>

                <Box component={'div'} className={classes.paperBack} >
                        {index+1}
                <Grid container justify='flex-start'>
                    <Grid item xs={4} >
                        <Grid container justify='flex-start'>
                            <Grid item xs={6} >
                                <Grid container justify='center'>
                                    {user.telephoneNumber && <Phone phone={user.telephoneNumber} icon={<PhoneIcon/>} />}
                                    {user.otherTelephone && <OtherTelephones otherTelephones={user.otherTelephone} />}
                                    {user.mobile && <Phone phone={user.mobile} icon={<PhoneAndroidIcon />}/>}
                                </Grid>
                            </Grid>
                            <Grid item xs={6} >
                                <Grid container justify='center'>
                                    <Grid item  >
                                        <MailIcon mail={user.mail} />
                                    </Grid>
                                    <Grid item >
                                        <SkypeIcon sip={user.sip}/>
                                    </Grid>
                                </Grid>
                                <Grid container justify='center' alignItems="flex-end" style={{height:'100%',paddingBottom:'20px'}}>
                                    <Grid item  >
                                        <Box className={classes.usermail}>
                                            {user.mail
                                                ? <TextHighlighter searchValue={searchValue} text={user.mail}  />
                                                : ''}
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={8} >
                        <Grid container  justify='flex-start'>
                            <Grid item>
                                {/*<UserNameBox text={user.cn} searchValue={searchValue} selectUser={selectUser} classes={classes}/>*/}
                                <Box letterSpacing={3} className={classes.fio}>
                                    <Link href="#" onClick={handleSelectUser} color="inherit">
                                        <TextHighlighter searchValue={searchValue} text={user.cn} />
                                    </Link>
                                </Box>
                                <Box letterSpacing={3} className={classes.usertitle}>
                                    {user.title ? <TextHighlighter searchValue={searchValue} text={user.title}/>
                                        : 'должность не определена'}
                                </Box>
                                <Box letterSpacing={3} className={classes.usercompany}>
                                    {user.company ? <TextHighlighter searchValue={searchValue} text={user.company}  />
                                        : 'предприятие не определено'}
                                </Box>
                                <Box letterSpacing={3} className={classes.userdepartment}>
                                    {user.department ? <TextHighlighter searchValue={searchValue} text={user.department}  />
                                        : 'предприятие не определено'}
                                </Box>
                                <Box letterSpacing={3} className={classes.userurl}>
                                    {user.url ? <TextHighlighter searchValue={searchValue} text={user.url} />
                                        : ''}
                                </Box>
                            </Grid>
                        </Grid>

                    </Grid>

                </Grid>
                    <Link href="#" onClick={handleSelectUser} color="inherit">
                        <SettingsEthernetIcon style={{color:'#999', fontSize: 32 }}/>
                    </Link>
                </Box>
            </Paper>
    </>
}

const useStyles = makeStyles(theme => ({

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
        fontSize:'1rem',
        fontWeight: 400,
        textAlign:'left',
    },
    usercompany:{
        marginTop:'10px',
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
    searchResult:{
        textAlign:'left',
        color:'#81817f',
    },
    paperBack: {
        top: theme.spacing(1),
        color:'#4a4a4a',
        padding:0,
        textAlign:'right',
        verticalAlign:'top',
        width: '100%',
    },
    nn: {
        position: 'absolute',
        right: theme.spacing(10),
        top: theme.spacing(10),
        color: theme.palette.grey[500],
    },
}));




export default UserCard


// userPrincipalName: "say@brnv.rw"
// dn: "CN=Крапивин Игорь Викторович,OU=сектор технических средств,OU=ИВЦ,OU=_Сх НОД-2,OU=Предприятия,DC=brnv,DC=rw"
//* cn: "Крапивин Игорь Викторович"
//* company: "НОД-2"
//* department: "ИВЦ/сектор технических средств"
//* title: "ведущий администратор серверов"
//* telephoneNumber: "493660"
//* otherTelephone: (2) ["7(200)493668", "7(200)493667"]
// mobile: "+375291622294"
// mail: "say@brnv.rw"
// sip: "sip:say@brnv.rw"
// objectGUID: "{C0CBEAFE-EA4A-4E84-A8EF-C3F331631FFB}"
