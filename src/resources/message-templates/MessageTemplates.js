import React, {useEffect} from 'react'
import {useData} from "../../context/Data"
import { ListTitle} from "../../components/layout"
import ScrollTop from "../../components/buttons/ScrollTop"
import {makeStyles} from "@material-ui/core/styles"
import MessageTemplatesLayout from "./MessageTemplatesLayout"
import MessageTemplatesBase from "./"


const useStyles = makeStyles(theme => ({
    root: {
        display:'flex'
    },
}));

const MessageTemplates = () => {
    const {
        resourceTypes,
        setCurrentResource
    } = useData()
    const classes = useStyles();
    // useEffect(()=> setCurrentResource(resourceTypes.MESSAGES),
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    //     [])

    return (
        <>
            <ListTitle
                title={'Шаблоны сообщений'}
                icon={MessageTemplatesBase.icon}
            />
            <div className={classes.root}>
                <MessageTemplatesLayout/>
            </div>
            <ScrollTop/>
        </>
    )
}
export default MessageTemplates




