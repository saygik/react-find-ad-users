import React from 'react'
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Hidden from '@material-ui/core/Hidden';
import SettingsPanelTab from "./SettingsPanelTab"
import {makeStyles} from "@material-ui/core/styles"

const filterSettings={
    sort: [
        {name: 'company', label:'Предприятие'},
        {name: 'department', label:'Отдел'},
        {name: 'cn', label:'ФИО'},
    ],
    filter: [
        {name: 'skype', label:'Только со Skype'},
        {name: 'phone', label:'Только с телефоном'},
    ],
}

const FindSettingsPanel = (props) => {
    const {sortState, setSortState}=props
    const classes = useStyles();
    const handleChange = name => event => {
        setSortState({ ...sortState, [name]: event.target.checked });
    };
    return (
        <Grid container
              spacing={0}
              direction="row"
              justify="flex-end"
              alignItems="flex-end"
              style={{width:'100%',marginTop:'15px'}}>
            <Grid item xs={8} >
                <Paper className={classes.paper}>
                <Grid container
                      spacing={0}
                      direction="row"
                      justify="flex-start"
                      alignItems="flex-start"
                     >
                    <Grid item xs={3} >
                        <SettingsPanelTab settings={filterSettings.sort} label={'Настройки сортировки'} sortState={sortState} handleChange={handleChange}/>
                    </Grid>
                    <Grid item xs={3} >
                        <SettingsPanelTab settings={filterSettings.filter} label={'Дополнительная фильтрация'} sortState={sortState} handleChange={handleChange}/>
                    </Grid>
                </Grid>
                </Paper>
            </Grid>
            <Grid item xs={2} implementation="css" smDown component={Hidden} />
        </Grid>
    )
}
const useStyles = makeStyles(theme => ({
    paper: {
        backgroundColor:theme.palette.background.default,
        padding: '5px',
        paddingLeft: '15px',
        paddingBottom: '5px',
        marginTop: '-15px',
        marginBottom: '15px',
        width: '100%',
        height: '100px'
    },}))
export default FindSettingsPanel
