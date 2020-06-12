import React from 'react'
import Grid from "@material-ui/core/Grid"


const PanelContainer = ({children, background, color}) => {
    return (
        <Grid
            container
            style={{backgroundColor:background, color:color}}
        >
            <Grid item xs={12}>
                {children}
            </Grid>
        </Grid>
    )
}
export default PanelContainer
