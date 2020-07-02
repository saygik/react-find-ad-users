import * as React from 'react';

import SearchIcon from '@material-ui/icons/Search';
import { makeStyles, InputAdornment } from '@material-ui/core';

import TextInput from './TextInput';

const useStyles = makeStyles(
    {
        input: {
            marginLeft: 0,
            width:'600px'
        },
    },
    { name: 'SearchInput' }
);

const SearchInput = props => {
    const { classes: classesOverride, ...rest } = props;

    const classes = useStyles(props);

    return (
        <TextInput
            hiddenLabel
            label=""
            resettable
            placeholder={'Поиск'}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <SearchIcon color="disabled" />
                    </InputAdornment>
                ),
            }}
            className={classes.input}
            {...rest}
        />
    );
};


export default SearchInput;
