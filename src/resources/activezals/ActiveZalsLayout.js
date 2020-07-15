import React, {useCallback} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {ListItemText as ListItemPrimaryText, ListItems} from '../../components/layout'
import MeetingIcon from '../../assets/meeting3.png'
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    avatar: {
        width:'60px',
        height:'60px',
        backgroundColor:'#a7ecac'
    },
}));

const ActiveZalsLayout=(props)=>{
    const classes = useStyles();
    const history=useHistory()
    const {values} =props

    const handleTitleClick=useCallback((zal)=>()=>{
        history.push('/zals/'+zal)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const primaryText=(item)=>{
        return (
            <ListItemPrimaryText
                className={classes.title}
                onClick={handleTitleClick(item.id)}
                text={item.title || item.id}/>
        )
    }
    const secondaryText=item=>`участников: ${item.users}`
    const leftAvatar=()=> <img src={MeetingIcon} alt="meeting" title="meeting" style={{width: '40px'}}/>

    return (
        <ListItems
            classAvatarName={classes.avatar}
            data={values}
            leftAvatar={leftAvatar}
            primaryText={primaryText}
            secondaryText={secondaryText}
        />
    );
}

export default ActiveZalsLayout
