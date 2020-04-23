import React from 'react'
import Grid from "@material-ui/core/Grid"
const OtherPhones=({otherTelephones})=>{
    if (!otherTelephones) return ''
    const telephones=Array.isArray(otherTelephones) ? otherTelephones : [otherTelephones]
    return telephones.map((phone,index)=>{
        return <Grid item key={index}  style={{
            marginRight:'10px',
            color:'#81817f',
            fontSize:'1rem',
            fontWeight: 400,
            textAlign:'left',
        }}
        >
            {phone}
        </Grid>
    })
}
export default OtherPhones
