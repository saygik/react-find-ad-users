import React from "react"
import Box from "@material-ui/core/Box"
import CountUp from "react-countup"
import {makeStyles} from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: 'auto',
        marginRight: '10px',
        color:'#d9d9d9',
        fontSize:'26px',
        fontWeight:'bold',
        "&:hover": {
            color:'#ffffff',
            backgroundColor: "transparent"
        }
    },
}));
const Counter = ({end}) => {
    const classes =useStyles()
    return (
        <Box  className={classes.root}>
            найдено: <CountUp end={end} />
        </Box>
    )
}
export default Counter




