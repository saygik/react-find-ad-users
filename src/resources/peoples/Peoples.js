import React, {useEffect} from 'react'
import {useData} from "../../context/Data"
import { Filter, ListTitle, ListToolbar, FiltersSidebar} from "../../components/layout"
import {Counter} from "../../components/details"
import PeoplesLayout from './PeoplesLayout'
import ScrollTop from "../../components/buttons/ScrollTop"
import {makeStyles} from "@material-ui/core/styles"



const useStyles = makeStyles(theme => ({
    root: {
        display:'flex'
    },
}));



const ListFilter = () => {
    const { selectors: {searchValue}, actions:{setSearchValue} } = useData()
    const handleSearch=(e)=>setSearchValue(e ? e.target.value : '' )

    return (
        <Filter
            value={searchValue}
            onChange={handleSearch}
        />
    )
}

const Peoples = () => {
    const {
        selectors: { searchValues, searchValue, peoples, adFiltredUsers,  searching },
        actions: {setPeoplesSecondFilters},
        resourceTypes,
        setCurrentResource
    } = useData()
    const classes = useStyles();
    useEffect(()=> setCurrentResource(resourceTypes.PEOPLES),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [])

    return (
        <>
            <ListTitle
                title={'Поиск людей в Барановичском отделении'}
                count= {
                    peoples.loading
                        ? `загружено: ${peoples.progress}%`
                        : `всего:  ${peoples.data.length}`
                }
            />
            <ListToolbar
                filters={<ListFilter />}
                actions={<Counter end={adFiltredUsers.length}/>}
            />
            <div className={classes.root}>
                <FiltersSidebar filters={peoples.secondFilters} onChange={setPeoplesSecondFilters}/>
                    <PeoplesLayout
                        searchValue={searchValue}
                        searchValues={searchValues}
                        filtredValues={adFiltredUsers}
                        searching={searching}
                    />
            </div>
            <ScrollTop/>
        </>
    )
}
export default Peoples




