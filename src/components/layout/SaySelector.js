import React, {useCallback} from 'react'
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {useData} from "../../context/Data"

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft:'18px',
        marginBottom:'18px',
        width: 370,
    },

    select: {
        '& legend': {
            fontSize:'1.2rem'
        },
        '& fieldset': {
            borderLeftWidth: 4,
            padding: '4px !important', // override inline-style
        },
    },
    label: {
        color: '#aba6a6',
        fontStyle: 'italic',
        fontSize:'1.25rem'
    },
}));


const SaySelector = (props) => {
    const {
        className,
        label,
        value,
        options,
        onChange,
    } = props;
    const classes = useStyles();

    const handleChange = useCallback(
        e => {
            e.preventDefault();
            onChange && onChange(e.target.value);
        },
        [onChange]
    );
    return (
        <FormControl variant="outlined" className={classnames(classes.root, className)}>
            <InputLabel className={classes.label} htmlFor="outlined-age-native-simple">{label}</InputLabel>
            <Select
                className={classes.select}
                value={value}
                onChange={handleChange}
                label={label}
            >
                {options.map((option) => (
                    <MenuItem key={option.id} value={option.id}>{option.text}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
};
export default SaySelector
