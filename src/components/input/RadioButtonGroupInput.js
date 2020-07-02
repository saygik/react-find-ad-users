import * as React from 'react';

import {
    makeStyles,
    FormControl,
    FormHelperText,
    FormLabel,
    RadioGroup,
} from '@material-ui/core';
import get from 'lodash/get';
import RadioButtonGroupInputItem from './RadioButtonGroupInputItem';

const useStyles = makeStyles(
    theme => ({
        root:{
            width:'100%',
            marginTop:'25px'
        },
        label: {
            paddingLeft:'15px',
            textTransform: 'uppercase',
            letterSpacing: '0.08333em',
            transform: 'translate(0, -9px) scale(1.1)',
        },
        group:{
            paddingLeft:'0px',
        }
    }),
    { name: 'RadioButtonGroupInput' }
);

/**
 * An Input component for a radio button group, using an array of objects for the options
 *
 * Pass possible options as an array of objects in the 'choices' attribute.
 *
 */
const RadioButtonGroupInput = props => {
    const {
        choices = [],
        value,
        label,
        margin = 'dense',
        onChange,
        options,
        source,
    } = props;
    const classes = useStyles(props);

const id=1

    return (
        <FormControl
            component="fieldset"
            className={classes.root}
            margin={margin}
        >
            <FormLabel component="legend" className={classes.label}>
                {label}
            </FormLabel>
            <RadioGroup id={id}  {...options} className={classes.group} value={value}>
                {choices.map(choice => (
                    <RadioButtonGroupInputItem
                        key={get(choice, 'id')}
                        choice={choice}
                        selected={value===choice.value}
                        onChange={onChange}
                        source={source}
                    />
                ))}
            </RadioGroup>

        </FormControl>
    );
};

RadioButtonGroupInput.defaultProps = {
    options: {},
    optionText: 'name',
    optionValue: 'id',
    row: true,
    translateChoice: true,
};

export default RadioButtonGroupInput;
