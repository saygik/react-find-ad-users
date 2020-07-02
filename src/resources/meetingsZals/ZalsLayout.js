import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// import NotFound from '../../components/layout/BeginToFind'
// import SoftCards from "../../components/SoftCards"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import {Box} from "@material-ui/core"
import {ListTitleSimple} from '../../components/layout'
import MeetingIcon from '../../assets/meeting3.png'


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

}));



const ZalsLayout=(props)=>{
    const classes = useStyles();
const {values} =props

    return (
        <>
            <Grid container justify="center" className={classes.cardsGrid} mb={2}>
                <Grid  item  xs={12} >
                    <List className={classes.root}>
                        {values.map(item=>(
                            <ListItem key={item.id}>
                                <ListItemAvatar>
                                    <Avatar style={{width: '60px', height:'60px', marginRight:'15px'}}>
                                        <img src={MeetingIcon} alt="meeting" title="meeting"
                                             style={{width: '40px'}}/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={<ListTitleSimple title={item.title} />}
                                    secondary={<a href={item.url} target="_blank">войти</a>}
                                />
                            </ListItem>

                        ))
                        }
                     </List>
                </Grid>
            </Grid>

        </>
    );
}

export default ZalsLayout
