import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import * as React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import NavigationRefresh from '@material-ui/icons/Refresh';
import {makeStyles} from "@material-ui/core/styles"
import classNames from "classnames"


const defaultIcon = <ArrowForwardIosIcon />;
const defaultLabel = 'Обновить данные'

const useStyles = makeStyles(
    {
        refreshButton:{
            color:'#919189',
            "&:hover": {
                color:'#056405',
            },
        }
    },
    { name: 'TemplateButton' }
);

const TemplateButton = (props) => {
    const {label, icon, className, onClick, ...rest} = props
    const buttonLabel=label || defaultLabel
    const buttonIcon=icon || defaultIcon
    const classes = useStyles();

    return (
        <Tooltip title={buttonLabel}>
            <IconButton
                aria-label={buttonLabel}
                className={classNames(classes.refreshButton, className)}
                color="inherit"
                onClick={onClick}
                {...rest}
            >
                {buttonIcon}
            </IconButton>
        </Tooltip>
    );
}
export default TemplateButton
