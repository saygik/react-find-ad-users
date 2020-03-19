import React from 'react'

const SkypeIcon = ({sip}) => {
    const disabled=!(sip && true)

    const color=disabled ? '#B4BAB4' :'#03a9f4'
    return disabled ? <Icon color={color}/>
                    : <a href={sip}  target="_top"><Icon color={color}/></a>
}

const Icon = ({color}) => {
    return <>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="36px" height="36px">
            <path fill={color} d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z"/>
            <path fill={color} d="M33.5 22A11.5 11.5 0 1 0 33.5 45 11.5 11.5 0 1 0 33.5 22zM14.5 3A11.5 11.5 0 1 0 14.5 26 11.5 11.5 0 1 0 14.5 3z"/>
            <path fill="#fff" d="M24.602,36C18,36,15,32.699,15,30.199C15,28.898,15.898,28,17.199,28c2.801,0,2.102,4.102,7.402,4.102c2.699,0,4.199-1.5,4.199-3c0-0.902-0.402-1.902-2.199-2.402l-5.902-1.5C16,24,15.102,21.398,15.102,18.898c0-5.098,4.699-6.898,9.098-6.898C28.301,12,33,14.199,33,17.199c0,1.301-1,2.102-2.301,2.102c-2.398,0-2-3.402-6.801-3.402c-2.398,0-3.797,1.102-3.797,2.703c0,1.598,1.898,2.098,3.598,2.5l4.402,1C32.898,23.199,34,26,34,28.699C33.898,32.898,30.898,36,24.602,36z"/>
        </svg>
    </>

}


export default SkypeIcon


