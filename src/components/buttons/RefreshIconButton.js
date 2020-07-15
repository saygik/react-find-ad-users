import * as React from 'react';
import { useCallback } from 'react';
import {useData} from "../../context/Data"
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import NavigationRefresh from '@material-ui/icons/Refresh';
import {makeStyles} from "@material-ui/core/styles"
import classNames from "classnames"


const defaultIcon = <NavigationRefresh />;
const defaultLabel = 'Обновить данные'

const useStyles = makeStyles(
    {
        refreshButton:{
            color:'#d9d9d9',
            "&:hover": {
                color:'#ffffff',
                backgroundColor: "transparent"
            },
        }
    },
    { name: 'RefrechButton' }
);

const RefreshIconButton = (props) => {
    const {label, icon, className, onClick, ...rest} = props
    const { actions  } = useData()
    const buttonLabel=label || defaultLabel
    const buttonIcon=icon || defaultIcon
    const classes = useStyles();

    const handleClick = useCallback(
        event => {
            event.preventDefault();
            actions.refreshData()
            if (typeof onClick === 'function') {
                onClick(event);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [actions.refresh, onClick]
    );
    return (
        <Tooltip title={buttonLabel}>
            <IconButton
                aria-label={buttonLabel}
                className={classNames(classes.refreshButton, className)}
                color="inherit"
                onClick={handleClick}
                {...rest}
            >
                {buttonIcon}
            </IconButton>
        </Tooltip>
    );
}
export default RefreshIconButton
