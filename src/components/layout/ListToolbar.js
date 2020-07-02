import * as React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(
    theme => ({
        toolbar: {
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            paddingRight: 0,
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
    { name: 'RaListToolbar' }
);

const ListToolbar = props => {
    const {
        classes: classesOverride,
        filters,
        filterValues, // dynamically set via the UI by the user
        permanentFilter, // set in the List component by the developer
        actions,
        exporter,
        ...rest
    } = props;
    const classes = useStyles(props);
    return (
        <Toolbar className={classes.toolbar}>
            {filters &&
            React.cloneElement(filters, {
                ...rest,
                className: classes.filters,
                filterValues,
                context: 'form',
            })}
            <span />
            {actions &&
            React.cloneElement(actions, {
                ...rest,
                className: classes.actions,
                exporter, // deprecated, use ExporterContext instead
                filters,
                filterValues,
                permanentFilter,
                ...actions.props,
            })}
        </Toolbar>
    );
};



export default React.memo(ListToolbar);
