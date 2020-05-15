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

const  NotFoundContent= ({loading, filtred}) => {
    const  classes  = useStyles();

    return (
        <div className={classes.center}>
            {!loading && <>
                        <FindIcon className={classes.emptyStateIcon} style={{color:filtred ? '#ccc' :'#3f51b5'}} />
                        <Typography style={{color:filtred ? '#ccc' :'#3f51b5'}} variant="h4">{filtred ? 'Данные не найдены' :'Начните поиск'}</Typography>
                        <Typography color="textSecondary" variant="subtitle1">{filtred ? 'попробуйте изменить параметры поиска' :'определите параметры поиска'}</Typography>
                        <br/>
                        <br/>
                </>}
        </div>
    );
}
export default NotFoundContent;
