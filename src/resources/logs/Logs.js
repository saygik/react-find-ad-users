import React, {useEffect} from 'react'
import {useData} from "../../context/Data"
import { ListTitle} from "../../components/layout"
import ScrollTop from "../../components/buttons/ScrollTop"
import {makeStyles} from "@material-ui/core/styles"
import Base from "./"
import DeletedLayout from "./LogsLayout"


const useStyles = makeStyles(theme => ({
    root: {
        display:'flex'
    },
}));

const Logs = () => {
    const {
        resourceTypes,
        setCurrentResource
    } = useData()
    const classes = useStyles();
    // useEffect(()=> setCurrentResource(resourceTypes.LOGS),
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    //     [])

    return (
        <>
            <ListTitle
                title={'События'}
                icon={Base.icon}
            />
            <div className={classes.root}>
                <DeletedLayout/>
            </div>
            <ScrollTop/>
        </>
    )
}
export default Logs




