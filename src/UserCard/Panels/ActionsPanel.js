import React from 'react';
import Cmd from "../../assets/cmd.png"
import Radmin from "../../assets/radmin.png"
import IconButton from "@material-ui/core/IconButton"
import MailIcon from "../Icons/MailIcon"
import SkypeIcon from "../Icons/SkypeIcon"
import Grid from "@material-ui/core/Grid"


export default function ActionsPanel({user}) {


    return (
           <Grid container style={{ margin:'8px'}} >
               <Grid item xs={6} >
                   <Grid
                       container
                       justify='flex-start'
                       spacing={3}
                       alignItems="center"
                       style={{paddingLeft: '30px'}}
                   >
                       <IconButton aria-label="add to favorites">
                           <MailIcon  mail={user.mail}/>
                       </IconButton>
                       <IconButton aria-label="share">
                           <SkypeIcon sip={user.sip}/>
                       </IconButton>
                   </Grid>

               </Grid>
               <Grid item xs={6}>
                   {user.ip &&
                   <Grid
                       container
                       justify='flex-end'
                       spacing={3}
                       alignItems="center"
                       style={{paddingRight: '30px'}}
                   >

                       <IconButton aria-label="add to favorites">
                           <a href={"radmin:" + user.ip}><img src={Radmin} alt="Radmin" title="radmin"
                                                              style={{width: '26px'}}/></a>
                       </IconButton>
                       <IconButton aria-label="share">
                           <a href={"ping:" + user.ip}><img src={Cmd} alt="Ping" title="ping host"
                                                            style={{width: '26px'}}/></a>
                       </IconButton>
                   </Grid>
                   }
               </Grid>
           </Grid>

    );
}
