import * as React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import HotTub from '@material-ui/icons/HotTub';
import History from '@material-ui/icons/History';
import classnames from 'classnames';
import Typography from "@material-ui/core/Typography"


const useStyles = makeStyles(
    theme => ({
        container: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center'
        },
        center: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center'
        },
        icon: {
            width: '9em',
            height: '9em',
        },
        message: {
            textAlign: 'center',
            fontFamily: 'Roboto, sans-serif',
            opacity: 0.5,
            margin: '0 1em',
        },
        toolbar: {
            textAlign: 'center',
            marginTop: '2em',
        },
    }),
    { name: 'RaNotFound' }
);

function goBack() {
    window.history.go(-1);
}

const NotFound = props => {
    const { className, classes: classesOverride, title} = props;
    const classes = useStyles(props);
//    useAuthenticated();
    return (
        <div
            className={classnames(classes.container, className)}
        >
            {/*<Title defaultTitle={title} />*/}
            <div className={classes.message}>
                <HotTub className={classes.icon} />
                <h1>Не найдено</h1>
                <Typography variant="subtitle1">Либо вы ввели неверный URL, либо вы перешли по неверной ссылке...</Typography>

            </div>
            <div className={classes.toolbar}>
                <Button variant="contained" icon={<History />} onClick={goBack}>
                    Назад
                </Button>
            </div>
        </div>
    );
};

export default NotFound;
