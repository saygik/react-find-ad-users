import React from 'react'
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {makeStyles, withStyles} from '@material-ui/core/styles'
import { blueGrey } from '@material-ui/core/colors';
const GreyRadio = withStyles({
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
    const classes = useStyles();
    const handleChange = (event) => setSerachType(event.target.value)
    return(
        <div className={classes.root}>
            <FormControlLabel value="peoples" control={<GreyRadio
                checked={serachType === 'peoples'}
                onChange={handleChange}
                value="peoples"
            />} label="Люди" className={classes.radio} />
            <FormControlLabel value="soft" control={<GreyRadio
                checked={serachType === 'soft'}
                onChange={handleChange}
                value="soft"
            />} label="Сервисы ИВЦ" className={classes.radio} />
        </div>
    )
}
const useStyles = makeStyles(theme => ({
    root: {
        padding: '5px',
        marginTop: '5px',
        marginLeft: theme.spacing(7),
    },
    radio: {
        marginRight: theme.spacing(6),
    },}))
export default SwitchPanel
