import React from 'react';
import {  makeStyles } from '@material-ui/core/styles';
import FindIcon from '@material-ui/icons/FindInPage';
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles(theme => ({
    center: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center'
    },
    emptyStateIcon: {
        fontSize: theme.spacing(12)
    },
    button: {
        marginTop: theme.spacing(1)
    },

    buttonIcon: {
        marginRight: theme.spacing(1)
    }
}));

const  NotFoundContent= () => {
    const  classes  = useStyles();
    return (
        <div className={classes.center}>
            <FindIcon className={classes.emptyStateIcon} color="action" />
            <Typography color="textSecondary" variant="h4">данные не найдены</Typography>
            <Typography color="textSecondary" variant="subtitle1">попробуйте изменить параметры поиска</Typography>
            <br/>
            <br/>
        </div>
    );
}
export default NotFoundContent;
