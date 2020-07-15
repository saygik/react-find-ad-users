import React from 'react'
import {makeStyles} from "@material-ui/core/styles"
import classnames from "classnames"
import Grid from "@material-ui/core/Grid"
import List from "@material-ui/core/List"
import {ListItem} from "./index"

const useStyles = makeStyles(
    theme => ({
        root: {
            marginTop: theme.spacing(2),
            [theme.breakpoints.down('sm')]: {
                marginTop: theme.spacing(8),
            },
        },
    }),
    { name: 'ListItemText' }
);
const ListItems = props => {
    const {
        className,
        classAvatarName,
        data,
        leftAvatar,
        primaryText,
        secondaryText,
    } = props;
    const classes = useStyles(props);
    return (

    <Grid container justify="center" className={classnames(classes.root, className)} mb={2}>
            <Grid  item  xs={12} >
                <List >
                    {data.map(item=>(
                        <ListItem
                            key={item.id}
                            classAvatarName={classAvatarName}
                            item={item}
                            leftAvatar={leftAvatar}
                            primaryText={primaryText}
                            secondaryText={secondaryText}
                        />
                    ))}
                </List>
            </Grid>
        </Grid>
    )
}
export default ListItems
