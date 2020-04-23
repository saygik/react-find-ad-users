import React from 'react'
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import {makeStyles} from "@material-ui/core/styles"
const useStyles = makeStyles(theme => ({

    propCaption:{
        color:'#4f774f',
        fontSize:'1rem',
        fontWeight: 400,
        textAlign:'left',
        float: 'left',
        width:'100px',
    },
    propProperty:{
        color:'#3a893b',
        marginLeft:'20px',
        fontSize:'1rem',
        fontWeight: 400,
        textAlign:'left',
    },

}));
const UserPropertyLine = ({caption, property, children, marginLeft}) => {
        const classes = useStyles();

        return <>
                <Grid item style={{marginLeft: marginLeft }}>
                    {property && <>
                        <Box component={'span'} letterSpacing={1} className={classes.propCaption}>
                            {caption}
                        </Box>
                        <Box component={'span'} letterSpacing={1} className={classes.propProperty}>
                            {children}
                        </Box>
                    </>}
                </Grid>
        </>
}
export default UserPropertyLine


