import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import Divider from '@material-ui/core/Divider';
import SettingsSwitch from './SettingsSwitch'

const SettingsPanelTab=(props)=> {
    const {settings, label, sortState, handleChange}=props


    return (
        <FormControl component="fieldset">
            <FormLabel component="legend"></FormLabel>
            <FormGroup>
                {
                    settings.map((oneSetting,index)=>
                        <SettingsSwitch key={index}
                                        name={oneSetting.name}
                                        label={oneSetting.label}
                                        sortState={sortState}
                                        handleChange={handleChange}/>)
                }
            </FormGroup>
            <Divider/>
            <FormHelperText>{label}</FormHelperText>
        </FormControl>
    );
}
export default SettingsPanelTab
