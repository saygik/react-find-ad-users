import React from 'react'
import MailIcon from '@material-ui/icons/Mail';

const EMailIcon = ({mail}) => {
    const disabled=!(mail && true)
    const color=disabled ? '#B4BAB4' :'#03a9f4'
    return disabled ? <Icon color={color}/>
        : <a href={`mailto:${mail}`}  target="_top"><Icon color={color}/></a>
}

const Icon = ({color}) => {
    return <>
        <MailIcon style={{color:color, fontSize: 36 }}/>
    </>

}
export default EMailIcon
