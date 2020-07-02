import * as React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import RefreshIconButton from '../buttons/RefreshIconButton';
import {useData} from "../../context/Data"

// import { useRefreshWhenVisible } from 'ra-core';

const useStyles = makeStyles(
    {
        loader: {
            margin: 14,
        },
    },
    { name: 'RaLoadingIndicator' }
);
const LoadingIndicator = props => {
    const { classes: classesOverride, className, ...rest } = props;
    const { selectors  } = useData()
    const { loading } = selectors
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
