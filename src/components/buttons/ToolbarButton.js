import * as React from 'react';
import {
    Button as MuiButton,
    Tooltip,
    IconButton,
    useMediaQuery,
    makeStyles,
} from '@material-ui/core';
import classnames from 'classnames';

/**
 * A generic Button with side icon. Only the icon is displayed on small screens.
 *
 * Pass the icon as child.
 * The icon displays on the left side of the button by default. Set alignIcon prop to 'right' to inverse.
 *
 * @example
 *
 * <Button label="Edit" color="secondary" onClick={doEdit}>
 *   <ContentCreate />
 * </Button>
 *
 */
const Button = props => {
    const {
        alignIcon = 'left',
        children,
        className,
        color,
        disabled,
        label,
        size,
        onClick,
    } = props;
    const classes = useStyles(props);
    const isXSmall = useMediaQuery((theme) =>
        theme.breakpoints.down('xs')
    );

    return isXSmall ? (
        label && !disabled ? (
            <Tooltip title={label}>
                <IconButton
                    aria-label={label}
                    className={className}
                    color={color}
                    onClick={onClick}
                >
                    {children}
                </IconButton>
            </Tooltip>
        ) : (
            <IconButton
                className={className}
                color={color}
                disabled={disabled}
                onClick={onClick}
            >
                {children}
            </IconButton>
        )
    ) : (
        <MuiButton
            className={classnames(classes.button, className)}
            color={color}
            size={size}
            aria-label={label ? label : undefined}
            disabled={disabled}
            onClick={onClick}
        >
            {alignIcon === 'left' &&
            children &&
            React.cloneElement(children, {
                className: classes[`${size}Icon`],
            })}
            {label && (
                <span
                    className={classnames({
                        [classes.label]: alignIcon === 'left',
                        [classes.labelRightIcon]: alignIcon !== 'left',
                    })}
                >
                    {label}
                </span>
            )}
            {alignIcon === 'right' &&
            children &&
            React.cloneElement(children, {
                className: classes[`${size}Icon`],
            })}
        </MuiButton>
    );
};

const useStyles = makeStyles(
    {
        button: {
            display: 'inline-flex',
            alignItems: 'center',
        },
        label: {
            paddingLeft: '0.5em',
            fontWeight: 600,
            fontSize:'1.1em'
        },
        labelRightIcon: {
            paddingRight: '0.5em',
        },
        smallIcon: {
            fontSize: 20,
        },
        mediumIcon: {
            fontSize: 22,
        },
        largeIcon: {
            fontSize: 24,
        },
    },
    { name: 'RaButton' }
);


Button.defaultProps = {
    color: 'primary',
    size: 'small',
};

export default Button;
