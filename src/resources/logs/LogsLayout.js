import React from 'react'
import Grid from '@material-ui/core/Grid';
import {useData} from "../../context/Data"


const LogsLayout=(props)=>{
    const {selectors:{logs}}= useData()

    console.log('-logs-',logs)
    return (
        <>
            <Grid container justify="center"  mb={2}>
                <Grid  item  xs={12} >

                    <div >
                        {logs && logs.map((alert,index) => {
                                return <div key={index}>
                                    {alert.description}
                                </div>
                            }
                        )}
                    </div>
                </Grid>
            </Grid>

        </>
    );
}


export default LogsLayout
