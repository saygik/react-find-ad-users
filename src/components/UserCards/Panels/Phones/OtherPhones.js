import React from 'react'
import Grid from "@material-ui/core/Grid"
import {makeStyles} from "@material-ui/core/styles"
const useStyles = makeStyles(theme => ({
    root:{
        color:'#81817f',
        fontSize:'1rem',
        fontWeight: 400,
        textAlign:'left',
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.8rem',

        },
    },

}))
const OtherPhones=({otherTelephones})=>{
    const classes = useStyles();
    if (!otherTelephones) return ''
    const telephones=Array.isArray(otherTelephones) ? otherTelephones : [otherTelephones]
    return telephones.map((phone,index)=>{
        return <Grid item key={index}  className={classes.root}
        >
            {phone}
        </Grid>
    })
}
export default OtherPhones
