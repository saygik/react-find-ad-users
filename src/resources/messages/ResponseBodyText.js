import React from 'react'
import { Box } from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"
import {formatDateFromUnix} from '../../services'

const useStyles = makeStyles(
    theme => ({
    footer: {
        fontSize:'1rem',
        color:'#a7a5a5'
    },
    text: {
        fontSize:'1.3rem',
        color:'#17b506',
        display: '-webkit-box',
        '-webkit-line-clamp': 3,
        '-webkit-box-orient': 'vertical',
        overflow: 'hidden',
        [theme.breakpoints.down('md')]: {
            fontSize:'1.1rem',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize:'1rem',
        },

    },
}));
const ResponseBodyText = (props) => {
    const classes = useStyles();
    const {header, text, footer}=props

    return (
        <>
            <Box className={classes.header}>
                {header}
            </Box>
            <Box className={classes.text}>
                {text}
            </Box>
            <Box className={classes.footer}>
                {footer}
            </Box>
        </>
    )
}
export default ResponseBodyText
