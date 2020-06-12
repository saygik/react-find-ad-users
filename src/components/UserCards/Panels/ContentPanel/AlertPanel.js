import React from 'react'
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined'
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import {makeStyles, withStyles} from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    alert: {
        fontSize: '1rem'
    },

}))

const AlertIcon = withStyles({
    root: {
        margin:'5px',
        fontSize:'2rem',
        color:'#a14f1b'
    }
})(ReportProblemOutlinedIcon);

const AlertPanel = ({label}) => {
    const classes = useStyles();
    return (
        <Grid container style={{padding:'6px',}}  >
            <Grid item xs={12}>
                <Grid container justify='flex-start'  alignItems="center"
                      style={{padding:'3px', paddingBottom:'6px',paddingTop:'6px', border: '1px solid #ff9800',borderRadius: '6px' ,backgroundColor:'rgb(255, 255, 229)'}}
                >
                    <AlertIcon/>
                    <Box letterSpacing={2} className={classes.alert}>
                        {label}
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    )

}
export default AlertPanel
