import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Link from "@material-ui/core/Link"
import Box from "@material-ui/core/Box"
import Cmd from "../assets/cmd.png"
import Radmin from "../assets/radmin.png"


export default function IpUtilsMenu({ip}) {

    const handleSelectIP=(ip)=>()=> {
        const win = window.open("radmin:"+ip, '_blank');
        if (win != null) { win.focus(); }
    }
    return (
        <>
            <Box
                display="flex"
                alignItems="center"
                height={30}
                justifyContent="center"
            >
                    <Link href="#" onClick={handleSelectIP(ip)} color="inherit" style={{ marginRight:'15px'}}>
                        {`ip адрес:    ${ip}`}
                    </Link>
                <a href={"radmin:" +ip}><img src={Radmin} alt="Radmin" title="radmin" style={{width:'26px'}}/></a>
                <a href={"ping:" +ip}><img src={Cmd} alt="Ping" title="ping host"  style={{width:'26px' }}/></a>
            </Box>

            </>
    );
}
