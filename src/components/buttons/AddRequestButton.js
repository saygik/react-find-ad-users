import React, {useEffect, useState} from 'react'
import {IconButton, Box} from "@material-ui/core"
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Tooltip from '@material-ui/core/Tooltip';
import {makeStyles} from "@material-ui/core/styles"
import {useData} from "../../context/Data"

const useStyles = makeStyles(
    {
        root: {
            alignItems: 'center',
            height: '50px',
            width:'50px',
            justifyContent: 'center',
            cursor: 'pointer',
            animation: 'fadeIn 0.3s',
            transition: 'opacity 0.4s',
            color: '#a59a9a',
            "&:hover": {
                opacity: '1',
                color: '#fff'
            }
        },
        icon: {
            fontSize:'50px',
        },
    },
    { name: 'AddRequestButton' }
);
const AddRequestButton = ({onClick, disabled}) =>{
    const classes = useStyles();

    const HandleClick = () =>{
        onClick()
  //      window.scrollTo({top: 0, behavior: 'smooth'});
    };


    return (
        <Box display="flex" justifyContent="center">
            <Tooltip title="Новое сообщение" arrow>
                <span>
                    <IconButton color="inherit" onClick={() => HandleClick()} className={classes.root} disabled={disabled}>
                        <AddBoxIcon  className={classes.icon}/>
                    </IconButton>
                </span>
            </Tooltip>
        </Box>
    );
}

export default AddRequestButton;
