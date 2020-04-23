import React from 'react'
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
const Phone=({phone,icon})=>{
    return <>
        <Box  style={{
            color:'#4f774f',
            fontSize:'1rem',
            fontWeight: 400,
            textAlign:'left',
            width:'170px',
        }}>
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


