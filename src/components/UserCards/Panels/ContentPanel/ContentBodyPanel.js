import React from 'react'
import Grid from "@material-ui/core/Grid"
import GridLine from "../../../UserPropertyLine/UserPropertyLine"
import {presenceTimeFormat} from "../../../../services"
import Box from "@material-ui/core/Box"
import TextHighlighter from "../../../TextHighlighter"
import {makeStyles} from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    root:{
        paddingLeft:'100px',
        paddingRight:'5px',
        paddingTop:'10px',
        [theme.breakpoints.down('sm')]: {
            paddingLeft:'40px',
        },
    },
    tags:{
        color:'#8ea78e',
        fontSize:'.7rem',
        fontWeight: 400,
        textAlign:'left',
        [theme.breakpoints.down('sm')]: {
            fontSize:'.6rem',
        },
    },
}))
const ContentBodyPanel = ({user,searchValue}) => {
    const classes = useStyles();
    return (
        <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
            className={classes.root}
        >
            {user.availability &&
            <GridLine caption={'присутствие:'} property={user.availability.presence}>
                {presenceTimeFormat(user.availability)}
            </GridLine>
            }
            {user.ip &&
            <GridLine caption={'ip адрес: '} property={user.ip} >
                {user.ip}
            </GridLine>
            }
            {user.url &&
            <Grid container  justify='flex-start' style={{marginTop:'20px'}}>
                <Grid item>
                    <Box letterSpacing={3} className={classes.tags}>
                        тэги: <TextHighlighter searchValue={searchValue} text={user.url} />
                    </Box>
                </Grid>
            </Grid>
            }

        </Grid>

    )
}
export default ContentBodyPanel
