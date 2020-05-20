import React from 'react'
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Switch from "@material-ui/core/Switch"

const SettingsSwitch = (props) => {
    const {name, label,  sortState, handleChange}=props
    return (
        <FormControlLabel
            control={<Switch size="small" checked={sortState[name]} color="primary"onChange={handleChange(name)} value={name} />}
            label={label}
        />
    )
}
export default SettingsSwitch
