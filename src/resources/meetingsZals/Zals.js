import React, {useEffect} from 'react'
import {useData} from "../../context/Data"
import ZalsLayout from './ZalsLayout'
import {ListTitle, ListToolbar} from "../../components/layout"


const Zals = () => {
    const { selectors, resourceTypes,setCurrentResource } = useData()

    const {searchValues, orderedzals, filtredSoft,  searching } = selectors

    useEffect(()=> setCurrentResource(resourceTypes.ZALS),[])
//    console.log('--ZALS--',orderedzals)
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
