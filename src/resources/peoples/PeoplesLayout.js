import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import UserCards from '../../components/UserCards'
import NotFound from '../../components/layout/BeginToFind'


const PeoplesLayout=(props)=>{
    const {searchValue, searchValues, filtredValues, searching } = props


    return (
        <>
            <Grid container justify="center"  mb={2}>
                <Grid  item  xs={12} >
                    {filtredValues.length === 0
                        ? <NotFound loading={searching} filtred={searchValue.length > 1}/>
                        : <UserCards
                                adFiltredUsers={filtredValues}
                                setSelectedUser={()=>{}}
                                searchValues={searchValues}
                          />
                    }
                </Grid>
            </Grid>

        </>
    );
}

export default PeoplesLayout
