import React, {useEffect, useState} from 'react'
import {useData} from "../../context/Data"
import { Filter, ListTitle, ListToolbar} from "../../components/layout"
import {Counter} from "../../components/details"
import PeoplesLayout from './PeoplesLayout'
import ScrollTop from "../../components/buttons/ScrollTop"
import Box from "@material-ui/core/Box"
import resourceTypes from "../../context/Data/resource-types"
import {makeStyles} from "@material-ui/core/styles"
import Paper from '@material-ui/core/Paper';
import RadioButtonGroupInput from '../../components/input/RadioButtonGroupInput'
import {trueFalseChoices} from '../../services/userFiltersChoices'
import _ from "lodash"
import {withMobileDialog} from "@material-ui/core"

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
//    const { searchValue, setSearchValue } = useData()
//    const [searchValue,setSearchValue] = useState('')
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
    useEffect(()=> setCurrentResource(resourceTypes.PEOPLES),[])


const handleSecondFiltersChange=(value)=>{
    setPeoplesSecondFilters(value)
}
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
                <Paper elevation={3} className={classes.paper1}>
                    {Object.keys(peoples.secondFilters).map(filter=>(
                        <RadioButtonGroupInput
                            key={filter}
                            source={filter}
                            label={peoples.secondFilters[filter].name}
                            value={peoples.secondFilters[filter].value}
                            onChange={handleSecondFiltersChange}
                            choices={trueFalseChoices} />
                            ))
                    }
                    {/*<RadioButtonGroupInput*/}
                    {/*    source={peoples.secondFilters["sip"].name}*/}
                    {/*    label={'Skype для бизнеса'}*/}
                    {/*    value={peoples.secondFilters["sip"].value}*/}
                    {/*    onChange={handleSecondFiltersChange}*/}
                    {/*    choices={trueFalseChoices} />*/}
                    {/*<RadioButtonGroupInput*/}
                    {/*    source="telephoneNumber"*/}
                    {/*    label={'Рабочий телефон'}*/}
                    {/*    value={peoples.secondFilters["telephoneNumber"].value}*/}
                    {/*    onChange={handleSecondFiltersChange}*/}
                    {/*    choices={trueFalseChoices} />*/}
                </Paper>
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
