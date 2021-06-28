import React, {useCallback} from 'react'
import {useData} from "../../context/Data"
import {SayInput} from "../../components/layout"


const SearchInput = () => {
    const {
        selectors:{templateFilterValue},
        actions: {updateTemplateFilterValue}
    } = useData()
    return (
        <SayInput
            label={"Поиск"}
            value={templateFilterValue}
            onChange={(value)=>updateTemplateFilterValue(value)}
        />
    )
}
export default SearchInput
