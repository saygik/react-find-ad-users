import React from 'react'
import {Box} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"

const ListHeaderRounded = ({children}) => {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <Box className={classes.rounded}>
                {children}
            </Box>
        </Box>
    )
}
export default ListHeaderRounded


const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.primary.main,
    },
    rounded:{
        backgroundColor: theme.palette.background.default,
        borderRadius: '8px 8px 0 0',
        paddingTop:10
    },
}));
