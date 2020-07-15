import * as React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import RefreshIconButton from '../buttons/RefreshIconButton';

const useStyles = makeStyles(
    {
        loader: {
            margin: 14,
        },
    },
    { name: 'LoadingIndicator' }
);
const LoadingIndicator = props => {
    const { classes: classesOverride, className, loading, ...rest } = props;
    const classes = useStyles(props);
    return loading ? (
        <CircularProgress
            className={classNames('app-loader', classes.loader, className)}
            color="inherit"
            size={18}
            thickness={5}
            {...rest}
        />
    ) : (
        <RefreshIconButton />
    );
};
export default LoadingIndicator
