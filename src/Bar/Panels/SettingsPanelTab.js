import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Divider from '@material-ui/core/Divider';
import SettingsSwitch from './SettingsSwitch'

const SettingsPanelTab=(props)=> {
    const {settings, label, sortState, handleChange}=props


    return (
        <FormControl component="fieldset">
                {
                    settings.map((oneSetting,index)=>
                        <SettingsSwitch key={index}
                                        name={oneSetting.name}
                                        label={oneSetting.label}
                                        sortState={sortState}
                                        handleChange={handleChange}/>)
                }
            <Divider/>
            <FormHelperText>{label}</FormHelperText>
        </FormControl>
    );
}
export default SettingsPanelTab
