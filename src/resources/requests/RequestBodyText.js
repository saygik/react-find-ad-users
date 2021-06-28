import React from 'react'
import { Box } from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"
import {formatDateFromUnix} from '../../services'

const useStyles = makeStyles({
    root: {
        fontSize:'1rem',
        color:'#a7a5a5'
    },
});
const RequestBodyText = (props) => {
    const classes = useStyles();
    const {ip, created_at}=props

    return (
        <Box className={classes.root}>
                {`создано: ${formatDateFromUnix(created_at)},   ip: ${ip}` }
        </Box>
    )
}
export default RequestBodyText
