import React, {useEffect} from 'react'
import {useData} from "../../context/Data"
import ActiveZalsLayout from './ActiveZalsLayout'
import {ListTitle} from "../../components/layout"


const ActiveZals = () => {
    const { selectors:{ activezals }, resourceTypes,setCurrentResource } = useData()
    useEffect(()=> setCurrentResource(resourceTypes.ACTIVEZALS)
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ,[])
    return (
        <>
            <ListTitle
                title={'Текущие собрания НОД-2'}
            />
            <ActiveZalsLayout
                values={activezals.data}
            />
        </>
    )
}
export default ActiveZals
