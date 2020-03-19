import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';

export default function SortPanel({sortState, setSortState}) {

    const handleChange = name => event => {
        setSortState({ ...sortState, [name]: event.target.checked });
    };

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend"></FormLabel>
            <FormGroup>
                <FormControlLabel
                    control={<Switch size="small" checked={sortState.company} color="primary" onChange={handleChange('company')} value="company" />}
                    label="Предприятие"
                />
                <FormControlLabel
                    control={<Switch size="small" checked={sortState.department} color="primary"onChange={handleChange('department')} value="department" />}
                    label="Отдел"
                />
                <FormControlLabel
                    control={
                        <Switch size="small"  checked={sortState.cn} color="primary"onChange={handleChange('cn')} value="cn" />
                    }
                    label="ФИО"
                />
            </FormGroup>
            <FormHelperText>Настройки сортировки</FormHelperText>
        </FormControl>
    );
}
