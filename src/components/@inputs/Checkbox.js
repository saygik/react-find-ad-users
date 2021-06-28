import * as React from 'react';
import {
    Checkbox as MuiCheckbox,
    makeStyles,
} from '@material-ui/core';

import classnames from 'classnames';
import {useCallback} from "react"

/**
 * A generic Checkbox .
 *
 * @example
 *
 * <Checkbox label="Выврать все"  checked={checked} onChange={onChange}>
 *   <ContentCreate />
 * </Button>
 *
 */
const Checkbox = props => {
    const {
        className,
        disabled,
        label,
        checked,
        onChange,
        color,
    } = props;
    const classes = useStyles(props);

    return (
        <MuiCheckbox
            className={classnames(classes.root, className)}
            checked={checked}
            onChange={onChange}
            onClick={(e)=>e.stopPropagation()}
            inputProps={{ 'aria-label': label ? label : ''}}
            color={color}
            disabled={disabled}
        />
    );
};

const useStyles = makeStyles(
    {
        root:{
            marginLeft:15,
            '& .MuiSvgIcon-root': {
            width: '30px',
            height: '30px'
        }
            // transform: "scale(1.2)"
        }
    },
    { name: 'sspCheckbox' }
);


Checkbox.defaultProps = {
    color: 'default',
    disabled: false
};

export default Checkbox;
