import React from 'react'
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import Link from "@material-ui/core/Link"
import {makeStyles} from "@material-ui/core/styles"


const useStyles = makeStyles(theme => ({
    propCaption:{
        color:'#4f774f',
        fontSize:'1rem',
        fontWeight: 600,
        textAlign:'left',
    },
    listCaption:{
        color:'#4f774f',
        fontSize:'0.9rem',
        fontWeight: 600,
        textAlign:'left',

    },
    url:{
        color:'#8ea78e',
        fontSize:'0.9rem',
        fontWeight: 400,
        textAlign:'left',
        marginLeft:'20px',
    },
    link : {
        cursor:'pointer',
        "&:hover": {
            color: 'rgba(26,28,254,0.87)',
            textDecoration: 'underline'
        }
    }
}));

const UsersList = ({caption, list, handleSelect, icon}) => {
    const classes = useStyles();
    return <>
        {list &&
            <>
                <Grid container  justify='flex-start'  alignItems="center" >
                    <Grid item>
                        {icon}
                    </Grid>
                    <Grid item>
                        <Box component="span" letterSpacing={3} className={classes.listCaption} style={{marginLeft:'5px'}}>
                            {caption}&nbsp;
                        </Box>
                    </Grid>
                </Grid>

                <Grid container  justify='flex-start' style={{marginTop:'5px', marginBottom:'20px', marginLeft:'16px'}}>
                <Box letterSpacing={3} className={classes.url}>
                    {list.map((item,index)=>{
                        return <Grid item key={index}>
                            <Box onClick={handleSelect(item)} className={classes.link}>
                                {item.name}
                            </Box>
                        </Grid>
                    })}
                </Box>
                </Grid>
            </>
        }
        </>
}
export default UsersList
