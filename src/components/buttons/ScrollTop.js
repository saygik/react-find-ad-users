import React, {useEffect, useState} from 'react'
import {IconButton, } from "@material-ui/core"
import NavigationOutlinedIcon from '@material-ui/icons/NavigationOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import {makeStyles} from "@material-ui/core/styles"

//.ui-to-top{position:fixed;overflow:hidden;text-align:center;right:15px;bottom:15px;width:50px;height:50px;font-size:20px;line-height:50px;border-radius:50%;text-decoration:none;transition:all .45s ease,opacity .25s ease-in-out;transform:translate3d(0,100px,0);opacity:.6;z-index:100}
const useStyles = makeStyles(
    {
        root: {
            background:'#ccc',
            position: 'fixed',
            bottom:'25px',
            right:'3px',
            marginTop: '-9px',
            marginLeft: '-5px',
            alignItems: 'center',
            height: '50px',
            width:'50px',
            justifyContent: 'center',
            zIndex: '100',
            cursor: 'pointer',
            animation: 'fadeIn 0.3s',
            transition: 'opacity 0.4s',
            opacity: '0.3',
            "&:hover": {
                opacity: '1',
            }
        },
    },
    { name: 'ScrollTop' }
);
const ScrollTop = () =>{
    const classes = useStyles();
    const [showScroll, setShowScroll] = useState(false)

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 400){
            setShowScroll(true)
        } else if (showScroll && window.pageYOffset <= 400){
            setShowScroll(false)
        }
    };

    const scrollTop = () =>{
        window.scrollTo({top: 0, behavior: 'smooth'});
    };
    useEffect(()=>{
        window.addEventListener('scroll', checkScrollTop)
        return window.removeEventListener('scroll', checkScrollTop);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[])

    return (
        <Tooltip title="Наверх">
        {/*<FaArrowCircleUp className="scrollTop" onClick={scrollTop} style={{height: 40, display: showScroll ? 'flex' : 'none'}}/>*/}
        <IconButton color="inherit" onClick={() => scrollTop()} className={classes.root}>
            <NavigationOutlinedIcon  />
        </IconButton>
        </Tooltip>
    );
}

export default ScrollTop;
