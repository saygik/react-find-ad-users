import React from 'react'
import Grid from '@material-ui/core/Grid';
import UserCards from '../../components/UserCards'

const StructureLayout=(props)=>{
    const { searchValues, filtredValues } = props
    return (
        <>
            <Grid container justify="center"  mb={2}>
                <Grid  item  xs={12} >
                    {filtredValues.length === 0
                        ? null
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
export default StructureLayout
