import React from 'react'
import {useData} from "../../context/Data"
import { ListTitle} from "../../components/layout"
import ScrollTop from "../../components/buttons/ScrollTop"
import {makeStyles} from "@material-ui/core/styles"
import Base from "./"
import DeletedLayout from "./DeletedLayout"



const Deleted = () => {


    return (
        <>
            <ListTitle
                title={'Удаленные сообщения'}
                icon={Base.icon}
            />
            <DeletedLayout/>
            <ScrollTop/>
        </>
    )
}
export default Deleted




