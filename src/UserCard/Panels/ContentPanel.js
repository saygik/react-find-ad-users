import React from 'react';
import IconButton from "@material-ui/core/IconButton"
import Grid from "@material-ui/core/Grid"
import Www from "../../assets/www.png"
import Phone from "../Phones/Phone"
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import OtherPhones from "../Phones/OtherPhones"
import PhoneIcon from '@material-ui/icons/Phone';
import GridLine from "../../UserPropertyLine/UserPropertyLine"
import {presenceTimeFormat} from "../../serices"
import Box from "@material-ui/core/Box"
import TextHighlighter from "../../TextHighlighter"
import {makeStyles} from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: '700px',
        marginTop: 20,
        // padding:5
    },
    tags:{
        color:'#8ea78e',
        fontSize:'.7rem',
        fontWeight: 400,
        textAlign:'left',
    },
}))

export default function ContextPanel({user, searchValue}) {
    const classes = useStyles();

    return (
        <>
        <Grid
            container
            justify='flex-start'
            spacing={3}
            alignItems="center"
            style={{ marginBottom:'6px',marginTop:'6px',backgroundColor:'rgba(51, 197, 62, 0.05)'}}
        >
            <Grid item xs={8} style={{padding:'0px'}}>
                {
                    (user.mobile || user.telephoneNumber || user.otherTelephone) &&
                    <Grid
                        container
                        justify='flex-start'
                        spacing={3}
                        alignItems="center"
                        style={{margin:'12px', paddingLeft:'40px' }}
                    >
                        {user.mobile && <Phone phone={user.mobile} icon={<PhoneAndroidIcon style={{ fontSize: 24, marginLeft:'10px' }}/>}/>}
                        {user.telephoneNumber && <Phone phone={user.telephoneNumber}  icon={<PhoneIcon style={{ fontSize: 24, marginLeft:'10px' }}/>}/>}
                        <Grid container direction="column"  justify="flex-start"  alignItems="flex-start" style={{ width:'130px' }}>
                            {user.otherTelephone && <OtherPhones otherTelephones={user.otherTelephone} />}
                        </Grid>
                    </Grid>
                }

            </Grid>
            <Grid item xs={4} style={{padding:'0px'}}>
                {user.internet &&
                <Grid
                    container
                    justify='flex-end'
                    spacing={3}
                    alignItems="center"
                    style={{padding:'12px', paddingRight: '30px'}}
                >

                    <IconButton aria-label="add to favorites">
                        <img src={Www} alt="internet" title="права на интернет" style={{width:'26px'}}/>
                    </IconButton>
                </Grid>
                }
            </Grid>
        </Grid>
            <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
                style={{paddingLeft:'100px',paddingRight:'5px'}}
            >
                <GridLine caption={'присутствие:'} property={user.availability.presence} >
                    {presenceTimeFormat(user.availability)}
                </GridLine>
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
        </>
    );
}
