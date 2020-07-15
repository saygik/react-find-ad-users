import React, {useEffect} from 'react'
import {useData} from "../../context/Data"
import Filter from "../../components/layout/Filter"
import SoftLayout from './SoftLayout'
import {ListTitle, ListToolbar} from "../../components/layout"
import {Counter} from "../../components/details"

const ListFilter = () => {
    const { selectors, actions } = useData()
    const {searchValue } = selectors
    const { setSearchValue } = actions
    const handleSearch=(e)=>setSearchValue(e ? e.target.value : '' )
    return (
        <Filter
            value={searchValue}
            onChange={handleSearch}
        />
    )
}

const Peoples = () => {
    const { selectors, resourceTypes,setCurrentResource } = useData()

    const {searchValues, software, filtredSoft,  searching } = selectors

    useEffect(()=> setCurrentResource(resourceTypes.SOFT),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [])

    return (
        <>
            <ListTitle
                title={'Поиск программ и сервисов ИВЦ НОД-2'}
                count= {
                    software.loading
                        ? `загружено: ${software.progress}%`
                        : `всего:  ${software.data.length}`
                }
            />
            <ListToolbar
                filters={<ListFilter />}
                actions={<Counter end={filtredSoft.length}/>}
            />
            <SoftLayout
                searchValues={searchValues}
                filtredValues={filtredSoft}
                searching={searching}

            />
        </>
    )
}
export default Peoples
