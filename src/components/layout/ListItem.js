import React from 'react'
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar"
import Avatar from "@material-ui/core/Avatar"
import ListItemText from "@material-ui/core/ListItemText/ListItemText"
import MUIListItem from '@material-ui/core/ListItem';
import {makeStyles} from "@material-ui/core/styles"
import classnames from "classnames"
import Grow from '@material-ui/core/Grow';

const useStyles = makeStyles(
    theme => ({
        avatar: {
                width:'50px',
                height:'50px',
                marginRight: '15px',
        },
    }),
    { name: 'ListItemText' }
);
const ListItem = props => {
        const {
            item,
            classAvatarName,
            leftAvatar,
            primaryText,
            secondaryText,
        } = props;
    const classes = useStyles(props);
    return (
        <Grow in={true}>
            <MUIListItem >
            {leftAvatar && (
                <ListItemAvatar>
                    <Avatar
                        className={classnames(classes.avatar, classAvatarName)}
                    >
                        {leftAvatar(item)}
                    </Avatar>
                </ListItemAvatar>
            )}
            <ListItemText
                primary={primaryText(item)}
                secondary={
                    secondaryText && secondaryText(item)
                }
            />
        </MUIListItem>
        </Grow>
    )
}
export default ListItem
