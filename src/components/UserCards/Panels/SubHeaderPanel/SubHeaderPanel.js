import React from 'react'
import Box from "@material-ui/core/Box"
import TextHighlighter from "../../../TextHighlighter"
import {makeStyles} from "@material-ui/core/styles"
const useStyles = makeStyles(theme => ({
    usertitle:{
        color:'#5d5d5b',
        fontSize:'0.8rem',
        fontWeight: 400,
        textAlign:'left',
    },
    usercompany:{
        color:'#4f774f',
        fontSize:'1rem',
        fontWeight: 600,
        textAlign:'left',
    },
    userdepartment:{
        color:'#72ac72',
        fontSize:'.9rem',
        fontWeight: 600,
        textAlign:'left',

    },
}))
const SubHeaderPanel = ({user, searchValue}) => {
    const classes = useStyles();
    return (
        <>
            <Box letterSpacing={3} className={classes.usertitle}>
                {user.title ? <TextHighlighter searchValue={searchValue} text={user.title}  />
                    : 'должность не определена'}
            </Box>

            <Box letterSpacing={3} className={classes.usercompany}>
                {user.company ? <TextHighlighter searchValue={searchValue} text={user.company}    />
                    : 'предприятие не определено'}
            </Box>
            <Box letterSpacing={3} className={classes.userdepartment}>
                {user.department ? <TextHighlighter searchValue={searchValue} text={user.department}    />
                    : 'отдел не определен'}
            </Box>
        </>
    )
}
export default SubHeaderPanel
