import React from 'react'
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"

import PhoneIcon from '@material-ui/icons/Phone';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import MailIcon from './Icons/MailIcon';
import SkypeIcon from './Icons/SkypeIcon'
import Highlighter from "react-highlight-words"
import {makeStyles} from "@material-ui/core/styles"



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


const SelectedText=({text,searchValue, classes})=>{
    const searchWords=searchValue
    //searchValue && searchWords.push(searchValue)
    return <Highlighter
        highlightClassName={classes.colorize}
        caseSensitive={false}
        searchWords={searchWords}
        autoEscape={true}
        textToHighlight={text}
    />
}
const UserNameBox=({text,searchValue, classes})=>{
    return <>
        <Box letterSpacing={3} className={classes.fio}>
            <SelectedText searchValue={searchValue} text={text} classes={classes}/>
        </Box>
    </>
}
const UserTitleBox=({text,searchValue, classes})=>{
    return <>
        <Box letterSpacing={3} className={classes.usertitle}>
            {text ? <SelectedText searchValue={searchValue} text={text} classes={classes} />
                : 'должность не определена'}
        </Box>
    </>
}
const UserCompanyBox=({text,searchValue, classes})=>{
    return <>
        <Box letterSpacing={3} className={classes.usercompany}>
            {text ? <SelectedText searchValue={searchValue} text={text} classes={classes} />
                : 'предприятие не определено'}
        </Box>
    </>
}
const UserDepartmentBox=({text,searchValue, classes})=>{
    return <>
        <Box letterSpacing={3} className={classes.userdepartment}>
            {text ? <SelectedText searchValue={searchValue} text={text} classes={classes} />
                : 'предприятие не определено'}
        </Box>
    </>
}

const UserCard = ({user,index, searchValue}) => {
    const classes = useStyles();
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

                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={8} >
                        <Grid container  justify='flex-start'>
                            <Grid item>
                                <UserNameBox text={user.cn} searchValue={searchValue} classes={classes}/>
                                <UserTitleBox text={user.title} searchValue={searchValue} classes={classes}/>
                                <UserCompanyBox text={user.company} searchValue={searchValue} classes={classes}/>
                                <UserDepartmentBox text={user.department} searchValue={searchValue} classes={classes}/>
                                {/*<UserDepartmentBox text={user.dn} searchValue={searchValue} classes={classes}/>*/}

                            </Grid>
                        </Grid>

                    </Grid>

                </Grid>
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
        fontWeight: 400,
        textAlign:'left',

    },
    searchResult:{
        textAlign:'left',
        color:'#81817f',
    },
    colorize:{
        backgroundColor:'#fafdca',
        color:'red'
    },
    paperBack: {
        top: theme.spacing(1),
        color:'#4a4a4a',
        padding:0,
        textAlign:'right',
        width: '100%',
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
