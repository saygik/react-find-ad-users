import React, {useEffect} from 'react'
import {useData} from "../../context/Data"
import ZalsLayout from './ZalsLayout'
import {ListTitle} from "../../components/layout"


const Zals = () => {
    const { selectors:{ orderedzals }, resourceTypes,setCurrentResource } = useData()
    useEffect(()=> setCurrentResource(resourceTypes.ZALS)
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ,[])

    return (
        <>
            <ListTitle
                title={'Закрепленные залы совещаний НОД-2'}
            />
            <ZalsLayout
                values={orderedzals}
            />
        </>
    )
}
export default Zals
