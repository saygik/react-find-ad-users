import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import {grey} from '@material-ui/core/colors'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Box from "@material-ui/core/Box"
import ActionsPanel from './Panels/ActionsPanel/ActionsPanel'
import ContentPanel from './Panels/ContentPanel/ContentPanel'
import {UserListItemText} from "../layout"


const useStyles = makeStyles(theme => ({
    root: {
        // minWidth: '700px',
        marginBottom:20,
    },

    avatar: {
        backgroundColor: grey[500],
        width: '70px',
        height: '70px',
        [theme.breakpoints.down('sm')]: {
            width: '35px',
            height: '35px',
        },
    },
    avatarIcon:{
        width: '62px',
        height: '62px',
        [theme.breakpoints.down('sm')]: {
            width: '27px',
            height: '27px',
        },
    },
    fio:{
        color:'#81817f',
        fontSize:'1.3rem',
        fontWeight: 500,
        textAlign:'left',
    },
    number:{
        margin:'5px',
    },

}));

 function UserCard(props) {
    const classes = useStyles();
    const {user,index, searchValue, selectUser }=props
    const handleSelectUser = event => {
         event.preventDefault();
         selectUser(user)
     }
     if (!user) return ''
    return (
        <Card className={classes.root}>
            <Box component={'div'} className={classes.number}>
                {index+1}
            </Box>

            <CardHeader
                style={{paddingTop: '0px', paddingBottom: '3px',marginTop: '-10px'}}
                avatar={<><Avatar aria-label="recipe" className={classes.avatar} style={{ backgroundColor: user.avatarcolor,}}>
                    <AccountCircleIcon className={classes.avatarIcon}/>
                </Avatar>
                </>
                }
                action={
                        <IconButton aria-label="settings" onClick={handleSelectUser}>
                            <MoreVertIcon />
                        </IconButton>
                }
                title={
                    <UserListItemText
                        highlightText={searchValue}
                        user={
                            {
                                name:user.cn,
                                mail:user.mail,
                                company:user.company,
                                department:user.department,
                                title: user.title
                            }
                        }/>
                }
            />

            <CardContent style={{padding:'0px'}}>
                <ContentPanel  user={user} searchValue={searchValue}/>
            </CardContent>
            <CardActions disableSpacing style={{ backgroundColor:'rgba(51, 197, 62, 0.05)', marginTop:'10px' }}>
                <ActionsPanel user={user}/>
            </CardActions>
        </Card>
    );
}

export default UserCard
