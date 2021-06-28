import * as React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import {Grid} from "@material-ui/core"

const useStyles = makeStyles(
    theme => ({
        toolbar: {
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            paddingRight: 20,
            [theme.breakpoints.up('xs')]: {
                paddingLeft: 0,
            },
            [theme.breakpoints.down('xs')]: {
                paddingLeft: theme.spacing(2),
                backgroundColor: theme.palette.background.paper,
            },
        },
        actions: {
            // paddingTop: theme.spacing(3),
            // minHeight: theme.spacing(5),
            [theme.breakpoints.down('xs')]: {
                padding: theme.spacing(1),
                backgroundColor: theme.palette.background.paper,
            },
        },
        filters: {
            // paddingTop: theme.spacing(3),
            // minHeight: theme.spacing(5),
            [theme.breakpoints.down('xs')]: {
                padding: theme.spacing(1),
                backgroundColor: theme.palette.background.paper,
            },
        },
    }),
    { name: 'SAYListToolbar' }
);

const ListToolbar = props => {
    const {
        classes: classesOverride,
        actions,
        filters,
        ...rest
    } = props;
    const classes = useStyles(props);
    return (
        <Toolbar className={classes.toolbar}>
            {filters &&
            React.cloneElement(filters, {
                ...rest,
                className: classes.actions,
                ...filters.props,
            })}
            <span />
            {actions &&
            React.cloneElement(actions, {
                ...rest,
                className: classes.actions,
                ...actions.props,
            })}
        </Toolbar>
    );
};



export default ListToolbar;
