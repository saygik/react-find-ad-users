import React from 'react'
import { ListTitle} from "../../components/layout"
import ScrollTop from "../../components/buttons/ScrollTop"
import RequestsLayout from "./RequestsLayout"
import MessageTemplatesBase from "./"



const Requests = () => {
    return (
        <>
            <ListTitle
                title={'Запросы'}
                icon={MessageTemplatesBase.icon}
            />
           <RequestsLayout/>
           <ScrollTop/>
        </>
    )
}
export default Requests




