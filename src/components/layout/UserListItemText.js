
import React  from 'react'
import  ListItemText from "./ListItemText"
import {makeStyles} from "@material-ui/core/styles"
import { useHistory } from 'react-router-dom';


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
    title: {
        color:'#81817f',
        fontSize:'1.3rem',
        fontWeight: 500,
    },
    usertitle:{
        color:'#5d5d5b',
        fontSize:'0.8rem',
        fontWeight: 400,
    },
    usercompany:{
        color:'#4f774f',
        fontSize:'1rem',
        fontWeight: 600,
    },
    userdepartment:{
        color:'#72ac72',
        fontSize:'.9rem',
        fontWeight: 600,
    },
}));


const UserListItemText = ({user, highlightText}) => {
    const classes = useStyles();
    const history=useHistory()
    const { name, title,company,department, mail}=user
    return (
        <>
            <ListItemText
                className={classes.title}
                highlightText={highlightText}
                onClick={()=>history.push('/peoples/'+mail)}
                text={name || mail}
            />
            <ListItemText
                className={classes.usertitle}
                highlightText={highlightText}
                text={title || null}
            />
            <ListItemText
                className={classes.usercompany}
                highlightText={highlightText}
                text={company || null}
            />
            <ListItemText
                className={classes.userdepartment}
                highlightText={highlightText}
                text={department || null}
            />
        </>
    )
}
export default UserListItemText




