import * as React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import {makeStyles} from "@material-ui/core/styles"
import {useCallback} from "react"

const useStyles = makeStyles(
    theme => ({
        root:{
            position: 'relative',
            paddingLeft:'25px',
            cursor: 'pointer',
            width:'100%',
            "&:hover": {
                backgroundColor: '#e5e5e5',
            }
        },
        radio: {
            padding: '4px',
        },
        delete: {
            top: '50%',
            right: '16px',
            position: 'absolute',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            animation: 'fadeIn 0.3s',
            transition: 'opacity 0.4s',
            opacity: '0.3',
            zIndex:'99',
            "&:hover": {
                opacity: '1',
            }
        },
    }),
    { name: 'RadioButtonGroupInput' }
);


const RadioButtonGroupInputItem = ({
                                       choice,
                                       source,
                                       onChange,
                                       selected
                                   }) => {
    const label = choice.name;
    const value = choice.value;
    const classes = useStyles();
    const nodeId = `${source}_${label}`;

    const handleClick=useCallback( (newvalue)=>(event)=>{
        event.stopPropagation();
        onChange({filter:source,value:newvalue})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (
        <div className={classes.root} onClick={handleClick(value)}>
        <FormControlLabel
            label={label}
            htmlFor={nodeId}
            value={value}
            control={
                <Radio
                    id={nodeId}
                    color="primary"
                    className={classes.radio}
                    onChange={handleClick(value)}
                />
            }
        />
            {selected && <HighlightOffOutlinedIcon  onClick={handleClick('')} className={classes.delete} />}
        </div>
    );
};

export default RadioButtonGroupInputItem;
