import React, {useEffect, useState} from 'react'
import {
    Grid,
    Box, Divider
} from '@material-ui/core'
import { makeStyles, styled} from '@material-ui/core/styles';
import {useData} from "../../context/Data"
import TemplateCard from "./TemplateCard"
import MessageTemplatesHeader from './MessageTemplatesHeader'
import {ListToolbar, TopToolbar} from '../../components/layout'
import {TemplateButton, AddButton} from "../../components/buttons"
import AddIcon from '@material-ui/icons/Add';
import {green} from "@material-ui/core/colors"
import MessagesHeader from "../messages/MessagesHeader"
import IncomingMessage from "../messages/IncomingMessage"



const useStyles = makeStyles(theme => ({
    root: {
        minWidth: '100%',
    },
    grid: {
        flexGrow: 1,
        padding: '10px 10px 10px 50px'
    },
    toolbar:{
        width: '100%'
    },
    templateButton:{
        '& .MuiSvgIcon-root':{
            fontSize:'32px',
        }
    },
}));


const MessageTemplatesLayout = () => {
    const {selectors:{messageTemplates}}= useData()
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <MessageTemplatesHeader/>
            <Grid container className={classes.grid}>
                <Grid container justify="center" >
                    {messageTemplates && messageTemplates.map(template => {
                            return                             <TemplateCard key={template.id} template={template}/>
                        }
                    )}
                </Grid>
            </Grid>
        </div>
    );
};
export default MessageTemplatesLayout;
