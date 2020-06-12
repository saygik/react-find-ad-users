import React from 'react'
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import {makeStyles} from "@material-ui/core/styles"
const useStyles = makeStyles(theme => ({
    root:{
        color:'#4f774f',
        fontSize:'1rem',
        fontWeight: 400,
        textAlign:'left',
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.8rem',

        },
    },

}))
const Phone=({phone,icon})=>{
    const classes = useStyles();
    return <>
        <Box  className={classes.root}>
            <Grid container  justify='flex-start'  alignItems="center" >
                <Grid item>
                    {icon}
                </Grid>
                <Grid item>
                    {phone}
                </Grid>
            </Grid>
        </Box>
    </>
}
export default Phone


