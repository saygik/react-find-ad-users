import React from 'react'
import Grid from "@material-ui/core/Grid"
import Phone from "../Phones/Phone"
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import OtherPhones from "../Phones/OtherPhones"
import PhoneIcon from '@material-ui/icons/Phone';
import IconButton from "@material-ui/core/IconButton"
import Www from "../../../../assets/www.png"
import {makeStyles} from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    icon: {
        fontSize: 24,
        marginLeft:'10px',
        [theme.breakpoints.down('sm')]: {
            fontSize: 18,
            marginLeft:'5px',
        },
    },
}))
const PhonesAndIconsPanel = ({user}) => {
    const classes = useStyles();
    return (
        <Grid container justify='flex-start'  alignItems="center"
        >
            <Grid item xs={10} style={{padding:'0px'}}>
                {
                    (user.mobile || user.telephoneNumber || user.otherTelephone) &&
                    <Grid
                        container
                        justify='flex-start'
                        spacing={3}
                        alignItems="center"
                        style={{margin:'5px', paddingLeft:'10px' }}
                    >
                        <Grid item>
                            {user.mobile && <Phone phone={user.mobile} icon={<PhoneAndroidIcon className={classes.icon}/>}/>}
                        </Grid>
                        <Grid item>
                            {user.telephoneNumber && <Phone phone={user.telephoneNumber}  icon={<PhoneIcon style={{ fontSize: 24, marginLeft:'10px' }}/>}/>}
                        </Grid>
                        <Grid item>
                            <Grid container direction="column"  justify="flex-start"  alignItems="flex-start" >
                                {user.otherTelephone && <OtherPhones otherTelephones={user.otherTelephone} />}
                            </Grid>
                        </Grid>
                    </Grid>
                }

            </Grid>
            <Grid item xs={2} style={{padding:'0px'}}>
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

    )
}
export default PhonesAndIconsPanel
