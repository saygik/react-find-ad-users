import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import {grey} from '@material-ui/core/colors'
import MailIcon from './Icons/MailIcon';
import SkypeIcon from './Icons/SkypeIcon'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PhoneIcon from '@material-ui/icons/Phone';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import Link from "@material-ui/core/Link"
import TextHighlighter from "../TextHighlighter"
import Phone from './Phones/Phone'
import OtherPhones from './Phones/OtherPhones'
import GridLine from '../UserPropertyLine'
import {presenceTimeFormat} from '../serices'


const useStyles = makeStyles(theme => ({
    root: {
        minWidth: '700px',
        marginTop:20,
    },

    avatar: {
        backgroundColor: grey[500],
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
    searchResult:{
        textAlign:'left',
        color:'#81817f',
    },
    paperBack: {
        color:'#4a4a4a',
        padding:0,
        width: '100%',
    },
    number:{
        paddingTop:'5px',
        paddingLeft:'10px',
        color:grey[400],
    },

}));

 function UserCard(props) {
    const classes = useStyles();
    const {user,index, searchValue, selectUser }=props
    const handleSelectUser = event => {
         event.preventDefault();
         selectUser(user)
     }
//     console.log('--time---', presenceTimeFormat(user.availability))
    return (
        <Card className={classes.root}>
            <Box component={'div'} className={classes.number}>
                {index+1}
            </Box>
            <CardHeader

                style={{paddingTop: '0px', paddingBottom: '3px',marginTop: '-10px'}}
                avatar={<><Avatar aria-label="recipe" className={classes.avatar} style={{ backgroundColor: user.avatarcolor,}}>
                    <AccountCircleIcon fontSize={'inherit'} />
                </Avatar>
                </>
                }
                action={
                    <IconButton aria-label="settings" onClick={handleSelectUser}>
                        <MoreVertIcon />
                    </IconButton>
                }
                title={
                    <Box letterSpacing={3} className={classes.fio}>
                        <Link href="#" onClick={handleSelectUser} color="inherit">
                            <TextHighlighter searchValue={searchValue} text={user.cn}  />
                        </Link>
                    </Box>
                }
                subheader={
                           <>
                               <Box letterSpacing={3} className={classes.usertitle}>
                                   {user.title ? <TextHighlighter searchValue={searchValue} text={user.title}  />
                                       : 'должность не определена'}
                               </Box>

                               <Box letterSpacing={3} className={classes.usercompany}>
                                   {user.company ? <TextHighlighter searchValue={searchValue} text={user.company}    />
                                       : 'предприятие не определено'}
                               </Box>
                               <Box letterSpacing={3} className={classes.userdepartment}>
                                   {user.department ? <TextHighlighter searchValue={searchValue} text={user.department}    />
                                       : 'отдел не определен'}
                               </Box>
                           </>
                }
            />

            <CardContent style={{padding:'0px', paddingLeft:'40px'}}>
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start"
                >
                    <GridLine caption={'присутствие:'} property={user.availability.presence} marginLeft={'60px'}>
                        {presenceTimeFormat(user.availability)}
                    </GridLine>

                </Grid>
                {user.url &&
                    <Grid container  justify='flex-start' style={{marginTop:'20px'}}>
                        <Grid item>
                            <Box letterSpacing={3} className={classes.userurl}>
                                <TextHighlighter searchValue={searchValue} text={user.url} />
                            </Box>
                        </Grid>
                    </Grid>
                    }
            </CardContent>
            <CardActions disableSpacing style={{ marginLeft:'80px' }}>
                <Grid container  justify='flex-start'  spacing={3} alignItems="center" style={{width:'100%'}}>
                    <Grid item xs={12}>
                        <Grid   container
                                direction="row"
                                justify="flex-start"
                                alignItems="center" >
                        <IconButton aria-label="add to favorites">
                            <MailIcon  mail={user.mail}/>
                        </IconButton>
                        <IconButton aria-label="share">
                            <SkypeIcon sip={user.sip}/>
                        </IconButton>
                        {user.mobile && <Phone phone={user.mobile} icon={<PhoneAndroidIcon style={{ fontSize: 28, marginLeft:'10px' }}/>}/>}
                            {user.telephoneNumber && <Phone phone={user.telephoneNumber}  icon={<PhoneIcon style={{ fontSize: 28, marginLeft:'10px' }}/>}/>}
                            <Grid container direction="column"  justify="flex-start"  alignItems="flex-start" style={{ width:'130px' }}>
                                {user.otherTelephone && <OtherPhones otherTelephones={user.otherTelephone} />}
                            </Grid>

                        </Grid >
                    </Grid>

                </Grid>

            </CardActions>

        </Card>
    );
}

export default UserCard
