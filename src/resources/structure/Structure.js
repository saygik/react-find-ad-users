import React, {useEffect} from 'react'
import {useData} from "../../context/Data"
import { Filter, ListTitle, ListToolbar, TreeViewSidebar} from "../../components/layout"
import {Counter} from "../../components/details"
import StructureLayout from './StructureLayout'
import ScrollTop from "../../components/buttons/ScrollTop"
import {makeStyles} from "@material-ui/core/styles"


const useStyles = makeStyles(theme => ({
    root: {
        display:'flex'
    },
    paper1: {
        width:'24em',
        order: '-1',
        marginRight: '2em',
        padding: theme.spacing(2),
        backgroundColor: '#fefefe'
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

const Structure = () => {
    const {
        selectors: { searchValues, searchValue, peoples, searchOU, adFiltredUsers,  searching },
        actions: {setOU},
        resourceTypes,
        setCurrentResource
    } = useData()
    const classes = useStyles();
    useEffect(()=> setCurrentResource(resourceTypes.STRUCTURE),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [])

    return (
        <>
            <ListTitle
                title={'Поиск людей по структуре Барановичского отделения'}
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
                <TreeViewSidebar setOU={setOU} filter={searchOU}/>
                <StructureLayout
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
export default Structure
