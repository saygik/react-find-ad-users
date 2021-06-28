import * as React from 'react';
import {
    Button as MuiButton,
    Tooltip,
    IconButton,
    useMediaQuery,
    makeStyles, Checkbox as MuiCheckbox,
} from '@material-ui/core'
import classnames from 'classnames';

/**
 * A generic Button with icon.
 *
 * Pass the icon as child.
 *
 * @example
 *
 * <Button color="secondary" onClick={doEdit}>
 *   <ContentCreate />
 * </Button>
 *
 */
const Button = props => {
    const {
        label,
        children,
        className,
        color,
        disabled,
        size,
        onClick,
    } = props;
    const classes = useStyles();
    const {alternativeColor} = useStyles({ color})
    return   label && !disabled ? (
            <Tooltip title={label}>
                <IconButton
                    aria-label={label}
                    className={classnames(classes.root,alternativeColor,className, classes[`${size}Icon`]) }
                    onClick={onClick}
                >
                    {children}
                </IconButton>
            </Tooltip>
        ) : (
            <IconButton
                className={classnames(classes.root, alternativeColor, className, classes[`${size}Icon`])}
                disabled={disabled}
                onClick={onClick}
            >
                {children}
            </IconButton>
    );
};


const useStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.secondary.dark,
        // "&:hover": {
        //     color: theme.palette.primary.main,
        // },
    },
    alternativeColor: ({ color }) => ({
        color: color,
    }),
    smallIcon: {
        '& .MuiSvgIcon-root':{
            fontSize:'20px',
        }        },
    mediumIcon: {
        '& .MuiSvgIcon-root':{
            fontSize:'26px',
        }        },
    largeIcon: {
        '& .MuiSvgIcon-root':{
            fontSize:'30px',
        }        },
}));

Button.defaultProps = {
    color: 'primary',
    size: 'small',
};

export default Button;
