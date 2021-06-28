import React from "react"
import {ListHeaderRounded, ListToolbar, TopToolbar} from "../../components/layout"
import {AddButton, } from "../../components/buttons"
import AddIcon from "@material-ui/icons/Add"
import {useData} from "../../context/Data"

const TemplateActions = ({ className }) => {
    const {  actions:{newMessageDialogOpen},
        mutations:{requestMessages:{ fetchNextPage}}
    } = useData()
    return(
        <TopToolbar>
            <AddButton label={"НОВОЕ СООБЩЕНИЕ"}
                       icon={<AddIcon />}
                       onClick={()=> newMessageDialogOpen()}/>
        </TopToolbar>
    )
}
const TemplateFilters = () => {
    return(
        <TopToolbar>
        </TopToolbar>
    )
}

const RequestsHeader = () => {
    return (
        <ListHeaderRounded>
            <ListToolbar
                filters={<TemplateFilters/>}
                actions={<TemplateActions/>}
            />
        </ListHeaderRounded>
    )
}
export default RequestsHeader

