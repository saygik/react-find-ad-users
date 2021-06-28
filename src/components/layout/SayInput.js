import React, {useCallback} from 'react'
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField"

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ClearIcon from '@material-ui/icons/Clear';
import DirectionsIcon from '@material-ui/icons/Directions';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            marginLeft:'18px',
            marginBottom:'18px',
            width: 370,
            borderWidth: 4,

        },
            '& fieldset': {
                borderLeftWidth: 4,
                padding: '4px !important', // override inline-style
            },
        '& legend': {
            fontSize:'1.2rem'
        },
        '& label': {
            fontSize:'1.2rem',
            color: '#aba6a6',
            fontStyle: 'italic',
        },
    },
    select: {
        '& legend': {
            fontSize:'1.2rem'
        },
    },
    label: {
        color: '#aba6a6',
        fontStyle: 'italic',
        fontSize:'1.1rem'
    },
    iconButton: {
        padding: 10,
    },
}));


const SayInput = (props) => {
    const {
        id,
        className,
        label,
        value,
        onChange,
    } = props;
    const classes = useStyles();

    const handleChange = useCallback(
        e => {
            onChange && onChange(e.target.value);
        },
        [onChange]
    );
    const handleClick = useCallback(
        e => {
            e.preventDefault();
            onChange && onChange('');
        },
        [onChange]
    );
   const handleKeyPress=(e)=>{
       if (e.key === 'Delete') {
           onChange && onChange('');
       }
   }

    return (
            <form className={classnames(classes.root, className)} noValidate autoComplete="on">
                <TextField id={`say-input-${id}`}
                           label={label}
                           variant="outlined"
                           value={value}
                           onChange={handleChange}
                           onKeyUp={handleKeyPress}
                           InputProps={{endAdornment:
                                   <IconButton type="submit" className={classes.iconButton} onClick={handleClick} aria-label="search">
                                       <ClearIcon />
                                   </IconButton>
                           }}
                />
            </form>

    )
};
export default SayInput
