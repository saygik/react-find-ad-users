import React, {useCallback} from 'react'
import {SaySelector} from '../../components/layout'
import {useData} from "../../context/Data"

const CategorySelector = () => {
    const {
        selectors:{messageTemplateCategories, templateCategorySelectorValue},
        actions: {updateTemplateCategorySelectorValue}
    } = useData()
    return (
        <SaySelector
            label={"Категория"}
            options={messageTemplateCategories}
            value={templateCategorySelectorValue}
            onChange={(value)=>updateTemplateCategorySelectorValue(value)}
        />
    )
}
export default CategorySelector
