import React from 'react'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';
const GreenRadio = withStyles({
    root: {
        padding:'2px',
        color: blueGrey[200],
        '&$checked': {
            color: blueGrey[200],
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);
const SwitchPanel = ({serachType, setSerachType}) => {

    const handleChange = (event) => {
        setSerachType(event.target.value);
    };
    return (
        <FormControl component="fieldset">
            <RadioGroup aria-label="gender" name="gender1" value={serachType} onChange={handleChange} style={{marginBottom:'10px',}}>
                <FormControlLabel value="peoples" control={<GreenRadio  />} label="Люди" />
                <FormControlLabel value="soft" control={<GreenRadio />} label="Программы и сервисы ИВЦ" />
            </RadioGroup>
        </FormControl>
    );
}
export default SwitchPanel
